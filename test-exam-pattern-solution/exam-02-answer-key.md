# Exam 02 — Answer Key (Grader Use Only)

Mirrors `exam-02-questions.md` item-for-item. Do not distribute to the learner
before grading.

## MCQ grading

One point per item: full credit for the correct option, zero otherwise (MCQs are
not partial-credit). The rationale for each wrong option states the specific
misconception it represents — use these during review/regrade discussions with
the learner, not as a scoring mechanism.

## Written-item grading legend (from exercise-design's delta bands)

| Band | Meaning |
|---|---|
| +15 to +20 | Complete, correct mechanism, handles the boundary case |
| +10 to +14 | Correct core, one meaningful omission |
| +4 to +9 | Right direction, mechanism shaky or partly wrong |
| 0 to +3 | Recognizably on-topic, understanding not demonstrated |
| −5 to −10 | Confidently wrong mechanism |

---

## Unit 1 — Foundations & Process

### MCQ

**U1-M01** — Correct: **A**.
- B: treats Quality as a fourth corner that can be independently instructed to
  hold, rather than the passive variable that absorbs pressure from the other
  three.
- C: ignores that Scope is one of the three corners in its own right — only
  tracks Cost as if it were the sole quality-relevant variable.
- D: overweights Time as the only corner that affects quality, ignoring Scope.

**U1-M02** — Correct: **A**.
- B: treats visualization (drawing the diagram) as equivalent to elimination of
  the underlying complexity — the note is explicit that complexity is managed,
  never eliminated.
- C: conflates two distinct traits (complexity and intangibility) the note
  deliberately separates.
- D: wrongly restricts complexity's relevance to testing/estimation only, when
  understanding/visualization is exactly where complexity bites.

**U1-M03** — Correct: **A**.
- B: mistakes "produces any output" for "produces a major work product" — the
  Action level requires something on the scale of an architectural design, not
  a one-line CSS fix.
- C: judges the hierarchy level by the generality of the verb used ("fix")
  rather than the actual scope of the objective named.
- D: invents a criterion (duration/effort) the hierarchy does not use; it is
  built on scope, not time.

**U1-M04** — Correct: **A**.
- B: confuses "easy to miss" with "primary operator" — onboarding staff are
  directly consulted as system users, the opposite of invisible.
- C: paying customers are typically well-represented in requirements
  conversations precisely because they pay; they are not the invisible party
  the note names.
- D: QA being added late is a scheduling problem, not the specific
  "never-asked-to-be-a-stakeholder" invisibility mechanism the note describes.

**U1-M05a** — Correct: **A**.
- B: pulls in an unrelated concern (contracts/specification documents) that has
  nothing to do with the want/need gap being tested.
- C: mistakes specificity/detail of a request for it being an underlying need —
  a want can be very specific and still not be a need.
- D: substitutes a different distinction (functional/nonfunctional) for the one
  actually at issue.

**U1-M05b** — Correct: **A**.
- B: treats implicit/tacit knowledge as durable and self-propagating, when the
  note's point is the opposite — it is invisible to anyone who wasn't there.
- C: conflates the implicit/explicit distinction with the separate wants/needs
  distinction from the same note.
- D: assumes shared tacit assumptions reliably transfer into implementation,
  the exact risk the scenario is built to expose.

**U1-M06a** — Correct: **A**.
- B: stretches "Modeling" to absorb any planning-flavored work, when Modeling is
  specifically analysis-of-requirements + design.
- C: misremembers which activities are fused — Construction fuses code
  generation and testing, not deployment.
- D: treats the five generic activities as lifecycle-model-dependent, when the
  note states the same five appear in both waterfall and agile.

**U1-M06b** — Correct: **A**.
- B: defines role by job title/function performed elsewhere, rather than by
  which function (bridging) is actually being performed right now.
- C: assumes direct client conversation alone eliminates the need for
  translation into buildable detail — conversation without a bridging function
  still requires someone to convert vision into detail.
- D: confuses physical/organizational closeness to the product owner with
  performing the product owner's (buyer's) function.

**U1-M07a** — Correct: **A**.
- B: imports the hardware bathtub-curve wear-out mechanism into software, which
  the note explicitly rejects for unmodified code.
- C: still attributes failure-rate rise to age/time via a roundabout hardware
  argument, missing that the note is about the software artifact, not physical
  components.
- D: invents a rule with no basis in the note.

**U1-M07b** — Correct: **A**.
- B: mislabels ordinary change-driven step-up as drift; drift specifically
  requires zero change events, and this scenario has five patches.
- C: mistakes "some bugs got fixed" for the idealized curve's full return to a
  flat baseline — the actual curve never fully recovers.
- D: denies the note's applicability to software changes at all, when this is
  precisely the actual-curve mechanism the note describes.

**U1-M08a** — Correct: **A**.
- B: treats quality assurance as necessarily end-loaded, the exact positional
  error the note argues against.
- C: misdiagnoses a structural/positional problem as merely a duration problem.
- D: conflates umbrella-activity SQA (covers the whole process) with the
  testing sub-part of Construction (covers code only).

**U1-M08b** — Correct: **A**.
- B: assumes umbrella activities can be correctly collapsed into whichever
  process activity seems topically related, missing their continuous nature.
- C: fixates on naming/labeling rather than the continuous-vs-positional
  structural argument being tested.
- D: reassigns the activity to a different single position instead of
  recognizing it should run continuously.

**U1-M09a** — Correct: **A**.
- B: assumes outputs directly control outcomes rather than merely influencing
  them — a working app does not automatically produce behavior change.
- C: collapses two distinct concepts (output, outcome) into one measurement.
- D: silently redefines "output" to secretly include outcome achievement,
  erasing the distinction the item is testing.

**U1-M09b** — Correct: **A**.
- B: treats outcomes as fundamentally unmeasurable in principle, rather than
  merely requiring deliberate definition and tracking, unlike outputs.
- C: treats an output metric (story points) as if it were an outcome metric
  (retention).
- D: misapplies a different note's distinction (wants/needs) to a scenario
  about output/outcome.

### Written

**U1-W01**
**Must contain:** The API gateway's degradation (if it is genuine deterioration)
traces to actual modification events — each redeploy/patch stepping the failure
rate up per the actual-vs-idealized curve; untouched code should stay flat. The
fraud model's rise, with literally zero change events, is not ordinary
deterioration — it is the note's own named exception, data drift, where the
world moves away from the training distribution while the artifact itself never
changes. The answer must state the zero-change-events criterion explicitly as
the diagnostic difference, not merely assert "they're different."
**Trap:** Accepting the junior engineer's analogy because both look like "gets
worse the longer it runs," missing that the gateway's case (if real) requires an
actual modification history to explain, while the model's case explicitly has
none.
**Grading:** −5 to −10 for agreeing the two follow "the same process." +15–20
requires naming the zero-change-events criterion explicitly and connecting the
model's case to data drift by name.

**U1-W02**
**Must contain:** Refute. Risk management is one of the eight umbrella
activities, meant to run continuously across the entire process, not sit at a
single point the way a process activity does. Folding risk review into one
kickoff meeting collapses a continuous concern into a single positional slot —
the same structural error the note flags for documentation being wrongly treated
as a "phase." New risks emerge at every later stage (design, implementation,
integration), and a one-time review at kickoff cannot catch them.
**Trap:** Accepting "risk management is just planning" at face value because
both involve looking ahead, missing that Planning (a process activity) and Risk
Management (an umbrella activity) belong to different structural categories —
one is sequenced early, the other runs throughout.
**Grading:** −5 to −10 for endorsing the policy as reasonable. +15–20 requires
explicitly invoking the continuous/umbrella vs. positional/process-activity
distinction, not just "risks can appear later."

**U1-W03**
**Must contain:** Refute, as a definition of overall project success (the output
claim itself may be true). The portal (output) was delivered as planned, but the
outcome (faster/easier registration) was never achieved — delivering the former
is not evidence of the latter. Must explain the measurement-bias mechanism:
project reporting counts outputs because they're countable (built, on time, on
spec), while the outcome requires someone to have defined and tracked it — so
"successful" by output metrics can coexist with total outcome failure.
**Trap:** Accepting the dean's framing because "delivered to spec" sounds like a
complete definition of success, missing that spec-conformance is an output
claim, not an outcome claim.
**Grading:** −5 to −10 for agreeing the project is unambiguously successful.
+15–20 requires the explicit output/outcome separation plus the "countable, so
it's what gets measured" mechanism.

---

## Unit 2 — Life-Cycle Models

### MCQ

**U2-M01** — Correct: **A**.
- B: assumes a life-cycle only exists during active use, ignoring conception,
  design, and construction stages that precede deployment.
- C: relocates the life-cycle's start to the dev/maintenance boundary rather
  than conception, the note's actual anchor point.
- D: invents an unrelated starting criterion (retirement planning intent).

**U2-M02** — Correct: **A**.
- B: treats any feedback loop as automatically sufficient for both properties,
  collapsing two independently-defined properties into one.
- C: denies waterfall's feedback loops count as iterative at all, contradicting
  the note's explicit statement that waterfall is "iterative through feedback
  loops."
- D: mislabels "delivers once" as "definitionally incremental" — it is the
  opposite; incremental requires multiple working deliveries.

**U2-M03** — Correct: **A**.
- B: invents an unrelated severity criterion not tied to phase-of-detection.
- C: substitutes team size for phase-of-detection as the cost driver.
- D: denies there is a real cost mechanism at all, missing the note's central
  claim.

**U2-M04** — Correct: **A**.
- B: overstates the note's position into a blanket ban, when the note
  explicitly asks "what is it suitable for?" and answers with conditions.
- C: substitutes an unrelated generalization (banks = always high-risk) for the
  actual criterion (fixed vs. changing specification).
- D: introduces an unrelated critique (no testing phase) not connected to the
  fixed-specification condition being tested.

**U2-M05** — Correct: **A**.
- B: redefines "increment" to include any discarded early artifact, erasing the
  shipped-vs-discarded distinction the note relies on.
- C: misattributes incrementality to the spiral model via an unrelated
  inheritance claim.
- D: accepts the incremental framing and only disputes timing, missing that the
  core problem is the prototype being discarded, not when it was shown.

**U2-M06** — Correct: **A**.
- B: treats the spiral model as universally optimal regardless of project
  fit, contradicting the note's explicit strengths/weaknesses framing.
- C: denies the spiral model has real cost/complexity weaknesses, which the
  note states directly.
- D: invents an unrelated restriction (AI-only applicability) not in the note.

**U2-M07** — Correct: **A**.
- B: overgeneralizes "most expensive way" into "never defensible," ignoring the
  note's explicit 1-shot exception.
- C: locates the failure mode in the act of skipping design itself, rather
  than in keeping undesigned code around for maintenance, which is the note's
  actual distinction.
- D: substitutes programmer skill for the actual discriminator (whether a
  maintenance phase was entered).

**U2-M08** — Correct: **A**.
- B: treats "as late as possible" as license for indefinite/permanent deferral,
  rather than reordering with a guarantee of eventual handling.
- C: misreads Miller's Law as being only about simultaneity, ignoring stepwise
  refinement's explicit "every aspect is eventually handled" requirement.
- D: accepts the misapplication framing but for the wrong reason (sequencing
  preference rather than the postpone-vs-skip distinction).

**U2-M09** — Correct: **A**.
- B: denies the structural source-access barrier, framing it as a skill issue
  instead.
- C: substitutes an unrelated explanation (training gap) for the actual
  mechanism (no source access).
- D: substitutes an unrelated generalization about code quality for the actual
  mechanism.

**U2-M10a** — Correct: **A**.
- B: reads the manifesto as an elimination mandate rather than a
  tie-breaking preference, contradicting its closing sentence.
- C: over-extends "customer collaboration over contract negotiation" into an
  absolute prohibition on contracts.
- D: inverts the manifesto's actual preference ordering.

**U2-M10b** — Correct: **A**.
- B: denies the note's explicit framing of Agile as a property of IID rather
  than an independent model.
- C: introduces an unrelated, more granular taxonomy (Scrum/Kanban) not
  discussed in the note.
- D: accepts the flawed premise that Agile belongs in a list of standalone
  lifecycle models, just relocating it within that flawed list.

**U2-M11a** — Correct: **A**.
- B: conflates fault and failure — the classic terminology error the note is
  built to prevent.
- C: misattributes the fault to the triggering input/user action rather than
  the code flaw that should have handled it.
- D: denies any fault exists on the grounds that prior tests passed, missing
  that an unexecuted-path fault is still a fault.

**U2-M11b** — Correct: **A**.
- B: looks for a code-level bug when the note's AI touchpoint specifically
  locates this fault type in training data, not inference logic.
- C: denies any fault exists because the system runs without exceptions,
  missing that a failure can exist with no code-level fault.
- D: misattributes the fault to infrastructure, an unrelated component.

**U2-M12a** — Correct: **A**.
- B/C/D: all reapply the classical, temporal (before/after delivery) boundary
  that the 1995 redefinition explicitly replaced with a cause-based one.

**U2-M12b** — Correct: **A**.
- B: assumes a commercial support-plan term must exactly track the engineering
  definition's full scope, which the note does not require.
- C: denies the 1995 redefinition occurred at all.
- D: treats a vendor's business terminology choice as if it were an
  engineering-definition violation.

**U2-M13a** — Correct: **A**.
- B: labels it corrective without any actual fault/defect report behind it.
- C: labels it perfective, missing that the change was imposed by an external
  regulator, not chosen freely by the vendor.
- D: invents a nonexistent fourth category.

**U2-M13b** — Correct: **A**.
- B: uses "no defect report" as sufficient for "adaptive," when it only rules
  out corrective — the actual perfective/adaptive test is want-vs-forced.
- C: assumes any involvement of an external system automatically makes a
  change adaptive, ignoring that the refresh-rate change was purely
  self-motivated.
- D: reverses the correct classification of the two changes.

**U2-M14a** — Correct: **A**.
- B: inverts the code's actual ordering, which places PUBLIC first and
  unqualified.
- C: assumes professional/technical excellence automatically satisfies a
  separate ethical criterion (public interest) without argument.
- D: substitutes an unrelated principle (MANAGEMENT) for the one actually
  listed first.

**U2-M14b** — Correct: **A**.
- B: misidentifies raising the concern (the correct first step) as itself the
  violation.
- C: proposes an extreme unauthorized action not supported by the principles,
  which call for judgment and escalation, not unilateral override.
- D: jumps to an extreme external-reporting action without the intermediate
  documentation/escalation steps the principles actually call for.

**U2-M15a** — Correct: **A**.
- B: mislabels new-capability delivery as "iterative" rather than
  "incremental."
- C: denies incrementation is occurring despite clearly new capabilities being
  added each sprint.
- D: assumes the two properties are inseparable, contradicting the note's
  explicit statement that they are two different properties.

**U2-M15b** — Correct: **A**.
- B: mistakes heavy iteration alone for "healthy IID," ignoring that IID's
  value depends on incrementation (working versions reaching users) too.
- C: mistakes the existence of a new model artifact for a shipped increment,
  when nothing has been deployed to users.
- D: denies the iteration is real despite genuine week-over-week refinement
  occurring.

**U2-M16a** — Correct: **A**.
- B: treats a structural impossibility (can't implement without current
  design docs) as a mere efficiency trade-off.
- C: substitutes an unrelated staffing concern (who writes docs) for the
  structural timing argument.
- D: proposes an equally wrong single-position placement instead of
  recognizing documentation must be continuous.

**U2-M16b** — Correct: **A**.
- B: denies verification and validation are distinct activities, when the note
  treats them as catching different fault classes at different points.
- C: treats the problem as merely an ordering issue, missing that the core
  problem is both being deferred to one late point.
- D: swaps who performs each activity, an unrelated and incorrect claim.

### Written

**U2-W01**
**Must contain:** Mistake = the developer not considering that a stationary
(speed = 0) vehicle is a legitimate real-world state the calculation must
handle. Fault = the missing check/branch for `speedKmh == 0` sitting in the
code as written. Failure = the observable wrong behavior when executed with
speed = 0 — e.g., a division-by-zero exception crashing the ETA calculation,
or (if the language doesn't throw) an Infinity/NaN value silently propagating
into a downstream UI showing "ETA: Infinity minutes" or a scheduling algorithm
that mis-sorts deliveries. The three terms must stay distinct, and the failure
must be described more specifically than "it crashes."
**Trap:** Conflating fault and failure (calling the crash itself "the fault"),
the classic terminology error the note is built to prevent.
**Grading:** −5 to −10 for conflating fault and failure. +15–20 requires all
three terms kept distinct with a concrete failure description.

**U2-W02**
**Must contain:** The objection is justified — the handbook's rule is a
temporal (before/after a milestone) definition, exactly the classical model
the 1995 redefinition replaced; it would incorrectly exclude a pre-signup bug
fix or adaptive change from counting as maintenance. To align with ISO/IEC
1995, the handbook would need to define maintenance by cause (any modification
made because of a problem or a need for improvement/adaptation), applicable at
any time, not by a before/after boundary tied to the first customer.
**Trap:** Accepting the handbook's before/after milestone framing as
reasonable because it superficially resembles "postdelivery," missing that the
1995 definition is explicitly cause-based, not time-based.
**Grading:** −5 to −10 for endorsing the handbook's temporal rule as correct
under the 1995 definition. +15–20 requires stating the cause-vs-time
distinction explicitly and giving the corrected definition.

**U2-W03**
**Must contain:** Change (1) = adaptive (the browser's deprecation is an
environment change the product operates in; nothing was broken; the company
didn't choose this for its own sake). Change (2) = perfective (the team wanted
it better; nothing external forced it; matches the note's own "improves
performance" example). Must state why the pair is commonly confused: both are
proactive, non-corrective changes with no defect report behind either, so "no
defect report" cannot be the discriminator — the actual test is "did we choose
this, or was it imposed by the world."
**Trap:** Using "no defect report" as the sole test and concluding both are
the same category (either both adaptive or both perfective).
**Grading:** −5 to −10 for classifying both changes the same way using the
defect-report test alone. +15–20 requires the explicit want-vs-forced
discriminator and correct opposite classification for the two changes.

**U2-W04**
**Must contain:** Two concrete actions: (1) get the concern turned into an
actionable, written record with an owner and a decision (e.g., a ticket, a
documented risk assessment, an explicit go/no-go decision) rather than an
ephemeral chat reaction; (2) escalate or re-raise through a more formal
channel (compliance, a second reviewer, or a documented objection) if it
remains unaddressed, since Principle 1 (PUBLIC) is not subordinate to
client/employer interests and age-discriminatory impact is a public-interest
issue. Must explain why a thumbs-up fails Principle 4: independence of
professional judgment requires an actual decision and reasoning to rely on,
not an ambiguous, non-committal reaction that could mean anything from "I'll
look into it" to "acknowledged, ignore it."
**Trap:** Treating any acknowledgment (however informal) as sufficient closure
of an ethical concern, or giving vague "she should have spoken up more" advice
without concrete, actionable steps.
**Grading:** +15–20 requires correctly cited principles (1, 4, 7) tied to
concrete actions plus the explicit critique of the thumbs-up as not a real
decision. 0–3 for generic "be braver" answers with no principle grounding.

**U2-W05**
**Must contain:** Iterative = the same overall feature/thing gets closer to
its target across passes — e.g., the step-counting algorithm is refined sprint
over sprint (better accuracy, fewer false steps from arm movement), still "the
step counter" throughout. Incremental = new pieces are added, most important
first — e.g., step counting (sprint 1) → sleep tracking (sprint 2) → social
challenges (sprint 3) → workout plans (sprint 4) → integrations with other
apps (sprint 5), each a functionally new capability. Must use a genuinely new
example (fitness app, not Unified Process or email client) with both
properties illustrated separately, not collapsed into one description.
**Trap:** Using the note's own Unified Process example or another
already-seen example (paraphrase trap), or conflating the two properties into
one undifferentiated description.
**Grading:** +15–20 requires a genuinely new example with both properties
clearly and separately illustrated. Mark down to 4–9 if the two properties
collapse into one undifferentiated description.

**U2-W06**
**Must contain:** Requirements/analysis-class faults (e.g., a misunderstood
payroll rule, a missing tax-jurisdiction case) are the ones most likely to
survive, because unit testing verifies that code matches its own low-level
spec/design — it cannot detect that the spec itself was built on a wrong
understanding of client needs. Validation (checking the product against the
client's real needs) is the only activity that would catch this, and here it's
deferred to one late session, at the point cost-of-correcting-faults is
highest. Should connect this to the statistic that 60–70% of faults in large
products are requirements/analysis/design faults, and explain the mechanism
(unit tests check "did we build the thing right," not "did we build the right
thing").
**Trap:** Assuming continuous unit testing is sufficient testing coverage on
its own, missing that it structurally cannot catch validation-class faults
regardless of how thorough it is.
**Grading:** +15–20 requires explicitly naming why verification (via unit
tests) is structurally blind to validation-class faults, not just "they should
have tested more."

---

## Unit 3 — Requirements, Analysis & Design

### MCQ

**U3-M01** — Correct: **A**.
- B/C/D: each picks one of the three IEEE locations (document, person,
  contract/system) as the sole "true" requirement and discards the others,
  missing that the note treats all three as the same requirement at different
  points in its life, not competing claims to resolve.

**U3-M02** — Correct: **A**.
- B: treats early budget discussion as unconditionally good practice, ignoring
  the note's explicit ordering (strategies first, constraints after).
- C: swaps which constraint should have been asked about rather than
  addressing the ordering violation itself.
- D: introduces an unrelated blanket rule not found in the note.

**U3-M03** — Correct: **A**.
- B: over-applies "primary technique" as "always preferred," ignoring that
  interviews don't scale to hundreds of people.
- C: mismatches the technique to the goal — observation reveals behavior, not
  stated opinion.
- D: mismatches the technique to the goal — business forms reveal current
  process, not opinion.

**U3-M04** — Correct: **A**.
- B: substitutes a competence judgment for the actual mechanism (undefined
  terms look like agreement).
- C: invents a scope restriction on the requirements activity not supported by
  the note.
- D: overstates communication failure as the "only possible cause," when the
  note's point is that the term can go unnoticed even with full communication.

**U3-M05** — Correct: **A**.
- B: assumes transcription accuracy alone provides the precision analysis is
  specifically needed for.
- C: adds an unsupported condition (only useful if elicitation was poor) not
  in the note.
- D: substitutes interview quantity for the actual reason analysis is needed
  (the audience-imprecision chain).

**U3-M06** — Correct: **A**.
- B: mistakes brevity (Concise) for the property actually at stake
  (Precise/measurable).
- C: misapplies "Current," which concerns being up to date, not
  measurability.
- D: misapplies "Complete," which concerns missing topics, not vagueness
  within a covered topic.

**U3-M07** — Correct: **A**.
- B: accepts a premature "should we?" answer as sufficient, the exact error
  the note is built to flag.
- C: proposes applying constraints even earlier, compounding the actual
  error rather than fixing it.
- D: substitutes an unrelated critique (vendor consultation) for the actual
  missed step (the what/how/why chain).

**U3-M08** — Correct: **A**.
- B: overstates the note's actual position ("fewer models" is misread as
  "zero models").
- C: invents an unsupported restriction (architectural design is
  waterfall-only).
- D: accepts the flawed "fewer isn't zero" reasoning is irrelevant, then
  substitutes an unrelated MVP-specific claim.

**U3-M09** — Correct: **A**.
- B: misapplies the Time dimension, which concerns process stages, not
  quality attributes.
- C: misapplies the Views dimension, which concerns viewpoints like data/
  control flow, not quality attributes.
- D: denies the example fits any of the three named dimensions, when it
  clearly matches Qualities.

**U3-M10a** — Correct: **A**.
- B: accepts an internal component as a valid actor, contradicting the
  boundary-crossing definition.
- C: focuses only on the technical-language issue, missing the actor-boundary
  violation that is the primary defect.
- D: overstates the definition — actors can be other systems, not only
  humans.

**U3-M10b** — Correct: **A**.
- B: inverts the audience requirement — use cases are requirements artifacts,
  meant for client comprehensibility, not developer precision.
- C: narrows the problem to one undefined term, missing the broader
  register violation.
- D: misattributes use cases to the wrong activity; they belong to
  requirements, where this rule applies.

**U3-M11a** — Correct: **A**.
- B: swaps the classifications.
- C: collapses both into divide-and-conquer, missing abstraction's distinct
  vertical/logical character.
- D: collapses both into abstraction, missing divide-and-conquer's distinct
  horizontal/physical character.

**U3-M11b** — Correct: **A**.
- B: over-generalizes "hides internals" as sufficient for divide-and-conquer,
  when hiding is exactly abstraction's signature, not divide-and-conquer's.
- C: substitutes an unrelated organizational fact (different teams) for the
  actual physical/logical criterion.
- D: introduces an unsupported restriction (abstraction is software-only).

**U3-M12a** — Correct: **A**.
- B: assumes being called by other code automatically means high coupling,
  ignoring that coupling is about the nature/quantity of the relationship
  (well-defined calls vs. shared state), not its mere existence.
- C: mistakes "handles several formats" for "does several unrelated things,"
  when all three functions serve one cohesive purpose.
- D: invents an irrelevant criterion (line count).

**U3-M12b** — Correct: **A**.
- B: denies models are affected by upstream schema changes at all, contrary to
  the note's central AI touchpoint claim.
- C: misclassifies a between-module (upstream-to-model) issue as a
  within-module cohesion issue.
- D: denies any qualitative difference from ordinary API coupling, missing the
  "nothing to break against" mechanism that makes ML coupling distinctively
  silent.

**U3-M13a** — Correct: **A**.
- B: misidentifies composability as missing on the wrong grounds (testability,
  which the scenario states is intact).
- C: accepts passing tests as sufficient evidence of good design, the
  functional-equivalence-vs-design-equivalence error the note warns against.
- D: substitutes an unrelated cause (programming language) for the actual
  issue (lack of internal structure).

**U3-M13b** — Correct: **A**.
- B: treats file count alone as sufficient for modularity, ignoring
  duplicated logic and shared-global entanglement.
- C: assumes physical separation guarantees independence, contradicting the
  scenario's stated shared-global coupling.
- D: substitutes an arbitrary line-count threshold for the actual
  functionality-overlap criterion.

**U3-M14a** — Correct: **A**.
- B: misclassifies a never-elicited topic as client-learned-by-seeing, a
  different row with a different (no-fault) verdict.
- C: misclassifies a missed-elicitation gap as world-changed, missing that
  this was preventable.
- D: misclassifies a genuine scope gap as disguised scope creep, a different
  row again.

**U3-M14b** — Correct: **A**.
- B: assumes all late changes trace to poor elicitation, ignoring that
  cause 1 changes are not process failures at all.
- C: denies any behavioral effect on the team/process dynamic the policy is
  explicitly designed to create.
- D: assumes penalizing teams somehow disciplines client behavior, an
  unsupported causal leap.

**U3-M15a** — Correct: **A**.
- B: overstates diagrams' rigor without formal semantics behind them.
- C: repeats the "testing proves absence" error the note explicitly rejects —
  testing can only demonstrate presence.
- D: assumes ambiguity is the only obstacle, ignoring that even a perfectly
  unambiguous informal sentence still can't be proven, only tested.

**U3-M15b** — Correct: **A**.
- B: reduces the requirement to a single accuracy number, the exact anti-
  pattern the note warns against ("not '95% accurate'").
- C: denies the three-part structure's applicability based on an unsupported
  safety-criticality restriction.
- D: omits the fallback requirement, assuming low error rates alone are
  sufficient.

**U3-M16a** — Correct: **A**.
- B: collapses the functional/nonfunctional distinction by treating any
  system behavior as automatically functional.
- C: swaps the two classifications.
- D: collapses both into nonfunctional by treating any numeric constraint as
  disqualifying from functional, ignoring that the first item specifies an
  action (cancel), not a property.

**U3-M16b** — Correct: **A**.
- B: conflates well-formedness with traceability, treating a traceability
  failure as if it also invalidated well-formedness.
- C: accepts any well-formed requirement as belonging in the SRS regardless of
  traceability to the stated need.
- D: misapplies "well-formed," incorrectly asserting design decisions can
  never be phrased as requirements.

### Written

**U3-W01**
**Must contain:** (1) = divide-and-conquer (horizontal, brick — independent
same-level subproblems: inventory, payment, shipping each solved separately).
(2) = abstraction (vertical, iceberg — one thing, "delivery estimate," shown
at a simplified level while the underlying calculation is hidden below).
Distinguishing word: physical (divide-and-conquer, splitting into separate
parts) vs. logical (abstraction, hiding irrelevant detail of one thing).
**Trap:** Swapping the two, or explaining both with generic "breaking into
pieces" language without the physical/logical distinction.
**Grading:** −5 to −10 for swapping the classifications. +15–20 requires the
explicit physical/logical word and correct brick/iceberg imagery for each.

**U3-W02**
**Must contain:** Cohesion likely reasonable-to-good (email/password/
notification-prefs are plausibly related aspects of "account settings," a
within-module judgment). Coupling likely bad (six unrelated modules sharing
direct read/write access to `AppConfig` is exactly the excessive
between-module relationship the rule warns against). Must explain they move
independently because cohesion measures within-module relationships and
coupling measures between-module relationships — different axes, so one can be
high while the other is low.
**Trap:** Giving one combined "good/bad" verdict for the module instead of
separate cohesion and coupling judgments.
**Grading:** 0–3 for a single undifferentiated verdict. +15–20 requires
separate judgments plus the explicit "measure different things, move
independently" statement.

**U3-W03**
**Must contain:** Refute — functional correctness (passing tests today) is not
the same claim as design quality (the note's "functionally equivalent but not
design-equivalent" argument, from the incompetent-architect example); the
three-enormous-files structure will make understanding (localization — finding
what to change) and decomposability (dividing work / isolating changes)
acutely difficult the moment any extension or bug-fix is needed, which the
tech lead's own stated trigger ("if we ever need to extend this") makes
near-certain to occur. Should name at least one property (decomposability or
understanding) as most immediately at risk, with justification tied to the
single-giant-file structure.
**Trap:** Accepting "we pass tests, so it's fine for now" as a legitimate
reason to defer modularity, missing that the cost of the current structure
activates exactly when the stated future trigger occurs — i.e., it's not
actually deferred, just delayed and compounding.
**Grading:** −5 to −10 for endorsing the "worry about it later" plan as sound
engineering judgment. +15–20 requires explicit functional-equivalence-vs-
design-equivalence framing plus a correctly justified property.

**U3-W04**
**Must contain:** (a) = world changed (regulation) → unpreventable, design to
absorb it, no blame. (b) = client learns by seeing → not a problem, IID
working as designed, accept/prioritize normally. (c) = new stakeholder appears
with a veto → preventable process failure (a missed stakeholder during
requirements), root-cause why this VP wasn't included, distinct from
implementing the feature now. Each of the three needs a different response,
not one generic answer.
**Trap:** Giving the same response ("just build it" or "this is scope creep")
to all three, missing that the table's entire point is differentiated
verdicts per cause.
**Grading:** 0–3 for one undifferentiated response applied to all three.
+15–20 requires three distinct, correctly-matched cause/response pairs.

**U3-W05**
**Must contain:** Informal sentence can only be tested — a test suite finding
no violating case demonstrates the fault's absence was not observed, not that
it cannot occur; natural language is also ambiguous ("payment confirmed" could
admit edge cases like a reversed transaction). FSM can prove absence across
the full defined state space (the one technique in the course that can). All
five FSM components sketched conceptually: states (e.g., Idle,
PaymentPending, PaymentConfirmed, Dispensing, Error/Refund), inputs (coin
inserted, card tapped, payment-confirmed signal, item-select button,
dispense-sensor signal), transition function (mapping state+input to next
state), initial state (Idle), final states (e.g., Dispensing-complete /
Refunded).
**Trap:** Treating the FSM as "just a more detailed way of writing
requirements" rather than recognizing its qualitatively different proof power
(absence vs. presence), or listing fewer than five components.
**Grading:** +15–20 requires explicit "prove absence vs. demonstrate presence"
framing plus a genuinely structured five-part FSM sketch.

**U3-W06**
**Must contain:** Report generation = functional (an action). Availability
target = nonfunctional (a property/constraint, not an action itself).
Dimension stated explicitly: functional answers "what," nonfunctional answers
"how well/under what constraint." Second part: many nonfunctional requirements
(programming language, reuse issues, portability) are finalized during the
design activity, not requirements, because they concern how the solution will
be built rather than what the client needs — the requirements activity is
deliberately solution-agnostic on those points.
**Trap:** Classifying availability as functional because "keeping the system
running is something it does," or omitting the design-activity timing point
for the second part.
**Grading:** −5 to −10 for classifying availability as functional. +15–20
requires the explicit action-vs-property dimension plus the correct
design-activity timing explanation.

---

## Unit 4 — Implementation, Testing & Integration

### MCQ

**U4-M01** — Correct: **A**.
- B: invents unrelated criticisms (function length, missing return) not part
  of the note's five practices.
- C: invents unrelated criticisms (type choice, parameter count) not part of
  the note's five practices.
- D: prescribes blanket WHAT-style commenting and an unrelated paradigm
  requirement, neither of which the note endorses.

**U4-M02** — Correct: **A**.
- B: misreads the rule as applying only to if-if, when the depth-of-three
  guideline concerns nesting generally.
- C: invents an unstated exemption for "legitimate business logic."
- D: misreads the rule as being about condition count rather than nesting
  depth.

**U4-M03** — Correct: **A**.
- B: reverses the stub/driver direction.
- C: omits the needed driver, assuming only the unwritten dependency requires
  scaffolding.
- D: assumes an already-existing caller eliminates the need for isolated unit
  testing, missing the point of testing NotificationService alone.

**U4-M04** — Correct: **A**.
- B: assumes two independently-passing halves guarantee a correctly
  integrated whole, ignoring the interface between them.
- C: proposes a redundant, unnecessary step rather than identifying the
  actual missing one.
- D: invents an unsupported restriction on sandwich integration's use of
  stubs/drivers.

**U4-M05** — Correct: **A**.
- B: overgeneralizes inspections as universally superior regardless of the
  stated goal (quick, low-formality feedback).
- C: incorrectly claims non-execution-based testing requires code to exist.
- D: directly contradicts the note's explicit "never for performance
  appraisal" rule.

**U4-M06a** — Correct: **A**.
- B: over-applies "delete WHAT comments" to the WHY comment as well, losing
  irreplaceable information.
- C: over-applies "keep useful comments" to the WHAT comment, missing that it
  is pure noise.
- D: swaps the classification of the two comments.

**U4-M06b** — Correct: **A**.
- B: treats rarity of self-documenting code as license to stop trying,
  contradicting the note's explicit "never promote or excuse poor
  programming."
- C: treats WHAT and WHY comments as equally acceptable, erasing the note's
  central distinction.
- D: substitutes an unrelated remedy (more code review) for the actual
  resolution given in the note.

**U4-M07a** — Correct: **A**.
- B: denies the mechanism the note explicitly names as counter-intuitive but
  real.
- C: substitutes an unrelated, unsupported generalization (more modules =
  more bugs) for the actual defensive-programming mechanism.
- D: mischaracterizes defensive programming itself as a flaw, when the note
  treats it as a normal practice with this specific side effect.

**U4-M07b** — Correct: **A**.
- B: denies the fault-isolation guarantee entirely, missing the note's central
  claim about top-down's precision.
- C: locates the fault in the wrong module (the symptom's location) rather
  than the newly-integrated cause.
- D: inverts the logic — a newly-integrated module is exactly where the fault
  is expected to be.

**U4-M08a** — Correct: **A**.
- B: correctly describes bottom-up's weakness but misapplies it as the answer
  to a question about an advantage being demonstrated.
- C: denies bottom-up uses drivers, confusing it with top-down's stub usage.
- D: treats fault isolation as bottom-up-exclusive, contradicting the note's
  "shared by both" statement.

**U4-M08b** — Correct: **A**.
- B: misattributes a design-level mismatch to a testing-thoroughness issue at
  the unit level.
- C: denies bottom-up's named weakness exists at all, contradicting the note.
- D: incorrectly claims top-down would produce the identical failure at the
  identical point, ignoring that top-down surfaces design faults early.

**U4-M09a** — Correct: **A**.
- B: reverses the alias pairing.
- C: collapses both into one category (testing to specifications), missing
  that the second tester works from code, not specs.
- D: collapses both into the other category (testing to code), missing that
  the first tester works from specs, not code.

**U4-M09b** — Correct: **A**.
- B: overstates branch coverage as guaranteeing real-world scenario coverage,
  contradicting the note's explicit "not reliable" conclusion.
- C: substitutes a different coverage metric that doesn't resolve the
  fundamental path-must-be-present limitation.
- D: misattributes the limitation to tooling reliability rather than the
  conceptual limit the note describes.

### Written

**U4-W01**
**Must contain:** `computeReorderQuantity` will never be exercised with
`stock < 0` during integration, because every real caller defensively guards
the call with `if (stock >= 0)` before invoking it — top-down integration
tests the function only through these guarded real callers (not through a
driver supplying arbitrary/adversarial inputs), so the negative-stock error
path is never executed. Because the function is reused by many callers, a
future caller that omits the guard (or a data-corruption case that produces
negative stock) will hit an untested path in a widely-depended-on function,
multiplying the blast radius rather than limiting it.
**Trap:** Assuming that because callers currently guard correctly, the
function's untested branch is safe — missing that reuse means the guarantee
depends on every future caller replicating the guard correctly, which is
exactly the risk defensive programming masks.
**Grading:** −5 to −10 for concluding good design/wide reuse reduces this
risk. +15–20 requires the explicit defensive-guarding mechanism plus the
reuse-compounds-the-risk argument.

**U4-W02**
**Must contain:** Top-down: operational artifacts (e.g., a low-level
baggage-weight-validation function) are reached last, through
defensively-programmed real callers (e.g., a caller that pre-filters invalid
weights before calling), so error paths are frequently never exercised.
Bottom-up: the same operational artifact is tested first and thoroughly, via
a driver that can supply arbitrary/adversarial inputs (including invalid
weights a defensive caller would have filtered), directly exercising error
paths. Must explain fault isolation cannot discriminate: both strategies
provide the same "last thing added, fault localized there" guarantee at every
integration step, by virtue of doing integration in any deliberate
incremental order — the real discriminators are what gets tested well
(operational artifacts, favoring bottom-up) and when design faults surface
(early under top-down, late under bottom-up).
**Trap:** Listing fault isolation as an advantage that favors one strategy
over the other.
**Grading:** −5 to −10 for treating fault isolation as a discriminator
between the two strategies. +15–20 requires explicit statement that fault
isolation is shared by virtue of incremental integration itself, with the
real discriminators named.

**U4-W03**
**Must contain:** Refute — unit testing breaks as a correctness argument for
models because there is no expected output for a single input in the
traditional pass/fail sense; correctness is a property over a population, not
a fixed input-output mapping verified case by case. Twenty hand-picked cases
at 90% says very little about how the model performs across subgroups (e.g.,
customers with short tenure, or a specific plan type) — overall accuracy can
hide a subgroup where it fails badly. She should have evaluated on
slices — not "does it work?" but "for whom does it work?" — checking
performance broken out by relevant subpopulations, not just an aggregate pass
rate on a small hand-picked set.
**Trap:** Treating a high aggregate pass rate on hand-picked cases as strong
evidence, or recommending "just run more test cases" rather than the
qualitatively different slice-based evaluation.
**Grading:** −5 to −10 for endorsing the sign-off as adequate. +15–20 requires
the explicit "population, not case" framing and the "for whom does it work"
slice-based replacement named.

---

## Unit 5 — Maintenance & Engineering AI-Enabled Software

### MCQ

**U5-M01** — Correct: **A**.
- B: denies any timing dependency, contradicting the note's explicit claim
  that maintainability is decided at design/implementation time.
- C: inverts the bootstrapping problem — the note argues the opposite,
  that unmaintainable code obscures rather than clarifies its own structure.
- D: substitutes an unrelated staffing claim (who writes docs) for the actual
  timing argument.

**U5-M02a** — Correct: **A**.
- B: ignores the defect-report file's stated purpose (avoiding redundant
  re-diagnosis of known issues).
- C: contradicts the note's instruction to give the user the file's
  information, treating a known issue as requiring no user-facing response.
- D: overstates the note's "ideally fixed immediately" aspiration into an
  absolute rule, ignoring its explicit "in practice, an immediate preliminary
  investigation is the best we can do."

**U5-M02b** — Correct: **A**.
- B: denies any structural difference, missing the note's explicit "no
  reproducible case" framing.
- C: misattributes the difference to reporting channel rather than to the
  nature of the complaint itself.
- D: misattributes the difference to who made the decision rather than to the
  lack of a reproducible case.

**U5-M03a** — Correct: **A**.
- B: imports the "running long enough causes decay" misconception the software
  deterioration note explicitly rejects, and drift note reinforces as an
  exception.
- C: assumes a code-level cause despite the scenario stating no code changed.
- D: misreads "zero complaints" as evidence against the problem, when it is
  exactly the note's point that drift produces no complaints regardless of
  severity.

**U5-M03b** — Correct: **A**.
- B: treats the two cases as requiring identical processes, missing the
  detection-mechanism difference (human-initiated vs. silent).
- C: denies drift is a form of environment-triggered maintenance at all,
  overcorrecting past the genuine shared root the colleague identified.
- D: narrows the comparison's validity to this specific highway example,
  missing that the detection-mechanism distinction generalizes to any
  environmental change.

**U5-M04a** — Correct: **A**.
- B: denies unit testing is affected at all, contradicting the note's
  explicit "breaks" classification.
- C: minimizes a fundamental conceptual break into a minor timeout
  adjustment.
- D: invents an unsupported safety-criticality carve-out not in the note.

**U5-M04b** — Correct: **A**.
- B: agrees with the classmate's one-sided reading, the exact wrong-lesson the
  note explicitly warns against.
- C: treats a minority of broken practices as proof of majority obsolescence,
  an unsupported inference.
- D: misclassifies requirements as "holds unchanged" when the note places it
  in "strained/reframed."

### Written

**U5-W01**
**Must contain:** The defect-report pipeline requires a user to notice a
symptom, attribute it to something specific, and file a report describing
it — but no customer can know their recommendations "should" have been
better (they only see their own feed, not a baseline), so there's no
observable, attributable symptom to report; there's also no code change to
serve as a natural investigation trigger. For it to be caught early, the
company would need monitoring designed in from the start — tracking model
performance metrics directly (not waiting for downstream business symptoms
like unsubscribes) and expecting decay as the default assumption, rather than
"ship it and fix bugs when reported."
**Trap:** Suggesting better customer feedback forms or more attentive support
staff as the fix, rather than recognizing that no user-initiated report is
structurally possible here regardless of how attentive anyone is.
**Grading:** +15–20 requires explicitly stating why a user cannot
notice/report this (no observable, attributable symptom), plus the
built-in-monitoring requirement, not just "users won't report it."

**U5-W02**
**Must contain:** (a) holds unchanged — ordinary software, unaffected by the
model. (b) strained/reframed — this is exactly the replacement practice the
note names: specification precision breaks (the spec becomes extensional, via
training data), and the reviewable artifact shifts to the labelling
instruction since nobody can review the rows themselves; reviews/inspections
themselves hold unchanged and become the best tool. (c) strained/reframed —
integration order becomes pipeline order, and the new hazard is
training/serving computing features differently, where divergence causes
silent quality degradation with no exception. (d) breaks — "the decision felt
wrong" is a failure report with no reproducible case; the defect-report
template has no field for it, since there's no specific input/output pair or
code path to recreate.
**Trap:** Classifying all four the same way (e.g., calling everything
"AI-affected" or everything "unchanged"), or getting classifications right but
omitting the specific replacement/reframing mechanism for each.
**Grading:** +15–20 requires all four correctly classified AND the specific
replacement/reframing mechanism named for each non-unchanged item. +10–14 for
correct classifications with a vague or missing mechanism for one or more.

---
