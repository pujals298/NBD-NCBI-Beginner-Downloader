#!/usr/bin/env bash
set -euo pipefail

# Function to install MUSCLE and IQ-TREE using apt if on Linux
install_tools() {
  if command -v apt-get &>/dev/null; then
    echo "Detected apt package manager (Linux/Debian/Ubuntu). Installing MUSCLE and IQ-TREE..."
    sudo apt-get update
    sudo apt-get install -y muscle iqtree
  elif command -v brew &>/dev/null; then
    echo "Detected Homebrew (macOS). Installing MUSCLE and IQ-TREE..."
    brew install muscle iqtree
  else
    echo "No supported package manager found (tried apt and brew)."
    echo "Please manually install MUSCLE and IQ-TREE for your OS."
    echo "For macOS: https://formulae.brew.sh/formula/muscle and https://formulae.brew.sh/formula/iqtree"
    echo "For Linux: https://www.drive5.com/muscle/ and http://www.iqtree.org/#download"
  fi
}

# Create venv if missing
if [ ! -f ".venv/bin/python" ]; then
  echo "Creating local Python environment (.venv)..."
  python3 -m venv .venv
  VENV_CREATED=1
else
  VENV_CREATED=0
fi

# Install UNIX tools (if missing)
if ! command -v muscle &>/dev/null || ! command -v iqtree &>/dev/null; then
  install_tools
fi

echo "Installing required Python packages..."
.venv/bin/python -m pip install --upgrade pip
.venv/bin/python -m pip install -r requirements.txt

if [[ "$VENV_CREATED" -eq 1 ]]; then
  echo "Virtual environment created."

  # Open a new shell with venv activated if running interactively
  if [[ -t 1 ]]; then
    echo "Opening a new shell with the Python virtual environment activated..."
    exec bash --rcfile <(echo '. .venv/bin/activate')
  else
    echo "To activate the virtual environment, run: source .venv/bin/activate"
  fi
else
  echo "To activate the virtual environment, run: source .venv/bin/activate"
fi

echo "To run the pipeline: .venv/bin/python ./run.py"