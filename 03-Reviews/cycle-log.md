---
cycle_start: '2026-08-10'
cycle_number: 2
cycle_length_weeks: 5
---

# Cycle Log

Sable reads `cycle_start` to compute which week of the 5-week exam cycle it currently is. When Ashen's exam for a cycle completes, bump `cycle_number` and reset `cycle_start` to the following Monday.
