---
subject: Software Architecture
skill_name: Architecture Quality Attributes
score: 0
prerequisites: []
source:
- CH01_2_13illity_10Style 1.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH01
---

# Architecture Quality Attributes

## Summary

The **thirteen "-ilities"** — the non-functional properties an architecture is
judged on. Every architectural pattern **excels at some and sacrifices others**,
which is what makes pattern selection a trade-off rather than a ranking.

1. **Usability** — how effectively the user can use the system and **the ease
   with which users learn to operate or control it**. The well-known principle is
   **KISS (Keep It Simple Stupid)**. Also refers to methods for improving
   ease-of-use during design.
2. **Reliability** — the ability of a system to **keep operating over time**. The
   **probability of failure-free operation for a specified period in a specified
   environment**. A **customer-oriented** view of quality; relates to **operation
   rather than design**, and hence is **dynamic rather than static**.
3. **Availability** — the **ratio of available system time to total working
   time** it is required to function. Broader than reliability; **encompasses
   reliability plus additional considerations such as downtime due to periodic
   maintenance**.
4. **Portability** — the ability to run on numerous platforms; **the possibility
   to use the same software in different environments**. Common kinds:
   **application, source code, and data portability**.
5. **Testability** — how well the system facilitates tests to determine whether
   predefined test criteria have been met. **If testability is high, finding
   faults by means of testing is easier.**
6. **Scalability** — the ability to **handle demand caused by increased usage
   without decreasing performance**; how easy it is to **grow or shrink**, with
   **minimal cost impact**.
7. **Flexibility** — the ability to **adapt to future changes**, during
   development or after deployment.
8. **Reusability** — the use of existing software in more than one product with
   **small or no change**; **cost-efficient and time-saving**. Assets include
   code, components, test suites, designs, documentation.
9. **Maintainability** — IEEE: *"The ease with which a software system or
   component can be modified to correct faults, improve performance or other
   attributes, or adapt to a changed environment."*
10. **Supportability** — the characteristics that allow **effective and efficient
    sustainment** (maintenance and other support functions) throughout the
    system's life cycle.
11. **Interoperability** — the ability of two or more systems to **communicate or
    exchange data easily and to use the data exchanged**, in real time, without
    specialized IT support or behind-the-scenes coding.
12. **Performance** — **responsiveness to various actions within a certain period
    of time**; performance testing determines responsiveness and stability under
    a particular workload.
13. **Security** — the ability to **resist or block malicious or unauthorized
    attempts** that destroy the system **while still providing access to
    legitimate users**.

## Key points

- **Reliability vs Availability** is the classic exam pair. Reliability is
  failure-free operation over a period; availability is the **ratio of uptime**
  and **includes planned downtime**. Availability is the broader term.
- Reliability is explicitly **dynamic, not static** — a property of operation, not
  of the code as written.
- Security's definition has **two halves**, and only citing the "block attackers"
  half misses the point: it must **simultaneously provide access to legitimate
  users**.

## Watch out for

- These attributes are what **architecture drivers** are expressed in. *"There is
  no best architecture — only the least worst set of trade-offs for a given
  context."* (Neal Ford & Mark Richards)

## Prerequisites

None — this is a root concept for the subject.
