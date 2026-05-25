# NBGD — NCBI Bacterial Gene Downloader

**NCBI Bacterial Gene Downloader** is a begginer pipeline that will help you to:

**1)** Download gene (or gene product) sequences from NCBI's RefSeq database for a given organism.

**2)** Generate a phylogenetic tree from those sequences.

It is designed for researchers with little-to-no computing background: You mainly answer prompts and the script runs the steps for you!

## <img src=".docs/icons/folder-open.svg" width="22" alt="Install icon" style="vertical-align: middle;" /> Project structure (what the folders mean)

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



# <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-alert-icon lucide-badge-alert"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg> Before you start (What you need)

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
## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pointer-icon lucide-pointer"><path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"/><path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg> How to start 

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
## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg> Running the pipeline

After setup finishes, you will see a simple menu appear on the terminal. You will need to select the option you want to do:
- Step 1 only (download/extract sequences) = **1**
- Step 2 only (align/trim/tree) = **2** 
- Step 1 + Step 2 (full pipeline) = **3**

Depending on which one you chose,the script will then prompt you about important information related to your search, such as:
- Your NCBI e-mail and API, the gene name, or the TaxID of your organism.
- The name of the file you wish to align

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-check-icon lucide-file-check"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m9 15 2 2 4-4"/></svg> Outputs (what files you get)

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

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wrench-icon lucide-wrench"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/></svg> External tools used (Step 2)

- **MUSCLE** — multiple sequence alignment  
- **ClipKIT** — alignment trimming (installed via Python package)
- **IQ-TREE** — phylogenetic tree inference

> Note: On Linux/macOS, `setup.sh` attempts to install MUSCLE and IQ-TREE using `apt` (Debian/Ubuntu) or `brew` (macOS). If your system doesn’t have these package managers, you may need to install MUSCLE/IQ-TREE manually.

---

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-question-mark-icon lucide-message-circle-question-mark"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> Additional information

If you have any trouble with the pipeline, or just wish to know more about it and bioinformatics in general, check out the webpage for this repository!
https://pujals298.github.io/NBGD-NCBI-Bacterial-Gene-Downloader/
