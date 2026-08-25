# Exam 01 — Modern Software Engineering Principles (Full Coverage Revision Exam)

**Total estimated time: 920 minutes (≈ 15 hours 20 minutes)**, across 79 items covering all 54 concept notes.
This is sized as a full-subject item bank for closed-book revision, not a single sitting — split across sessions as needed.

Per-unit time:

| Unit | Items | Minutes |
|---|---|---|
| 1. Foundations & Process | 14 | 153 |
| 2. Life-Cycle Models | 22 | 249 |
| 3. Requirements, Analysis & Design | 22 | 262 |
| 4. Implementation, Testing & Integration | 15 | 180 |
| 5. Maintenance & Engineering AI-Enabled Software | 6 | 76 |
| **Total** | **79** | **920** |

Rules: closed-book, no retries. Answer each item on its own — do not look ahead to other items for hints. No answers appear in this file; see `exam-01-answer-key.md` (grader use only).

---

## Unit 1 — Foundations & Process

### U1-01 (10 min)
Source: `goals-of-software-development.md`

A project manager, facing a slipped deadline, decides to add two additional developers to the team without changing the deadline or the agreed feature set, in order to "protect quality." Using the Project Management Triangle, predict what actually happens to quality in this scenario and explain the mechanism — is this move even coherent given what the triangle says happens to quality when the other corners are held fixed?

### U1-02a (10 min)
Source: `output-and-outcome.md`

A city government spends $2M building and launching a public transit app that lets riders see real-time bus locations. Two years later, ridership on the routes covered by the app has not increased, and complaints about bus punctuality are unchanged. Using the output/outcome distinction, state precisely what was delivered and what (if anything) was achieved, and explain why measuring only the first would make this project look successful.

### U1-02b (10 min)
Source: `output-and-outcome.md`

A colleague says: "As long as we deliver the outcome the client wanted, it doesn't matter whether we ship all the outputs on the original plan — outcomes are what count, so cutting scope is always fine as long as the goal is reached." Evaluate this claim using the fact that outcomes are only influenced, not directly controlled, by outputs.

### U1-03 (10 min)
Source: `software-complexity-and-intangibility.md`

A tech lead, wanting to reduce a system's complexity, decides to merge twelve microservices into one monolith, reasoning "fewer moving connected parts means less complexity." Evaluate this reasoning using the note's instruction about how complexity must be treated, and separately name one concrete cost of the system's intangibility that this merge does nothing to address.

### U1-04a (10 min)
Source: `software-deterioration.md`

A ten-year-old embedded control system has never been patched, updated, or modified in any way since it shipped, and now runs in an environment physically identical to when it was deployed. Predict its current failure rate relative to when it shipped, and explain why this differs from what would happen to a ten-year-old mechanical relay running under the same conditions.

### U1-04b (10 min)
Source: `software-deterioration.md`

A developer argues: "The Health Centre's no-show prediction model has been untouched in production for eight months and its accuracy has quietly fallen — this is basically the same phenomenon as software deterioration, just slower." Justify or refute this, using the exact mechanism the note distinguishes.

### U1-05 (12 min)
Source: `software-process.md`

For each of the following, state whether it is best classified as an Activity, an Action, or a Task in the process hierarchy, and justify each in one sentence: (a) "ensure the product meets accessibility standards," (b) "write the detailed design document for the payments module," (c) "run the unit test suite for the login function."

### U1-06a (12 min)
Source: `software-process-activities.md`

Compare the "Modeling" and "Construction" activities in terms of what each one bundles together that a student might expect to be separate. Name the dimension: what two things does each activity fuse, and why does the process treat them as one activity rather than two?

### U1-06b (10 min)
Source: `software-process-activities.md`

A student claims: "The building analogy's architect role only matters for waterfall-style projects — in an agile project, since developers talk to the client directly, there's no equivalent bridging function needed." Evaluate.

### U1-07a (15 min)
Source: `umbrella-activities.md` (compare against `software-process-activities.md`)

Compare "software configuration management" (an umbrella activity) with "construction" (a process activity) along the dimension of *when in the project timeline each one runs*. Then explain, using this dimension, why calling documentation a "phase" is a structural error rather than just bad scheduling.

### U1-07b (12 min)
Source: `umbrella-activities.md`

A team runs formal technical reviews only once, right before the release, as a final gate. Predict two specific ways this deviates from how reviews should function as an umbrella activity, and connect each to a concrete cost.

### U1-08a (10 min)
Source: `wants-and-needs.md`

A client says, "I want a dashboard with a red 'Export to PDF' button in the top-right corner." The team builds exactly that. Predict what is likely to go wrong even though the request was implemented correctly, and what question should have been asked instead.

### U1-08b (10 min)
Source: `wants-and-needs.md`

A stakeholder in a retail company says: "We want a recommendation engine." A team member replies: "Great, that's a clear, actionable need — let's start building." Evaluate this reply.

### U1-09 (12 min)
Source: `stakeholders.md`

A university builds an internal system that automatically flags exam scripts for a second grading pass when the AI-assisted first grader's confidence score is low. List the distinct stakeholders in this scenario (at least four, using the note's categories) and identify which one is the one the AI touchpoint specifically warns is easy to leave out — explain why it's easy to miss.

---

## Unit 2 — Life-Cycle Models

### U2-01 (10 min)
Source: `software-life-cycle.md`

A startup releases v1 of an app, and over the next 3 years continuously ships weekly updates, never treating any release as "final." A student claims this means the app has no life-cycle yet, since it hasn't reached maintenance. Justify or refute, using the three-stage model and the 1-shot vs. continuous distinction.

### U2-02 (10 min)
Source: `waterfall-life-cycle-model.md`

A team says "Our process is iterative because we allow feedback loops back to earlier phases when problems are found." Does this alone make their process incremental? Justify your answer using the note's explicit answers to "is waterfall iterative?" and "is waterfall incremental?"

### U2-03a (12 min)
Source: `classical-waterfall-phases.md`

A project manager schedules "Testing" as its own two-week phase, placed after Implementation and before delivery, with no testing performed during any earlier phase. Predict the specific problem this schedule creates, distinguishing what verification and validation each catch and why doing both only at this point is "too late" for each.

### U2-03b (10 min)
Source: `classical-waterfall-phases.md`

"The 'no planning phase' argument in the classical waterfall critique means teams shouldn't plan until the very end of the project." Evaluate.

### U2-04 (10 min)
Source: `cost-of-correcting-faults.md`

A team decides to fix a naming inconsistency they spot in a data field's meaning — a mismatch between what the requirements doc calls it and what the analysts have been assuming — right after requirements sign-off but before any design work starts. Argue why this timing is close to the cheapest possible point to fix it, and name the two-question test this decision exemplifies.

### U2-05a (10 min)
Source: `fault-failure-and-defect-terminology.md`

Consider this line: `average = total / count;` where `count` can legitimately be zero (e.g., no items yet). Using the mistake→fault→failure chain, identify what the mistake was, where the fault sits, and describe precisely what the failure looks like — do not just say "the code crashes."

### U2-05b (12 min)
Source: `fault-failure-and-defect-terminology.md`

A fraud-detection model correctly executes its code with no exceptions, using data that was, unbeknownst to the team, mislabelled during collection (transactions manually tagged "fraud" by an analyst who was, in a chunk of cases, simply wrong). The model performs poorly on real fraud. Identify where the "fault" lives, and explain why a code review of the model's inference code would never find it.

### U2-06a (12 min)
Source: `modern-maintenance-definition.md`

A report states: "This system has been in maintenance since January, when we went live; before that it was in development." A second report about a different, continuously-developed product says: "We started performing maintenance on this feature in March, three weeks before its first release, when we fixed a bug found in internal testing." Are both reports using "maintenance" correctly under the modern (1995) definition? Justify each separately.

### U2-06b (10 min)
Source: `modern-maintenance-definition.md`

A team says: "We can't call this maintenance yet — the product hasn't been delivered to the client." They are currently spending two days fixing a defect found during internal QA, one week before the scheduled release. Evaluate their claim under the ISO/IEC 1995 definition, and state what they would need to mean for their statement to be correct.

### U2-07a (10 min)
Source: `types-of-maintenance.md`

A payment processing system is modified because a partner bank changed its API's authentication scheme, requiring the client to adopt OAuth2 instead of API keys — nothing was broken, and no new feature was requested. Classify this change (corrective / perfective / adaptive) and justify using the "why" test.

### U2-07b (15 min)
Source: `types-of-maintenance.md`

A retailer's system is changed so it can process credit card numbers using a new 19-digit card format some regional banks began issuing. Separately, the same system is changed, unprompted by any external requirement, so the checkout page loads in half the time. Compare these two changes along the dimension "did we want it better, or did the world force it," classify each, and state why this pair is the one the note flags as the most commonly confused.

### U2-08a (15 min)
Source: `software-engineering-code-of-ethics.md`

Reconstruct N.'s situation: she raised the overbooking-driven bias once, it was verbally acknowledged and dropped, and she did not raise it again. Using Principles 1 (PUBLIC), 4 (JUDGEMENT), and 7 (COLLEAGUES), and the explicit ordering where PUBLIC is not subordinate to CLIENT AND EMPLOYER, state two concrete actions she should have taken instead, and explain why "I mentioned it once" does not satisfy Principle 4.

### U2-08b (10 min)
Source: `software-engineering-code-of-ethics.md`

A senior engineer says: "Principle 2 (Client and Employer) means my first duty is to do what my employer asks, since they're paying for the work — Principle 1 (Public) is more of a background value, not something that overrides a direct instruction from my employer." Evaluate, using the exact ordering and qualifying language in the code.

### U2-09 (12 min)
Source: `problems-with-the-waterfall-model.md`

A vendor is building a one-off compliance-reporting tool for a regulator, where the exact report format is legally fixed by a published standard that won't change for the life of the project. A consultant recommends switching from waterfall to a fully iterative/incremental process "because waterfall is outdated." Evaluate this recommendation using the note's stated conditions for when waterfall is suitable.

### U2-10 (10 min)
Source: `rapid-prototyping-model.md`

A team builds a rapid prototype of a new UI, shows it to the client for feedback, incorporates changes, then discards the prototype and writes the real system from a now-refined specification, delivered once at the end. A student claims "this is basically incremental development because the prototype was an early working version." Evaluate.

### U2-11 (12 min)
Source: `spiral-model.md`

Project A is a small, well-understood internal tool with negligible risk and a tight budget. Project B is a large, novel, safety-adjacent system with major technical unknowns. Using the model's stated strengths and weaknesses, argue which project is the better fit for the spiral model, and which dimension of the spiral diagram would grow fastest for the worse-fit project if forced to use it anyway.

### U2-12 (10 min)
Source: `code-and-fix-model.md`

A data analyst writes a one-off script to answer a single question from a dataset, runs it once, gets the answer, and deletes the script. Another analyst writes a similarly undesigned, unspecified script to generate a report — and that report becomes a weekly deliverable someone now maintains for two years. Explain why the first case is a defensible use of code-and-fix and the second is the "maintenance nightmare," even though both scripts were written the same way.

### U2-13 (10 min)
Source: `agile-manifesto.md`

A team writes zero documentation and rejects a client's request for a signed contract, saying "the Manifesto says working software over comprehensive documentation, and customer collaboration over contract negotiation, so both are basically worthless to us." Evaluate against the manifesto's own closing sentence.

### U2-14a (15 min)
Source: `iterative-and-incremental-development.md`

Compare "iterative" and "incremental" along the dimension of what actually changes between one cycle and the next — for iterative, what improves; for incremental, what is added — using a hypothetical email client built over 6 sprints as your example.

### U2-14b (12 min)
Source: `iterative-and-incremental-development.md`

An ML team runs 40 experiments over two months, each one refining model architecture and hyperparameters, producing steadily improving offline metrics — but nothing has been deployed or shown to a user in that time. Diagnose this using the specific failure mode the AI touchpoint names, and state what would need to be true for this NOT to be that failure mode.

### U2-15 (10 min)
Source: `millers-law-and-stepwise-refinement.md`

A junior developer, told to "postpone details," ships a login feature handling only the happy path (correct username/password), leaving out password-reset, lockout-after-failed-attempts, and session-expiry entirely, planning to "get to them eventually, maybe." Diagnose the misapplication of stepwise refinement here.

### U2-16 (12 min)
Source: `open-source-life-cycle-model.md`

A commercial (closed-source) vendor's users report "the export feature crashes on large files" but cannot say why. An open-source project's peripheral-group user instead submits a patch: "the buffer allocation in exportLargeFile() doesn't account for files over 2GB; here's a one-line fix." Explain why only the second is possible, and connect it to why open-source release cadence can be "a day later" while closed-source is roughly annual.

---

## Unit 3 — Requirements, Analysis & Design

### U3-01 (12 min)
Source: `requirement-definition.md`

A hospital's IT lead says, "The nurses need faster charting" (a need felt by a person), the hospital's procurement contract says, "The system shall reduce average charting time to under 90 seconds" (a condition imposed on the system), and the SRS document contains a line: "Charting screen response time: ≤200ms server-side" (a documented representation). Using IEEE 610.12-1990's three-part definition, explain why these are not competing versions of "the truth" but the same requirement at three different points in its life, and identify a way they could drift apart.

### U3-02 (10 min)
Source: `client-constraints.md`

An analyst, before any solution strategy has been proposed, spends the first requirements meeting asking "given your $50k budget, which of these three off-the-shelf platforms should we use?" Predict what this analyst is likely to miss, using the note's stated ordering for how constraints should be applied.

### U3-03a (12 min)
Source: `functional-and-nonfunctional-requirements.md`

Compare "the system shall encrypt all data at rest using AES-256" and "the system shall allow a manager to approve a purchase order" along the dimension of what each one specifies (an action the system performs vs. a property/constraint on how it performs). Classify each as functional or nonfunctional and justify from the dimension.

### U3-03b (12 min)
Source: `functional-and-nonfunctional-requirements.md`

For the business need "reduce the number of overdue library books by making due dates more visible to patrons," a requirements document includes: "The system shall allow patrons to change their profile picture." Evaluate whether this is a well-formed functional requirement, and separately whether it belongs in this SRS, explaining why these are two different questions.

### U3-04 (15 min)
Source: `requirement-elicitation-techniques.md`

A team needs to redesign a hospital's patient intake process and has three separate needs: (1) understand nuanced concerns from 8 senior nurses who've worked the floor for 15+ years, (2) get a directional signal from all 600 hospital staff about whether they'd prefer a tablet or paper-based intake form, (3) verify how intake is actually being done right now, since the written procedure manual is known to be outdated. Match each need to the best-fit technique from the four listed, and justify each choice using the note's stated rationale for that technique.

### U3-05 (12 min)
Source: `understanding-the-application-domain.md`

In a logistics company's requirements document, the term "delivered" is used throughout without definition. To the warehouse team it means "left our facility on a truck"; to customer service it means "physically handed to the recipient"; to finance it means "invoice can be generated," which happens at dispatch. Predict where and how this gap surfaces, and explain why nobody caught it during requirements gathering.

### U3-06 (10 min)
Source: `use-cases.md`

A developer writes a use case titled "Validate Password Hash Against bcrypt-Stored Value," with the actor named as "the PasswordValidator internal service class." A reviewer rejects it. Justify the rejection using what a use case is defined to model.

### U3-07 (10 min)
Source: `analysis-activity.md`

A business analyst says: "We already ran three requirement-elicitation interviews and wrote everything down clearly — analysis is basically just re-doing that work with more formality, so we could skip straight to design." Evaluate, using the note's explicit statement of what analysis does that elicitation does not.

### U3-08 (10 min)
Source: `the-specification-document.md`

A specification document includes the line: "The reporting module shall generate reports in a reasonably fast manner." Using the five C's and the "constitutes a contract" framing, predict a concrete dispute that could arise from this exact sentence during acceptance testing, and identify which of the five properties is most directly violated.

### U3-09a (15 min)
Source: `informal-semiformal-and-formal-specifications.md`

Compare an informal requirement ("the elevator shall not move while the doors are open") with a formal Finite State Machine specification of the same elevator's door/motion logic, along the dimension of what each can prove about the absence of a fault. Name all five FSM components you would need to define for this elevator at a conceptual level (you do not need to draw the full diagram).

### U3-09b (15 min)
Source: `informal-semiformal-and-formal-specifications.md`

A team is specifying "the model shall detect fraudulent transactions." Using the three-part structure the AI touchpoint requires for a model requirement (task, acceptable error profile, fallback), rewrite this into a proper requirement for a specific scenario: transactions over $10,000 from a new payee. For the acceptable-error-profile part, you must explicitly name which of the two error types is worse in this scenario and who gets to decide.

### U3-10a (15 min)
Source: `moving-target-problem.md`

Three months into a project, the client asks for a new "bulk export" feature that wasn't in the original requirements. Consider three possible backstories for this request and, for each, classify it against the five-cause table and state the correct response: (a) the client only understood they needed this after using the working beta build; (b) a new data-protection regulation now requires export capability for compliance; (c) the original interviews never asked about reporting/export needs at all.

### U3-10b (12 min)
Source: `moving-target-problem.md`

After being burned by requirement changes twice, a project sponsor mandates: "From now on, all requirements are frozen after sign-off, no exceptions, for every project." Evaluate this policy against the five-cause table, specifically addressing which causes it actually helps with and which it damages.

### U3-11 (12 min)
Source: `solution-strategy.md`

A city's parks department wants to "put GPS trackers on all maintenance vehicles." Apply the solution-strategy questioning chain (should we? what? how? why?) to this request, ending with a plausible restatement of the real objective, and explain why answering "should we?" first (with only "yes, trackers exist and are cheap") would have been premature.

### U3-12 (10 min)
Source: `design-activity.md`

A developer on an agile team skips writing any design artifact and goes straight from a rough user story to code, arguing "Agile means we don't build models." A teammate pushes back. Evaluate both positions and predict a concrete consequence of the developer's approach for the eventual database or interface design.

### U3-13 (12 min)
Source: `separation-of-concerns.md`

A team is separating concerns in a video-streaming service's design. Classify each of the following as separating along the Time, Qualities, or Views dimension: (a) splitting "requirements → design → implementation → testing" as distinct stages; (b) treating "startup buffering latency" and "long-term storage efficiency" as two things to balance separately; (c) maintaining a "data flow" diagram and a separate "control flow" diagram for the same subsystem.

### U3-14a (12 min)
Source: `modularity.md`

A team builds a web application's entire backend as a single 40,000-line file containing every route handler, database query, and business rule, with no functions or classes — but it works correctly and passes every test. A manager says "it's fine, it does exactly what it should." Evaluate this defense using the note's argument about functional equivalence, and name which of the three modularity properties (decomposability, composability, understanding) is most acutely missing.

### U3-14b (10 min)
Source: `modularity.md`

"Since modularity is defined as breaking software into components with minimal overlap of functionality, any codebase split into many small files automatically has good modularity." Evaluate.

### U3-15a (12 min)
Source: `cohesion-and-coupling.md`

A module named `OrderProcessor` contains functions for validating an order, calculating tax, and sending a confirmation email — and to do its job, it directly reads and writes twelve different global variables shared with four other unrelated modules across the codebase. Evaluate this module's likely cohesion and coupling separately (not as one combined "good/bad" judgment), and explain why they can move independently of each other.

### U3-15b (12 min)
Source: `cohesion-and-coupling.md`

A recommendation model is retrained monthly using 40 input features pulled directly from six different upstream services' databases, with no declared interface or contract for any of them. One upstream team silently renames a column from `last_login` to `last_active_ts` and changes its semantics slightly (counts API calls as well as UI logins). Predict what happens to the model, and explain why this is worse than an equivalent renamed field in a normal service-to-service API coupling.

### U3-16a (12 min)
Source: `divide-and-conquer-and-abstraction.md`

A team building a tax-filing product does two things: (1) splits the "calculate final tax owed" problem into separate sub-modules for income calculation, deductions, and credits, each solved independently; (2) provides a single "Total Tax Owed" figure to the end user while the calculation involves hundreds of internal line items the user never sees. Identify which is divide-and-conquer and which is abstraction, and state the single-word distinction that tells them apart, plus the brick/iceberg image for each.

### U3-16b (10 min)
Source: `divide-and-conquer-and-abstraction.md`

"The user interface of a watch abstracts away the watch's internals — this means the buttons and the internal movement mechanism are two separate divide-and-conquer subproblems that were solved independently." Evaluate.

---

## Unit 4 — Implementation, Testing & Integration

### U4-01 (15 min)
Source: `good-programming-practice.md`

Review this snippet from a billing module:

```
double calc(double a, double b, int t) {
    if (t == 1) return a * b * 0.07;
    if (t == 2) return a * b * 0.15;
    return a * b;
}
```

Identify at least two concrete violations of good programming practice, and rewrite the naming/parameter choices (layout is not required) to fix them, explaining why each violation specifically harms a future maintenance programmer.

### U4-02 (12 min)
Source: `nested-if-statements.md`

Simplify this, and state explicitly whether your simplification is safe or whether it changes behavior, given the rule about if-if being "frequently" (not always) equivalent to `&&`:

```
if (user.isLoggedIn()) {
    if (user.hasPermission("edit")) {
        allowEdit();
    }
} else {
    redirectToLogin();
}
```

### U4-03a (10 min)
Source: `self-documenting-code-and-comments.md`

A code review flags two comments in the same function:

```
// increment the retry counter
retryCount++;

// retry limit is 5, not 3, because the payment gateway's
// own timeout is 12s and each attempt needs ~4s to fail cleanly
if (retryCount >= 5) { giveUp(); }
```

Classify each comment as WHAT or WHY, state which one should be deleted (and what should happen instead) and which one must be kept, using the note's exact resolution.

### U4-03b (10 min)
Source: `self-documenting-code-and-comments.md`

"Since the note says self-documenting code is exceedingly rare, and comments explaining WHAT the code does are a confession the code doesn't say — the practical conclusion is: never write WHAT comments, but also don't bother making code more self-documenting since it's rare anyway; just accept unclear code and comment around it." Evaluate.

### U4-04a (10 min)
Source: `stubs-and-drivers.md`

You need to unit-test a `PricingEngine` module that itself calls a `TaxLookupService` module (not yet written) and is called by a `CheckoutController` module (already written, calling PricingEngine in production). To test `PricingEngine` in isolation, do you need a stub, a driver, both, or neither for each of `TaxLookupService` and `CheckoutController`? Justify using the direction rule (what calls what).

### U4-04b (10 min)
Source: `stubs-and-drivers.md`

"Since both problems with implementation-then-integration testing (stubs/drivers being thrown away, and lack of fault isolation) are caused by writing throwaway test scaffolding, the fix is simply to write better, reusable stubs and drivers instead of throwing them away." Evaluate.

### U4-05a (12 min)
Source: `top-down-integration.md`

Team A's product is well-designed with clean layering: high-level logic artifacts cleanly call low-level operational artifacts, which are highly reusable and used by many callers. The team integrates top-down. Explain the counterintuitive claim that being well-designed makes top-down's operational-artifact-undertesting problem worse, not better, using the defensive-programming mechanism.

### U4-05b (12 min)
Source: `top-down-integration.md`

During top-down integration of a new order-fulfillment system, a previously passing regression test for the "apply discount" feature starts failing right after module `InventoryCheck` is newly integrated (replacing its stub). State precisely where the fault must lie, and explain why this precision is lost if everything had been integrated at once instead.

### U4-06a (15 min)
Source: `bottom-up-integration.md`

Compare top-down and bottom-up integration along the dimension "how thoroughly are operational (low-level) artifacts tested, and by what mechanism," and explain precisely why "fault isolation" cannot be used to discriminate between the two strategies even though both explicitly claim it as an advantage.

### U4-06b (12 min)
Source: `bottom-up-integration.md`

A team integrates bottom-up: all the low-level database-access and utility modules first, thoroughly tested, then progressively higher-level business-logic modules are added, ending with the top-level `OrderWorkflow` controller last. Two weeks before release, integrating `OrderWorkflow` reveals that the overall control flow assumed by the architecture doesn't actually match how the lower modules were built to be called — a fundamental design mismatch. Diagnose this using bottom-up's single named weakness, and explain why this specific problem could not have been caught earlier under this strategy.

### U4-07 (10 min)
Source: `sandwich-integration.md`

A team integrates sandwich-style: logic artifacts top-down, operational artifacts bottom-up — but declares the integration "done" once both halves individually pass their own tests, without a separate step testing where the two halves meet. Predict what class of fault this team is now exposed to, and name which of sandwich integration's three advantages they've forfeited.

### U4-08a (15 min)
Source: `testing-to-specifications-and-testing-to-code.md`

A tester writes test cases purely from a payment API's OpenAPI spec, never opening the implementation source. Another tester, working only from the source code's branch structure, writes test cases to exercise every `if`/`else` path. Name both approaches (using at least two aliases each) and explain, using the specific "path must be present" limitation, why the second tester's approach would fail to catch a missing negative-amount check that the first tester's approach would likely catch.

### U4-08b (12 min)
Source: `testing-to-specifications-and-testing-to-code.md`

A QA engineer, testing a resume-screening model the traditional way, writes a table of specific (input resume, expected pass/fail) pairs pulled from the "specification," gets 100% pass on her ten test cases, and signs off. Explain precisely why this sign-off is weak evidence of correctness, and what she should have done instead.

### U4-09a (15 min)
Source: `walkthroughs-and-inspections.md`

Compare walkthroughs and inspections along the dimension of formality and team composition, using a new scenario: a 5-person team reviewing a payment-reconciliation module. Which format would you recommend if the team's goal is "catch as many faults as possible using recorded fault-type statistics to guide where to look," and which if the goal is "get quick feedback on whether anyone misunderstood the design before coding starts"?

### U4-09b (10 min)
Source: `walkthroughs-and-inspections.md`

"AI-enabled systems make walkthroughs and inspections less relevant, since so much of the 'logic' is now learned by the model rather than written by a person to review." Evaluate.

---

## Unit 5 — Maintenance & Engineering AI-Enabled Software

### U5-01 (10 min)
Source: `ensuring-maintainability.md`

A team ships a product with terse variable names and zero documentation, reasoning "we'll write good docs and clean up names during the first maintenance cycle, once we know what actually needs to change." Evaluate this plan using the note's claim about when maintainability is decided.

### U5-02 (12 min)
Source: `defect-reports.md`

Two users report the same bug: the invoice PDF export produces a blank page when an order has more than 50 line items. Walk through what the maintenance programmer should do, using the note's described process, distinguishing what changes if this is the first report of the bug vs. the second.

### U5-03a (12 min)
Source: `data-drift-in-trained-models.md`

A loan-approval model's accuracy has been silently declining for 4 months. The support team has received zero complaints about it (applicants don't know their odds should have been different), and no code has been deployed to the model-serving system in that window. Explain precisely why the conventional defect-report pipeline will never surface this problem on its own.

### U5-03b (12 min)
Source: `data-drift-in-trained-models.md`

"Data drift is just a form of adaptive maintenance — after all, adaptive maintenance is a response to a change in the environment the product operates in, and drift is caused by the world moving away from what the model was trained on, so they're the same thing." Evaluate.

### U5-04a (18 min)
Source: `engineering-ai-enabled-software.md`

A hospital deploys an AI-assisted triage system. For each of the following, say whether the note would call it (i) holds unchanged, (ii) strained/reframed, or (iii) breaks — and for any you mark (ii) or (iii), state what specifically changes or replaces it: (a) the appointment-booking and notification part of the system; (b) writing unit tests with fixed expected outputs for the triage-scoring model; (c) the specification for what the triage model should predict; (d) the integration order between the triage model and the downstream alerting service.

### U5-04b (12 min)
Source: `engineering-ai-enabled-software.md`

A classmate, after this course, writes in an exam: "The main lesson of the AI-enabled software unit is that traditional software engineering practices mostly don't apply anymore once machine learning is involved — you need a fundamentally new discipline." Evaluate this summary using the note's explicit framing of the 9/5/3 split, and give one concrete example from a practice that "holds unchanged" that directly contradicts the classmate's claim.
