---
subject: Software Architecture
unit: Architecture Styles
skill_name: Data Pumps Writers and Readers
score: 0
prerequisites:
- Processing Unit and Virtualized Middleware
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03
---

# Data Pumps Writers and Readers

## Summary

**Data pump.**

> A data pump is a way of **sending data to another processor which then updates
> data in a database**. Data pumps are a **necessary component** within
> space-based architecture, as **processing units do not directly read from and
> write to a database**.

> Data pumps within a space-based architecture are **always asynchronous**,
> providing **eventual consistency** with the in-memory cache and the database.

In most cases there are **multiple data pumps**, each usually **dedicated to a
particular domain or subdomain** (such as customer or inventory). They can be
dedicated to **each type of cache** (CustomerProfile, CustomerWishlist, …) or to
**a processing unit domain** (such as Customer) containing a larger general
cache.

**Data writer.**

> The data writer component **accepts messages from a data pump and updates the
> database** with the information contained in the message. Data writers can be
> implemented as **services, applications, or data hubs** (such as Ab Initio).
> The **granularity** of data writers can vary based on the scope of the data
> pumps.

Alternatively, **each class of processing unit can have its own dedicated data
writer**, containing only the database processing logic for that processing unit
(such as Wallet). This **tends to produce too many data writer components**, but
**provides better scalability and agility** due to the alignment.

**Data reader.**

> Data readers take on the responsibility for **reading data from the database and
> sending it to the processing units via a reverse data pump**.

**Data readers are only invoked under one of three situations:**

1. **A crash of all processing unit instances** of the same named cache
2. **A redeployment of all processing units** within the same named cache
3. **Retrieving archive data** not contained in the replicated cache

The mechanism: the data reader accepts the read request, performs the necessary
database query, and sends the data to a different queue called a **reverse data
pump**. The **temporary cache owner** processing unit receives the data and loads
the cache; once all data is loaded, **the temporary owner releases the lock** on
the cache.

**Data abstraction layer vs data access layer.**

> Data writers and readers essentially form what is usually known as a **data
> abstraction layer** (or **data access layer** in some cases). **The difference
> between the two is in the amount of detailed knowledge the processing units
> have with regard to the structure of the tables (or schema) in the database.**

- **Data access layer** — the processing units are **coupled to the underlying
  data structures** in the database, and only use readers and writers to
  **indirectly access** it.
- **Data abstraction layer** — the processing unit is **decoupled from the
  underlying database table structures through separate contracts**.

## Key points

- **The three data-reader situations are a favourite exam question.** Note what
  they have in common: the cache is **empty or incomplete**. Normal reads never
  touch the database.
- Data pumps are **always asynchronous** — this is the sentence that makes
  eventual consistency unavoidable in this style.

## Watch out for

- **Data abstraction layer** and **data access layer** are **not** synonyms here,
  even though they are used loosely elsewhere. The discriminator is **coupling to
  the schema**.

## Prerequisites

[[processing-unit-and-virtualized-middleware]]
