"""Load the case into Hindsight. RUN ONCE, by ONE person only (or you'll get duplicate memories)."""
from memory import ensure_bank, retain_doc
from case_data import DOCS

if __name__ == "__main__":
    ensure_bank()
    for name, text in DOCS:
        retain_doc(name, text)
        print(f"Retained: {name}")
    print("Done. Case memory loaded.")