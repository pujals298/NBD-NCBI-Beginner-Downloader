# RUNNING THE PIPELINE
import subprocess
import sys
from pathlib import Path

# Define theroute for each step:

STEP1 = Path("1 SEARCH GENES") / "refseq.py"
STEP2 = Path("2 ALN_TRIM_TREE") / "aln_trim_tree.py"

# Define the auxiliary function

def run(cmd:list[str]) -> None: # This means that the function run takes a list of strings as an argument and returns nothing (None).
    cmd = [str(c) for c in cmd]
    print("\nRunning:", cmd)
    subprocess.run(cmd, check=True)

# Define the main function

def main():
    print("=== Pipeline runner ===")
    print("1) Step 1 (download/extract sequences)")
    print("2) Step 2 (align/trim/tree)")
    print("3) Step 1 + Step 2")
    choice = input("Choose an option [1/2/3]: ").strip()

    if choice not in {"1", "2", "3"}:
        print("Invalid option")
        return

    if choice in {"1", "3"}:
        if not STEP1.exists():
            print(f"Step 1 script not found: {STEP1}")
            return
        run([sys.executable, STEP1])

    if choice in {"2", "3"}:
        if not STEP2.exists():
            print(f"Step 2 script not found: {STEP2}")
            return

        # Asks for the input file for Step 2, which is the output of Step 1
        fasta = input("\nPath to input FASTA for Step 2: ").strip()
        if not fasta:
            print("No FASTA provided.")
            return

        run([sys.executable, STEP2, "--input", fasta])

    print("\nDone.")

if __name__ == "__main__":
    main()