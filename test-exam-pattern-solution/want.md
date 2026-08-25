# Wants

Everything asked for, recorded as it is asked.

Written by me, not by you — say what you want and it lands here. Quotes stay in
the language they were said in, close to verbatim. Paraphrasing loses the signal:
how something is asked for often says more than what is asked for.

## Why this is separate from `feedback.md`

`feedback.md` records what *happened*. This records what was *wanted*. They
diverge, and the gap between them is the finding — a want that keeps coming back
while nothing gets built for it is a real need; a want stated once and never
again probably was not.

## The field that matters

**Raised again.** One mention is a passing thought. The same want surfacing three
times across different sessions is a requirement, whatever anyone said about
priority at the time. That count is the strongest evidence in this folder, and it
only exists if every mention gets logged — including the ones that feel like
repeats of something already written down. *Especially* those.

## Entry format

```
### W<n> · <short name> — YYYY-MM-DD

> what was said, close to verbatim

**Context** — what we were doing when it came up
**Reading** — what I understood it to mean, so a wrong reading is visible later
**Status** — open / done / dropped / superseded by W<n>
**Raised again** — dates of every later mention
```

`superseded` matters as much as `done`. A want that gets replaced by a different
want tells you the first one was aimed at the wrong thing, and that is worth
keeping rather than deleting.

---

## Log

### W16 · Exams split per subject, structured to allow generating more — 2026-08-25

> ฉันคิดว่าการออกข้อสอบเราก็ควรต้องแยกวิชาด้วยนะเพื่อที่จะได้สัดส่วนชัดเจนและอาจจะมีการข้อให้
> gen เพิ่มมันจะได้ flexible มากขึ้น

**Context** Right after sending off the Simulation nav-placeholder addition,
while Final Approach (built for one subject, Modern Software Engineering
Principles, exam-02) is still being built.
**Reading** Two related requirements for the exam system generally, not just
this one build: (1) organize exams per-subject so proportions/coverage stay
legible per subject rather than one blob; (2) structure it so more items can
be requested/generated later without a rebuild — flexibility for growth, not
a one-shot fixed set.
**Status** open — relayed to the running Final Approach build (see W16a
below); the "ask for more later" structure still undesigned.
**Raised again** 2026-08-25

### W16a · Clarification: the Final Approach page itself, not just the data — 2026-08-25

> ฉันรู้เนื้อหาแยกตามวิชาอยู่แล้วแต่ตัวฟีเจอร์ Final Approach อยากแยกรายวิชาด้วย

**Context** Right after I said the data file is already subject-scoped.
**Reading** Correction, not new information — the data being split per
subject was never the point. The `/final-approach` page/route itself needs a
per-subject structure: a subject selection layer, so more subjects can be
added and taken separately rather than the route hard-pointing at one
subject's exam. Currently only Modern Software Engineering Principles has an
exam (exam-02); Data Science and Software Architecture don't yet.
**Status** open — relaying to the in-flight build now
**Raised again** —

### W15 · A second nav feature, "Simulation," for practice during learning — 2026-08-25

> แล้วก็สร้าง simulation วางไว้ก่อน final approach ด้วยนะจะเอาไว้เป็น ฟีเจอร์ practice ระหว่างเรียน

**Context** Right after Final Approach (exam-02, full-54-note revision) was
sent off to build.
**Reading** A second, separate nav feature named "Simulation," ordered before
Final Approach in the nav. Distinct purpose: practice *while* actively
learning, not final-exam cram — reads as the in-progress-study counterpart to
Final Approach's pre-final-exam counterpart. Scope/content source not yet
stated — unclear whether it should respect the normal lock/unlock gating
(unlike Final Approach, which explicitly bypasses it per W10) since "during
learning" implies the learner hasn't finished everything yet.
**Status** open
**Raised again** —

**Note** — Two nav features now named for two different points in the study
cycle: mid-course (Simulation) vs. pre-final (Final Approach). Worth watching
whether a third shows up for "right after a lecture" — would suggest the real
shape is a 3-stage practice ladder, not two ad hoc features.

**Raised again** 2026-08-25 — clarified via question: no content yet, nav tab
+ placeholder only, for now. Then, unprompted: "แต่ค่อยมาทำที่หลังจากฉันสอบเสร็จแล้ว"
(build the real thing after the exam is over). **Status** updated to: nav
placeholder only, content explicitly deferred past the exam date.

### W14 · Ship it as a real nav-bar menu, not a sandbox page — 2026-08-25

> ทำเป็น menu ใน nav bar เลยควรใช้ชื่อฟีเจอร์อะไรดีถ้ากรณีนี้เป็นการออกข้อสอบเพื่อเตรียมตัวสอบ
> ไม่ใช่ practice รายสัปดาร์เพื่อทบทวนการเรียน

**Context** Right after agreeing the exam-taking page should exist.
**Reading** Build it into the actual app nav (`web/components/TopNav.tsx`
and a real route), not a sandbox-only mockup. Also: name it so it reads as
final-exam drilling, distinct in kind from the weekly practice/review loop
Vega already owns — not a synonym for it.
**Status** open
**Raised again** —

**Note** — This is the first want that points at the live app rather than the
sandbox. Reads as the trial reaching its own conclusion for this one piece
(W2's "don't touch the system yet" was about not building blind before
knowing the need — two real exams now exist and got real reactions, so the
need is no longer unknown for this feature). Treating this as scoped to
"build the exam-taking page," not as lifting W2 for the rest of the system.

### W13 · Take the exam as a website, answers saved on the web — 2026-08-25

> อยากรู้ว่าถ้า file.md นี้เราสามารถเอาไปทำในรูปแบบของ website ได้ไหม และสามารถเขียนคำตอบ
> on web และบันทึกคำตอบบน web เลยได้ไหม

**Context** Right after exam-02 (80 MCQ + 20 written) was finished.
**Reading** A feasibility question, not yet a build request: can the .md exam
become a page you take in-browser, with answers entered and saved there
instead of by hand in a text file.
**Status** open
**Raised again** —

### W12 · 80 multiple-choice + 20 written, not all-written — 2026-08-25

> ตอนนี้ทั้งหมดมีกี่79ข้อใช่ไหม อยากให้เป็นแบบช้อย 80 ข้อ เขียน 20 ข้อ

**Context** Right after confirming the 79-item all-written exam has zero
multiple choice.
**Reading** Restructure to 100 items total: 80 multiple-choice, 20 written —
not a rejection of the write-only exam, a different format entirely. MCQ for
breadth/speed, writing kept for a smaller deep set.
**Status** open
**Raised again** —

**Note** — Runs against `exercise-design`'s explicit "never MCQ" guidance.
Worth treating as a real signal, not overridden lightly: the paper design
assumed MCQ is always weak, and the first real user reaction is "I want
choice format." Keep both `exam-01` (all-written) and the new MCQ version
side by side rather than replacing — the trial can compare which one actually
gets used/finished.

### W11 · Full-coverage exam, weighted to confusion points — 2026-08-25

> ทำข้อสอบครอบคลุมทั้ง 54 โน๊ต เน้นเรื่องที่มักงงหรือตอบผิด เอาส่วนที่คิดว่าเป็นใจความสำคัญ
> และเน้นตรงนั้นเป็นพิเศษ แต่ภาพรวมก็อยากให้ครอบคลุม แต่สุดท้ายแล้วคือเกร็งข้อสอบนั่นแหละ

**Context** Right after W10 (all 54 notes, revision framing), asked what the exam
should actually cover.
**Reading** Two layers: (1) breadth — every one of the 54 notes gets at least
something, no silent gaps; (2) weight — concepts that are commonly confused or
commonly answered wrong, and whatever is core/important, get disproportionately
more/harder attention. Named goal is exam-cram, not balanced pedagogy — optimize
for what's likely to be asked and likely to be missed, not for even coverage.
**Status** open
**Raised again** —

**Note** — This maps directly onto S4 in `strengths.md` (notes' "Watch out for"
sections as a latent question bank) as the weighting signal, not score/status
like `exam-design` skill's blueprint table assumes — there isn't real score
history to weight by yet for the locked 46. Also confirms W10: locked-concept
exclusion (a rule in `exam-design`) doesn't apply here since the point is
coverage of everything already studied.

### W10 · All 54 notes — this is final-exam revision — 2026-08-25

> เอามาทั้ง 54 โน๊ตเลย ครั้งนี้เป็นการเตรียมตัวสอบก่อนสอบไฟนอล เนื้อหาฉันเรียนมาหมดแล้ว
> ฉันเริ่มทำโปรเจ็คนี้ช้าเพราะฉันแค่อยากรู้วิธีการเรียนก่อนเพื่อทำให้ระบบการเรียนของฉันได้ประสิทธิภาพมากขึ้น
> อันนี้จะเป็นการออกแบบระบบเพื่อฝึกซ้อมก่อนไปสอบจริง เป็นระบบเตรียมสอบ

**Context** Right after I offered the 8 unlocked concepts as the testable set.
**Reading** The whole subject is fair game. The material has already been taught
and studied; this is revision under time pressure before a real final, not
learning from zero.
**Status** open
**Raised again** —

**Note** — This is the largest correction so far and it lands on an assumption
nobody stated out loud: the vault was built as a *learn-it-in-order* system, and
the actual need is *revise-what-I-already-covered*. Logged in `feedback.md` as the
first Observed entry, and it contradicts S1 in `strengths.md`.

### W9 · An exam for Modern Software Engineering Principles — 2026-08-25

> Modern Software Engineering Principles ฉันต้องการแบบทดสอบวิชานี้

**Context** First subject picked for the trial, straight after seeing the list.
**Reading** Build an exam for this subject. Scope, format and difficulty not yet
stated.
**Status** open
**Raised again** —

### W8 · Answer short, high level only — 2026-08-25

> ไม่ต้องตอบเยอะฉันถามแค่เรามีวิชาอะไรบ้างตอบแค่ high level พอ

**Context** After I answered "how many subjects" with a full breakdown by unit,
lock counts, and two pieces of analysis nobody asked for.
**Reading** Answer the question that was asked, at the level it was asked. Detail
on request, not by default.
**Status** open — applies from here on
**Raised again** —

**Note** — The extra analysis was accurate and still unwanted. Worth watching
whether this repeats: if it does, the problem is not verbosity in one answer but
a habit of treating every question as an invitation to survey.

### W7 · Start by seeing how many subjects there are — 2026-08-25

> ขั้นตออนแรกเลยนะเรามาดูกันก่อนมีกี่วิชาตอนนี้

**Context** First move of the trial, before any question is written.
**Reading** Survey the ground before designing anything — how many subjects, and
how much of each is reachable.
**Status** done
**Raised again** —

**Note** — The instinct was to look at the material before choosing what to test,
rather than starting from a topic. Worth watching whether that holds: if question
design keeps beginning with "what is available" rather than "what is weak", the
system needs to surface availability first.

### W6 · Log every want — 2026-08-25

> เพิ่ม want.md ไว้ด้วยเวลาฉันบอกอะไรให้ทำอะไรให้ไปบันทึกไว้ใน want

**Context** Right after the three analysis records were created.
**Reading** Every instruction or wish gets written down as it is said, by me,
without being asked each time.
**Status** done
**Raised again** —

### W5 · Records for the trial — 2026-08-25

> นายต้องสร้าง feedback risk และ จุดเด่น เพื่อหลังจากเก็บข้อมูลจากการลงมือทำจริงของเราแล้วจะได้เอามาวิเคราะห์ตอนท้าย

**Context** Setting up the sandbox folder.
**Reading** Three records — observations, risks, strengths — structured now so
that a real analysis is possible at the end rather than a pile of loose notes.
**Status** done
**Raised again** —

### W4 · Everything in the sandbox folder — 2026-08-25

> ทุกอย่างที่เปิดระบบทดสอบจะถูกเก็บไว้ในนี้

**Context** Naming `test-exam-pattern-solution/`.
**Reading** The trial is quarantined. Nothing from it goes into the vault or the
app until the trial says it should.
**Status** done
**Raised again** —

### W3 · You relay, I design — 2026-08-25

> ฉันจะเป็นคนคุยปรึกษากับนายและออกแบบข้อสอบเองก่อน นายแค่มีหน้าที่ไปบอกต่อ agent ว่าให้ agent ตัวอื่นสร้างคำตอบแบบไหน

**Context** Immediately after W2.
**Reading** Question design stays with you. My job is to think alongside you and
then translate what you decide into instructions an agent can act on.
**Status** open — the working arrangement from here
**Raised again** —

### W2 · Stop building, try it by hand first — 2026-08-25

> ตอนนี้อย่าเพิ่งไปยุ่งอะไรกับระบบได้ไหมอยากลองทำก่อนแล้วหา solution เพื่อหา need จริงๆ

**Context** Directly after I laid out a full build plan for the exam system in
response to W1.
**Reading** Find the need by using it before building for it.
**Status** open
**Raised again** —

**Note** — This reverses W1 within the same conversation, which is itself the
first real datum in this folder: a complete design existed on paper and the
instinct on seeing it laid out was *not yet*. Worth remembering at the end when
deciding what to build.

### W1 · Plan the exam system — 2026-08-25

> เรามาวางแผนทำแบบทดสอบกันดีกว่าว่าเราต้องมีระบบอะไรบ้าง

**Context** After the star chart and the vault were finished.
**Reading** Work out what an exam system needs.
**Status** superseded by W2
**Raised again** —
