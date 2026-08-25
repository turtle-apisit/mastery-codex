# Exam 01 — Answer Key (Grader Use Only)

Mirrors `exam-01-questions.md` item-for-item. Do not distribute to the learner before grading.

## Grading legend (from exercise-design's delta bands)

| Band | Meaning |
|---|---|
| +15 to +20 | Complete, correct mechanism, handles the boundary case |
| +10 to +14 | Correct core, one meaningful omission |
| +4 to +9 | Right direction, mechanism shaky or partly wrong |
| 0 to +3 | Recognizably on-topic, understanding not demonstrated |
| −5 to −10 | Confidently wrong mechanism |

Grade the mechanism, not the prose. A fluent answer that recites vocabulary without the causal chain is not a pass. Every note below states what a complete answer must contain and the specific trap being tested; use these to decide the band, not general impression.

---

## Unit 1 — Foundations & Process

### U1-01
**Must contain:** Quality is not a fourth tradeable corner — it is the variable that moves silently when Scope/Cost/Time are squeezed. The scenario is internally incoherent: adding headcount *is* a cost increase (more salaries), so "protect quality while holding cost fixed" secretly changes the cost corner while claiming not to. A complete answer names this contradiction explicitly, not just "quality will suffer."
**Trap:** Treating "quality" as a lever you can pull directly ("we protected it by adding people") rather than recognizing it's the passive victim of the other three corners, and missing that the move already broke the "fixed cost" premise.
**Grading:** +15–20 requires naming both the passive-victim framing AND the hidden cost-corner change. +10–14 gets one of the two. 0–3 for "quality will go down" with no mechanism. −5 to −10 for treating the move as a legitimate way to protect quality without cost.

### U1-02a
**Must contain:** Output = the shipped app (built, on the plan, countable). Outcome = the intended change in ridership/rider experience — which the scenario states did not happen. Must explicitly state that project reporting tracks outputs because they're countable, and that this project would look successful on output metrics alone while having produced no outcome.
**Trap:** Answering only "the app didn't work" without separating what was actually delivered (a working, correctly-functioning app) from what was never achieved (behavior change) — the app plausibly does work as software; the outcome failure is separate from any output defect.
**Grading:** +15–20 for clean output/outcome separation plus the "countable, so it's what gets measured" point. +10–14 for correct separation without the measurement-bias point. 0–3 for "it failed" with no output/outcome distinction.

### U1-02b
**Must contain:** The claim's true core (outputs are means, outcomes are the real objective) is acknowledged, but refuted on the "always fine" overreach: because outcomes are only *influenced*, not *controlled*, by outputs, you cannot reliably know in advance which outputs are safe to cut without risking the very outcome you're trying to protect.
**Trap:** Fully agreeing with the colleague (missing the overreach) or fully rejecting the colleague (missing that the core distinction is right) — both are shakier than identifying exactly which part is correct and which part fails.
**Grading:** +15–20 isolates the specific overreach (certainty about causality) rather than rejecting the whole claim. +4–9 for a vague "it depends" without naming the influence-vs-control mechanism. −5 to −10 for endorsing the claim outright as correct.

### U1-03
**Must contain:** Complexity must be handled/managed, not eliminated — merging services doesn't remove the many different, connected parts (same functionality/dependencies still exist), it just relocates boundaries, possibly losing whatever localization the old boundaries gave. Second part: intangibility (hard to visualize/test/estimate) is a separate axis untouched by a structural merge.
**Trap:** Conflating "fewer services" with "less complexity" — this is exactly the eliminate-vs-manage confusion the note draws a hard line around.
**Grading:** +15–20 requires both halves (complexity mechanism + a genuinely distinct intangibility cost, e.g., testing difficulty or estimation difficulty). +10–14 for the complexity half done well but a weak/missing intangibility point.

### U1-04a
**Must contain:** Failure rate stays flat/unchanged — deterioration is caused by modification, not time or use, and there are zero change events here. Contrast: hardware follows the bathtub curve and would show a rising failure rate in year ten from physical wear; software has no physical parts to wear.
**Trap:** Assuming age itself degrades software ("it's old, so it's less reliable") — this imports the hardware mechanism where the note explicitly says it doesn't apply.
**Grading:** −5 to −10 for predicting decay from age/use alone. +15–20 requires the explicit bathtub-curve contrast, not just "software doesn't wear out" as a slogan.

### U1-04b
**Must contain:** Verdict: not the same phenomenon, despite the surface similarity (failure rate rising, no visible code change). Software deterioration's defining mechanism is change-event-driven stepping; the model's decay is data drift — the world moving away from the training distribution — with literally zero change events on the curve, which the note treats as the exception, not a slow variant.
**Trap:** "Same thing, just slower" sounds reasonable and uses correct vocabulary but misses that this is explicitly the one case the note carves out as mechanistically different, not merely different in speed.
**Grading:** +15–20 must state that drift is the exception with *no change events at all*, not a slower version of ordinary deterioration. 0–3 for agreeing with the colleague's framing.

### U1-05
**Must contain:** (a) Activity — broad objective, no single deliverable. (b) Action — produces a major, specific work product. (c) Task — small, well-defined, single objective. Each justification must reference scope (broad objective / major work product / small well-defined objective), not size or difficulty.
**Trap:** Justifying by perceived size/effort ("this one is bigger so it's an Activity") instead of the actual scope criterion the hierarchy is built on.
**Grading:** +15–20 requires all three correctly classified with scope-based justification. +4–9 for correct labels but justification based on size/effort instead of scope.

### U1-06a
**Must contain:** Modeling bundles analysis of requirements + design (both are "produce a representation of the solution before building"). Construction bundles code generation + testing (testing is not a separate top-level activity). The dimension: what representation-and-verification pair each activity fuses into one continuous activity rather than a sequenced handoff.
**Trap:** Claiming Modeling = analysis only (missing design), or claiming testing is a standalone 6th activity.
**Grading:** +15–20 requires both fusions named correctly with the dimension stated explicitly. +10–14 for one correct fusion, one missed or vague.

### U1-06b
**Must contain:** False — the architect's bridging function is structural (buyer's vision and constructor's needed detail sit at different abstraction levels), not tied to a particular lifecycle model. In agile, someone (possibly the developer themselves, wearing two hats) still performs this bridging; the note states the same five activities appear in both waterfall and agile.
**Trap:** Accepting that "talking directly to the client" eliminates the need for translation/bridging — conversation without a bridging function still requires someone to convert vision into buildable detail.
**Grading:** +15–20 must explicitly invoke that the same five activities appear in agile per the note, not just assert "someone still does this."

### U1-07a
**Must contain:** Construction is positional (occurs at a specific point in project progression). Configuration management (and all umbrella activities) runs continuously, with no single position. Documentation-as-phase misapplies a sequential shape to something continuous — you cannot perform any other phase without the previous phase's documentation already existing and current, so it structurally cannot be deferred to an end slot.
**Trap:** Answering only "documentation should happen throughout" without the continuous-vs-positional framing that makes it a *structural* (not scheduling) error.
**Grading:** +15–20 requires the explicit continuous/positional dimension plus the dependency argument (can't perform phase N without phase N-1's current docs).

### U1-07b
**Must contain:** Two distinct failures: (1) reviews should be continuous, catching faults at each workflow's own output — a single pre-release review means requirements/design faults sit undetected until the most expensive point to fix them. (2) A once-only late review reproduces the rejected "testing phase" pattern — too late to catch each stage's own faults before they compound.
**Trap:** Giving one vague complaint ("reviews too late") instead of two distinct, connected failures with concrete costs.
**Grading:** +15–20 requires two distinct failures each tied to a concrete cost. +4–9 for one generic complaint.

### U1-08a
**Must contain:** The want (feature + presentation) may be satisfied while the underlying need (unstated business reason) is missed or actively undermined. Missing question: "why do you need this — what changes for you once you have it?"
**Trap:** Treating wants and needs as interchangeable, or accepting "it was built correctly" as sufficient success criteria.
**Grading:** −5 to −10 for "wants and needs are basically the same, just phrased differently." +15–20 requires a plausible concrete need this specific want might fail to serve.

### U1-08b
**Must contain:** The reply is wrong — "we want a recommendation engine" names a solution/feature with no stated business reason, structurally identical to "we want AI." Correct next step: elicit the need underneath before confirming scope, since a different, simpler mechanism might serve the actual need better.
**Trap:** Accepting the team member's framing that a stated want is already an actionable need.
**Grading:** 0–3 for agreeing the reply is fine. +15–20 requires naming the parallel to "we want AI" or an equivalent unstated-need diagnosis, plus a concrete alternative-need example.

### U1-09
**Must contain:** At least four stakeholders (e.g., university/client, grading staff/end-users, exam board/policy makers, plus the students being scored). Must specifically name the student (the person the system decides about) as the easy-to-miss stakeholder, and explain the invisibility mechanism: they never appear in requirements conversations, since nobody interviews them — their stake only surfaces as a side effect of the system's decisions.
**Trap:** Listing stakeholders without singling out the decided-about party, or naming them but not explaining *why* they're easy to miss.
**Grading:** +15–20 requires both the correct stakeholder list and the explicit invisibility mechanism. +10–14 for the right stakeholder named without the mechanism.

---

## Unit 2 — Life-Cycle Models

### U2-01
**Must contain:** Refute — the life-cycle begins at conception; for a continuous-development product (like the note's Facebook/Teams examples), there's no clean "development finished, now maintenance" boundary the way a 1-shot project has. Weekly updates after v1 already constitute ongoing maintenance/development activity layered together.
**Trap:** Assuming "life-cycle" only starts once a formal maintenance phase begins, rather than at conception per the note's definition.
**Grading:** +15–20 must invoke the 1-shot vs. continuous distinction explicitly, not just "the app has been running for 3 years."

### U2-02
**Must contain:** No — iterative (repeating/revisiting via feedback) and incremental (delivering working pieces over time) are different properties. Feedback loops alone establish iterative-ness but say nothing about incrementality, which requires evidence of multiple working deliveries.
**Trap:** Treating "has feedback loops" as sufficient evidence of incrementality.
**Grading:** −5 to −10 for concluding the process is therefore incremental. +15–20 requires both terms defined distinctly and the gap in evidence named.

### U2-03a
**Must contain:** Verification (end-of-phase testing) never happens for requirements/analysis/design under this schedule, so their faults (60–70% of all faults, per the course) sit undetected until the testing phase — the most expensive point. Validation (end-of-project) happening only once, very late, means the "right product" question is answered only when it's essentially finished, at maximum cost to fix.
**Trap:** A single generic "testing too late" answer without separately naming verification's and validation's distinct timing failures.
**Grading:** +15–20 requires both verification and validation named and their distinct failures stated. +4–9 for "testing too late" with no verification/validation split.

### U2-03b
**Must contain:** False. Preliminary planning of requirements/analysis happens at the start; the full SPMP is drawn up once specs are signed off, then monitored throughout. The objection targets planning-as-an-isolated-upfront-phase-for-the-whole-project, not planning early at all.
**Trap:** Concluding "don't plan until the end" — the note explicitly describes early preliminary planning.
**Grading:** −5 to −10 for asserting no planning happens until project end. +15–20 requires both halves: preliminary planning up front, and SPMP triggered by sign-off.

### U2-04
**Must contain:** At this point the fix is "just a document needs to be changed" — no code, design, regression testing, or reinstall involved, because it's caught before propagating into design/implementation. Exemplifies "shall we be vigilant" / "test early and often," catching a requirements-class fault (60–70% of large-product faults) at the cheapest point.
**Trap:** Saying "it's cheaper" without naming the specific late-stage costs avoided (code change, doc change, regression test, reinstall).
**Grading:** +15–20 requires the concrete list of avoided late-stage costs, not just "cheaper."

### U2-05a
**Must contain:** Mistake = the human reasoning gap of not considering/handling count=0. Fault = the missing `count == 0` check sitting in the code as written. Failure = the observable wrong behavior when executed with count=0 (e.g., divide-by-zero exception, or a silent NaN/Infinity propagating downstream — either is acceptable if precisely described, not just "it crashes").
**Trap:** Conflating fault and failure (e.g., calling the crash itself "the fault") — the classic terminology error the note is built to prevent.
**Grading:** −5 to −10 for conflating fault and failure. +15–20 requires all three terms kept distinct and correctly ordered, with a failure description more specific than "it crashes."

### U2-05b
**Must contain:** Fault lives in the training data (mislabelled), one of the three AI-specific fault locations, not in any line of code. The inference code executes exactly as written — there is a failure (poor real-world performance) with no code-level fault at all, so code review — which inspects lines of code — structurally cannot find it.
**Trap:** Looking for a code-level bug or blaming model architecture instead of identifying the data/labeling source.
**Grading:** −5 to −10 for locating the fault in code or architecture. +15–20 requires explicitly stating code review cannot find this because the defect has no code-level location.

### U2-06a
**Must contain:** Report 1: legitimate description of postdelivery maintenance (changes after delivery), but risks conflating it with "maintenance" generally if implying nothing before January counted. Report 2: actually the more correct usage of the *modern* (1995) definition — fixing a bug before release still counts as maintenance, since the definition is cause-based ("a problem"), not time-based, and applies regardless of before/after installation.
**Trap:** Rejecting report 2 as wrong "because it's still in development," which reapplies the classical temporal boundary the 1995 redefinition replaced.
**Grading:** −5 to −10 for calling report 2 incorrect due to pre-release timing. +15–20 requires explicitly naming both "postdelivery maintenance" and "maintenance" and stating they are not synonyms post-1995.

### U2-06b
**Must contain:** Wrong as stated under the modern definition — maintenance occurs whenever software is modified, regardless of before/after installation, so this defect fix is maintenance right now. Their statement would only be correct if "maintenance" is silently substituted for "postdelivery maintenance" (the narrower, time-based IEEE 1990 term), which cannot apply pre-release by definition.
**Trap:** Accepting the team's claim outright because "it hasn't shipped yet."
**Grading:** −5 to −10 for agreeing the activity isn't maintenance. +15–20 requires distinguishing "maintenance" from "postdelivery maintenance" explicitly.

### U2-07a
**Must contain:** Adaptive — triggered by a change in the environment the product operates in (partner's API), not a fault (no defect report) and not a desire for new capability for its own sake (no perfective motive). Must explicitly rule out the other two by their own tests, not just assert "adaptive" by pattern-matching "external system changed."
**Trap:** Labeling it corrective because "something had to change" without checking whether anything was actually broken.
**Grading:** +15–20 requires explicit elimination of both corrective and perfective using their defining tests.

### U2-07b
**Must contain:** Card-format change = adaptive (world forced it, nothing faulty, no freely chosen new capability). Checkout speed change = perfective (wanted it better, no external force, matches the note's explicit "improves performance" example). Must state why this pair is commonly confused: both are proactive/non-corrective with no defect report behind either, so "no defect report" cannot be the discriminator — the actual test is "did we choose this, or was it imposed."
**Trap:** Using "no defect report" as the sole test and concluding both are adaptive (or both perfective) — this is the exact confusion the note names.
**Grading:** −5 to −10 for classifying both the same way using the defect-report test alone. +15–20 requires the explicit want-vs-forced discriminator stated as the reason the pair is commonly confused.

### U2-08a
**Must contain:** Two concrete actions: (1) get the concern documented (minutes, email, issue tracker) so it exists as an actionable record, not an ephemeral remark; (2) escalate/re-raise when unaddressed, since Principle 1 (PUBLIC) is not subordinate to client/employer interests — a disproportionate impact on one group is a public-interest issue. Must explain why "mentioned once" fails Principle 4 (JUDGEMENT): independence of professional judgment means not deferring to "we'll look at that later" once you have reason to believe an issue is real and unaddressed.
**Trap:** Vague answers like "she should have spoken up more" without concrete, actionable steps, or citing the wrong principle numbers.
**Grading:** +15–20 requires correctly cited principles (1, 4, 7) tied to concrete actions. 0–3 for generic "be braver" answers with no principle grounding.

### U2-08b
**Must contain:** False, and precisely backwards — Principle 2 is explicitly qualified "consistent with the public interest," subordinating client/employer interest to PUBLIC, which is listed first and unqualified. An employer instruction conflicting with the public interest gets no deference under this ordering.
**Trap:** Accepting the engineer's hierarchy (employer first, public as background).
**Grading:** −5 to −10 for agreeing with the engineer's stated hierarchy. +15–20 requires citing the exact "consistent with the public interest" qualifier and the ordering.

### U2-09
**Must contain:** The recommendation is not well-supported as stated — waterfall's problems stem from its two assumptions failing (fixed-in-advance specification, no later changes); this project's requirements genuinely are fixed (published, unchanging legal standard) and it's effectively 1-shot, exactly the condition the note says waterfall suits. "Outdated" alone is not an argument.
**Trap:** Accepting "waterfall is outdated" as sufficient justification without weighing the actual project conditions against the model's stated failure conditions.
**Grading:** +15–20 requires explicitly checking the project against the two named assumptions, not a general endorsement or rejection of waterfall.

### U2-10
**Must contain:** Incorrect — rapid prototyping is still linear; the prototype is a communication device (attacking "validation only at the end"), not a release. One real product is still delivered once. Prototype existing early doesn't establish incrementality, which requires the actual product delivered in usable pieces over time.
**Trap:** Treating "an early working thing existed" as equivalent to "incremental delivery" — conflating a discarded prototype with a shipped increment.
**Grading:** −5 to −10 for agreeing this is incremental development. +15–20 requires explicitly stating the prototype is discarded/non-shipped, not an increment.

### U2-11
**Must contain:** Project B is the better fit (large-scale, complex, real risk to manage justifies the expense/complexity cost). Project A is a poor fit (expense/complexity not offset by risk-handling value when risk is negligible). If forced onto Project A: the radial dimension (cumulative cost) grows disproportionately to the angular dimension (progress) — paying repeated risk-analysis overhead for a project with little to analyze.
**Trap:** Recommending the spiral model based only on "it's the most thorough model" without weighing cost against actual risk.
**Grading:** +15–20 requires both the fit judgment and the correct radial/angular mechanism for the mismatch case.

### U2-12
**Must contain:** The distinguishing question is not how the code was written (both undesigned) but whether a maintenance phase was ever entered. The first case is genuinely 1-shot (discarded after use, no maintenance stage, so "most expensive way" cost never accrues). The second entered a two-year maintenance phase without ever having the design/specs maintenance normally depends on — the failure mode is writing without a design *and then keeping it*.
**Trap:** Explaining the difference by code quality rather than by whether the code was kept/maintained.
**Grading:** −5 to −10 for attributing the difference to how the code was written. +15–20 requires the "kept vs. discarded" framing as the actual discriminator.

### U2-13
**Must contain:** Wrong reading of the Manifesto — the closing sentence explicitly states items on the right (documentation, contracts) still have value, they simply lose in a conflict with items on the left. Zero documentation and refusing any contract structure overreads the Manifesto into an absolute rejection it explicitly disclaims.
**Trap:** Accepting the team's "basically worthless" framing as a correct reading.
**Grading:** −5 to −10 for endorsing the team's interpretation. +15–20 requires quoting or closely paraphrasing the closing sentence's "value on the right, but the left wins ties" framing.

### U2-14a
**Must contain:** Iterative = the same overall thing gets closer to its target across passes (e.g., a spam filter refined sprint over sprint, still "the spam filter" throughout). Incremental = new pieces added, most important first (e.g., send/receive → search → folders, each a functionally new capability). Must use a new example (not the Unified Process example from the note).
**Trap:** Using the note's own Unified Process example (paraphrase trap) instead of constructing a new one, or conflating the two properties into one description.
**Grading:** +15–20 requires a genuinely new example with both properties clearly and separately illustrated. Mark down (to 4–9) if the email-client example collapses the two into one undifferentiated description.

### U2-14b
**Must contain:** "Iteration with no increments" — the specific ML failure mode: heavy genuine iteration, zero incrementation (nothing shipped/usable delivered to anyone). For it not to be this failure mode, at least some iterations would need to correspond to shipped, usable increments giving users something to experiment with — not merely improving metrics.
**Trap:** Diagnosing this as simply "wasted effort" or "bad prioritization" without naming the specific iterate-without-increment pattern.
**Grading:** +15–20 requires the exact phrase/concept "iteration without increment" (or equivalent precise restatement) plus the counterfactual condition for it not to apply.

### U2-15
**Must contain:** "Postpone the details" is being misread as "skip the details" — the technique requires every aspect is eventually handled, just reordered by importance, not dropped. A correct application would have the three missing aspects explicitly queued and owned, not left as a vague "maybe."
**Trap:** Treating open-ended deferral ("get to it eventually, maybe") as a valid application of stepwise refinement.
**Grading:** −5 to −10 for endorsing the developer's approach as correct stepwise refinement. +15–20 requires explicitly distinguishing "postpone" (guaranteed, scheduled) from "skip" (indefinite, unaccountable).

### U2-16
**Must contain:** The commercial user can only produce a failure report (no source access, can only observe symptoms). The open-source user can produce a fault report (flaw + fix) because source is available. Connects to cadence: continuous fault reports plus core-group authority to install fixes removes the need for a slow, centralized, batched SQA cycle.
**Trap:** Attributing the cadence difference to team size or funding rather than to the failure-report/fault-report distinction the note specifically draws.
**Grading:** +15–20 requires the explicit failure-report vs. fault-report distinction connected causally to release cadence.

---

## Unit 3 — Requirements, Analysis & Design

### U3-01
**Must contain:** The three statements are the same requirement at three different points in its life — felt by a person, imposed on a system, documented in an artifact — not competing truths. Drift example: the 200ms server-side line could be satisfied while total charting time (including UI navigation) stays above 90 seconds — document-level (3) met while system-level (2) is not.
**Trap:** Treating the three statements as needing to be reconciled into one "correct" version rather than recognizing they occupy different locations by design.
**Grading:** +15–20 requires a concrete drift mechanism (like the 200ms vs. 90s example, or an equally specific new one), not just "they could disagree."

### U3-02
**Must contain:** This inverts the correct order (strategies first, constraints applied after). Opening with a budget-constrained platform choice prunes the solution space before any strategy has been generated or evaluated, likely missing a better-fitting approach that would have surfaced under unconstrained exploration.
**Trap:** Treating early budget discussion as simply good practice rather than recognizing it violates the stated ordering and its rationale.
**Grading:** +15–20 requires naming the specific risk (pruning strategies before evaluation) rather than a vague "should ask about needs first."

### U3-03a
**Must contain:** Approval action = functional (specifies an action the system performs). Encryption = nonfunctional (a property/constraint on how actions are carried out, not itself a user-triggered action). Dimension must be stated explicitly: functional answers "what," nonfunctional answers "how well/under what constraint."
**Trap:** Classifying encryption as functional because "it's something the system does."
**Grading:** −5 to −10 for classifying encryption as functional. +15–20 requires the explicit action-vs-property dimension.

### U3-03b
**Must contain:** The requirement is well-formed (clear, unambiguous action) but fails a traceability test (unrelated to the stated need). Must state explicitly these are two independent tests — a requirement can pass one and fail the other.
**Trap:** Conflating "well-written" with "belongs in this document" — concluding the requirement is flawed because it's off-topic, rather than separating the two tests.
**Grading:** +15–20 requires explicit statement that well-formedness and traceability are independent tests, with the requirement correctly scored on each separately.

### U3-04
**Must contain:** (1) Interview — depth/nuance from a small experienced group. (2) Questionnaire — hundreds of individuals' opinions. (3) Direct observation (or business-forms examination, but observation is the stronger fit given the manual is known stale) — captures actual current practice. Each choice justified by the note's stated rationale (depth vs. scale vs. actual-practice), not just technique names.
**Trap:** Matching by surface keywords (e.g., "8 people" → interview) without the underlying rationale, or choosing "examination of business forms" for (3) without addressing that the manual is explicitly known to be unreliable.
**Grading:** +15–20 requires all three matched correctly with rationale tied to the note's stated criteria.

### U3-05
**Must contain:** Surfaces late — at integration/acceptance/production, e.g., a "98% delivered on time" report using the dispatch definition while customers report undelivered packages, or premature invoicing. Not caught during requirements because an undefined term doesn't announce itself — it looks like agreement, since everyone used the word without noticing they meant different things.
**Trap:** Attributing the failure to poor communication or laziness rather than the specific mechanism (undefined terms look like consensus).
**Grading:** +15–20 requires the explicit "looks like agreement" mechanism, plus a concrete late-surfacing consequence (not just "there will be confusion").

### U3-06
**Must contain:** Rejection is justified — a use case models a boundary-crossing interaction between the system and its actors (users), not an internal procedure; "PasswordValidator" is an internal component, not an actor. The technical title/description also violates the natural-language requirement for requirements artifacts.
**Trap:** Accepting the internal-component framing as a valid actor, or focusing only on the technical-language issue while missing the actor-boundary violation.
**Grading:** +15–20 requires both issues named: wrong actor (internal, not boundary-crossing) and wrong register (technical, not natural language).

### U3-07
**Must contain:** Wrong — elicitation discovers, analysis refines and extends. Skipping analysis assumes elicitation output is already precise, but analysis exists precisely because requirements artifacts (comprehensible-to-client, natural language) are necessarily imprecise, and analysis is allowed to be precise because it's no longer written for the client to read unaided.
**Trap:** Accepting "more formality" as a fair description of what analysis adds, missing the audience-constraint reasoning.
**Grading:** −5 to −10 for agreeing analysis can be skipped. +15–20 requires the audience-constraint chain (client-comprehensible → natural language → imprecise → analysis needed).

### U3-08
**Must contain:** A concrete dispute (e.g., 8-second reports rejected by the client as "not reasonably fast," vendor disagreeing) enabled by the vague phrase functioning as an unenforceable contract term. Most directly violated property: Precise (Correct is a defensible secondary answer if justified — the item can't be verified as met without a measurable threshold).
**Trap:** Naming "Concise" as the violated property (superficially plausible since the sentence is short) instead of Precise — conciseness is about brevity, not about lacking a measurable threshold.
**Grading:** +15–20 requires a concrete, specific dispute scenario and Precise (or well-justified Correct) as the violated property, not Concise.

### U3-09a
**Must contain:** Informal sentence cannot prove absence of a fault (natural language / testing can only demonstrate presence if a violating case is found). FSM can prove absence across the full defined state space (the one technique in the course that can). All five FSM components sketched at a conceptual level: states, inputs, transition function, initial state, final states — with at least an attempt to encode "never doors-open AND moving."
**Trap:** Treating the FSM as "just a more detailed way of writing requirements" rather than recognizing its qualitatively different proof power (absence vs. presence).
**Grading:** +15–20 requires explicit "prove absence vs. demonstrate presence" framing plus a genuinely structured five-part FSM sketch (not just a states list).

### U3-09b
**Must contain:** Task, error profile, fallback all present and specific to the $10,000/new-payee scenario. Error profile must explicitly weigh false negative (missed fraud) vs. false positive (blocked legitimate payment) and state that only the client can decide the acceptable weighting — this must be stated explicitly, not implied.
**Trap:** Giving a numeric accuracy target ("99% accurate") instead of naming which error type is worse and by how much, or omitting the "only the client can decide" acknowledgment.
**Grading:** 0–3 for an accuracy-percentage-only answer. +15–20 requires all three parts present, the specific error-tradeoff named, and the client-decides acknowledgment stated explicitly.

### U3-10a
**Must contain:** (a) Client learned by seeing something → not a problem, IID working as designed; response = accept/prioritize normally. (b) World changed (regulation) → unpreventable; response = design to absorb it, no blame. (c) Never elicited properly → preventable process failure; response = root-cause the elicitation gap, separate from implementing the feature now. Each needs a *different* response, not a single generic one.
**Trap:** Giving the same response ("just build it") to all three, missing that the table's entire point is differentiated verdicts.
**Grading:** 0–3 for one undifferentiated response applied to all three. +15–20 requires three distinct, correctly-matched cause/response pairs.

### U3-10b
**Must contain:** The policy is an overcorrection. It weakly helps causes 3/4 (forces more upfront care, though doesn't fix a bad process, just freezes its output). It does nothing for cause 2 (world still changes regardless of a freeze) and actively damages cause 1 (forecloses the client-learns-by-seeing value that is IID's whole point). Cause 5 needs governance, not a freeze.
**Trap:** Treating "freeze requirements" as an unambiguous best practice without engaging the per-cause breakdown.
**Grading:** −5 to −10 for endorsing the freeze policy as sound without qualification. +15–20 requires explicit statement that row 1 is actively harmed by the freeze.

### U3-11
**Must contain:** Should we / What / How / Why chain applied, ending in a plausible restated objective (e.g., proof-of-service-completion for citizen complaints, vs. theft prevention, vs. fuel-cost reduction — each implying a different system). Must explain that answering "should we?" on feasibility/cost alone is premature because the same literal request can serve entirely different objectives requiring entirely different solutions (parallel to Sally's Software Shop).
**Trap:** Answering only "yes, trackers are useful" without progressing through what/how/why to a genuine objective-level restatement.
**Grading:** +15–20 requires a plausible, specific restated objective and an explicit statement of why premature yes/no is risky (different objectives → different systems).

### U3-12
**Must contain:** Teammate is right, developer is wrong — the note explicitly states Agile/iteration projects build fewer models, but models are still created; zero models is cowboy coding, explicitly named as causing suboptimal solutions and rework. Concrete consequence: ad hoc, per-feature database/interface decisions likely require reworking the schema/interface once conflicting assumptions surface across features.
**Trap:** Accepting "Agile means no models" as a correct reading of the course's position.
**Grading:** −5 to −10 for endorsing the developer's claim as correct Agile practice. +15–20 requires the "fewer models, not zero models" quote/paraphrase plus a concrete rework consequence.

### U3-13
**Must contain:** (a) Time. (b) Qualities. (c) Views. All three must be correctly classified.
**Trap:** Swapping (b) and (c), e.g., calling latency-vs-storage a "Views" split.
**Grading:** +15–20 for all three correct. 4–9 for 2/3 correct.

### U3-14a
**Must contain:** Defense conflates functional correctness with design quality — functional equivalence is not design equivalence. Most acutely missing property: decomposability (a 40,000-line undifferentiated file cannot be divided into independently workable pieces); understanding/localization also severely impaired.
**Trap:** Accepting "it passes every test" as evidence the design is fine.
**Grading:** −5 to −10 for endorsing the manager's defense. +15–20 requires the explicit functional-equivalence-≠-design-equivalence statement plus correctly naming decomposability (or understanding, with justification) as most acutely missing.

### U3-14b
**Must contain:** False — the definition requires minimal overlap of *functionality*, which file count alone doesn't guarantee; many small files can still duplicate logic or be entangled by shared globals. Physical separation is necessary-looking but not sufficient.
**Trap:** Accepting file-count as a proxy for modularity.
**Grading:** −5 to −10 for agreeing many small files automatically means good modularity. +15–20 requires a concrete counterexample mechanism (duplicated logic across files, or shared-global entanglement).

### U3-15a
**Must contain:** Cohesion (within-module) is reasonable-to-good (validating/taxing/emailing are plausibly related aspects of "processing an order"). Coupling (between-module) is bad (twelve shared globals across four unrelated modules — exactly the excessive between-module relationship the rule warns against). Must explain they move independently because they measure different things (within vs. between); one score doesn't predict the other.
**Trap:** Giving one combined "good/bad" verdict for the module instead of separate cohesion and coupling judgments.
**Grading:** 0–3 for a single undifferentiated verdict. +15–20 requires separate judgments plus the explicit "measure different things, move independently" statement.

### U3-15b
**Must contain:** Model's predictions silently shift/degrade — it's coupled to every feature it consumes, with no declared interface. Must explain why this is worse than a normal API coupling: a typed/schema'd API break would likely fail loudly (validation error, wrong-typed value); the model's coupling has no interface to break against, so it just retrains on a same-shaped column with different meaning — no exception, no defect report trigger.
**Trap:** Treating this as an ordinary integration bug rather than identifying the silent, undeclared nature of ML feature coupling as the qualitative difference.
**Grading:** +15–20 requires the explicit "no error, no exception, nothing to break loudly against" contrast with a normal API coupling.

### U3-16a
**Must contain:** (1) = divide-and-conquer (horizontal, brick — independent same-level subproblems). (2) = abstraction (vertical, iceberg — relevant detail shown, irrelevant hidden, one thing at multiple levels). Distinguishing word: physical (divide-and-conquer) vs. logical (abstraction).
**Trap:** Swapping the two, or explaining both with generic "breaking into pieces" language without the physical/logical distinction — this is the exact confusion the note flags as "easy under exam pressure."
**Grading:** −5 to −10 for swapping the classifications. +15–20 requires the explicit physical/logical word and correct brick/iceberg imagery for each.

### U3-16b
**Must contain:** False — this misclassifies the watch example, which the note gives specifically as abstraction, not divide-and-conquer. The buttons/UI are a logical simplification (relevant detail exposed, irrelevant hidden), not a separate physical subproblem solved independently — iceberg, not brick.
**Trap:** Accepting the claim's framing since "buttons vs. internals" superficially looks like two separate pieces (divide-and-conquer's brick pattern).
**Grading:** −5 to −10 for agreeing this is divide-and-conquer. +15–20 requires explicit correction to abstraction with the iceberg/vertical framing.

---

## Unit 4 — Implementation, Testing & Integration

### U4-01
**Must contain:** At least two violations: (1) meaningless names (`a`, `b`, `t`, `calc`) — maintenance programmer can't tell what `t==1`/`t==2` mean without reading call sites; rewrite to something like `calculateTax(double subtotal, double quantity, TaxCategory category)`. (2) Hardcoded "almost-constants" (0.07, 0.15) instead of parameter-file values — a rate change requires code change and redeploy instead of config update. Each violation must be tied to future-maintainer harm, not aesthetics.
**Trap:** Fixing only naming and missing the hardcoded-rate violation as a distinct issue, or justifying fixes by "cleanliness" instead of maintainer impact.
**Grading:** +15–20 requires both violations identified, fixed (naming/parameters), and explicitly tied to maintainer impact. +10–14 for one violation done well.

### U4-02
**Must contain:** NOT safely flattenable to bare `&&` because the outer `if` has an `else` (redirectToLogin()) that must still fire for logged-out users — collapsing to `&&` alone silently drops that behavior. Correct simplification preserves structure via flat if-else-if (depth 1, not nested) rather than a bare `&&`.
**Trap:** Flattening to `if (a && b) allowEdit();` and discarding the else branch — this is the exact danger the "frequently" hedge in the note warns about.
**Grading:** −5 to −10 for the bare-`&&` flattening that drops the else. +15–20 requires explicit recognition of the else-branch hazard and a correct flat-but-preserved-behavior rewrite.

### U4-03a
**Must contain:** First comment = WHAT (should be deleted; if code needs clarifying, recode rather than comment — though here `retryCount++` is already clear, so the comment is pure noise). Second comment = WHY (information — the 12s/4s timeout math — that cannot be recovered from the code itself; must be kept).
**Trap:** Classifying the WHY comment as unnecessary because "the number 5 could just be a named constant" — naming the constant doesn't recover the rationale for choosing 5 specifically; the comment is still necessary.
**Grading:** +15–20 requires both correct classifications and the correct "recode, don't comment-around" resolution for the WHAT comment.

### U4-03b
**Must contain:** Misreads the note — "exceedingly rare" is a realistic acknowledgment, not permission to stop trying; the note explicitly rejects using comments as a substitute for clarity ("recode in a clearer way," "never promote or excuse poor programming"). Correct conclusion is closer to the opposite: keep pushing toward clarity by default, reserve comments for genuinely irreducible WHY information.
**Trap:** Accepting the claim's "just accept unclear code" conclusion as a fair reading of the note.
**Grading:** −5 to −10 for endorsing "give up on clarity, lean on comments." +15–20 requires quoting/paraphrasing the "never promote or excuse poor programming" line or equivalent.

### U4-04a
**Must contain:** `TaxLookupService` is called by PricingEngine (below) → needs a stub. `CheckoutController` calls PricingEngine (above) → needs a driver. So: one stub + one driver, mirroring the note's artifact-`d` example.
**Trap:** Reversing stub/driver direction (e.g., calling TaxLookupService a driver).
**Grading:** −5 to −10 for reversed direction. +15–20 requires correct direction reasoning stated explicitly (what calls what), not just the correct final answer.

### U4-04b
**Must contain:** Addresses only problem 1 (waste of throwaway scaffolding); misses problem 2 entirely (lack of fault isolation, which depends on integration *order*, not scaffolding quality — the 211-places problem exists regardless of how reusable the stubs/drivers are). The note states both problems share ONE solution: combining unit and integration testing via a deliberate strategy.
**Trap:** Accepting "better reusable stubs/drivers" as a sufficient fix for both named problems.
**Grading:** −5 to −10 for endorsing the claim as sufficient. +15–20 requires explicitly stating problem 2 is untouched by scaffolding-reuse and requires an integration-order strategy instead.

### U4-05a
**Must contain:** In a well-designed, heavily layered system, operational artifacts sit deeper in the call chain (reached later under top-down order) and are called through well-designed, defensively-guarded callers (e.g., `if (x>=0)` before calling `computeSquareRoot`), so error-handling paths never execute. Better design compounds this: more guarding at each level, deeper operational artifacts reached later — "aggravated if well-designed" is this compounding effect.
**Trap:** Arguing good design should reduce the problem (intuitive but wrong) rather than explaining the compounding mechanism.
**Grading:** −5 to −10 for concluding good design reduces this risk. +15–20 requires the explicit defensive-guarding-plus-depth compounding mechanism.

### U4-05b
**Must contain:** Fault must lie in `InventoryCheck` itself or its interface(s) with the already-integrated (previously-passing) product — nowhere else. Precision is lost under all-at-once integration because the fault could then be anywhere among all artifacts/interfaces (the 211-places problem), with no "last thing added" to narrow the search.
**Trap:** Allowing the fault to be "anywhere in the system" even under top-down, missing the narrowing guarantee.
**Grading:** +15–20 requires the precise localization statement (InventoryCheck or its interfaces, nothing else) plus the explicit fault-isolation contrast with all-at-once integration.

### U4-06a
**Must contain:** Bottom-up: operational artifacts tested first, thoroughly, via drivers supplying arbitrary inputs (including ones a defensive caller would filter) — error paths properly exercised. Top-down: operational artifacts reached last, through defensively-programmed real callers — error paths frequently never exercised. Fault isolation cannot discriminate because both strategies provide the same "last thing added, fault localized there" guarantee at every step — it's a property of doing integration in any deliberate incremental order, not something specific to either direction; the real discriminators are what gets tested well and when design faults surface.
**Trap:** Listing fault isolation as an advantage that favors one strategy over the other.
**Grading:** −5 to −10 for treating fault isolation as a discriminator between the two strategies. +15–20 requires explicit statement that fault isolation is shared by virtue of incremental integration itself, with the real discriminators named.

### U4-06b
**Must contain:** Bottom-up's single named weakness: major design faults are detected late, because logic artifacts (carrying the architectural/control-flow decisions) are integrated last. Nothing below exercised whether components compose under the real control flow until the top-level logic artifact is finally wired in — the mirror image of top-down, where design faults surface first.
**Trap:** Attributing the mismatch to poor lower-level module quality rather than to the integration-order-driven late arrival of logic artifacts.
**Grading:** +15–20 requires the explicit "logic artifacts carry design assumptions, and they arrive last under bottom-up" mechanism, plus the mirror-image connection to top-down.

### U4-07
**Must contain:** Exposed to interface faults between the logic-side and operational-side artifacts specifically — the one place neither sub-strategy exercised on its own. Forfeited advantage: the third step (testing the interfaces between the two groups), which the note explicitly says must not be skipped.
**Trap:** Saying they've lost "fault isolation" generally rather than naming the specific missing third step and the specific fault class (interface faults at the boundary) it exists to catch.
**Grading:** +15–20 requires naming the omitted third step explicitly and the specific fault class it would have caught.

### U4-08a
**Must contain:** First tester = testing to specifications (black-box, data-driven, functional, input/output-driven — at least two aliases). Second tester = testing to code (glass-box, logic-driven, structured, path-oriented — at least two aliases). Explanation: if the code never contains a negative-amount-check branch, there is no such path for path-oriented testing to find; the programmer who omitted the check likely didn't think to test for it either (same blind spot). The spec-based tester is more likely to consider a negative amount regardless of what the code contains.
**Trap:** Naming only one alias per side, or missing the "same blind spot" reasoning for why path-oriented testing specifically fails here.
**Grading:** +15–20 requires ≥2 aliases per approach and the explicit "path must be present" / same-blind-spot reasoning.

### U4-08b
**Must contain:** Unit testing breaks as a correctness argument — there's no expected output for a single input in the traditional sense; correctness is a property over a population, not a fixed input→output mapping. Ten hand-picked cases say little about performance across subgroups (e.g., candidates with employment gaps). She should have done evaluation on slices — not "does it work?" but "for whom does it work?"
**Trap:** Treating 100% pass on hand-picked cases as strong evidence, or recommending "more test cases" rather than the qualitatively different slice-based evaluation.
**Grading:** −5 to −10 for endorsing the sign-off as adequate. +15–20 requires the explicit "population, not case" framing and the "for whom does it work" replacement named.

### U4-09a
**Must contain:** Walkthrough = informal, 4-6 members (current-workflow + next-workflow + SQA), document-driven, producing not-understood/appears-incorrect lists — best for "quick feedback on misunderstanding before coding." Inspection = five formal steps, preparation aided by fault-type statistics — best for "catch as many faults as possible using recorded statistics," since that's the mechanism unique to inspections' preparation step.
**Trap:** Recommending inspection for both goals "because it's more rigorous," missing the goal-specific structural match (fault-type statistics vs. not-understood/incorrect lists).
**Grading:** +15–20 requires each recommendation tied to the specific structural feature that matches the stated goal, not a general "inspections are better" answer.

### U4-09b
**Must contain:** False — the note states reviews and inspections hold unchanged and become the best tool for AI-enabled software, precisely because testing weakens elsewhere (unit testing breaks, testing-to-spec strained). The reviewable artifact shifts (becomes the labelling instruction, since individual rows can't be reviewed), but the practice itself becomes more load-bearing, not less relevant.
**Trap:** Accepting that "learned logic" reduces the value of human review.
**Grading:** −5 to −10 for agreeing reviews become less relevant. +15–20 requires the explicit "carries more of the load, artifact shifts to the labelling instruction" statement.

---

## Unit 5 — Maintenance & Engineering AI-Enabled Software

### U5-01
**Must contain:** Flawed plan — maintainability is decided at design and implementation time and cannot be added later. Deferring naming/documentation quality assumes maintainability is retroactively applicable, but by the time maintenance starts, the maintenance programmer is exactly the person harmed by its absence, and improving maintainability then requires understanding a system whose current unmaintainability is the very barrier to that understanding (a bootstrapping problem).
**Trap:** Accepting "we'll clean it up during the first maintenance cycle" as a workable plan.
**Grading:** −5 to −10 for endorsing the plan as reasonable. +15–20 requires the bootstrapping-problem framing (unmaintainable code blocks the understanding needed to make it maintainable), not just "maintainability should happen earlier."

### U5-02
**Must contain:** First occurrence: consult the defect report file first (finds nothing), then find cause/fix/workaround, file the new defect with supporting documentation, circulate to all sites with a fix-time estimate. Second occurrence: give the user the information already in the file (workaround, fix timeline) rather than re-diagnosing from scratch. Both cases, once fixed: test the fix, run regression testing, update documentation and prologue comments — authorized by the defect report itself since it's corrective maintenance.
**Trap:** Treating both reports identically (re-diagnosing from scratch each time) rather than distinguishing first-report vs. subsequent-report handling.
**Grading:** +15–20 requires the explicit first-vs-second distinction plus the full post-fix checklist (fix test, regression test, documentation, prologue comments).

### U5-03a
**Must contain:** The conventional pipeline starts with a user noticing and filing a report — drift produces no observable failure a user can attribute (a rejected applicant has no way to know the model's calibration shifted), and there's no code change to serve as a natural investigation trigger. Consequence: the system must know when it has stopped working on its own — monitoring must be designed in, since nobody will file "your model degraded by four percent" as a defect report.
**Trap:** Suggesting better user education or a modified defect-report form as the fix, rather than recognizing that no user-initiated report is structurally possible here.
**Grading:** +15–20 requires explicitly stating why a user cannot notice/report this (no observable symptom to attribute), not just "users won't report it."

### U5-03b
**Must contain:** Partially right, importantly wrong — both are environment-change-triggered, but ordinary adaptive maintenance has an identifiable trigger and a human-initiated modification; drift is adaptive maintenance triggered by nobody doing anything, with zero change events on the curve and nobody necessarily noticing the shift happened. Practical stakes: drift needs a categorically different detection mechanism (built-in monitoring, expecting decay) rather than the normal request→implement workflow.
**Trap:** Accepting the claim outright ("they're the same thing") or rejecting it outright without acknowledging the genuine shared root (environmental change).
**Grading:** 0–3 for a flat "yes, same thing" agreement. +15–20 requires acknowledging the shared trigger-type while explaining why the *detection mechanism* differs categorically.

### U5-04a
**Must contain:** (a) Holds unchanged — ordinary software, ~90%+ of a real ML system is this kind of thing. (b) Breaks — no expected output for a single input; replaced by evaluation on slices. (c) Breaks — specification precision breaks; training data occupies the spec's slot and becomes extensional (precise about covered cases, silent about the rest), not on the informal→semiformal→formal ladder. (d) Strained/reframed — becomes pipeline order; new hazard is training/serving computing features differently, and when they diverge nothing errors, predictions just silently worsen.
**Trap:** Classifying all four the same way (e.g., calling everything "AI-affected" or everything "unchanged"), or getting classifications right but omitting the specific replacement/reframing mechanism for each.
**Grading:** +15–20 requires all four correctly classified AND the specific replacement/reframing named for each non-unchanged item. +10–14 for correct classifications with a vague or missing mechanism for one or more.

### U5-04b
**Must contain:** Classmate's summary is wrong by construction — the note explicitly warns that hearing only "three break" (or only "nine hold") means the wrong lesson was learned. Correct shape: "mostly the same, in three specific places not at all" — 9 hold unchanged, 5 strained/reframed, 3 break. Concrete counterexample: any of the nine unchanged practices (e.g., good programming practice applying to the ~90% ordinary-software portion, including notebooks, which are explicitly not exempt).
**Trap:** Agreeing with the classmate, or disagreeing but only by listing the three broken practices (still one-sided in the other direction).
**Grading:** −5 to −10 for agreeing with the classmate's "fundamentally new discipline" framing. +15–20 requires explicitly citing the 9/5/3 split (or close paraphrase) plus a genuinely concrete counterexample (not just "some things stay the same").
