---
subject: Modern Software Engineering Principles
skill_name: Good Programming Practice
score: 0
prerequisites:
- Design Activity
source:
- 2026-SEA601-05-Implementation_Testing_and_Maintenance.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 5
---

# Good Programming Practice

## Summary

The implementation activity is **coding, unit testing, integration, and
acceptance testing** — and the reason good practice matters is stated up front:
**maintenance is important**, therefore **maintainability**, therefore
**readability**.

**Five practices:**

1. **Consistent and meaningful variable names**
2. The issue of **self-documenting code**
3. **Use of parameters**
4. **Code layout for increased readability**
5. **Nested if statements**

**1. Variable names.** *"Meaningful" to future maintenance programmers* and
*"Consistent" to aid future maintenance programmers*.

The worked example: a code artifact contains `freqAverage`, `frequencyMaximum`,
`minFr`, `frqncyTotl`. A maintenance programmer has to work out whether `freq`,
`frequency`, `fr`, `frqncy` all refer to the same thing.

- **If so** — use the identical word, preferably `frequency`, perhaps `freq` or
  `frqncy`, **but not `fr`**.
- **If not** — use a **different word** (e.g. `rate`) for a different quantity.

Either `frequencyAverage, frequencyMaximum, frequencyMinimum, frequencyTotal`
**or** `averageFrequency, maximumFrequency, minimumFrequency, totalFrequency`
works — but **all four names must come from the same set**.

**3. Use of parameters.**

> **There are almost no genuine constants.**

- *One solution*: use `const` statements (C++) or `public static final` (Java)
- *A better solution*: **read the values of "constants" from a parameter file**

**4. Code layout.** Use **indentation**; use **plenty of blank lines** to break up
big blocks of code.

## Key points

- Every rule here is justified by **the future maintenance programmer**, not by
  aesthetics. That is the through-line to quote in an exam.
- Consistency beats individual name quality: a uniformly mediocre naming scheme
  is more maintainable than a mix of four good ones.

## Watch out for

- **AI touchpoint:** good programming practice **holds unchanged** and *"applies
  to the 90% that is not the model. **Notebooks are not an exemption.**"*

## Prerequisites

[[design-activity]]
