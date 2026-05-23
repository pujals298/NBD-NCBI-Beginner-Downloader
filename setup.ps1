$ErrorActionPreference = "Stop"

if (!(Test-Path ".\.venv\Scripts\python.exe")) {
    Write-Host "Creating local Python environment (.venv)..."
    py -m venv .venv
}

Write-Host "Installing required Python packages..."
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

Write-Host "Running aln_trim_tree.py..."
.\.venv\Scripts\python.exe .\run.py