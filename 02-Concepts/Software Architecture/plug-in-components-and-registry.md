---
subject: Software Architecture
skill_name: Plug-in Components and Registry
score: 0
prerequisites:
- Microkernel Architecture Style
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

# Plug-in Components and Registry

## Summary

**Plug-in components** are **standalone, independent components** that contain
**specialized processing, additional features, and custom code** meant to
**enhance or extend the core system**.

- They can be used to **isolate highly volatile code**, creating better
  **maintainability and testability**
- **Ideally, plug-in components should be independent of each other and have no
  dependencies between them**

**Communication** with the core system is generally **point-to-point** — the
"pipe" is usually a **method invocation or function call to the entry-point class**
of the plug-in.

**Compile-based vs runtime-based:**

- **Runtime** plug-ins can be **added or removed at runtime without redeploying**
  the core system or other plug-ins. Managed through frameworks such as **OSGi
  (Open Service Gateway Initiative) for Java, Penrose (Java), Jigsaw (Java), or
  Prism (.NET)**.
- **Compile-based** plug-ins are **much simpler to manage** but **require the
  entire monolithic application to be redeployed** when modified, added, or
  removed.

**Implementation.** Point-to-point plug-ins can be implemented as **shared
libraries (JAR, DLL, Gem)**, **package names in Java**, or **namespaces in C#**.
An **easier approach** is a separate namespace or package within the same code
base, using the semantics `app.plug-in.<domain>.<context>` — e.g.
`app.plugin.assessment.iphone6s`.

**Remote plug-in access using REST.** Plug-ins do not always have to be
point-to-point — REST or messaging can invoke plug-in functionality, with each
plug-in a standalone service or even a containerised microservice.

**Trade-offs:** it turns the microkernel into a **distributed architecture rather
than a monolithic one**, **difficult to implement and deploy for most third-party
on-prem products**. It creates **more overall complexity and cost** and
**complicates the deployment topology**. And **if a plug-in becomes unresponsive
or is not running, particularly when using REST, the request cannot be
completed** — which **would not be the case with a monolithic deployment**.

**Data.** The plug-in **normally should not connect directly to the main shared
database**. Requests from the plug-in **pass through the core system** to access
the central shared database. **The primary reason is decoupling: making a
database change should only impact the core system, not the plug-in
components.** That said, **plug-ins can have their own separate data stores**,
accessible only to that plug-in.

**The registry.** The core system needs to know **which plug-in modules are
available and how to get to them** — commonly through a **plug-in registry**,
containing each module's **name, data contract, and remote access protocol
details**.

> The registry can be **as simple as an internal map structure** owned by the core
> system (key → plug-in component reference), or **as complex as a registry and
> discovery tool** either embedded within the core system or deployed externally
> — such as **Apache ZooKeeper or Consul**.

**Contracts.** Contracts between plug-ins and the core are **usually standard
across a domain** of plug-ins and include **behavior, input data, and output
data**. **Custom contracts** are typical where plug-ins come from a **third party**
whose contract you do not control — in such cases it is common to **create an
adapter** between the plug-in contract and your standard contract, **so the core
system doesn't need specialized code for each plug-in**.

## Key points

- Runtime vs compile-based is a straight trade: **flexibility vs simplicity**.
- The plug-in-to-database rule and its reason (**decoupling**) is a favourite exam
  question, along with its exception (own private data store, yes; the shared
  database directly, no).

## Watch out for

- Adapters are the standard answer for third-party contracts, and the reasoning
  is worth keeping: **without one, the core system accumulates a special case per
  plug-in — which is exactly the cyclomatic complexity microkernel exists to
  remove.**

## Prerequisites

[[microkernel-architecture-style]]
