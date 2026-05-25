# NBGD — NCBI Bacterial Gene Downloader

**NCBI Bacterial Gene Downloader** is a begginer pipeline that will help you to:

**1)** Download gene (or gene product) sequences from NCBI's RefSeq database for a given organism.

**2)** Generate a phylogenetic tree from those sequences.

It is designed for researchers with little-to-no computing background: You mainly answer prompts and the script runs the steps for you!

## <img src="docs/icons/folder-open.svg" width="22" alt="Install icon" style="vertical-align: middle;" /> Project structure (what the folders mean)

```text
NBGD-NCBI-Bacterial-Gene-Downloader/
├── run.py                 # Main “menu” to run Step 1 and/or Step 2
├── setup.sh               # Setup for Linux/macOS (creates .venv, installs deps, installs tools, runs run.py)
├── setup.ps1              # Setup for Windows (creates .venv, installs deps, runs run.py)
├── requirements.txt       # Python dependencies
├── 1 SEARCH GENES/        # Step 1 script (download/extract sequences from NCBI)
└── 2 ALN_TRIM_TREE/       # Step 2 script (align/trim/tree)
```

---



# <img src="docs/icons/circle-alert.svg" width="22" alt="Install icon" style="vertical-align: middle;" /> Before you start (What you need)

### 1) Install Python
You need **Python 3** installed (recommended: a Python that is still supported, such as **3.12**).

- If you are on Windows or macOS, install the preferred Python version from the official website: https://www.python.org/downloads/ 
- If you are on Linux, make sure you don't have it pre-installed. If not,  run the appropriate command for your distribution (For more information check https://docs.python-guide.org/starting/install3/linux/)

### 2) Internet access
The pipeline downloads data from NCBI, so you must be online.

### 3) An NCBI email (required) + API key (optional but recommended)
NCBI asks users of automated tools to provide an email address realated to their account.

- **Email is required**
- **API key is optional**, but recommended because it allows faster downloads. You can create a new one for free in your NCBI 'account settings'

---
## <img src="docs/icons/pointer.svg" width="22" alt="Install icon" style="vertical-align: middle;" /> How to start 

### Windows (PowerShell)
1. Download / clone this repository to your computer
2. Open **PowerShell** in the project folder either by:
* Right click on the folder and select "Open on Terminal"
* Left click on the adress bar and write: "cmd"
3. Once on the terminal, copy, paste and run this command:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```
### Linux / macOS (Terminal)
1. Download / clone this repository
2. Open a terminal in the project folder
3. Once on the terminal, copy, paste and run this command:

```bash
bash ./setup.sh
```

---
*These commands will be available on the 'requirements.txt' file on the project directory*

## What these commands do for you:
- Create a local Python environment in a folder called **`.venv`**
- Install the required Python packages from `requirements.txt`
- (On Linux/macOS) try to install the MUSCLE + IQ-TREE tools
- Automatically start to run the pipeline
---
## <img src="docs/icons/sparkles.svg" width="22" alt="Install icon" style="vertical-align: middle;" /> Running the pipeline

After setup finishes, you will see a simple menu appear on the terminal. You will need to select the option you want to do:
- Step 1 only (download/extract sequences) = **1**
- Step 2 only (align/trim/tree) = **2** 
- Step 1 + Step 2 (full pipeline) = **3**

Depending on which one you chose,the script will then prompt you about important information related to your search, such as:
- Your NCBI e-mail and API, the gene name, or the TaxID of your organism.
- The name of the file you wish to align

## <img src="docs/icons/file-check.svg" width="22" alt="Install icon" style="vertical-align: middle;" /> Outputs (what files you get)

### Step 1 outputs
- A **FASTA** file containing the downloaded sequences
- An **Excel** file for quality control / inspection
- (Optional) an **additional** FASTA file with the names of your sequences changed to a numeric code of your choosing

### Step 2 outputs (tree building)
You will typically get:
- An **aligned FASTA** (often named like `*_aligned.fasta`)
- A **trimmed alignment** (often named like `*_aligned_trimmed.fasta`)
- An **IQ-TREE results folder** (often `iqtree_results/`) containing:
  - The tree file (commonly `*.treefile`)
  - Statistics / run logs

## <img src="docs/icons/wrench.svg" width="22" alt="Install icon" style="vertical-align: middle;" /> External tools used (Step 2)

- **MUSCLE** — multiple sequence alignment  
- **ClipKIT** — alignment trimming (installed via Python package)
- **IQ-TREE** — phylogenetic tree inference

> Note: On Linux/macOS, `setup.sh` attempts to install MUSCLE and IQ-TREE using `apt` (Debian/Ubuntu) or `brew` (macOS). If your system doesn’t have these package managers, you may need to install MUSCLE/IQ-TREE manually.

---

## <img src="docs/icons/message-circle-question-mark.svg" width="22" alt="Install icon" style="vertical-align: middle;" /> Additional information

If you have any trouble with the pipeline, or just wish to know more about it and bioinformatics in general, check out the webpage for this repository!
https://pujals298.github.io/NBGD-NCBI-Bacterial-Gene-Downloader/
