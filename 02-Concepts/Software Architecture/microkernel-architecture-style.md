---
subject: Software Architecture
skill_name: Microkernel Architecture Style
score: 0
prerequisites:
- Architectural Pattern
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

# Microkernel Architecture Style

## Summary

Also referred to as the **plug-in architecture**. Coined several decades ago and
still widely used.

> A natural fit for **product-based applications** — packaged and made available
> for download and installation as a **single, monolithic deployment**, typically
> installed on the customer's site as a third-party product — but **widely used in
> many nonproduct custom business applications as well**.

**Topology.** A relatively **simple monolithic architecture** consisting of **two
architecture components**:

1. A **core system**
2. **Plug-in components**

Application logic is divided between them, providing **extensibility,
adaptability, and isolation** of application features and custom processing
logic.

**The core system** is formally defined as **the minimal functionality required
to run the system**.

> The core system is **the happy path** (general processing flow) through the
> application, with **little or no custom processing**.

> **Removing the cyclomatic complexity of the core system and placing it into
> separate plug-in components** allows for **better extensibility and
> maintainability, as well as increased testability**.

**The worked example.** Traditional code:

```java
public void assessDevice(String deviceID) {
  if (deviceID.equals("iPhone6s")) {
     assessiPhone6s();
  } else if (deviceID.equals("iPad1"))
     assessiPad1();
  } else if (deviceID.equals("Galaxy5"))
     assessGalaxy5();
  } else ...
}
```

Microkernel style:

```java
public void assessDevice(String deviceID) {
  String plugin = pluginRegistry.get(deviceID);
  Class<?> theClass = Class.forName(plugin);
  Constructor<?> constructor = theClass.getConstructor();
  DevicePlugin devicePlugin = ...
}
```

> Rather than placing all this client-specific customization in the core system
> with lots of cyclomatic complexity, **it is much better to create a separate
> plug-in component for each electronic device being assessed.**

**Core system implementation.** Depending on size and complexity, the core system
can be implemented as a **layered architecture or a modular monolith**. In some
cases it can be **split into separately deployed domain services**, each
containing plug-ins specific to that domain. The **presentation layer** can be
**embedded within the core system** or implemented as a **separate user
interface** with the core providing backend services — and that separate UI **can
itself be a microkernel architecture**.

In all these cases, **it is typical for the entire monolithic application to
share a single database**.

## Key points

- **Cyclomatic complexity** is the quantity being moved. The before/after code is
  the entire argument: a growing `else if` chain becomes a registry lookup.
- The example given for the domain-service variant: **Payment Processing** as the
  core system, with **credit card, PayPal, store credit, gift card** as separate
  plug-ins.

## Watch out for

- It is **monolithic**, despite sounding modular. Even with **remote plug-in
  access via REST**, it is **still only a single architecture quantum** because of
  the monolithic core — every request must first go through the core system to
  reach a plug-in.

## Prerequisites

[[architectural-pattern]]
