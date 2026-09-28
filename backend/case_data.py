"""Synthetic (fictional) case used for the demo. All names, dates and cases are invented."""

DOCS = [
    ("Complaint (filed June 3)",
     "Riverside Logistics v. Halden Manufacturing. Riverside alleges Halden breached the supply "
     "contract by failing to deliver 5,000 units by the March 15 deadline. Section 4.2 of the "
     "contract states that time is of the essence. The late delivery halted Riverside's "
     "production line for 12 days and caused $240,000 in lost production. Riverside also alleges "
     "Halden terminated the contract with only 7 days' notice, violating Section 9, which requires 30 days."),

    ("Deposition summary - Priya Nair, Riverside Operations Manager",
     "Nair testified that Riverside's production line stopped on March 16 and did not restart "
     "until March 27, a 12-day shutdown. She called Halden three times about the delay and "
     "followed up in writing by email on March 18. She stated the shutdown forced Riverside to "
     "pay idle workers and cancel two customer orders."),

    ("Motion for Partial Summary Judgment (filed August 2)",
     "Riverside argues that because Section 4.2 makes time of the essence, Halden's late "
     "delivery is a material breach as a matter of law. Riverside argues it suffered severe "
     "operational disruption, including a 12-day production shutdown and $240,000 in losses, "
     "and that it objected promptly and in writing on March 18."),

    ("Witness statement - Tom Becker, Halden Logistics Manager",
     "Becker admits a truck breakdown delayed the shipment and that the units arrived on March 27, "
     "twelve days after the deadline. He states Halden did not warn Riverside in advance. "
     "He says he was not aware of any Riverside production shutdown."),

    ("Past case - Marlow Foods v. Crestline Packaging (fictional)",
     "Court enforced a time-of-essence clause and found a material breach where late delivery "
     "halted the buyer's production. Buyer was awarded lost-production damages because it "
     "documented the shutdown and objected in writing promptly."),

    ("Past case - Delta Freight v. Ostrum Parts (fictional)",
     "Court denied damages for late delivery where the buyer described the delay as a minor "
     "inconvenience, kept operating, and accepted the goods without objection. The court held "
     "the delay was not a material breach."),
]

# A new paragraph that CONTRADICTS the earlier filings (use this in the demo).
SAMPLE_CONTRADICTING_DRAFT = (
    "Halden's delay caused Riverside only a minor inconvenience. Production continued with "
    "minimal interruption, and Riverside's actual losses from the delay were negligible."
)

# A paragraph that is CONSISTENT with the earlier filings (use this to show no false alarms).
SAMPLE_CONSISTENT_DRAFT = (
    "Halden's twelve-day delay halted Riverside's production line and, under Section 4.2, "
    "constitutes a material breach causing significant losses."
)