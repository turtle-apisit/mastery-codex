/**
 * Final Approach exam — "Software Architecture" (80 MCQ + 20 written),
 * authored directly against the vault's concept notes in
 * `02-Concepts/Software Architecture/`.
 *
 * Coverage blueprint (per `exam-design`): all 75 of the subject's concept notes
 * get at least one item, and each note's own "Watch out for" section is the
 * first place a distractor is drawn from — those are the errors the capture
 * already identified as worth testing. Each item's `source` field names the note
 * it came from, so a wrong answer maps straight back to one file.
 *
 * The six units follow the five source decks, with the CH03 architecture-styles
 * deck split into its monolithic/distributed half (Unit 3) and its microservices
 * half (Unit 4), since together they carry 27 notes.
 *
 * Unlike `modernSwePrinciples.ts`, which is a verbatim transcription of the
 * hand-written exam in `test-exam-pattern-solution/`, this file is the exam's
 * primary source — there is no markdown original to re-transcribe from. Edit it
 * directly, and keep the correct answer spread across all four letters: this
 * exam is taken with the options in the order written, so a bank whose answer is
 * always "A" can be passed without reading the options.
 */

import type {
  ExamItem,
  ExamMeta,
  Letter,
  MCQItem,
  MCQOption,
  UnitInfo,
  WrittenItem,
} from "./types";

export const UNITS: UnitInfo[] = [
  { number: 1, title: "Foundations & Quality Attributes", mcq: 10, written: 3, total: 13, minutes: 64 },
  { number: 2, title: "The Classic Pattern Catalogue", mcq: 11, written: 3, total: 14, minutes: 64.5 },
  { number: 3, title: "Monolithic & Distributed Styles", mcq: 16, written: 4, total: 20, minutes: 95.5 },
  { number: 4, title: "Microservices & Distributed Concerns", mcq: 14, written: 4, total: 18, minutes: 87.5 },
  { number: 5, title: "Model-Driven Architecture", mcq: 7, written: 2, total: 9, minutes: 44.5 },
  { number: 6, title: "Generative AI & LLM Architecture", mcq: 22, written: 4, total: 26, minutes: 105.5 },
];

export const EXAM_META: ExamMeta = {
  totalItems: 100,
  mcqCount: 80,
  writtenCount: 20,
  totalMinutes: 461.5,
};

function mcq(
  id: string,
  unit: number,
  minutes: number,
  source: string,
  prompt: string,
  options: [MCQOption, MCQOption, MCQOption, MCQOption],
  correct: Letter
): MCQItem {
  return { id, unit, type: "mcq", minutes, source, prompt, options, correct };
}

function written(
  id: string,
  unit: number,
  minutes: number,
  source: string,
  prompt: string,
  mustContain: string,
  trap: string,
  grading: string
): WrittenItem {
  return { id, unit, type: "written", minutes, source, prompt, mustContain, trap, grading };
}

export const EXAM_ITEMS: ExamItem[] = [
  // ============ Unit 1 — Foundations & Quality Attributes ============
  mcq(
    "U1-M01", 1, 2, "architecture-quality-attributes.md",
    `An SLA draft promises both "99.95% availability" and "a mean time between failures of six months." A manager says these are the same guarantee restated in different units. Evaluate.`,
    [
      { letter: "A", text: `Correct — both express the same failure-free-operation property, one as a ratio and one as an interval.`, rationale: `collapses two attributes the course separates; availability includes planned downtime, reliability does not.` },
      { letter: "B", text: `Wrong. Reliability is the probability of failure-free operation for a specified period in a specified environment — a customer-oriented view relating to operation rather than design, and hence dynamic rather than static. Availability is the ratio of available system time to total required working time, and is the broader term: it encompasses reliability plus additional considerations such as downtime due to periodic maintenance.` },
      { letter: "C", text: `Wrong, and the other way round — reliability is the broader term, since availability only counts unplanned outages.`, rationale: `inverts which term is broader and misdescribes availability, which explicitly covers downtime for periodic maintenance.` },
      { letter: "D", text: `Wrong, because reliability is a static property of the code as written and cannot be expressed as a rate.`, rationale: `the course states reliability relates to operation rather than design, and is hence dynamic rather than static.` },
    ],
    "B"
  ),
  mcq(
    "U1-M02", 1, 2.5, "architecture-quality-attributes.md",
    `A design document proposes locking a customer portal so tightly that every legitimate login requires a manually approved ticket, calling this "maximum security," and elsewhere defines usability as "how attractive the interface looks." Evaluate both claims against the course's definitions.`,
    [
      { letter: "A", text: `Both are right — maximal blocking is by definition maximal security, and usability is a presentation concern.`, rationale: `endorses both errors, and drops the second half of the security definition entirely.` },
      { letter: "B", text: `The security claim is right; the usability claim is wrong.`, rationale: `keeps the one-sided security definition the note explicitly warns against.` },
      { letter: "C", text: `The security claim is wrong; the usability claim is right, since usability really is about interface aesthetics.`, rationale: `fixes security but leaves usability defined as appearance rather than effectiveness and ease of learning.` },
      { letter: "D", text: `Both are wrong. Security is the ability to resist or block malicious or unauthorized attempts while still providing access to legitimate users — a control that blocks legitimate access fails the definition's second half. Usability is how effectively the user can use the system and the ease with which users learn to operate or control it, with KISS as its well-known principle — not visual polish.` },
    ],
    "D"
  ),
  mcq(
    "U1-M03", 1, 2, "architectural-pattern.md",
    `A team selects an architecture style because it is the one most discussed at conferences this year. What does the course say about how a pattern should be selected?`,
    [
      { letter: "A", text: `The chain runs architecture drivers → quality attributes → pattern, and it must be run in that direction. Selecting a pattern is not about following trends but about satisfying architecture drivers, and every pattern excels at certain quality attributes while sacrificing others — "there is no best architecture, only the least worst set of trade-offs for a given context" (Neal Ford & Mark Richards).` },
      { letter: "B", text: `Following the current trend is defensible, because the most widely adopted pattern has the most tooling and hiring support.`, rationale: `this is the failure mode the slides name explicitly when they say pattern selection is not about following trends.` },
      { letter: "C", text: `The chain runs pattern → quality attributes → drivers: pick a pattern, then derive which attributes and drivers it serves.`, rationale: `reverses the direction, which amounts to choosing first and rationalising afterwards.` },
      { letter: "D", text: `There is a best architecture for each class of system; the "least worst trade-offs" quotation applies only to legacy systems.`, rationale: `contradicts the governing quotation of the whole subject, which is stated without qualification.` },
    ],
    "A"
  ),
  mcq(
    "U1-M04", 1, 2, "architectural-pattern.md",
    `How does an architectural pattern relate to a software design pattern, and which ten patterns does CH01 catalogue?`,
    [
      { letter: "A", text: `They are unrelated concepts — design patterns concern objects, architectural patterns concern deployment topology.`, rationale: `the course defines them as the same idea at a broader scope, and architectural patterns govern layout and responsibility boundaries, not only deployment.` },
      { letter: "B", text: `Architectural patterns are the narrower of the two, since each one solves a single, specific problem.`, rationale: `inverts the scope relation — an architectural pattern has the broader scope.` },
      { letter: "C", text: `Same idea, broader scope: a design pattern shapes classes, an architectural pattern shapes the system, defining high-level layout, responsibility boundaries and interaction modes. The ten are layered, client-server, master-slave, pipe-filter, broker, peer-to-peer, event-bus, model-view-controller, blackboard, and interpreter.` },
      { letter: "D", text: `Same idea, broader scope, and the ten include microservices and space-based architecture.`, rationale: `microservices and space-based are architecture styles from the CH03 deck, not members of the CH01 ten-pattern catalogue.` },
    ],
    "C"
  ),
  mcq(
    "U1-M05", 1, 2, "anti-pattern.md",
    `Which statement of what an anti-pattern is, and where the term came from, is correct?`,
    [
      { letter: "A", text: `Any bad design decision counts as an anti-pattern once it has been made more than once on a project.`, rationale: `drops the "common response to a recurring problem" half of the definition — an anti-pattern is a bad idea that is commonly reached for.` },
      { letter: "B", text: `A common response to a recurring problem that is usually ineffective and risks being highly counterproductive. Both halves are needed: not merely a bad idea, but a bad idea commonly reached for because it looks like the obvious response. Coined in 1995 by Andrew Koenig, inspired by the book Design Patterns, and popularized three years later by the book AntiPatterns.` },
      { letter: "C", text: `As in (B), except that the term was coined by the Gang of Four in Design Patterns itself.`, rationale: `Design Patterns inspired the term; Andrew Koenig coined it in 1995, three years before AntiPatterns popularized it.` },
      { letter: "D", text: `A pattern that was once recommended and has since fallen out of fashion.`, rationale: `makes it a matter of fashion rather than of being ineffective and counterproductive.` },
    ],
    "B"
  ),
  mcq(
    "U1-M06", 1, 2, "big-ball-of-mud.md",
    `A reviewer labels a well-modularised monolith a "big ball of mud" on the grounds that it is a monolith. Evaluate.`,
    [
      { letter: "A", text: `Right — every monolith becomes a big ball of mud once it exceeds a certain size.`, rationale: `makes size the criterion, which the note explicitly rejects: the defining property is no real internal structure.` },
      { letter: "B", text: `Right, because the term simply describes any application shipped as a single deployment unit.`, rationale: `that describes a monolith, not the anti-pattern a monolith can degrade into.` },
      { letter: "C", text: `Wrong, because big ball of mud is the layered style's named anti-pattern rather than the monolith's.`, rationale: `swaps the comparison-matrix rows — Architecture Sinkhole is layered's named risk, Big Ball of Mud is the monolith's.` },
      { letter: "D", text: `Wrong — a monolith is not a big ball of mud by default. The defining property is no real internal structure (event handlers wired directly to database calls), not size, age or language; a monolith with clear internal module boundaries — a modular monolith — is a legitimate design, and the mud is what happens when those boundaries are never drawn or never enforced.` },
    ],
    "D"
  ),
  mcq(
    "U1-M07", 1, 2.5, "unitary-and-client-server-architecture.md",
    `What drives the evolution from unitary to client/server architecture, how many tiers does client/server have, and what separates it from peer-to-peer?`,
    [
      { letter: "A", text: `Software systems tend to grow in functionality over time, requiring separation of concerns to maintain operational characteristics such as performance and scale. Client/server is a two-tier architecture separating technical functionality between frontend and backend, with roles fixed — which is what distinguishes it from peer-to-peer, where a peer may act as client or server and can change its role dynamically over time.` },
      { letter: "B", text: `Client/server is a three-tier architecture, and its roles can be swapped at runtime.`, rationale: `names the wrong tier count and gives client/server peer-to-peer's dynamic role change.` },
      { letter: "C", text: `The driver was falling hardware cost rather than growth in functionality.`, rationale: `substitutes a cause the deck does not give for the one it states once and applies everywhere: functionality grows, so concerns must be separated.` },
      { letter: "D", text: `Client/server and peer-to-peer are the same pattern under two names, differing only in scale.`, rationale: `erases the fixed-versus-dynamic role distinction that is exactly what separates them.` },
    ],
    "A"
  ),
  mcq(
    "U1-M08", 1, 2.5, "three-tier-architecture.md",
    `How do three-tier architecture and layered architecture relate?`,
    [
      { letter: "A", text: `They are synonyms — "tier" and "layer" name the same thing.`, rationale: `the note separates a deployment topology from a logical organisation precisely because the two can come apart.` },
      { letter: "B", text: `Three-tier is a logical organisation and layered is a deployment topology.`, rationale: `swaps the two: layered is the logical organisation, three-tier the deployment topology.` },
      { letter: "C", text: `Three-tier is a deployment topology — a database tier, an application tier managed by an application server, and a frontend of generated HTML and increasingly JavaScript — popular from the late 1990s and corresponding with network protocols such as CORBA and DCOM. Layered architecture is a logical organisation. They frequently coincide, which is why the terms get used interchangeably, but a layered architecture with all layers in one deployment unit is still monolithic.` },
      { letter: "D", text: `Three-tier is monolithic by definition, since the three tiers always ship together.`, rationale: `three-tier is the point at which the split becomes about distribution — CORBA and DCOM exist to let tiers on different machines call each other.` },
    ],
    "C"
  ),
  mcq(
    "U1-M09", 1, 2, "monolithic-and-distributed-architectures.md",
    `Which sorting of the architecture styles, and which defining test, is correct?`,
    [
      { letter: "A", text: `Monolithic: layered, pipeline. Distributed: microkernel, service-based, event-driven, space-based, service-oriented, microservices — microkernel belongs on the right because plug-ins are separate components.`, rationale: `microkernel is monolithic; even with remote plug-in access via REST it is still a single architecture quantum, because every request must go through the core system.` },
      { letter: "B", text: `Monolithic: layered, pipeline, microkernel. Distributed: service-based, event-driven, space-based, service-oriented, microservices. The defining test is the deployment unit, not the code layout — all three monolithic styles ship as one thing.` },
      { letter: "C", text: `The same two lists, but the test is whether the code is organised into modules.`, rationale: `substitutes code layout for the deployment unit, which is the actual criterion the note names.` },
      { letter: "D", text: `Space-based is monolithic, because its processing units share one in-memory data grid.`, rationale: `space-based sits in the distributed column; the replicated grid is how it distributes, not evidence against distribution.` },
    ],
    "B"
  ),
  mcq(
    "U1-M10", 1, 2.5, "architectural-patterns-comparison.md",
    `Which reading of the pattern comparison matrix is correct?`,
    [
      { letter: "A", text: `Monolithic scores Low on performance, since a single deployment unit cannot be optimised per component.`, rationale: `reverses the row the note flags as the one that surprises people — in-process calls are fast, so Monolithic rates High on performance.` },
      { letter: "B", text: `Event-driven and space-based are the two most testable styles, thanks to their decoupling.`, rationale: `they are the two least testable (Low-Medium and Low); scalability and testability move in opposite directions across the table.` },
      { letter: "C", text: `Every style shares one named anti-pattern — complex error recovery.`, rationale: `complex error recovery is the pipeline's row specifically; each style has its own named anti-pattern.` },
      { letter: "D", text: `Monolithic scores High on both performance and testability — better than most distributed styles on both, because in-process calls are fast and a single deployment unit is easy to test end to end — while scoring Low on scalability and deployability, with Big Ball of Mud as its named anti-pattern.` },
    ],
    "D"
  ),

  written(
    "U1-W01", 1, 14, "architecture-quality-attributes.md",
    `An SLA draft contains three clauses: (a) "99.99% availability", (b) "no more than one failure per quarter", and (c) "the system must block all unauthorized access". For each, name the quality attribute it expresses and give the course's definition of that attribute. Then identify the one clause that is incomplete as written, and say exactly what is missing.`,
    `(a) Availability — the ratio of available system time to the total working time the system is required to function. It is the broader of the first two terms: it encompasses reliability plus additional considerations such as downtime due to periodic maintenance. (b) Reliability — the ability of a system to keep operating over time; the probability of failure-free operation for a specified period in a specified environment. It is a customer-oriented view of quality, relates to operation rather than design, and is hence dynamic rather than static. (a) and (b) are therefore not redundant: one counts uptime including planned maintenance, the other counts failure-free operation. (c) Security, and this is the incomplete clause. The course's definition has two halves: the ability to resist or block malicious or unauthorized attempts that destroy the system while still providing access to legitimate users. As written, clause (c) is satisfied by a system that admits nobody at all. These attributes are also what architecture drivers are expressed in, and no architecture maximises all thirteen — "there is no best architecture, only the least worst set of trade-offs for a given context."`,
    `Treating (a) and (b) as redundant restatements of one another, or accepting (c) as complete because blocking attackers is what "security" means colloquially.`,
    `+15–20 requires all three attributes named with the course definitions, availability identified as the broader term that includes planned maintenance downtime, and security's missing second half stated explicitly. +10–14 if the reliability/availability pair is handled correctly but the security omission is not spotted.`
  ),
  written(
    "U1-W02", 1, 16, "architectural-patterns-comparison.md",
    `A FinTech company, "FastPay", has three subsystems. (1) A Trading Core doing high-frequency stock order matching: millions of transactions per second, sub-millisecond latency, zero downtime. (2) A User Profile and Admin Backoffice: user onboarding, KYC document verification, administrative reporting, standard traffic. (3) A Fraud Detection Engine: real-time stream analysis passing each transaction through multiple sequential AI and rule evaluation models. Select the optimal pattern for each subsystem, justify each choice by linking the stated drivers to quality attributes, name each choice's primary risk from the comparison matrix, and state the general lesson this exercise is built to teach.`,
    `(1) Trading Core → Space-Based. Sub-millisecond latency, zero downtime and extreme volume point at Scalability Extremely High and Performance High. The style delivers them by removing the central database as a synchronous constraint and using replicated in-memory data grids, with processing units starting up and shutting down dynamically to give variable scalability. Primary risk: Data Collisions & Sync Failures — collision rates should be calculated at minimum, normal and peak update rates. (2) Backoffice → Layered (Monolithic is also defensible). Standard traffic and ordinary CRUD do not justify distributed complexity; layered is perhaps the lowest-cost architecture style, simple and familiar, with overall cost and simplicity as its primary strengths, and a good default while requirements are still being analysed. Primary risk: Architecture Sinkhole — mitigated by open/closed layers so that pass-through requests can skip a layer contributing nothing. (If Monolithic is chosen, the risk is Big Ball of Mud.) (3) Fraud Detection → Pipeline (Pipes and Filters). "Multiple sequential evaluation models" is exactly unidirectional data flow through independent, generally stateless filters joined by point-to-point pipes, giving high composability and modularity so a model can be reordered or replaced without impacting the others; Testability rates High. Primary risk: Complex Error Recovery — error handling and transaction rollback across filters are complex, and state management must be handled carefully. The general lesson: one system uses several patterns — match patterns to specific subdomain drivers rather than picking one style for the whole product, because there is no best architecture, only the least worst set of trade-offs for a given context.`,
    `Choosing a single pattern for the whole of FastPay, or naming the three patterns correctly but justifying them from the patterns' general benefits instead of the specific driver words in the scenario.`,
    `+15–20 requires all three patterns chosen correctly, each justified from the scenario's own driver words through a named quality attribute, each primary risk named, AND the one-system-many-patterns lesson stated. +10–14 if all three are chosen correctly but one justification is generic or one risk is missing.`
  ),
  written(
    "U1-W03", 1, 12, "monolithic-and-distributed-architectures.md",
    `A team is deciding whether to start a new product as a monolith or as microservices. The domain is new and its boundaries are still moving. Give the defining test that sorts a style into the monolithic or the distributed column, list the styles on each side, state the monolith's genuine strengths and weaknesses as the deck gives them, and say what specifically is given up on crossing into the right-hand column.`,
    `The defining test is the deployment unit, not the code layout: in a monolithic architecture all software modules are compiled, packaged and deployed as a single deployment unit — a single .war file or executable binary. Monolithic column: layered, pipeline, microkernel. Distributed column: service-based, event-driven, space-based, service-oriented, microservices. Monolith strengths: technical simplicity in the early stages, shared in-memory state and synchronous function calls, and in the comparison matrix High performance and High testability — better than most distributed styles on both. Weaknesses: deployability bottlenecks, blast radius of failures, and lack of independent elasticity, with Low scalability and Low deployability, and Big Ball of Mud as its named anti-pattern. The Master's Insight applies directly to this decision: the monolith is NOT inherently an anti-pattern, and is ideal for early-stage startups and domains with fluid, rapidly changing boundaries — which is precisely the situation in which microservice boundaries are hardest to draw. What crossing into the distributed column costs: ACID transactions stop being available, and you inherit the eight fallacies of distributed computing, distributed logging, contract maintenance and versioning, and eventual consistency.`,
    `Recommending microservices because the product is new and "should be built right from the start". The deck's position is the opposite — moving domain boundaries is the monolith's strongest case, and this is named as a favourite exam trap.`,
    `+15–20 requires the deployment-unit test, both style lists, the monolith's strengths and weaknesses, AND the specific costs of crossing over (loss of ACID plus the named distributed concerns). +10–14 if the test and lists are right but the crossing costs are vague.`
  ),

  // ============ Unit 2 — The Classic Pattern Catalogue ============
  mcq(
    "U2-M01", 2, 2, "layered-architecture-style.md",
    `Which account of the layered style's layers and its stated use cases is correct?`,
    [
      { letter: "A", text: `The four layers are fixed at exactly four and may never be combined.`, rationale: `the note says there are no specific restrictions on the number and types of layers, and that business and persistence are often combined.` },
      { letter: "B", text: `Presentation, domain, service, persistence — where "application layer" is another name for the presentation layer.`, rationale: `misassigns the aliases: "service layer" is the application layer's alias and "domain layer" the business layer's.` },
      { letter: "C", text: `Presentation (UI), application (service), business logic (domain), data access (persistence). There are no specific restrictions on the number and types of layers, and business and persistence are sometimes combined — so smaller applications may have only three. It suits small, simple applications; it is a good starting point under tight budget and time constraints, being perhaps the lowest-cost architecture style; and it is a good choice while the architect is still analyzing business needs and is unsure which style fits.` },
      { letter: "D", text: `As in (C), except that it is the style to choose when scalability is the dominant driver.`, rationale: `layered rates Scalability Low in the matrix; its primary strengths are overall cost and simplicity.` },
    ],
    "C"
  ),
  mcq(
    "U2-M02", 2, 2, "layered-architecture-style.md",
    `Which statement of the layered style's key principles and its comparison-matrix rating is correct?`,
    [
      { letter: "A", text: `Separation of concerns — each layer has a distinct responsibility — and layer isolation — lower layers do not depend on upper layers. In the matrix: Scalability Low, Performance Low-Medium, Deployability Low, Testability Medium, primary risk Architecture Sinkhole.` },
      { letter: "B", text: `As in (A), except that layer isolation means upper layers do not depend on lower ones.`, rationale: `reverses the dependency direction — it is the lower layers that do not depend on the upper.` },
      { letter: "C", text: `As in (A), except Testability High and primary risk Big Ball of Mud.`, rationale: `takes the Monolithic row's testability and anti-pattern; layered rates Testability Medium with Architecture Sinkhole.` },
      { letter: "D", text: `As in (A), and it is also known as "N-tiered architecture" because each layer must be deployed on its own tier.`, rationale: `gets the alias right and the reason wrong — layered is a logical organisation, and it is monolithic when all layers ship in one deployment unit.` },
    ],
    "A"
  ),
  mcq(
    "U2-M03", 2, 2.5, "layers-of-isolation.md",
    `To stop the presentation layer reaching shared business objects directly, a team adds a new services layer containing all of them — and marks every layer in the architecture closed "for maximum isolation." Evaluate.`,
    [
      { letter: "A", text: `Correct as done — a closed layer is always the safer default, since closed layers facilitate layers of isolation.`, rationale: `closed layers do isolate change, but the note says there are times when it makes sense for certain layers to be open, and this worked example is exactly one of them.` },
      { letter: "B", text: `Wrong from the start — a presentation layer cannot be restricted by adding a layer; only the contract can restrict it.`, rationale: `the worked example does precisely this: adding a services layer architecturally restricts the presentation layer from accessing the shared business objects.` },
      { letter: "C", text: `Half right, but the fix is to mark the business layer open.`, rationale: `opening the business layer would remove the very restriction the exercise was created to impose.` },
      { letter: "D", text: `Half right. Adding the services layer does architecturally restrict the presentation layer, precisely because the business layer is closed. But the new services layer must be marked open — otherwise the business layer would be forced to go through the services layer to access the persistence layer.` },
    ],
    "D"
  ),
  mcq(
    "U2-M04", 2, 2.5, "architecture-sinkhole-anti-pattern.md",
    `What is the architecture sinkhole anti-pattern, and what is the fix?`,
    [
      { letter: "A", text: `It occurs when a single layer performs too much business logic and becomes a bottleneck for every request.`, rationale: `inverts the diagnosis — the sinkhole is layers doing nothing, not one layer doing too much.` },
      { letter: "B", text: `Requests move from layer to layer as simple pass-through processing with no business logic performed within each layer — the example being a request for basic customer data travelling down through every layer and back, each layer only forwarding it. It degrades performance and increases code boilerplate without adding value. The fix is not "remove layers": some requests legitimately are pass-through, and it becomes an anti-pattern when most of them are. Marking a layer that contributes nothing as open is what relieves it.` },
      { letter: "C", text: `As in (B), except that the fix is to remove every layer any request passes through without processing.`, rationale: `some requests legitimately are pass-through, and the note says removing layers is not the fix.` },
      { letter: "D", text: `As in (B), except that it is the primary risk of the pipeline architecture in the comparison matrix.`, rationale: `complex error recovery is the pipeline's row; architecture sinkhole is the layered style's.` },
    ],
    "B"
  ),
  mcq(
    "U2-M05", 2, 2, "master-slave-pattern.md",
    `Which description of the master-slave pattern is correct?`,
    [
      { letter: "A", text: `The master distributes the work among identical slave components and computes a final result from the results the slaves return — two responsibilities, making it a scatter-gather rather than just a dispatcher. Usage: database replication, where the master database is the authoritative source and slaves are synchronized to it, and peripherals connected to a bus. The master is a single point of failure by construction; nothing in the pattern provides for its loss.` },
      { letter: "B", text: `As in (A), except that the slaves differ by role or service, which is what distinguishes the pattern from client/server.`, rationale: `the slaves being identical is precisely the distinguishing property; client/server and broker are the patterns whose components differ by role or service.` },
      { letter: "C", text: `The master's only responsibility is dispatch; results are aggregated by whichever slave finishes last.`, rationale: `drops the master's second responsibility — computing the final result from what the slaves return.` },
      { letter: "D", text: `As in (A), except that the master is fault tolerant by construction, since any slave can be promoted.`, rationale: `nothing in the pattern provides for the master's loss — it is a single point of failure by construction.` },
    ],
    "A"
  ),
  mcq(
    "U2-M06", 2, 2.5, "broker-pattern.md",
    `How does the broker pattern work, and how does it differ from the broker topology in event-driven architecture?`,
    [
      { letter: "A", text: `The broker proxies every message between client and server and holds no registry of its own.`, rationale: `the broker holds a registry of published capabilities and redirects the client to a suitable service, rather than necessarily proxying every message.` },
      { letter: "B", text: `They are the same concept at two different scales.`, rationale: `they are genuinely different: one coordinates and maintains a registry, the other has no central mediator at all.` },
      { letter: "C", text: `Servers publish their capabilities to a broker; clients request a service from the broker; the broker redirects the client to a suitable service from its registry. That is not the EDA broker topology, where there is no central mediator and messages flow through a deliberately lightweight message broker in a chain-like broadcast — the EDA broker is deliberately dumb, whereas the broker pattern's broker is the coordinator.` },
      { letter: "D", text: `Clients publish their requirements to the broker, and servers poll it for work.`, rationale: `reverses who publishes — servers publish their capabilities, and clients request services.` },
    ],
    "C"
  ),
  mcq(
    "U2-M07", 2, 2, "peer-to-peer-pattern.md",
    `What is the defining property of the peer-to-peer pattern?`,
    [
      { letter: "A", text: `That every peer performs both the client and the server role simultaneously at all times.`, rationale: `a peer may act as one, the other, or both — simultaneity is not required, and dynamic role change is the actual point.` },
      { letter: "B", text: `That a peer may act as a client, as a server, or as both, and can change its role dynamically with time — not merely that a component is capable of both. This is the direct contrast with client/server, where roles are fixed, and it means there is no central coordinator, so like choreography and the EDA broker topology it has no global view of what is happening. Usage: Gnutella and G2, P2PTV and PDTP, Bitcoin and Blockchain.` },
      { letter: "C", text: `That a central coordinator assigns each peer its role for the duration of a session.`, rationale: `the absence of a central coordinator is structural, and is why the pattern inherits choreography's weakness.` },
      { letter: "D", text: `As in (B), but the examples are confined to file-sharing networks.`, rationale: `the examples span three eras — file sharing, multimedia protocols, and cryptocurrency — which is itself worth noticing.` },
    ],
    "B"
  ),
  mcq(
    "U2-M08", 2, 2.5, "event-bus-pattern.md",
    `Which account of the event-bus pattern is correct?`,
    [
      { letter: "A", text: `Three components — source, listener and bus; the channel is an implementation detail of the bus.`, rationale: `the channel is one of the four named components, and it is the discriminating one: without channels this would be plain broadcast rather than selective publish/subscribe.` },
      { letter: "B", text: `Four components, and listeners receive every message published to a channel, including those published before they subscribed.`, rationale: `the note is explicit about the tense — a listener is notified of messages published to a channel it subscribed to before, so events are not replayed to late subscribers.` },
      { letter: "C", text: `Four components, and the pattern is the same as the broker pattern since both route messages to recipients.`, rationale: `a broker maintains a registry and redirects clients to services in a request/response shape; an event bus delivers published messages and the publisher never learns who received them.` },
      { letter: "D", text: `Four major components — event source, event listener, channel, and event bus. Sources publish messages to particular channels; listeners subscribe to particular channels and are notified of messages published to a channel they subscribed to before, so a late subscriber does not receive earlier events. The channel is what makes this selective publish/subscribe rather than plain broadcast. Usage: Android development, notification services.` },
    ],
    "D"
  ),
  mcq(
    "U2-M09", 2, 2, "model-view-controller-pattern.md",
    `Which reading of MVC is correct?`,
    [
      { letter: "A", text: `Model contains the core functionality and data; View displays information to the user, and more than one view may be defined; Controller handles input from the user. The purpose sentence runs in two directions and both matter: separating internal representations of information from the ways information is presented to the user (view) and accepted from the user (controller). It is a separation of concerns at the presentation boundary, not a three-layer stack.` },
      { letter: "B", text: `The Model is the database layer, the View is the UI, and the Controller is the business logic.`, rationale: `turns MVC into a three-layer stack; the Model holds core functionality as well as data, and is not "the database layer".` },
      { letter: "C", text: `As in (A), except that exactly one view may be defined per model, since multiple views would duplicate state.`, rationale: `multiple views over one model is explicitly allowed and is the pattern's main payoff.` },
      { letter: "D", text: `As in (A), except that the purpose is one-directional — separating internal representation from presentation only.`, rationale: `drops the "accepted from the user" half, which is exactly what the controller exists for.` },
    ],
    "A"
  ),
  mcq(
    "U2-M10", 2, 2.5, "blackboard-pattern.md",
    `When do you reach for the blackboard pattern, and what are its components?`,
    [
      { letter: "A", text: `When a problem decomposes into a fixed sequence of processing stages.`, rationale: `that is the pipeline style; blackboard builds its solution incrementally and opportunistically, with no fixed sequence.` },
      { letter: "B", text: `When no deterministic solution strategy is known — and its three components are the blackboard, a producer and a consumer.`, rationale: `right criterion, wrong components: producer and consumer are pipeline's filter roles, not blackboard's knowledge sources and control component.` },
      { letter: "C", text: `When no deterministic solution strategies are known — an unusual criterion, since every other pattern in the catalogue is chosen for structural reasons and this one is chosen because the problem has no known algorithm. Components: the blackboard, a structured global memory containing objects from the solution space; knowledge sources, specialized modules with their own representation; and a control component, which selects, configures and executes modules. Usage: speech recognition, vehicle identification and tracking, protein structure identification, sonar signal interpretation.` },
      { letter: "D", text: `As in (C), except that because the blackboard is shared global mutable state the pattern deliberately has no control component.`, rationale: `the shared mutable state is exactly why the control component is a named, separate part — something must decide which knowledge source runs next.` },
    ],
    "C"
  ),
  mcq(
    "U2-M11", 2, 2, "interpreter-pattern.md",
    `Which statement about the interpreter pattern is correct?`,
    [
      { letter: "A", text: `The structural rule is one class per production rule of the grammar, which is what lets it scale to large languages.`, rationale: `it is one class per symbol of the language, and the consequence is the opposite — it scales badly with grammar size.` },
      { letter: "B", text: `The basic idea is to have a class for each symbol of the language, which is the structural rule that makes the pattern recognisable. It is for a dedicated language — a DSL — and its usage is database query languages such as SQL and languages describing communication protocols. Because there is a class per symbol it scales badly with grammar size: it fits small, stable DSLs, not a large evolving language.` },
      { letter: "C", text: `It describes the stages of processing a language: lexical analysis, parsing, semantic analysis, code generation.`, rationale: `those stages are the pipeline style's compiler-toolchain example; interpreter describes the structure of the evaluator itself.` },
      { letter: "D", text: `As in (B), except that it is intended for implementing general-purpose programming languages.`, rationale: `the pattern is explicitly about a dedicated language, not general-purpose language implementation.` },
    ],
    "B"
  ),

  written(
    "U2-W01", 2, 14, "layers-of-isolation.md",
    `A team wants to stop the presentation layer from reaching shared business objects directly. They propose adding a new services layer containing all of those shared business objects, and marking every layer in the architecture closed "for maximum isolation." State what layers of isolation actually guarantees and under what condition; define open and closed layers in terms of a request; work through what their proposal achieves and what it breaks; and name the anti-pattern sitting on the other side of this decision.`,
    `Layers of isolation means that changes made in one layer of the architecture generally don't impact or affect components in other layers — providing the contracts between those layers remain unchanged. That condition is load-bearing: change a contract and the isolation is gone. Each layer is independent of the others, having little or no knowledge of their inner workings. A closed layer is one a request must pass through; an open layer is one a request may skip. The proposal half works: adding a services layer containing the shared business objects does architecturally restrict the presentation layer from accessing them, precisely because the business layer is closed. But marking every layer closed breaks it — the new services layer must be marked open, otherwise the business layer would be forced to go through the services layer to access the persistence layer. Leveraging open and closed layers is what defines the relationship between architecture layers and request flows. The anti-pattern on the other side is the architecture sinkhole: requests moving from layer to layer as simple pass-through processing with no business logic performed within each layer, degrading performance and increasing code boilerplate without adding value — and marking a contributing-nothing layer open is exactly what relieves it. Adding a layer without thinking about open and closed gives tight coupling in one direction and the sinkhole in the other.`,
    `Treating "closed everywhere" as the safe default. Closed layers do facilitate isolation, but the worked example's whole point is counter-intuitive: adding a layer to restrict one path requires marking that new layer open so it does not accidentally block another.`,
    `+15–20 requires the isolation guarantee with its contract condition, open and closed defined by whether a request may skip, the services-layer-must-be-open conclusion with its reason, AND the sinkhole named. +10–14 if the open/closed conclusion is right but the contract condition or the sinkhole link is missing.`
  ),
  written(
    "U2-W02", 2, 12, "broker-pattern.md",
    `Three things in this course are called a "broker" or behave like one: the broker pattern from the CH01 catalogue, the broker topology in event-driven architecture, and the event bus. Distinguish all three by what the central component actually does. Then say which of them the plug-in registry inside a microkernel most resembles, and why.`,
    `Broker pattern — used to structure distributed systems with decoupled components that interact by remote service invocations, with a broker component responsible for coordinating communication. Servers publish their capabilities (services and characteristics) to the broker; clients request a service from the broker; the broker redirects the client to a suitable service from its registry. This broker is the coordinator, and its registry is what lets clients find services without knowing about them in advance. Broker topology (EDA) — there is no central event mediator; the message flow is distributed across the event processor components in a chain-like broadcasting fashion through a lightweight message broker such as RabbitMQ, ActiveMQ or HornetQ. This broker is deliberately dumb. Event bus — four components (event source, event listener, channel, event bus); sources publish to particular channels and listeners subscribe to particular channels, receiving only messages published after they subscribed. The publisher never learns who received the message, whereas the broker pattern's broker points a specific client at a specific service. The plug-in registry most resembles the broker pattern: the core system needs to know which plug-in modules are available and how to get to them, held in a registry containing each module's name, data contract and remote access protocol details — as simple as an internal map structure or as complex as Apache ZooKeeper or Consul. It is the same job, a registry of published capabilities consulted for lookup, done inside a monolith instead of across a network.`,
    `Treating the broker pattern and the EDA broker topology as one concept at two scales, on the strength of the shared name. The names overlap and the meanings differ.`,
    `+15–20 requires all three distinguished by what the central component does, the "coordinator versus deliberately dumb" contrast stated explicitly, AND the plug-in registry matched to the broker pattern with the registry reason. +10–14 if the three are distinguished but the registry comparison is thin.`
  ),
  written(
    "U2-W03", 2, 14, "blackboard-pattern.md",
    `A team must build a system that combines several specialised AI models to interpret ambiguous incoming signals, where no fixed sequence of steps is known to produce the answer. Name the CH01 pattern this calls for, give its three components and what each does, state the selection criterion that makes it unusual among the catalogue's ten, and explain how the LLM deck reuses it for multi-agent systems.`,
    `The pattern is Blackboard, and its selection criterion is what makes it unusual: it is useful for problems for which no deterministic solution strategies are known. Every other pattern in the catalogue is chosen for structural reasons; this one is chosen because the problem has no known algorithm. Three components: the blackboard, a structured global memory containing objects from the solution space; knowledge sources, specialized modules with their own representation; and a control component, which selects, configures and executes modules. All components have access to the blackboard; components may produce new data objects that are added to it, and look for particular kinds of data on it, finding them by pattern matching with the existing knowledge source. Solutions are therefore built incrementally and opportunistically rather than in a fixed sequence. The blackboard is shared global mutable state — normally an anti-pattern — which is exactly why the control component is a named, separate part: something must decide which knowledge source runs next. The LLM deck calls Blackboard the quintessential foundation for Multi-Agent Systems: a centralized global data store maintains the conversational state and execution graph, autonomous agents watch the blackboard, and when an agent sees a data state it can solve, it activates, performs work, updates the blackboard, and goes dormant. Why it is used there: it allows decoupling of diverse AI models — agents do not need to know about each other, they only interact with the shared state. Nothing about the pattern changed; the knowledge sources are now models and the blackboard holds a conversation instead of a sonar trace. The original usage examples are all interpretation of noisy sensor data: speech recognition, vehicle identification and tracking, protein structure identification, sonar signal interpretation.`,
    `Choosing pipeline because "several models process the signal". That shape is right only when the sequence is fixed, and the scenario says no fixed sequence is known — which is precisely blackboard's selection criterion.`,
    `+15–20 requires Blackboard named, all three components with their jobs, the no-deterministic-strategy criterion identified as the distinctive one, AND the multi-agent reuse with the decoupling reason. +10–14 if the pattern and components are right but the selection criterion is not called out as unusual.`
  ),

  // ============ Unit 3 — Monolithic & Distributed Styles ============
  mcq(
    "U3-M01", 3, 2, "pipeline-architecture-style.md",
    `Which statement of the properties of pipes and filters is correct?`,
    [
      { letter: "A", text: `Pipes are broadcast channels, so any filter may consume any message on them.`, rationale: `each pipe is typically unidirectional and point-to-point rather than broadcast, and the note says this is for performance reasons.` },
      { letter: "B", text: `Filters are stateful by design, which is what makes error recovery across a pipeline straightforward.`, rationale: `filters are generally stateless — and it is that statelessness which makes recovering a half-finished pipeline hard, not easy.` },
      { letter: "C", text: `A filter should handle a composite task in one place, to avoid chatter between filters.`, rationale: `the note says the opposite: composite tasks should be handled by a sequence of filters rather than a single one.` },
      { letter: "D", text: `Pipes form the communication channel between filters, each typically unidirectional and point-to-point rather than broadcast for performance reasons; the payload may be any data format, but architects favor smaller amounts of data for high performance. Filters are self-contained, independent of other filters and generally stateless, and should perform one task only — composite tasks handled by a sequence of filters rather than one.` },
    ],
    "D"
  ),
  mcq(
    "U3-M02", 3, 2, "pipeline-architecture-style.md",
    `Which rating and reading of the pipeline style is correct?`,
    [
      { letter: "A", text: `Scalability Medium, Performance Medium, Deployability Medium, Testability High, primary risk Complex Error Recovery. Being monolithic in nature it lacks the complexities of distributed styles, and its architectural modularity comes from the separation of concerns between filter types — any filter can be modified or replaced without impacting the others. Master's Insight: error handling and transaction rollback across filters are complex, and state management must be handled carefully.` },
      { letter: "B", text: `As in (A), except the primary risk is Eventual Inconsistency.`, rationale: `eventual inconsistency is the event-driven row's named risk; pipeline's is complex error recovery.` },
      { letter: "C", text: `As in (A), except that it is a distributed style, which is why deployability only rates Medium.`, rationale: `pipeline is monolithic in nature — that is exactly why it does not carry distributed complexity.` },
      { letter: "D", text: `As in (A), except Testability Low, because filters cannot be tested in isolation.`, rationale: `filters being self-contained and independent is precisely what makes Testability High for this style.` },
    ],
    "A"
  ),
  mcq(
    "U3-M03", 3, 2.5, "filter-types.md",
    `Which account of the four filter types is correct?`,
    [
      { letter: "A", text: `As in (C), except that the transformer is \`reduce\` and the tester is \`map\`.`, rationale: `swaps the functional twins — transformer is map, tester is reduce.` },
      { letter: "B", text: `As in (C), except that a tester always produces output, which is why a pipeline never loses data.`, rationale: `tester filters produce output optionally — which is precisely why data can vanish without an error and error recovery is complex.` },
      { letter: "C", text: `Producer — the starting point, outbound only, sometimes called the source. Transformer — accepts input, optionally performs a transformation on some or all of the data, then forwards it (functional twin: \`map\`). Tester — accepts input, tests one or more criteria, then optionally produces output based on the test (functional twin: \`reduce\`). Consumer — the termination point, sometimes persisting the final result to a database or displaying it on screen. Every pipeline has exactly one producer at the start and one consumer at the end.` },
      { letter: "D", text: `A producer both accepts and emits data, and a pipeline may contain several consumers in the middle of the flow.`, rationale: `the producer is outbound only, and the consumer is the termination point for the pipeline flow.` },
    ],
    "C"
  ),
  mcq(
    "U3-M04", 3, 2.5, "microkernel-architecture-style.md",
    `Which description of the microkernel style is correct?`,
    [
      { letter: "A", text: `Three architecture components — a core system, plug-in components, and a mediator routing between them.`, rationale: `the topology consists of exactly two architecture components: a core system and plug-in components.` },
      { letter: "B", text: `Two architecture components — a core system and plug-in components — with the core formally defined as the minimal functionality required to run the system: the happy path, with little or no custom processing. The argument is cyclomatic complexity: removing it from the core and placing it into separate plug-ins buys better extensibility, maintainability and testability, turning a growing \`else if\` chain into a registry lookup. It is monolithic despite sounding modular — even with remote plug-in access via REST it is still only a single architecture quantum, because every request must first go through the core to reach a plug-in.` },
      { letter: "C", text: `As in (B), except that the core system holds the custom processing and the plug-ins carry the happy path.`, rationale: `reverses the split — the core is the happy path with little or no custom processing, and the customization lives in the plug-ins.` },
      { letter: "D", text: `As in (B), except that it is a distributed style, since plug-ins can be deployed separately.`, rationale: `it is monolithic; remote plug-in access does not stop it being a single architecture quantum.` },
    ],
    "B"
  ),
  mcq(
    "U3-M05", 3, 2, "plug-in-components-and-registry.md",
    `May a plug-in component connect directly to the microkernel's main shared database?`,
    [
      { letter: "A", text: `Yes, and it should — routing data access through the core recreates the cyclomatic complexity the style exists to remove.`, rationale: `inverts the rule and misapplies the cyclomatic-complexity argument, which is about branching in the core, not about data access paths.` },
      { letter: "B", text: `No, and a plug-in may never have any data store of its own either.`, rationale: `the exception is explicit — plug-ins can have their own separate data stores, accessible only to that plug-in.` },
      { letter: "C", text: `No, and the reason is performance: a direct connection would contend with the core for connections.`, rationale: `the primary reason given is decoupling, not performance.` },
      { letter: "D", text: `Normally no — requests from the plug-in pass through the core system to access the central shared database. The primary reason is decoupling: making a database change should only impact the core system, not the plug-in components. Plug-ins may, however, have their own separate data stores, accessible only to that plug-in.` },
    ],
    "D"
  ),
  mcq(
    "U3-M06", 3, 2, "service-based-architecture-style.md",
    `What is the defining topology of service-based architecture?`,
    [
      { letter: "A", text: `A distributed macro layered structure: a separately deployed user interface, separately deployed remote coarse-grained services, and a monolithic database. Because they share a single database, the number of services generally ranges between 4 and 12, averaging about 7, and in most cases there is only a single instance of each domain service. Services deploy like any monolithic application (EAR, WAR, assembly) and do not require containerization.` },
      { letter: "B", text: `As in (A), except that each service owns its own database — which is what makes the style distributed.`, rationale: `that is microservices; service-based architecture's defining compromise is distributed deployment with a shared database.` },
      { letter: "C", text: `As in (A), except that services are fine-grained, typically dozens to hundreds of them.`, rationale: `service-based services are coarse-grained and number roughly 4 to 12, averaging about 7.` },
      { letter: "D", text: `As in (A), except that containerization is required, which is what separates it from a monolith.`, rationale: `services do not require containerization, although Docker could be used; what separates it from a monolith is separate deployment.` },
    ],
    "A"
  ),
  mcq(
    "U3-M07", 3, 2.5, "service-based-architecture-style.md",
    `How does service-based architecture handle transactions, and why is it called pragmatic?`,
    [
      { letter: "A", text: `It uses BASE transactions, like every distributed style.`, rationale: `SBA keeps regular ACID transactions within a single domain service — one of its main selling points.` },
      { letter: "B", text: `It is pragmatic because it removes the database from the request path.`, rationale: `that is space-based architecture's central move; SBA keeps a shared monolithic database.` },
      { letter: "C", text: `Because domain services are coarse-grained, regular ACID transactions with commits and rollbacks are used to ensure database integrity within a single domain service, and in most cases a transaction is scoped to one domain service. Highly distributed architectures like microservices, with fine-grained services, use BASE transactions instead and hence do not support the same level of database integrity. That is why it is called pragmatic: it achieves a good level of architectural modularity without getting tangled up in the complexities and pitfalls of granularity.` },
      { letter: "D", text: `As in (C), except that ACID is available across services, since they all share one database.`, rationale: `the guarantee stated is within a single domain service; coordinating multiple services raises orchestration and choreography issues instead.` },
    ],
    "C"
  ),
  mcq(
    "U3-M08", 3, 2.5, "database-partitioning-in-service-based-architecture.md",
    `What is the database-coupling problem in service-based architecture, and what is the mitigation?`,
    [
      { letter: "A", text: `The mitigation is to physically split the database into one per service.`, rationale: `that turns the style into microservices; the note's mitigation is logical partitioning surfaced through federated shared libraries.` },
      { letter: "B", text: `Services share a single monolithic database, and the shared class files representing the table schemas — entity objects — live in one custom shared library. So a table schema change can potentially impact every service, and with a single shared library it is difficult to know which services are actually impacted without manual, detailed analysis. The mitigation is to logically partition the database and manifest that partitioning through federated shared libraries — one per logical partition — with common tables in a common domain and its \`common_entities_lib\`, plus a process control: lock the common entity objects in version control and restrict change access to the database team.` },
      { letter: "C", text: `As in (B), except that shared library versioning fully solves the problem.`, rationale: `the note says versioning can help but that it is nevertheless difficult to know which services are impacted without manual, detailed analysis.` },
      { letter: "D", text: `As in (B), except that locking the common entities in version control is a technical control that prevents schema changes.`, rationale: `it is a process control, and deliberately so — it makes the cost of changing shared tables visible rather than preventing change.` },
    ],
    "B"
  ),
  mcq(
    "U3-M09", 3, 2.5, "event-driven-architecture-style.md",
    `What actually separates the request-based model from the event-based model?`,
    [
      { letter: "A", text: `Purely whether the communication is synchronous or asynchronous.`, rationale: `the note draws a different distinction: who initiates and who decides.` },
      { letter: "B", text: `That an event is directed at a named consumer, which is what makes event processing reliable.`, rationale: `a unique characteristic of the style is broadcasting events without knowledge of who — if anyone — is receiving the message.` },
      { letter: "C", text: `In a request-based model, requests go to a request orchestrator which deterministically and synchronously directs them to request processors. An event-based model instead reacts to a particular situation and takes action based on that event — submitting an auction bid is not a request made to the system but an event that happens after the asking price is announced. The distinction is who initiates and who decides: a request is directed at a processor deterministically; an event is announced and whoever cares reacts. Rating: Scalability Extremely High, Performance High, Deployability High, Testability Low-Medium, primary risk Eventual Inconsistency.` },
      { letter: "D", text: `As in (C), except that the rating is Testability High.`, rationale: `testability rates Low-Medium — the Master's Insight names non-deterministic execution order and severe debugging complexity.` },
    ],
    "C"
  ),
  mcq(
    "U3-M10", 3, 2.5, "broker-topology.md",
    `Which account of the broker topology is correct?`,
    [
      { letter: "A", text: `Four primary architecture components — an initiating event, the event broker, an event processor, and a processing event — with no central event mediator: the flow is distributed across event processors in a chain-like broadcast through a lightweight broker such as RabbitMQ, ActiveMQ or HornetQ, and a notification event may be sent but ignored. Its problems: no control over the overall workflow, error handling is a big challenge, the business process gets stuck without automated or manual intervention, and all other processes move along without regard for the error.` },
      { letter: "B", text: `Five components, the fifth being an event queue that feeds the broker.`, rationale: `five components including an event queue describes the mediator topology; broker has four.` },
      { letter: "C", text: `As in (A), except that a notification event must be subscribed to by at least one processor.`, rationale: `a notification event may be sent but ignored — nobody is obliged to subscribe.` },
      { letter: "D", text: `As in (A), except that its main problem is the central broker becoming a coordination bottleneck.`, rationale: `there is no central coordinator in this topology — the absence of one is the source of its problems, not a bottleneck in one.` },
    ],
    "A"
  ),
  mcq(
    "U3-M11", 3, 2.5, "mediator-topology.md",
    `How does the mediator topology compare with the broker topology?`,
    [
      { letter: "A", text: `Mediator has four components and broker five.`, rationale: `swaps the counts — the extra component, the event queue, belongs to the mediator.` },
      { letter: "B", text: `Mediator is choreography and broker is orchestration.`, rationale: `inverts them: the mediator is the conductor, so it is orchestration; the broker is choreography.` },
      { letter: "C", text: `Mediator outperforms broker, which is why it is preferred when throughput matters most.`, rationale: `performance and scalability are still good under the mediator but not as high as with the broker — use broker for maximum throughput.` },
      { letter: "D", text: `Mediator has five components — initiating event, event queue, event mediator, event channels, event processors — the extra one over broker's four being the event queue feeding the mediator. Mediator is orchestration (centralized), broker is choreography (decentralized). Its tiers escalate by workflow complexity: Simple Event Mediator → BPEL → BPM. Performance and scalability are still good but not as high as broker's, and coupling is medium because services must know the mediator.` },
    ],
    "D"
  ),
  mcq(
    "U3-M12", 3, 2.5, "asynchronous-communication.md",
    `What does asynchronous communication actually buy, and what is the unique characteristic of event-driven architecture here?`,
    [
      { letter: "A", text: `It improves performance, because the work itself completes faster.`, rationale: `conflates responsiveness with performance — the exact distinction the note draws.` },
      { letter: "B", text: `It does not make the total work finish sooner; it makes the caller free sooner — the course calls this a good example of the difference between responsiveness and performance. Event-driven architecture is the only style in the course that relies solely on asynchronous communication, and it covers both fire-and-forget (no response required) and request/reply (response required), so "asynchronous" does not mean "no response".` },
      { letter: "C", text: `Asynchronous means no response is ever returned, so fire-and-forget is the only available shape.`, rationale: `EDA covers request/reply as well, implemented with a correlation ID or a temporary queue.` },
      { letter: "D", text: `EDA's unique characteristic is that it mixes synchronous and asynchronous communication as needed.`, rationale: `its unique characteristic is relying solely on asynchronous communication.` },
    ],
    "B"
  ),
  mcq(
    "U3-M13", 3, 2.5, "space-based-architecture-style.md",
    `What is the central move of space-based architecture?`,
    [
      { letter: "A", text: `High scalability, elasticity and performance are achieved by removing the central database as a synchronous constraint, leveraging replicated in-memory data grids instead. Application data is held in memory and replicated among all active processing units; a unit that updates data asynchronously sends it to the database, usually via messaging with persistent queues. Processing units start up and shut down dynamically as load varies. The name comes from tuple space — multiple parallel processors communicating through shared memory. Rating: Scalability Extremely High, Performance High, Deployability Medium, Testability Low, primary risk Data Collisions & Sync Failures.` },
      { letter: "B", text: `The central move is scaling out the web-server tier so the request flow never queues.`, rationale: `that is the usual solution the style is introduced against — it does not help when the bottleneck is at the application server or the database server.` },
      { letter: "C", text: `As in (A), except that processing units write synchronously to the database to guarantee consistency.`, rationale: `writes go asynchronously via data pumps, which is exactly why the style is eventually consistent.` },
      { letter: "D", text: `As in (A), except that its primary risk is Eventual Inconsistency, as with event-driven.`, rationale: `the space-based row's named risk is Data Collisions & Sync Failures.` },
    ],
    "A"
  ),
  mcq(
    "U3-M14", 3, 2, "processing-unit-and-virtualized-middleware.md",
    `Which account of the virtualized middleware's four components is correct?`,
    [
      { letter: "A", text: `As in (C), except that the deployment manager is the optional one, since instances can be started manually.`, rationale: `only the processing grid is optional; the deployment manager is a critical component for achieving variable scalability.` },
      { letter: "B", text: `The data grid routes incoming requests and the messaging grid synchronises data between units.`, rationale: `swaps the two — messaging grid routes, data grid synchronises.` },
      { letter: "C", text: `Messaging grid = routing: it manages input request and session state, determines which active processing components are available, and forwards the request to one of them. Data grid = synchronisation, and is the most important and crucial component. Processing grid = orchestration when multiple processing units are involved in one business request — the only optional component of the four. Deployment manager = elasticity: dynamic startup and shutdown of processing unit instances based on monitored response times and user loads. Because the messaging grid can forward a request to any unit, each must contain exactly the same data in its in-memory data grid.` },
      { letter: "D", text: `As in (C), except that processing units need not hold identical data, because the messaging grid routes by data ownership.`, rationale: `the messaging grid may forward a request to any processing unit, which is precisely why identical data is essential.` },
    ],
    "C"
  ),
  mcq(
    "U3-M15", 3, 2.5, "replicated-and-distributed-caching.md",
    `Which statement of the replicated / distributed caching trade-off is correct?`,
    [
      { letter: "A", text: `Replicated caching always wins on consistency, because every processing unit holds a full copy.`, rationale: `inverts the trade-off — a single copy is what buys consistency; many copies are what allow divergence.` },
      { letter: "B", text: `A near-cache gives the best of both, since the front caches are synchronised across processing units.`, rationale: `the front caches are explicitly not synchronized between processing units sharing the same data.` },
      { letter: "C", text: `Distributed caching wins on fault tolerance, since the central cache server can itself be replicated.`, rationale: `the note states fault tolerance will always be better when using a replicated cache.` },
      { letter: "D", text: `A distributed cache will always offer better data consistency, because the cache is in a single place; performance and fault tolerance will always be better with a replicated cache. Replicated caching becomes impossible under high data volumes and high update rates. The near-cache hybrid makes the distributed cache the full backing cache and each unit's in-memory grid the front cache — but front caches are synced only to the backing cache, never to each other, so units sharing a data context will likely hold different data.` },
    ],
    "D"
  ),
  mcq(
    "U3-M16", 3, 2.5, "data-pumps-writers-and-readers.md",
    `When are data readers invoked in a space-based architecture?`,
    [
      { letter: "A", text: `On every cache miss, so that the processing unit can fall back to the database.`, rationale: `normal reads never touch the database — the three named situations are all cases where the cache is empty or incomplete.` },
      { letter: "B", text: `Only in three situations: a crash of all processing unit instances of the same named cache; a redeployment of all processing units within the same named cache; and retrieving archive data not contained in the replicated cache. What these share is that the cache is empty or incomplete. Data pumps are always asynchronous — which is what makes eventual consistency unavoidable in this style — and a data reader sends its result to a reverse data pump, where the temporary cache owner loads the cache and then releases the lock.` },
      { letter: "C", text: `As in (B), except that data pumps may be made synchronous where strong consistency is required.`, rationale: `data pumps within a space-based architecture are always asynchronous, providing eventual consistency between the in-memory cache and the database.` },
      { letter: "D", text: `As in (B), and the difference between a data abstraction layer and a data access layer is the number of writers involved.`, rationale: `the discriminator is coupling to the schema: in a data access layer the processing units are coupled to the underlying data structures; in a data abstraction layer they are decoupled through separate contracts.` },
    ],
    "B"
  ),

  written(
    "U3-W01", 3, 15, "filter-types.md",
    `An ETL system passes records through four stages: (1) read from a Kafka topic; (2) drop records whose duration field falls below a threshold; (3) enrich the survivors with a lookup; (4) write to a warehouse. Classify each stage by filter type, giving the functional-programming twin where the course names one. State the properties of pipes and of filters that make this composable, and explain why the style's named primary risk applies to this pipeline specifically.`,
    `Stage 1 is a Producer — the starting point of the process, outbound only, sometimes called the source; this is exactly the course's Service Info Capture filter subscribing to a Kafka topic. Stage 2 is a Tester — it accepts input, tests one or more criteria, then optionally produces output based on the test (functional twin: \`reduce\`); this is the course's Duration Filter, which determines whether the captured data relates to the duration in milliseconds of the service request. Stage 3 is a Transformer — accepts input, optionally performs a transformation on some or all of the data, then forwards it to the outbound pipe (functional twin: \`map\`). Stage 4 is a Consumer — the termination point for the pipeline flow, persisting the final result to a database. Every pipeline has exactly one producer at the start and one consumer at the end; transformers and testers are the interchangeable middle. Pipes: each is typically unidirectional and point-to-point rather than broadcast, for performance reasons, and while the payload may be any data format, architects favor smaller amounts of data to enable high performance. Filters: self-contained, independent of other filters, generally stateless, and each performing one task only — composite tasks handled by a sequence of filters rather than a single one. Together those give high composability and modularity: any filter can be modified or replaced without impacting the others. The primary risk is Complex Error Recovery, and it bites here because of stage 2: tester filters produce output optionally, so a record can be dropped with no error raised — data vanishes silently. Combined with stateless filters, recovering a half-finished pipeline is hard; the Master's Insight is that error handling and transaction rollback across filters are complex and state management must be handled carefully.`,
    `Calling stage 2 a transformer because it changes what flows onward. A filter that decides whether to emit at all is a tester, and that optionality is precisely what makes error recovery complex here.`,
    `+15–20 requires all four stages classified with both functional twins named, the pipe and filter properties, AND the risk tied specifically to the tester's optional output. +10–14 if the classification is right but the risk is stated only generically.`
  ),
  written(
    "U3-W02", 3, 15, "plug-in-components-and-registry.md",
    `An electronics-recycling assessment system has a 40-branch \`else if\` chain in \`assessDevice()\`, one branch per device model. Explain what the microkernel style replaces it with and what quantity is actually being moved. Then set out the three decisions the team must now make about their plug-ins — compile-based versus runtime, whether plug-ins may reach the shared database, and what to do when a third party controls a plug-in's contract — giving the reasoning behind each.`,
    `The \`else if\` chain becomes a registry lookup: \`pluginRegistry.get(deviceID)\` returns the plug-in class name, which is then instantiated and invoked. The quantity being moved is cyclomatic complexity — removing it from the core system and placing it into separate plug-in components allows for better extensibility and maintainability as well as increased testability. Rather than placing client-specific customization in the core, create a separate plug-in component for each device being assessed; the core system stays the minimal functionality required to run the system, the happy path, with little or no custom processing. Decision 1 — compile-based vs runtime: runtime plug-ins can be added or removed at runtime without redeploying the core system or other plug-ins, managed through frameworks such as OSGi, Penrose, Jigsaw or Prism (.NET); compile-based plug-ins are much simpler to manage but require the entire monolithic application to be redeployed when one is modified, added or removed. It is a straight trade of flexibility against simplicity. Decision 2 — database access: the plug-in normally should not connect directly to the main shared database; requests from the plug-in pass through the core system. The primary reason is decoupling — making a database change should only impact the core system, not the plug-in components. The exception is that a plug-in may have its own separate data store, accessible only to that plug-in. Decision 3 — third-party contracts: contracts between plug-ins and the core are usually standard across a domain and include behavior, input data and output data; custom contracts are typical where the plug-in comes from a third party whose contract you do not control, and there the standard answer is to create an adapter between the plug-in contract and your standard contract — because without one the core system accumulates a special case per plug-in, which is exactly the cyclomatic complexity the microkernel exists to remove. The registry itself holds each module's name, data contract and remote access protocol details, and can be as simple as an internal map owned by the core or as complex as Apache ZooKeeper or Consul.`,
    `Recommending direct plug-in access to the shared database for performance, or omitting the adapter so the core carries a branch per third-party contract — which reintroduces the very complexity the refactor removed.`,
    `+15–20 requires cyclomatic complexity named as the quantity being moved, all three decisions answered with their reasons, AND the adapter justified by the complexity-returns argument. +10–14 if all three decisions are answered but one reason is missing.`
  ),
  written(
    "U3-W03", 3, 14, "broker-topology.md",
    `An order system is built on the broker topology. A \`PlaceOrder\` event triggers payment, inventory and shipping processors in a chain. Payment succeeds; inventory fails. Describe exactly what happens to the business process and to the rest of the system, name the four components of this topology, and say what switching to the other topology would buy and cost — including the component-count difference and the two names the course gives the two control mechanisms.`,
    `The broker topology has four primary architecture components: an initiating event, the event broker, an event processor, and a processing event. There is no central event mediator; the message flow is distributed across the event processor components in a chain-like broadcasting fashion through a lightweight message broker such as RabbitMQ, ActiveMQ or HornetQ, and a notification event may be sent but ignored, since nobody is obliged to subscribe. On the inventory failure, the four consequences from the PlaceOrder example all apply: there is no control over the overall workflow associated with the initiating event; error handling is a big challenge; the business process gets stuck and is unable to move without some sort of automated or manual intervention; and — the sharpest one — all other processes are moving along without regard for the error, because nothing is watching the whole flow. Switching to the mediator topology adds a fifth component, the event queue, feeding a central event mediator that manages and controls the workflow: initiating event, event queue, event mediator, event channels, event processors. It buys explicit workflow state management and error coordination. It costs medium coupling, because the services must know the mediator, and lower peak performance — performance and scalability are still good, but not as high as with the broker topology. The two control mechanisms are named: broker is choreography (decentralized), mediator is orchestration (centralized). Master's Insight: use broker for maximum throughput, and mediator when business workflows require strict state transitions or compensation, such as the Saga pattern.`,
    `Saying the whole system halts. Only the failed branch is stuck — every other process carries on regardless, which is exactly what makes the failure hard to notice.`,
    `+15–20 requires the four broker components, all four consequences with "the rest of the system carries on" stated explicitly, the five-component mediator with the event queue named as the extra, AND choreography/orchestration attached to the right topology. +10–14 if the consequences are right but the component counts or the two control-mechanism names are missing.`
  ),
  written(
    "U3-W04", 3, 14, "replicated-and-distributed-caching.md",
    `A space-based system's processing units each hold a full in-memory copy of customer data. Data volumes are growing and update rates are rising. Set out the two caching models and the trade-off between them in the terms the course uses, say what conditions make replicated caching impossible, describe the near-cache hybrid and the trap inside it, and connect that trap to the messaging grid.`,
    `Space-based architecture relies on caching for the transactional processing of an application — removing the need for direct reads and writes to a database is how it supports high scalability, elasticity and performance. Replicated caching: every processing unit holds a full copy in its own memory; extremely fast and supporting high levels of fault tolerance, though most product companies are moving away from this model. Distributed caching: an external server or service holds a centralized cache; processing units do not store data in internal memory but use a proprietary protocol to access the central cache server, and it supports high levels of data consistency because the data is all in one place and does not need to be replicated. The trade-off is stated in absolute terms: a distributed cache will always offer better data consistency over a replicated cache, because the cache of data is in a single place; however, performance and fault tolerance will always be better when using a replicated cache. The reason each wins is the same fact viewed twice — one copy means consistent but remote and single-point; many copies mean fast and redundant but divergent. Replicated caching is not possible under high data volumes (the size of the cache) and high update rates to the cache data — which is exactly the situation described here. The near-cache hybrid bridges in-memory data grids with a distributed cache: the distributed cache is the full backing cache, and each processing unit's in-memory data grid is the front cache. The trap: while the front caches are always kept in sync with the full backing cache, they are not synchronized between other processing units sharing the same data — so multiple processing units sharing the same data context, such as a customer profile, will likely all hold different data in their front cache. That matters because the messaging grid can forward a request to any of the processing units, and the style otherwise requires that each processing unit contains exactly the same data in its in-memory data grid.`,
    `Presenting near-cache as the best of both worlds. Its front caches are not synchronised with each other, which collides directly with the messaging grid's freedom to route a request to any unit.`,
    `+15–20 requires both models described, the "always" trade-off stated in both directions, the two conditions that rule out replicated caching, the near-cache front/backing structure, AND the messaging-grid collision spelled out. +10–14 if the trade-off is right but the near-cache trap is described without the messaging-grid link.`
  ),

  // ========= Unit 4 — Microservices & Distributed Concerns =========
  mcq(
    "U4-M01", 4, 2.5, "microservices-architecture.md",
    `What is the defining property of the microservices style, and what made it practical?`,
    [
      { letter: "A", text: `The defining property is service size — a service small enough for one team to rewrite in a fortnight.`, rationale: `size is not the criterion, and "micro" is not a target; the process boundary is what defines the style.` },
      { letter: "B", text: `The process boundary: each service runs in its own process — originally implying a physical computer, but quickly evolving to virtual machines and containers — and separating each service into its own process solves all the problems brought on by sharing. What made it practical: freely available open source operating systems, automated machine provisioning, cloud resources and container technology. The dependence on automation for deployment, testing and operations is not optional, which is why the style rates High on complexity and maintenance cost. Unusually, it was defined and popularized early, through a 2014 blog post by Martin Fowler and James Lewis.` },
      { letter: "C", text: `As in (B), except that the style was always practical and the named technologies merely made it more convenient.`, rationale: `before those technologies it was impractical for each domain to have its own infrastructure — they are enablers, not conveniences.` },
      { letter: "D", text: `As in (B), except that microservices were named retroactively once the pattern had spread, like most architecture styles.`, rationale: `microservices were deliberately defined and popularized early in their adoption, which the deck calls out as unlike many retroactively named styles.` },
    ],
    "B"
  ),
  mcq(
    "U4-M02", 4, 2.5, "microservices-granularity.md",
    `How should the granularity of a microservice be decided?`,
    [
      { letter: "A", text: `Make each service as small as it can possibly be made, then coordinate between them.`, rationale: `the note is explicit that the rule is not "as small as possible" — the goal is a balance between too small and too big.` },
      { letter: "B", text: `By three signals: purpose, latency, and team size.`, rationale: `the three signals named are purpose, transactions and choreography — latency and team size are not among them.` },
      { letter: "C", text: `Heavy inter-service chatter means the network needs upgrading, not that boundaries need moving.`, rationale: `all three signals treat chatter between services as evidence that a boundary is in the wrong place.` },
      { letter: "D", text: `By three signals. Purpose — each service should have a clear and focused job, like a specialized tool for a specific task. Transactions — if multiple services must work together to complete a task, consider how they will coordinate; sometimes it is better to keep closely related services together. Choreography — if many services must constantly communicate to function, that may be a sign they should be grouped into a larger service. All three point the same way: chatter is evidence a boundary is misplaced. The rule is explicitly not "as small as possible" — and needing transactions between services is a sign they are too small.` },
    ],
    "D"
  ),
  mcq(
    "U4-M03", 4, 2, "bounded-context.md",
    `What does bounded context actually say about coupling?`,
    [
      { letter: "A", text: `Within a bounded context the internal parts — code and data schemas — are coupled together to produce work, but they are never coupled to anything outside it, such as a database or class definition from another bounded context. So it does not say "reduce coupling"; it says where coupling is allowed to exist — tightly coupled inside, never coupled outside. That lets each context define only what it needs rather than accommodating other constituents, which is why duplication across bounded contexts is correct in microservices and the shared library is the smell.` },
      { letter: "B", text: `That coupling should be minimised everywhere, inside the context and outside it alike.`, rationale: `inside a bounded context the parts are deliberately coupled together to produce work — the direction of coupling is the whole idea.` },
      { letter: "C", text: `That reusable shared classes across contexts are the goal, since they remove duplication.`, rationale: `this directly inverts the concept — reuse across contexts forces every context to carry every other context's requirements.` },
      { letter: "D", text: `As in (A), except that bounded context originated in the microservices literature and was later borrowed by domain-driven design.`, rationale: `the direction is the other way round: bounded context is a DDD concept that decidedly inspired microservices.` },
    ],
    "A"
  ),
  mcq(
    "U4-M04", 4, 2.5, "data-isolation-in-microservices.md",
    `What does data isolation require, and what does it cost?`,
    [
      { letter: "A", text: `Database-per-service is optional; sharing one database is fine so long as the schemas are versioned.`, rationale: `that describes service-based architecture — database-per-service is the single clearest line between the two styles.` },
      { letter: "B", text: `As in (C), except that the named consistency strategies are two-phase commit and distributed locking.`, rationale: `the three named strategies are source of truth, replication, and caching.` },
      { letter: "C", text: `Each microservice should have its own data storage rather than sharing a single database, which keeps services independent and avoids problems arising from multiple systems relying on the same data — the clearest line between microservices and service-based architecture. The consequence to handle is cross-service consistency, with three named strategies: one service as the source of truth, replication, or caching. The compensating benefit is that each service can choose the best storage for its needs. The price is losing ACID across services.` },
      { letter: "D", text: `As in (C), except that polyglot persistence is the goal and data isolation is how it is achieved.`, rationale: `reverses cause and effect — isolation is the decision, and polyglot persistence is its consequence rather than an independent goal.` },
    ],
    "C"
  ),
  mcq(
    "U4-M05", 4, 2.5, "api-layer-and-service-mesh.md",
    `What warning does the deck give twice about shared central components, and how does the service mesh escape it?`,
    [
      { letter: "A", text: `The API layer should hold the shared business logic so that individual services stay thin.`, rationale: `putting too much logic into the API layer makes it a single point of failure and the system less flexible; the main logic belongs inside the services.` },
      { letter: "B", text: `A service mesh violates bounded context, since it is shared across every service.`, rationale: `a mesh shares operational concerns, not business logic — and distinguishing the two kinds of coupling is exactly the point.` },
      { letter: "C", text: `The warning applies only to the API layer; a central operational platform is exempt because it is stateless.`, rationale: `the same warning is given explicitly for the central operational platform too.` },
      { letter: "D", text: `The same warning appears for the API layer and for a central operational platform: any shared central component risks becoming a single point of failure and eroding the decoupling the style exists for. The API layer is a directory of services and how to interact with them; it is not meant to do all the work. The service mesh escapes it because the sidecar pattern attaches an operational component alongside each service, and the service plane connects the sidecars — giving a console to globally control operational coupling (monitoring, logging, cross-cutting concerns) while leaving domain coupling untouched.` },
    ],
    "D"
  ),
  mcq(
    "U4-M06", 4, 2, "micro-frontends.md",
    `What is the purpose of the micro-frontend pattern?`,
    [
      { letter: "A", text: `To eliminate the monolithic frontend, which is an anti-pattern over microservice backends.`, rationale: `a monolithic frontend over microservice backends is described as a legitimate and common design; micro-frontends answer a specific bottleneck.` },
      { letter: "B", text: `Team ownership, not UI technology. Each service emits the user interface for that service, which the frontend coordinates with the other emitted UI components — extending the service boundary from the database to the screen so one team owns a whole vertical slice. The shell coordinates; it does not implement. You take it when UI work is the bottleneck because every change needs the single frontend team. The same idea appears in service-based architecture as a user-interface variant, with the monolithic UI broken into UI domains matching each domain service.` },
      { letter: "C", text: `To have the shell implement every screen while services supply only data.`, rationale: `the service emits its own UI — the shell coordinates the emitted components rather than implementing them.` },
      { letter: "D", text: `It is a React-specific pattern, which is why React is required to implement it.`, rationale: `React is one option; the note names several open source frameworks that support the pattern, and the purpose is ownership rather than a framework.` },
    ],
    "B"
  ),
  mcq(
    "U4-M07", 4, 2.5, "choreography-and-orchestration.md",
    `Which account of choreography and orchestration is correct?`,
    [
      { letter: "A", text: `Choreography is the conductor explicitly directing each part, and a mediator is the ballet where everyone reacts.`, rationale: `inverts the analogies — the conductor explicitly directs, so the conductor is the mediator.` },
      { letter: "B", text: `Microservices include a global mediator, inherited from service-oriented architecture.`, rationale: `microservices architectures don't include a global mediator like other service-oriented architectures; an architect who needs coordination creates a localized one.` },
      { letter: "C", text: `Choreography is decentralized with no central coordinator — each service acts independently, listening for events and reacting, like dancers in a ballet — and it uses the same communication style as a broker event-driven architecture, respecting the bounded context philosophy. A mediator is centralized, like a conductor in an orchestra, explicitly directing each part on when to execute. Complexity is absorbed either by the front controller pattern, where a nominally choreographed service becomes a mediator on top of its own domain responsibilities, or by a dedicated mediator, which creates coupling but focuses coordination into one service.` },
      { letter: "D", text: `As in (C), except that coupling in a workflow always indicates a design flaw to be removed.`, rationale: `domain workflows are often inherently coupled; the architect's job is finding the best way to represent that coupling, not to eliminate it.` },
    ],
    "C"
  ),
  mcq(
    "U4-M08", 4, 2, "fallacies-of-distributed-computing.md",
    `Which listing of the fallacies of distributed computing is correct?`,
    [
      { letter: "A", text: `Eight: the network is reliable; latency is zero; bandwidth is infinite; the network is secure; the topology never changes; there is only one administrator; transport cost is zero; the network is homogeneous. Each is an assumption you get for free inside a monolith — an in-process function call really is reliable, instant, free and secure — and every one stops holding the moment the call crosses a network.` },
      { letter: "B", text: `Seven — distributed logging is the eighth item often mistakenly added to the list.`, rationale: `the list is finite and fixed at eight; distributed logging is one of three further problems covered alongside them, not a missing member.` },
      { letter: "C", text: `As in (A), except that "the topology never changes" is a reality rather than a fallacy.`, rationale: `it is a fallacy — the reality is that the network topology always changes.` },
      { letter: "D", text: `As in (A), except that they apply only to systems built before cloud infrastructure existed.`, rationale: `the deck states that all eight apply to distributed architectures today.` },
    ],
    "A"
  ),
  mcq(
    "U4-M09", 4, 2, "fallacies-of-distributed-computing.md",
    `Distributed logging, distributed transactions, and contract maintenance and versioning — what is their relationship to the eight fallacies?`,
    [
      { letter: "A", text: `All three are among the eight.`, rationale: `the eight are all assumptions about the network itself; these three are separate distributed-architecture concerns covered alongside them.` },
      { letter: "B", text: `Distributed logging is the ninth fallacy, added after the original list was published.`, rationale: `a fallacy is something believed to be true but is not, and the list is finite and fixed at eight.` },
      { letter: "C", text: `Contract versioning is a restatement of "the topology never changes".`, rationale: `topology change is about the network; contract versioning is about agreements between teams who own the two sides.` },
      { letter: "D", text: `They are three further distributed-architecture problems covered alongside the eight fallacies and are deliberately not among them.` },
    ],
    "D"
  ),
  mcq(
    "U4-M10", 4, 2.5, "distributed-logging.md",
    `What makes distributed logging hard, and what do consolidation tools actually solve?`,
    [
      { letter: "A", text: `Buying a consolidation tool such as Splunk solves it.`, rationale: `the slides say such tools only scratch the surface of the complexities involved.` },
      { letter: "B", text: `Three problems in one: logs are many (dozens to hundreds), in different places, and in different formats — which makes root-cause analysis of, say, a dropped order very difficult and time-consuming. Consolidation tools such as Splunk help pull information from various sources into one consolidated log and console, but they only scratch the surface: a tool can fix location, not format differences or the absence of a shared correlation identifier. It is a cost taken on the moment you cross into distributed architectures, and it appears in no quality-attribute rating table.` },
      { letter: "C", text: `The only problem is volume; formats are standardised by the runtime platform.`, rationale: `three separate problems are named — many, in different places, and in different formats.` },
      { letter: "D", text: `As in (B), except that it appears in the comparison matrix as the shared risk of the distributed styles.`, rationale: `it does not appear in any quality-attribute rating table, which is part of why it is easy to overlook when choosing a style.` },
    ],
    "B"
  ),
  mcq(
    "U4-M11", 4, 2, "contract-maintenance-and-versioning.md",
    `What is a contract, and where does the difficulty of maintaining one come from?`,
    [
      { letter: "A", text: `A contract is the schema; the expected behaviour is documented separately alongside it.`, rationale: `the definition has two halves — a contract is behavior and data agreed upon by both client and service, so a schema alone is not a contract.` },
      { letter: "B", text: `The root difficulty is technical: serialisation formats change faster than teams can adapt to them.`, rationale: `the root difficulty is organisational — decoupled services and systems are owned by different teams and departments.` },
      { letter: "C", text: `A contract is behavior and data agreed upon by both the client and the service — both halves, so a schema alone is not a contract. The root difficulty is organisational rather than technical: decoupled services and systems are owned by different teams and departments, so nobody can change both sides at once; and even more complex are the communication models needed for version deprecation — telling everyone a version is going away, and knowing when it is safe to remove it.` },
      { letter: "D", text: `As in (C), except that version deprecation is the straightforward part once a version number sits in the URL.`, rationale: `the deck calls the communication models needed for version deprecation even more complex than contract maintenance itself.` },
    ],
    "C"
  ),
  mcq(
    "U4-M12", 4, 2.5, "acid-transactions.md",
    `Which statement of the ACID guarantees is correct?`,
    [
      { letter: "A", text: `Atomicity — all operations in a transaction succeed or none do, with a partially completed transaction rolled back to its prior state. Consistency — the transaction takes the database from one valid state to another, with all defined rules holding, including referential integrity and business rules. Isolation — concurrent transactions do not interfere, and one transaction's intermediate states are not visible to another. Durability — once committed it stays committed, surviving crashes and power loss. Note the C here is not the C in CAP: in ACID it means satisfying the database's declared rules; in CAP it means all nodes seeing the same data.` },
      { letter: "B", text: `As in (A), except that consistency in ACID and consistency in CAP are the same property.`, rationale: `same word, different property — declared rules versus all nodes seeing the same data.` },
      { letter: "C", text: `As in (A), except that isolation means the database is isolated from other systems.`, rationale: `isolation means concurrent transactions do not interfere with each other, each executing as if it were the only one running.` },
      { letter: "D", text: `As in (A), except that ACID is unavailable in every style other than the monolith.`, rationale: `service-based architecture keeps regular ACID transactions within a single coarse-grained domain service, which is one of its main selling points.` },
    ],
    "A"
  ),
  mcq(
    "U4-M13", 4, 2.5, "eventual-consistency-and-base.md",
    `Which account of BASE and eventual consistency is correct?`,
    [
      { letter: "A", text: `BASE is a software library you adopt in place of your transaction manager.`, rationale: `BASE transactions are not a piece of software but a technique.` },
      { letter: "B", text: `BASE applies to service-based architecture, since it is a distributed style.`, rationale: `SBA keeps ACID within a domain service; BASE belongs to microservices and other fine-grained, highly distributed architectures.` },
      { letter: "C", text: `As in (D), except that eventual consistency guarantees convergence within a bounded window.`, rationale: `"at some unspecified point in time" is the actual property — eventual consistency gives no bound on when convergence happens.` },
      { letter: "D", text: `BASE = Basic Availability, Soft state, Eventual consistency, and it is a technique rather than a piece of software; soft state is data in transit, not yet settled and still able to change without new input. ACID maps to monolithic and service-based architectures (coarse-grained services, single shared database, transactions scoped to one domain service); BASE maps to microservices and other highly distributed, fine-grained architectures. "At some unspecified point in time" is a real property — there is no bound on convergence — and eventual inconsistency is the named primary risk of event-driven architecture.` },
    ],
    "D"
  ),
  mcq(
    "U4-M14", 4, 2.5, "saga-pattern.md",
    `What does the saga pattern replace, and which ACID guarantee can it not recover?`,
    [
      { letter: "A", text: `It preserves all four ACID guarantees across services by coordinating commits centrally.`, rationale: `saga lacks isolation and supports only eventual consistency — it does not restore ACID across services.` },
      { letter: "B", text: `It replaces atomicity with compensation: a mediator calls each part of the transaction, records success or failure, and coordinates results; on error it must ensure no part succeeds if one fails, sending requests to the parts that succeeded telling them to undo the previous request — a compensating transaction framework, with each request typically entering a pending state until overall success. The guarantee it cannot recover is I, isolation: other transactions can see the intermediate, partially applied state. Its costs: complexity when asynchronous requests must be juggled, a lot of coordination traffic at the network level, and only eventual consistency.` },
      { letter: "C", text: `As in (B), except that the guarantee it cannot recover is D, durability.`, rationale: `the note names isolation — fragmentation of data during transactions — as the one saga cannot recover.` },
      { letter: "D", text: `As in (B), and needing sagas between services is a sign the services are too large.`, rationale: `the microservices deck treats it as a sign they are too small — the first question is granularity, not coordination.` },
    ],
    "B"
  ),

  written(
    "U4-W01", 4, 14, "fallacies-of-distributed-computing.md",
    `List all eight fallacies of distributed computing with the reality each one denies. Explain what they have in common with respect to a monolith. Then name the three further distributed-architecture problems the course covers alongside them that are deliberately not among the eight.`,
    `A fallacy is something believed or assumed to be true but is not, and all eight apply to distributed architectures today. 1. The network is reliable → the network is not reliable. 2. Latency is zero → latency is not zero. 3. Bandwidth is infinite → bandwidth is not infinite. 4. The network is secure → the network is not secure. 5. The topology never changes → the network topology always changes. 6. There is only one administrator → there are many network administrators, not just one. 7. Transport cost is zero → remote access costs money. 8. The network is homogeneous → the network is not homogeneous. What they have in common: each is an assumption you get for free inside a monolith — an in-process function call really is reliable, instant, free and secure — and every one of them stops holding the moment the call crosses a network. That is why the eight are the entry price for the distributed column, and it is the deployment unit rather than the code layout that puts a style in that column. The three further problems covered alongside them and NOT among the eight: distributed logging; distributed transactions (eventual consistency and BASE); and contract maintenance and versioning. The list of fallacies is finite and fixed at eight.`,
    `Adding distributed logging or contract versioning to the list as a ninth or tenth fallacy. They are taught in the same lecture but are deliberately outside the eight.`,
    `+15–20 requires all eight with their realities, the "free inside a monolith" observation, AND the three non-fallacy problems named. +10–14 if seven or eight fallacies are listed but the common property or the three extras are missing.`
  ),
  written(
    "U4-W02", 4, 15, "microservices-granularity.md",
    `A team's microservices need a distributed transaction spanning four of them for a routine business operation, and those four exchange messages constantly. An architect proposes introducing the Saga pattern. Give the question that should be asked before reaching for a saga, set out the three signals the course gives for deciding granularity, and — if a saga is genuinely needed anyway — say what it replaces, what it cannot recover, and what it costs.`,
    `The question to ask first is about granularity, not coordination: "if you find yourself needing transactions between services, it might be a sign that they are too small" — and trying to force them to work together in a transaction can be difficult and can violate the principles of the architecture. The three signals: Purpose — each microservice should have a clear and focused job, like a specialized tool designed for a specific task. Transactions — if multiple microservices need to work together to complete a task, consider how they will communicate and coordinate; sometimes it is better to keep closely related services together to avoid complications. Choreography — if many microservices need to constantly communicate with each other to function, that may be a sign they should be grouped into a larger service, simplifying things and reducing communication overhead. Both symptoms in this scenario land directly on signals two and three, so the first move is to move the boundary, not to coordinate across it. The rule is explicitly not "make them as small as possible": the goal is a balance between too small and too big, and micro is not a target. If a saga is genuinely required: it replaces atomicity with compensation — a mediator calls each part of the transaction, records success or failure, and coordinates results; in an error condition it must ensure that no part of the transaction succeeds if one part fails, sending a request to all the parts that were successful telling them to undo the previous request (a compensating transaction framework), with each request typically entering a pending state until the mediator indicates overall success. What it cannot recover is isolation, the I in ACID: other transactions can see the intermediate, partially applied state — fragmentation of data during transactions — and developers often need other countermeasures to prevent the resulting errors. Its costs: the design becomes complex if asynchronous requests must be juggled, especially where new requests are contingent on pending transactional state; it creates a lot of coordination traffic at the network level; and it supports only eventual consistency, so data is gradually updated and eventually matched rather than in a fraction of a second.`,
    `Going straight to the saga design. The deck treats needing transactions between services as a design smell about granularity, and the first question is whether the boundary is in the wrong place.`,
    `+15–20 requires granularity raised as the first question with the "too small" reasoning, all three signals, AND atomicity-replaced-by-compensation with isolation named as the guarantee saga cannot recover. +10–14 if the granularity point and the three signals are present but the saga's costs are thin.`
  ),
  written(
    "U4-W03", 4, 12, "eventual-consistency-and-base.md",
    `Map ACID and BASE onto the architecture styles that use each. Expand BASE, define soft state, and explain why "eventual consistency" is a weaker promise than it sounds. Finally, say whether sagas and BASE are alternatives to one another.`,
    `ACID maps to monolithic and service-based architectures: in service-based architecture the services are coarse-grained and share a single monolithic database, so regular ACID transactions with commits and rollbacks are used, and a transaction is typically scoped to a single domain service. BASE maps to microservices and other highly distributed, fine-grained architectures — which is exactly why they do not support the same level of database integrity. BASE = Basic Availability, Soft state, Eventual consistency, and BASE transactions are not a piece of software but a technique. Soft state refers to data in transit — data that is not yet settled and may still change without new input. Why the promise is weaker than it sounds: distributed architectures rely on eventual consistency to ensure that data processed by separate deployment units is, "at some unspecified point in time", all synchronized into a consistent state. That phrase is a real property rather than loose wording — eventual consistency gives you no bound on when convergence happens. The trade-off is stated plainly: high scalability, performance and availability at the sacrifice of data consistency and data integrity. Eventual inconsistency is also the named primary risk of event-driven architecture in the comparison matrix. Sagas and BASE are complementary, not alternatives — the slides say "in addition to sagas, BASE transactions are used." One further caution: the C in ACID is not the C in CAP. In ACID it means satisfying the database's declared rules; in CAP it means all nodes seeing the same data.`,
    `Placing service-based architecture on the BASE side because it is a distributed style. Its coarse-grained services and shared database are precisely what let it keep ACID.`,
    `+15–20 requires the correct style mapping on both sides, BASE expanded, soft state defined, the no-bound property of eventual consistency, AND sagas and BASE identified as complementary. +10–14 if service-based is placed correctly but the complementary point or the no-bound property is missing.`
  ),
  written(
    "U4-W04", 4, 14, "choreography-and-orchestration.md",
    `A microservices team must coordinate five services to complete one business workflow. Describe both coordination styles using the course's analogies, say which one preserves the architecture's philosophy and what that costs, and name the two ways the resulting complexity gets absorbed — including the pattern name for the one that happens by accident. Close with the mature point the deck makes about coupling.`,
    `Choreography is decentralized: no central coordinator exists, and each microservice acts independently, listening for events and reacting to them by calling other services as needed. It functions much like dancers in a ballet, where everyone knows their part and reacts to the music and the other dancers without being explicitly told what to do at every moment. It uses the same communication style as a broker event-driven architecture and respects the bounded context philosophy, which is why architects find decoupled events between services natural to implement. A mediator is centralized: an event mediator manages and controls the entire workflow for events requiring the coordination of multiple event processors, acting like a conductor in an orchestra, explicitly directing each part of the system on when to execute its task. Microservices architectures don't include a global mediator like other service-oriented architectures; an architect who needs to coordinate across several services creates their own localized mediator. Choreography preserves the highly decoupled philosophy and so reaps maximum benefits — but common problems like error handling and coordination become more complex in choreographed environments, and the First Law of Software Architecture applies: neither solution is perfect, each has trade-offs. Two ways the complexity is absorbed: (1) the front controller pattern, the one that happens by accident — a nominally choreographed service becomes a more complex mediator for some problem, with the workflow owner coordinating across a wide variety of other services and acting as a mediator in addition to its own domain responsibilities; the downside is added complexity in that service; (2) a dedicated mediator, built to handle the complexity and coordination of the business workflow — this creates coupling between the services, but it focuses coordination into a single service and leaves the others less affected. The mature point: domain workflows are often inherently coupled, and the architect's job entails finding the best way to represent that coupling in ways that support both the domain and the architectural goals. The architect chooses where the coupling goes, not whether it exists.`,
    `Presenting choreography as simply the better choice because it is more decoupled. Error handling and coordination get harder, and the front controller pattern is what that looks like when it goes unmanaged.`,
    `+15–20 requires both styles with the ballet and conductor analogies, choreography identified as preserving the philosophy along with its named cost, both absorption mechanisms with the front controller named, AND the coupling-is-often-in-the-domain point. +10–14 if the two styles and one absorption mechanism are covered but the front controller is unnamed.`
  ),

  // ============ Unit 5 — Model-Driven Architecture ============
  mcq(
    "U5-M01", 5, 2, "model-driven-architecture.md",
    `What motivates Model-Driven Architecture, and what are its stated objectives?`,
    [
      { letter: "A", text: `It was defined by the OMG in 2001 and is now a dead standard, superseded by agile practice.`, rationale: `MDA principles are thriving today under new names — contract-first development is the same PIM → PSM idea.` },
      { letter: "B", text: `That business rules change faster than the technology beneath them, so the code must be regenerated often.`, rationale: `reverses the two rates that motivate the whole approach — technology churns every 3–5 years while business rules remain valid for decades.` },
      { letter: "C", text: `"Technology fades, business rules persist." Frameworks, languages and databases change every 3 to 5 years (SOAP → REST → GraphQL; SQL → NoSQL → Vector DBs) while business domain rules remain valid for decades. Traditional development entangles enduring business logic with volatile technology implementations, forcing expensive complete rewrites. Defined by the Object Management Group in 2001, its core philosophy is that development should be driven by formal models rather than hand-crafted source code tied to specific platforms, with three objectives: decouple business logic from technical infrastructure, automate the creation of platform-specific code via systematic transformations, and preserve core business assets across technology generations.` },
      { letter: "D", text: `As in (C), except that its objectives are to eliminate hand-written code entirely and standardise everything on UML.`, rationale: `the three objectives named are decoupling, automating PSM generation, and preserving business assets across technology generations.` },
    ],
    "C"
  ),
  mcq(
    "U5-M02", 5, 2.5, "cim-pim-and-psm.md",
    `Which mapping of the three MDA abstraction levels is correct?`,
    [
      { letter: "A", text: `CIM answers "what business problem are we solving?" — the business domain and operational environment, for business analysts, domain experts and product owners, in ubiquitous domain language, completely ignorant of IT systems, databases or programming languages. PIM answers "what software structures and workflows satisfy the business rules?" — for software architects and lead engineers, 100% technology agnostic, with no references to SQL, Java, REST, Docker or cloud providers. PSM answers "how does this software execute on our chosen platform?" — for software engineers, DBAs and system integrators, bound to specific frameworks such as Spring Data JPA, Hibernate, Mongoose or ASP.NET Core.` },
      { letter: "B", text: `As in (A), except that the PIM may name a database engine, since structure implies storage.`, rationale: `the PIM is 100% technology agnostic — no references to SQL, Java, REST, Docker or cloud providers.` },
      { letter: "C", text: `As in (A), except that all three levels share one audience, the architect.`, rationale: `each level has a different audience, and that is precisely why the three levels exist.` },
      { letter: "D", text: `CIM answers "what structures", PIM "what problem", PSM "how it executes".`, rationale: `swaps CIM and PIM's questions — CIM is the business problem, PIM the software structures.` },
    ],
    "A"
  ),
  mcq(
    "U5-M03", 5, 2.5, "cim-pim-and-psm.md",
    `In the Coffee Shop Loyalty Points example, which statement is correct?`,
    [
      { letter: "A", text: `The tier thresholds and multipliers belong in the PIM, since they are numeric.`, rationale: `they are business rules stated in the CIM in pure domain language — a number is not a technology detail.` },
      { letter: "B", text: `The \`spec.md\` is a schema with typed fields, which is what gives it its precision.`, rationale: `Spec Kit specs are Markdown, not schemas — structure comes from the template and precision from the FR numbering.` },
      { letter: "C", text: `The two PSMs required two different PIMs, one relational and one document-oriented.`, rationale: `the entire point of the example is that both stacks were generated from the same PIM, which remained untouched.` },
      { letter: "D", text: `The CIM is pure domain language (1 point per $10; Standard 1.0x, Gold ≥100 at 1.5x, Platinum ≥300 at 2.0x; 10 points → $1; expiry 12 months after the transaction). The PIM is Spec Kit's \`spec.md\` — Markdown, not a schema — with user scenarios, numbered FR-001… requirements in MUST form, key entities in business prose with no types or keys, \`[NEEDS CLARIFICATION: …]\` markers, and a review-checklist gate for "no implementation details" — plus a PlantUML BPMN workflow. The PSM is the two generated stacks. The takeaway: technology details changed 100%, but the PIM blueprint remained pristine, untouched and fully deterministic.` },
    ],
    "D"
  ),
  mcq(
    "U5-M04", 5, 2.5, "mof-metamodeling-levels.md",
    `Which reading of the MOF metamodeling levels is correct?`,
    [
      { letter: "A", text: `M0 is the most abstract level and M3 holds the actual running data.`, rationale: `inverts the stack — M0 is the running data and M3 is the most abstract.` },
      { letter: "B", text: `M3 meta-metamodel (OMG MOF specification; in the AI column, the LLM base meta-prompt and system instructions), M2 metamodel (UML/SysML metamodel; Spec Kit spec template and PlantUML BPMN syntax rules), M1 model (the system PIM; your \`spec.md\` and \`.puml\`), M0 user objects (runtime instances in memory; database records and executable JSON objects). Read bottom-up: M0 is real data, M1 describes it, M2 describes what a model may look like, M3 describes what a metamodel may look like — and M3 is self-describing, which is where the stack stops. The number goes down as you get more concrete, the opposite of CIM/PIM/PSM.` },
      { letter: "C", text: `As in (B), except that the stack continues past M3 to M4 and beyond.`, rationale: `M3 is self-describing, which is exactly where the stack stops rather than continuing forever.` },
      { letter: "D", text: `As in (B), except that MOF numbering runs in the same direction as CIM/PIM/PSM.`, rationale: `it runs in the opposite direction, and mixing up the two numbering directions is named as an easy exam slip.` },
    ],
    "B"
  ),
  mcq(
    "U5-M05", 5, 2.5, "transformation-engines-and-agentic-ai.md",
    `Which mapping from legacy MDA elements to their AI-native replacements is correct?`,
    [
      { letter: "A", text: `QVT is the practical compiler and ATL is the theoretical OMG standard.`, rationale: `swaps them — QVT is the theoretical OMG standard, ATL the practical DSL and compiler built on the Eclipse Modeling Framework.` },
      { letter: "B", text: `The ADR replaces the PIM in the AI-native pipeline.`, rationale: `the ADR replaces the QVT/ATL rules; the PIM is replaced by Spec Kit \`spec.md\` plus PlantUML BPMN.` },
      { letter: "C", text: `QVT is the theoretical OMG standard defining how transformations must be structured — Query, View, Transformation, the "rulebook on paper" — while ATL is the practical DSL and compiler on the Eclipse Modeling Framework, analogous to writing a custom compiler frontend for every stack migration. AI-native mapping: PIM → Spec Kit \`spec.md\` + PlantUML BPMN; QVT/ATL rules → ADR; transformation engine → agentic AI; determinism enforcement → BPMN + linters + auto-testing.` },
      { letter: "D", text: `As in (C), except that the legacy approach's bottleneck was licence cost rather than complexity.`, rationale: `the named bottlenecks are extreme complexity, a steep learning curve, fragile toolchains and massive maintenance overhead as stacks evolved.` },
    ],
    "C"
  ),
  mcq(
    "U5-M06", 5, 2, "architecture-decision-record.md",
    `What is an ADR's structure, and what belongs in it rather than in the PIM?`,
    [
      { letter: "A", text: `The structure is Status / Context / Decisions, and the status (e.g. \`Accepted\`) is what makes a series of ADRs a decision history rather than a settings file. Naming conventions belong in the ADR, not the PIM — anything technology-specific has to live here to keep the PIM 100% technology-agnostic. In AI-driven MDA it takes over the job QVT/ATL rules used to do, defining technical decisions, constraints and conventions as prompt context for AI; changing the target stack means updating an ADR file, which is the whole flexibility claim. In the Coffee Shop example, ADR-001 is the only place the words PostgreSQL and MongoDB appear.` },
      { letter: "B", text: `As in (A), except that naming conventions belong in the PIM, since they describe structure.`, rationale: `anything technology-specific must live in the ADR precisely so the PIM can stay technology-agnostic.` },
      { letter: "C", text: `The structure is Context / Alternatives / Outcome, with no status field.`, rationale: `the structure is Status / Context / Decisions, and the status is what turns a series of ADRs into a decision history.` },
      { letter: "D", text: `As in (A), except that the ADR replaces the PIM as the input the AI reads.`, rationale: `the AI reads text-based PIMs alongside ADRs; the ADR supplies technical constraints, not the specification.` },
    ],
    "A"
  ),
  mcq(
    "U5-M07", 5, 2.5, "contract-first-development.md",
    `What do OpenAPI/Swagger, Protocol Buffers/gRPC, GraphQL schemas and SpecKit + PlantUML BPMN have in common?`,
    [
      { letter: "A", text: `Nothing to do with MDA — they are modern API tooling that happens to generate code.`, rationale: `they are named as MDA principles thriving today under new names; each has the PIM → PSM shape.` },
      { letter: "B", text: `As in (D), except that SpecKit + BPMN describes interfaces, exactly as OpenAPI and \`.proto\` do.`, rationale: `item 4's distinguishing feature is that it describes behaviour and workflow — prose plus diagrams — which is a strictly larger thing to specify than an interface.` },
      { letter: "C", text: `The shape is many technology-agnostic artifacts generating one technology-specific output.`, rationale: `reverses it — one technology-agnostic artifact, many generated technology-specific ones.` },
      { letter: "D", text: `Each has the same shape: one technology-agnostic artifact, many generated technology-specific ones — the PIM → PSM transformation under a different name. A YAML spec generates client SDKs and server stubs; a \`.proto\` schema compiles via \`protoc\` into C++, Java, Go and Python stubs; a GraphQL SDL auto-generates TypeScript types and resolver signatures; SpecKit + PlantUML BPMN feed AI code generators. This is the answer to "is MDA dead?" — the OMG-era tooling died, the idea is now industry default.` },
    ],
    "D"
  ),

  written(
    "U5-W01", 5, 14, "cim-pim-and-psm.md",
    `A coffee shop's loyalty scheme is being specified: 1 loyalty point per $10 spent; Standard tier 1.0x, Gold at ≥100 points 1.5x, Platinum at ≥300 points 2.0x; 10 points redeem for a $1 discount; unused points expire 12 months after the transaction date. The team must produce artifacts at all three MDA levels and ship on both a Java/PostgreSQL stack and a Node.js/MongoDB stack. Say what goes at each level, what the PIM's \`spec.md\` may and may not contain, where the words "PostgreSQL" and "MongoDB" are allowed to appear, and what the exercise is designed to demonstrate.`,
    `CIM — the business domain and operational environment, for business analysts, domain experts and product owners, in ubiquitous domain language, completely ignorant of IT systems, databases or programming languages; it answers "what business problem are we solving?" All four rules above are CIM content: point earning, tier upgrades with their multipliers and thresholds, redemption, and 12-month expiration. PIM — software system structure and precise business workflows, for software architects and lead engineers, 100% technology agnostic, with no references to SQL, Java, REST, Docker or cloud providers; it answers "what software structures and workflows satisfy the business rules?" Its artifacts are Spec Kit's \`spec.md\` and a PlantUML BPMN workflow. What \`spec.md\` may contain: user scenarios (a primary story plus Given/When/Then acceptance scenarios); functional requirements numbered FR-001… each testable and in MUST form (award 1 point per $10 before multipliers; apply the tier multiplier rounding down; promote to GOLD at ≥100 and PLATINUM at ≥300; allow redemption of 10 points for $1; reject redemptions exceeding the balance; expire unused points 12 months after the earning transaction; retain a permanent auditable history); key entities in business prose — Customer, Loyalty Account, Transaction — with no types, keys or tables; and \`[NEEDS CLARIFICATION: …]\` markers wherever the CIM was ambiguous, such as whether a tier downgrades when points expire. It passes a review-checklist gate: no implementation details — no language, framework or API. Spec Kit specs are Markdown, not schemas: structure comes from the template, precision comes from the FR numbering, and the spec is written for the business reviewer, not the compiler. PSM — mapping the PIM to a concrete technology stack, for software engineers, DBAs and system integrators: Stack A relational tables and foreign keys with JPA annotations on the JVM; Stack B a document model with embedded sub-documents, Mongoose schemas, TypeScript interfaces and an asynchronous event loop. "PostgreSQL" and "MongoDB" may appear only in the ADR — ADR-001 is the only place those words appear in the whole example, because anything technology-specific must live there to keep the PIM technology-agnostic. What it demonstrates: technology details changed 100%, but the PIM blueprint remained pristine, untouched and fully deterministic.`,
    `Putting the tier thresholds or multipliers in the PIM because they are numbers, or letting a database engine name into \`spec.md\` "just as an example".`,
    `+15–20 requires all three levels with their audience and question, the \`spec.md\` contents including FR numbering and NEEDS CLARIFICATION markers, PostgreSQL/MongoDB confined to the ADR, AND the "PIM remained pristine" takeaway. +10–14 if the levels are right but the \`spec.md\` constraints are vague.`
  ),
  written(
    "U5-W02", 5, 14, "transformation-engines-and-agentic-ai.md",
    `A team is replacing an ATL-based MDA toolchain with an agentic-AI transformation engine. Give the mapping from each legacy element to its modern replacement, name the single dimension on which the legacy approach is still better and state precisely what that claim is, then set out the four-part mitigation strategy — saying for each part what specifically it removes.`,
    `The mapping: PIM → Spec Kit \`spec.md\` + PlantUML BPMN, which works better because Markdown and plain text are human-reviewable by the business and natively understood by LLMs without heavy XMI parsers. QVT / ATL rules → the ADR, which defines technical decisions, constraints and conventions as prompt context for the AI. Transformation engine → Agentic AI (Antigravity, Claude Code, GitHub Copilot Workspace, Devin), which translates PIM + ADR directly into runnable code across any target stack without writing custom AST scripts. Determinism enforcement → BPMN + linters + auto-testing. What is being replaced: QVT was the theoretical OMG standard defining how transformations must be structured — Query, View, Transformation, the rulebook on paper; ATL was the practical DSL and compiler on the Eclipse Modeling Framework, analogous to writing a custom compiler frontend for every stack migration, with hardcoded AST rewriting over XMI/UML models, and bottlenecks of extreme complexity, a steep learning curve, fragile toolchains and massive maintenance overhead. The one dimension where traditional MDA still wins is determinism, and the claim is precise: ATL/QVT are 100% deterministic — a rule-based compiler always produces byte-identical output — whereas agentic AI is probabilistic and may introduce structural variance across generations. Byte-identical is a stronger property than "correct": an AI-generated PSM can be correct and still differ between runs, which is why the mitigations verify behaviour rather than text. The four mitigations: (1) PlantUML BPMN diagrams formally lock down execution sequences, decision gateways, error branches and state boundaries — removing logic and flow ambiguity; (2) Spec Kit specifications — numbered FR-xxx requirements with Given/When/Then acceptance scenarios, each individually verifiable against generated code — removing ambiguity about what was required, so every generated artifact traces back to a numbered FR; (3) ADRs — explicit rules such as naming conventions, package structure and ORM frameworks — removing variance in technical convention; (4) automated safety nets — linters, static type-checkers (\`tsc\`, \`javac\`) and unit test runners wrapped around AI generation — catching whatever variance survives the first three. On every other dimension AI-driven MDA wins: a low rather than extremely steep learning curve, lightweight text files rather than heavy fragile Eclipse EMF toolchains, and high flexibility, since changing stacks means updating an ADR file rather than writing new ATL rules.`,
    `Claiming the AI approach wins on every dimension, or describing determinism loosely as "the AI might get it wrong". The claim is byte-identical output, which is stronger than correctness, and the four mitigations exist to close exactly that one gap.`,
    `+15–20 requires all four mapping rows, determinism named as the only losing dimension with the byte-identical claim stated, AND all four mitigations with what each removes. +10–14 if the mapping and determinism claim are right but one or two mitigations are missing.`
  ),

  // ========= Unit 6 — Generative AI & LLM Architecture =========
  mcq(
    "U6-M01", 6, 2.5, "generative-ai-pipeline.md",
    `Which account of the six-stage generative AI pipeline is correct?`,
    [
      { letter: "A", text: `As in (C), except that evaluation is fully automated by BLEU, ROUGE and FID.`, rationale: `evaluation is deliberately not automated alone — metrics plus human preference testing plus red-teaming, with any one presented as insufficient on its own.` },
      { letter: "B", text: `Model selection is stage 1, and preprocessing follows once the architecture is chosen.`, rationale: `preprocessing is stage 1 — it happens before any model exists, and is what the training set is made of.` },
      { letter: "C", text: `Part 1 (Data & Modeling): data collection and preprocessing — deduplication, cleaning out toxicity/PII, tokenization, normalization; model selection — the architecture chosen for the modality (Transformers for text, Diffusion for images, GANs for video); model training — loss functions such as cross-entropy or adversarial loss, massive parallel computation on GPUs/TPUs, optimisers like AdamW. Part 2 (Deploy & Iterate): model evaluation — automated metrics (BLEU, ROUGE, FID) alongside rigorous human evaluation and safety red-teaming; deployment and serving — scalable APIs, quantization, KV-caching, UI; feedback loop — real user interactions refining the model through reinforcement learning or iterative fine-tuning.` },
      { letter: "D", text: `As in (C), except that the architecture is chosen by benchmark leaderboard rather than by modality.`, rationale: `step 2 chooses the architecture from the modality, not from fashion or leaderboards.` },
    ],
    "C"
  ),
  mcq(
    "U6-M02", 6, 2, "key-generative-models.md",
    `Which account of the four key generative model families is correct?`,
    [
      { letter: "A", text: `GANs — a generator and a discriminator competing; great for realistic images and video. VAEs — a probabilistic representation of input data in a latent space; good for data reconstruction. Diffusion — generating data by gradually transforming noise into structured data; state-of-the-art for high-fidelity images. Transformers — based on self-attention; the core architecture behind modern LLMs.` },
      { letter: "B", text: `As in (A), except that diffusion has displaced GANs everywhere, video included.`, rationale: `diffusion has displaced GANs for still images while GANs remain listed for video — "newest wins everywhere" is not what the slide says.` },
      { letter: "C", text: `As in (A), except that VAEs compete a generator against a discriminator.`, rationale: `that is the GAN mechanism; VAEs compress into a latent space.` },
      { letter: "D", text: `As in (A), except that Transformers are based on convolution.`, rationale: `Transformers are based on self-attention — that is what puts them at the centre of the rest of the deck.` },
    ],
    "A"
  ),
  mcq(
    "U6-M03", 6, 2.5, "transformer-architecture.md",
    `Which statement about the Transformer architecture is correct?`,
    [
      { letter: "A", text: `It processes sequential data one token at a time, which is what makes it accurate on language.`, rationale: `the definition is explicitly sequential data without sequential processing — that refusal is the whole point.` },
      { letter: "B", text: `\`Nx\` in the diagram means the block runs once over N tokens.`, rationale: `\`Nx\` marks that the block is stacked N times, not run once.` },
      { letter: "C", text: `Parallelism is a pleasant side benefit of the attention mechanism.`, rationale: `parallelism is not a side benefit — it is the reason the architecture scales to the model sizes that make LLMs possible.` },
      { letter: "D", text: `A neural network architecture designed to handle sequential data (like text) but without processing it sequentially: it figures out how the words relate to each other globally, making it highly parallelizable. That parallelism is the reason the architecture scales at all — and it immediately creates the problem that the model no longer knows word order, which positional encoding then solves. The stack: input embedding + positional encoding, then Nx of (multi-head attention → Add & Norm → feed forward → Add & Norm), then linear → softmax → output probabilities.` },
    ],
    "D"
  ),
  mcq(
    "U6-M04", 6, 2, "tokens-and-embeddings.md",
    `How does text get into a Transformer?`,
    [
      { letter: "A", text: `A token is always a whole word, so a token count equals a word count.`, rationale: `a token is a word or a sub-word, which is exactly why token counts never match word counts.` },
      { letter: "B", text: `Two steps, not one. Tokenize: the text is chopped into pieces called tokens — words or sub-words, which is why token counts never match word counts. Embed: embeddings translate those tokens into lists of numbers (vectors), so that words with similar meanings have similar numbers. Meaning is encoded as position in a vector space, which is what makes similarity search over embeddings possible later. Tokenization appears twice in the course — once over the training corpus as preprocessing, once over every request at inference.` },
      { letter: "C", text: `Tokenization and embedding are a single operation performed together.`, rationale: `they are two distinct steps: tokenize text into discrete pieces, then embed those pieces as vectors.` },
      { letter: "D", text: `Words with similar meanings are given distant vectors, which is what keeps them distinguishable.`, rationale: `words with similar meanings have similar numbers — closeness is exactly the property similarity search relies on.` },
    ],
    "B"
  ),
  mcq(
    "U6-M05", 6, 2, "positional-encoding.md",
    `Why does positional encoding exist?`,
    [
      { letter: "A", text: `To compress long sequences into a fixed context window.`, rationale: `it exists to restore word order lost to parallel reading, not to compress anything.` },
      { letter: "B", text: `It is a separate ordering step applied to the sequence after attention has run.`, rationale: `the signal is attached to each token and added to its embedding, so order is part of the same vector the attention layers see.` },
      { letter: "C", text: `Only because of the parallelism. A model that read sequentially would get order for free; the Transformer reads all words at the exact same time to be fast, trades order away, and then buys it back explicitly. Positional encodings act like page numbers, attaching a unique signal to each word — added to the token embedding rather than stored beside it. The example: "Dog bites man" is different from "Man bites dog".` },
      { letter: "D", text: `It would still be needed in a model that read strictly left to right.`, rationale: `a sequential reader gets order for free — positional encoding is the price paid for parallelism.` },
    ],
    "C"
  ),
  mcq(
    "U6-M06", 6, 2, "self-attention.md",
    `What does self-attention compute, and why is it called self-attention?`,
    [
      { letter: "A", text: `It lets the model look around at the other words to establish context — "bank" in "I sat by the river bank" is disambiguated by "river" and "sat" — producing a relevance score between every pair of words, which is what "globally" means in the Transformer's definition. So a token's meaning is not fixed by the token; it is computed from its neighbours every time. It is self-attention because the sequence attends to itself. The point of the example is not the ambiguity but that the disambiguating evidence is other tokens in the same input.` },
      { letter: "B", text: `It attends from the input sequence to a separate reference sequence held in the model.`, rationale: `self-attention means the sequence attends to itself, not to some other sequence.` },
      { letter: "C", text: `It assigns each token the one fixed meaning it learned during training.`, rationale: `the mechanism exists so the same word can carry different meanings in different sentences without a separate entry for each sense.` },
      { letter: "D", text: `It produces one relevance score per token rather than one per pair of tokens.`, rationale: `the output is a relevance score between every pair of words — that is what makes the relation global.` },
    ],
    "A"
  ),
  mcq(
    "U6-M07", 6, 2, "multi-head-attention.md",
    `Why does a Transformer use multiple attention heads?`,
    [
      { letter: "A", text: `Because heads run sequentially, each refining the previous head's relevance scores.`, rationale: `heads run in parallel over the same input, each producing its own scores, and the results are combined.` },
      { letter: "B", text: `Because each head is configured at design time for grammar, tone or pronoun reference.`, rationale: `the heads are not told what to specialise in — the division of labour is learned, and that split is an illustration of what tends to emerge.` },
      { letter: "C", text: `To process several sentences at once, one per head.`, rationale: `the heads look at the same sentence in multiple ways, not at multiple sentences.` },
      { letter: "D", text: `Because one attention pass forces a single notion of "relevant", and relevance is not one thing — grammar-relevant and tone-relevant are different questions about the same sentence. So the model has multiple heads, like different readers, running in parallel over the same input and each producing its own relevance scores, which are then combined. What they specialise in is learned, not configured; grammar, emotional tone and pronoun reference are illustrations of what tends to emerge.` },
    ],
    "D"
  ),
  mcq(
    "U6-M08", 6, 2.5, "transformer-sub-networks.md",
    `What do the feedforward network, residual connections and layer normalization each do?`,
    [
      { letter: "A", text: `Residual connections and layer normalization add representational capability to the model.`, rationale: `neither adds capability — both exist to protect the signal as it passes through a stack repeated N times.` },
      { letter: "B", text: `Attention decides what is relevant; the feedforward network is the "thinking" phase that digests the context and extracts deeper patterns — deciding what that relevance means. Residual connections give the original data a shortcut to bypass complex layers so the core message is not lost; layer normalization keeps the numerical data stable and within a healthy range. Both exist to make depth survivable, addressing the two opposite fatal failure modes — signal lost, or signal blown up. In the diagram they are the repeated Add & Norm boxes: "Add" is the residual, "Norm" the normalisation.` },
      { letter: "C", text: `As in (B), except that the telephone analogy is about long input sequences.`, rationale: `the telephone analogy is about depth — the number of stacked blocks — not the number of tokens.` },
      { letter: "D", text: `The feedforward network decides what is relevant, and attention interprets what that means.`, rationale: `reverses the two — attention decides what is relevant, and the feedforward network decides what it means.` },
    ],
    "B"
  ),
  mcq(
    "U6-M09", 6, 2, "encoder-and-decoder-halves.md",
    `What separates the encoder half from the decoder half?`,
    [
      { letter: "A", text: `Both halves are always used together, since the original Transformer had both.`, rationale: `different models use different halves depending on their job — BERT one, GPT the other, T5 and BART both.` },
      { letter: "B", text: `The decoder reads all at once and the encoder writes one token at a time.`, rationale: `swaps the two halves' jobs — the encoder reads, the decoder writes.` },
      { letter: "C", text: `The encoder reads and understands the input text entirely in one go, building a complete deep understanding of the whole sentence. The decoder takes what the encoder understood and generates output text one word at a time, looking back at what it just wrote to guess the next word. The split is understand vs produce: reading is done all at once, writing one token at a time, because each new token depends on the ones already written — which is why generation is autoregressive and cannot be parallelised the way reading can. "Two halves" is structural: a model may use one, the other, or both.` },
      { letter: "D", text: `As in (C), except that generation can be parallelised in the same way reading is.`, rationale: `each new token depends on the tokens already written, which is exactly why generation cannot be parallelised.` },
    ],
    "C"
  ),
  mcq(
    "U6-M10", 6, 2, "encoder-only-models-bert.md",
    `Which account of BERT is correct?`,
    [
      { letter: "A", text: `Bidirectional Encoder Representations from Transformers uses only the encoder half, reading the entire sentence at once and looking both left and right to gain a deep understanding of the context. Its job is to understand text, not write long essays: classifying emails as spam, analysing sentiment, finding a specific answer in a paragraph. Every task listed produces a short, closed answer — a label, a score, a span — which is the encoder-only signature. Bidirectionality is available because nothing is being written, so there is no future to hide.` },
      { letter: "B", text: `As in (A), except that BERT is bidirectional because it was trained on reversed text as well as forward text.`, rationale: `bidirectionality is available because there is no generation, so there is no next token that must be hidden.` },
      { letter: "C", text: `BERT uses only the decoder half, which is why it reads in both directions.`, rationale: `it uses only the encoder half — the name says so.` },
      { letter: "D", text: `As in (A), except that its signature task is open-ended long-form generation.`, rationale: `every task listed produces a short, closed answer, which is precisely the signature distinguishing it from a decoder-only model.` },
    ],
    "A"
  ),
  mcq(
    "U6-M11", 6, 2.5, "decoder-only-models-gpt.md",
    `Which account of GPT is correct?`,
    [
      { letter: "A", text: `Unidirectionality is an efficiency compromise that a large enough model would remove.`, rationale: `it is not a limitation but the training objective — a model allowed to see the next word could not be trained to predict it.` },
      { letter: "B", text: `GPT uses both halves, exactly like the original Transformer.`, rationale: `GPT uses only the decoder half; T5 and BART are the models that use both.` },
      { letter: "C", text: `"Autoregressive" means the model regresses toward the distribution of its training data.`, rationale: `autoregressive means its own output becomes its next input — the loop is why generation cost grows with output length.` },
      { letter: "D", text: `Generative Pre-trained Transformer uses only the decoder half, seeing only the words that came before (unidirectional), constantly guessing the next word and feeding that guess back into itself — autoregressive. Unidirectionality is not a limitation but the training objective: a model allowed to see the next word could not be trained to predict it. The autoregressive loop is why generation cost grows with output length and why KV-caching exists. The exam pair is bidirectional + understand (BERT) versus unidirectional + generate (GPT).` },
    ],
    "D"
  ),
  mcq(
    "U6-M12", 6, 2, "encoder-decoder-models.md",
    `When is an encoder-decoder model (T5, BART) the right shape?`,
    [
      { letter: "A", text: `Whenever the required output is long, since only two halves can sustain long generation.`, rationale: `the discriminator is that input and output are fundamentally different, not how long the output is.` },
      { letter: "B", text: `When the input and output are fundamentally different — translation, text summarization, turning bullet points into a full article. The encoder reads the entire input and passes that deep understanding to the decoder, which generates the output step by step. This is the original Transformer shape, as designed by Google. Summarization is the case worth thinking about: it is generation, so a decoder-only model can do it, but the encoder-decoder shape suits it better because the entire source must be understood before the first output token is chosen.` },
      { letter: "C", text: `As in (B), except that encoder-decoder is a later specialisation of BERT and GPT.`, rationale: `the reverse — encoder-decoder is the original shape, and BERT and GPT are the later specialisations that each kept one half.` },
      { letter: "D", text: `As in (B), except that a decoder-only model cannot summarize at all.`, rationale: `summarization is generation, so a decoder-only model can do it; the encoder-decoder shape merely suits it better.` },
    ],
    "B"
  ),
  mcq(
    "U6-M13", 6, 2, "llm-application-architecture.md",
    `Which account of the four-layer LLM application architecture is correct?`,
    [
      { letter: "A", text: `As in (C), except that context management is an optional convenience layer.`, rationale: `it exists because of a hard constraint — the token limit — and is a workaround for a fixed window, not a feature.` },
      { letter: "B", text: `Three layers, with data integration folded into serving infrastructure.`, rationale: `four layers are named, and each is developed into its own topic later in the deck.` },
      { letter: "C", text: `Orchestration layer — manages prompts, chains of thought, and external API calls (LangChain, LlamaIndex). Context management — handles token limits by maintaining short-term and long-term memory. Data integration — connects the LLM to enterprise data via vector databases and APIs. Serving infrastructure — load balancers, API gateways and inference optimization for latency and throughput. Building an application with an LLM requires more than just the model: the model is the small box, and everything around it is ordinary software engineering.` },
      { letter: "D", text: `As in (C), except that the model itself is the largest component and the layers are thin wrappers.`, rationale: `the deck's claim is the opposite — the model is the small box and the surrounding software is where the engineering lives.` },
    ],
    "C"
  ),
  mcq(
    "U6-M14", 6, 2.5, "retrieval-augmented-generation.md",
    `What does RAG actually change, and how do its stages run?`,
    [
      { letter: "A", text: `Three stages: an ingestion pipeline where documents are chunked, converted to embeddings and stored in a vector database; retrieval, where the user's query is embedded and a similarity search fetches relevant context; and generation, where the retrieved context is injected into the prompt and the LLM produces a grounded response. The model is never modified — RAG changes what goes into the prompt, not the weights, which is why it can serve information that did not exist when the model was trained. The two halves run at different times: indexing offline and batch, retrieval-and-generation online per request.` },
      { letter: "B", text: `As in (A), except that RAG fine-tunes the model on the retrieved documents.`, rationale: `the model is never modified — RAG changes the prompt contents rather than the weights.` },
      { letter: "C", text: `As in (A), except that chunking is a formatting step with no design consequences.`, rationale: `chunking is a design decision: chunks too small lose the context that made them meaningful, too large and the search returns mostly irrelevant text alongside the useful part.` },
      { letter: "D", text: `As in (A), except that indexing runs inside the request path so results are always current.`, rationale: `indexing is offline and batch, deliberately out of the request path — otherwise every query would wait for it.` },
    ],
    "A"
  ),
  mcq(
    "U6-M15", 6, 2, "vector-databases.md",
    `What do vector databases provide that ordinary indexes do not?`,
    [
      { letter: "A", text: `As in (D), except that metadata filtering is a convenience for narrowing results.`, rationale: `metadata filtering is a security control — the mechanism behind pre-filtering that stops the LLM ever seeing chunks the user is not cleared for.` },
      { letter: "B", text: `As in (D), except that hybrid search becomes redundant once the embeddings are good enough.`, rationale: `neither method is sufficient alone — product codes and proper nouns are exactly why keyword search remains in the picture.` },
      { letter: "C", text: `They are ordinary indexes tuned for high-dimensional data.`, rationale: `they answer a different operation: "nearest" in a space of hundreds of dimensions, rather than "equals" or "between".` },
      { letter: "D", text: `Three capabilities: fast similarity search using algorithms like HNSW to find nearest neighbours in milliseconds; hybrid search combining keyword search (BM25) with vector search for optimal retrieval accuracy; and metadata filtering, ensuring users only retrieve documents they have access to. Ordinary indexes answer "equals" and "between"; these answer "nearest". Hybrid search exists because neither method suffices alone — vector search finds things that mean the same, keyword search finds the exact term someone typed.` },
    ],
    "D"
  ),
  mcq(
    "U6-M16", 6, 2.5, "rag-as-a-pipe-and-filter-pipeline.md",
    `How does a simple RAG architecture map onto the pipe-and-filter style?`,
    [
      { letter: "A", text: `As in (B), except that the mapping holds for every RAG system, agentic ones included.`, rationale: `"Simple (or Naive)" is load-bearing — the moment loops and state appear the pattern breaks and the agentic patterns take over.` },
      { letter: "B", text: `Runtime query execution is a sequential, unidirectional pipeline of independent modular filters joined by fixed pipes. Filter 1 (Input Transform) captures user input and generates an embedding vector — a producer. Filter 2 (Retriever) queries a vector database for relevant chunks and Filter 3 (Augmentation) stuffs them alongside the original prompt into a context template — both transformers. Filter 4 (Generator) processes the augmented prompt and streams the output — the consumer. Pipeline's weakness carries over: a retrieval that returns nothing does not throw, it just produces a worse answer.` },
      { letter: "C", text: `As in (B), except that Filter 1 is the consumer and Filter 4 the producer.`, rationale: `reverses the ends — Filter 1 starts the flow and Filter 4 terminates it.` },
      { letter: "D", text: `As in (B), except that an empty retrieval raises an error that halts the pipeline.`, rationale: `it does not throw — it silently produces a worse answer, which is exactly why error handling is hard here.` },
    ],
    "B"
  ),
  mcq(
    "U6-M17", 6, 2, "secondary-styles-in-rag.md",
    `What complementary styles does an enterprise-grade simple RAG setup rely on?`,
    [
      { letter: "A", text: `As in (C), except that running three styles in one system is a compromise to be refactored away.`, rationale: `it is the normal case rather than a compromise — the same lesson as the FastPay exercise, where each subsystem earns its own pattern.` },
      { letter: "B", text: `As in (C), except that ingestion should sit in the request path so answers are never stale.`, rationale: `"out-of-band" is the important property — otherwise every query would wait for indexing.` },
      { letter: "C", text: `Event-driven / batch processing for ingestion, because the data preparation phase runs completely out-of-band from the query pipeline, often automated via batch processing or file-upload events; and component-based / SOA, because the retriever (Pinecone, Milvus, Qdrant) and the generator (an OpenAI API or an internal LLM) function as decoupled, interchangeable services. So one system runs three styles at once — pipe-and-filter for the query path, event-driven for ingestion, SOA for the components.` },
      { letter: "D", text: `As in (C), except that the SOA claim holds as long as the retriever and generator run in separate processes.`, rationale: `the test is interchangeability, not process separation: if swapping Pinecone for Qdrant means touching the generator, the responsibilities were not actually isolated.` },
    ],
    "C"
  ),
  mcq(
    "U6-M18", 6, 2.5, "security-in-rag-pipelines.md",
    `Which account of security in a RAG pipeline is correct?`,
    [
      { letter: "A", text: `Three controls at three points: data masking at ingestion, where PII is scrubbed or tokenized before entering the vector database; pre-filtering at the vector DB level, where the query is filtered by metadata tags before a similarity search executes, so the LLM never sees unauthorized chunks; and post-filtering, where a secondary security agent validates retrieved chunks against the user's IAM token before injection into the prompt. Pre-filtering is the strongest, because the model never receives the data at all — anything filtered after the model has seen it is damage control.` },
      { letter: "B", text: `As in (A), except that post-filtering is the strongest, since it validates against a live IAM token.`, rationale: `pre-filtering is strongest because the model never receives the data; post-filtering is damage control after the fact.` },
      { letter: "C", text: `As in (A), except that an instruction in the system prompt is an acceptable substitute for pre-filtering.`, rationale: `a prompt cannot be trusted to keep a secret it was given — "don't reveal this" is not an access control.` },
      { letter: "D", text: `As in (A), except that all three controls sit at retrieval time.`, rationale: `they sit at ingestion, before retrieval, and after retrieval — defence in depth along the pipeline, not one gate.` },
    ],
    "A"
  ),
  mcq(
    "U6-M19", 6, 2.5, "serving-and-inference-architecture.md",
    `Which account of LLM serving techniques and their costs is correct?`,
    [
      { letter: "A", text: `As in (D), except that continuous batching groups whole requests into fixed batches.`, rationale: `batching is at the token level precisely so that finished slots can be refilled mid-flight instead of idling the GPU.` },
      { letter: "B", text: `As in (D), except that KV caching trades accuracy for speed.`, rationale: `KV caching trades memory for speed; quantization is the technique that trades accuracy.` },
      { letter: "C", text: `As in (D), except that LoRA is a compression technique for reducing model size.`, rationale: `LoRA is a multi-tenancy answer — one base model plus a small adapter per customer, instead of a full fine-tuned copy each.` },
      { letter: "D", text: `KV caching caches the key and value tensors of past tokens to speed up autoregressive generation — a direct consequence of autoregression, since a decoder-only model would otherwise recompute attention over the entire prefix for every new token; it trades memory for speed. Continuous batching dynamically groups requests at the token level to maximize GPU utilization, trading per-request latency predictability for throughput. Quantization reduces precision (e.g. to 4-bit) for cheaper inference, trading accuracy for cost, and LoRA gives efficient per-tenant customization via low-rank adapters.` },
    ],
    "D"
  ),
  mcq(
    "U6-M20", 6, 2.5, "agentic-architectures.md",
    `What separates an agentic architecture from a linear pipeline?`,
    [
      { letter: "A", text: `Agentic architectures introduce five entirely new architectural patterns.`, rationale: `not one of the five is new — four already exist in the architecture-styles deck, taught with no reference to AI at all.` },
      { letter: "B", text: `Three properties: loops (it can repeat), state (it remembers between steps), and dynamic orchestration (the sequence is decided at runtime, not fixed at design time). A pipeline has none of the three. Agentic systems lean on five classic patterns: Blackboard for multi-agent systems, Microkernel/plug-in for single-agent tool use, Service-oriented/microservices for enterprise task delegation, Event-driven for long-running background work, and Repository for agent memory — and not one of the five is new.` },
      { letter: "C", text: `The separating property is model size: agentic systems require a frontier-scale model.`, rationale: `the three properties named are loops, state and dynamic orchestration — nothing about model size.` },
      { letter: "D", text: `As in (B), except that Microkernel is the multi-agent answer and Blackboard the single-agent one.`, rationale: `microkernel is the single-agent answer; blackboard and microservices are the multi-agent ones, and reaching for a multi-agent pattern on a single-agent problem is the standard over-engineering here.` },
    ],
    "B"
  ),
  mcq(
    "U6-M21", 6, 2.5, "agentic-pattern-matrix.md",
    `How should the agentic pattern matrix be read?`,
    [
      { letter: "A", text: `The Core Advantage column alone is enough to choose a pattern.`, rationale: `both columns have to match — the use-case column names the situation, and a pattern picked on advantage alone will be wrong for it.` },
      { letter: "B", text: `Blackboard and Microservices are both multi-agent patterns and are therefore interchangeable.`, rationale: `they split on opportunistic vs hierarchical — agents watching shared state and activating when they can help, versus an orchestrator that decomposes and delegates.` },
      { letter: "C", text: `Blackboard — complex, opportunistic multi-agent collaboration; advantage: asynchronous, decoupled data pooling. Microkernel — single-agent tool integration (ReAct loops); advantage: high plug-and-play capability for custom tools. Microservices — hierarchical enterprise task delegation; advantage: strict context boundaries and error isolation. Event-driven — high-scale, long-running background tasks; advantage: handles high latency and API rate limits gracefully. Repository — session persistence and memory management; advantage: prevents rapid context window overflow. Both columns must match, and two of the five are about surviving the LLM rather than organising the domain.` },
      { letter: "D", text: `As in (C), except that all five patterns are about organising the domain.`, rationale: `two of them — Event-driven and Repository — answer constraints of the technology (latency, rate limits, the context window), not of the domain.` },
    ],
    "C"
  ),
  mcq(
    "U6-M22", 6, 2.5, "agentic-actions-and-auditability.md",
    `How should an AI assistant that takes real actions be structured?`,
    [
      { letter: "A", text: `The LLM uses a strict interface such as function calling to request an action, while the actual execution happens safely inside a deterministic sandbox, not inside the LLM itself — the model proposes, the sandbox disposes, and the probabilistic component never holds the capability to act directly. High-risk actions generate an approval ticket rather than executing immediately, applied by risk rather than to everything. Every action is recorded in an immutable, append-only log giving a mathematically verifiable audit trail of why the AI acted and what context it used.` },
      { letter: "B", text: `As in (A), except that the LLM executes the action directly and the sandbox merely records it.`, rationale: `request and execute are separated on purpose — the model never holds the capability to act.` },
      { letter: "C", text: `As in (A), except that human-in-the-loop should gate every action for safety.`, rationale: `HITL is applied by risk — an approval gate on every action would make the assistant useless.` },
      { letter: "D", text: `As in (A), except that the audit log records what happened, which is all that can be recovered.`, rationale: `it records why and with what context — for a system whose behaviour was learned rather than written, the inputs to a decision are the only explanation available.` },
    ],
    "A"
  ),

  written(
    "U6-W01", 6, 16, "rag-as-a-pipe-and-filter-pipeline.md",
    `Map a simple RAG system's query path onto the pipe-and-filter style, naming the four filters and classifying each by filter type. Explain what the word "Simple (or Naive)" is doing in that claim. Name the two secondary styles an enterprise-grade RAG setup also relies on and what each is for, and give the pipeline weakness that shows up in RAG specifically.`,
    `A Simple (or Naive) RAG architecture fundamentally maps to the pipe-and-filter style: runtime query execution is structured as a sequential, unidirectional data processing pipeline, with data flowing through independent, modular components (filters) via fixed connections (pipes). Filter 1 (Input Transform) captures user input and generates an embedding vector — a producer. Filter 2 (Retriever) queries a vector database to pull relevant document chunks — a transformer. Filter 3 (Augmentation) stuffs retrieved text chunks alongside the original prompt into an LLM context template — a transformer. Filter 4 (Generator) processes the augmented prompt and streams the finalized text output — the consumer. This is the payoff of the whole course: a brand-new AI system turns out to be a pattern from 1990s software architecture, unchanged, and the vocabulary of the pipeline style — producer, transformer, consumer, one-way pipes, stateless filters — describes it exactly. "Simple (or Naive)" is load-bearing: the mapping holds for straightforward RAG, and the moment the system needs loops, state maintenance and dynamic orchestration, the linear pipeline is abandoned for the agentic patterns. The two secondary styles: event-driven / batch processing for ingestion — the data preparation phase runs completely out-of-band from the query pipeline, often automated via batch processing or file-upload events, which matters because otherwise every query would wait for indexing; and component-based / SOA, since the retriever (Pinecone, Milvus, Qdrant) and the generator (an OpenAI API or internal LLM) function as decoupled, interchangeable services — and "interchangeable" is the test of whether that claim is real: if swapping Pinecone for Qdrant means touching the generator, the responsibilities were not actually isolated. One system therefore runs three styles at once, which is the normal case rather than a compromise. The weakness: error handling and rollback across filters is complex, and in RAG specifically a retrieval that returns nothing does not throw — it just produces a worse answer.`,
    `Claiming the mapping holds for agentic RAG too. Agentic architectures reject linear data flows entirely, which is exactly why the word "Simple" appears in the claim.`,
    `+15–20 requires all four filters with their producer/transformer/consumer classification, the load-bearing role of "Simple (or Naive)", both secondary styles with their purposes, AND the silent-empty-retrieval weakness. +10–14 if the four filters and one secondary style are right but the weakness is stated generically.`
  ),
  written(
    "U6-W02", 6, 12, "repository-pattern-for-agent-memory.md",
    `An agent's reasoning loop currently contains inline logic for trimming old messages, summarising past turns, and querying a conversation-history store. Name the pattern this violates, say why the course calls it a structural necessity rather than a nicety, describe the two memories it abstracts and how they differ technologically, and state the specific failure it exists to prevent.`,
    `The pattern is the Repository pattern, the fifth of the five agentic patterns. Agents require persistent memory across long sessions, which makes it a structural necessity — not a nicety — to separate LLM logic from data storage. Without it, every context-window strategy is entangled with the reasoning loop and changing one means editing the other, which is exactly the situation described. It defines abstractions for short-term memory — in-flight context — and long-term memory — vector embeddings of past interactions. The two are different technologies, not merely different lifetimes: short-term is the live context window, while long-term is vector embeddings, the same machinery as vector databases pointed at conversation history instead of documents. The agent interacts with a memory interface provider rather than managing raw queries. Why it is used: it separates storage optimization protocols — context compaction, sliding windows, summaries — entirely from the agentic execution layers, which is precisely the inline logic in the scenario. In the agentic pattern matrix its use case is session persistence and memory management, and its core advantage is that it prevents rapid context window overflow — the actual failure it exists to stop, tracing straight back to Context Management in the four-layer LLM application architecture, which itself exists because of the hard token-limit constraint.`,
    `Describing short-term and long-term memory as one store with two retention periods. They are different technologies — a live context window versus vector embeddings.`,
    `+15–20 requires the pattern named, "structural necessity" justified by the entanglement argument, both memories with the technology difference, AND context-window overflow named as the failure prevented. +10–14 if the pattern and the two memories are right but the entanglement argument is thin.`
  ),
  written(
    "U6-W03", 6, 14, "resilience-against-llm-limits.md",
    `A product calls a third-party LLM API. In one week it sees: an outage where calls hang for minutes; a burst of HTTP 429 responses; a backlog of low-priority summarisation jobs exceeding capacity; and a period where the primary model is unavailable while cheaper models are fine. Name the control that answers each, explain why the four are not alternatives, and state the two things this architecture cannot fix.`,
    `Third-party LLM APIs have unpredictable latency and strict rate limits, so architecting for resilience is mandatory rather than defensive. The hanging outage → Circuit Breaker: if the LLM API throws consecutive timeouts the circuit "opens" and immediately returns a friendly error to the user rather than hanging indefinitely. A friendly error beats an indefinite hang — that is the circuit breaker's whole argument, and it is as much a statement about user experience as about reliability. The HTTP 429 burst → Exponential Backoff & Retries: on 429 (Too Many Requests) the system waits briefly, then retries with exponentially increasing delays. The backlog of low-priority jobs → Asynchronous Queuing: long-running or low-priority prompts are placed in a message broker (Kafka, RabbitMQ) and processed when API capacity frees up. The primary model unavailable → Fallback Models: the system automatically routes the query to a faster, cheaper, locally-hosted model. They are not alternatives because each answers a different failure: the API is down (circuit breaker), you are being throttled (backoff), you have more work than capacity (queuing), the model is unavailable (fallback). Applying backoff to a hard outage, or a circuit breaker to a capacity backlog, solves nothing. What the architecture cannot fix: first, the dependency is external and outside your control — a third party's latency and quota — so you cannot fix the upstream, only survive it; second, fallback models trade quality for availability, which makes answering with a weaker model a product decision rather than a purely technical one. The same reasoning drives using an event broker for agent communication: synchronous REST calls can cause agent networks to crash due to LLM latency, and event-driven architecture handles long-running loops and rate-limiting thresholds natively.`,
    `Treating the four controls as a menu to choose one from. Each answers a different failure, and the right architecture carries all four.`,
    `+15–20 requires all four controls correctly matched to their failure, the not-alternatives argument stated, AND both limits (external dependency, quality-for-availability trade). +10–14 if all four are matched but the limits are missing.`
  ),
  written(
    "U6-W04", 6, 14, "security-in-rag-pipelines.md",
    `A bank is putting an LLM assistant over its internal document store, which holds records at several clearance levels along with PII. Set out the three security controls the course requires, saying where each sits in the pipeline; say which is strongest and why; and explain why writing "never reveal documents the user is not cleared for" into the system prompt is not an acceptable substitute.`,
    `When an LLM accesses enterprise documents, strict document-level security and role-based access control (RBAC) are non-negotiable. Three controls, at three different points. Data Masking at ingestion: PII is scrubbed or tokenized during the ingestion phase, before entering the vector database — and because it happens once, at ingestion, every query thereafter is safe by construction rather than by repeated checking. Pre-Filtering at the vector DB level, before a similarity search executes: the query is filtered using metadata tags such as \`department: legal\` or \`clearance: top-secret\`, so the LLM never sees unauthorized chunks. Metadata filtering is a capability of the vector database itself, and it is a security control rather than a convenience. Post-Filtering after retrieval: a secondary security agent validates the retrieved context chunks against the user's IAM (Identity and Access Management) token before injecting them into the prompt. Together they are defence in depth along the pipeline, not one gate. Pre-filtering is the strongest, for one reason: the LLM never receives the data at all. Anything filtered after the model has seen it is damage control. Why the system-prompt instruction is not a substitute: a prompt cannot be trusted to keep a secret it was given. That is exactly why the architecture puts the boundary at retrieval rather than in the instructions — "don't reveal this" is not an access control. The data has to be prevented from reaching the model, not politely asked not to be repeated.`,
    `Accepting the system-prompt instruction as a fourth control, or as a cheap version of post-filtering. It is not a control at all — by then the document is already in the model's context.`,
    `+15–20 requires all three controls with their pipeline positions, pre-filtering named strongest with the never-sees-it reason, AND the explicit statement that a prompt is not an access control. +10–14 if the three controls are placed correctly but the prompt argument is weak.`
  ),
];

export function itemsForUnit(unit: number): ExamItem[] {
  return EXAM_ITEMS.filter((item) => item.unit === unit);
}

export function unitInfo(unit: number): UnitInfo | undefined {
  return UNITS.find((u) => u.number === unit);
}
