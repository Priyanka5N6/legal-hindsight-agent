"""Quick check that recall + reflect work against Hindsight Cloud."""
from memory import find_relevant, check_draft, find_precedent
from case_data import SAMPLE_CONTRADICTING_DRAFT, SAMPLE_CONSISTENT_DRAFT

print("\n=== RECALL ===")
for m in find_relevant("production shutdown and losses"):
    print("-", m[:120])

print("\n=== REFLECT: contradicting draft ===")
print(check_draft(SAMPLE_CONTRADICTING_DRAFT))

print("\n=== REFLECT: consistent draft ===")
print(check_draft(SAMPLE_CONSISTENT_DRAFT))

print("\n=== PRECEDENT ===")
print(find_precedent("Halden's late delivery is a material breach because time was of the essence."))