import argparse
import os
import subprocess
import sys
from pathlib import Path
import platform
import shutil

def run(cmd):
    """Run a command and stop if it fails."""
    cmd_str = [str(item) for item in cmd]
    print("\nRunning:", " ".join(cmd_str))
    subprocess.run(cmd_str, check=True)

def default_output_names(input_file):
    """Generate default output names based on the input file's name."""
    base = os.path.splitext(os.path.basename(input_file))[0]
    aligned = f"{base}_aligned.fasta"
    trimmed = f"{base}_aligned_trimmed.fasta"
    tree_prefix = os.path.join("iqtree_results", base)
    return aligned, trimmed, tree_prefix

def find_executable(possible_names):
    """Search PATH for the first available executable in the list."""
    for name in possible_names:
        exe = shutil.which(name)
        if exe:
            return exe
    return None

def main():
    # Detect platform
    system = platform.system()

    parser = argparse.ArgumentParser(
        description="Align (MUSCLE) -> Trim (ClipKIT) -> Tree (IQ-TREE) [Cross-platform]."
    )
    parser.add_argument("--input", required=True, help="Input FASTA file (unaligned sequences)")
    parser.add_argument("--aligned", default=None,
                        help="Output FASTA file for alignment (default: <input>_aligned.fasta)")
    parser.add_argument("--trimmed", default=None,
                        help="Output FASTA file for trimmed alignment (default: <input>_aligned_trimmed.fasta)")
    parser.add_argument("--clipkit-mode", default="smart-gap",
                        help="ClipKIT trimming mode (default: smart-gap)")
    parser.add_argument("--muscle-exe", default=None,
                        help="Path to MUSCLE executable, or leave blank to auto-discover")
    parser.add_argument("--clipkit-exe", default="clipkit",
                        help="Path to ClipKIT executable (default: clipkit in current Python)")
    parser.add_argument("--iqtree-exe", default=None,
                        help="Path to IQ-TREE executable, or leave blank to auto-discover")
    parser.add_argument("--outgroup", default=None,
                        help="Outgroup name for IQ-TREE (optional)")

    args = parser.parse_args()

    script_dir = Path(__file__).resolve().parent

    # Platform-specific tool names
    if args.muscle_exe is None:
        if system == "Windows":
            # Look for .exe (Windows default)
            possible_muscle = [str(script_dir / "muscle-win64.v5.3.exe"), "muscle-win64.v5.3.exe", "muscle.exe", "muscle"]
        else:
            possible_muscle = ["muscle", "muscle5", "muscle3"] # prefer PATH
        args.muscle_exe = find_executable(possible_muscle)
    # Don't resolve to a .exe on Unix
    if not args.muscle_exe:
        sys.exit("MUSCLE executable not found. Please specify with --muscle-exe")

    if args.iqtree_exe is None:
        if system == "Windows":
            possible_iqtree = [str(script_dir / "bin" / "iqtree2.exe"), "iqtree2.exe", str(script_dir / "bin" / "iqtree.exe")]
        else:
            # On Unix: prefer iqtree2, then iqtree in PATH
            possible_iqtree = ["iqtree2", "iqtree"]
        args.iqtree_exe = find_executable(possible_iqtree)
    if not args.iqtree_exe:
        sys.exit("IQ-TREE executable not found. Please specify with --iqtree-exe")

    # Create output filenames
    aligned, trimmed, tree_prefix = default_output_names(args.input)
    if args.aligned: aligned = args.aligned
    if args.trimmed: trimmed = args.trimmed
    os.makedirs("iqtree_results", exist_ok=True)
    
    # Step 1: Align using MUSCLE
    # For MUSCLE v5 on both Windows and Unix the args are similar
    run([args.muscle_exe, "-align", args.input, "-output", aligned])

    # Step 2: Trim with ClipKIT (use as a Python module, so portable regardless of OS)
    run([sys.executable, "-m", "clipkit", aligned, "-m", args.clipkit_mode, "-o", trimmed])

    # Step 3: Tree with IQ-TREE
    iqtree_command = [
        args.iqtree_exe,
        "-s", trimmed,
        "-m", "TEST",
        "-B", "1000",
        "--prefix", tree_prefix
    ]
    if args.outgroup:
        iqtree_command += ["-o", args.outgroup]
    run(iqtree_command)

if __name__ == "__main__":
    main() 