/**
 * Exam 02 — "Modern Software Engineering Principles" (80 MCQ + 20 written),
 * transcribed in full from:
 *   test-exam-pattern-solution/exam-02-questions.md
 *   test-exam-pattern-solution/exam-02-answer-key.md
 *
 * This is exam content, not paraphrase — every prompt, option, rationale,
 * model-answer point, trap, and grading band below is copied verbatim from
 * those two files. Do not shorten or reword when editing; if the source
 * files change, re-transcribe the affected items.
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
  { number: 1, title: "Foundations & Process", mcq: 14, written: 3, total: 17, minutes: 59.5 },
  { number: 2, title: "Life-Cycle Models", mcq: 23, written: 6, total: 29, minutes: 122.5 },
  { number: 3, title: "Requirements, Analysis & Design", mcq: 23, written: 6, total: 29, minutes: 125.5 },
  { number: 4, title: "Implementation, Testing & Integration", mcq: 13, written: 3, total: 16, minutes: 74.5 },
  { number: 5, title: "Maintenance & Engineering AI-Enabled Software", mcq: 7, written: 2, total: 9, minutes: 45 },
];

export const EXAM_META: ExamMeta = {
  totalItems: 100,
  mcqCount: 80,
  writtenCount: 20,
  totalMinutes: 427,
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
  // ===================== Unit 1 — Foundations & Process =====================
  mcq(
    "U1-M01", 1, 2, "goals-of-software-development.md",
    `A manager slips a sprint's scope by adding three new features mid-cycle, while holding the deadline and the budget exactly fixed, and tells the team: "Just be careful and quality will hold." Using the Project Management Triangle, evaluate this instruction.`,
    [
      { letter: "A", text: `Quality will predictably suffer, because Scope increased while Cost and Time held fixed — quality is the passive variable that absorbs the squeeze, not something "carefulness" can shield on its own.` },
      { letter: "B", text: `Quality is a fourth corner equal to Scope, Cost, and Time, so the manager can simply instruct the team to hold the line on it independently of what happens to the other three.`, rationale: `treats Quality as a fourth corner that can be independently instructed to hold, rather than the passive variable that absorbs pressure from the other three.` },
      { letter: "C", text: `Since Cost wasn't increased, no corner actually moved, so quality is safe by definition.`, rationale: `ignores that Scope is one of the three corners in its own right — only tracks Cost as if it were the sole quality-relevant variable.` },
      { letter: "D", text: `The triangle only predicts problems when Time is compressed; since the deadline didn't move, quality is unaffected regardless of scope changes.`, rationale: `overweights Time as the only corner that affects quality, ignoring Scope.` },
    ],
    "A"
  ),
  mcq(
    "U1-M02", 1, 2, "software-complexity-and-intangibility.md",
    `A CTO wants to reduce both the complexity and the intangibility of a monitoring platform in one move, and proposes: "Let's draw one comprehensive UML diagram of the entire system so everyone can see it all at once." Evaluate this proposal.`,
    [
      { letter: "A", text: `The diagram may help with intangibility (easier to visualize) but does nothing to reduce complexity itself — complexity (many different, connected parts) must be managed, not eliminated, and drawing it doesn't remove any parts or connections.` },
      { letter: "B", text: `A single comprehensive diagram eliminates complexity by making every connection explicit and visible.`, rationale: `treats visualization (drawing the diagram) as equivalent to elimination of the underlying complexity — the note is explicit that complexity is managed, never eliminated.` },
      { letter: "C", text: `Since intangibility and complexity are the same underlying property, fixing one automatically fixes the other.`, rationale: `conflates two distinct traits (complexity and intangibility) the note deliberately separates.` },
      { letter: "D", text: `Complexity only matters for testing and estimation, not for diagrams, so the diagram is irrelevant to either problem.`, rationale: `wrongly restricts complexity's relevance to testing/estimation only, when understanding/visualization is exactly where complexity bites.` },
    ],
    "A"
  ),
  mcq(
    "U1-M03", 1, 1, "software-process.md",
    `A team lead writes on a sprint board: "Fix login page CSS alignment bug." Using the Activity / Action / Task hierarchy, how should this be classified?`,
    [
      { letter: "A", text: `Task — small and well-defined, with a single narrow objective, not a broad objective or a major work product.` },
      { letter: "B", text: `Action — because it produces a work product (the fixed CSS file), and any output at all counts as a major work product.`, rationale: `mistakes "produces any output" for "produces a major work product" — the Action level requires something on the scale of an architectural design, not a one-line CSS fix.` },
      { letter: "C", text: `Activity — because "fix" implies an ongoing broad effort toward correctness across the whole product.`, rationale: `judges the hierarchy level by the generality of the verb used ("fix") rather than the actual scope of the objective named.` },
      { letter: "D", text: `It cannot be classified without knowing how long it will take, since the hierarchy is based on effort, not scope.`, rationale: `invents a criterion (duration/effort) the hierarchy does not use; it is built on scope, not time.` },
    ],
    "A"
  ),
  mcq(
    "U1-M04", 1, 2, "stakeholders.md",
    `A ride-sharing company builds an internal system that automatically deprioritizes driver applicants whose background-check turnaround is slow, to speed up onboarding of others. Which stakeholder is most likely to be left out of requirements discussions, per the note's AI-enabled addition?`,
    [
      { letter: "A", text: `The deprioritized applicant — the person the system decides about — because they never participate in requirements conversations; their stake only appears as a side effect of the system's decisions.` },
      { letter: "B", text: `The end-user (onboarding staff), since they are the ones directly operating the system and are rarely consulted.`, rationale: `confuses "easy to miss" with "primary operator" — onboarding staff are directly consulted as system users, the opposite of invisible.` },
      { letter: "C", text: `The customer who pays for the system, since paying customers are rarely in the room during requirements either.`, rationale: `paying customers are typically well-represented in requirements conversations precisely because they pay; they are not the invisible party the note names.` },
      { letter: "D", text: `The System Verifiers, since QA is typically added late in the project.`, rationale: `QA being added late is a scheduling problem, not the specific "never-asked-to-be-a-stakeholder" invisibility mechanism the note describes.` },
    ],
    "A"
  ),
  mcq(
    "U1-M05a", 1, 1.5, "wants-and-needs.md",
    `A client tells the team, "We want a mobile app with push notifications." The analyst replies, "Got it — I'll write that up as the requirement and we'll start the mobile app project." What is the strongest criticism of the analyst's reply?`,
    [
      { letter: "A", text: `The analyst treated a want (a feature naming a specific solution) as if it were already a need (the underlying business reason) — some other mechanism might serve the client's actual goal better than a mobile app with push notifications.` },
      { letter: "B", text: `The analyst should have asked for a signed contract before proceeding, since wants are not legally binding.`, rationale: `pulls in an unrelated concern (contracts/specification documents) that has nothing to do with the want/need gap being tested.` },
      { letter: "C", text: `The analyst was right to proceed immediately, since "mobile app with push notifications" is already specific enough to count as a fully elicited need.`, rationale: `mistakes specificity/detail of a request for it being an underlying need — a want can be very specific and still not be a need.` },
      { letter: "D", text: `The criticism is that push notifications is a nonfunctional requirement being misclassified as functional.`, rationale: `substitutes a different distinction (functional/nonfunctional) for the one actually at issue.` },
    ],
    "A"
  ),
  mcq(
    "U1-M05b", 1, 1.5, "wants-and-needs.md",
    `A requirements document states: "The system shall let managers approve expense reports." It says nothing about who can see rejected reports, because everyone on the team simply assumed "obviously only the manager and the submitter." Using the implicit/explicit distinction, what is the risk here?`,
    [
      { letter: "A", text: `The visibility rule is an implicit assumption (not directly expressed), so it is invisible to anyone outside the room who didn't share it — a new team member or auditor has no documentation to correct a different interpretation.` },
      { letter: "B", text: `There is no risk, because implicit assumptions are automatically carried forward correctly as long as the original team stays on the project.`, rationale: `treats implicit/tacit knowledge as durable and self-propagating, when the note's point is the opposite — it is invisible to anyone who wasn't there.` },
      { letter: "C", text: `The risk is that expense approval is a want, not a need, so it may not reflect the real business reason.`, rationale: `conflates the implicit/explicit distinction with the separate wants/needs distinction from the same note.` },
      { letter: "D", text: `This is purely a documentation-formatting issue with no bearing on what gets built, since developers will "just know" the sensible default.`, rationale: `assumes shared tacit assumptions reliably transfer into implementation, the exact risk the scenario is built to expose.` },
    ],
    "A"
  ),
  mcq(
    "U1-M06a", 1, 2, "software-process-activities.md",
    `A junior developer says: "Deployment must be one of the 'Modeling' activities, since you have to model how the release will roll out before deploying." Evaluate.`,
    [
      { letter: "A", text: `Wrong — Deployment is its own separate one of the five generic activities; Modeling specifically bundles analysis of requirements and design, not release rollout planning.` },
      { letter: "B", text: `Correct — release rollout planning is a form of design, so it belongs inside Modeling.`, rationale: `stretches "Modeling" to absorb any planning-flavored work, when Modeling is specifically analysis-of-requirements + design.` },
      { letter: "C", text: `Correct — Deployment doesn't exist as a named activity at all; it's folded into Construction alongside coding and testing.`, rationale: `misremembers which activities are fused — Construction fuses code generation and testing, not deployment.` },
      { letter: "D", text: `It depends on the lifecycle model — in agile, Deployment is a phase, but in waterfall it is part of Modeling.`, rationale: `treats the five generic activities as lifecycle-model-dependent, when the note states the same five appear in both waterfall and agile.` },
    ],
    "A"
  ),
  mcq(
    "U1-M06b", 1, 2, "software-process-activities.md",
    `In an agile team with no formal "business analyst" title, a senior developer regularly translates the product owner's vision into detailed acceptance criteria the rest of the team can build from. Using the building-analogy framing, what role is this developer filling?`,
    [
      { letter: "A", text: `The architect role — bridging the buyer's (product owner's) vision, held at a different level of abstraction, into the detail the constructors (developers) need; the role is structural and doesn't disappear just because nobody carries that job title.` },
      { letter: "B", text: `The constructor role, since they are still a developer writing code.`, rationale: `defines role by job title/function performed elsewhere, rather than by which function (bridging) is actually being performed right now.` },
      { letter: "C", text: `No equivalent role — agile teams talk to the client directly and therefore don't need an architect-type bridge.`, rationale: `assumes direct client conversation alone eliminates the need for translation into buildable detail — conversation without a bridging function still requires someone to convert vision into detail.` },
      { letter: "D", text: `The buyer role, since they are closest to the product owner.`, rationale: `confuses physical/organizational closeness to the product owner with performing the product owner's (buyer's) function.` },
    ],
    "A"
  ),
  mcq(
    "U1-M07a", 1, 1.5, "software-deterioration.md",
    `A legacy inventory-tracking script has run unmodified for six years on the same server, OS, and hardware. A new engineer assumes it "must be less reliable by now, just from age." Evaluate this assumption.`,
    [
      { letter: "A", text: `Mistaken — deterioration is caused by modification, not time or use; with zero change events, the failure rate should remain flat, unlike hardware's bathtub-curve wear.` },
      { letter: "B", text: `Correct — all software, like hardware, degrades under the bathtub curve as it ages.`, rationale: `imports the hardware bathtub-curve wear-out mechanism into software, which the note explicitly rejects for unmodified code.` },
      { letter: "C", text: `Correct, but only because six years is long enough for the underlying hardware components to fail, which counts as software deterioration too.`, rationale: `still attributes failure-rate rise to age/time via a roundabout hardware argument, missing that the note is about the software artifact, not physical components.` },
      { letter: "D", text: `Irrelevant — unmodified scripts are automatically excluded from the software life-cycle.`, rationale: `invents a rule with no basis in the note.` },
    ],
    "A"
  ),
  mcq(
    "U1-M07b", 1, 2, "software-deterioration.md",
    `A team observes that after each of their last five patches, the bug count doesn't return to its pre-patch baseline — it settles a bit higher each time, producing a rising staircase over a year of releases. Which best explains this?`,
    [
      { letter: "A", text: `This matches the actual (not idealized) deterioration curve — each modification introduces side effects, so the failure rate steps upward with each change event and never fully returns to its prior level.` },
      { letter: "B", text: `This is data drift, since the failure rate is rising over time.`, rationale: `mislabels ordinary change-driven step-up as drift; drift specifically requires zero change events, and this scenario has five patches.` },
      { letter: "C", text: `This shows the idealized curve in action, since bugs are being fixed with each patch.`, rationale: `mistakes "some bugs got fixed" for the idealized curve's full return to a flat baseline — the actual curve never fully recovers.` },
      { letter: "D", text: `This is unexplained by the note — deterioration only refers to hardware.`, rationale: `denies the note's applicability to software changes at all, when this is precisely the actual-curve mechanism the note describes.` },
    ],
    "A"
  ),
  mcq(
    "U1-M08a", 1, 2, "umbrella-activities.md",
    `A team schedules "Software Quality Assurance" as a two-day block that happens only right before each release. What is wrong with this, per the distinction between umbrella activities and process activities?`,
    [
      { letter: "A", text: `SQA is an umbrella activity meant to run continuously across the entire process — scheduling it as a single pre-release block treats it like a sequential process activity, misapplying its structural role.` },
      { letter: "B", text: `Nothing is wrong — SQA is inherently a late-stage activity since quality can only be assessed once the product is nearly finished.`, rationale: `treats quality assurance as necessarily end-loaded, the exact positional error the note argues against.` },
      { letter: "C", text: `The only problem is that two days is too short a duration, not that it's scheduled at one point.`, rationale: `misdiagnoses a structural/positional problem as merely a duration problem.` },
      { letter: "D", text: `SQA should instead be merged into the Construction process activity, since testing already happens there.`, rationale: `conflates umbrella-activity SQA (covers the whole process) with the testing sub-part of Construction (covers code only).` },
    ],
    "A"
  ),
  mcq(
    "U1-M08b", 1, 2, "umbrella-activities.md",
    `A company argues: "We don't need a dedicated reusability-management effort — we already have a 'Component Design' step where reusable modules get identified." What's the flaw, per how umbrella activities work?`,
    [
      { letter: "A", text: `Reusability management is meant to run continuously across the whole process, not be confined to one step — collapsing it into Component Design reproduces the "documentation phase" error of treating a continuous concern as a single positional step.` },
      { letter: "B", text: `There is no flaw — reusability is naturally a design-time concern, so folding it into Component Design is the correct structural placement.`, rationale: `assumes umbrella activities can be correctly collapsed into whichever process activity seems topically related, missing their continuous nature.` },
      { letter: "C", text: `The flaw is that Component Design isn't one of the five process activities, so it can't host any activity at all.`, rationale: `fixates on naming/labeling rather than the continuous-vs-positional structural argument being tested.` },
      { letter: "D", text: `The flaw is that reusability management belongs in Deployment, not Design.`, rationale: `reassigns the activity to a different single position instead of recognizing it should run continuously.` },
    ],
    "A"
  ),
  mcq(
    "U1-M09a", 1, 2, "output-and-outcome.md",
    `A nonprofit builds and ships a volunteer-scheduling app on time and on budget (the output). One year later, volunteer no-show rates are unchanged. Which statement best applies the output/outcome distinction?`,
    [
      { letter: "A", text: `The output (a working, delivered app) was achieved, but the outcome (fewer no-shows) was not — and because project reporting typically counts outputs, this project could still be reported as "successful" despite achieving nothing of what it was meant to change.` },
      { letter: "B", text: `Since the outcome wasn't achieved, the output must have had a defect — a working app should have produced the outcome automatically.`, rationale: `assumes outputs directly control outcomes rather than merely influencing them — a working app does not automatically produce behavior change.` },
      { letter: "C", text: `Outputs and outcomes are the same measurement here, just reported at different times, so this is really one failure, not two.`, rationale: `collapses two distinct concepts (output, outcome) into one measurement.` },
      { letter: "D", text: `The project failed at the output level, since delivering software that doesn't change behavior isn't really "delivered."`, rationale: `silently redefines "output" to secretly include outcome achievement, erasing the distinction the item is testing.` },
    ],
    "A"
  ),
  mcq(
    "U1-M09b", 1, 2, "output-and-outcome.md",
    `A CFO asks why the quarterly report only shows "features shipped" and "story points completed," with no mention of whether customer retention improved. What does the note suggest is the most likely reason?`,
    [
      { letter: "A", text: `Project reporting almost always measures outputs because they are countable, while outcomes require someone to have explicitly defined and tracked them — the report's silence on retention likely means the outcome was never defined as a target.` },
      { letter: "B", text: `Outcomes cannot be measured in principle, so no report could ever include them.`, rationale: `treats outcomes as fundamentally unmeasurable in principle, rather than merely requiring deliberate definition and tracking, unlike outputs.` },
      { letter: "C", text: `The report is complete, since story points already capture the value delivered to customers.`, rationale: `treats an output metric (story points) as if it were an outcome metric (retention).` },
      { letter: "D", text: `This is a wants-vs-needs problem, not an output-vs-outcome one.`, rationale: `misapplies a different note's distinction (wants/needs) to a scenario about output/outcome.` },
    ],
    "A"
  ),

  written(
    "U1-W01", 1, 12, "software-deterioration.md",
    `A fintech company's fraud-scoring model has run in production for five months with zero code deployments and zero retraining — the exact same weights, same feature pipeline, same everything. Over that period, its false-negative rate (missed fraud) has crept up by 30%. A junior engineer says, "This must be the same deterioration process as our monolith's API gateway, which also gets less reliable the longer it runs without a redeploy." Predict whether the fraud model's degradation follows the same mechanism as the API gateway's, and explain precisely why or why not, using the exact distinction the note draws.`,
    `The API gateway's degradation (if it is genuine deterioration) traces to actual modification events — each redeploy/patch stepping the failure rate up per the actual-vs-idealized curve; untouched code should stay flat. The fraud model's rise, with literally zero change events, is not ordinary deterioration — it is the note's own named exception, data drift, where the world moves away from the training distribution while the artifact itself never changes. The answer must state the zero-change-events criterion explicitly as the diagnostic difference, not merely assert "they're different."`,
    `Accepting the junior engineer's analogy because both look like "gets worse the longer it runs," missing that the gateway's case (if real) requires an actual modification history to explain, while the model's case explicitly has none.`,
    `−5 to −10 for agreeing the two follow "the same process." +15–20 requires naming the zero-change-events criterion explicitly and connecting the model's case to data drift by name.`
  ),
  written(
    "U1-W02", 1, 12, "umbrella-activities.md",
    `A project manager announces a new policy: "Risk management is basically just planning wearing a different hat — we already do planning once at project kickoff, so we'll fold 'risk review' into that same kickoff meeting and not revisit it." Justify or refute this policy using the distinction between umbrella activities and process activities.`,
    `Refute. Risk management is one of the eight umbrella activities, meant to run continuously across the entire process, not sit at a single point the way a process activity does. Folding risk review into one kickoff meeting collapses a continuous concern into a single positional slot — the same structural error the note flags for documentation being wrongly treated as a "phase." New risks emerge at every later stage (design, implementation, integration), and a one-time review at kickoff cannot catch them.`,
    `Accepting "risk management is just planning" at face value because both involve looking ahead, missing that Planning (a process activity) and Risk Management (an umbrella activity) belong to different structural categories — one is sequenced early, the other runs throughout.`,
    `−5 to −10 for endorsing the policy as reasonable. +15–20 requires explicitly invoking the continuous/umbrella vs. positional/process-activity distinction, not just "risks can appear later."`
  ),
  written(
    "U1-W03", 1, 10, "output-and-outcome.md",
    `A university IT department spends a semester building and launching a new online course-registration portal (the output). Two years later, average time-to-register per student is unchanged, and complaints about registration difficulty are the same as before the portal existed. A dean says, "That's fine — the portal itself was delivered exactly to spec, on time, so this was a successful project regardless of what happened to registration times." Justify or refute the dean's claim using the output/outcome distinction, and explain why measuring only delivery-to-spec would make this project look successful.`,
    `Refute, as a definition of overall project success (the output claim itself may be true). The portal (output) was delivered as planned, but the outcome (faster/easier registration) was never achieved — delivering the former is not evidence of the latter. Must explain the measurement-bias mechanism: project reporting counts outputs because they're countable (built, on time, on spec), while the outcome requires someone to have defined and tracked it — so "successful" by output metrics can coexist with total outcome failure.`,
    `Accepting the dean's framing because "delivered to spec" sounds like a complete definition of success, missing that spec-conformance is an output claim, not an outcome claim.`,
    `−5 to −10 for agreeing the project is unambiguously successful. +15–20 requires the explicit output/outcome separation plus the "countable, so it's what gets measured" mechanism.`
  ),

  // ===================== Unit 2 — Life-Cycle Models =====================
  mcq(
    "U2-M01", 2, 1.5, "software-life-cycle.md",
    `A team is debating when their new expense-report web app's "software life-cycle" began. One member says, "It began the day the app was deployed to production, since before that it wasn't really software yet." Evaluate using the note's definition.`,
    [
      { letter: "A", text: `Wrong — the life-cycle is defined as beginning when the product is conceived, not when it is deployed; conception, design, and construction all occur before delivery and are already part of the life-cycle.` },
      { letter: "B", text: `Correct — a life-cycle only exists once a product is in active use.`, rationale: `assumes a life-cycle only exists during active use, ignoring conception, design, and construction stages that precede deployment.` },
      { letter: "C", text: `Correct, but only because "production" specifically marks the boundary between development and maintenance, which is where the life-cycle truly starts.`, rationale: `relocates the life-cycle's start to the dev/maintenance boundary rather than conception, the note's actual anchor point.` },
      { letter: "D", text: `The life-cycle actually begins at retirement planning, since that is when the organization first commits to eventually decommissioning it.`, rationale: `invents an unrelated starting criterion (retirement planning intent).` },
    ],
    "A"
  ),
  mcq(
    "U2-M02", 2, 2, "waterfall-life-cycle-model.md",
    `A team's waterfall process allows returning to the Design phase if Implementation reveals a design flaw, and they conclude: "Since we can loop back, our process is both iterative and incremental." Evaluate.`,
    [
      { letter: "A", text: `Only half right — feedback loops make it iterative (you may return to an earlier phase), but incremental requires successive working deliveries, and this team still delivers the product once at the end; looping back on its own does not establish incrementality.` },
      { letter: "B", text: `Fully correct — any feedback loop automatically satisfies both properties.`, rationale: `treats any feedback loop as automatically sufficient for both properties, collapsing two independently-defined properties into one.` },
      { letter: "C", text: `Fully incorrect — feedback loops don't make waterfall iterative either, since "iterative" requires an agile-labeled process.`, rationale: `denies waterfall's feedback loops count as iterative at all, contradicting the note's explicit statement that waterfall is "iterative through feedback loops."` },
      { letter: "D", text: `The team is incremental but not iterative, since delivering once is definitionally incremental.`, rationale: `mislabels "delivers once" as "definitionally incremental" — it is the opposite; incremental requires multiple working deliveries.` },
    ],
    "A"
  ),
  mcq(
    "U2-M03", 2, 1.5, "cost-of-correcting-faults.md",
    `A team catches a wording ambiguity in the SRS the day after client sign-off, before design work starts, and fixes it by editing the document. A separate team catches an equally serious requirements ambiguity only after the product has shipped, and must patch code, retest, and redistribute to all client sites. Why does the second fix cost so much more, per the note?`,
    [
      { letter: "A", text: `The cost of detecting and correcting a fault rises steeply with the phase in which it's found — early, it's usually just a document change; late, it requires changing code and documentation, testing the change, regression testing, and reinstalling at every site.` },
      { letter: "B", text: `The second team's fault must have been more severe in nature, since minor faults never require regression testing.`, rationale: `invents an unrelated severity criterion not tied to phase-of-detection.` },
      { letter: "C", text: `The cost difference is purely about team size — larger teams take longer to fix anything, regardless of phase.`, rationale: `substitutes team size for phase-of-detection as the cost driver.` },
      { letter: "D", text: `There is no real cost difference; the second team's overhead is bureaucratic overhead unrelated to when the fault was found.`, rationale: `denies there is a real cost mechanism at all, missing the note's central claim.` },
    ],
    "A"
  ),
  mcq(
    "U2-M04", 2, 2, "problems-with-the-waterfall-model.md",
    `A consultant tells a bank building a one-off, legally-fixed regulatory report generator (format frozen by law, no future changes expected) that they must abandon waterfall because "waterfall is fundamentally broken." Evaluate using the note's own conditions for when waterfall is suitable.`,
    [
      { letter: "A", text: `Waterfall's problems stem from its two assumptions failing (fixed-in-advance specification, no later changes) — this project's requirements genuinely are fixed and unlikely to change, exactly the condition under which the note says waterfall is suitable; "fundamentally broken" is an overreach.` },
      { letter: "B", text: `Correct — the note states waterfall should never be used under any circumstances today.`, rationale: `overstates the note's position into a blanket ban, when the note explicitly asks "what is it suitable for?" and answers with conditions.` },
      { letter: "C", text: `Correct, but only because banks are always high-risk, safety-critical environments where waterfall is banned.`, rationale: `substitutes an unrelated generalization (banks = always high-risk) for the actual criterion (fixed vs. changing specification).` },
      { letter: "D", text: `Waterfall is unsuitable here specifically because it lacks a testing phase, unrelated to whether specifications are fixed.`, rationale: `introduces an unrelated critique (no testing phase) not connected to the fixed-specification condition being tested.` },
    ],
    "A"
  ),
  mcq(
    "U2-M05", 2, 2, "rapid-prototyping-model.md",
    `A team builds a rapid prototype of a booking UI, gets client feedback, refines it, discards the prototype, and builds the real system once from the refined spec. A stakeholder claims: "Because a working prototype existed early, this project was delivered incrementally." Evaluate.`,
    [
      { letter: "A", text: `Incorrect — rapid prototyping is still a linear model; the prototype is a communication device attacking "validation only at the end," not a shipped release, so one real product is still delivered once at the end.` },
      { letter: "B", text: `Correct — any early working software counts as an increment regardless of whether it's kept or shipped.`, rationale: `redefines "increment" to include any discarded early artifact, erasing the shipped-vs-discarded distinction the note relies on.` },
      { letter: "C", text: `Correct, because the spiral model (which rapid prototyping feeds into) is inherently incremental.`, rationale: `misattributes incrementality to the spiral model via an unrelated inheritance claim.` },
      { letter: "D", text: `Incorrect, but only because the prototype wasn't shown to the client early enough to count.`, rationale: `accepts the incremental framing and only disputes timing, missing that the core problem is the prototype being discarded, not when it was shown.` },
    ],
    "A"
  ),
  mcq(
    "U2-M06", 2, 1.5, "spiral-model.md",
    `A team building a small, low-risk internal reporting tool with a tight budget insists on using the full spiral model "because it's the most rigorous option available." Evaluate against the model's stated strengths/weaknesses.`,
    [
      { letter: "A", text: `Poor fit — the spiral model suits large-scale, complex software where risk-handling value offsets its expense and complexity; for a small, low-risk, tight-budget tool, the added cost isn't offset by any real risk to manage.` },
      { letter: "B", text: `Good fit — the spiral model is always the best choice regardless of project size, since more rigor is never wasted.`, rationale: `treats the spiral model as universally optimal regardless of project fit, contradicting the note's explicit strengths/weaknesses framing.` },
      { letter: "C", text: `Good fit, because risk analysis is cheap and has no real cost implications.`, rationale: `denies the spiral model has real cost/complexity weaknesses, which the note states directly.` },
      { letter: "D", text: `Poor fit, but only because the spiral model is exclusively for AI-enabled software.`, rationale: `invents an unrelated restriction (AI-only applicability) not in the note.` },
    ],
    "A"
  ),
  mcq(
    "U2-M07", 2, 1.5, "code-and-fix-model.md",
    `An analyst writes an undesigned, unspecified script to answer one ad hoc question from a dataset, gets the answer, and deletes the script the same day. Was this a defensible use of code-and-fix?`,
    [
      { letter: "A", text: `Yes — it was a genuine 1-shot use with no maintenance stage entered; code-and-fix is "the easiest way," and the "most expensive way" cost only accrues once a maintenance phase begins, which never happened here.` },
      { letter: "B", text: `No — code-and-fix is never defensible under any circumstances, since it always produces a maintenance nightmare.`, rationale: `overgeneralizes "most expensive way" into "never defensible," ignoring the note's explicit 1-shot exception.` },
      { letter: "C", text: `No — writing code without a design is itself the failure mode, regardless of whether the code is kept afterward.`, rationale: `locates the failure mode in the act of skipping design itself, rather than in keeping undesigned code around for maintenance, which is the note's actual distinction.` },
      { letter: "D", text: `Yes, but only because the analyst was experienced enough to avoid mistakes.`, rationale: `substitutes programmer skill for the actual discriminator (whether a maintenance phase was entered).` },
    ],
    "A"
  ),
  mcq(
    "U2-M08", 2, 2, "millers-law-and-stepwise-refinement.md",
    `A designer, applying "postpone decisions as to details as late as possible," decides to leave the error-handling behavior of a checkout flow completely unspecified indefinitely, with no plan to revisit it, reasoning "that's just postponing details." Evaluate.`,
    [
      { letter: "A", text: `Misapplication — stepwise refinement postpones (reorders) work, it does not drop it; every aspect must eventually be handled, just not first, so leaving error handling permanently unspecified is skipping, not postponing.` },
      { letter: "B", text: `Correct application — postponing indefinitely is exactly what "as late as possible" means.`, rationale: `treats "as late as possible" as license for indefinite/permanent deferral, rather than reordering with a guarantee of eventual handling.` },
      { letter: "C", text: `Correct application, since Miller's Law only limits the number of chunks handled at once, not whether all chunks are eventually handled.`, rationale: `misreads Miller's Law as being only about simultaneity, ignoring stepwise refinement's explicit "every aspect is eventually handled" requirement.` },
      { letter: "D", text: `Misapplication, but only because error handling should have been handled first, not last.`, rationale: `accepts the misapplication framing but for the wrong reason (sequencing preference rather than the postpone-vs-skip distinction).` },
    ],
    "A"
  ),
  mcq(
    "U2-M09", 2, 2, "open-source-life-cycle-model.md",
    `A closed-source vendor's user reports "the app crashes when exporting large files" but can say nothing more specific. Why can't this user produce more detail, per the note?`,
    [
      { letter: "A", text: `Closed-source users can only submit failure reports because they lack access to the source code — they can observe symptoms but cannot identify the flaw or propose a fix, unlike open-source peripheral-group users who can read the source.` },
      { letter: "B", text: `The user simply isn't technical enough; any user, closed- or open-source, could identify the exact flaw with enough effort.`, rationale: `denies the structural source-access barrier, framing it as a skill issue instead.` },
      { letter: "C", text: `This is a training gap on the vendor's part, unrelated to source availability.`, rationale: `substitutes an unrelated explanation (training gap) for the actual mechanism (no source access).` },
      { letter: "D", text: `Closed-source software is inherently buggier, which is why reports are vaguer.`, rationale: `substitutes an unrelated generalization about code quality for the actual mechanism.` },
    ],
    "A"
  ),
  mcq(
    "U2-M10a", 2, 1.5, "agile-manifesto.md",
    `A team writes zero documentation and refuses to sign any contract with clients, saying "the Manifesto values working software over documentation and customer collaboration over contract negotiation, so both are worthless to us." Evaluate against the manifesto's closing sentence.`,
    [
      { letter: "A", text: `Misreads the manifesto — the closing sentence explicitly states items on the right (documentation, contracts) still have value; they simply lose when they conflict with the item on the left, not that they should be discarded entirely.` },
      { letter: "B", text: `Correct reading — the manifesto explicitly instructs teams to eliminate documentation and contracts.`, rationale: `reads the manifesto as an elimination mandate rather than a tie-breaking preference, contradicting its closing sentence.` },
      { letter: "C", text: `Correct, since "customer collaboration over contract negotiation" specifically forbids ever having a contract.`, rationale: `over-extends "customer collaboration over contract negotiation" into an absolute prohibition on contracts.` },
      { letter: "D", text: `Misreads it, but only because working software should also be avoided in favor of documentation.`, rationale: `inverts the manifesto's actual preference ordering.` },
    ],
    "A"
  ),
  mcq(
    "U2-M10b", 2, 1.5, "agile-manifesto.md",
    `A student writes: "There are five major lifecycle models covered in this course: waterfall, spiral, rapid prototyping, iterative-and-incremental, and Agile." Evaluate this list against how the note frames Agile.`,
    [
      { letter: "A", text: `The list miscounts — Agile is presented as a property of IID (following from iteration and incrementation), not a separate standalone lifecycle model that stands beside IID.` },
      { letter: "B", text: `The list is correct as given; Agile is fully independent of IID.`, rationale: `denies the note's explicit framing of Agile as a property of IID rather than an independent model.` },
      { letter: "C", text: `The list undercounts — Agile should be split into two separate models, Scrum and Kanban.`, rationale: `introduces an unrelated, more granular taxonomy (Scrum/Kanban) not discussed in the note.` },
      { letter: "D", text: `The list is correct, but Agile should replace waterfall in the list rather than being added to it.`, rationale: `accepts the flawed premise that Agile belongs in a list of standalone lifecycle models, just relocating it within that flawed list.` },
    ],
    "A"
  ),
  mcq(
    "U2-M11a", 2, 1.5, "fault-failure-and-defect-terminology.md",
    `Code contains \`price = items[index].cost;\` where \`index\` can go out of bounds under a rare combination of cart-modification actions no tester anticipated. In production this eventually throws an out-of-range exception for one customer. Using the mistake→fault→failure chain, which best labels the fault?`,
    [
      { letter: "A", text: `The fault is the missing bounds check sitting in the code (a flaw in the artifact); the mistake was the developer not considering the rare cart-modification sequence; the failure is the observable exception when that sequence executes.` },
      { letter: "B", text: `The fault is the exception itself, since that's what "faulty" means in practice.`, rationale: `conflates fault and failure — the classic terminology error the note is built to prevent.` },
      { letter: "C", text: `The fault is the customer's unusual cart-modification sequence, since that's what triggered the problem.`, rationale: `misattributes the fault to the triggering input/user action rather than the code flaw that should have handled it.` },
      { letter: "D", text: `There is no fault here, only a failure, since the code worked correctly for all previously tested cases.`, rationale: `denies any fault exists on the grounds that prior tests passed, missing that an unexecuted-path fault is still a fault.` },
    ],
    "A"
  ),
  mcq(
    "U2-M11b", 2, 2, "fault-failure-and-defect-terminology.md",
    `A resume-screening model performs poorly on applicants with employment gaps, not because of any bug in the inference code, but because the historical hiring data it trained on reflected biased past decisions against such applicants. Where does the "fault" live, per the AI touchpoint?`,
    [
      { letter: "A", text: `In the training data (one of the three AI-specific fault locations named by the note) — not in any line of the inference code, which executes exactly as written; this is a failure with no fault in the code at all.` },
      { letter: "B", text: `In the inference code's decision logic, since that's ultimately what produces the biased output.`, rationale: `looks for a code-level bug when the note's AI touchpoint specifically locates this fault type in training data, not inference logic.` },
      { letter: "C", text: `There is no fault anywhere, since the model is technically "functioning as designed."`, rationale: `denies any fault exists because the system runs without exceptions, missing that a failure can exist with no code-level fault.` },
      { letter: "D", text: `In the deployment infrastructure, since that's what serves the model's predictions to users.`, rationale: `misattributes the fault to infrastructure, an unrelated component.` },
    ],
    "A"
  ),
  mcq(
    "U2-M12a", 2, 2, "modern-maintenance-definition.md",
    `A team says: "We haven't started maintenance on our new CRM yet — it doesn't go live until next month." They are currently, this week, fixing a bug found during internal beta testing, three weeks before release. Evaluate their claim under the ISO/IEC 1995 definition.`,
    [
      { letter: "A", text: `Wrong as stated — modern maintenance occurs whenever software is modified because of a problem, regardless of whether this happens before or after installation; fixing this bug right now is maintenance under the 1995 definition, even though it isn't yet "postdelivery maintenance" under the older IEEE 1990 term.` },
      { letter: "B", text: `Correct — maintenance by definition cannot begin before a product goes live.`, rationale: `reapplies the classical, temporal (before/after delivery) boundary that the 1995 redefinition explicitly replaced with a cause-based one.` },
      { letter: "C", text: `Correct, since "maintenance" and "postdelivery maintenance" are synonyms and neither can apply pre-release.`, rationale: `reapplies the classical, temporal (before/after delivery) boundary that the 1995 redefinition explicitly replaced with a cause-based one.` },
      { letter: "D", text: `Correct, because fixing a bug found in beta testing counts as development, not maintenance, under any definition.`, rationale: `reapplies the classical, temporal (before/after delivery) boundary that the 1995 redefinition explicitly replaced with a cause-based one.` },
    ],
    "A"
  ),
  mcq(
    "U2-M12b", 2, 2, "modern-maintenance-definition.md",
    `A vendor's pricing page says: "Our support and maintenance plan begins the day your license goes live." A customer complains this contradicts what they learned about the ISO/IEC 1995 definition of maintenance. Which best resolves the apparent conflict?`,
    [
      { letter: "A", text: `No real contradiction — the vendor is describing a commercial support/postdelivery-maintenance offering (a business term tied to delivery), not redefining the general engineering concept of maintenance, which under ISO/IEC 1995 can occur at any time software is modified for a problem or improvement, before or after delivery.` },
      { letter: "B", text: `There is a contradiction, and the vendor's pricing page is technically incorrect according to the 1995 definition.`, rationale: `assumes a commercial support-plan term must exactly track the engineering definition's full scope, which the note does not require.` },
      { letter: "C", text: `There is no contradiction because "maintenance" always meant "after delivery" and the 1995 redefinition never happened.`, rationale: `denies the 1995 redefinition occurred at all.` },
      { letter: "D", text: `The customer is right to complain, since a vendor's support plan must exactly match the ISO/IEC 1995 definition's scope to be valid.`, rationale: `treats a vendor's business terminology choice as if it were an engineering-definition violation.` },
    ],
    "A"
  ),
  mcq(
    "U2-M13a", 2, 1.5, "types-of-maintenance.md",
    `A healthcare system's software is modified because a state regulator now mandates a new, additional patient-consent field before booking any procedure — nothing was broken, and the vendor didn't propose it. Classify this change.`,
    [
      { letter: "A", text: `Adaptive — triggered by a change in the environment the product operates in (a new regulatory requirement), not a fault (nothing was broken) and not perfective (the vendor didn't choose it for its own sake).` },
      { letter: "B", text: `Corrective — since a defect report might exist somewhere about missing consent tracking.`, rationale: `labels it corrective without any actual fault/defect report behind it.` },
      { letter: "C", text: `Perfective — since it improves the system's compliance posture.`, rationale: `labels it perfective, missing that the change was imposed by an external regulator, not chosen freely by the vendor.` },
      { letter: "D", text: `It cannot be classified as any of the three, since regulatory changes are a separate fourth category.`, rationale: `invents a nonexistent fourth category.` },
    ],
    "A"
  ),
  mcq(
    "U2-M13b", 2, 2.5, "types-of-maintenance.md",
    `A shipping company's system is changed so package-tracking updates refresh every 5 seconds instead of every 60, purely because the product team decided faster updates would delight customers — no external requirement forced it. Separately, the same system is changed because a partner carrier discontinued a tracking-number format the system was built to parse. A junior engineer says: "Both are adaptive, since neither has a defect report behind it." Evaluate.`,
    [
      { letter: "A", text: `Wrong — "no defect report" only rules out corrective maintenance, it doesn't discriminate perfective from adaptive; the refresh-rate change is perfective (the team wanted it better, nothing external forced it), while the tracking-format change is adaptive (the world — the carrier — forced it).` },
      { letter: "B", text: `Correct — since neither change involved fixing a fault, both are necessarily adaptive.`, rationale: `uses "no defect report" as sufficient for "adaptive," when it only rules out corrective — the actual perfective/adaptive test is want-vs-forced.` },
      { letter: "C", text: `Correct — since both changes involve external systems (carriers, customers), both are adaptive by definition.`, rationale: `assumes any involvement of an external system automatically makes a change adaptive, ignoring that the refresh-rate change was purely self-motivated.` },
      { letter: "D", text: `The refresh-rate change is adaptive and the tracking-format change is perfective — the reverse of the correct classification.`, rationale: `reverses the correct classification of the two changes.` },
    ],
    "A"
  ),
  mcq(
    "U2-M14a", 2, 2, "software-engineering-code-of-ethics.md",
    `A senior engineer says: "Principle 3 (PRODUCT) is the most important one — as long as the product meets the highest professional standards, the other principles are secondary." Evaluate using the ordering and qualifying language of the code.`,
    [
      { letter: "A", text: `Wrong — PUBLIC is listed first and unqualified, and CLIENT AND EMPLOYER is explicitly subordinated to it ("consistent with the public interest"); no principle in the code is framed as senior to Principle 1, and product quality does not override public-interest concerns.` },
      { letter: "B", text: `Correct — the code explicitly ranks PRODUCT above PUBLIC.`, rationale: `inverts the code's actual ordering, which places PUBLIC first and unqualified.` },
      { letter: "C", text: `Correct, since a professionally excellent product automatically satisfies the public interest by definition.`, rationale: `assumes professional/technical excellence automatically satisfies a separate ethical criterion (public interest) without argument.` },
      { letter: "D", text: `Incorrect, but only because MANAGEMENT (Principle 5), not PUBLIC, is actually first in the code's stated priority.`, rationale: `substitutes an unrelated principle (MANAGEMENT) for the one actually listed first.` },
    ],
    "A"
  ),
  mcq(
    "U2-M14b", 2, 2, "software-engineering-code-of-ethics.md",
    `In the KMUTT Health Centre case, after the lead's "we'll look at that later" response was never written down and no action was recorded, which of N.'s subsequent behaviors most directly violates Principle 4 (JUDGEMENT)?`,
    [
      { letter: "A", text: `Not re-raising or documenting the concern after it was dropped — Principle 4's independence-of-judgment requirement means not deferring indefinitely to an informal, unrecorded dismissal once she had reason to believe a real, unaddressed issue existed.` },
      { letter: "B", text: `Attending the review meeting in the first place, since raising it there was itself the violation.`, rationale: `misidentifies raising the concern (the correct first step) as itself the violation.` },
      { letter: "C", text: `Not personally overriding the lead's decision and shipping a patched model herself without authorization.`, rationale: `proposes an extreme unauthorized action not supported by the principles, which call for judgment and escalation, not unilateral override.` },
      { letter: "D", text: `Not reporting the lead directly to the regulator before the system went live.`, rationale: `jumps to an extreme external-reporting action without the intermediate documentation/escalation steps the principles actually call for.` },
    ],
    "A"
  ),
  mcq(
    "U2-M15a", 2, 1.5, "iterative-and-incremental-development.md",
    `A team ships v1 of a note-taking app with just note creation and viewing. Sprint 2 adds tagging (a new capability nobody had before); sprint 3 adds search (another new capability). Which property does this sequence best demonstrate?`,
    [
      { letter: "A", text: `Incremental — new pieces of functionality (tagging, then search) are added over successive cycles, each a genuinely new capability layered onto what existed before.` },
      { letter: "B", text: `Iterative — because the app is being repeated across sprints.`, rationale: `mislabels new-capability delivery as "iterative" rather than "incremental."` },
      { letter: "C", text: `Neither, since only one thing (the app) is changing across sprints.`, rationale: `denies incrementation is occurring despite clearly new capabilities being added each sprint.` },
      { letter: "D", text: `Both properties simultaneously and identically, since iteration and incrementation always occur together by definition.`, rationale: `assumes the two properties are inseparable, contradicting the note's explicit statement that they are two different properties.` },
    ],
    "A"
  ),
  mcq(
    "U2-M15b", 2, 2, "iterative-and-incremental-development.md",
    `A recommendation-systems team runs weekly retraining cycles for three months, each cycle tweaking features and hyperparameters and producing a small offline metric improvement — but the model behind the live recommendation widget hasn't changed since month one, because nobody has deployed any of the retrained versions. Diagnose this.`,
    [
      { letter: "A", text: `Iteration with no increments — heavy genuine iteration (each retrained version gets closer to a target) but zero incrementation, since nothing new has actually been delivered to users; this is the specific ML failure mode the note warns about.` },
      { letter: "B", text: `This is healthy IID, since iteration is explicitly one of IID's named strengths.`, rationale: `mistakes heavy iteration alone for "healthy IID," ignoring that IID's value depends on incrementation (working versions reaching users) too.` },
      { letter: "C", text: `This is incremental development, since a new model version exists each week.`, rationale: `mistakes the existence of a new model artifact for a shipped increment, when nothing has been deployed to users.` },
      { letter: "D", text: `This is neither iterative nor incremental, since the live widget is unchanged.`, rationale: `denies the iteration is real despite genuine week-over-week refinement occurring.` },
    ],
    "A"
  ),
  mcq(
    "U2-M16a", 2, 2, "classical-waterfall-phases.md",
    `A project schedules a single "Documentation" phase at the very end, after Implementation, to "write up everything now that we know what was built." What's the specific structural problem with this, per the note?`,
    [
      { letter: "A", text: `Documentation must always be current — you cannot perform any phase without the previous phase's documentation already existing (e.g., you cannot implement without current design documents), so deferring all documentation to the end is structurally impossible to execute correctly, not just poorly scheduled.` },
      { letter: "B", text: `There is no real problem — documenting after implementation is more efficient since requirements may have changed.`, rationale: `treats a structural impossibility (can't implement without current design docs) as a mere efficiency trade-off.` },
      { letter: "C", text: `The only problem is that documentation should be written by a dedicated technical writer, not by developers.`, rationale: `substitutes an unrelated staffing concern (who writes docs) for the structural timing argument.` },
      { letter: "D", text: `The problem is that documentation should happen before Requirements, not after Implementation.`, rationale: `proposes an equally wrong single-position placement instead of recognizing documentation must be continuous.` },
    ],
    "A"
  ),
  mcq(
    "U2-M16b", 2, 2.5, "classical-waterfall-phases.md",
    `A team performs no testing until a single "Testing" phase at the end, and within that phase, they run both "does each component do what its own spec says" checks and "is this the right product for the client" checks on the same day, one after another. What does the note say is specifically wrong with bundling verification and validation like this at the very end?`,
    [
      { letter: "A", text: `Verification (checking each phase's own output against its spec) is supposed to happen at the end of each phase, not deferred entirely; validation (checking the whole product against client needs) happening only once, at the very end, means both catch their respective faults at the most expensive possible point.` },
      { letter: "B", text: `Nothing is wrong — verification and validation are the same activity performed at different scales, so testing them together is efficient.`, rationale: `denies verification and validation are distinct activities, when the note treats them as catching different fault classes at different points.` },
      { letter: "C", text: `The problem is only that validation was run after verification instead of before.`, rationale: `treats the problem as merely an ordering issue, missing that the core problem is both being deferred to one late point.` },
      { letter: "D", text: `The problem is that verification should be done by the client and validation by the developers, and this team had it backwards.`, rationale: `swaps who performs each activity, an unrelated and incorrect claim.` },
    ],
    "A"
  ),

  written(
    "U2-W01", 2, 12, "fault-failure-and-defect-terminology.md",
    `A logistics scheduling system computes \`etaMinutes = distanceKm / speedKmh * 60;\` where \`speedKmh\` is read from a live GPS feed and can legitimately be reported as exactly 0 when a vehicle is stationary at a red light. Using the mistake→fault→failure chain, identify the mistake, locate the fault, and describe precisely what the observable failure looks like — do not just say "the code crashes."`,
    `Mistake = the developer not considering that a stationary (speed = 0) vehicle is a legitimate real-world state the calculation must handle. Fault = the missing check/branch for \`speedKmh == 0\` sitting in the code as written. Failure = the observable wrong behavior when executed with speed = 0 — e.g., a division-by-zero exception crashing the ETA calculation, or (if the language doesn't throw) an Infinity/NaN value silently propagating into a downstream UI showing "ETA: Infinity minutes" or a scheduling algorithm that mis-sorts deliveries. The three terms must stay distinct, and the failure must be described more specifically than "it crashes."`,
    `Conflating fault and failure (calling the crash itself "the fault"), the classic terminology error the note is built to prevent.`,
    `−5 to −10 for conflating fault and failure. +15–20 requires all three terms kept distinct with a concrete failure description.`
  ),
  written(
    "U2-W02", 2, 12, "modern-maintenance-definition.md",
    `A startup's engineering handbook states: "We define 'maintenance' as anything that happens to the code after our first paying customer signs up — before that, it's all development." An engineer objects that this handbook definition doesn't match what they were taught. Justify or refute the objection using the modern (1995) ISO/IEC definition, and explain what the handbook's rule would need to say to align with it.`,
    `The objection is justified — the handbook's rule is a temporal (before/after a milestone) definition, exactly the classical model the 1995 redefinition replaced; it would incorrectly exclude a pre-signup bug fix or adaptive change from counting as maintenance. To align with ISO/IEC 1995, the handbook would need to define maintenance by cause (any modification made because of a problem or a need for improvement/adaptation), applicable at any time, not by a before/after boundary tied to the first customer.`,
    `Accepting the handbook's before/after milestone framing as reasonable because it superficially resembles "postdelivery," missing that the 1995 definition is explicitly cause-based, not time-based.`,
    `−5 to −10 for endorsing the handbook's temporal rule as correct under the 1995 definition. +15–20 requires stating the cause-vs-time distinction explicitly and giving the corrected definition.`
  ),
  written(
    "U2-W03", 2, 15, "types-of-maintenance.md",
    `A video-conferencing company makes two changes in the same release: (1) it modifies its audio codec because a widely-used browser deprecated the old codec API the company relied on, forcing an update to keep calls working; (2) it modifies the same codec, unprompted by any external event, to shave 15ms of latency off every call because the team believes users will notice. Compare these two changes along the dimension "did we want it, or did the world force it," classify each as corrective, perfective, or adaptive, and explain why this pair is exactly the kind the course flags as commonly confused.`,
    `Change (1) = adaptive (the browser's deprecation is an environment change the product operates in; nothing was broken; the company didn't choose this for its own sake). Change (2) = perfective (the team wanted it better; nothing external forced it; matches the note's own "improves performance" example). Must state why the pair is commonly confused: both are proactive, non-corrective changes with no defect report behind either, so "no defect report" cannot be the discriminator — the actual test is "did we choose this, or was it imposed by the world."`,
    `Using "no defect report" as the sole test and concluding both are the same category (either both adaptive or both perfective).`,
    `−5 to −10 for classifying both changes the same way using the defect-report test alone. +15–20 requires the explicit want-vs-forced discriminator and correct opposite classification for the two changes.`
  ),
  written(
    "U2-W04", 2, 15, "software-engineering-code-of-ethics.md",
    `A junior developer on a hiring-screening tool notices during testing that the model rejects candidates over age 50 at a much higher rate than younger candidates with equivalent qualifications. She flags it in a Slack message to her manager, who reacts with a thumbs-up emoji and no further comment. She takes the thumbs-up as acknowledgment and moves on; the tool ships. Using Principles 1 (PUBLIC), 4 (JUDGEMENT), and 7 (COLLEAGUES), and the explicit ordering where PUBLIC is not subordinate to CLIENT AND EMPLOYER, state two concrete actions she should have taken instead, and explain why a thumbs-up emoji does not satisfy Principle 4.`,
    `Two concrete actions: (1) get the concern turned into an actionable, written record with an owner and a decision (e.g., a ticket, a documented risk assessment, an explicit go/no-go decision) rather than an ephemeral chat reaction; (2) escalate or re-raise through a more formal channel (compliance, a second reviewer, or a documented objection) if it remains unaddressed, since Principle 1 (PUBLIC) is not subordinate to client/employer interests and age-discriminatory impact is a public-interest issue. Must explain why a thumbs-up fails Principle 4: independence of professional judgment requires an actual decision and reasoning to rely on, not an ambiguous, non-committal reaction that could mean anything from "I'll look into it" to "acknowledged, ignore it."`,
    `Treating any acknowledgment (however informal) as sufficient closure of an ethical concern, or giving vague "she should have spoken up more" advice without concrete, actionable steps.`,
    `+15–20 requires correctly cited principles (1, 4, 7) tied to concrete actions plus the explicit critique of the thumbs-up as not a real decision. 0–3 for generic "be braver" answers with no principle grounding.`
  ),
  written(
    "U2-W05", 2, 13, "iterative-and-incremental-development.md",
    `Using a hypothetical fitness-tracking app built over 5 sprints, compare "iterative" and "incremental" along the dimension of what actually changes between one cycle and the next — for iterative, what improves about the same thing; for incremental, what new thing gets added.`,
    `Iterative = the same overall feature/thing gets closer to its target across passes — e.g., the step-counting algorithm is refined sprint over sprint (better accuracy, fewer false steps from arm movement), still "the step counter" throughout. Incremental = new pieces are added, most important first — e.g., step counting (sprint 1) → sleep tracking (sprint 2) → social challenges (sprint 3) → workout plans (sprint 4) → integrations with other apps (sprint 5), each a functionally new capability. Must use a genuinely new example (fitness app, not Unified Process or email client) with both properties illustrated separately, not collapsed into one description.`,
    `Using the note's own Unified Process example or another already-seen example (paraphrase trap), or conflating the two properties into one undifferentiated description.`,
    `+15–20 requires a genuinely new example with both properties clearly and separately illustrated. Mark down to 4–9 if the two properties collapse into one undifferentiated description.`
  ),
  written(
    "U2-W06", 2, 13, "classical-waterfall-phases.md",
    `A team building a payroll system runs unit tests continuously during Implementation but performs zero requirements-level verification (no review of the requirements or analysis documents against the client's actual needs) until a single validation session scheduled the week before go-live. Predict what class of fault is most likely to survive undetected until that final week, and explain, using the verification/validation distinction, why unit testing during Implementation could not have caught it.`,
    `Requirements/analysis-class faults (e.g., a misunderstood payroll rule, a missing tax-jurisdiction case) are the ones most likely to survive, because unit testing verifies that code matches its own low-level spec/design — it cannot detect that the spec itself was built on a wrong understanding of client needs. Validation (checking the product against the client's real needs) is the only activity that would catch this, and here it's deferred to one late session, at the point cost-of-correcting-faults is highest. Should connect this to the statistic that 60–70% of faults in large products are requirements/analysis/design faults, and explain the mechanism (unit tests check "did we build the thing right," not "did we build the right thing").`,
    `Assuming continuous unit testing is sufficient testing coverage on its own, missing that it structurally cannot catch validation-class faults regardless of how thorough it is.`,
    `+15–20 requires explicitly naming why verification (via unit tests) is structurally blind to validation-class faults, not just "they should have tested more."`
  ),

  // ===================== Unit 3 — Requirements, Analysis & Design =====================
  mcq(
    "U3-M01", 3, 2, "requirement-definition.md",
    `A product manager says, "The nurses need faster charting" (spoken in a hallway conversation), the hospital's contract says "the system shall reduce charting time to under 90 seconds," and the SRS says "charting screen response ≤200ms server-side." A new team member says these are three different, conflicting requirements that need to be resolved into one. Evaluate.`,
    [
      { letter: "A", text: `They aren't competing versions — per IEEE 610.12-1990's three-part definition, this is the same requirement at three different points in its life: felt by a person, imposed on a system/contract, and documented in an artifact; the task is understanding how they relate (and could drift apart), not picking a "true" one and discarding the others.` },
      { letter: "B", text: `Correct — only the SRS version counts as the real requirement, since it's the most precise.`, rationale: `picks one of the three IEEE locations (document, person, contract/system) as the sole "true" requirement and discards the others, missing that the note treats all three as the same requirement at different points in its life, not competing claims to resolve.` },
      { letter: "C", text: `Correct — only the client's spoken need counts, since everything else is just paperwork derived from it.`, rationale: `picks one of the three IEEE locations (document, person, contract/system) as the sole "true" requirement and discards the others, missing that the note treats all three as the same requirement at different points in its life, not competing claims to resolve.` },
      { letter: "D", text: `Correct — the contract version is authoritative since it's the only legally binding one, and the others should be discarded.`, rationale: `picks one of the three IEEE locations (document, person, contract/system) as the sole "true" requirement and discards the others, missing that the note treats all three as the same requirement at different points in its life, not competing claims to resolve.` },
    ],
    "A"
  ),
  mcq(
    "U3-M02", 3, 2, "client-constraints.md",
    `An analyst, in the very first client meeting, opens with: "Given your budget, which of these two vendor platforms should we standardize on?" — before any solution strategy has been explored. Predict the risk, per the note.`,
    [
      { letter: "A", text: `This applies the client's cost constraint before any strategies have been generated or evaluated, pruning the solution space prematurely — a better-fitting approach might never surface because it was never considered before being filtered by budget.` },
      { letter: "B", text: `There is no risk — asking about budget first is always good practice since it saves time.`, rationale: `treats early budget discussion as unconditionally good practice, ignoring the note's explicit ordering (strategies first, constraints after).` },
      { letter: "C", text: `The risk is that the analyst should have asked about deadline instead of cost, since deadlines are more often non-negotiable.`, rationale: `swaps which constraint should have been asked about rather than addressing the ordering violation itself.` },
      { letter: "D", text: `The risk is that vendor platforms are never an acceptable answer to a client-constraints question.`, rationale: `introduces an unrelated blanket rule not found in the note.` },
    ],
    "A"
  ),
  mcq(
    "U3-M03", 3, 1.5, "requirement-elicitation-techniques.md",
    `A team needs to learn how 500 call-center agents currently feel about a proposed new ticketing workflow, quickly and at scale. Which technique best fits, and why?`,
    [
      { letter: "A", text: `Questionnaire — it is specifically suited to determining the opinions of hundreds of individuals, whereas interviews would be far too slow at this scale and direct observation wouldn't capture opinion.` },
      { letter: "B", text: `Structured interview — since interviews are the "primary" technique, they should always be preferred regardless of scale.`, rationale: `over-applies "primary technique" as "always preferred," ignoring that interviews don't scale to hundreds of people.` },
      { letter: "C", text: `Direct observation — since watching agents work would reveal their opinions about the new workflow.`, rationale: `mismatches the technique to the goal — observation reveals behavior, not stated opinion.` },
      { letter: "D", text: `Examination of business forms — since ticketing forms would show how agents feel about the new workflow.`, rationale: `mismatches the technique to the goal — business forms reveal current process, not opinion.` },
    ],
    "A"
  ),
  mcq(
    "U3-M04", 3, 2, "understanding-the-application-domain.md",
    `In an insurance company's SRS, the term "active policy" is used throughout without a glossary definition. Underwriting means "premium paid this cycle"; claims processing means "coverage dates include today." A dispute later arises over whether a policy was "active" at the time of a claim. Why wasn't this caught during requirements, per the note?`,
    [
      { letter: "A", text: `An undefined term doesn't announce itself — it looks like agreement, since both teams used the phrase "active policy" fluently without noticing they meant different things; the gap surfaces later, at the point where the difference actually matters.` },
      { letter: "B", text: `It wasn't caught because nobody on the team was competent enough to write a proper SRS.`, rationale: `substitutes a competence judgment for the actual mechanism (undefined terms look like agreement).` },
      { letter: "C", text: `It wasn't caught because the requirements activity doesn't cover terminology, only features.`, rationale: `invents a scope restriction on the requirements activity not supported by the note.` },
      { letter: "D", text: `It wasn't caught because the two departments never spoke to each other during requirements, which is the only possible cause of such gaps.`, rationale: `overstates communication failure as the "only possible cause," when the note's point is that the term can go unnoticed even with full communication.` },
    ],
    "A"
  ),
  mcq(
    "U3-M05", 3, 2, "analysis-activity.md",
    `A team says: "We elicited requirements through five detailed client interviews and transcribed them precisely — analysis is redundant since the requirements are already clear from the transcripts." Evaluate.`,
    [
      { letter: "A", text: `Wrong — elicitation discovers, analysis refines and extends; requirements artifacts must be expressed in natural language to be comprehensible by the client, and natural language is inherently imprecise, so a second, more precise activity is still needed regardless of how carefully the interviews were transcribed.` },
      { letter: "B", text: `Correct — once interviews are transcribed accurately, no further refinement is needed.`, rationale: `assumes transcription accuracy alone provides the precision analysis is specifically needed for.` },
      { letter: "C", text: `Correct, since analysis only adds value when elicitation was done poorly.`, rationale: `adds an unsupported condition (only useful if elicitation was poor) not in the note.` },
      { letter: "D", text: `Incorrect, but only because five interviews aren't enough; more interviews would make analysis unnecessary.`, rationale: `substitutes interview quantity for the actual reason analysis is needed (the audience-imprecision chain).` },
    ],
    "A"
  ),
  mcq(
    "U3-M06", 3, 2, "the-specification-document.md",
    `An SRS includes: "The system shall handle a reasonable number of concurrent users." During acceptance testing, the vendor claims 200 concurrent users satisfies this; the client claims it does not, expecting 2,000. Which of the five C's does this sentence most directly violate?`,
    [
      { letter: "A", text: `Precise — "reasonable" sets no measurable threshold, so the sentence cannot be verified as met or unmet, which is exactly the kind of dispute an unenforceable contract term produces.` },
      { letter: "B", text: `Concise — the sentence is short, so conciseness is the property actually failing.`, rationale: `mistakes brevity (Concise) for the property actually at stake (Precise/measurable).` },
      { letter: "C", text: `Current — the sentence is out of date relative to the system's real capacity.`, rationale: `misapplies "Current," which concerns being up to date, not measurability.` },
      { letter: "D", text: `Complete — the sentence covers concurrency, so it isn't missing any topic, which is the only thing "Complete" measures.`, rationale: `misapplies "Complete," which concerns missing topics, not vagueness within a covered topic.` },
    ],
    "A"
  ),
  mcq(
    "U3-M07", 3, 2, "solution-strategy.md",
    `A city council wants to "install license-plate-reading cameras at every intersection." A consultant immediately asks, "Should we? Yes — cameras are affordable and available," and proceeds to scope a citywide camera network. What did the consultant skip, per the questioning chain?`,
    [
      { letter: "A", text: `The consultant answered "should we?" on feasibility/cost alone without progressing through "what business functions?", "how?", and "why?" — skipping the chance to discover the council's real objective (e.g., traffic revenue vs. stolen-vehicle recovery vs. congestion analysis), each implying a different system.` },
      { letter: "B", text: `The consultant skipped nothing; feasibility and cost are sufficient grounds to answer "should we?"`, rationale: `accepts a premature "should we?" answer as sufficient, the exact error the note is built to flag.` },
      { letter: "C", text: `The consultant should have applied budget constraints before asking "should we?" at all.`, rationale: `proposes applying constraints even earlier, compounding the actual error rather than fixing it.` },
      { letter: "D", text: `The consultant's only error was failing to consult additional vendors before proposing cameras.`, rationale: `substitutes an unrelated critique (vendor consultation) for the actual missed step (the what/how/why chain).` },
    ],
    "A"
  ),
  mcq(
    "U3-M08", 3, 2, "design-activity.md",
    `An agile team building an MVP skips any architectural or interface diagram and writes user stories directly into code, arguing "our formality level means basically no models." Evaluate against the note's stated position.`,
    [
      { letter: "A", text: `Overreads the position — agile/iteration projects typically build fewer models, but models are still created; skipping all design modeling entirely is cowboy coding, which the note explicitly says causes less-than-optimal solutions and rework.` },
      { letter: "B", text: `Correct — the note states agile teams should build zero models under any circumstances.`, rationale: `overstates the note's actual position ("fewer models" is misread as "zero models").` },
      { letter: "C", text: `Correct, since architectural design is only relevant to waterfall projects.`, rationale: `invents an unsupported restriction (architectural design is waterfall-only).` },
      { letter: "D", text: `Incorrect, but only because MVPs specifically require more modeling than regular releases, not because "fewer" doesn't mean "zero."`, rationale: `accepts the flawed "fewer isn't zero" reasoning is irrelevant, then substitutes an unrelated MVP-specific claim.` },
    ],
    "A"
  ),
  mcq(
    "U3-M09", 3, 1.5, "separation-of-concerns.md",
    `A team maintains a "who has access to what" security matrix as a separate artifact from their feature-requirements list, deliberately treating "who can do this" as a concern distinct from "what does this do." Which dimension of separation of concerns does this best illustrate?`,
    [
      { letter: "A", text: `Qualities — this separates a quality attribute (security/access control) from functional concerns, similar to the note's efficiency/user-friendliness or correctness/portability examples.` },
      { letter: "B", text: `Time — since it's a separation between stages of the project.`, rationale: `misapplies the Time dimension, which concerns process stages, not quality attributes.` },
      { letter: "C", text: `Views — since it's a separation between data flow and control flow diagrams.`, rationale: `misapplies the Views dimension, which concerns viewpoints like data/control flow, not quality attributes.` },
      { letter: "D", text: `None of the three named dimensions, since access control is a special case the note doesn't cover.`, rationale: `denies the example fits any of the three named dimensions, when it clearly matches Qualities.` },
    ],
    "A"
  ),
  mcq(
    "U3-M10a", 3, 1.5, "use-cases.md",
    `A developer writes a use case titled "Recalculate Cached Tax Rate," naming the actor as "the TaxCacheRefresher background job." A reviewer rejects it. Why, per the note's definition of a use case?`,
    [
      { letter: "A", text: `A use case models an interaction between the software product and its actors (users), a boundary-crossing interaction — "TaxCacheRefresher" is an internal component, not an actor interacting across the system boundary.` },
      { letter: "B", text: `The rejection is unjustified — any named process, internal or external, can be a valid actor.`, rationale: `accepts an internal component as a valid actor, contradicting the boundary-crossing definition.` },
      { letter: "C", text: `The rejection is correct, but only because the title is too technical, unrelated to the actor issue.`, rationale: `focuses only on the technical-language issue, missing the actor-boundary violation that is the primary defect.` },
      { letter: "D", text: `The rejection is correct because use cases must always involve a human user specifically, and no system can ever be an actor.`, rationale: `overstates the definition — actors can be other systems, not only humans.` },
    ],
    "A"
  ),
  mcq(
    "U3-M10b", 3, 2, "use-cases.md",
    `A use case for an online store is written as: "System validates the SKU against the inventory B-tree index and short-circuits on a cache miss." A client reviewing the requirements document can't understand it. What does this reveal, per the note?`,
    [
      { letter: "A", text: `Use cases belong to the requirements activity, where artifacts must be totally comprehensible by the client — writing in implementation-level technical language (B-tree, cache miss) violates that requirement, regardless of whether the interaction described is otherwise a legitimate actor-system boundary crossing.` },
      { letter: "B", text: `Nothing is wrong — use cases are meant for developers, not clients, so technical precision is preferred.`, rationale: `inverts the audience requirement — use cases are requirements artifacts, meant for client comprehensibility, not developer precision.` },
      { letter: "C", text: `The problem is only that "SKU" wasn't defined in a glossary; the rest of the technical language is fine.`, rationale: `narrows the problem to one undefined term, missing the broader register violation.` },
      { letter: "D", text: `This is a design-activity problem, not a requirements-activity problem, so the note's rules about use cases don't apply.`, rationale: `misattributes use cases to the wrong activity; they belong to requirements, where this rule applies.` },
    ],
    "A"
  ),
  mcq(
    "U3-M11a", 3, 2, "divide-and-conquer-and-abstraction.md",
    `A team building a video-editing tool does two things: (1) splits "render the final video" into independently-solved sub-modules for color-correction, audio-mixing, and frame-encoding; (2) exposes a single "Export" button to users while hiding the hundreds of internal render-pipeline steps involved. Which is divide-and-conquer and which is abstraction?`,
    [
      { letter: "A", text: `(1) is divide-and-conquer (horizontal, brick effect — independent same-level subproblems); (2) is abstraction (vertical, iceberg effect — one thing shown at a simplified level, irrelevant detail hidden below).` },
      { letter: "B", text: `(1) is abstraction and (2) is divide-and-conquer — the reverse of the correct classification.`, rationale: `swaps the classifications.` },
      { letter: "C", text: `Both are divide-and-conquer, since both involve breaking something into smaller pieces.`, rationale: `collapses both into divide-and-conquer, missing abstraction's distinct vertical/logical character.` },
      { letter: "D", text: `Both are abstraction, since both involve hiding complexity from someone.`, rationale: `collapses both into abstraction, missing divide-and-conquer's distinct horizontal/physical character.` },
    ],
    "A"
  ),
  mcq(
    "U3-M11b", 3, 2, "divide-and-conquer-and-abstraction.md",
    `"A car's steering wheel abstracts away the steering column, rack, and tie rods — this means the wheel and the mechanical linkage are two separate divide-and-conquer subproblems solved independently." Evaluate.`,
    [
      { letter: "A", text: `Misclassifies the example — this is abstraction (a logical simplification: relevant detail — turn the wheel — exposed, irrelevant detail — the linkage — hidden), not divide-and-conquer (a physical split into independently-solved same-level subproblems); the distinguishing word is physical vs. logical.` },
      { letter: "B", text: `Correct — any interface that hides internals from a user is, by definition, a divide-and-conquer split.`, rationale: `over-generalizes "hides internals" as sufficient for divide-and-conquer, when hiding is exactly abstraction's signature, not divide-and-conquer's.` },
      { letter: "C", text: `Correct, since the steering wheel and the linkage are built by different teams, which is what makes something divide-and-conquer.`, rationale: `substitutes an unrelated organizational fact (different teams) for the actual physical/logical criterion.` },
      { letter: "D", text: `Wrong, but only because a steering wheel is a physical object and abstraction only applies to software.`, rationale: `introduces an unsupported restriction (abstraction is software-only).` },
    ],
    "A"
  ),
  mcq(
    "U3-M12a", 3, 1.5, "cohesion-and-coupling.md",
    `A module called \`ReportGenerator\` contains functions for formatting a PDF, formatting a CSV, and formatting an HTML export — all clearly related to "producing a report in some format" — and it communicates with the rest of the system only through two well-defined function calls, with no shared globals. How should its cohesion and coupling be assessed?`,
    [
      { letter: "A", text: `Likely good on both — high cohesion (the three formatting functions are closely related to one purpose) and low coupling (interaction with the rest of the system is limited to two well-defined calls, not shared state).` },
      { letter: "B", text: `High cohesion but also high coupling, since any module that's called by other code automatically has high coupling.`, rationale: `assumes being called by other code automatically means high coupling, ignoring that coupling is about the nature/quantity of the relationship (well-defined calls vs. shared state), not its mere existence.` },
      { letter: "C", text: `Low cohesion, since formatting three different file types means the module is "doing three different things."`, rationale: `mistakes "handles several formats" for "does several unrelated things," when all three functions serve one cohesive purpose.` },
      { letter: "D", text: `Cohesion and coupling can't both be assessed without knowing the module's line count.`, rationale: `invents an irrelevant criterion (line count).` },
    ],
    "A"
  ),
  mcq(
    "U3-M12b", 3, 2.5, "cohesion-and-coupling.md",
    `A pricing model consumes 25 raw input columns pulled live from four different upstream databases with no declared schema or contract. One upstream team adds a change that silently shifts the meaning of an existing column it derives from (a currency field switches from USD to a mixed-currency total without renaming). What happens, and why is this a coupling problem specifically?`,
    [
      { letter: "A", text: `The model's predictions silently degrade, because it is coupled to every feature it consumes with no declared interface — unlike a typed API coupling, which would likely fail loudly on a meaningful semantic change, the model just keeps computing on a same-shaped column with a new meaning, with nothing to break against.` },
      { letter: "B", text: `Nothing unusual happens — models are immune to upstream schema changes since they only look at numeric values.`, rationale: `denies models are affected by upstream schema changes at all, contrary to the note's central AI touchpoint claim.` },
      { letter: "C", text: `This is a cohesion problem, not a coupling problem, since it's about a single field's internal meaning.`, rationale: `misclassifies a between-module (upstream-to-model) issue as a within-module cohesion issue.` },
      { letter: "D", text: `This would have happened identically in a normal service-to-service API integration, so there is nothing distinctive about the ML case.`, rationale: `denies any qualitative difference from ordinary API coupling, missing the "nothing to break against" mechanism that makes ML coupling distinctively silent.` },
    ],
    "A"
  ),
  mcq(
    "U3-M13a", 3, 2, "modularity.md",
    `A team builds a mobile app's entire UI layer as a single 15,000-line file with every screen's logic inline, no components, no functions beyond \`onCreate()\`. It passes all QA tests. A manager says: "It's fine, it does what it should." Which modularity property is most acutely missing, and why is the manager's defense flawed?`,
    [
      { letter: "A", text: `Decomposability is most acutely missing — a single undifferentiated file cannot be divided into independently workable pieces; the manager's defense conflates functional correctness (it passes tests) with design quality (whether it can be maintained, extended, or reused).` },
      { letter: "B", text: `Composability is most acutely missing, since the file can't be tested at all.`, rationale: `misidentifies composability as missing on the wrong grounds (testability, which the scenario states is intact).` },
      { letter: "C", text: `Nothing is missing — passing all QA tests is sufficient evidence that the module design is sound.`, rationale: `accepts passing tests as sufficient evidence of good design, the functional-equivalence-vs-design-equivalence error the note warns against.` },
      { letter: "D", text: `Understanding is most acutely missing, but only because the file is written in the wrong programming language.`, rationale: `substitutes an unrelated cause (programming language) for the actual issue (lack of internal structure).` },
    ],
    "A"
  ),
  mcq(
    "U3-M13b", 3, 2, "modularity.md",
    `A team splits a 15,000-line file into 300 separate 50-line files, each with a generic name like \`Helper12.js\`, but functions across files still directly reference and mutate the same global mutable object, and near-identical logic is copy-pasted across a dozen of them. A junior dev says: "We fixed our modularity problem — we have way more files now." Evaluate.`,
    [
      { letter: "A", text: `Modularity is defined by minimal overlap of functionality and manageable relationships between components, not by file count — physical separation into many files doesn't guarantee it when logic is duplicated and files are still entangled through a shared mutable global.` },
      { letter: "B", text: `Correct — splitting into any number of smaller files always improves modularity, since modularity is fundamentally about file size.`, rationale: `treats file count alone as sufficient for modularity, ignoring duplicated logic and shared-global entanglement.` },
      { letter: "C", text: `Correct, since 300 files necessarily means 300 independent, decomposable units regardless of their content.`, rationale: `assumes physical separation guarantees independence, contradicting the scenario's stated shared-global coupling.` },
      { letter: "D", text: `Incorrect, but only because 50 lines per file is still too long; modularity requires files under 20 lines.`, rationale: `substitutes an arbitrary line-count threshold for the actual functionality-overlap criterion.` },
    ],
    "A"
  ),
  mcq(
    "U3-M14a", 3, 2, "moving-target-problem.md",
    `Six weeks into a project, a client requests a new "multi-currency support" feature. Investigation shows the original interviews never asked any question about international customers at all — the topic simply never came up. Using the five-cause table, classify this and state the correct response.`,
    [
      { letter: "A", text: `Requirements never elicited properly — this is a preventable process failure, and the correct response is to root-cause the elicitation gap separately from simply implementing the now-requested feature.` },
      { letter: "B", text: `The client learned what they needed by seeing the working beta — this is IID working as designed, requiring no process response.`, rationale: `misclassifies a never-elicited topic as client-learned-by-seeing, a different row with a different (no-fault) verdict.` },
      { letter: "C", text: `The world changed (a new regulation) — nothing could have prevented it, so no root-cause investigation is warranted.`, rationale: `misclassifies a missed-elicitation gap as world-changed, missing that this was preventable.` },
      { letter: "D", text: `Someone wants something new and is calling it a clarification — this is a governance problem requiring a change-control board, not a process investigation.`, rationale: `misclassifies a genuine scope gap as disguised scope creep, a different row again.` },
    ],
    "A"
  ),
  mcq(
    "U3-M14b", 3, 2.5, "moving-target-problem.md",
    `After a costly late-stage requirement change, a CTO mandates: "From now on, any team caught changing requirements after sprint 2 will be penalized in their performance review." Using the five-cause table, evaluate this policy's likely effect on cause 1 ("the client learns what they need by seeing something").`,
    [
      { letter: "A", text: `The policy actively damages this cause — IID's value depends on the client being able to learn from working software and request changes accordingly; penalizing teams for accommodating that learning punishes legitimate, expected behavior as if it were a process failure.` },
      { letter: "B", text: `The policy correctly targets cause 1, since client-driven changes after sprint 2 are always the result of poor initial elicitation.`, rationale: `assumes all late changes trace to poor elicitation, ignoring that cause 1 changes are not process failures at all.` },
      { letter: "C", text: `The policy has no effect on cause 1, since performance reviews only affect individual developers, not client behavior.`, rationale: `denies any behavioral effect on the team/process dynamic the policy is explicitly designed to create.` },
      { letter: "D", text: `The policy strengthens cause 1, since it forces clients to think harder before making late requests.`, rationale: `assumes penalizing teams somehow disciplines client behavior, an unsupported causal leap.` },
    ],
    "A"
  ),
  mcq(
    "U3-M15a", 3, 2, "informal-semiformal-and-formal-specifications.md",
    `A specification reads: "The elevator door shall not open while the car is moving." A safety engineer wants a guarantee — not just a test result — that this can never happen across every possible sequence of button presses and sensor states. Which technique, per the note, is the only one that can provide this?`,
    [
      { letter: "A", text: `A formal method such as a Finite State Machine — it is the only technique in the course that can prove the absence of a fault across the full defined state space, rather than merely demonstrating a fault's presence when testing happens to find a violating case.` },
      { letter: "B", text: `A semiformal UML state diagram, since diagrams are inherently more rigorous than prose.`, rationale: `overstates diagrams' rigor without formal semantics behind them.` },
      { letter: "C", text: `More extensive testing — running enough test cases eventually proves the absence of the fault.`, rationale: `repeats the "testing proves absence" error the note explicitly rejects — testing can only demonstrate presence.` },
      { letter: "D", text: `A better-written informal specification, since ambiguity is the only real obstacle to this guarantee.`, rationale: `assumes ambiguity is the only obstacle, ignoring that even a perfectly unambiguous informal sentence still can't be proven, only tested.` },
    ],
    "A"
  ),
  mcq(
    "U3-M15b", 3, 2.5, "informal-semiformal-and-formal-specifications.md",
    `A team is specifying "the model shall flag suspicious login attempts." For a specific scenario — logins from a new device in a country the user has never logged in from — which best applies the AI touchpoint's three-part structure (task, acceptable error profile, fallback)?`,
    [
      { letter: "A", text: `Task = flag a login as suspicious when device and country are both new for that user, at the moment of login attempt; error profile = explicitly weigh missing a real account-takeover (false negative) against locking out a legitimate traveling user (false positive), stating which is worse for this scenario and that only the client can decide the weighting; fallback = what happens when the model can't decide (e.g., send a verification code) rather than silently allowing or blocking.` },
      { letter: "B", text: `Task = "detect fraud with 95% accuracy" — a single accuracy number is sufficient to fully specify the requirement.`, rationale: `reduces the requirement to a single accuracy number, the exact anti-pattern the note warns against ("not '95% accurate'").` },
      { letter: "C", text: `The three-part structure doesn't apply here since login-fraud detection isn't safety-critical the way the elevator example is.`, rationale: `denies the three-part structure's applicability based on an unsupported safety-criticality restriction.` },
      { letter: "D", text: `Fallback is unnecessary as long as the false-positive and false-negative rates are both under 5%.`, rationale: `omits the fallback requirement, assuming low error rates alone are sufficient.` },
    ],
    "A"
  ),
  mcq(
    "U3-M16a", 3, 2, "functional-and-nonfunctional-requirements.md",
    `Consider "the system shall allow a customer to cancel an order within 24 hours of placing it" versus "the system shall respond to any user action within 500ms." Classify each and state the dimension used.`,
    [
      { letter: "A", text: `The first is functional (specifies an action the system performs); the second is nonfunctional (specifies a property/constraint on how the system performs, not an action itself); the dimension is what vs. how well.` },
      { letter: "B", text: `Both are functional, since both describe something the system "does."`, rationale: `collapses the functional/nonfunctional distinction by treating any system behavior as automatically functional.` },
      { letter: "C", text: `The first is nonfunctional (it's about a time window) and the second is functional (it's a specific numeric target) — the reverse of the correct classification.`, rationale: `swaps the two classifications.` },
      { letter: "D", text: `Both are nonfunctional, since both include measurable constraints (24 hours, 500ms).`, rationale: `collapses both into nonfunctional by treating any numeric constraint as disqualifying from functional, ignoring that the first item specifies an action (cancel), not a property.` },
    ],
    "A"
  ),
  mcq(
    "U3-M16b", 3, 2, "functional-and-nonfunctional-requirements.md",
    `For the business need "reduce customer-support call volume by letting customers self-serve common account changes," a requirements document includes: "The system shall let users choose a custom app icon color." Evaluate whether this is a well-formed functional requirement and whether it belongs in this SRS.`,
    [
      { letter: "A", text: `It is a well-formed functional requirement (clear, specifies an action) but very likely fails traceability to the stated need (custom icon colors don't reduce support call volume) — well-formedness and traceability are two independent tests, and a requirement can pass one while failing the other.` },
      { letter: "B", text: `Since it doesn't serve the stated need, it is automatically not a well-formed requirement either — the two failures are really one failure.`, rationale: `conflates well-formedness with traceability, treating a traceability failure as if it also invalidated well-formedness.` },
      { letter: "C", text: `It belongs in the SRS as written, since any functional requirement that is clearly worded should be included regardless of the business need.`, rationale: `accepts any well-formed requirement as belonging in the SRS regardless of traceability to the stated need.` },
      { letter: "D", text: `It is not well-formed, because "custom app icon color" is a design decision, not a requirement, and design decisions can never be phrased as "the system shall."`, rationale: `misapplies "well-formed," incorrectly asserting design decisions can never be phrased as requirements.` },
    ],
    "A"
  ),

  written(
    "U3-W01", 3, 13, "divide-and-conquer-and-abstraction.md",
    `A team building an e-commerce checkout flow does two things: (1) splits the "process the order" problem into independently-built sub-modules for inventory-reservation, payment-capture, and shipping-label-generation; (2) shows the customer a single "Estimated delivery: 3-5 days" line while the actual calculation blends warehouse location, carrier SLAs, and current backlog that the customer never sees. Identify which is divide-and-conquer and which is abstraction, state the single-word distinction that tells them apart, and give the brick/iceberg image for each.`,
    `(1) = divide-and-conquer (horizontal, brick — independent same-level subproblems: inventory, payment, shipping each solved separately). (2) = abstraction (vertical, iceberg — one thing, "delivery estimate," shown at a simplified level while the underlying calculation is hidden below). Distinguishing word: physical (divide-and-conquer, splitting into separate parts) vs. logical (abstraction, hiding irrelevant detail of one thing).`,
    `Swapping the two, or explaining both with generic "breaking into pieces" language without the physical/logical distinction.`,
    `−5 to −10 for swapping the classifications. +15–20 requires the explicit physical/logical word and correct brick/iceberg imagery for each.`
  ),
  written(
    "U3-W02", 3, 12, "cohesion-and-coupling.md",
    `A module named \`UserSettingsManager\` contains functions for updating a user's email, password, and notification preferences — three plausibly related aspects of "managing a user's account settings" — but each of these three functions independently reaches into a shared \`AppConfig\` singleton object that six other unrelated modules across the codebase also read and write directly, with no defined interface. Evaluate this module's likely cohesion and coupling separately (not as one combined verdict), and explain why they can move independently of each other.`,
    `Cohesion likely reasonable-to-good (email/password/notification-prefs are plausibly related aspects of "account settings," a within-module judgment). Coupling likely bad (six unrelated modules sharing direct read/write access to \`AppConfig\` is exactly the excessive between-module relationship the rule warns against). Must explain they move independently because cohesion measures within-module relationships and coupling measures between-module relationships — different axes, so one can be high while the other is low.`,
    `Giving one combined "good/bad" verdict for the module instead of separate cohesion and coupling judgments.`,
    `0–3 for a single undifferentiated verdict. +15–20 requires separate judgments plus the explicit "measure different things, move independently" statement.`
  ),
  written(
    "U3-W03", 3, 12, "modularity.md",
    `A team's backend passes every integration test and ships on schedule, built as three enormous files (one per major feature area) with no internal function boundaries — each file is a long sequential script. The tech lead says: "We'll worry about modularity later if we ever need to extend this; right now, functional correctness is the only thing that matters, and we have that." Justify or refute this position using the note's argument about functional equivalence versus design equivalence, and name which of the three modularity properties (decomposability, composability, understanding) is most immediately at risk from deferring the concern.`,
    `Refute — functional correctness (passing tests today) is not the same claim as design quality (the note's "functionally equivalent but not design-equivalent" argument, from the incompetent-architect example); the three-enormous-files structure will make understanding (localization — finding what to change) and decomposability (dividing work / isolating changes) acutely difficult the moment any extension or bug-fix is needed, which the tech lead's own stated trigger ("if we ever need to extend this") makes near-certain to occur. Should name at least one property (decomposability or understanding) as most immediately at risk, with justification tied to the single-giant-file structure.`,
    `Accepting "we pass tests, so it's fine for now" as a legitimate reason to defer modularity, missing that the cost of the current structure activates exactly when the stated future trigger occurs — i.e., it's not actually deferred, just delayed and compounding.`,
    `−5 to −10 for endorsing the "worry about it later" plan as sound engineering judgment. +15–20 requires explicit functional-equivalence-vs-design-equivalence framing plus a correctly justified property.`
  ),
  written(
    "U3-W04", 3, 15, "moving-target-problem.md",
    `Four months into a CRM project, the client requests a new "deal-scoring" feature. Consider three possible backstories and, for each, classify it against the five-cause table and state the correct response: (a) a new industry-wide data-privacy regulation now requires disclosing why a deal was scored a certain way; (b) the client only realized they wanted this after seeing the working sales pipeline dashboard in action; (c) a regional sales VP who was never interviewed during requirements gathering now insists on this feature or will block rollout in their region.`,
    `(a) = world changed (regulation) → unpreventable, design to absorb it, no blame. (b) = client learns by seeing → not a problem, IID working as designed, accept/prioritize normally. (c) = new stakeholder appears with a veto → preventable process failure (a missed stakeholder during requirements), root-cause why this VP wasn't included, distinct from implementing the feature now. Each of the three needs a different response, not one generic answer.`,
    `Giving the same response ("just build it" or "this is scope creep") to all three, missing that the table's entire point is differentiated verdicts per cause.`,
    `0–3 for one undifferentiated response applied to all three. +15–20 requires three distinct, correctly-matched cause/response pairs.`
  ),
  written(
    "U3-W05", 3, 15, "informal-semiformal-and-formal-specifications.md",
    `Compare an informal requirement ("the vending machine shall not dispense an item until payment is confirmed") with a formal Finite State Machine specification of the same vending machine's payment/dispense logic, along the dimension of what each can prove about the absence of a fault. Name all five FSM components you would need to define for this vending machine at a conceptual level (you do not need to draw the full diagram).`,
    `Informal sentence can only be tested — a test suite finding no violating case demonstrates the fault's absence was not observed, not that it cannot occur; natural language is also ambiguous ("payment confirmed" could admit edge cases like a reversed transaction). FSM can prove absence across the full defined state space (the one technique in the course that can). All five FSM components sketched conceptually: states (e.g., Idle, PaymentPending, PaymentConfirmed, Dispensing, Error/Refund), inputs (coin inserted, card tapped, payment-confirmed signal, item-select button, dispense-sensor signal), transition function (mapping state+input to next state), initial state (Idle), final states (e.g., Dispensing-complete / Refunded).`,
    `Treating the FSM as "just a more detailed way of writing requirements" rather than recognizing its qualitatively different proof power (absence vs. presence), or listing fewer than five components.`,
    `+15–20 requires explicit "prove absence vs. demonstrate presence" framing plus a genuinely structured five-part FSM sketch.`
  ),
  written(
    "U3-W06", 3, 13, "functional-and-nonfunctional-requirements.md",
    `Compare "the system shall generate a monthly sales report" and "the system shall remain available 99.9% of the time" along the dimension of what each one specifies (an action the system performs vs. a property/constraint on how it performs). Classify each as functional or nonfunctional and justify from the dimension. Then explain why "choice of programming language" — clearly nonfunctional — is often not finalized during requirements at all.`,
    `Report generation = functional (an action). Availability target = nonfunctional (a property/constraint, not an action itself). Dimension stated explicitly: functional answers "what," nonfunctional answers "how well/under what constraint." Second part: many nonfunctional requirements (programming language, reuse issues, portability) are finalized during the design activity, not requirements, because they concern how the solution will be built rather than what the client needs — the requirements activity is deliberately solution-agnostic on those points.`,
    `Classifying availability as functional because "keeping the system running is something it does," or omitting the design-activity timing point for the second part.`,
    `−5 to −10 for classifying availability as functional. +15–20 requires the explicit action-vs-property dimension plus the correct design-activity timing explanation.`
  ),

  // ===================== Unit 4 — Implementation, Testing & Integration =====================
  mcq(
    "U4-M01", 4, 2, "good-programming-practice.md",
    `A billing function \`double calc(double a, double b, int t)\` uses \`t==1\`/\`t==2\` to select a tax rate hardcoded as \`0.07\`/\`0.15\` inline. A reviewer flags two separate problems. Which pair correctly identifies them, per the note's five practices?`,
    [
      { letter: "A", text: `(1) meaningless, inconsistent names (\`a\`, \`b\`, \`t\`, \`calc\`) that force a future maintenance programmer to trace call sites to understand meaning; (2) hardcoded near-constants (0.07, 0.15) instead of values read from a parameter file, meaning a rate change requires a code change and redeploy.` },
      { letter: "B", text: `(1) the function is too short; (2) it lacks a return statement.`, rationale: `invents unrelated criticisms (function length, missing return) not part of the note's five practices.` },
      { letter: "C", text: `(1) it uses \`double\` instead of \`int\`; (2) it has too few parameters.`, rationale: `invents unrelated criticisms (type choice, parameter count) not part of the note's five practices.` },
      { letter: "D", text: `(1) it lacks comments explaining what each line does; (2) it isn't written in an object-oriented style.`, rationale: `prescribes blanket WHAT-style commenting and an unrelated paradigm requirement, neither of which the note endorses.` },
    ],
    "A"
  ),
  mcq(
    "U4-M02", 4, 1.5, "nested-if-statements.md",
    `The following is nested to a depth of four: checking user login, then permission level, then feature-flag status, then a per-tenant override, each inside the previous. Per the rule of thumb, what should happen?`,
    [
      { letter: "A", text: `This should be avoided as poor programming practice — the stated rule of thumb flags depth greater than three as something to avoid, and depth four exceeds it.` },
      { letter: "B", text: `This is fine, since the rule of thumb only applies to if-if combinations, not if-else-if chains.`, rationale: `misreads the rule as applying only to if-if, when the depth-of-three guideline concerns nesting generally.` },
      { letter: "C", text: `This is fine, since any nesting used for legitimate business logic is automatically exempt from the depth guideline.`, rationale: `invents an unstated exemption for "legitimate business logic."` },
      { letter: "D", text: `This should be avoided, but only because there are exactly four conditions, and the rule specifically forbids four-condition checks.`, rationale: `misreads the rule as being about condition count rather than nesting depth.` },
    ],
    "A"
  ),
  mcq(
    "U4-M03", 4, 2, "stubs-and-drivers.md",
    `You need to unit-test a \`NotificationService\` module that itself calls an \`EmailProvider\` module (not yet written) and is called by an \`OrderWorkflow\` module (already written, calling NotificationService in production). What do you need to test \`NotificationService\` in isolation?`,
    [
      { letter: "A", text: `A stub for \`EmailProvider\` (since NotificationService calls it — it's below) and a driver for \`OrderWorkflow\`'s role (since something must call NotificationService directly with test inputs), even though OrderWorkflow itself already exists.` },
      { letter: "B", text: `A driver for \`EmailProvider\` and a stub for \`OrderWorkflow\`, reversing the direction.`, rationale: `reverses the stub/driver direction.` },
      { letter: "C", text: `Only a stub, since \`EmailProvider\` is the only unwritten dependency.`, rationale: `omits the needed driver, assuming only the unwritten dependency requires scaffolding.` },
      { letter: "D", text: `Neither is needed, since \`OrderWorkflow\` already exists and can call \`NotificationService\` directly in production.`, rationale: `assumes an already-existing caller eliminates the need for isolated unit testing, missing the point of testing NotificationService alone.` },
    ],
    "A"
  ),
  mcq(
    "U4-M04", 4, 2, "sandwich-integration.md",
    `A team integrates sandwich-style: logic artifacts top-down, operational artifacts bottom-up, and declares integration complete once both halves pass their own tests. What have they forgotten, per the note?`,
    [
      { letter: "A", text: `The third step — explicitly testing the interfaces between the logic-side and operational-side halves, the one place neither sub-strategy has exercised on its own.` },
      { letter: "B", text: `Nothing — once both halves individually pass, the combined system is guaranteed correct by construction.`, rationale: `assumes two independently-passing halves guarantee a correctly integrated whole, ignoring the interface between them.` },
      { letter: "C", text: `They forgot to also integrate bottom-up on the logic side, duplicating effort.`, rationale: `proposes a redundant, unnecessary step rather than identifying the actual missing one.` },
      { letter: "D", text: `They forgot that sandwich integration requires stubs only, never drivers.`, rationale: `invents an unsupported restriction on sandwich integration's use of stubs/drivers.` },
    ],
    "A"
  ),
  mcq(
    "U4-M05", 4, 1.5, "walkthroughs-and-inspections.md",
    `A five-person team wants "quick feedback on whether anyone misunderstood the design before coding starts," with minimal formality and no need for recorded fault-type statistics. Which review format best fits, and why?`,
    [
      { letter: "A", text: `A walkthrough — 4–6 members including current-workflow, next-workflow, and SQA representatives, informal and document-driven, producing "not understood" and "appears incorrect" lists, well suited to quick pre-coding feedback.` },
      { letter: "B", text: `An inspection, since inspections are always the superior choice for any review goal due to their five formal steps.`, rationale: `overgeneralizes inspections as universally superior regardless of the stated goal (quick, low-formality feedback).` },
      { letter: "C", text: `Neither — non-execution-based testing can only occur after code exists, so nothing can happen before coding starts.`, rationale: `incorrectly claims non-execution-based testing requires code to exist.` },
      { letter: "D", text: `A walkthrough, but only because walkthroughs double as performance appraisals, which motivates participation.`, rationale: `directly contradicts the note's explicit "never for performance appraisal" rule.` },
    ],
    "A"
  ),
  mcq(
    "U4-M06a", 4, 2, "self-documenting-code-and-comments.md",
    `A code review flags: \`// loop through all users\` above \`for (user in users) {...}\`, and separately \`// we cap at 500 here because the vendor's API rate-limits us at 500/min and a 501st call in the same minute gets our whole account throttled for an hour\` above \`if (count >= 500) break;\`. Classify each and state the correct resolution.`,
    [
      { letter: "A", text: `The first is a WHAT comment (a confession the code doesn't say — since the loop is already self-evident, it should be deleted or the code recoded to be clearer, not commented); the second is a WHY comment (information that cannot be recovered from the code itself, and must be kept).` },
      { letter: "B", text: `Both are WHAT comments and should both be deleted, since comments are generally discouraged.`, rationale: `over-applies "delete WHAT comments" to the WHY comment as well, losing irreplaceable information.` },
      { letter: "C", text: `Both are WHY comments and should both be kept, since any comment provides useful context.`, rationale: `over-applies "keep useful comments" to the WHAT comment, missing that it is pure noise.` },
      { letter: "D", text: `The first is WHY (it explains iteration) and the second is WHAT (it just states a number) — the reverse of the correct classification.`, rationale: `swaps the classification of the two comments.` },
    ],
    "A"
  ),
  mcq(
    "U4-M06b", 4, 2, "self-documenting-code-and-comments.md",
    `A developer argues: "Since the note says self-documenting code is exceedingly rare, we should stop trying to write clear code and just lean on WHAT comments everywhere instead — it's more realistic." Evaluate.`,
    [
      { letter: "A", text: `Misreads the note — "exceedingly rare" is a realistic acknowledgment, not permission to give up; the note explicitly says to recode in a clearer way rather than promote or excuse poor programming, so the correct response is to keep pushing toward clarity, reserving comments for genuinely irreducible WHY information.` },
      { letter: "B", text: `Correct — since perfect self-documenting code is rare, WHAT comments are an acceptable permanent substitute for writing clearer code.`, rationale: `treats rarity of self-documenting code as license to stop trying, contradicting the note's explicit "never promote or excuse poor programming."` },
      { letter: "C", text: `Correct, since the note treats WHAT and WHY comments as equally acceptable once self-documentation is acknowledged to be difficult.`, rationale: `treats WHAT and WHY comments as equally acceptable, erasing the note's central distinction.` },
      { letter: "D", text: `Incorrect, but only because comments should be replaced with more code review, not because of the recode-don't-comment principle.`, rationale: `substitutes an unrelated remedy (more code review) for the actual resolution given in the note.` },
    ],
    "A"
  ),
  mcq(
    "U4-M07a", 4, 2, "top-down-integration.md",
    `A well-layered ride-sharing backend has high-level trip-matching logic calling low-level, highly-reused fare-calculation and ETA-estimation modules. The team integrates top-down. Why does the note say being well-designed makes the operational-artifact-undertesting problem worse, not better?`,
    [
      { letter: "A", text: `In a well-designed, heavily layered system, low-level operational artifacts sit deeper in the call chain (reached later under top-down order) and are called through defensively-guarded real callers, so their error paths never execute during integration — better design means more guarding and deeper artifacts, compounding the undertesting.` },
      { letter: "B", text: `Being well-designed has no bearing on testing order at all; the claim in the note is a rhetorical exaggeration, not a real mechanism.`, rationale: `denies the mechanism the note explicitly names as counter-intuitive but real.` },
      { letter: "C", text: `Well-designed systems are worse because good design always means more modules, and more modules always means more bugs.`, rationale: `substitutes an unrelated, unsupported generalization (more modules = more bugs) for the actual defensive-programming mechanism.` },
      { letter: "D", text: `Well-designed systems are worse because defensive programming is itself a design flaw the note recommends against.`, rationale: `mischaracterizes defensive programming itself as a flaw, when the note treats it as a normal practice with this specific side effect.` },
    ],
    "A"
  ),
  mcq(
    "U4-M07b", 4, 2.5, "top-down-integration.md",
    `During top-down integration of a hotel-booking system, a previously-passing regression test for "apply loyalty discount" starts failing right after the \`RoomAvailability\` module is newly integrated (replacing its stub). Where must the fault lie, and why does this precision matter?`,
    [
      { letter: "A", text: `The fault must lie in \`RoomAvailability\` itself or its interface(s) with the already-integrated product — nothing else changed; this precision (versus "the fault could be anywhere") is exactly the fault-isolation advantage that all-at-once integration would lose.` },
      { letter: "B", text: `The fault could be anywhere in the system, since regression failures can be triggered by unrelated changes.`, rationale: `denies the fault-isolation guarantee entirely, missing the note's central claim about top-down's precision.` },
      { letter: "C", text: `The fault must lie in the loyalty-discount module itself, since that's the test that failed, regardless of what was just integrated.`, rationale: `locates the fault in the wrong module (the symptom's location) rather than the newly-integrated cause.` },
      { letter: "D", text: `The fault must lie in a module not yet integrated, since integrated modules are already presumed correct.`, rationale: `inverts the logic — a newly-integrated module is exactly where the fault is expected to be.` },
    ],
    "A"
  ),
  mcq(
    "U4-M08a", 4, 2, "bottom-up-integration.md",
    `A team integrates bottom-up: low-level payment-gateway-adapter and currency-conversion utilities first (thoroughly tested via drivers with adversarial inputs), then mid-level modules, ending with the top-level \`CheckoutOrchestrator\` last. Which of bottom-up's three advantages is this ordering specifically producing?`,
    [
      { letter: "A", text: `Thorough testing of operational artifacts via drivers (not fault-shielding callers) — drivers can supply inputs a defensive caller would filter out, exercising error paths that top-down integration would leave untested.` },
      { letter: "B", text: `Early detection of major design faults — bottom-up is specifically weaker here, since logic artifacts (which carry design decisions) arrive last.`, rationale: `correctly describes bottom-up's weakness but misapplies it as the answer to a question about an advantage being demonstrated.` },
      { letter: "C", text: `Stub reuse — bottom-up doesn't use stubs at all in the way described; that's a top-down mechanism.`, rationale: `denies bottom-up uses drivers, confusing it with top-down's stub usage.` },
      { letter: "D", text: `Guaranteed fault isolation exclusive to bottom-up — fault isolation is shared by both strategies, not a bottom-up-only advantage.`, rationale: `treats fault isolation as bottom-up-exclusive, contradicting the note's "shared by both" statement.` },
    ],
    "A"
  ),
  mcq(
    "U4-M08b", 4, 2.5, "bottom-up-integration.md",
    `A team integrates bottom-up: all low-level utility and data-access modules first, thoroughly tested, then progressively higher-level modules, ending with the top-level \`TripPlanner\` controller last. One week before release, integrating \`TripPlanner\` reveals the overall control flow assumed by the architecture doesn't match how the lower modules were actually built to be called. Diagnose this using bottom-up's named weakness.`,
    [
      { letter: "A", text: `Major design faults are detected late under bottom-up, because logic artifacts (which carry the architectural/control-flow decisions) are integrated last — nothing below could have exercised whether components compose under the real intended control flow until \`TripPlanner\` was finally wired in.` },
      { letter: "B", text: `This is a symptom of poor unit testing on the lower modules, unrelated to integration order.`, rationale: `misattributes a design-level mismatch to a testing-thoroughness issue at the unit level.` },
      { letter: "C", text: `This couldn't happen under bottom-up, since thoroughly-tested lower modules guarantee correct overall composition.`, rationale: `denies bottom-up's named weakness exists at all, contradicting the note.` },
      { letter: "D", text: `This is the same failure top-down integration would produce at the same point in the schedule.`, rationale: `incorrectly claims top-down would produce the identical failure at the identical point, ignoring that top-down surfaces design faults early.` },
    ],
    "A"
  ),
  mcq(
    "U4-M09a", 4, 2, "testing-to-specifications-and-testing-to-code.md",
    `A tester writes test cases purely from a shipping-cost API's published documentation, never opening the implementation. Another tester, working only from the source code's branch structure, writes cases to exercise every \`if\`/\`else\` path. Name both approaches using at least two aliases each.`,
    [
      { letter: "A", text: `First tester = testing to specifications (black-box, data-driven, functional, input/output-driven). Second tester = testing to code (glass-box, logic-driven, structured, path-oriented).` },
      { letter: "B", text: `First = glass-box, second = black-box — the reverse of the correct pairing.`, rationale: `reverses the alias pairing.` },
      { letter: "C", text: `Both are testing to specifications, since both are systematic (non-random) approaches.`, rationale: `collapses both into one category (testing to specifications), missing that the second tester works from code, not specs.` },
      { letter: "D", text: `Both are testing to code, since both involve writing structured test cases.`, rationale: `collapses both into the other category (testing to code), missing that the first tester works from specs, not code.` },
    ],
    "A"
  ),
  mcq(
    "U4-M09b", 4, 2.5, "testing-to-specifications-and-testing-to-code.md",
    `A programmer writing a discount-calculation function never considered that a coupon code could be applied twice in the same order, so the code has no branch handling a duplicate-coupon case at all. A tester using pure testing-to-code (100% branch coverage of the actual code) writes their test suite. Will this suite catch the duplicate-coupon issue, and why?`,
    [
      { letter: "A", text: `No — a path can only be tested if it is present in the code; since the programmer never wrote a branch for the duplicate-coupon case, there is no such path for path-oriented testing to find, and the same blind spot that caused the omission is likely to affect the tester working purely from the code.` },
      { letter: "B", text: `Yes — 100% branch coverage guarantees every real-world scenario is tested, by definition.`, rationale: `overstates branch coverage as guaranteeing real-world scenario coverage, contradicting the note's explicit "not reliable" conclusion.` },
      { letter: "C", text: `Yes, but only if the tester also measures statement coverage in addition to branch coverage.`, rationale: `substitutes a different coverage metric that doesn't resolve the fundamental path-must-be-present limitation.` },
      { letter: "D", text: `No, but only because branch coverage tools are unreliable, not because of any conceptual limitation.`, rationale: `misattributes the limitation to tooling reliability rather than the conceptual limit the note describes.` },
    ],
    "A"
  ),

  written(
    "U4-W01", 4, 18, "top-down-integration.md",
    `A well-designed inventory-management system has clean layering: high-level restocking-decision logic calls a low-level, heavily-reused \`computeReorderQuantity(stock, leadTime)\` function guarded everywhere it's called by \`if (stock >= 0)\`. The team integrates top-down. Predict specifically what will go untested in \`computeReorderQuantity\` under this integration order, explain the defensive-programming mechanism that causes it, and state why the fact that this function is reused by many callers makes the consequence worse, not better.`,
    `\`computeReorderQuantity\` will never be exercised with \`stock < 0\` during integration, because every real caller defensively guards the call with \`if (stock >= 0)\` before invoking it — top-down integration tests the function only through these guarded real callers (not through a driver supplying arbitrary/adversarial inputs), so the negative-stock error path is never executed. Because the function is reused by many callers, a future caller that omits the guard (or a data-corruption case that produces negative stock) will hit an untested path in a widely-depended-on function, multiplying the blast radius rather than limiting it.`,
    `Assuming that because callers currently guard correctly, the function's untested branch is safe — missing that reuse means the guarantee depends on every future caller replicating the guard correctly, which is exactly the risk defensive programming masks.`,
    `−5 to −10 for concluding good design/wide reuse reduces this risk. +15–20 requires the explicit defensive-guarding mechanism plus the reuse-compounds-the-risk argument.`
  ),
  written(
    "U4-W02", 4, 15, "bottom-up-integration.md",
    `Compare top-down and bottom-up integration, applied to a hypothetical airline check-in system, along the dimension "how thoroughly are operational (low-level) artifacts tested, and by what mechanism," and explain precisely why "fault isolation" cannot be used to discriminate between the two strategies even though both explicitly claim it as an advantage.`,
    `Top-down: operational artifacts (e.g., a low-level baggage-weight-validation function) are reached last, through defensively-programmed real callers (e.g., a caller that pre-filters invalid weights before calling), so error paths are frequently never exercised. Bottom-up: the same operational artifact is tested first and thoroughly, via a driver that can supply arbitrary/adversarial inputs (including invalid weights a defensive caller would have filtered), directly exercising error paths. Must explain fault isolation cannot discriminate: both strategies provide the same "last thing added, fault localized there" guarantee at every integration step, by virtue of doing integration in any deliberate incremental order — the real discriminators are what gets tested well (operational artifacts, favoring bottom-up) and when design faults surface (early under top-down, late under bottom-up).`,
    `Listing fault isolation as an advantage that favors one strategy over the other.`,
    `−5 to −10 for treating fault isolation as a discriminator between the two strategies. +15–20 requires explicit statement that fault isolation is shared by virtue of incremental integration itself, with the real discriminators named.`
  ),
  written(
    "U4-W03", 4, 15, "testing-to-specifications-and-testing-to-code.md",
    `A QA lead for a churn-prediction model says: "We tested this the same way we test our checkout code — we picked twenty representative customer records, wrote down the expected churn/no-churn label for each from the spec, ran the model, got 18/20 correct, and signed off at 90%." Justify or refute this sign-off as adequate evidence of correctness, using the AI touchpoint's account of how unit testing breaks for models, and state what she should have done instead.`,
    `Refute — unit testing breaks as a correctness argument for models because there is no expected output for a single input in the traditional pass/fail sense; correctness is a property over a population, not a fixed input-output mapping verified case by case. Twenty hand-picked cases at 90% says very little about how the model performs across subgroups (e.g., customers with short tenure, or a specific plan type) — overall accuracy can hide a subgroup where it fails badly. She should have evaluated on slices — not "does it work?" but "for whom does it work?" — checking performance broken out by relevant subpopulations, not just an aggregate pass rate on a small hand-picked set.`,
    `Treating a high aggregate pass rate on hand-picked cases as strong evidence, or recommending "just run more test cases" rather than the qualitatively different slice-based evaluation.`,
    `−5 to −10 for endorsing the sign-off as adequate. +15–20 requires the explicit "population, not case" framing and the "for whom does it work" slice-based replacement named.`
  ),

  // ===================== Unit 5 — Maintenance & Engineering AI-Enabled Software =====================
  mcq(
    "U5-M01", 5, 2, "ensuring-maintainability.md",
    `A startup ships v1 with terse variable names and no documentation, planning: "We'll invest in maintainability once we hit our first big maintenance cycle and know what actually needs changing." Evaluate this plan.`,
    [
      { letter: "A", text: `Flawed — maintainability is decided at design and implementation time and cannot be added later; by the time maintenance starts, the maintenance programmer is exactly the person harmed by its absence, and improving it then requires first understanding a system whose current unmaintainability is the very barrier to that understanding.` },
      { letter: "B", text: `Sound — maintainability improvements are equally effective whenever they're made, so deferring costs nothing.`, rationale: `denies any timing dependency, contradicting the note's explicit claim that maintainability is decided at design/implementation time.` },
      { letter: "C", text: `Sound, since the first maintenance cycle is exactly when the system's real structure becomes clear enough to document properly.`, rationale: `inverts the bootstrapping problem — the note argues the opposite, that unmaintainable code obscures rather than clarifies its own structure.` },
      { letter: "D", text: `Flawed, but only because documentation should be written by a technical writer, not developers, regardless of timing.`, rationale: `substitutes an unrelated staffing claim (who writes docs) for the actual timing argument.` },
    ],
    "A"
  ),
  mcq(
    "U5-M02a", 5, 1.5, "defect-reports.md",
    `A user reports that CSV export produces garbled characters for names with accented letters. A maintenance programmer checks the defect report file first and finds this exact issue was reported and partially diagnosed two weeks ago. What should happen now, per the note?`,
    [
      { letter: "A", text: `Give the user the information already in the file (the diagnosis so far, any workaround, and a fix-time estimate) rather than re-diagnosing from scratch, since this is a previously-reported defect, not a new one.` },
      { letter: "B", text: `Re-run the full diagnostic process from the beginning, since each user report must be independently investigated regardless of prior findings.`, rationale: `ignores the defect-report file's stated purpose (avoiding redundant re-diagnosis of known issues).` },
      { letter: "C", text: `Ignore the report, since it's already logged and no further action is needed until the fix ships.`, rationale: `contradicts the note's instruction to give the user the file's information, treating a known issue as requiring no user-facing response.` },
      { letter: "D", text: `Escalate immediately to fix it before any other work, since the note says every defect should be fixed immediately with no exceptions.`, rationale: `overstates the note's "ideally fixed immediately" aspiration into an absolute rule, ignoring its explicit "in practice, an immediate preliminary investigation is the best we can do."` },
    ],
    "A"
  ),
  mcq(
    "U5-M02b", 5, 2, "defect-reports.md",
    `A user of a subscription-renewal-prediction tool emails: "The model told my manager I was a low churn risk, and I quit two days later — it was just wrong about me." Using the AI touchpoint on defect reports, what makes this report structurally different from a normal corrective-maintenance defect report?`,
    [
      { letter: "A", text: `It has no reproducible case — there is no specific input/output pair, code path, or deterministic trigger the maintenance programmer can rerun to recreate the "defect," unlike a normal defect report which must include enough information to reproduce the problem; the report template has no field that fits this kind of complaint.` },
      { letter: "B", text: `It is structurally identical to a normal defect report, since the user described what went wrong in their own words.`, rationale: `denies any structural difference, missing the note's explicit "no reproducible case" framing.` },
      { letter: "C", text: `It differs only because the user emailed instead of using the official defect-report form.`, rationale: `misattributes the difference to reporting channel rather than to the nature of the complaint itself.` },
      { letter: "D", text: `It differs only because the complaint concerns a manager's decision rather than the software directly.`, rationale: `misattributes the difference to who made the decision rather than to the lack of a reproducible case.` },
    ],
    "A"
  ),
  mcq(
    "U5-M03a", 5, 1.5, "data-drift-in-trained-models.md",
    `An ad-targeting model's click-through prediction accuracy has been slipping for three months. No code has changed, no retraining has occurred, and support has received zero complaints (users have no way to know the predictions should be better). What does the note say explains this?`,
    [
      { letter: "A", text: `Data drift — the model's failure rate rises even though nobody touched it, because the world it was trained on (user behavior, ad inventory, seasonal patterns) has moved away from the world it now sees; this is the one case where the deterioration curve rises with no change events marked on it.` },
      { letter: "B", text: `Ordinary software deterioration — the model has been "running" for three months, and running long enough is sufficient to explain rising failure rates.`, rationale: `imports the "running long enough causes decay" misconception the software deterioration note explicitly rejects, and drift note reinforces as an exception.` },
      { letter: "C", text: `A regression fault from the last deployment, since failure rates rising over time always trace to a recent code change.`, rationale: `assumes a code-level cause despite the scenario stating no code changed.` },
      { letter: "D", text: `User dissatisfaction, since zero complaints actually indicates the problem is not real.`, rationale: `misreads "zero complaints" as evidence against the problem, when it is exactly the note's point that drift produces no complaints regardless of severity.` },
    ],
    "A"
  ),
  mcq(
    "U5-M03b", 5, 2.5, "data-drift-in-trained-models.md",
    `A logistics-ETA model's accuracy silently degrades over two months as a new highway bypass opens and traffic patterns shift, with nobody at the company aware anything has changed. A colleague says: "This is exactly the same as when we manually updated our old rules-based ETA system after that same highway opened last time — both are just adaptive maintenance responding to a changed environment." Evaluate.`,
    [
      { letter: "A", text: `Partially right, importantly incomplete — both are environment-change-triggered, but the rules-based update was a human-initiated modification with an identifiable trigger someone acted on; the model's drift has zero change events and nobody necessarily noticing the shift happened at all, requiring a categorically different detection mechanism (built-in monitoring) rather than the normal request-then-implement workflow.` },
      { letter: "B", text: `Completely correct — since both are responses to the same kind of environmental change (a new highway), they require identical processes.`, rationale: `treats the two cases as requiring identical processes, missing the detection-mechanism difference (human-initiated vs. silent).` },
      { letter: "C", text: `Completely wrong — data drift has nothing to do with adaptive maintenance at all, since no one performed adaptive maintenance on the model.`, rationale: `denies drift is a form of environment-triggered maintenance at all, overcorrecting past the genuine shared root the colleague identified.` },
      { letter: "D", text: `Correct, but only because both examples involve the same highway bypass; the comparison would not hold for a different kind of environmental change.`, rationale: `narrows the comparison's validity to this specific highway example, missing that the detection-mechanism distinction generalizes to any environmental change.` },
    ],
    "A"
  ),
  mcq(
    "U5-M04a", 5, 2, "engineering-ai-enabled-software.md",
    `A logistics company deploys an AI-powered route-optimization system. For "writing unit tests with fixed expected outputs for the route-scoring model," which of the note's three categories applies, and why?`,
    [
      { letter: "A", text: `Breaks — there is no expected output for a single input in the traditional sense for a model; correctness is a property over a population (evaluation on slices), not a fixed input-output mapping, so this specific practice cannot be carried over unchanged.` },
      { letter: "B", text: `Holds unchanged — unit testing works identically for model code and ordinary code.`, rationale: `denies unit testing is affected at all, contradicting the note's explicit "breaks" classification.` },
      { letter: "C", text: `Strained/reframed — unit testing still works for models but needs slightly longer timeouts.`, rationale: `minimizes a fundamental conceptual break into a minor timeout adjustment.` },
      { letter: "D", text: `Breaks, but only because route-optimization is safety-critical; for lower-stakes models unit testing would hold unchanged.`, rationale: `invents an unsupported safety-criticality carve-out not in the note.` },
    ],
    "A"
  ),
  mcq(
    "U5-M04b", 5, 2.5, "engineering-ai-enabled-software.md",
    `A classmate writes: "This unit basically proved that once you add machine learning, you can throw out everything you learned about ethics, requirements, and good programming practice, because it's all a different discipline now." Evaluate using the note's explicit framing.`,
    [
      { letter: "A", text: `Wrong by construction — the note's central point is "mostly the same, in three specific places not at all" (9 hold unchanged, 5 strained/reframed, only 3 break); ethics, good programming practice, and cost-of-correcting-faults are explicitly named as holding unchanged, directly contradicting the claim that everything must be thrown out.` },
      { letter: "B", text: `Correct — the note's whole purpose is to show that AI-enabled software requires an entirely new discipline built from scratch.`, rationale: `agrees with the classmate's one-sided reading, the exact wrong-lesson the note explicitly warns against.` },
      { letter: "C", text: `Correct, since 3 out of 17 practices breaking means the majority of the course's content is now obsolete.`, rationale: `treats a minority of broken practices as proof of majority obsolescence, an unsupported inference.` },
      { letter: "D", text: `Incorrect, but only because requirements specifically hold unchanged, when in fact the note places requirements in the "strained/reframed" category, not "holds unchanged."`, rationale: `misclassifies requirements as "holds unchanged" when the note places it in "strained/reframed."` },
    ],
    "A"
  ),

  written(
    "U5-W01", 5, 13, "data-drift-in-trained-models.md",
    `A subscription-box company's product-recommendation model has been quietly making worse recommendations for four months — customers have started unsubscribing at a slightly higher rate, but nobody has connected this to the recommendation model specifically, and no one has filed a complaint about "bad recommendations" by name. Explain precisely why the conventional defect-report pipeline will never surface this problem on its own, and state what would need to be true of the company's engineering process for the problem to be caught before it shows up in unsubscribe numbers.`,
    `The defect-report pipeline requires a user to notice a symptom, attribute it to something specific, and file a report describing it — but no customer can know their recommendations "should" have been better (they only see their own feed, not a baseline), so there's no observable, attributable symptom to report; there's also no code change to serve as a natural investigation trigger. For it to be caught early, the company would need monitoring designed in from the start — tracking model performance metrics directly (not waiting for downstream business symptoms like unsubscribes) and expecting decay as the default assumption, rather than "ship it and fix bugs when reported."`,
    `Suggesting better customer feedback forms or more attentive support staff as the fix, rather than recognizing that no user-initiated report is structurally possible here regardless of how attentive anyone is.`,
    `+15–20 requires explicitly stating why a user cannot notice/report this (no observable, attributable symptom), plus the built-in-monitoring requirement, not just "users won't report it."`
  ),
  written(
    "U5-W02", 5, 18, "engineering-ai-enabled-software.md",
    `A bank deploys an AI-assisted loan-underwriting system. For each of the following, say whether the note would call it (i) holds unchanged, (ii) strained/reframed, or (iii) breaks — and for any marked (ii) or (iii), state what specifically changes or replaces it: (a) the applicant-portal login and document-upload part of the system; (b) reviewing the labelling instructions used to build the training data, in place of reviewing individual approved/denied loan decisions; (c) the integration order between the credit-scoring model and the downstream automated-decision-letter service; (d) writing a defect report when a rejected applicant emails to say "the decision felt wrong."`,
    `(a) holds unchanged — ordinary software, unaffected by the model. (b) strained/reframed — this is exactly the replacement practice the note names: specification precision breaks (the spec becomes extensional, via training data), and the reviewable artifact shifts to the labelling instruction since nobody can review the rows themselves; reviews/inspections themselves hold unchanged and become the best tool. (c) strained/reframed — integration order becomes pipeline order, and the new hazard is training/serving computing features differently, where divergence causes silent quality degradation with no exception. (d) breaks — "the decision felt wrong" is a failure report with no reproducible case; the defect-report template has no field for it, since there's no specific input/output pair or code path to recreate.`,
    `Classifying all four the same way (e.g., calling everything "AI-affected" or everything "unchanged"), or getting classifications right but omitting the specific replacement/reframing mechanism for each.`,
    `+15–20 requires all four correctly classified AND the specific replacement/reframing mechanism named for each non-unchanged item. +10–14 for correct classifications with a vague or missing mechanism for one or more.`
  ),
];

export function itemsForUnit(unit: number): ExamItem[] {
  return EXAM_ITEMS.filter((item) => item.unit === unit);
}

export function unitInfo(unit: number): UnitInfo | undefined {
  return UNITS.find((u) => u.number === unit);
}
