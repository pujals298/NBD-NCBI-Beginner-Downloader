import argparse # With parsing we can make the code reusable without changing the code itself
import os
import subprocess
import sys
from pathlib import Path

def run(cmd): # A function to run an external program and not have to repeat it for each program we want to run (MUSCLE, ClipKIT, IQ-TREE)
    """Run a command and stop if it fails."""
    cmd_str = [str(item) for item in cmd]
    print("\nRunning:", " ".join(cmd_str))
    subprocess.run(cmd_str, check=True)
    # check=True makes Python stop immediately if a command fails 

def default_output_names(input_file): # To automatically generates the names for your output files based on the input file name
    """Generate default output names based on the input file's name."""
    base = os.path.splitext(os.path.basename(input_file))[0] # To get only the base name, not the extension (.fasta) 
    aligned = f"{base}_aligned.fasta"
    trimmed = f"{base}_aligned_trimmed.fasta"
    tree_prefix = os.path.join("iqtree_results", base)
    return aligned, trimmed, tree_prefix # Stores the three names into variables for later use

    # If the user wants custom names they can use --aligned or --trimmed to set those explicitly

def main():
    parser = argparse.ArgumentParser( # To define which arguments the script accepts (so the ones the user can provide when running the script)
        description="Align (MUSCLE) -> Trim (ClipKIT) -> Tree (IQ-TREE)."
    )
    # Every "add_argument" line are the specific options allowed (like --input)
    parser.add_argument("--input", required = True, #The only thing that the user will need to provide is the input file
                        help="Input FASTA file (unaligned sequences)")
    parser.add_argument("--aligned", default=None,
                        help="Output FASTA file for alignment (default: <input>_aligned.fasta)")
    parser.add_argument("--trimmed", default=None,
                        help="Output FASTA file for trimmed alignment (default: <input>_aligned_trimmed.fasta)")

    # Let the user choose ClipKIT behavior without changing code.
    parser.add_argument("--clipkit-mode", default="smart-gap",
                        help=("ClipKIT trimming mode (e.g., smart-gap, gappy, "
                              "kpic, kpic-smart-gap). Default: smart-gap"))

    parser.add_argument("--muscle-exe", default="muscle-win64.v5.3.exe",
                        help="Path to MUSCLE executable")
    parser.add_argument("--clipkit-exe", default="clipkit",
                        help="Path to ClipKIT executable")
    parser.add_argument("--iqtree-exe", default=r"bin\iqtree2.exe",
                        help="Path to IQ-TREE executable")
    parser.add_argument("--outgroup", default=None,
                    help="Outgroup name for IQ-TREE (if omitted, IQ-TREE defaults to first taxon)")

    args = parser.parse_args() # To actually parse the arguments provided by the user when running the script. Read what the user typed, and store it in args.
    # If the user doesn’t provide an argument, it uses the default you defined.

    script_dir = Path(__file__).resolve().parent

    # Make default tool paths relative to this script location
    args.muscle_exe = str((script_dir / args.muscle_exe).resolve()) if args.muscle_exe == "muscle-win64.v5.3.exe" else args.muscle_exe
    if args.iqtree_exe == r"bin\iqtree2.exe":
        args.iqtree_exe = str((script_dir / "bin" / "iqtree2.exe").resolve())

    # Create output filenames (automatically if not specified)
    aligned, trimmed, tree_prefix = default_output_names(args.input) # This calls the function default_output_names, passing in the argument args.input (the input file name provided by the user). Tuple unpacking.
    if args.aligned: aligned = args.aligned # These lets the user override the default filenames
    if args.trimmed: trimmed = args.trimmed
    os.makedirs("iqtree_results", exist_ok=True)
    
    # Step 1: Align using MUSCLE
    run([args.muscle_exe, "-align", args.input, "-output", aligned])

    # Step 2: Trim using ClipKIT
    # ClipKIT CLI format: clipkit <alignment> -m <mode> -o <output>
    run([sys.executable, "-m", "clipkit", aligned, "-m", args.clipkit_mode, "-o", trimmed])
    # Due to an error with the executable, we tell python to run ClipKIT as a module using the current Python interpreter (sys.executable)
   
    # Step 3: Tree with IQ-TREE
    iqtree_command = [
        args.iqtree_exe,
        "-s", trimmed,
        "-m", "TEST",
        "-B", "1000",
        "--prefix", tree_prefix
    ]
    if args.outgroup:          # Only add -o if it's not None or empty
        iqtree_command += ["-o", args.outgroup]
    run(iqtree_command)

if __name__ == "__main__":
    main()