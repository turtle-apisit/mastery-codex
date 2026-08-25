# Exam 02 — Modern Software Engineering Principles (80 MCQ + 20 Written Revision Exam)

**Total estimated time: 427 minutes (≈ 7 hours 7 minutes)**, across 100 items
(80 multiple-choice + 20 written) covering all 54 concept notes. Sized as a
full-subject item bank for closed-book revision, not a single sitting — split
across sessions as needed. This is a **second, different exam** from
`exam-01-questions.md` — do not use it as an answer source for exam-01 or vice
versa.

Per-unit breakdown:

| Unit | MCQ | Written | Total items | Minutes |
|---|---|---|---|---|
| 1. Foundations & Process | 14 | 3 | 17 | 59.5 |
| 2. Life-Cycle Models | 23 | 6 | 29 | 122.5 |
| 3. Requirements, Analysis & Design | 23 | 6 | 29 | 125.5 |
| 4. Implementation, Testing & Integration | 13 | 3 | 16 | 74.5 |
| 5. Maintenance & Engineering AI-Enabled Software | 7 | 2 | 9 | 45 |
| **Total** | **80** | **20** | **100** | **427** |

**Coverage design:** every one of the 54 notes gets at least one MCQ item.
The ~20 notes with the richest/hardest "Watch out for" confusions each get one
additional deep-probe written item, plus one extra MCQ probing a different
angle of the same confusion; 6 further high-confusion notes get a second MCQ
without a written item. This yields 54 baseline MCQ + 26 concentrated MCQ = 80,
and 20 written items, weighted toward the notes most likely to have been
half-learned.

Rules: closed-book, no retries. Answer each item on its own — do not look ahead to
other items for hints. MCQ items have exactly one correct option; every wrong
option represents a real misconception, not a silly filler. No answers appear in
this file; see `exam-02-answer-key.md` (grader use only).

---

## Unit 1 — Foundations & Process

### MCQ

**U1-M01 (2 min)** — Source: `goals-of-software-development.md`

A manager slips a sprint's scope by adding three new features mid-cycle, while
holding the deadline and the budget exactly fixed, and tells the team: "Just be
careful and quality will hold." Using the Project Management Triangle, evaluate
this instruction.

A) Quality will predictably suffer, because Scope increased while Cost and Time
held fixed — quality is the passive variable that absorbs the squeeze, not
something "carefulness" can shield on its own.
B) Quality is a fourth corner equal to Scope, Cost, and Time, so the manager can
simply instruct the team to hold the line on it independently of what happens to
the other three.
C) Since Cost wasn't increased, no corner actually moved, so quality is safe by
definition.
D) The triangle only predicts problems when Time is compressed; since the
deadline didn't move, quality is unaffected regardless of scope changes.

**U1-M02 (2 min)** — Source: `software-complexity-and-intangibility.md`

A CTO wants to reduce both the complexity and the intangibility of a monitoring
platform in one move, and proposes: "Let's draw one comprehensive UML diagram of
the entire system so everyone can see it all at once." Evaluate this proposal.

A) The diagram may help with intangibility (easier to visualize) but does nothing
to reduce complexity itself — complexity (many different, connected parts) must
be managed, not eliminated, and drawing it doesn't remove any parts or
connections.
B) A single comprehensive diagram eliminates complexity by making every
connection explicit and visible.
C) Since intangibility and complexity are the same underlying property, fixing
one automatically fixes the other.
D) Complexity only matters for testing and estimation, not for diagrams, so the
diagram is irrelevant to either problem.

**U1-M03 (1 min)** — Source: `software-process.md`

A team lead writes on a sprint board: "Fix login page CSS alignment bug." Using
the Activity / Action / Task hierarchy, how should this be classified?

A) Task — small and well-defined, with a single narrow objective, not a broad
objective or a major work product.
B) Action — because it produces a work product (the fixed CSS file), and any
output at all counts as a major work product.
C) Activity — because "fix" implies an ongoing broad effort toward correctness
across the whole product.
D) It cannot be classified without knowing how long it will take, since the
hierarchy is based on effort, not scope.

**U1-M04 (2 min)** — Source: `stakeholders.md`

A ride-sharing company builds an internal system that automatically deprioritizes
driver applicants whose background-check turnaround is slow, to speed up
onboarding of others. Which stakeholder is most likely to be left out of
requirements discussions, per the note's AI-enabled addition?

A) The deprioritized applicant — the person the system decides about — because
they never participate in requirements conversations; their stake only appears
as a side effect of the system's decisions.
B) The end-user (onboarding staff), since they are the ones directly operating
the system and are rarely consulted.
C) The customer who pays for the system, since paying customers are rarely in
the room during requirements either.
D) The System Verifiers, since QA is typically added late in the project.

**U1-M05a (1.5 min)** — Source: `wants-and-needs.md`

A client tells the team, "We want a mobile app with push notifications." The
analyst replies, "Got it — I'll write that up as the requirement and we'll start
the mobile app project." What is the strongest criticism of the analyst's reply?

A) The analyst treated a want (a feature naming a specific solution) as if it
were already a need (the underlying business reason) — some other mechanism
might serve the client's actual goal better than a mobile app with push
notifications.
B) The analyst should have asked for a signed contract before proceeding, since
wants are not legally binding.
C) The analyst was right to proceed immediately, since "mobile app with push
notifications" is already specific enough to count as a fully elicited need.
D) The criticism is that push notifications is a nonfunctional requirement being
misclassified as functional.

**U1-M05b (1.5 min)** — Source: `wants-and-needs.md`

A requirements document states: "The system shall let managers approve expense
reports." It says nothing about who can see rejected reports, because everyone on
the team simply assumed "obviously only the manager and the submitter." Using the
implicit/explicit distinction, what is the risk here?

A) The visibility rule is an implicit assumption (not directly expressed), so it
is invisible to anyone outside the room who didn't share it — a new team member
or auditor has no documentation to correct a different interpretation.
B) There is no risk, because implicit assumptions are automatically carried
forward correctly as long as the original team stays on the project.
C) The risk is that expense approval is a want, not a need, so it may not
reflect the real business reason.
D) This is purely a documentation-formatting issue with no bearing on what gets
built, since developers will "just know" the sensible default.

**U1-M06a (2 min)** — Source: `software-process-activities.md`

A junior developer says: "Deployment must be one of the 'Modeling' activities,
since you have to model how the release will roll out before deploying."
Evaluate.

A) Wrong — Deployment is its own separate one of the five generic activities;
Modeling specifically bundles analysis of requirements and design, not release
rollout planning.
B) Correct — release rollout planning is a form of design, so it belongs inside
Modeling.
C) Correct — Deployment doesn't exist as a named activity at all; it's folded
into Construction alongside coding and testing.
D) It depends on the lifecycle model — in agile, Deployment is a phase, but in
waterfall it is part of Modeling.

**U1-M06b (2 min)** — Source: `software-process-activities.md`

In an agile team with no formal "business analyst" title, a senior developer
regularly translates the product owner's vision into detailed acceptance
criteria the rest of the team can build from. Using the building-analogy
framing, what role is this developer filling?

A) The architect role — bridging the buyer's (product owner's) vision, held at a
different level of abstraction, into the detail the constructors (developers)
need; the role is structural and doesn't disappear just because nobody carries
that job title.
B) The constructor role, since they are still a developer writing code.
C) No equivalent role — agile teams talk to the client directly and therefore
don't need an architect-type bridge.
D) The buyer role, since they are closest to the product owner.

**U1-M07a (1.5 min)** — Source: `software-deterioration.md`

A legacy inventory-tracking script has run unmodified for six years on the same
server, OS, and hardware. A new engineer assumes it "must be less reliable by
now, just from age." Evaluate this assumption.

A) Mistaken — deterioration is caused by modification, not time or use; with
zero change events, the failure rate should remain flat, unlike hardware's
bathtub-curve wear.
B) Correct — all software, like hardware, degrades under the bathtub curve as it
ages.
C) Correct, but only because six years is long enough for the underlying
hardware components to fail, which counts as software deterioration too.
D) Irrelevant — unmodified scripts are automatically excluded from the software
life-cycle.

**U1-M07b (2 min)** — Source: `software-deterioration.md`

A team observes that after each of their last five patches, the bug count
doesn't return to its pre-patch baseline — it settles a bit higher each time,
producing a rising staircase over a year of releases. Which best explains this?

A) This matches the actual (not idealized) deterioration curve — each
modification introduces side effects, so the failure rate steps upward with each
change event and never fully returns to its prior level.
B) This is data drift, since the failure rate is rising over time.
C) This shows the idealized curve in action, since bugs are being fixed with
each patch.
D) This is unexplained by the note — deterioration only refers to hardware.

**U1-M08a (2 min)** — Source: `umbrella-activities.md`

A team schedules "Software Quality Assurance" as a two-day block that happens
only right before each release. What is wrong with this, per the distinction
between umbrella activities and process activities?

A) SQA is an umbrella activity meant to run continuously across the entire
process — scheduling it as a single pre-release block treats it like a
sequential process activity, misapplying its structural role.
B) Nothing is wrong — SQA is inherently a late-stage activity since quality can
only be assessed once the product is nearly finished.
C) The only problem is that two days is too short a duration, not that it's
scheduled at one point.
D) SQA should instead be merged into the Construction process activity, since
testing already happens there.

**U1-M08b (2 min)** — Source: `umbrella-activities.md`

A company argues: "We don't need a dedicated reusability-management effort — we
already have a 'Component Design' step where reusable modules get identified."
What's the flaw, per how umbrella activities work?

A) Reusability management is meant to run continuously across the whole process,
not be confined to one step — collapsing it into Component Design reproduces the
"documentation phase" error of treating a continuous concern as a single
positional step.
B) There is no flaw — reusability is naturally a design-time concern, so folding
it into Component Design is the correct structural placement.
C) The flaw is that Component Design isn't one of the five process activities,
so it can't host any activity at all.
D) The flaw is that reusability management belongs in Deployment, not Design.

**U1-M09a (2 min)** — Source: `output-and-outcome.md`

A nonprofit builds and ships a volunteer-scheduling app on time and on budget
(the output). One year later, volunteer no-show rates are unchanged. Which
statement best applies the output/outcome distinction?

A) The output (a working, delivered app) was achieved, but the outcome (fewer
no-shows) was not — and because project reporting typically counts outputs, this
project could still be reported as "successful" despite achieving nothing of
what it was meant to change.
B) Since the outcome wasn't achieved, the output must have had a defect — a
working app should have produced the outcome automatically.
C) Outputs and outcomes are the same measurement here, just reported at
different times, so this is really one failure, not two.
D) The project failed at the output level, since delivering software that
doesn't change behavior isn't really "delivered."

**U1-M09b (2 min)** — Source: `output-and-outcome.md`

A CFO asks why the quarterly report only shows "features shipped" and "story
points completed," with no mention of whether customer retention improved. What
does the note suggest is the most likely reason?

A) Project reporting almost always measures outputs because they are countable,
while outcomes require someone to have explicitly defined and tracked them — the
report's silence on retention likely means the outcome was never defined as a
target.
B) Outcomes cannot be measured in principle, so no report could ever include
them.
C) The report is complete, since story points already capture the value
delivered to customers.
D) This is a wants-vs-needs problem, not an output-vs-outcome one.

### Written

**U1-W01 (12 min)** — Source: `software-deterioration.md`

A fintech company's fraud-scoring model has run in production for five months
with zero code deployments and zero retraining — the exact same weights, same
feature pipeline, same everything. Over that period, its false-negative rate
(missed fraud) has crept up by 30%. A junior engineer says, "This must be the
same deterioration process as our monolith's API gateway, which also gets less
reliable the longer it runs without a redeploy." Predict whether the fraud
model's degradation follows the same mechanism as the API gateway's, and explain
precisely why or why not, using the exact distinction the note draws.

**U1-W02 (12 min)** — Source: `umbrella-activities.md`

A project manager announces a new policy: "Risk management is basically just
planning wearing a different hat — we already do planning once at project
kickoff, so we'll fold 'risk review' into that same kickoff meeting and not
revisit it." Justify or refute this policy using the distinction between
umbrella activities and process activities.

**U1-W03 (10 min)** — Source: `output-and-outcome.md`

A university IT department spends a semester building and launching a new online
course-registration portal (the output). Two years later, average
time-to-register per student is unchanged, and complaints about registration
difficulty are the same as before the portal existed. A dean says, "That's
fine — the portal itself was delivered exactly to spec, on time, so this was a
successful project regardless of what happened to registration times." Justify
or refute the dean's claim using the output/outcome distinction, and explain why
measuring only delivery-to-spec would make this project look successful.

---

## Unit 2 — Life-Cycle Models

### MCQ

**U2-M01 (1.5 min)** — Source: `software-life-cycle.md`

A team is debating when their new expense-report web app's "software
life-cycle" began. One member says, "It began the day the app was deployed to
production, since before that it wasn't really software yet." Evaluate using
the note's definition.

A) Wrong — the life-cycle is defined as beginning when the product is
conceived, not when it is deployed; conception, design, and construction all
occur before delivery and are already part of the life-cycle.
B) Correct — a life-cycle only exists once a product is in active use.
C) Correct, but only because "production" specifically marks the boundary
between development and maintenance, which is where the life-cycle truly
starts.
D) The life-cycle actually begins at retirement planning, since that is when
the organization first commits to eventually decommissioning it.

**U2-M02 (2 min)** — Source: `waterfall-life-cycle-model.md`

A team's waterfall process allows returning to the Design phase if
Implementation reveals a design flaw, and they conclude: "Since we can loop
back, our process is both iterative and incremental." Evaluate.

A) Only half right — feedback loops make it iterative (you may return to an
earlier phase), but incremental requires successive working deliveries, and
this team still delivers the product once at the end; looping back on its own
does not establish incrementality.
B) Fully correct — any feedback loop automatically satisfies both properties.
C) Fully incorrect — feedback loops don't make waterfall iterative either,
since "iterative" requires an agile-labeled process.
D) The team is incremental but not iterative, since delivering once is
definitionally incremental.

**U2-M03 (1.5 min)** — Source: `cost-of-correcting-faults.md`

A team catches a wording ambiguity in the SRS the day after client sign-off,
before design work starts, and fixes it by editing the document. A separate
team catches an equally serious requirements ambiguity only after the product
has shipped, and must patch code, retest, and redistribute to all client sites.
Why does the second fix cost so much more, per the note?

A) The cost of detecting and correcting a fault rises steeply with the phase in
which it's found — early, it's usually just a document change; late, it
requires changing code and documentation, testing the change, regression
testing, and reinstalling at every site.
B) The second team's fault must have been more severe in nature, since minor
faults never require regression testing.
C) The cost difference is purely about team size — larger teams take longer to
fix anything, regardless of phase.
D) There is no real cost difference; the second team's overhead is bureaucratic
overhead unrelated to when the fault was found.

**U2-M04 (2 min)** — Source: `problems-with-the-waterfall-model.md`

A consultant tells a bank building a one-off, legally-fixed regulatory report
generator (format frozen by law, no future changes expected) that they must
abandon waterfall because "waterfall is fundamentally broken." Evaluate using
the note's own conditions for when waterfall is suitable.

A) Waterfall's problems stem from its two assumptions failing (fixed-in-advance
specification, no later changes) — this project's requirements genuinely are
fixed and unlikely to change, exactly the condition under which the note says
waterfall is suitable; "fundamentally broken" is an overreach.
B) Correct — the note states waterfall should never be used under any
circumstances today.
C) Correct, but only because banks are always high-risk, safety-critical
environments where waterfall is banned.
D) Waterfall is unsuitable here specifically because it lacks a testing phase,
unrelated to whether specifications are fixed.

**U2-M05 (2 min)** — Source: `rapid-prototyping-model.md`

A team builds a rapid prototype of a booking UI, gets client feedback, refines
it, discards the prototype, and builds the real system once from the refined
spec. A stakeholder claims: "Because a working prototype existed early, this
project was delivered incrementally." Evaluate.

A) Incorrect — rapid prototyping is still a linear model; the prototype is a
communication device attacking "validation only at the end," not a shipped
release, so one real product is still delivered once at the end.
B) Correct — any early working software counts as an increment regardless of
whether it's kept or shipped.
C) Correct, because the spiral model (which rapid prototyping feeds into) is
inherently incremental.
D) Incorrect, but only because the prototype wasn't shown to the client early
enough to count.

**U2-M06 (1.5 min)** — Source: `spiral-model.md`

A team building a small, low-risk internal reporting tool with a tight budget
insists on using the full spiral model "because it's the most rigorous option
available." Evaluate against the model's stated strengths/weaknesses.

A) Poor fit — the spiral model suits large-scale, complex software where
risk-handling value offsets its expense and complexity; for a small, low-risk,
tight-budget tool, the added cost isn't offset by any real risk to manage.
B) Good fit — the spiral model is always the best choice regardless of project
size, since more rigor is never wasted.
C) Good fit, because risk analysis is cheap and has no real cost implications.
D) Poor fit, but only because the spiral model is exclusively for AI-enabled
software.

**U2-M07 (1.5 min)** — Source: `code-and-fix-model.md`

An analyst writes an undesigned, unspecified script to answer one ad hoc
question from a dataset, gets the answer, and deletes the script the same day.
Was this a defensible use of code-and-fix?

A) Yes — it was a genuine 1-shot use with no maintenance stage entered;
code-and-fix is "the easiest way," and the "most expensive way" cost only
accrues once a maintenance phase begins, which never happened here.
B) No — code-and-fix is never defensible under any circumstances, since it
always produces a maintenance nightmare.
C) No — writing code without a design is itself the failure mode, regardless
of whether the code is kept afterward.
D) Yes, but only because the analyst was experienced enough to avoid mistakes.

**U2-M08 (2 min)** — Source: `millers-law-and-stepwise-refinement.md`

A designer, applying "postpone decisions as to details as late as possible,"
decides to leave the error-handling behavior of a checkout flow completely
unspecified indefinitely, with no plan to revisit it, reasoning "that's just
postponing details." Evaluate.

A) Misapplication — stepwise refinement postpones (reorders) work, it does not
drop it; every aspect must eventually be handled, just not first, so leaving
error handling permanently unspecified is skipping, not postponing.
B) Correct application — postponing indefinitely is exactly what "as late as
possible" means.
C) Correct application, since Miller's Law only limits the number of chunks
handled at once, not whether all chunks are eventually handled.
D) Misapplication, but only because error handling should have been handled
first, not last.

**U2-M09 (2 min)** — Source: `open-source-life-cycle-model.md`

A closed-source vendor's user reports "the app crashes when exporting large
files" but can say nothing more specific. Why can't this user produce more
detail, per the note?

A) Closed-source users can only submit failure reports because they lack
access to the source code — they can observe symptoms but cannot identify the
flaw or propose a fix, unlike open-source peripheral-group users who can read
the source.
B) The user simply isn't technical enough; any user, closed- or open-source,
could identify the exact flaw with enough effort.
C) This is a training gap on the vendor's part, unrelated to source
availability.
D) Closed-source software is inherently buggier, which is why reports are
vaguer.

**U2-M10a (1.5 min)** — Source: `agile-manifesto.md`

A team writes zero documentation and refuses to sign any contract with
clients, saying "the Manifesto values working software over documentation and
customer collaboration over contract negotiation, so both are worthless to
us." Evaluate against the manifesto's closing sentence.

A) Misreads the manifesto — the closing sentence explicitly states items on
the right (documentation, contracts) still have value; they simply lose when
they conflict with the item on the left, not that they should be discarded
entirely.
B) Correct reading — the manifesto explicitly instructs teams to eliminate
documentation and contracts.
C) Correct, since "customer collaboration over contract negotiation"
specifically forbids ever having a contract.
D) Misreads it, but only because working software should also be avoided in
favor of documentation.

**U2-M10b (1.5 min)** — Source: `agile-manifesto.md`

A student writes: "There are five major lifecycle models covered in this
course: waterfall, spiral, rapid prototyping, iterative-and-incremental, and
Agile." Evaluate this list against how the note frames Agile.

A) The list miscounts — Agile is presented as a property of IID (following
from iteration and incrementation), not a separate standalone lifecycle model
that stands beside IID.
B) The list is correct as given; Agile is fully independent of IID.
C) The list undercounts — Agile should be split into two separate models,
Scrum and Kanban.
D) The list is correct, but Agile should replace waterfall in the list rather
than being added to it.

**U2-M11a (1.5 min)** — Source: `fault-failure-and-defect-terminology.md`

Code contains `price = items[index].cost;` where `index` can go out of bounds
under a rare combination of cart-modification actions no tester anticipated.
In production this eventually throws an out-of-range exception for one
customer. Using the mistake→fault→failure chain, which best labels the fault?

A) The fault is the missing bounds check sitting in the code (a flaw in the
artifact); the mistake was the developer not considering the rare
cart-modification sequence; the failure is the observable exception when that
sequence executes.
B) The fault is the exception itself, since that's what "faulty" means in
practice.
C) The fault is the customer's unusual cart-modification sequence, since
that's what triggered the problem.
D) There is no fault here, only a failure, since the code worked correctly for
all previously tested cases.

**U2-M11b (2 min)** — Source: `fault-failure-and-defect-terminology.md`

A resume-screening model performs poorly on applicants with employment gaps,
not because of any bug in the inference code, but because the historical
hiring data it trained on reflected biased past decisions against such
applicants. Where does the "fault" live, per the AI touchpoint?

A) In the training data (one of the three AI-specific fault locations named by
the note) — not in any line of the inference code, which executes exactly as
written; this is a failure with no fault in the code at all.
B) In the inference code's decision logic, since that's ultimately what
produces the biased output.
C) There is no fault anywhere, since the model is technically "functioning as
designed."
D) In the deployment infrastructure, since that's what serves the model's
predictions to users.

**U2-M12a (2 min)** — Source: `modern-maintenance-definition.md`

A team says: "We haven't started maintenance on our new CRM yet — it doesn't go
live until next month." They are currently, this week, fixing a bug found
during internal beta testing, three weeks before release. Evaluate their claim
under the ISO/IEC 1995 definition.

A) Wrong as stated — modern maintenance occurs whenever software is modified
because of a problem, regardless of whether this happens before or after
installation; fixing this bug right now is maintenance under the 1995
definition, even though it isn't yet "postdelivery maintenance" under the
older IEEE 1990 term.
B) Correct — maintenance by definition cannot begin before a product goes
live.
C) Correct, since "maintenance" and "postdelivery maintenance" are synonyms
and neither can apply pre-release.
D) Correct, because fixing a bug found in beta testing counts as development,
not maintenance, under any definition.

**U2-M12b (2 min)** — Source: `modern-maintenance-definition.md`

A vendor's pricing page says: "Our support and maintenance plan begins the day
your license goes live." A customer complains this contradicts what they
learned about the ISO/IEC 1995 definition of maintenance. Which best resolves
the apparent conflict?

A) No real contradiction — the vendor is describing a commercial
support/postdelivery-maintenance offering (a business term tied to delivery),
not redefining the general engineering concept of maintenance, which under
ISO/IEC 1995 can occur at any time software is modified for a problem or
improvement, before or after delivery.
B) There is a contradiction, and the vendor's pricing page is technically
incorrect according to the 1995 definition.
C) There is no contradiction because "maintenance" always meant "after
delivery" and the 1995 redefinition never happened.
D) The customer is right to complain, since a vendor's support plan must
exactly match the ISO/IEC 1995 definition's scope to be valid.

**U2-M13a (1.5 min)** — Source: `types-of-maintenance.md`

A healthcare system's software is modified because a state regulator now
mandates a new, additional patient-consent field before booking any procedure —
nothing was broken, and the vendor didn't propose it. Classify this change.

A) Adaptive — triggered by a change in the environment the product operates in
(a new regulatory requirement), not a fault (nothing was broken) and not
perfective (the vendor didn't choose it for its own sake).
B) Corrective — since a defect report might exist somewhere about missing
consent tracking.
C) Perfective — since it improves the system's compliance posture.
D) It cannot be classified as any of the three, since regulatory changes are a
separate fourth category.

**U2-M13b (2.5 min)** — Source: `types-of-maintenance.md`

A shipping company's system is changed so package-tracking updates refresh
every 5 seconds instead of every 60, purely because the product team decided
faster updates would delight customers — no external requirement forced it.
Separately, the same system is changed because a partner carrier discontinued
a tracking-number format the system was built to parse. A junior engineer
says: "Both are adaptive, since neither has a defect report behind it."
Evaluate.

A) Wrong — "no defect report" only rules out corrective maintenance, it
doesn't discriminate perfective from adaptive; the refresh-rate change is
perfective (the team wanted it better, nothing external forced it), while the
tracking-format change is adaptive (the world — the carrier — forced it).
B) Correct — since neither change involved fixing a fault, both are
necessarily adaptive.
C) Correct — since both changes involve external systems (carriers,
customers), both are adaptive by definition.
D) The refresh-rate change is adaptive and the tracking-format change is
perfective — the reverse of the correct classification.

**U2-M14a (2 min)** — Source: `software-engineering-code-of-ethics.md`

A senior engineer says: "Principle 3 (PRODUCT) is the most important one — as
long as the product meets the highest professional standards, the other
principles are secondary." Evaluate using the ordering and qualifying language
of the code.

A) Wrong — PUBLIC is listed first and unqualified, and CLIENT AND EMPLOYER is
explicitly subordinated to it ("consistent with the public interest"); no
principle in the code is framed as senior to Principle 1, and product quality
does not override public-interest concerns.
B) Correct — the code explicitly ranks PRODUCT above PUBLIC.
C) Correct, since a professionally excellent product automatically satisfies
the public interest by definition.
D) Incorrect, but only because MANAGEMENT (Principle 5), not PUBLIC, is
actually first in the code's stated priority.

**U2-M14b (2 min)** — Source: `software-engineering-code-of-ethics.md`

In the KMUTT Health Centre case, after the lead's "we'll look at that later"
response was never written down and no action was recorded, which of N.'s
subsequent behaviors most directly violates Principle 4 (JUDGEMENT)?

A) Not re-raising or documenting the concern after it was dropped —
Principle 4's independence-of-judgment requirement means not deferring
indefinitely to an informal, unrecorded dismissal once she had reason to
believe a real, unaddressed issue existed.
B) Attending the review meeting in the first place, since raising it there was
itself the violation.
C) Not personally overriding the lead's decision and shipping a patched model
herself without authorization.
D) Not reporting the lead directly to the regulator before the system went
live.

**U2-M15a (1.5 min)** — Source: `iterative-and-incremental-development.md`

A team ships v1 of a note-taking app with just note creation and viewing.
Sprint 2 adds tagging (a new capability nobody had before); sprint 3 adds
search (another new capability). Which property does this sequence best
demonstrate?

A) Incremental — new pieces of functionality (tagging, then search) are added
over successive cycles, each a genuinely new capability layered onto what
existed before.
B) Iterative — because the app is being repeated across sprints.
C) Neither, since only one thing (the app) is changing across sprints.
D) Both properties simultaneously and identically, since iteration and
incrementation always occur together by definition.

**U2-M15b (2 min)** — Source: `iterative-and-incremental-development.md`

A recommendation-systems team runs weekly retraining cycles for three months,
each cycle tweaking features and hyperparameters and producing a small offline
metric improvement — but the model behind the live recommendation widget
hasn't changed since month one, because nobody has deployed any of the
retrained versions. Diagnose this.

A) Iteration with no increments — heavy genuine iteration (each retrained
version gets closer to a target) but zero incrementation, since nothing new
has actually been delivered to users; this is the specific ML failure mode the
note warns about.
B) This is healthy IID, since iteration is explicitly one of IID's named
strengths.
C) This is incremental development, since a new model version exists each
week.
D) This is neither iterative nor incremental, since the live widget is
unchanged.

**U2-M16a (2 min)** — Source: `classical-waterfall-phases.md`

A project schedules a single "Documentation" phase at the very end, after
Implementation, to "write up everything now that we know what was built."
What's the specific structural problem with this, per the note?

A) Documentation must always be current — you cannot perform any phase without
the previous phase's documentation already existing (e.g., you cannot
implement without current design documents), so deferring all documentation to
the end is structurally impossible to execute correctly, not just poorly
scheduled.
B) There is no real problem — documenting after implementation is more
efficient since requirements may have changed.
C) The only problem is that documentation should be written by a dedicated
technical writer, not by developers.
D) The problem is that documentation should happen before Requirements, not
after Implementation.

**U2-M16b (2.5 min)** — Source: `classical-waterfall-phases.md`

A team performs no testing until a single "Testing" phase at the end, and
within that phase, they run both "does each component do what its own spec
says" checks and "is this the right product for the client" checks on the same
day, one after another. What does the note say is specifically wrong with
bundling verification and validation like this at the very end?

A) Verification (checking each phase's own output against its spec) is
supposed to happen at the end of each phase, not deferred entirely; validation
(checking the whole product against client needs) happening only once, at the
very end, means both catch their respective faults at the most expensive
possible point.
B) Nothing is wrong — verification and validation are the same activity
performed at different scales, so testing them together is efficient.
C) The problem is only that validation was run after verification instead of
before.
D) The problem is that verification should be done by the client and
validation by the developers, and this team had it backwards.

### Written

**U2-W01 (12 min)** — Source: `fault-failure-and-defect-terminology.md`

A logistics scheduling system computes `etaMinutes = distanceKm / speedKmh *
60;` where `speedKmh` is read from a live GPS feed and can legitimately be
reported as exactly 0 when a vehicle is stationary at a red light. Using the
mistake→fault→failure chain, identify the mistake, locate the fault, and
describe precisely what the observable failure looks like — do not just say
"the code crashes."

**U2-W02 (12 min)** — Source: `modern-maintenance-definition.md`

A startup's engineering handbook states: "We define 'maintenance' as anything
that happens to the code after our first paying customer signs up — before
that, it's all development." An engineer objects that this handbook
definition doesn't match what they were taught. Justify or refute the
objection using the modern (1995) ISO/IEC definition, and explain what the
handbook's rule would need to say to align with it.

**U2-W03 (15 min)** — Source: `types-of-maintenance.md`

A video-conferencing company makes two changes in the same release: (1) it
modifies its audio codec because a widely-used browser deprecated the old
codec API the company relied on, forcing an update to keep calls working; (2)
it modifies the same codec, unprompted by any external event, to shave 15ms of
latency off every call because the team believes users will notice. Compare
these two changes along the dimension "did we want it, or did the world force
it," classify each as corrective, perfective, or adaptive, and explain why
this pair is exactly the kind the course flags as commonly confused.

**U2-W04 (15 min)** — Source: `software-engineering-code-of-ethics.md`

A junior developer on a hiring-screening tool notices during testing that the
model rejects candidates over age 50 at a much higher rate than younger
candidates with equivalent qualifications. She flags it in a Slack message to
her manager, who reacts with a thumbs-up emoji and no further comment. She
takes the thumbs-up as acknowledgment and moves on; the tool ships. Using
Principles 1 (PUBLIC), 4 (JUDGEMENT), and 7 (COLLEAGUES), and the explicit
ordering where PUBLIC is not subordinate to CLIENT AND EMPLOYER, state two
concrete actions she should have taken instead, and explain why a thumbs-up
emoji does not satisfy Principle 4.

**U2-W05 (13 min)** — Source: `iterative-and-incremental-development.md`

Using a hypothetical fitness-tracking app built over 5 sprints, compare
"iterative" and "incremental" along the dimension of what actually changes
between one cycle and the next — for iterative, what improves about the same
thing; for incremental, what new thing gets added.

**U2-W06 (13 min)** — Source: `classical-waterfall-phases.md`

A team building a payroll system runs unit tests continuously during
Implementation but performs zero requirements-level verification (no review of
the requirements or analysis documents against the client's actual needs)
until a single validation session scheduled the week before go-live. Predict
what class of fault is most likely to survive undetected until that final
week, and explain, using the verification/validation distinction, why unit
testing during Implementation could not have caught it.

---

## Unit 3 — Requirements, Analysis & Design

### MCQ

**U3-M01 (2 min)** — Source: `requirement-definition.md`

A product manager says, "The nurses need faster charting" (spoken in a hallway
conversation), the hospital's contract says "the system shall reduce charting
time to under 90 seconds," and the SRS says "charting screen response ≤200ms
server-side." A new team member says these are three different, conflicting
requirements that need to be resolved into one. Evaluate.

A) They aren't competing versions — per IEEE 610.12-1990's three-part
definition, this is the same requirement at three different points in its
life: felt by a person, imposed on a system/contract, and documented in an
artifact; the task is understanding how they relate (and could drift apart),
not picking a "true" one and discarding the others.
B) Correct — only the SRS version counts as the real requirement, since it's
the most precise.
C) Correct — only the client's spoken need counts, since everything else is
just paperwork derived from it.
D) Correct — the contract version is authoritative since it's the only legally
binding one, and the others should be discarded.

**U3-M02 (2 min)** — Source: `client-constraints.md`

An analyst, in the very first client meeting, opens with: "Given your budget,
which of these two vendor platforms should we standardize on?" — before any
solution strategy has been explored. Predict the risk, per the note.

A) This applies the client's cost constraint before any strategies have been
generated or evaluated, pruning the solution space prematurely — a
better-fitting approach might never surface because it was never considered
before being filtered by budget.
B) There is no risk — asking about budget first is always good practice since
it saves time.
C) The risk is that the analyst should have asked about deadline instead of
cost, since deadlines are more often non-negotiable.
D) The risk is that vendor platforms are never an acceptable answer to a
client-constraints question.

**U3-M03 (1.5 min)** — Source: `requirement-elicitation-techniques.md`

A team needs to learn how 500 call-center agents currently feel about a
proposed new ticketing workflow, quickly and at scale. Which technique best
fits, and why?

A) Questionnaire — it is specifically suited to determining the opinions of
hundreds of individuals, whereas interviews would be far too slow at this
scale and direct observation wouldn't capture opinion.
B) Structured interview — since interviews are the "primary" technique, they
should always be preferred regardless of scale.
C) Direct observation — since watching agents work would reveal their opinions
about the new workflow.
D) Examination of business forms — since ticketing forms would show how agents
feel about the new workflow.

**U3-M04 (2 min)** — Source: `understanding-the-application-domain.md`

In an insurance company's SRS, the term "active policy" is used throughout
without a glossary definition. Underwriting means "premium paid this cycle";
claims processing means "coverage dates include today." A dispute later arises
over whether a policy was "active" at the time of a claim. Why wasn't this
caught during requirements, per the note?

A) An undefined term doesn't announce itself — it looks like agreement, since
both teams used the phrase "active policy" fluently without noticing they
meant different things; the gap surfaces later, at the point where the
difference actually matters.
B) It wasn't caught because nobody on the team was competent enough to write a
proper SRS.
C) It wasn't caught because the requirements activity doesn't cover
terminology, only features.
D) It wasn't caught because the two departments never spoke to each other
during requirements, which is the only possible cause of such gaps.

**U3-M05 (2 min)** — Source: `analysis-activity.md`

A team says: "We elicited requirements through five detailed client interviews
and transcribed them precisely — analysis is redundant since the requirements
are already clear from the transcripts." Evaluate.

A) Wrong — elicitation discovers, analysis refines and extends; requirements
artifacts must be expressed in natural language to be comprehensible by the
client, and natural language is inherently imprecise, so a second, more
precise activity is still needed regardless of how carefully the interviews
were transcribed.
B) Correct — once interviews are transcribed accurately, no further
refinement is needed.
C) Correct, since analysis only adds value when elicitation was done poorly.
D) Incorrect, but only because five interviews aren't enough; more interviews
would make analysis unnecessary.

**U3-M06 (2 min)** — Source: `the-specification-document.md`

An SRS includes: "The system shall handle a reasonable number of concurrent
users." During acceptance testing, the vendor claims 200 concurrent users
satisfies this; the client claims it does not, expecting 2,000. Which of the
five C's does this sentence most directly violate?

A) Precise — "reasonable" sets no measurable threshold, so the sentence cannot
be verified as met or unmet, which is exactly the kind of dispute an
unenforceable contract term produces.
B) Concise — the sentence is short, so conciseness is the property actually
failing.
C) Current — the sentence is out of date relative to the system's real
capacity.
D) Complete — the sentence covers concurrency, so it isn't missing any topic,
which is the only thing "Complete" measures.

**U3-M07 (2 min)** — Source: `solution-strategy.md`

A city council wants to "install license-plate-reading cameras at every
intersection." A consultant immediately asks, "Should we? Yes — cameras are
affordable and available," and proceeds to scope a citywide camera network.
What did the consultant skip, per the questioning chain?

A) The consultant answered "should we?" on feasibility/cost alone without
progressing through "what business functions?", "how?", and "why?" —
skipping the chance to discover the council's real objective (e.g., traffic
revenue vs. stolen-vehicle recovery vs. congestion analysis), each implying a
different system.
B) The consultant skipped nothing; feasibility and cost are sufficient grounds
to answer "should we?"
C) The consultant should have applied budget constraints before asking "should
we?" at all.
D) The consultant's only error was failing to consult additional vendors
before proposing cameras.

**U3-M08 (2 min)** — Source: `design-activity.md`

An agile team building an MVP skips any architectural or interface diagram and
writes user stories directly into code, arguing "our formality level means
basically no models." Evaluate against the note's stated position.

A) Overreads the position — agile/iteration projects typically build fewer
models, but models are still created; skipping all design modeling entirely is
cowboy coding, which the note explicitly says causes less-than-optimal
solutions and rework.
B) Correct — the note states agile teams should build zero models under any
circumstances.
C) Correct, since architectural design is only relevant to waterfall projects.
D) Incorrect, but only because MVPs specifically require more modeling than
regular releases, not because "fewer" doesn't mean "zero."

**U3-M09 (1.5 min)** — Source: `separation-of-concerns.md`

A team maintains a "who has access to what" security matrix as a separate
artifact from their feature-requirements list, deliberately treating "who can
do this" as a concern distinct from "what does this do." Which dimension of
separation of concerns does this best illustrate?

A) Qualities — this separates a quality attribute (security/access control)
from functional concerns, similar to the note's efficiency/user-friendliness
or correctness/portability examples.
B) Time — since it's a separation between stages of the project.
C) Views — since it's a separation between data flow and control flow
diagrams.
D) None of the three named dimensions, since access control is a special case
the note doesn't cover.

**U3-M10a (1.5 min)** — Source: `use-cases.md`

A developer writes a use case titled "Recalculate Cached Tax Rate," naming the
actor as "the TaxCacheRefresher background job." A reviewer rejects it. Why,
per the note's definition of a use case?

A) A use case models an interaction between the software product and its
actors (users), a boundary-crossing interaction — "TaxCacheRefresher" is an
internal component, not an actor interacting across the system boundary.
B) The rejection is unjustified — any named process, internal or external, can
be a valid actor.
C) The rejection is correct, but only because the title is too technical,
unrelated to the actor issue.
D) The rejection is correct because use cases must always involve a human user
specifically, and no system can ever be an actor.

**U3-M10b (2 min)** — Source: `use-cases.md`

A use case for an online store is written as: "System validates the SKU
against the inventory B-tree index and short-circuits on a cache miss." A
client reviewing the requirements document can't understand it. What does this
reveal, per the note?

A) Use cases belong to the requirements activity, where artifacts must be
totally comprehensible by the client — writing in implementation-level
technical language (B-tree, cache miss) violates that requirement, regardless
of whether the interaction described is otherwise a legitimate actor-system
boundary crossing.
B) Nothing is wrong — use cases are meant for developers, not clients, so
technical precision is preferred.
C) The problem is only that "SKU" wasn't defined in a glossary; the rest of
the technical language is fine.
D) This is a design-activity problem, not a requirements-activity problem, so
the note's rules about use cases don't apply.

**U3-M11a (2 min)** — Source: `divide-and-conquer-and-abstraction.md`

A team building a video-editing tool does two things: (1) splits "render the
final video" into independently-solved sub-modules for color-correction,
audio-mixing, and frame-encoding; (2) exposes a single "Export" button to
users while hiding the hundreds of internal render-pipeline steps involved.
Which is divide-and-conquer and which is abstraction?

A) (1) is divide-and-conquer (horizontal, brick effect — independent
same-level subproblems); (2) is abstraction (vertical, iceberg effect — one
thing shown at a simplified level, irrelevant detail hidden below).
B) (1) is abstraction and (2) is divide-and-conquer — the reverse of the
correct classification.
C) Both are divide-and-conquer, since both involve breaking something into
smaller pieces.
D) Both are abstraction, since both involve hiding complexity from someone.

**U3-M11b (2 min)** — Source: `divide-and-conquer-and-abstraction.md`

"A car's steering wheel abstracts away the steering column, rack, and tie
rods — this means the wheel and the mechanical linkage are two separate
divide-and-conquer subproblems solved independently." Evaluate.

A) Misclassifies the example — this is abstraction (a logical simplification:
relevant detail — turn the wheel — exposed, irrelevant detail — the
linkage — hidden), not divide-and-conquer (a physical split into
independently-solved same-level subproblems); the distinguishing word is
physical vs. logical.
B) Correct — any interface that hides internals from a user is, by
definition, a divide-and-conquer split.
C) Correct, since the steering wheel and the linkage are built by different
teams, which is what makes something divide-and-conquer.
D) Wrong, but only because a steering wheel is a physical object and
abstraction only applies to software.

**U3-M12a (1.5 min)** — Source: `cohesion-and-coupling.md`

A module called `ReportGenerator` contains functions for formatting a PDF,
formatting a CSV, and formatting an HTML export — all clearly related to
"producing a report in some format" — and it communicates with the rest of the
system only through two well-defined function calls, with no shared globals.
How should its cohesion and coupling be assessed?

A) Likely good on both — high cohesion (the three formatting functions are
closely related to one purpose) and low coupling (interaction with the rest of
the system is limited to two well-defined calls, not shared state).
B) High cohesion but also high coupling, since any module that's called by
other code automatically has high coupling.
C) Low cohesion, since formatting three different file types means the module
is "doing three different things."
D) Cohesion and coupling can't both be assessed without knowing the module's
line count.

**U3-M12b (2.5 min)** — Source: `cohesion-and-coupling.md`

A pricing model consumes 25 raw input columns pulled live from four different
upstream databases with no declared schema or contract. One upstream team adds
a change that silently shifts the meaning of an existing column it derives
from (a currency field switches from USD to a mixed-currency total without
renaming). What happens, and why is this a coupling problem specifically?

A) The model's predictions silently degrade, because it is coupled to every
feature it consumes with no declared interface — unlike a typed API coupling,
which would likely fail loudly on a meaningful semantic change, the model just
keeps computing on a same-shaped column with a new meaning, with nothing to
break against.
B) Nothing unusual happens — models are immune to upstream schema changes
since they only look at numeric values.
C) This is a cohesion problem, not a coupling problem, since it's about a
single field's internal meaning.
D) This would have happened identically in a normal service-to-service API
integration, so there is nothing distinctive about the ML case.

**U3-M13a (2 min)** — Source: `modularity.md`

A team builds a mobile app's entire UI layer as a single 15,000-line file with
every screen's logic inline, no components, no functions beyond `onCreate()`.
It passes all QA tests. A manager says: "It's fine, it does what it should."
Which modularity property is most acutely missing, and why is the manager's
defense flawed?

A) Decomposability is most acutely missing — a single undifferentiated file
cannot be divided into independently workable pieces; the manager's defense
conflates functional correctness (it passes tests) with design quality
(whether it can be maintained, extended, or reused).
B) Composability is most acutely missing, since the file can't be tested at
all.
C) Nothing is missing — passing all QA tests is sufficient evidence that the
module design is sound.
D) Understanding is most acutely missing, but only because the file is
written in the wrong programming language.

**U3-M13b (2 min)** — Source: `modularity.md`

A team splits a 15,000-line file into 300 separate 50-line files, each with a
generic name like `Helper12.js`, but functions across files still directly
reference and mutate the same global mutable object, and near-identical logic
is copy-pasted across a dozen of them. A junior dev says: "We fixed our
modularity problem — we have way more files now." Evaluate.

A) Modularity is defined by minimal overlap of functionality and manageable
relationships between components, not by file count — physical separation
into many files doesn't guarantee it when logic is duplicated and files are
still entangled through a shared mutable global.
B) Correct — splitting into any number of smaller files always improves
modularity, since modularity is fundamentally about file size.
C) Correct, since 300 files necessarily means 300 independent, decomposable
units regardless of their content.
D) Incorrect, but only because 50 lines per file is still too long;
modularity requires files under 20 lines.

**U3-M14a (2 min)** — Source: `moving-target-problem.md`

Six weeks into a project, a client requests a new "multi-currency support"
feature. Investigation shows the original interviews never asked any question
about international customers at all — the topic simply never came up. Using
the five-cause table, classify this and state the correct response.

A) Requirements never elicited properly — this is a preventable process
failure, and the correct response is to root-cause the elicitation gap
separately from simply implementing the now-requested feature.
B) The client learned what they needed by seeing the working beta — this is
IID working as designed, requiring no process response.
C) The world changed (a new regulation) — nothing could have prevented it, so
no root-cause investigation is warranted.
D) Someone wants something new and is calling it a clarification — this is a
governance problem requiring a change-control board, not a process
investigation.

**U3-M14b (2.5 min)** — Source: `moving-target-problem.md`

After a costly late-stage requirement change, a CTO mandates: "From now on,
any team caught changing requirements after sprint 2 will be penalized in
their performance review." Using the five-cause table, evaluate this policy's
likely effect on cause 1 ("the client learns what they need by seeing
something").

A) The policy actively damages this cause — IID's value depends on the client
being able to learn from working software and request changes accordingly;
penalizing teams for accommodating that learning punishes legitimate, expected
behavior as if it were a process failure.
B) The policy correctly targets cause 1, since client-driven changes after
sprint 2 are always the result of poor initial elicitation.
C) The policy has no effect on cause 1, since performance reviews only affect
individual developers, not client behavior.
D) The policy strengthens cause 1, since it forces clients to think harder
before making late requests.

**U3-M15a (2 min)** — Source: `informal-semiformal-and-formal-specifications.md`

A specification reads: "The elevator door shall not open while the car is
moving." A safety engineer wants a guarantee — not just a test result — that
this can never happen across every possible sequence of button presses and
sensor states. Which technique, per the note, is the only one that can provide
this?

A) A formal method such as a Finite State Machine — it is the only technique
in the course that can prove the absence of a fault across the full defined
state space, rather than merely demonstrating a fault's presence when testing
happens to find a violating case.
B) A semiformal UML state diagram, since diagrams are inherently more rigorous
than prose.
C) More extensive testing — running enough test cases eventually proves the
absence of the fault.
D) A better-written informal specification, since ambiguity is the only real
obstacle to this guarantee.

**U3-M15b (2.5 min)** — Source: `informal-semiformal-and-formal-specifications.md`

A team is specifying "the model shall flag suspicious login attempts." For a
specific scenario — logins from a new device in a country the user has never
logged in from — which best applies the AI touchpoint's three-part structure
(task, acceptable error profile, fallback)?

A) Task = flag a login as suspicious when device and country are both new for
that user, at the moment of login attempt; error profile = explicitly weigh
missing a real account-takeover (false negative) against locking out a
legitimate traveling user (false positive), stating which is worse for this
scenario and that only the client can decide the weighting; fallback = what
happens when the model can't decide (e.g., send a verification code) rather
than silently allowing or blocking.
B) Task = "detect fraud with 95% accuracy" — a single accuracy number is
sufficient to fully specify the requirement.
C) The three-part structure doesn't apply here since login-fraud detection
isn't safety-critical the way the elevator example is.
D) Fallback is unnecessary as long as the false-positive and false-negative
rates are both under 5%.

**U3-M16a (2 min)** — Source: `functional-and-nonfunctional-requirements.md`

Consider "the system shall allow a customer to cancel an order within 24 hours
of placing it" versus "the system shall respond to any user action within
500ms." Classify each and state the dimension used.

A) The first is functional (specifies an action the system performs); the
second is nonfunctional (specifies a property/constraint on how the system
performs, not an action itself); the dimension is what vs. how well.
B) Both are functional, since both describe something the system "does."
C) The first is nonfunctional (it's about a time window) and the second is
functional (it's a specific numeric target) — the reverse of the correct
classification.
D) Both are nonfunctional, since both include measurable constraints (24
hours, 500ms).

**U3-M16b (2 min)** — Source: `functional-and-nonfunctional-requirements.md`

For the business need "reduce customer-support call volume by letting
customers self-serve common account changes," a requirements document
includes: "The system shall let users choose a custom app icon color."
Evaluate whether this is a well-formed functional requirement and whether it
belongs in this SRS.

A) It is a well-formed functional requirement (clear, specifies an action) but
very likely fails traceability to the stated need (custom icon colors don't
reduce support call volume) — well-formedness and traceability are two
independent tests, and a requirement can pass one while failing the other.
B) Since it doesn't serve the stated need, it is automatically not a
well-formed requirement either — the two failures are really one failure.
C) It belongs in the SRS as written, since any functional requirement that is
clearly worded should be included regardless of the business need.
D) It is not well-formed, because "custom app icon color" is a design
decision, not a requirement, and design decisions can never be phrased as "the
system shall."

### Written

**U3-W01 (13 min)** — Source: `divide-and-conquer-and-abstraction.md`

A team building an e-commerce checkout flow does two things: (1) splits the
"process the order" problem into independently-built sub-modules for
inventory-reservation, payment-capture, and shipping-label-generation; (2)
shows the customer a single "Estimated delivery: 3-5 days" line while the
actual calculation blends warehouse location, carrier SLAs, and current
backlog that the customer never sees. Identify which is divide-and-conquer and
which is abstraction, state the single-word distinction that tells them apart,
and give the brick/iceberg image for each.

**U3-W02 (12 min)** — Source: `cohesion-and-coupling.md`

A module named `UserSettingsManager` contains functions for updating a user's
email, password, and notification preferences — three plausibly related
aspects of "managing a user's account settings" — but each of these three
functions independently reaches into a shared `AppConfig` singleton object
that six other unrelated modules across the codebase also read and write
directly, with no defined interface. Evaluate this module's likely cohesion
and coupling separately (not as one combined verdict), and explain why they
can move independently of each other.

**U3-W03 (12 min)** — Source: `modularity.md`

A team's backend passes every integration test and ships on schedule, built as
three enormous files (one per major feature area) with no internal function
boundaries — each file is a long sequential script. The tech lead says: "We'll
worry about modularity later if we ever need to extend this; right now,
functional correctness is the only thing that matters, and we have that."
Justify or refute this position using the note's argument about functional
equivalence versus design equivalence, and name which of the three modularity
properties (decomposability, composability, understanding) is most immediately
at risk from deferring the concern.

**U3-W04 (15 min)** — Source: `moving-target-problem.md`

Four months into a CRM project, the client requests a new "deal-scoring"
feature. Consider three possible backstories and, for each, classify it
against the five-cause table and state the correct response: (a) a new
industry-wide data-privacy regulation now requires disclosing why a deal was
scored a certain way; (b) the client only realized they wanted this after
seeing the working sales pipeline dashboard in action; (c) a regional sales VP
who was never interviewed during requirements gathering now insists on this
feature or will block rollout in their region.

**U3-W05 (15 min)** — Source: `informal-semiformal-and-formal-specifications.md`

Compare an informal requirement ("the vending machine shall not dispense an
item until payment is confirmed") with a formal Finite State Machine
specification of the same vending machine's payment/dispense logic, along the
dimension of what each can prove about the absence of a fault. Name all five
FSM components you would need to define for this vending machine at a
conceptual level (you do not need to draw the full diagram).

**U3-W06 (13 min)** — Source: `functional-and-nonfunctional-requirements.md`

Compare "the system shall generate a monthly sales report" and "the system
shall remain available 99.9% of the time" along the dimension of what each one
specifies (an action the system performs vs. a property/constraint on how it
performs). Classify each as functional or nonfunctional and justify from the
dimension. Then explain why "choice of programming language" — clearly
nonfunctional — is often not finalized during requirements at all.

---

## Unit 4 — Implementation, Testing & Integration

### MCQ

**U4-M01 (2 min)** — Source: `good-programming-practice.md`

A billing function `double calc(double a, double b, int t)` uses `t==1`/`t==2`
to select a tax rate hardcoded as `0.07`/`0.15` inline. A reviewer flags two
separate problems. Which pair correctly identifies them, per the note's five
practices?

A) (1) meaningless, inconsistent names (`a`, `b`, `t`, `calc`) that force a
future maintenance programmer to trace call sites to understand meaning; (2)
hardcoded near-constants (0.07, 0.15) instead of values read from a parameter
file, meaning a rate change requires a code change and redeploy.
B) (1) the function is too short; (2) it lacks a return statement.
C) (1) it uses `double` instead of `int`; (2) it has too few parameters.
D) (1) it lacks comments explaining what each line does; (2) it isn't written
in an object-oriented style.

**U4-M02 (1.5 min)** — Source: `nested-if-statements.md`

The following is nested to a depth of four: checking user login, then
permission level, then feature-flag status, then a per-tenant override, each
inside the previous. Per the rule of thumb, what should happen?

A) This should be avoided as poor programming practice — the stated rule of
thumb flags depth greater than three as something to avoid, and depth four
exceeds it.
B) This is fine, since the rule of thumb only applies to if-if combinations,
not if-else-if chains.
C) This is fine, since any nesting used for legitimate business logic is
automatically exempt from the depth guideline.
D) This should be avoided, but only because there are exactly four
conditions, and the rule specifically forbids four-condition checks.

**U4-M03 (2 min)** — Source: `stubs-and-drivers.md`

You need to unit-test a `NotificationService` module that itself calls an
`EmailProvider` module (not yet written) and is called by an `OrderWorkflow`
module (already written, calling NotificationService in production). What do
you need to test `NotificationService` in isolation?

A) A stub for `EmailProvider` (since NotificationService calls it — it's
below) and a driver for `OrderWorkflow`'s role (since something must call
NotificationService directly with test inputs), even though OrderWorkflow
itself already exists.
B) A driver for `EmailProvider` and a stub for `OrderWorkflow`, reversing the
direction.
C) Only a stub, since `EmailProvider` is the only unwritten dependency.
D) Neither is needed, since `OrderWorkflow` already exists and can call
`NotificationService` directly in production.

**U4-M04 (2 min)** — Source: `sandwich-integration.md`

A team integrates sandwich-style: logic artifacts top-down, operational
artifacts bottom-up, and declares integration complete once both halves pass
their own tests. What have they forgotten, per the note?

A) The third step — explicitly testing the interfaces between the logic-side
and operational-side halves, the one place neither sub-strategy has exercised
on its own.
B) Nothing — once both halves individually pass, the combined system is
guaranteed correct by construction.
C) They forgot to also integrate bottom-up on the logic side, duplicating
effort.
D) They forgot that sandwich integration requires stubs only, never drivers.

**U4-M05 (1.5 min)** — Source: `walkthroughs-and-inspections.md`

A five-person team wants "quick feedback on whether anyone misunderstood the
design before coding starts," with minimal formality and no need for recorded
fault-type statistics. Which review format best fits, and why?

A) A walkthrough — 4–6 members including current-workflow, next-workflow, and
SQA representatives, informal and document-driven, producing "not understood"
and "appears incorrect" lists, well suited to quick pre-coding feedback.
B) An inspection, since inspections are always the superior choice for any
review goal due to their five formal steps.
C) Neither — non-execution-based testing can only occur after code exists, so
nothing can happen before coding starts.
D) A walkthrough, but only because walkthroughs double as performance
appraisals, which motivates participation.

**U4-M06a (2 min)** — Source: `self-documenting-code-and-comments.md`

A code review flags: `// loop through all users` above `for (user in users)
{...}`, and separately `// we cap at 500 here because the vendor's API
rate-limits us at 500/min and a 501st call in the same minute gets our whole
account throttled for an hour` above `if (count >= 500) break;`. Classify each
and state the correct resolution.

A) The first is a WHAT comment (a confession the code doesn't say — since the
loop is already self-evident, it should be deleted or the code recoded to be
clearer, not commented); the second is a WHY comment (information that cannot
be recovered from the code itself, and must be kept).
B) Both are WHAT comments and should both be deleted, since comments are
generally discouraged.
C) Both are WHY comments and should both be kept, since any comment provides
useful context.
D) The first is WHY (it explains iteration) and the second is WHAT (it just
states a number) — the reverse of the correct classification.

**U4-M06b (2 min)** — Source: `self-documenting-code-and-comments.md`

A developer argues: "Since the note says self-documenting code is exceedingly
rare, we should stop trying to write clear code and just lean on WHAT
comments everywhere instead — it's more realistic." Evaluate.

A) Misreads the note — "exceedingly rare" is a realistic acknowledgment, not
permission to give up; the note explicitly says to recode in a clearer way
rather than promote or excuse poor programming, so the correct response is to
keep pushing toward clarity, reserving comments for genuinely irreducible WHY
information.
B) Correct — since perfect self-documenting code is rare, WHAT comments are
an acceptable permanent substitute for writing clearer code.
C) Correct, since the note treats WHAT and WHY comments as equally acceptable
once self-documentation is acknowledged to be difficult.
D) Incorrect, but only because comments should be replaced with more code
review, not because of the recode-don't-comment principle.

**U4-M07a (2 min)** — Source: `top-down-integration.md`

A well-layered ride-sharing backend has high-level trip-matching logic calling
low-level, highly-reused fare-calculation and ETA-estimation modules. The team
integrates top-down. Why does the note say being well-designed makes the
operational-artifact-undertesting problem worse, not better?

A) In a well-designed, heavily layered system, low-level operational
artifacts sit deeper in the call chain (reached later under top-down order)
and are called through defensively-guarded real callers, so their error paths
never execute during integration — better design means more guarding and
deeper artifacts, compounding the undertesting.
B) Being well-designed has no bearing on testing order at all; the claim in
the note is a rhetorical exaggeration, not a real mechanism.
C) Well-designed systems are worse because good design always means more
modules, and more modules always means more bugs.
D) Well-designed systems are worse because defensive programming is itself a
design flaw the note recommends against.

**U4-M07b (2.5 min)** — Source: `top-down-integration.md`

During top-down integration of a hotel-booking system, a previously-passing
regression test for "apply loyalty discount" starts failing right after the
`RoomAvailability` module is newly integrated (replacing its stub). Where
must the fault lie, and why does this precision matter?

A) The fault must lie in `RoomAvailability` itself or its interface(s) with
the already-integrated product — nothing else changed; this precision (versus
"the fault could be anywhere") is exactly the fault-isolation advantage that
all-at-once integration would lose.
B) The fault could be anywhere in the system, since regression failures can be
triggered by unrelated changes.
C) The fault must lie in the loyalty-discount module itself, since that's the
test that failed, regardless of what was just integrated.
D) The fault must lie in a module not yet integrated, since integrated
modules are already presumed correct.

**U4-M08a (2 min)** — Source: `bottom-up-integration.md`

A team integrates bottom-up: low-level payment-gateway-adapter and
currency-conversion utilities first (thoroughly tested via drivers with
adversarial inputs), then mid-level modules, ending with the top-level
`CheckoutOrchestrator` last. Which of bottom-up's three advantages is this
ordering specifically producing?

A) Thorough testing of operational artifacts via drivers (not fault-shielding
callers) — drivers can supply inputs a defensive caller would filter out,
exercising error paths that top-down integration would leave untested.
B) Early detection of major design faults — bottom-up is specifically weaker
here, since logic artifacts (which carry design decisions) arrive last.
C) Stub reuse — bottom-up doesn't use stubs at all in the way described;
that's a top-down mechanism.
D) Guaranteed fault isolation exclusive to bottom-up — fault isolation is
shared by both strategies, not a bottom-up-only advantage.

**U4-M08b (2.5 min)** — Source: `bottom-up-integration.md`

A team integrates bottom-up: all low-level utility and data-access modules
first, thoroughly tested, then progressively higher-level modules, ending with
the top-level `TripPlanner` controller last. One week before release,
integrating `TripPlanner` reveals the overall control flow assumed by the
architecture doesn't match how the lower modules were actually built to be
called. Diagnose this using bottom-up's named weakness.

A) Major design faults are detected late under bottom-up, because logic
artifacts (which carry the architectural/control-flow decisions) are
integrated last — nothing below could have exercised whether components
compose under the real intended control flow until `TripPlanner` was finally
wired in.
B) This is a symptom of poor unit testing on the lower modules, unrelated to
integration order.
C) This couldn't happen under bottom-up, since thoroughly-tested lower
modules guarantee correct overall composition.
D) This is the same failure top-down integration would produce at the same
point in the schedule.

**U4-M09a (2 min)** — Source: `testing-to-specifications-and-testing-to-code.md`

A tester writes test cases purely from a shipping-cost API's published
documentation, never opening the implementation. Another tester, working only
from the source code's branch structure, writes cases to exercise every
`if`/`else` path. Name both approaches using at least two aliases each.

A) First tester = testing to specifications (black-box, data-driven,
functional, input/output-driven). Second tester = testing to code (glass-box,
logic-driven, structured, path-oriented).
B) First = glass-box, second = black-box — the reverse of the correct
pairing.
C) Both are testing to specifications, since both are systematic (non-random)
approaches.
D) Both are testing to code, since both involve writing structured test
cases.

**U4-M09b (2.5 min)** — Source: `testing-to-specifications-and-testing-to-code.md`

A programmer writing a discount-calculation function never considered that a
coupon code could be applied twice in the same order, so the code has no
branch handling a duplicate-coupon case at all. A tester using pure
testing-to-code (100% branch coverage of the actual code) writes their test
suite. Will this suite catch the duplicate-coupon issue, and why?

A) No — a path can only be tested if it is present in the code; since the
programmer never wrote a branch for the duplicate-coupon case, there is no
such path for path-oriented testing to find, and the same blind spot that
caused the omission is likely to affect the tester working purely from the
code.
B) Yes — 100% branch coverage guarantees every real-world scenario is tested,
by definition.
C) Yes, but only if the tester also measures statement coverage in addition
to branch coverage.
D) No, but only because branch coverage tools are unreliable, not because of
any conceptual limitation.

### Written

**U4-W01 (18 min)** — Source: `top-down-integration.md`

A well-designed inventory-management system has clean layering: high-level
restocking-decision logic calls a low-level, heavily-reused
`computeReorderQuantity(stock, leadTime)` function guarded everywhere it's
called by `if (stock >= 0)`. The team integrates top-down. Predict
specifically what will go untested in `computeReorderQuantity` under this
integration order, explain the defensive-programming mechanism that causes
it, and state why the fact that this function is reused by many callers makes
the consequence worse, not better.

**U4-W02 (15 min)** — Source: `bottom-up-integration.md`

Compare top-down and bottom-up integration, applied to a hypothetical airline
check-in system, along the dimension "how thoroughly are operational
(low-level) artifacts tested, and by what mechanism," and explain precisely
why "fault isolation" cannot be used to discriminate between the two
strategies even though both explicitly claim it as an advantage.

**U4-W03 (15 min)** — Source: `testing-to-specifications-and-testing-to-code.md`

A QA lead for a churn-prediction model says: "We tested this the same way we
test our checkout code — we picked twenty representative customer records,
wrote down the expected churn/no-churn label for each from the spec, ran the
model, got 18/20 correct, and signed off at 90%." Justify or refute this
sign-off as adequate evidence of correctness, using the AI touchpoint's
account of how unit testing breaks for models, and state what she should have
done instead.

---

## Unit 5 — Maintenance & Engineering AI-Enabled Software

### MCQ

**U5-M01 (2 min)** — Source: `ensuring-maintainability.md`

A startup ships v1 with terse variable names and no documentation, planning:
"We'll invest in maintainability once we hit our first big maintenance cycle
and know what actually needs changing." Evaluate this plan.

A) Flawed — maintainability is decided at design and implementation time and
cannot be added later; by the time maintenance starts, the maintenance
programmer is exactly the person harmed by its absence, and improving it then
requires first understanding a system whose current unmaintainability is the
very barrier to that understanding.
B) Sound — maintainability improvements are equally effective whenever they're
made, so deferring costs nothing.
C) Sound, since the first maintenance cycle is exactly when the system's real
structure becomes clear enough to document properly.
D) Flawed, but only because documentation should be written by a technical
writer, not developers, regardless of timing.

**U5-M02a (1.5 min)** — Source: `defect-reports.md`

A user reports that CSV export produces garbled characters for names with
accented letters. A maintenance programmer checks the defect report file
first and finds this exact issue was reported and partially diagnosed two
weeks ago. What should happen now, per the note?

A) Give the user the information already in the file (the diagnosis so far,
any workaround, and a fix-time estimate) rather than re-diagnosing from
scratch, since this is a previously-reported defect, not a new one.
B) Re-run the full diagnostic process from the beginning, since each user
report must be independently investigated regardless of prior findings.
C) Ignore the report, since it's already logged and no further action is
needed until the fix ships.
D) Escalate immediately to fix it before any other work, since the note says
every defect should be fixed immediately with no exceptions.

**U5-M02b (2 min)** — Source: `defect-reports.md`

A user of a subscription-renewal-prediction tool emails: "The model told my
manager I was a low churn risk, and I quit two days later — it was just wrong
about me." Using the AI touchpoint on defect reports, what makes this report
structurally different from a normal corrective-maintenance defect report?

A) It has no reproducible case — there is no specific input/output pair, code
path, or deterministic trigger the maintenance programmer can rerun to
recreate the "defect," unlike a normal defect report which must include
enough information to reproduce the problem; the report template has no field
that fits this kind of complaint.
B) It is structurally identical to a normal defect report, since the user
described what went wrong in their own words.
C) It differs only because the user emailed instead of using the official
defect-report form.
D) It differs only because the complaint concerns a manager's decision rather
than the software directly.

**U5-M03a (1.5 min)** — Source: `data-drift-in-trained-models.md`

An ad-targeting model's click-through prediction accuracy has been slipping
for three months. No code has changed, no retraining has occurred, and
support has received zero complaints (users have no way to know the
predictions should be better). What does the note say explains this?

A) Data drift — the model's failure rate rises even though nobody touched it,
because the world it was trained on (user behavior, ad inventory, seasonal
patterns) has moved away from the world it now sees; this is the one case
where the deterioration curve rises with no change events marked on it.
B) Ordinary software deterioration — the model has been "running" for three
months, and running long enough is sufficient to explain rising failure
rates.
C) A regression fault from the last deployment, since failure rates rising
over time always trace to a recent code change.
D) User dissatisfaction, since zero complaints actually indicates the problem
is not real.

**U5-M03b (2.5 min)** — Source: `data-drift-in-trained-models.md`

A logistics-ETA model's accuracy silently degrades over two months as a new
highway bypass opens and traffic patterns shift, with nobody at the company
aware anything has changed. A colleague says: "This is exactly the same as
when we manually updated our old rules-based ETA system after that same
highway opened last time — both are just adaptive maintenance responding to a
changed environment." Evaluate.

A) Partially right, importantly incomplete — both are environment-
change-triggered, but the rules-based update was a human-initiated
modification with an identifiable trigger someone acted on; the model's drift
has zero change events and nobody necessarily noticing the shift happened at
all, requiring a categorically different detection mechanism (built-in
monitoring) rather than the normal request-then-implement workflow.
B) Completely correct — since both are responses to the same kind of
environmental change (a new highway), they require identical processes.
C) Completely wrong — data drift has nothing to do with adaptive maintenance
at all, since no one performed adaptive maintenance on the model.
D) Correct, but only because both examples involve the same highway bypass;
the comparison would not hold for a different kind of environmental change.

**U5-M04a (2 min)** — Source: `engineering-ai-enabled-software.md`

A logistics company deploys an AI-powered route-optimization system. For
"writing unit tests with fixed expected outputs for the route-scoring model,"
which of the note's three categories applies, and why?

A) Breaks — there is no expected output for a single input in the traditional
sense for a model; correctness is a property over a population (evaluation on
slices), not a fixed input-output mapping, so this specific practice cannot
be carried over unchanged.
B) Holds unchanged — unit testing works identically for model code and
ordinary code.
C) Strained/reframed — unit testing still works for models but needs
slightly longer timeouts.
D) Breaks, but only because route-optimization is safety-critical; for
lower-stakes models unit testing would hold unchanged.

**U5-M04b (2.5 min)** — Source: `engineering-ai-enabled-software.md`

A classmate writes: "This unit basically proved that once you add machine
learning, you can throw out everything you learned about ethics,
requirements, and good programming practice, because it's all a different
discipline now." Evaluate using the note's explicit framing.

A) Wrong by construction — the note's central point is "mostly the same, in
three specific places not at all" (9 hold unchanged, 5 strained/reframed,
only 3 break); ethics, good programming practice, and cost-of-correcting-
faults are explicitly named as holding unchanged, directly contradicting the
claim that everything must be thrown out.
B) Correct — the note's whole purpose is to show that AI-enabled software
requires an entirely new discipline built from scratch.
C) Correct, since 3 out of 17 practices breaking means the majority of the
course's content is now obsolete.
D) Incorrect, but only because requirements specifically hold unchanged, when
in fact the note places requirements in the "strained/reframed" category, not
"holds unchanged."

### Written

**U5-W01 (13 min)** — Source: `data-drift-in-trained-models.md`

A subscription-box company's product-recommendation model has been quietly
making worse recommendations for four months — customers have started
unsubscribing at a slightly higher rate, but nobody has connected this to the
recommendation model specifically, and no one has filed a complaint about
"bad recommendations" by name. Explain precisely why the conventional
defect-report pipeline will never surface this problem on its own, and state
what would need to be true of the company's engineering process for the
problem to be caught before it shows up in unsubscribe numbers.

**U5-W02 (18 min)** — Source: `engineering-ai-enabled-software.md`

A bank deploys an AI-assisted loan-underwriting system. For each of the
following, say whether the note would call it (i) holds unchanged, (ii)
strained/reframed, or (iii) breaks — and for any marked (ii) or (iii), state
what specifically changes or replaces it: (a) the applicant-portal login and
document-upload part of the system; (b) reviewing the labelling instructions
used to build the training data, in place of reviewing individual
approved/denied loan decisions; (c) the integration order between the
credit-scoring model and the downstream automated-decision-letter service;
(d) writing a defect report when a rejected applicant emails to say "the
decision felt wrong."

---
