---
subject: Data Science and Engineering Principles
skill_name: Scales of Measurement
score: 0
prerequisites:
- Types of Data and Variables
source:
- EDA-Model Fitting.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from EDA-Model Fitting.pdf
---

# Scales of Measurement

## Summary

A refinement of the categorical/numerical split into four measurement scales,
each one adding a property the previous scale lacked.

| Scale | Adds | Examples |
|---|---|---|
| **Nominal** | Labels only, no order | Blood type, zip code, gender, race, eye colour, political party |
| **Ordinal** | Order, but unequal/unknown gaps | Socio-economic status (low/middle/high income), education level (high school, BS, MS, PhD), satisfaction rating |
| **Interval** | Equal intervals, but arbitrary zero | Temperature in Fahrenheit or Celsius, pH, TOEFL score (310–677), AD year, BE year |
| **Ratio** | A true zero meaning "none of it" | Dose amount, flow rate, concentration, pulse, weight, length, temperature in Kelvin |

## Key points

- The dividing line between interval and ratio is whether **zero means absence**.
  0 °C does not mean "no heat", so Celsius is interval. 0 Kelvin does mean no
  heat (−273.15 °C), so Kelvin is ratio.
- Because interval scales have an arbitrary zero, ratios of interval values are
  meaningless: 20 °C is not "twice as hot" as 10 °C.
- Ratio scales support every arithmetic operation; nominal scales support none.

## Watch out for

- Zip codes and area codes look numeric but are nominal. Averaging them produces
  a number with no meaning.
- Exam scores and standardised test scores are usually treated as interval, not
  ratio — a score of 0 rarely means "zero knowledge".

## Prerequisites

[[types-of-data-and-variables]]
