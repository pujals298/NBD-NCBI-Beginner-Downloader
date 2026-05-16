#=================================================
#        PHYLOGENETIC TREE VISUALIZATION
#=================================================

# Required libraries
library(ggtree)
library(ggplot2)
library(tidyverse)

#-------------------------------------------------
#              1 - Basic tree
#-------------------------------------------------

# Setting the directory of the tree file
getwd()
setwd("C:/Users/location")

# Create a variable with the name of the tree file
tree <- read.tree("download_code.treefile")

# Create a basic tree to see the possible clusters/groups

ggtree(tree) +
  geom_tiplab(size = 3)

# With the previous information define the groups
groups <- list(
  Outgroup = "SAU44",
  group_A = c("SAU41", "SAU2"),
  group_B = c("SAU3", "SAU19", "SAU28", "SAU33"),
  group_C = c("SAU1", "SAU25", "SAU26", "SAU42", "SAU27", "SAU32", "SAU43"),
  group_D = c("SAU14", "SAU4", "SAU5", "SAU21", "SAU16", "SAU15", "SAU20", "SAU22", "SAU9", "SAU13", "SAU12", "SAU36", "SAU30", "SAU31", "SAU34", "SAU37", "SAU17", "SAU23", "SAU24", "SAU7", "SAU8", "SAU11", "SAU6", "SAU10"),
  group_E = c("SAU40", "SAU35", "SAU18", "SAU38", "SAU39", "SAU29")
)

#-------------------------------------------------
#     2 - Coloring the branches by groups
#-------------------------------------------------
# Create a data frame with group assignments for tips
group_df <- data.frame(
  label = unlist(groups),
  group = rep(names(groups), sapply(groups, length)),
  stringsAsFactors = FALSE
)

# Function to get all descendants of a node
get_descendants_custom <- function(tree, node) {
  descendants <- numeric()
  children <- which(tree$edge[, 1] == node)
  
  if (length(children) > 0) {
    for (child in tree$edge[children, 2]) {
      descendants <- c(descendants, child)
      descendants <- c(descendants, get_descendants_custom(tree, child))
    }
  }
  
  return(descendants)
}

# Assign groups to internal nodes based on their descendants
n_tips <- length(tree$tip.label)
n_nodes <- n_tips + tree$Nnode

# Create node group assignment
node_group <- rep(NA, n_nodes)

# Assign groups to tips
for (i in 1:n_tips) {
  tip_name <- tree$tip.label[i]
  group_idx <- which(group_df$label == tip_name)
  if (length(group_idx) > 0) {
    node_group[i] <- group_df$group[group_idx]
  }
}

# Assign groups to internal nodes
for (i in (n_tips + 1):n_nodes) {
  descendants <- get_descendants_custom(tree, i)
  desc_tips <- descendants[descendants <= n_tips]
  
  if (length(desc_tips) > 0) {
    desc_groups <- node_group[desc_tips]
    unique_groups <- unique(na.omit(desc_groups))
    
    # If all descendants belong to the same group, assign that group
    if (length(unique_groups) == 1) {
      node_group[i] <- unique_groups[1]
    }
  }
}

# Create node data frame with group assignments
node_data <- data.frame(
  node = 1:n_nodes,
  group = node_group,
  stringsAsFactors = FALSE
)

# Define colors for each group
colors <- c(
  Outgroup = "#E41A1C",  # Red
  group_A = "#377EB8",   # Blue
  group_B = "#4DAF4A",   # Green
  group_C = "#984EA3",   # Purple
  group_D = "#FF7F00",   # Orange
  group_E = "#F781BF"   # Pink
)

# Create the phylogenetic tree plot with colored groups
p <- ggtree(tree, aes(color = group), size = 0.5) %<+% node_data +
  geom_tiplab(size = 3, color = "black", hjust = -0.1, align = TRUE) +
  geom_treescale(
    x = 0,                      
    y = -1,                     
    fontsize = 3,               
    linesize = 1             
  ) +
  scale_color_manual(
    values = colors, 
    na.value = "black",
    breaks = names(colors),
    labels = names(colors)
  ) +
  theme_tree() +
  theme(
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5),
    legend.position = "right"
  ) +
  ggtitle("β-lactamases Nucleotide sequences")

# Display the plot
print(p)

#-------------------------------------------------
#     3 - Creating a tree with alignment
#-------------------------------------------------

msaplot(p, "blaZ_alineado_CODIGOS_2.0.fasta", offset = 1, width = 1.5)+
  theme(
    legend.position = "right",
    legend.title = element_text(size = 12, face = "bold", hjust = 0.5),
    legend.text = element_text(size = 11)
  ) +
  guides(fill = guide_legend(title = "Nucleotides", title.position = "top")) 


