# Bachelor_thesis_Saureus

This is the main repository where all the code for my bachelor thesis will be stored.

## Step 1: Search and download genes from NCBI

Script: `1 SEARCH GENES/ncbi_gene_downloader.py`

Install dependencies:

```bash
pip install -r "1 SEARCH GENES/requirements.txt"
```

Run:

```bash
python "1 SEARCH GENES/ncbi_gene_downloader.py"
```

The script asks for inputs in the terminal (gene name and Entrez email are required), downloads sequences from NCBI into one FASTA file, and also creates an Excel file for quality check.
