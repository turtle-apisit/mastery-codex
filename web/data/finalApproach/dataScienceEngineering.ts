/**
 * Final Approach exam — "Data Science and Engineering Principles"
 * (80 MCQ + 20 written), authored directly against the vault's concept notes
 * in `02-Concepts/Data Science and Engineering Principles/`.
 *
 * Coverage blueprint (per `exam-design`): every one of the subject's 40 concept
 * notes gets at least two items, and each note's own "Watch out for" section is
 * the first place a distractor is drawn from — those are the errors the capture
 * already identified as the ones worth testing. Each item's `source` field names
 * the note it was written from, so a wrong answer maps straight back to one file.
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
  { number: 1, title: "Data Types & Exploratory Data Analysis", mcq: 14, written: 3, total: 17, minutes: 67.5 },
  { number: 2, title: "Model Fitting, Regression & Generalisation", mcq: 14, written: 4, total: 18, minutes: 82 },
  { number: 3, title: "Learning Paradigms & Classifiers", mcq: 24, written: 5, total: 29, minutes: 109.5 },
  { number: 4, title: "Classifier Evaluation", mcq: 8, written: 3, total: 11, minutes: 57.5 },
  { number: 5, title: "Decision Trees", mcq: 6, written: 2, total: 8, minutes: 41 },
  { number: 6, title: "Clustering & Association Rules", mcq: 14, written: 3, total: 17, minutes: 73 },
];

export const EXAM_META: ExamMeta = {
  totalItems: 100,
  mcqCount: 80,
  writtenCount: 20,
  totalMinutes: 430.5,
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
  // ============ Unit 1 — Data Types & Exploratory Data Analysis ============
  mcq(
    "U1-M01", 1, 2, "types-of-data-and-variables.md",
    `A retail analytics team encodes \`payment_method\` as {cash = 1, card = 2, wallet = 3}, computes the mean of that column per branch, gets 2.4 for the flagship store, and writes in the report: "the flagship branch trends toward wallet payments." Evaluate.`,
    [
      { letter: "A", text: `Valid — the encoding makes the column numerical, and discrete numerical data supports a mean.`, rationale: `treats the act of assigning numbers as converting a nominal variable into a numerical one; the note says explicitly that it does not.` },
      { letter: "B", text: `Valid, but the median should have been used instead, since the categories carry an order the mean ignores.`, rationale: `promotes the variable to ordinal — payment methods have no order at all, so the median is undefined here too.` },
      { letter: "C", text: `Invalid — \`payment_method\` is nominal, so numbers assigned to its categories cannot be meaningfully compared or averaged; the mode is the only measure of central tendency defined on it.` },
      { letter: "D", text: `Invalid only because three categories is too few; with a dozen payment methods the mean would become meaningful.`, rationale: `invents a category-count criterion — meaninglessness comes from the scale, not from how many levels it has.` },
    ],
    "C"
  ),
  mcq(
    "U1-M02", 1, 2, "types-of-data-and-variables.md",
    `A property dataset has four columns: (i) number of bedrooms, (ii) floor area in m² recorded to one decimal place, (iii) energy-efficiency band A–G, (iv) postcode. Classify all four.`,
    [
      { letter: "A", text: `(i) continuous, (ii) continuous, (iii) ordinal, (iv) nominal — a bedroom count sits on a real-valued axis like any other measurement.`, rationale: `skips the step-size test: a count with no meaningful value of 2.5 is discrete, not continuous.` },
      { letter: "B", text: `(i) discrete numerical, (ii) continuous numerical, (iii) ordinal categorical, (iv) nominal categorical.` },
      { letter: "C", text: `(i) discrete, (ii) discrete — because it was rounded to one decimal place, (iii) ordinal, (iv) nominal.`, rationale: `takes rounding in practice as making a variable discrete; the note says continuous values get rounded in practice and remain continuous.` },
      { letter: "D", text: `(i) discrete, (ii) continuous, (iii) nominal, (iv) ordinal.`, rationale: `swaps the two categorical columns — an A–G efficiency band is ordered, a postcode is not.` },
    ],
    "B"
  ),
  mcq(
    "U1-M03", 1, 2, "scales-of-measurement.md",
    `A climate dashboard prints two lines: "Today's 30 °C is twice as hot as last week's 15 °C" and "mean pH across the samples was 6.4." Which criticism is correct?`,
    [
      { letter: "A", text: `Both lines are invalid — pH is interval too, and no arithmetic at all is defined on an interval scale.`, rationale: `over-corrects: interval scales support differences and means, and fail only on ratios.` },
      { letter: "B", text: `Both lines are valid — 30 ÷ 15 = 2 is ordinary arithmetic, and any numeric column supports it.`, rationale: `applies arithmetic by looking at the numerals rather than at the scale that produced them.` },
      { letter: "C", text: `The ratio claim would be valid if the temperatures were converted to Fahrenheit first, since Fahrenheit's zero sits lower.`, rationale: `Fahrenheit is also an interval scale with an arbitrary zero; only Kelvin's zero means "no heat".` },
      { letter: "D", text: `The ratio claim is invalid — Celsius is interval with an arbitrary zero, and ratios of interval values are meaningless — while the mean pH is fine, since a mean needs equal intervals, not a true zero.` },
    ],
    "D"
  ),
  mcq(
    "U1-M04", 1, 1.5, "scales-of-measurement.md",
    `A hospital analytics team needs one variable on which the sentence "this patient's value is twice that patient's value" is meaningful. Which column qualifies, and why?`,
    [
      { letter: "A", text: `Pulse — a ratio scale whose zero means "no beats at all", so 120 bpm really is twice 60 bpm.` },
      { letter: "B", text: `TOEFL score (310–677) — the equal intervals across its range make "twice the score" meaningful.`, rationale: `equal intervals license differences, not ratios; there is no 0 on the scale and it would not mean zero ability.` },
      { letter: "C", text: `Education level (high school, BS, MS, PhD) — the levels are ordered, so a PhD is twice an MS.`, rationale: `ordinal order does not even guarantee equal gaps between levels, let alone ratios.` },
      { letter: "D", text: `Blood type — it can be coded numerically first, which makes the comparison well defined.`, rationale: `nominal scales support no arithmetic at all, and coding does not change the scale.` },
    ],
    "A"
  ),
  mcq(
    "U1-M05", 1, 2, "exploratory-data-analysis.md",
    `An analyst's opening plan for a new dataset is: (1) box plots of revenue per region, (2) fit a linear regression of sales on ad spend, (3) compute summary statistics, (4) run a hypothesis test on a suspected group difference. Which step is not EDA, and why?`,
    [
      { letter: "A", text: `Step 4 — hypothesis testing is inferential statistics and falls outside EDA's descriptive remit.`, rationale: `the note lists hypothesis testing inside EDA, alongside visualisation and statistical summaries.` },
      { letter: "B", text: `Step 2 — linear regression is data modelling, not EDA; EDA covers visualisation, statistical summaries and hypothesis testing, and the patterns it surfaces are what a regression is then built on.` },
      { letter: "C", text: `Steps 2 and 4 — both fit a parametric model to the data.`, rationale: `correctly excludes the regression but drags hypothesis testing out with it, which the note explicitly places inside EDA.` },
      { letter: "D", text: `None of them — every step that touches the data before deployment counts as EDA.`, rationale: `dissolves the boundary the note draws sharply: a box plot is EDA, a linear regression is not.` },
    ],
    "B"
  ),
  mcq(
    "U1-M06", 1, 2, "exploratory-data-analysis.md",
    `A team's EDA report reads: "We hypothesised that churn rises with plan price. Every chart we produced confirmed it. EDA complete." What is the strongest criticism?`,
    [
      { letter: "A", text: `They should have assumed a distribution for churn before plotting, since EDA is a parametric approach.`, rationale: `inverts the note — EDA is explicitly non-parametric, assuming no underlying distribution.` },
      { letter: "B", text: `The problem is the tooling: confirmation is fine, but only a fitted regression can confirm a hypothesis.`, rationale: `shifts the complaint to charts-versus-models; the problem is the closed hypothesis, not the instrument.` },
      { letter: "C", text: `There is no problem — confirming the stated hypothesis is exactly what EDA is for.`, rationale: `reduces EDA to hypothesis confirmation, which is the specific failure the note names.` },
      { letter: "D", text: `EDA that only confirms a belief held in advance has not done its job — recognising patterns that were not expected is part of the purpose, and a chart programme built solely around one hypothesis cannot surface them.` },
    ],
    "D"
  ),
  mcq(
    "U1-M07", 1, 2, "measures-of-central-tendency.md",
    `A city publishes mean household income of 92,000 and median household income of 54,000 for the same year. What does the pair tell you, and which figure describes the typical household?`,
    [
      { letter: "A", text: `A pronounced right skew — a small number of very high incomes is dragging the mean upward; the median is the honest summary, which is exactly why household income is reported as a median.` },
      { letter: "B", text: `A left skew, since the mean is the larger figure and the mean always sits on the short tail.`, rationale: `reverses the diagnostic: mean greater than median indicates a right skew.` },
      { letter: "C", text: `Nothing about shape — the two are simply different definitions and the gap between them carries no information.`, rationale: `denies the diagnostic the note builds explicitly (mean ≈ median suggests symmetry, mean > median suggests right skew).` },
      { letter: "D", text: `A data-entry error, since mean and median agree on any correctly recorded dataset.`, rationale: `treats disagreement as data corruption rather than as the ordinary signature of skew.` },
    ],
    "A"
  ),
  mcq(
    "U1-M08", 1, 2, "measures-of-central-tendency.md",
    `A survey table has one nominal column (preferred contact channel) and one continuous column (response time in minutes). The analyst wants a "typical value" for each. What should be reported?`,
    [
      { letter: "A", text: `The mean for both, since the channel can be numerically encoded first.`, rationale: `encoding nominal categories does not make an average of them meaningful.` },
      { letter: "B", text: `The median for both, because the median is immune to outliers and is therefore always the safest choice.`, rationale: `outlier immunity does not make the median defined on unordered categories — there is no middle value without an order.` },
      { letter: "C", text: `The mode for contact channel — the only one of the three defined on nominal data — and for response time any of the three, though reporting mean alongside median is better, since relying on a single measure is a bad idea.` },
      { letter: "D", text: `The mode for both, because it is the only measure that works without assuming a distribution.`, rationale: `invents a distributional restriction on the mean and median that the note does not make.` },
    ],
    "C"
  ),
  mcq(
    "U1-M09", 1, 2, "box-plot.md",
    `In a box plot, Q1 = 20 and Q3 = 40. The largest observation not exceeding the upper fence is 61. A student draws the upper whisker at 70. Evaluate.`,
    [
      { letter: "A", text: `Correct — the whisker is defined as Q3 + 1.5 × IQR, so 70 is exactly right.`, rationale: `the classic error the note names: drawing the whisker at the fence.` },
      { letter: "B", text: `Wrong — 70 is the fence; the whisker must terminate at the largest observed value still inside it, which is 61.` },
      { letter: "C", text: `Wrong, but for a different reason — the whisker should reach the maximum observation in the data regardless of where the fences fall.`, rationale: `ignores the fences entirely; values beyond them are drawn separately as outliers, not reached by a whisker.` },
      { letter: "D", text: `Not judgeable — whisker placement is a stylistic choice that varies between plotting libraries.`, rationale: `treats a defined rule (fence formula, whisker at nearest in-fence observation) as a matter of convention.` },
    ],
    "B"
  ),
  mcq(
    "U1-M10", 1, 2.5, "box-plot.md",
    `A reviewer returns a box plot with two comments: "your upper whisker is nearly twice the length of the lower one — please fix the drawing error," and "add a second chart showing outliers, since a box plot hides them." Evaluate both.`,
    [
      { letter: "A", text: `The first is right and the second wrong — whiskers must be symmetric, because both fences sit 1.5 × IQR from the box.`, rationale: `takes fence symmetry for whisker symmetry; a whisker ends at data, not at its fence.` },
      { letter: "B", text: `Both are right — a box plot summarises a distribution to five numbers and by construction cannot show individual points.`, rationale: `confuses the box plot with the scatter plot's role; outliers are precisely the individual points a box plot does draw.` },
      { letter: "C", text: `The first is wrong and the second right — outliers need a separate scatter plot to be visible.`, rationale: `gets the whisker point right but denies the box plot's explicit outlier display, one of the five things it shows.` },
      { letter: "D", text: `Both are wrong — unequal whisker lengths are normal, because each whisker must end at a real observed value, and the inequality is itself a skew signal; and points outside the fences are already drawn as outliers by the box plot.` },
    ],
    "D"
  ),
  mcq(
    "U1-M11", 1, 2, "scatter-plot.md",
    `An analyst has 5,000 paired sensor readings and wants to see, before fitting anything, whether a straight line is a plausible shape and how dense or sparse the data is. Which chart, and why not the other?`,
    [
      { letter: "A", text: `A scatter plot — it shows every observation with nothing aggregated away, so density, spread and the shape of the joint relationship are all visible; a box plot compresses each variable to five numbers and cannot show a joint shape at all.` },
      { letter: "B", text: `A box plot — plotting the two variables side by side reveals whether their quartiles line up, which is what "linear" means.`, rationale: `quartile alignment between two separate one-variable summaries says nothing about the joint relationship.` },
      { letter: "C", text: `Either — at 5,000 points a scatter plot becomes unreadable, so the box plot is the safer default.`, rationale: `makes readability the criterion and gives up the only chart that can show the shape being asked about.` },
      { letter: "D", text: `Neither — whether a linear shape is plausible can only be judged from R² after the model is fitted.`, rationale: `reverses the workflow; the scatter plot exists to be read before fitting, which is why EDA precedes modelling.` },
    ],
    "A"
  ),
  mcq(
    "U1-M12", 1, 2, "correlation.md",
    `An analyst relates hotel star rating (1–5 stars) to average nightly price using the Pearson coefficient. Evaluate the choice.`,
    [
      { letter: "A", text: `Correct — star ratings are numbers between 1 and 5, so Pearson applies.`, rationale: `reads the numerals rather than the scale; ordinal levels carry no guaranteed equal spacing.` },
      { letter: "B", text: `Wrong, because Pearson works only on categorical data while price is numerical.`, rationale: `inverts the rule — Pearson is the coefficient for numerical data.` },
      { letter: "C", text: `Wrong — star rating is ordinal, so Spearman is the correct coefficient; Spearman also covers monotonic relationships, whereas Pearson is restricted to linear ones.` },
      { letter: "D", text: `Correct, because Spearman applies only when the relationship is non-monotonic.`, rationale: `reverses Spearman's condition — it is the coefficient that handles monotonic relationships.` },
    ],
    "C"
  ),
  mcq(
    "U1-M13", 1, 2, "correlation.md",
    `Pearson r between drug dosage and patient response comes out at 0.02, and the analyst drops dosage as "unrelated." The scatter plot shows a clean inverted-U: response rises to a peak at mid-dose and falls away on both sides. Evaluate.`,
    [
      { letter: "A", text: `Wrong — a Pearson r near zero means no linear relationship, and a U-shaped or inverted-U relationship produces exactly that; the relationship here is strong, just invisible to Pearson.` },
      { letter: "B", text: `Right — r bounded in [−1, 1] with r ≈ 0 is the definition of independence between two variables.`, rationale: `equates zero linear correlation with independence, which is the exact error the note flags.` },
      { letter: "C", text: `Wrong, because r = 0.02 is positive, so there is a weak positive relationship worth keeping.`, rationale: `reads a rounding-level magnitude as a real weak effect and misses the shape problem entirely.` },
      { letter: "D", text: `Wrong, because Pearson should never be used on numerical data in the first place.`, rationale: `contradicts the rule — numerical data is precisely Pearson's case.` },
    ],
    "A"
  ),
  mcq(
    "U1-M14", 1, 2.5, "correlation.md",
    `Two candidate predictors: A has r = +0.34 with the target, B has r = −0.88. A colleague says: "Use A — a negative correlation means the variable works against the target, so B can't help. And at 0.88, B would anyway prove causation, which we don't need." Evaluate.`,
    [
      { letter: "A", text: `The first half is right and the second wrong — a negatively correlated variable genuinely cannot serve as a predictor.`, rationale: `keeps the sign-as-usefulness error; direction has no bearing on predictive value.` },
      { letter: "B", text: `Both halves are wrong — magnitude carries strength and sign carries only direction, so B at −0.88 is much the stronger relationship and the better predictor; and no correlation of any magnitude establishes causation.` },
      { letter: "C", text: `The first half is wrong and the second right — above |r| = 0.8 a relationship can fairly be called causal.`, rationale: `invents a magnitude threshold above which correlation becomes causation; no such threshold exists.` },
      { letter: "D", text: `Both halves are right, provided the underlying relationship is linear.`, rationale: `endorses both errors under a condition that changes neither of them.` },
    ],
    "B"
  ),

  written(
    "U1-W01", 1, 12, "box-plot.md",
    `A box plot is being drawn for a dataset whose quartiles are Q1 = 18 and Q3 = 30. The smallest observation at or above the lower fence is 6; the largest observation at or below the upper fence is 44; the dataset also contains the value 61. Compute both fences, state exactly where each whisker ends and why, say what happens to 61, and explain why the two whiskers come out different lengths and what that difference tells the reader.`,
    `IQR = 30 − 18 = 12. Lower fence = Q1 − 1.5 × IQR = 18 − 18 = 0; upper fence = Q3 + 1.5 × IQR = 30 + 18 = 48. The whiskers do NOT sit at 0 and 48 — a whisker must terminate at a real observed value, so the lower whisker ends at 6 and the upper at 44, the smallest and largest observations still inside the fences. 61 lies beyond the upper fence and is therefore drawn separately as an outlier, not reached by the whisker. The lower whisker spans 18 − 6 = 12 and the upper spans 44 − 30 = 14: unequal lengths are the normal result of both ends having to land on actual data, and the inequality is itself a signal of skew, not a drawing error.`,
    `Drawing the whiskers at the fences (0 and 48), or treating the unequal whisker lengths as a mistake to be corrected by extending the shorter one.`,
    `+15–20 requires both fence values computed, both whisker ends named as observed values with the reason, 61 identified as an outlier, and unequal length explained as normal and skew-signalling. +10–14 if the fences and whiskers are right but the skew reading is missing.`
  ),
  written(
    "U1-W02", 1, 13, "scales-of-measurement.md",
    `A dashboard reports the arithmetic mean of four columns: (a) zip code, (b) customer satisfaction rating on a 1–5 scale, (c) outdoor temperature in °C, (d) resting pulse. For each column, name its measurement scale, say whether the mean is meaningful, and where it is not, say what should be reported instead. Then state the single test that separates (c) from (d).`,
    `(a) Zip code is nominal despite looking numeric — labels only, no order; the mean is meaningless and the mode is the measure to report. (b) A 1–5 satisfaction rating is ordinal — order exists but the gaps between levels are unequal or unknown, so a mean is at best shaky; report the median or the full distribution (and correlate it with Spearman, not Pearson). (c) Temperature in °C is interval — equal intervals, arbitrary zero — so the mean is meaningful, but ratio statements such as "twice as hot" are not. (d) Pulse is ratio — it has a true zero meaning "none of it" — so both the mean and ratio statements are valid. The test separating interval from ratio is whether zero means the absence of the quantity: 0 °C does not mean "no heat", 0 bpm does mean no beats.`,
    `Ruling the °C mean invalid alongside the zip-code mean. Interval scales do support means; they fail only on ratios.`,
    `+15–20 requires all four scales named correctly, the right replacement measure wherever the mean fails, AND the zero-means-absence test stated explicitly. +10–14 for correct scales with one replacement measure or the interval/ratio test missing.`
  ),
  written(
    "U1-W03", 1, 14, "exploratory-data-analysis.md",
    `An analyst receives a new dataset, immediately fits a multivariate linear regression, obtains R² = 0.81, and reports that advertising spend drives revenue. Name the two EDA charts that were skipped, say specifically what each one would have caught, and state precisely what an R² of 0.81 does and does not license.`,
    `The skipped stage is EDA itself — a non-parametric look at what the data actually is, before any model shape is assumed. Specifically: the scatter plot, which shows every observation with nothing aggregated away and would reveal whether a straight line is even a plausible shape for the relationship and how dense or sparse the data is; and the box plot, which would surface skew and outliers (points beyond the 1.5 × IQR fences) that a least-squares fit is sensitive to. R² = 0.81 says only what share of the variance in revenue the model accounts for. It does not establish that ad spend causes revenue — correlation does not mean causation, and a linear model can only measure that two things move together; it does not show the model generalises to unseen data; and it does not show that a linear shape was appropriate in the first place. A further point: one purpose of EDA is recognising patterns that were not expected in advance, which going straight to a pre-chosen model structurally cannot do.`,
    `Answering only "they should have plotted the data first" without saying what each chart catches, or treating the high R² as evidence that the linear form was the right choice.`,
    `+15–20 requires both charts with the specific thing each catches AND all three limits of R² (no causation, no generalisation evidence, no shape validation). +10–14 if one chart's specific catch or one R² limit is missing.`
  ),

  // ========= Unit 2 — Model Fitting, Regression & Generalisation =========
  mcq(
    "U2-M01", 2, 2, "model-fitting.md",
    `Three artefacts land on the same desk: (i) an ERD of the warehouse schema showing entities and their relationships, (ii) a spline interpolation drawn through a set of sensor readings, (iii) coefficients of a pre-selected exponential-decay model adjusted by maximum likelihood estimation. Classify each as data modelling, data fitting, or model fitting.`,
    [
      { letter: "A", text: `All three are model fitting, since each produces a representation of the data.`, rationale: `collapses the three terms the note deliberately separates into one.` },
      { letter: "B", text: `(i) data fitting, (ii) model fitting, (iii) data modelling.`, rationale: `rotates the three labels; an ERD is conceptual and involves no numbers at all, so it cannot be data fitting.` },
      { letter: "C", text: `(i) data modelling — a conceptual representation, (ii) data fitting — a mathematical function found to describe existing data, (iii) model fitting — parameters of a pre-selected model adjusted to fit observations.` },
      { letter: "D", text: `(i) data modelling, (ii) model fitting, (iii) data fitting — because maximum likelihood is a curve-fitting technique.`, rationale: `swaps (ii) and (iii); the mark of model fitting is that the model was pre-selected and its parameters adjusted, not that a curve comes out.` },
    ],
    "C"
  ),
  mcq(
    "U2-M02", 2, 2, "model-fitting.md",
    `A team fits one model with default settings, sees a low training error, and closes the ticket: "model fitting is done — the fit is good." What is wrong?`,
    [
      { letter: "A", text: `Nothing — a low training error is by definition a good fit.`, rationale: `takes fit on training data as the criterion, when the note names generalisation as model fitting's defining concern.` },
      { letter: "B", text: `Two things: model fitting is an iterative process — several approaches usually apply and each has parameters giving different configurations — and its defining concern is generalisation to new unseen data, which no training-set number can demonstrate.` },
      { letter: "C", text: `Only that they should have used gradient descent rather than whatever optimiser the defaults chose.`, rationale: `substitutes a technique preference for the two structural problems with the claim.` },
      { letter: "D", text: `That model fitting requires an ERD of the data to be drawn first.`, rationale: `imports data modelling — a different one of the three terms — as a prerequisite step it is not.` },
    ],
    "B"
  ),
  mcq(
    "U2-M03", 2, 2, "simple-linear-regression.md",
    `A student writes: "Least squares returns the minimum value of the loss function, and that value is w." Evaluate.`,
    [
      { letter: "A", text: `Correct as stated — the minimum of the loss function is exactly the parameter set.`, rationale: `endorses the arg min confusion the note flags explicitly.` },
      { letter: "B", text: `Confused, but the fix is that least squares maximises the loss function rather than minimising it.`, rationale: `inverts the optimisation direction; the loss is minimised.` },
      { letter: "C", text: `Confused, because w is the residual ε rather than the intercept and slope.`, rationale: `reassigns w to the error term — ε is the residual, w is the parameter set.` },
      { letter: "D", text: `Confused — \`arg min\` returns the argument that produces the minimum, so w is the intercept-and-slope pair that minimises the loss, not the minimum loss value itself; you obtain it by differentiating the loss, setting the derivative to zero, and solving.` },
    ],
    "D"
  ),
  mcq(
    "U2-M04", 2, 2, "simple-linear-regression.md",
    `The target variable is "did the customer churn — yes or no". An analyst fits a linear regression and quantises the output with a threshold. Evaluate.`,
    [
      { letter: "A", text: `It can be forced this way, but logistic regression is generally more suitable for a categorical target because it is probability-based; linear regression's natural target is numerical.` },
      { letter: "B", text: `Impossible — linear regression cannot be applied to a categorical target under any circumstance.`, rationale: `overstates the rule; the note says you can quantise with threshold values, only that it is not the better tool.` },
      { letter: "C", text: `Preferred, in fact — thresholding gives a hard decision, whereas logistic regression only gives probabilities.`, rationale: `treats a probability output as a defect, when being probability-based is exactly why the note prefers logistic regression here.` },
      { letter: "D", text: `Fine, provided the predictor variables are all numerical — a categorical target is only a problem when the predictors are categorical too.`, rationale: `invents a predictor-type condition; predictors may be numerical, categorical or ordinal, and the issue is the target.` },
    ],
    "A"
  ),
  mcq(
    "U2-M05", 2, 2.5, "multivariate-linear-regression.md",
    `A simple regression of car price on horsepower alone gives a horsepower coefficient of 92. In the multivariate model \`Price = 58.35*Horsepower + 110.13*Length + 101.45*EngineSize − 24,836.65\` the same predictor's coefficient is 58.35. A colleague says one of the two runs must have a bug. Evaluate.`,
    [
      { letter: "A", text: `The multivariate figure must be wrong, because adding variables cannot change a coefficient that has already been estimated.`, rationale: `assumes a coefficient is independent of the model it sits in, which is the opposite of what "controlling for other predictors" means.` },
      { letter: "B", text: `The simple regression is the trustworthy one, since fewer variables means less noise in the estimate.`, rationale: `prefers the model that cannot control for anything, discarding the point of multivariate regression.` },
      { letter: "C", text: `Neither is a bug — a multivariate coefficient means "the effect of this predictor while holding the others fixed", which is not the number a simple regression on that variable alone produces, because that one silently absorbs the effects of the correlated predictors it omits.` },
      { letter: "D", text: `They differ only because the multivariate model used dummy coding for a brand variable.`, rationale: `attributes the difference to dummy coding, a separate mechanism that handles categorical predictors.` },
    ],
    "C"
  ),
  mcq(
    "U2-M06", 2, 2.5, "multivariate-linear-regression.md",
    `In a multivariate regression on the automobile dataset you need to answer two questions — "is horsepower on its own statistically significant?" and "are the three engine-related variables jointly significant?" — and then predict the price of a BMW specifically. Which combination is right?`,
    [
      { letter: "A", text: `F-test for the single variable, t-test for the group, and enter the brand as its index number in the brand list.`, rationale: `swaps the two tests and enters a nominal brand as a numeric index instead of dummy coding it.` },
      { letter: "B", text: `t-test for the single variable, F-test for the group (the larger the better), and for the brand multiply 1.0 into the chosen brand's coefficient and 0.0 into every other brand's — one brand at a time.` },
      { letter: "C", text: `The p-value for the single variable, the t-test for the group, and average the brand coefficients together.`, rationale: `substitutes the p-value (which is read for the overall picture) for the single-variable test, and averages dummies that are mutually exclusive by construction.` },
      { letter: "D", text: `The t-test for both questions, since the F-test applies only to classification models.`, rationale: `invents a restriction confining the F-test to classification; it is the joint-significance test for regression here.` },
    ],
    "B"
  ),
  mcq(
    "U2-M07", 2, 1.5, "r-squared-and-adjusted-r-squared.md",
    `A predictor of pure noise is added to an existing multiple regression. What happens to R² and to adjusted R²?`,
    [
      { letter: "A", text: `Both decrease, which is how a useless variable is detected.`, rationale: `has plain R² able to fall when a variable is added, which it cannot.` },
      { letter: "B", text: `Both increase; the difference between the two figures is cosmetic.`, rationale: `erases the penalty term that is the entire reason adjusted R² exists.` },
      { letter: "C", text: `R² decreases and adjusted R² increases.`, rationale: `inverts both directions at once.` },
      { letter: "D", text: `R² rises or stays flat — it can never fall when a variable is added, however worthless — while adjusted R² decreases, which is exactly what makes adjusted R² the figure to read for model selection.` },
    ],
    "D"
  ),
  mcq(
    "U2-M08", 2, 2.5, "r-squared-and-adjusted-r-squared.md",
    `Model A: 3 predictors, R² = 0.79, adjusted R² = 0.77. Model B: 14 predictors, R² = 0.83, adjusted R² = 0.71. A colleague says: "Take B — it explains more variance, and anyway adjusted R² can exceed R² when the extra predictors are strong." Evaluate.`,
    [
      { letter: "A", text: `Take A — adjusted R² is the figure for comparing models with different predictor counts, and B's drop from 0.83 to 0.71 says most of its extra variables are contributing nothing; the colleague's second claim is impossible, since adjusted R² is always less than or equal to R².` },
      { letter: "B", text: `Take B — 0.83 explains more variance, and adjusted R² is only a rough heuristic.`, rationale: `uses plain R² to compare models with different predictor counts, the one comparison it cannot support.` },
      { letter: "C", text: `Take B, and the colleague is right that adjusted R² can exceed R² when the added predictors are strong.`, rationale: `endorses an impossible relation — adjusted R² is always ≤ R².` },
      { letter: "D", text: `Neither can be chosen from these figures; model selection requires a causal argument, not a fit statistic.`, rationale: `refuses the comparison adjusted R² was specifically designed to make.` },
    ],
    "A"
  ),
  mcq(
    "U2-M09", 2, 2, "overfitting-and-underfitting.md",
    `A model shows 24% training error and 26% test error. The team calls it overfitting and adds regularisation. Evaluate.`,
    [
      { letter: "A", text: `Correct diagnosis — any model performing badly on test data is overfitted.`, rationale: `the instinct the note flags: calling every bad model overfitted.` },
      { letter: "B", text: `Not judgeable from two numbers; overfitting is visible only in a learning curve plotted over training epochs.`, rationale: `refuses a diagnosis the note defines precisely on this pair of numbers.` },
      { letter: "C", text: `Misdiagnosed — both errors are high and the gap between them is small, which is underfitting (high bias, model too simple); the fix is a more capable model, not a remedy aimed at a gap that isn't there.` },
      { letter: "D", text: `Misdiagnosed — it is overfitting to the test set rather than the training set, since the test error is the larger of the two.`, rationale: `invents "overfitting the test set" from a two-point difference; overfitting requires a large gap with test error significantly higher.` },
    ],
    "C"
  ),
  mcq(
    "U2-M10", 2, 2.5, "overfitting-and-underfitting.md",
    `Five models are trained on five different samples drawn from the same population. Each reaches near-zero training error, but given the same input dataset they make significantly different predictions. Classify the problem and name the course's remedy.`,
    [
      { letter: "A", text: `High bias — underfitting; disagreement between models means none of them has learned the true function.`, rationale: `applies the bias label to a disagreement symptom, when high bias is defined by accuracy being low.` },
      { letter: "B", text: `High variance — overfitting; the definition of high variance is precisely that models trained on training sets drawn from the same population make significantly different predictions given the same input, and the course's named remedy is K-fold cross-validation.` },
      { letter: "C", text: `High variance, and the remedy is to enlarge the test set until the estimates stabilise.`, rationale: `gets the label right but treats a model-complexity problem as an evaluation-sample-size problem.` },
      { letter: "D", text: `Neither — near-zero training error rules both out, since both are defined by a high training error.`, rationale: `makes high training error part of the definition of overfitting, when overfitting's signature is low training error with a large gap.` },
    ],
    "B"
  ),
  mcq(
    "U2-M11", 2, 2, "model-parameters-and-hyperparameters.md",
    `Classify each of these: (i) the slope of a fitted regression line, (ii) k in KNN, (iii) the learning rate, (iv) the intercept of that same regression line.`,
    [
      { letter: "A", text: `(i) and (iv) are model parameters — estimated from the data automatically by the algorithm; (ii) and (iii) are hyperparameters — set manually and used in the process that estimates the parameters.` },
      { letter: "B", text: `All four are parameters, since all four are numbers that live inside the model.`, rationale: `uses "is a number in the model" as the criterion instead of who sets it.` },
      { letter: "C", text: `(i) and (iv) are hyperparameters, because the analyst chooses the model form that produces them; (ii) and (iii) are parameters.`, rationale: `inverts the split — choosing a model form is not the same as setting a value manually.` },
      { letter: "D", text: `(ii) is a parameter, because the Elbow Method lets the algorithm learn k from the data.`, rationale: `the Elbow Method is a human-read diagnostic for choosing k; it exists precisely because there is no algorithmic way to learn it.` },
    ],
    "A"
  ),
  mcq(
    "U2-M12", 2, 2, "training-validation-and-test-sets.md",
    `A team searches values of k for KNN, picks the k with the best accuracy on the test set, and reports that accuracy as the model's final performance. Evaluate.`,
    [
      { letter: "A", text: `No error — k is a hyperparameter and the test set is the right place to compare hyperparameter values.`, rationale: `assigns the test set the validation set's job, which destroys the unbiased final estimate.` },
      { letter: "B", text: `One error — k is a model parameter, so it should have been estimated by the algorithm rather than searched at all.`, rationale: `misclassifies k; it is explicitly named as a hyperparameter.` },
      { letter: "C", text: `No error, provided the test set is large enough that the selection bias is negligible.`, rationale: `treats a structural leak as a sample-size issue.` },
      { letter: "D", text: `Two errors compounding: hyperparameters are tuned against the validation set, and tuning against the test set silently converts it into a validation set — so the reported number is no longer an unbiased estimate of final performance.` },
    ],
    "D"
  ),
  mcq(
    "U2-M13", 2, 2.5, "training-validation-and-test-sets.md",
    `State what the model does with each of the three splits.`,
    [
      { letter: "A", text: `Training and validation are both learned from; only the test set is withheld.`, rationale: `has the model learning from the validation set, which is exactly what it must not do.` },
      { letter: "B", text: `All three are learned from in sequence, which is why the splits get progressively smaller.`, rationale: `describes a procedure that would leak every split into the model and leave nothing unbiased to evaluate on.` },
      { letter: "C", text: `Training (~70%) is seen and learned from; validation (~10%, also called the dev set) is occasionally seen but not learned from, giving an unbiased evaluation while hyperparameters are tuned; test (~20%) is used only once, for an unbiased evaluation of the final model — and is called a holdout set when it has never been used in training.` },
      { letter: "D", text: `Validation is used once at the end and test is consulted repeatedly during tuning.`, rationale: `swaps the two sets' usage patterns exactly.` },
    ],
    "C"
  ),
  mcq(
    "U2-M14", 2, 2, "training-validation-and-test-sets.md",
    `"Our model reached 99.4% accuracy on the data we trained it on, so it will generalise." Evaluate.`,
    [
      { letter: "A", text: `Safe, if the training set is large enough — a large sample cannot carry much bias.`, rationale: `treats size as a cure for bias; the objection is structural, not about sample size.` },
      { letter: "B", text: `Unsafe — evaluating a model on the data it was trained on is a bad idea because of possible biases: a model that fits training data with very high accuracy has also fitted the biases in that dataset, and the goal is predicting new data points, about which this number says nothing.` },
      { letter: "C", text: `Unsafe only because 99.4% is implausibly high and points to a bug in the pipeline.`, rationale: `attacks the specific number rather than the structural problem with self-evaluation.` },
      { letter: "D", text: `Safe — training accuracy and test accuracy converge as training proceeds.`, rationale: `asserts a convergence that overfitting is precisely the counterexample to.` },
    ],
    "B"
  ),

  written(
    "U2-W01", 2, 14, "overfitting-and-underfitting.md",
    `Three models on the same dataset. Model A: training error 3%, test error 27%. Model B: training error 22%, test error 24%. Model C: training error 6%, test error 8%. Diagnose each one, giving the bias/variance term that goes with it, explain why neither error number is interpretable on its own, and name the remedy this course gives for whichever model is overfitting.`,
    `Model A — a large gap with test error significantly higher than training error: overfitting, high variance; the model is too complex and has learned the noise. Model B — both errors sufficiently high: underfitting, high bias; the model is too simple, and "biased" here means the model's accuracy is low. Model C — both errors low with a small gap: neither; this is the well-fitted model. The diagnostic is a pair of numbers because low training error alone is consistent with both a great model and a badly overfitted one, and high test error alone cannot distinguish A from B. High variance has a precise definition worth stating: models trained on training sets drawn from the same population make significantly different predictions given the same input. The course's named remedy for overfitting is K-fold cross-validation.`,
    `Calling Model B overfitting because its test error is poor — high training error AND high test error is underfitting, and this is the note's named common error.`,
    `+15–20 requires all three diagnosed with the correct bias/variance term, the pair-of-numbers argument stated explicitly, and K-fold cross-validation named. +10–14 if all three are diagnosed but the pair argument is only implied.`
  ),
  written(
    "U2-W02", 2, 16, "k-fold-cross-validation.md",
    `A team with 10,000 rows splits 80/20, sets the 20% aside, divides the 80% into 5 folds, and runs 5-fold cross-validation across six candidate hyperparameter sets, recording the average accuracy of each. They pick the hyperparameter set with the highest average, then ship the single fold-model that had scored highest during its cross-validation run, reporting that fold's accuracy as the final figure. List what they got right, identify every step they got wrong, and give the correct procedure from the point they diverged.`,
    `Right: holding out 20% as a final test set and keeping it aside; splitting the remaining 80% into 5 folds; training on K−1 folds and validating on the remaining fold; averaging accuracy across the K folds; repeating for each hyperparameter set; and selecting the hyperparameters with the highest average accuracy. Wrong, in two places. (1) They kept a fold model. After selecting the best hyperparameters you retrain from scratch on the whole 80% training portion using those hyperparameters — that retrained model is the final model, and no further validation is needed. This is the step most often forgotten. (2) They reported a cross-validation fold accuracy as the final number. The final model must then be run against the held-out 20% test set, and that is the accuracy to report. The underlying principle: cross-validation is a way of choosing hyperparameters and reducing overfitting — it is not a substitute for the final held-out test set.`,
    `Naming only one of the two errors — usually "they should have used the test set" — and missing the retrain-on-the-full-80% step, or vice versa.`,
    `+15–20 requires both errors named with the correct replacement step for each, plus the statement that cross-validation does not replace the holdout test set. +10–14 if only one of the two errors is found but corrected properly.`
  ),
  written(
    "U2-W03", 2, 12, "r-squared-and-adjusted-r-squared.md",
    `Model A uses 3 predictors and reports R² = 0.79, adjusted R² = 0.77. Model B uses 14 predictors and reports R² = 0.83, adjusted R² = 0.71. Choose between them and justify the choice from the mechanics of the two statistics; say what the gap between B's two figures tells you about its extra 11 variables; and name one thing neither statistic establishes.`,
    `Choose A. Plain R² cannot be used to compare models with different numbers of predictors, because it can only go up when a variable is added, however worthless that variable is — so B's higher 0.83 carries no information about whether B is the better model. Adjusted R² is R² corrected for the number of predictors, and the correction runs in both directions: useless variables push it down, useful ones push it up. B's adjusted R² falling to 0.71 — well below its own R² of 0.83, and below A's 0.77 — says most of B's extra 11 variables are contributing nothing and are being penalised for their presence. Both rows are consistent with the rule that adjusted R² is always less than or equal to R². Neither statistic establishes that the relationship is causal, that the model generalises to unseen data, or that a linear shape was appropriate in the first place.`,
    `Choosing B on the strength of the higher R², or choosing A correctly but without stating why plain R² is unusable across models with different predictor counts.`,
    `+15–20 requires A chosen, the "R² can only go up" mechanism stated, the adjusted-R² reading of the 11 extra variables, and at least one thing neither figure establishes. +10–14 if the choice and mechanism are right but the reading of the extra variables is vague.`
  ),
  written(
    "U2-W04", 2, 10, "model-fitting.md",
    `Distinguish data modelling, data fitting, and model fitting. Give one example of each from the course, and identify which of the three is the odd one out with respect to numbers, saying why.`,
    `Data modelling is the most general of the three: creating a conceptual representation of data in order to understand it, communicate it, and build systems that use it — examples are an ERD (entities and relationships), a DFD, and UML. Data fitting is specifically finding mathematical functions that best describe existing data, used to interpolate or extrapolate — examples are least-squares regression, polynomial fitting, and spline interpolation. Model fitting puts the emphasis on the model itself: adjusting the parameters of a pre-selected model, one that represents a theoretical relationship or hypothesis, so that it best explains or predicts the observed data — examples are gradient descent and maximum likelihood estimation. Data modelling is the odd one out: it is the broadest of the three and is not about numbers at all. Model fitting is additionally distinguished by being iterative (several approaches usually apply, and each has parameters giving different configurations) and by having generalisation to new unseen data as its defining concern, which is where underfitting and overfitting live.`,
    `Treating data modelling as a numerical technique, or collapsing data fitting and model fitting together on the grounds that both end with a fitted curve.`,
    `+15–20 requires all three defined with an example each AND data modelling identified as the non-numerical one. +10–14 if data fitting and model fitting are defined correctly but the pre-selected-model distinction between them is left vague.`
  ),

  // ============= Unit 3 — Learning Paradigms & Classifiers =============
  mcq(
    "U3-M01", 3, 2, "supervised-and-unsupervised-learning.md",
    `An intern groups KNN with K-means in a report as "the two unsupervised K methods, since neither learns a discriminative function." Evaluate.`,
    [
      { letter: "A", text: `Right — neither one learns a discriminative function, so both sit on the unsupervised side.`, rationale: `uses "does no training" as the test, when the test is whether the training data carries labels.` },
      { letter: "B", text: `Wrong, but the other way round — K-means is the supervised one, because its k has to be supplied by a human.`, rationale: `confuses a hyperparameter supplied by a human with labelled training data.` },
      { letter: "C", text: `Wrong — KNN is supervised: it uses the labels of the K neighbours to vote, even though it does no training. The split is about labels in the training data, not about the algorithm's name or whether it trains.` },
      { letter: "D", text: `Right — both assign points to groups, so both are clustering methods.`, rationale: `both do assign points to groups, but classification is told the groups in advance while clustering has to find them.` },
    ],
    "C"
  ),
  mcq(
    "U3-M02", 3, 2, "supervised-and-unsupervised-learning.md",
    `Which mapping of methods onto the top-level ML map is correct?`,
    [
      { letter: "A", text: `Unsupervised (descriptive): K-means, DBSCAN, BIRCH, Apriori, anomaly detection. Supervised (predictive): Naive Bayes, KNN, SVM, Decision Trees, Random Forest, Logistic Regression for classification, Linear Regression for regression. Reinforcement learning is a third branch outside the split.` },
      { letter: "B", text: `As above, except that Apriori is supervised, since an association rule predicts the item on its right-hand side.`, rationale: `association mining is descriptive and unsupervised — "if bread then milk" describes co-occurrence in past transactions, it does not predict a target for a new record.` },
      { letter: "C", text: `As above, except that anomaly detection is supervised, since outliers have to be labelled before they can be found.`, rationale: `places anomaly/outlier detection under supervised learning; the course lists it under unsupervised alongside clustering and association rules.` },
      { letter: "D", text: `As above, except that reinforcement learning is the third kind of unsupervised learning.`, rationale: `reinforcement learning is a branch that exists outside the supervised/unsupervised split, not a sub-type of unsupervised.` },
    ],
    "A"
  ),
  mcq(
    "U3-M03", 3, 2, "predictive-and-descriptive-models.md",
    `An analyst calls a market-basket rule engine a predictive model, on the grounds that "if bread then milk" predicts what a customer will buy next. Evaluate.`,
    [
      { letter: "A", text: `Predictive — it produces a statement about a future purchase.`, rationale: `the exact intuition the note flags; a rule's forward-sounding grammar does not make it a prediction of a target variable.` },
      { letter: "B", text: `Descriptive — association rules describe co-occurrence in transactions already recorded; nothing is predicting the value of a target variable for a new record, which is what a predictive model does.` },
      { letter: "C", text: `Predictive, because milk is the dependent variable and bread is the independent variable.`, rationale: `borrows the predictive model's vocabulary when there is no target variable being estimated from the remainder of the variables.` },
      { letter: "D", text: `Neither — association rules fall outside the two-type split.`, rationale: `the models produced by a data mining step fall into exactly two types, and association rules are explicitly among the descriptive ones.` },
    ],
    "B"
  ),
  mcq(
    "U3-M04", 3, 2, "predictive-and-descriptive-models.md",
    `Which statement gets both the vocabulary and the evaluation consequence right?`,
    [
      { letter: "A", text: `Dependent = predictor and independent = target; both model types are judged by error on unseen data.`, rationale: `swaps the synonym pairs and applies the predictive criterion to descriptive models, which have no target to be wrong about.` },
      { letter: "B", text: `Dependent = target and independent = predictor; both types are judged by whether the structure they expose is interesting and usable.`, rationale: `gets the vocabulary right, then applies the descriptive criterion to predictive models and discards error on unseen data.` },
      { letter: "C", text: `Dependent = target is right, but the independent variables are called the response variables.`, rationale: `renames the predictor variables to a term the note does not use, and offers no evaluation criterion at all.` },
      { letter: "D", text: `Dependent = target = the variable being predicted; independent = predictor = the variables it is predicted from. A predictive model is judged by its error on unseen data; a descriptive model by whether the structure it exposes is interesting and usable.` },
    ],
    "D"
  ),
  mcq(
    "U3-M05", 3, 2.5, "classification-and-regression.md",
    `Classify each task and name the algorithm whose name misleads: (i) predict inches of rain for the day, (ii) filter spam from ham, (iii) predict a house price with a decision tree, (iv) biometric authentication.`,
    [
      { letter: "A", text: `(i) regression, (ii) classification, (iii) regression, (iv) classification — the line is drawn by the type of the target variable. The misleading name is "logistic regression": it is a classification method, and the word regression refers to the logistic function it fits, not to the task.` },
      { letter: "B", text: `Same, except (iii) is classification, because decision trees are classifiers.`, rationale: `classifies by the algorithm rather than by the target type; a decision tree predicting a house price is doing regression.` },
      { letter: "C", text: `(i) and (iii) are classification, because both outputs can be bucketed into ranges.`, rationale: `the target variable's own type decides, not whether the output could be bucketed after the fact.` },
      { letter: "D", text: `All four are classification, and the misleading name is "decision tree".`, rationale: `collapses the classification/regression split and picks a name the note does not flag.` },
    ],
    "A"
  ),
  mcq(
    "U3-M06", 3, 2.5, "classification-and-regression.md",
    `Which set of one-line descriptions of the course's five classifiers is correct?`,
    [
      { letter: "A", text: `KNN predicts from nearby training points; DT splits on a variable at each node; NB fits class probabilities with a sigmoid; LR assumes feature independence; SVM maximises the margin.`, rationale: `swaps the defining mechanisms of Naive Bayes and logistic regression.` },
      { letter: "B", text: `KNN predicts from nearby training points; DT splits on a variable at each node; NB assumes feature independence; LR fits a sigmoid; SVM learns the hyperplane that minimises the margin so the boundary sits between the closest points.`, rationale: `inverts the criterion that defines SVM — it maximises the margin.` },
      { letter: "C", text: `KNN predicts from the training data points in the neighbourhood of the test point; DT splits the dataset at every node on a variable's value and classifies from the aggregate labels in the leaf; NB classifies using data likelihood probabilities, assuming independence of features; LR fits class probabilities with a sigmoid, coefficients by gradient descent; SVM learns the hyperplane separating two classes with the maximum margin.` },
      { letter: "D", text: `KNN learns a discriminative function from the neighbourhood during training; the rest as in (C).`, rationale: `KNN does no training at all — it memorises the training dataset and delays generalisation until a query is made.` },
    ],
    "C"
  ),
  mcq(
    "U3-M07", 3, 2, "parametric-and-non-parametric-models.md",
    `Sort the course's methods into parametric and non-parametric, and name the criterion.`,
    [
      { letter: "A", text: `Parametric: Naive Bayes, Logistic Regression. Non-parametric: SVM, KNN, decision trees — SVM belongs here because the kernel trick assumes nothing about the boundary's shape.`, rationale: `the note lists SVM as parametric explicitly, and warns that the split does not follow intuition about which methods look flexible.` },
      { letter: "B", text: `Parametric: Naive Bayes, Logistic Regression, Support Vector Machine. Non-parametric: K-nearest neighbours and decision-tree-based models. The criterion is whether a functional relationship between predictor and target variables is assumed in advance.` },
      { letter: "C", text: `Same lists, except decision trees are parametric because they have parameters at every node.`, rationale: `takes "non-parametric" to mean "has no parameters"; it means no assumed distribution or functional form.` },
      { letter: "D", text: `The criterion is whether the algorithm trains at all: KNN is non-parametric because it does no training.`, rationale: `substitutes the lazy/eager distinction for the assumption criterion — two different splits that happen to agree on KNN.` },
    ],
    "B"
  ),
  mcq(
    "U3-M08", 3, 2, "parametric-and-non-parametric-models.md",
    `Why is a nearest-neighbour classifier sensitive to the local structure of the data, and where else does this course use the word "non-parametric" in the same sense?`,
    [
      { letter: "A", text: `Because it has no parameters at all, so nothing smooths over local irregularity; and the word is not used anywhere else in the course.`, rationale: `repeats the "no parameters" misreading and misses the parallel the note draws explicitly.` },
      { letter: "B", text: `Because k is a hyperparameter, and the same word describes any hyperparameter search.`, rationale: `attaches "non-parametric" to hyperparameters, an unrelated distinction.` },
      { letter: "C", text: `Because it assumes a Gaussian distribution locally, which is what makes it a local method.`, rationale: `gives the classifier a distributional assumption, which is the opposite of what non-parametric means.` },
      { letter: "D", text: `Because it relies entirely on the geometry of the training data without assuming any specific distribution — which is what non-parametric means. EDA is described the same way: a non-parametric approach that makes no assumption about the underlying distribution.` },
    ],
    "D"
  ),
  mcq(
    "U3-M09", 3, 2.5, "binary-multi-class-and-multi-label-classification.md",
    `Classify each: (i) spam vs ham, (ii) assigning one iris species out of three, (iii) one photo tagged dog, fowl, donkey and cat simultaneously, (iv) a photo that matches none of the available tags.`,
    [
      { letter: "A", text: `(i) binary — one and only one label from two mutually exclusive classes; (ii) multi-class — one and only one label from more than two classes; (iii) and (iv) multi-label — zero or more labels per sample, and multi-label is the only one of the three that permits zero.` },
      { letter: "B", text: `Same, except (ii) is multi-label, since three is more than two classes.`, rationale: `uses the class count to decide multi-label; the class count separates binary from multi-class, and it is the label count per sample that makes a problem multi-label.` },
      { letter: "C", text: `Same, except (iv) is not classification at all, since no label is produced.`, rationale: `multi-label explicitly permits zero labels, so a no-match sample is a valid multi-label output rather than a non-result.` },
      { letter: "D", text: `Same, except (iii) is multi-class, because four animals means four classes.`, rationale: `the presence of many classes alone does not make a problem multi-label; the sample carrying four labels at once does.` },
    ],
    "A"
  ),
  mcq(
    "U3-M10", 3, 1.5, "binary-multi-class-and-multi-label-classification.md",
    `Which single statement separates all three classification shapes?`,
    [
      { letter: "A", text: `Whether the classes are mutually exclusive.`, rationale: `distinguishes multi-label from the other two but says nothing about binary versus multi-class.` },
      { letter: "B", text: `The number of classes: two, more than two, and many.`, rationale: `uses one axis for a split that needs two — label count per sample is the second axis.` },
      { letter: "C", text: `How many classes there are separates binary from multi-class; how many labels each sample gets separates those two from multi-label, which assigns zero or more.` },
      { letter: "D", text: `Whether the method is supervised.`, rationale: `all three are supervised — multi-label is explicitly named a supervised algorithm.` },
    ],
    "C"
  ),
  mcq(
    "U3-M11", 3, 1.5, "one-vs-rest-and-one-vs-one.md",
    `A dataset has 6 classes. How many binary problems does One-vs-Rest produce, and how many does One-vs-One produce?`,
    [
      { letter: "A", text: `OvR 15, OvO 6.`, rationale: `swaps the two formulas.` },
      { letter: "B", text: `OvR 6 — N models, one class against the rest each time; OvO 15 — N(N−1)/2 models, one per pair.` },
      { letter: "C", text: `Both give 6, since both split the problem by class.`, rationale: `OvO splits by pair, not by class, which is why its count grows quadratically.` },
      { letter: "D", text: `OvR 6, OvO 30 — that is N(N−1).`, rationale: `counts each pair twice; {red, blue} and {blue, red} are the same binary problem.` },
    ],
    "B"
  ),
  mcq(
    "U3-M12", 3, 2, "one-vs-rest-and-one-vs-one.md",
    `How does each wrapper strategy reach a final prediction, and which base algorithm does the course pair with each?`,
    [
      { letter: "A", text: `OvR decides by votes and pairs with SVM; OvO decides by confidence and pairs with logistic regression.`, rationale: `swaps both the decision rules and the algorithm pairings.` },
      { letter: "B", text: `Both decide by votes; the only difference is how many models get built.`, rationale: `erases the confidence-versus-votes distinction the note draws.` },
      { letter: "C", text: `OvR decides by confidence but pairs with SVM, since an SVM margin acts as a confidence score.`, rationale: `keeps the decision rule but breaks the pairing the course teaches: OvR goes with logistic regression.` },
      { letter: "D", text: `OvR uses the model that is most confident (e.g. by probability) and is the approach paired with logistic regression; OvO decides by votes — the class with the most predictions wins — and is the approach paired with SVM.` },
    ],
    "D"
  ),
  mcq(
    "U3-M13", 3, 2, "one-vs-rest-and-one-vs-one.md",
    `A student writes: "One-vs-One is a multi-class classifier we can use instead of logistic regression." Evaluate.`,
    [
      { letter: "A", text: `Confused — OvO is not a classifier at all. It is a wrapper strategy that lets a binary algorithm handle a multi-class problem by splitting the dataset into several binary datasets, and it leaves the underlying algorithm unchanged.` },
      { letter: "B", text: `Correct — OvO is a distinct multi-class algorithm with a decision boundary of its own.`, rationale: `promotes a wrapper strategy into a standalone classifier.` },
      { letter: "C", text: `Confused only about the pairing — OvO should be used with logistic regression, not instead of it.`, rationale: `fixes the pairing but keeps treating OvO as an algorithm chosen in place of another (and picks the wrong pairing anyway).` },
      { letter: "D", text: `Correct, because splitting the dataset changes the model's structure and therefore produces a new classifier.`, rationale: `dataset splitting is exactly the mechanism that leaves the underlying algorithm untouched.` },
    ],
    "A"
  ),
  mcq(
    "U3-M14", 3, 2, "distance-metrics.md",
    `Dataset (a) holds three columns all measured in centimetres — width, height, depth. Dataset (b) holds age in years, height in centimetres, and income in baht. Which numeric distance metric does the course prescribe for each?`,
    [
      { letter: "A", text: `(a) Manhattan, (b) Euclidean.`, rationale: `reverses the rule the note gives for choosing between the two.` },
      { letter: "B", text: `Euclidean for both, since it is the most popular metric.`, rationale: `takes popularity as the selection rule and discards the type/unit-similarity criterion entirely.` },
      { letter: "C", text: `(a) Euclidean (L2) — used when the input variables are similar in type and unit; (b) Manhattan (L1, city block) — used when the input variables are not similar in type or unit.` },
      { letter: "D", text: `(a) Euclidean, (b) Hamming, because (b) mixes attribute types.`, rationale: `Hamming is the metric for categorical attributes — counting mismatches — not for numeric columns in mismatched units.` },
    ],
    "C"
  ),
  mcq(
    "U3-M15", 3, 2, "distance-metrics.md",
    `State the relationship between Minkowski, Euclidean and Manhattan distance, and say what Hamming distance actually counts.`,
    [
      { letter: "A", text: `Minkowski generalises both: p = 1 gives Manhattan, p = 2 gives Euclidean. Hamming takes all the categorical attributes and counts one for each whose value is not the same between two points — which is what makes K-modes work, since "dissimilarity by number of mismatches" is Hamming distance by another name.` },
      { letter: "B", text: `p = 1 gives Euclidean and p = 2 gives Manhattan; Hamming counts the attributes whose values match.`, rationale: `inverts the p values and counts matches instead of mismatches.` },
      { letter: "C", text: `Minkowski is a third, unrelated metric; Hamming applies to numeric attributes.`, rationale: `denies the generalisation relationship and moves Hamming onto numeric data, where it is not defined.` },
      { letter: "D", text: `p = 2 gives Euclidean, and Hamming is the squared count of mismatching attributes.`, rationale: `gets p right but squares a plain count — the note defines Hamming as the number of attributes whose values differed.` },
    ],
    "A"
  ),
  mcq(
    "U3-M16", 3, 2, "feature-scaling.md",
    `Customers are clustered on two raw columns: annual income (tens of thousands) and number of store visits (0–40). No scaling is applied. What happens, and why?`,
    [
      { letter: "A", text: `Nothing — K-means recalculates centroids as averages, and averaging removes the scale difference.`, rationale: `averaging preserves the scale difference; the centroid simply inherits it.` },
      { letter: "B", text: `Visits will dominate, because that column has more distinct values packed into a narrow range.`, rationale: `makes distinct-value count the source of dominance rather than magnitude.` },
      { letter: "C", text: `A problem for KNN but not for K-means, since only KNN computes distances between individual points.`, rationale: `the note names both — K-means because its cost function is squared distance to a centroid, KNN because unequal scales require normalisation.` },
      { letter: "D", text: `Income decides every cluster — distance calculations use raw feature values, so the feature with much larger values dominates the distance and therefore the outcome, regardless of whether it is actually the more important variable.` },
    ],
    "D"
  ),
  mcq(
    "U3-M17", 3, 2, "feature-scaling.md",
    `A KNN pipeline one-hot encodes its categorical columns and runs without error, but accuracy is poor. What is the most likely omission?`,
    [
      { letter: "A", text: `Encoding the categorical columns was itself the mistake — KNN handles categorical attributes natively and should be given them raw.`, rationale: `KNN's stated preprocessing requires categorical variables transformed into dummy variables (factors/levels).` },
      { letter: "B", text: `The second mandatory preprocessing step was skipped: numeric variables must be standardised or normalised as well. It is the more commonly missed of the two precisely because the code still runs without it, and normalising is what gives every attribute the same influence under Euclidean distance.` },
      { letter: "C", text: `Nothing was omitted — poor KNN accuracy is expected on any dataset with more than a handful of dimensions.`, rationale: `folds a specific, fixable omission into the separate high-dimensionality weakness.` },
      { letter: "D", text: `Normalisation was probably applied when it should not have been — you normalise only when the scales have inherent meaning.`, rationale: `inverts the note's condition: you normalise when the scales have no inherent meaning, and when they are inconsistent.` },
    ],
    "B"
  ),
  mcq(
    "U3-M18", 3, 2.5, "k-nearest-neighbors.md",
    `A recommender is being built over a catalogue that gains new entries continuously. A reviewer objects that "KNN never trains, so it can't have learned anything." Evaluate.`,
    [
      { letter: "A", text: `A real defect — without a learned discriminative function the model cannot generalise at all.`, rationale: `generalisation is delayed until query time, not absent.` },
      { letter: "B", text: `The point of the method, and it also makes KNN fast at query time since there is no model left to evaluate.`, rationale: `gets the lazy label right and then inverts the cost profile — every query compares against every stored point, so consultation time is high.` },
      { letter: "C", text: `That is the point — KNN is a lazy learner: it does no training, memorises the training dataset, and delays generalisation until a query is made. Training time is low or non-existent and consultation time is high; an eager learner is the reverse. That profile is exactly what suits a dataset continuously updated with new entries.` },
      { letter: "D", text: `A defect, and the fix is to increase k until the model stabilises.`, rationale: `k controls the neighbourhood vote, not whether any training happens.` },
    ],
    "C"
  ),
  mcq(
    "U3-M19", 3, 2, "k-nearest-neighbors.md",
    `In the lecture's figure the same green dot is assigned to a red triangle when k = 3 and to a blue square when k = 5. A student says one of the two runs must be a bug. Evaluate.`,
    [
      { letter: "A", text: `Neither is a bug — k is a hyperparameter you set, and the prediction is the simple majority of the categories of the k nearest neighbours, so changing k changes which neighbours are gathered. Both answers are correct for their own k, which is why the choice of k cannot be made by the algorithm itself.` },
      { letter: "B", text: `The k = 5 result is authoritative, since more neighbours always means a more reliable vote.`, rationale: `treats larger k as monotonically better; k is a choice with a trade-off, not a reliability dial.` },
      { letter: "C", text: `A bug — a correct KNN gives the same class whatever k is, because the single nearest neighbour dominates the result.`, rationale: `a plurality vote over k neighbours is not decided by the nearest one alone.` },
      { letter: "D", text: `Neither, because KNN outputs the average of the neighbours' values and averages naturally differ.`, rationale: `describes k-NN regression; for a class membership output the rule is a plurality vote, not an average.` },
    ],
    "A"
  ),
  mcq(
    "U3-M20", 3, 2, "k-nearest-neighbors.md",
    `Which statement of KNN's weaknesses and conventions is correct?`,
    [
      { letter: "A", text: `Its weakness is a high training cost, since it must store and index the whole dataset before it can answer anything.`, rationale: `assigns KNN a training cost it does not have — training time is low or non-existent because it only stores the data.` },
      { letter: "B", text: `It cannot handle missing data or categorical attributes at all.`, rationale: `it works for continuous, discrete, ordinal and categorical data, which is what makes it particularly useful for handling missing data.` },
      { letter: "C", text: `It is not suitable for high-dimensional data, because computing distance for each dimension becomes difficult as dimensions increase; and it slows down significantly as the dataset grows, because every query compares against every stored point. A common weighting scheme gives each neighbour weight 1/d.` },
      { letter: "D", text: `It degrades on high-dimensional data, and the standard fix is to weight each neighbour by d.`, rationale: `inverts the weighting — closer neighbours should count for more, so the weight is 1/d.` },
    ],
    "C"
  ),
  mcq(
    "U3-M21", 3, 2, "naive-bayes.md",
    `What does the word "naive" mark in Naive Bayes, and what is the workflow the lecture demonstrates?`,
    [
      { letter: "A", text: `It flags the method as a weak baseline to be replaced by a real classifier once one is available.`, rationale: `reads a technical label as a quality judgement, which the note explicitly warns against.` },
      { letter: "B", text: `It is a technical label for the assumption that features are independent, made to simplify the model — not a judgement on quality. The workflow is: frequency table → likelihood table → compute the probability of each class given the conditions → normalise → pick the larger. The assumption is almost always false in real data, yet the classifier often performs well anyway.` },
      { letter: "C", text: `It refers to the method assuming a Gaussian distribution over every feature.`, rationale: `substitutes a distributional assumption for the independence assumption that actually gives the method its name.` },
      { letter: "D", text: `It marks the independence assumption, and the workflow runs likelihood table → frequency table → normalise → pick the smaller probability.`, rationale: `reverses the first two steps and selects the wrong class at the end.` },
    ],
    "B"
  ),
  mcq(
    "U3-M22", 3, 2.5, "logistic-regression.md",
    `A team reports: "the model classifies at 0.5, which is fixed by the sigmoid, so we can't trade recall for precision without retraining." Evaluate.`,
    [
      { letter: "A", text: `Correct — 0.5 is where the sigmoid is centred, so it is structurally fixed.`, rationale: `promotes the curve's midpoint into a mandatory decision threshold.` },
      { letter: "B", text: `Wrong on the first half — the sigmoid outputs values between −1 and 1, not 0 and 1.`, rationale: `misstates the sigmoid's range; it converts any real value to a value between 0 and 1.` },
      { letter: "C", text: `Wrong, because trading recall for precision requires switching to SVM.`, rationale: `invents an algorithm change for something a threshold move achieves.` },
      { letter: "D", text: `Wrong on the second half — the sigmoid does map any real value to between 0 and 1, with output above 0.5 classified as 1 and below as 0, but the 0.5 cut-off is a threshold you choose, not a property of the model. Moving it is precisely what the ROC curve exists to visualise, and no retraining is needed.` },
    ],
    "D"
  ),
  mcq(
    "U3-M23", 3, 2, "logistic-regression.md",
    `Which combination of facts about logistic regression is correct?`,
    [
      { letter: "A", text: `Categorical inputs must first be transformed into a numerical representation by one-hot encoding; for a multi-class target it is the method the course pairs with One-vs-Rest; and despite its name it solves a classification problem, "regression" referring to the logistic function it fits.` },
      { letter: "B", text: `Categorical inputs can be fed in directly, and for multi-class targets it pairs with One-vs-One.`, rationale: `skips the one-hot encoding requirement and takes the pairing the course gives to SVM.` },
      { letter: "C", text: `It is a regression method, so it is the target that must be one-hot encoded rather than the inputs.`, rationale: `keeps the naming trap and moves the encoding requirement to the wrong side of the model.` },
      { letter: "D", text: `Its coefficients are obtained by least squares, exactly as in linear regression.`, rationale: `logistic regression's coefficients are obtained by gradient descent.` },
    ],
    "A"
  ),
  mcq(
    "U3-M24", 3, 2, "support-vector-machine.md",
    `Two-class data turns out not to be linearly separable. A colleague concludes SVM will fail, since there is no separating hyperplane. Evaluate.`,
    [
      { letter: "A", text: `Correct — SVM is defined only for linearly separable data, so another classifier is needed.`, rationale: `ignores the kernel trick, which exists precisely for the non-linearly-separable case.` },
      { letter: "B", text: `Wrong — SVM applies a kernel that projects the data points into a higher-dimensional space in which they become relatively easier to separate (the lecture illustrates this with a Gaussian kernel), and among the separating hyperplanes it then chooses the one with the maximum margin, the closest distance between the points of the two classes.` },
      { letter: "C", text: `Wrong, because SVM chooses the hyperplane with the minimum margin, which always exists.`, rationale: `inverts the maximum-margin criterion that defines the method.` },
      { letter: "D", text: `Wrong, because the kernel literally computes the coordinates of every point in the higher-dimensional space.`, rationale: `it does not compute those coordinates — that is exactly why it is called a trick.` },
    ],
    "B"
  ),

  written(
    "U3-W01", 3, 14, "k-nearest-neighbors.md",
    `A streaming service adds new titles hourly and wants recommendations that reflect the catalogue immediately. An engineer proposes KNN over a 300-dimension embedding of each title, feeding the raw feature table straight in. Explain why the lazy-learning property makes KNN a good structural fit for the hourly-update requirement, name the two mandatory preprocessing steps this pipeline skipped and say which of them fails silently and why, and give the one property of the proposed feature space that undermines the plan anyway.`,
    `KNN is a lazy learner: it does no training when supplied with training data, it simply stores — memorises — the dataset and delays generalisation until a query is made. So a new title becomes usable the moment it is stored, with no retraining step at all; training time is low or non-existent. This is exactly the profile the lecture names for datasets that are continuously updated with new entries, citing online recommendation engines such as Netflix. The two mandatory preprocessing steps are (1) categorical variables transformed into dummy variables (factors/levels) and (2) numeric variables standardised or normalised. The second is the one that fails silently, because the code still runs without it — and if one feature's values are large it dominates the distance and therefore the outcome; normalising gives every attribute the same influence in identifying neighbours. The property that undermines the plan is the dimensionality: KNN is not suitable for high-dimensional data, because as dimensions increase it becomes difficult to compute distance for each dimension, and 300 dimensions is squarely in that regime. The lazy profile also means high consultation (testing) time, and KNN slows down significantly as the data grows, since every query compares against every stored point.`,
    `Praising the lazy-learning fit and stopping there, without naming the high consultation cost and the high-dimensionality weakness that make this particular design unworkable.`,
    `+15–20 requires the lazy-learning mechanism stated (stores rather than trains, generalisation delayed to query time), both preprocessing steps with the silent one identified and the reason it is silent, AND the high-dimensionality objection. +10–14 if the dimensionality objection is missing.`
  ),
  written(
    "U3-W02", 3, 12, "one-vs-rest-and-one-vs-one.md",
    `A classifier must distinguish 5 product categories. Give the number of binary problems each wrapper strategy produces, with the formula; state the decision rule each uses to reach a final prediction; name the base algorithm the course pairs with each; and state what a wrapper strategy does not change.`,
    `One-vs-Rest produces N models = 5, each pitting one class against all the rest (cat1 vs [the other four], and so on). One-vs-One produces N(N−1)/2 = 5 × 4 / 2 = 10 models, one per pair of classes. The decision rules differ: OvR predicts using the model that is the most confident, for example by probability; OvO decides by votes — each binary model predicts one class label, and the class with the most predictions or votes wins. The course's pairings are OvR ↔ logistic regression and OvO ↔ SVM. What neither strategy changes is the underlying algorithm: both are wrapper strategies around a binary classifier, splitting a multi-class dataset into several binary datasets and fitting a binary model on each. No new classifier is created.`,
    `Getting the counts right but attaching the decision rules or the algorithm pairings the wrong way round — OvR by votes, OvO by confidence, or OvR with SVM and OvO with logistic regression.`,
    `+15–20 requires both counts with the formula, both decision rules correctly attached, both algorithm pairings, AND the wrapper point. +10–14 if the wrapper point is missing or one pairing is inverted.`
  ),
  written(
    "U3-W03", 3, 12, "feature-scaling.md",
    `A K-means run over three columns — annual income in baht (hundreds of thousands), age in years, and number of support tickets (0–12) — produces clusters that turn out to be income bands and nothing else. Explain the mechanism precisely, say which condition for normalising applies here, and name the numeric distance metric the course would recommend for a feature table of this shape, with the reason.`,
    `Distance calculations use raw feature values, so when one feature's values are much larger than another's, that feature dominates the distance and therefore dominates the outcome — regardless of whether it is actually the more important variable. K-means is specifically named as requiring scaling because its cost function is squared distance to a centroid, and squaring amplifies the income term further; age and ticket count contribute essentially nothing. The operative condition for normalising is that the scales are inconsistent and have no inherent common meaning: baht, years and a raw count are not comparable units. Normalising or Z-score standardising gives every attribute the same influence. On the metric: because the input variables are not similar in type or unit, the course prescribes Manhattan (L1, city block) distance rather than Euclidean (L2), which is the choice for variables similar in type/unit. Minkowski generalises both — p = 1 gives Manhattan, p = 2 gives Euclidean.`,
    `Explaining the domination correctly but still recommending Euclidean because it is "the most popular metric" — popularity is not the selection rule; similarity of type and unit is.`,
    `+15–20 requires the raw-values domination mechanism, the K-means squared-distance point, the inconsistent-scales condition, AND Manhattan chosen with the type/unit reason. +10–14 if the metric choice is right but unjustified, or the squared-distance point is missing.`
  ),
  written(
    "U3-W04", 3, 10, "parametric-and-non-parametric-models.md",
    `Sort Naive Bayes, Logistic Regression, SVM, KNN and decision trees into parametric and non-parametric. State the criterion that does the sorting, then explain what "non-parametric" does not mean, using the way this course applies the same word to EDA.`,
    `Parametric: Naive Bayes, Logistic Regression, Support Vector Machine — for these you assume a functional relationship between the predictor and target variables in advance. Non-parametric: K-nearest neighbours and decision-tree-based models — no such relationship is assumed, and the model structure is determined from the dataset itself. Non-parametric does NOT mean "has no parameters"; it means no assumed distribution or functional form. The course uses the word in exactly the same sense of EDA, which it calls a non-parametric approach: it makes no assumption about the underlying distribution, so you are looking at what the data actually is rather than fitting it to a shape assumed in advance. The nearest-neighbour case makes the meaning concrete — its power comes from relying entirely on the geometry of the training data without assuming any specific distribution, which is what makes it sensitive to the local structure of the data. The lists have to be memorised as lists, because the split does not follow any intuition about which methods are "simple": SVM is parametric and a decision tree is not.`,
    `Justifying the sort by whether the algorithm trains (lazy versus eager). That is a different distinction which only coincidentally agrees on KNN.`,
    `+15–20 requires both lists correct, the assumed-functional-relationship criterion, the "not no parameters" correction, AND the EDA parallel. +10–14 if the EDA parallel is missing.`
  ),
  written(
    "U3-W05", 3, 12, "logistic-regression.md",
    `A team must predict whether a website visitor will click "Buy". One member proposes a linear regression with a threshold on its output; another proposes logistic regression. Say what each would actually do, state which the course prefers and on what grounds, and identify the one thing about the 0.5 cut-off that both members are likely to get wrong.`,
    `Linear regression fits y = f(x, w) + ε for a numerical target; forcing a categorical target means quantising the fitted value with threshold values. The course says this can be done, but that logistic regression is generally more suitable for categorical classification because it is probability-based — that is the grounds for the preference, not an impossibility. Logistic regression fits class probabilities using a sigmoid function, an S-shaped curve that takes any real value and converts it to a value between 0 and 1, with the coefficients obtained by gradient descent; the lecture's worked case is Probability of Click = f(Time on Site). Output above 0.5 is classified as 1 and below 0.5 as 0. The thing both members are likely to get wrong: the 0.5 cut-off is a threshold you choose, not a property of the model. The ROC curve exists precisely because that threshold can be moved, letting you trade false positives against false negatives without retraining anything. Two further points: despite its name logistic regression solves a classification problem, and any categorical inputs must be one-hot encoded first.`,
    `Arguing for logistic regression on the grounds that linear regression "cannot handle a categorical target" — it can be forced with thresholds, and the real reason is that logistic regression is probability-based.`,
    `+15–20 requires both mechanisms described, the probability-based preference given as the reason, AND the 0.5-is-a-choice point with its ROC connection. +10–14 if the threshold point is present but the ROC connection is missing.`
  ),

  // ================== Unit 4 — Classifier Evaluation ==================
  mcq(
    "U4-M01", 4, 2, "confusion-matrix.md",
    `Which set of aliases read off a confusion matrix is correct?`,
    [
      { letter: "A", text: `Recall = specificity = true negative rate; precision = sensitivity.`, rationale: `crosses recall with specificity — they are the two opposite rates, one over the positives and one over the negatives.` },
      { letter: "B", text: `Recall = sensitivity = true positive rate = hit rate; specificity = selectivity = true negative rate; false negative rate = 1 − TPR = miss rate; false positive rate = 1 − TNR = fall out.` },
      { letter: "C", text: `Sensitivity = 1 − specificity, so the two terms are interchangeable in any formula.`, rationale: `turns a complement relationship into an identity; they are opposites, not synonyms.` },
      { letter: "D", text: `Hit rate is another name for accuracy, since both count the predictions that came out right.`, rationale: `accuracy is (TP + TN) / (TP + TN + FP + FN), a different quantity from the true positive rate.` },
    ],
    "B"
  ),
  mcq(
    "U4-M02", 4, 2.5, "confusion-matrix.md",
    `A three-class result: class A 16 correct out of 16, class B 17 correct out of 18, class C 11 correct out of 11. What are the micro and macro accuracies, and when do the two agree?`,
    [
      { letter: "A", text: `They are two names for the same number, computed differently but always equal.`, rationale: `denies a difference the arithmetic on this very example shows.` },
      { letter: "B", text: `Micro averages the per-class rates and gives 0.9815; macro pools the raw counts and gives 0.9778.`, rationale: `swaps the two definitions — micro pools, macro averages.` },
      { letter: "C", text: `Micro 0.9778 and macro 0.9815; they differ whenever accuracy is below 1.0, whatever the class sizes.`, rationale: `gets the numbers right and the condition wrong: with equal class sizes the two coincide even when accuracy is imperfect.` },
      { letter: "D", text: `Micro pools the raw counts: (16 + 17 + 11) / 45 = 44/45 = 0.9778. Macro averages each class's rate equally: (16/16 + 17/18 + 11/11) / 3 = 2.94 / 3 = 0.9815. They differ whenever the classes have different sizes.` },
    ],
    "D"
  ),
  mcq(
    "U4-M03", 4, 2, "precision-recall-and-f-measure.md",
    `A screening test for a serious disease is being tuned. Missing a genuine case is far worse than a false alarm. Which metric should be optimised, and which F-measure reported?`,
    [
      { letter: "A", text: `Recall, and report F2 — recall is the metric about false negatives, and a missed case is exactly an FN; the F subscript is the weight on recall, so F2 favours recall.` },
      { letter: "B", text: `Precision, and report F0.5 — a screening test must avoid alarming healthy patients.`, rationale: `pairs the right F-measure with precision but optimises the wrong error for the cost asymmetry stated.` },
      { letter: "C", text: `Recall, and report F0.5, since the lower subscript marks the more important metric.`, rationale: `gets the metric right and then inverts the subscript convention — F0.5 weights precision.` },
      { letter: "D", text: `Accuracy, since it accounts for both kinds of error at once.`, rationale: `accuracy assumes equal costs for both kinds of error, which is precisely the assumption this scenario violates.` },
    ],
    "A"
  ),
  mcq(
    "U4-M04", 4, 2, "precision-recall-and-f-measure.md",
    `A model achieves precision 1.0 and recall 0.0. A colleague says: "the average is 0.5, so it is a middling model." Evaluate.`,
    [
      { letter: "A", text: `Right — 0.5 is a fair summary of a model perfect on one metric and useless on the other.`, rationale: `computes the arithmetic mean, which is exactly what the F-measure is defined to avoid.` },
      { letter: "B", text: `F1 is undefined when recall is 0, so no single summary can be given.`, rationale: `F1 is 0 here, not undefined; the measure's range runs up to a highest possible value of 1.` },
      { letter: "C", text: `Wrong — F1 is 0, not 0.5. The F-measure is a weighted average using the harmonic mean rather than the arithmetic mean, because the harmonic mean punishes extreme values, and F is always nearer the smaller of precision and recall.` },
      { letter: "D", text: `F1 is 1.0, since the higher of the two components sets the ceiling.`, rationale: `takes the maximum rather than any kind of mean; F sits nearer the smaller value.` },
    ],
    "C"
  ),
  mcq(
    "U4-M05", 4, 2, "roc-curve-and-auc.md",
    `Which reading of the ROC space is correct?`,
    [
      { letter: "A", text: `The best point is the top-right corner (1,1), where both rates are maximised.`, rationale: `maximises the false positive rate alongside the true positive rate; the ideal is the upper-left corner (0,1).` },
      { letter: "B", text: `The best possible prediction method lands in the upper-left corner at (0,1) — 100% sensitivity and 100% specificity. Random guessing falls along the diagonal, the line of no-discrimination, regardless of the base rates. The curve is generated by scanning a threshold, and covering a range of thresholds is its benefit over a single metric like accuracy.` },
      { letter: "C", text: `The diagonal marks perfect calibration, so a well-tuned classifier should sit on it.`, rationale: `the diagonal is the line of no-discrimination — where flipping coins lands.` },
      { letter: "D", text: `The curve is generated by retraining the model on progressively larger samples.`, rationale: `the curve comes from scanning a threshold or sensitivity parameter on one trained model, not from resampling.` },
    ],
    "B"
  ),
  mcq(
    "U4-M06", 4, 2.5, "roc-curve-and-auc.md",
    `Two classifiers' ROC curves cross each other. A manager asks which classifier is better. What is the right answer, and on what scale?`,
    [
      { letter: "A", text: `This is precisely why AUC exists — an ROC curve is good for looking at a single classifier but less suited to comparing two, and crossing curves are the case that shows it. AUC collapses the curve to one number: 0.5 is random guessing, 1.0 is perfect, and the bands run 0.9–1.0 excellent, 0.8–0.9 good, 0.7–0.8 fair, 0.6–0.7 poor, 0.5–0.6 failed.` },
      { letter: "B", text: `Pick whichever curve is higher at the 0.5 threshold, since that is the default operating point.`, rationale: `compares at a single arbitrary point, which is the single-metric problem ROC was introduced to escape.` },
      { letter: "C", text: `They cannot be compared — AUC measures calibration rather than discrimination.`, rationale: `AUC measures a classifier's ability to distinguish between classes, which is discrimination.` },
      { letter: "D", text: `Use AUC, on which 0.5 is a perfect classifier and 1.0 is random guessing.`, rationale: `inverts the two anchor values of the AUC scale.` },
    ],
    "A"
  ),
  mcq(
    "U4-M07", 4, 1.5, "k-fold-cross-validation.md",
    `How should K be chosen for K-fold cross-validation, and what is the trade-off?`,
    [
      { letter: "A", text: `Always the largest K the data allows — more folds is strictly less biased.`, rationale: `ignores the cost the note attaches to higher K: large variance might lead to overfitting.` },
      { letter: "B", text: `K = 2, since that guarantees every point serves as validation data exactly once.`, rationale: `a low K behaves like a plain train-test split, which discards the reason for cross-validating at all.` },
      { letter: "C", text: `K should equal the number of hyperparameter sets being compared.`, rationale: `invents a coupling between fold count and search size; the two are unrelated.` },
      { letter: "D", text: `Preferably 5–10, depending on data size. A higher K gives a less biased model, but the large variance might lead to overfitting; a lower K behaves like a plain train-test split.` },
    ],
    "D"
  ),
  mcq(
    "U4-M08", 4, 2, "k-fold-cross-validation.md",
    `A team writes: "we cross-validated, so we don't need a separate test set." Evaluate.`,
    [
      { letter: "A", text: `Right — every observation has already served as validation data at some point in the procedure.`, rationale: `the exact substitution the note rules out; having served as validation data is not the same as never having influenced the model that was selected.` },
      { letter: "B", text: `Wrong, because cross-validation increases bias rather than reducing it.`, rationale: `inverts the property — cross-validation generally results in a less biased model.` },
      { letter: "C", text: `Wrong — cross-validation is a way of choosing hyperparameters and reducing overfitting, not a substitute for the final held-out test set. Its own advantage is a generally less biased model, because every observation gets a chance of appearing in both the training and the validation set.` },
      { letter: "D", text: `Right, provided K was at least 10.`, rationale: `makes the substitution conditional on fold count; no value of K removes the need for the holdout.` },
    ],
    "C"
  ),

  written(
    "U4-W01", 4, 15, "precision-recall-and-f-measure.md",
    `A fraud-detection classifier is run over 10,000 transactions and produces TP = 40, FN = 60, FP = 20, TN = 9,880. Compute accuracy, precision and recall. Explain, by naming the assumption it makes, why accuracy is the wrong headline figure here. Then say which of precision and recall the business should optimise if a missed fraud costs 200 times a false alarm, and which F-measure to report.`,
    `Accuracy = (TP + TN) / (TP + TN + FP + FN) = (40 + 9,880) / 10,000 = 0.992. Precision — of the examples labelled positive, how many really are positive — = 40 / (40 + 20) = 0.667. Recall — correctly classified positives over all actual positives — = 40 / (40 + 60) = 0.40. Accuracy is the wrong headline because it assumes equal costs for both kinds of error, and that assumption is usually false; here it is spectacularly false, since 99.2% accuracy coexists with 60 of 100 frauds missed. Precision is the metric about false positives and recall the metric about false negatives. A missed fraud is a false negative, so at a 200:1 cost ratio recall is what to optimise — high recall indicates the class is being correctly recognised. Report F2, which places higher weight on recall: the subscript is the weight on recall, so F2 favours recall and F0.5 favours precision. The F-measure uses the harmonic mean rather than the arithmetic mean because the harmonic mean punishes extreme values, and it will always sit nearer the smaller of precision and recall.`,
    `Presenting the 0.992 accuracy as evidence the model works, or optimising precision because "fewer false alarms" sounds like the customer-facing concern.`,
    `+15–20 requires all three figures computed correctly, the equal-costs assumption named as why accuracy misleads, recall chosen with the false-negative link, and F2 named with the subscript convention stated. +10–14 if the arithmetic is right but the F-subscript direction is missing or inverted.`
  ),
  written(
    "U4-W02", 4, 14, "roc-curve-and-auc.md",
    `A stakeholder asks why the team reports an ROC curve and an AUC instead of a single accuracy figure. Shown two ROC curves that cross, they then ask which classifier is better. Answer both questions, and place an AUC of 0.72 on the course's rating bands.`,
    `ROC depicts the relative trade-off between true positives (benefits) and false positives (costs) at various threshold settings. Its benefit over a single metric such as accuracy is that it covers a range of classification thresholds instead of silently fixing one: an accuracy figure picks a single operating point and hides the trade-off, and the point of ROC is that the classification threshold is a choice. Reading the space: the best possible prediction method lands in the upper-left corner at (0,1) — 100% sensitivity, no false negatives, and 100% specificity, no false positives — while random guessing (flipping coins) lands along the diagonal, the line of no-discrimination, regardless of the positive and negative base rates. For two crossing curves, the ROC curve itself cannot answer the question: it is good for looking at a single classifier but less suited to comparing classifiers, and that is exactly why AUC exists — it collapses the curve to a single number so classifiers can be compared. AUC = 0.5 is random guessing and 1.0 is a perfect classifier; it measures the classifier's ability to distinguish between classes. AUC = 0.72 falls in the 0.7–0.8 band: Fair.`,
    `Answering the crossing-curves question by comparing the two curves at one chosen threshold — which reintroduces exactly the single-operating-point problem ROC was brought in to escape.`,
    `+15–20 requires the threshold-scanning benefit, both reference points in ROC space ((0,1) and the diagonal), AUC named as the answer to comparison with its 0.5 and 1.0 anchors, and 0.72 correctly banded as Fair. +10–14 if the band is wrong but everything else holds.`
  ),
  written(
    "U4-W03", 4, 12, "confusion-matrix.md",
    `A three-class classifier scores 16 of 16 on class A, 17 of 18 on class B, and 11 of 11 on class C. Compute micro and macro accuracy showing the arithmetic, explain what each one is doing differently, and state the condition under which the two figures agree.`,
    `A multi-class confusion matrix is built class by class. Micro accuracy pools all the raw counts: (16 + 17 + 11) / (16 + 18 + 11) = 44 / 45 = 0.9778. Macro accuracy averages each class's own rate with equal weight: 16/16 = 1, 17/18 = 0.94, 11/11 = 1, summing to 2.94, then 2.94 / 3 = 0.9815. The difference is what each treats as the unit: micro pools the raw counts so every sample counts once, while macro averages the per-class rates so every class counts once. They differ whenever the classes have different sizes — as here, 16, 18 and 11 — and agree exactly when every class is the same size, because pooling and equal-weight averaging then coincide. Macro is the higher figure here because class B, the only imperfect class, is also the largest, so pooling gives its single error more weight than equal-weight averaging does.`,
    `Reporting one of the two numbers as "the accuracy", or computing micro by averaging the per-class denominators instead of pooling the counts.`,
    `+15–20 requires both figures with the arithmetic shown, the pool-versus-average distinction stated, AND the equal-class-size condition for agreement. +10–14 if both numbers are right but the condition is missing.`
  ),

  // ===================== Unit 5 — Decision Trees =====================
  mcq(
    "U5-M01", 5, 2, "decision-tree.md",
    `Which description of how a decision tree is built is correct?`,
    [
      { letter: "A", text: `Measure impurity, try each feature, choose the best split, and backtrack when a branch later turns out badly — the backtracking is what guarantees the optimal tree.`, rationale: `the algorithm is greedy and never revisits a split; no global optimum is guaranteed.` },
      { letter: "B", text: `As in (C), except that every feature stays available on every branch, including those already used further up.`, rationale: `the tree only considers the remaining features on a branch — a feature used above it is spent.` },
      { letter: "C", text: `Measure the impurity of the whole dataset at the root; try each feature as the split and measure the resulting impurity; choose the feature that improves impurity most — highest Information Gain, or lowest weighted Gini; recurse on each branch with the remaining features; stop on a pure node, max depth, or minimum samples. The algorithm is greedy: it takes the locally best split and never revisits it, so the tree is not guaranteed to be globally optimal.` },
      { letter: "D", text: `As in (C), except that recursion stops only when every leaf is pure.`, rationale: `names one stopping condition and drops the others the note lists — max depth and minimum samples.` },
    ],
    "C"
  ),
  mcq(
    "U5-M02", 5, 2.5, "decision-tree.md",
    `In the Quinlan (1986) play-tennis example — 14 records, 9 Yes and 5 No, features Outlook, Temperature, Humidity, Windy — which account of the tree is correct?`,
    [
      { letter: "A", text: `Outlook wins the root with IG = 0.247. Overcast (4 samples) is all Yes — a pure node, so it becomes a leaf immediately with no further split. Sunny (5 samples, 2 Yes / 3 No) is recomputed over the remaining features, and only Humidity gives a good split (High → 0 Yes / 3 No, Normal → 2 Yes / 0 No). Rain (5 samples, 3 Yes / 2 No) splits best on Windy.` },
      { letter: "B", text: `Humidity wins the root, and Outlook is the feature used on the Sunny branch.`, rationale: `swaps the root feature with a feature chosen further down one of its own branches.` },
      { letter: "C", text: `As in (A), except that the Overcast branch splits again on Temperature to confirm the node is pure.`, rationale: `a pure node ends the recursion on that branch immediately — there is nothing left to confirm.` },
      { letter: "D", text: `All three branches split on Humidity, since it had the second-highest Information Gain at the root.`, rationale: `Information Gain is computed fresh at every node on that node's own subset; a root-level ranking does not carry down the branches.` },
    ],
    "A"
  ),
  mcq(
    "U5-M03", 5, 2, "entropy-and-information-gain.md",
    `Which statement of the entropy scale and the Information Gain formula is correct?`,
    [
      { letter: "A", text: `Entropy = 1 is perfectly pure and 0 is maximum mess; IG = parent entropy − weighted child entropy.`, rationale: `inverts the entropy scale — 0 is pure, and the maximum is the messy end.` },
      { letter: "B", text: `Entropy = 0 is pure and 1 is maximum mess for two classes; IG = weighted child entropy − parent entropy.`, rationale: `the reversed subtraction the note names as the trap: it produces negative gains and a tree built on the worst splits.` },
      { letter: "C", text: `Entropy = 0 is pure and its maximum is 1 for any number of classes; IG = parent − weighted children.`, rationale: `1 is the two-class maximum; with more classes the maximum is higher.` },
      { letter: "D", text: `Entropy = 0 is perfectly pure — everyone in the group is in the same category — and entropy = 1 is maximum mess for the two-class case, a perfect 50/50 split, with a higher maximum when there are more classes. IG = Entropy(parent) − weighted average entropy(children), and the order is fixed.` },
    ],
    "D"
  ),
  mcq(
    "U5-M04", 5, 2.5, "entropy-and-information-gain.md",
    `A candidate split at a 14-sample node produces branch X with 13 samples at entropy 0.96 and branch Y with 1 sample at entropy 0. A student computes the children's entropy as (0.96 + 0) / 2 = 0.48. Evaluate.`,
    [
      { letter: "A", text: `Right — an unweighted average is correct, because both branches are equally valid outcomes of the split.`, rationale: `applies an unweighted mean, which is exactly the error the size-weighting exists to prevent.` },
      { letter: "B", text: `Wrong — the average is weighted by branch size: (13/14)(0.96) + (1/14)(0) ≈ 0.891. A branch holding 1 of 14 samples cannot drag the average the way a branch holding 13 can. Information Gain is also computed fresh at every node, on that node's subset only.` },
      { letter: "C", text: `Wrong, and the fix is to weight each branch by its entropy rather than by its size.`, rationale: `weights by the very quantity being averaged; the weighting is by number of samples.` },
      { letter: "D", text: `Wrong, but only because a one-sample branch should be discarded before averaging.`, rationale: `invents a discard rule — the small branch is included, just with a correspondingly small weight.` },
    ],
    "B"
  ),
  mcq(
    "U5-M05", 5, 2, "gini-impurity.md",
    `What is the range of Gini impurity, and how does a decision tree actually use it?`,
    [
      { letter: "A", text: `0 to 0.5 for a two-class problem, higher for more classes, with 0 meaning perfectly pure. The algorithm computes the weighted average Gini impurity of the branches resulting from a potential split, and chooses the split producing the lowest weighted impurity — the opposite direction to Information Gain, which is maximised.` },
      { letter: "B", text: `0 to 1 for two classes, and the split with the highest weighted Gini is chosen.`, rationale: `borrows entropy's two-class maximum and then maximises a measure of impurity, which selects the messiest split.` },
      { letter: "C", text: `0 to 0.5, and the goal is to compute and report the Gini impurity of a single group.`, rationale: `the note is explicit that the goal is not the impurity of one group but the weighted average across the branches a split produces.` },
      { letter: "D", text: `0 to 0.5, minimised, but the branches are averaged without weighting since Gini is already normalised.`, rationale: `drops the branch-size weighting, which both impurity measures apply for the same reason.` },
    ],
    "A"
  ),
  mcq(
    "U5-M06", 5, 2, "gini-impurity.md",
    `How do Gini impurity and entropy compare in practice?`,
    [
      { letter: "A", text: `They routinely disagree, so the choice of impurity measure determines the shape of the tree.`, rationale: `overstates the difference; they usually agree on which split is best.` },
      { letter: "B", text: `Entropy is the cheaper of the two, since a logarithm is a single instruction.`, rationale: `inverts the cost comparison — Gini is cheaper precisely because there is no logarithm.` },
      { letter: "C", text: `They usually agree on which split is best, and Gini is cheaper to compute because there is no logarithm. The practical risk is mixing up the two scales — entropy's two-class maximum is 1 while Gini's is 0.5 — which makes an answer look wrong even when the chosen split is right.` },
      { letter: "D", text: `Both max out at 0.5 for two classes, so their values can be compared directly.`, rationale: `gives entropy Gini's maximum; entropy's two-class maximum is 1.` },
    ],
    "C"
  ),

  written(
    "U5-W01", 5, 16, "entropy-and-information-gain.md",
    `A node holds 14 samples, 9 Yes and 5 No. Splitting on feature F produces three branches: 4 samples all Yes; 5 samples at 2 Yes / 3 No; 5 samples at 3 Yes / 2 No. Set out the full procedure for deciding whether F should be the split at this node, saying what is computed at each step and in what order. Name the two things about the arithmetic that most often go wrong, and say what happens to the all-Yes branch.`,
    `Step 1: calculate the entropy of this node before any split — the parent entropy over 9 Yes / 5 No. Step 2: for feature F, split the data by each unique value and calculate each branch's entropy. The 4-sample all-Yes branch has entropy 0, perfectly pure; the two 5-sample branches are close to a 50/50 split and so sit near entropy 1. Then take the weighted average across branches, weighted by branch size: (4/14)(0) + (5/14)(E₂) + (5/14)(E₃). Step 3: Information Gain = Entropy(parent) − weighted average entropy(children). Step 4: repeat for every candidate feature and choose the one with the highest Information Gain as the split. Step 5: recurse on the children until a stopping condition is met. The two arithmetic errors: the subtraction order is fixed at parent minus children — getting it backwards produces negative gains and a tree built on the worst splits; and the branch average must be weighted by branch size, since a branch holding 1 of 14 samples cannot drag the average the way one holding 8 can. The all-Yes branch is a pure node with entropy 0: it ends the recursion on that branch immediately and becomes a leaf labelled Yes, with no further split. Below each branch only the remaining features are considered — F is spent. Note also that entropy = 1 is the two-class maximum; with more classes the maximum is higher.`,
    `Taking an unweighted mean of the three branch entropies, or splitting the pure all-Yes branch again "to be safe".`,
    `+15–20 requires the ordered procedure, the size-weighting with its reason, the parent-minus-children order, AND the pure node terminating that branch. +10–14 if the weighting is present but the pure-node consequence is missing.`
  ),
  written(
    "U5-W02", 5, 12, "gini-impurity.md",
    `A colleague reports: "our root node's Gini impurity is 0.48, so it is nearly maximally impure — worse than the entropy of 0.94 we measured last week on a comparable node." They then propose re-examining the root split once the whole tree has been built, in case a better one exists. Address both claims.`,
    `The comparison is invalid because the two measures run on different scales: Gini ranges 0 to 0.5 for a two-class problem while entropy's two-class maximum is 1. So 0.48 on Gini and 0.94 on entropy are both near their respective maxima and describe comparably impure nodes — mixing up the two scales makes an answer look wrong even when the chosen split is right. Both measures are 0 at perfect purity, both take higher maxima with more classes, and they usually agree on which split is best; Gini is the cheaper of the two because it involves no logarithm. Their use also runs in opposite directions: with entropy you maximise the Information Gain, with Gini you minimise the weighted average impurity of the resulting branches — and in neither case is the goal the impurity of a single group, but the weighted average across the branches a candidate split produces. On the second proposal: the algorithm is greedy. It picks the locally best split at each node and never revisits it, so the resulting tree is not guaranteed to be globally optimal. Re-examining the root after the fact is not part of the algorithm, and the possibility of a better tree is an accepted property of the method rather than a defect to patch.`,
    `Accepting the numeric comparison at face value because 0.94 is a bigger number than 0.48, or claiming the algorithm does backtrack over earlier splits.`,
    `+15–20 requires both scales stated with their maxima, the direction difference (maximise IG versus minimise weighted Gini), the weighted-average-of-branches point, AND the greedy / no-global-optimum answer. +10–14 if the scales are handled correctly but the greedy point is thin.`
  ),

  // ============ Unit 6 — Clustering & Association Rules ============
  mcq(
    "U6-M01", 6, 2, "k-means-clustering.md",
    `Which sequence is the K-means algorithm?`,
    [
      { letter: "A", text: `Select k centroids at random, assign each data point to the furthest centroid, recompute centroids, and repeat.`, rationale: `inverts the assignment rule — each point goes to its closest centroid.` },
      { letter: "B", text: `Select k centroids (k rows chosen at random); assign each data point to its closest centroid; recalculate the centroids as the average of all points in each cluster; reassign points to their closest centroids; repeat the last two steps until no observation is reassigned, or the maximum number of iterations is reached.` },
      { letter: "C", text: `Compute the mean of the whole dataset, then partition it k ways by variance in a single pass; no iteration is needed.`, rationale: `replaces the iterative assign-and-recompute loop with a one-shot partition.` },
      { letter: "D", text: `As in (B), except that the loop repeats until WCSS reaches zero.`, rationale: `WCSS reaches zero only when k equals the number of points; the stopping conditions are no reassignment or the iteration cap.` },
    ],
    "B"
  ),
  mcq(
    "U6-M02", 6, 2, "k-means-clustering.md",
    `Two K-means runs on identical data produce different clusters. Is this a bug?`,
    [
      { letter: "A", text: `Yes — a deterministic algorithm given identical input must produce identical output.`, rationale: `assumes a determinism the method does not have.` },
      { letter: "B", text: `No, because the data must have changed between the two runs.`, rationale: `explains away a property of the algorithm by assuming the input changed.` },
      { letter: "C", text: `No — K-means always converges to the global minimum, so the two results are equivalent relabellings of one another.`, rationale: `it is sensitive to initial placement and can converge to poor solutions, so the two results need not be equivalent.` },
      { letter: "D", text: `No — K-means is non-deterministic because its initial centroids are selected at random. That makes it sensitive to initial centroid placement and able to converge to poor solutions, so running it several times on the same data can give different results.` },
    ],
    "D"
  ),
  mcq(
    "U6-M03", 6, 2.5, "k-means-clustering.md",
    `A manager asks for "four customer segments of roughly equal size" from a table that is mostly categorical, and proposes K-means with k = 4. Evaluate.`,
    [
      { letter: "A", text: `Two problems. K-means does not ensure clusters have the same size — it finds the clusters that are best separated — and it is not suitable for non-numerical data, since even one-hot encoded categories make Euclidean distance misleading. K-modes, or K-prototypes for a mixed table, is the right family.` },
      { letter: "B", text: `Fine on both counts — setting k = 4 fixes the sizes, and one-hot encoding solves the categorical problem.`, rationale: `takes k as a size control and treats one-hot encoding as making Euclidean distance meaningful, which the note explicitly denies.` },
      { letter: "C", text: `The size requirement is fine; the categorical problem is real, and the fix is fuzzy C-means.`, rationale: `fuzzy clustering changes membership from hard to soft — it does nothing about categorical attributes.` },
      { letter: "D", text: `The categorical problem is fine; the size requirement is not, and the Elbow Method will force equal sizes.`, rationale: `the Elbow Method chooses k; it has no bearing on cluster sizes.` },
    ],
    "A"
  ),
  mcq(
    "U6-M04", 6, 2, "elbow-method.md",
    `How does the Elbow Method choose k, and why is "just minimise WCSS" not the rule?`,
    [
      { letter: "A", text: `Take the k with the lowest WCSS, since WCSS is the quantity K-means minimises.`, rationale: `this is the rule the elbow exists to replace — the lowest WCSS is always the largest k available.` },
      { letter: "B", text: `Take the k at which WCSS first rises, marking the onset of over-clustering.`, rationale: `WCSS never rises as k grows; it decreases monotonically.` },
      { letter: "C", text: `Plot WCSS against k and take the point where the change in WCSS begins to level off. WCSS always decreases as k increases — at k = number of points it is 0 — so minimising it is not a usable rule on its own; the elbow is about the rate of decrease, not the value.` },
      { letter: "D", text: `Take the k at which WCSS falls below half its value at k = 1.`, rationale: `invents a fixed-fraction threshold that appears nowhere in the method.` },
    ],
    "C"
  ),
  mcq(
    "U6-M05", 6, 2, "elbow-method.md",
    `The WCSS curve bends gently, leaving two plausible values of k. What does this mean, and what is the named alternative?`,
    [
      { letter: "A", text: `The data has no cluster structure and clustering should be abandoned.`, rationale: `reads ordinary curve behaviour as an absence of structure.` },
      { letter: "B", text: `The features were not scaled; after scaling the elbow will be sharp.`, rationale: `scaling is a genuine requirement, but it does not guarantee a sharp bend.` },
      { letter: "C", text: `Resolve it by taking the larger candidate, since more clusters always reduces WCSS.`, rationale: `reduces the decision back to the minimise-WCSS rule the elbow exists to replace.` },
      { letter: "D", text: `Normal — the elbow is often ambiguous, because real curves frequently bend gently rather than sharply, and the method narrows the choice to a small range rather than naming one number (the lecture's own plot reads "3 at best, or 4 if needed"). Being able to defend a choice between two candidates matters more than finding "the" answer; the alternative named in the slides is the Silhouette Score.` },
    ],
    "D"
  ),
  mcq(
    "U6-M06", 6, 2, "hard-and-fuzzy-clustering.md",
    `What separates hard from fuzzy clustering?`,
    [
      { letter: "A", text: `Fuzzy clustering is supervised, since the membership weights have to be supplied as labels.`, rationale: `the weights are produced by the algorithm, and both procedures are unsupervised clustering.` },
      { letter: "B", text: `Hard clustering allocates a sample to just one cluster (K-means); fuzzy clustering — also called soft clustering or soft K-means — distributes a sample among several clusters, belonging to each to a degree set by a weighted value (fuzzy C-means). The difference is in the membership, not the goal: hard gives one label per point, fuzzy gives a vector of membership weights.` },
      { letter: "C", text: `"Soft K-means" is a separate method from fuzzy clustering, with a different objective function.`, rationale: `soft K-means is another name for fuzzy clustering, not a distinct method.` },
      { letter: "D", text: `Hard clustering produces membership weights that are rounded to 0 or 1 afterwards.`, rationale: `describes fuzzy clustering plus a post-hoc rounding step; hard clustering allocates to a single cluster directly.` },
    ],
    "B"
  ),
  mcq(
    "U6-M07", 6, 2, "k-modes-and-k-prototypes.md",
    `A customer table holds age and income alongside three categorical columns. Which method applies, and what is its cluster centre called?`,
    [
      { letter: "A", text: `K-modes — any table containing a categorical column is K-modes' case.`, rationale: `K-modes handles purely categorical data; a table mixing numeric and categorical attributes is K-prototypes' case.` },
      { letter: "B", text: `K-means, after one-hot encoding the three categorical columns.`, rationale: `Euclidean distance on numerically encoded categories is misleading — which is the reason the K-modes/K-prototypes family exists at all.` },
      { letter: "C", text: `K-prototypes — it combines K-means for the numerical attributes with K-modes for the categorical ones, and its cluster centre is called a prototype. K-modes alone (modes instead of means, dissimilarity by number of mismatches) would be the choice for a purely categorical table.` },
      { letter: "D", text: `K-prototypes, whose cluster centre is called a centroid, exactly as in K-means.`, rationale: `right method, wrong term — K-prototypes calls the centre a prototype because it represents the most typical point of the cluster.` },
    ],
    "C"
  ),
  mcq(
    "U6-M08", 6, 2.5, "k-modes-and-k-prototypes.md",
    `A K-prototypes run uses the cost \`cost = (age1 − age2)² + (income1 − income2)² + (number of mismatches)\` on raw, unscaled values. What goes wrong?`,
    [
      { letter: "A", text: `Nothing — summing the two kinds of distance is exactly what makes K-prototypes work.`, rationale: `summing the two kinds of distance is the method; applying it to unscaled values is the flaw the note flags.` },
      { letter: "B", text: `The mismatch count dominates, since counts are unbounded while squared differences are not.`, rationale: `inverts which term dominates and misdescribes both — the mismatch count is a small integer, the squared income difference is not bounded.` },
      { letter: "C", text: `The fix is to square the mismatch count so that all three terms are on the same footing.`, rationale: `squaring a small integer count leaves it small; the fix is scaling the numerical terms down, not scaling the count up.` },
      { letter: "D", text: `The categorical term contributes essentially nothing: income differences run into the millions once squared, while the mismatch count is a small integer. Without normalising or Z-score standardising the numerical values first, the numeric part decides every cluster.` },
    ],
    "D"
  ),
  mcq(
    "U6-M09", 6, 2, "transactional-data-and-market-basket-analysis.md",
    `Which account of transactional data and market basket analysis is correct?`,
    [
      { letter: "A", text: `Transactional data records the details of a specific, single occurrence; market basket analysis mines it for items frequently purchased together, expressed as association rules; and an itemset is a collection of one or more items appearing together in one transaction. The method rests on transactions being recorded at the right grain — a "transaction" that aggregates a week of purchases is no longer a single occurrence, and the rules it produces mean something different.` },
      { letter: "B", text: `As in (A), except that grain does not matter, since support and confidence are ratios and ratios are scale-free.`, rationale: `a ratio does not repair a changed unit of observation; the rules would then describe weekly baskets rather than single visits.` },
      { letter: "C", text: `Transactional data is any data carrying a timestamp, and an itemset is a collection of two or more items.`, rationale: `loosens the definition to timestamps, and requires two items — an itemset is a collection of one or more.` },
      { letter: "D", text: `As in (A), except that market basket analysis is predictive, since it forecasts a customer's next purchase.`, rationale: `association mining is descriptive — it describes co-occurrence in transactions already recorded.` },
    ],
    "A"
  ),
  mcq(
    "U6-M10", 6, 2, "transactional-data-and-market-basket-analysis.md",
    `\`{Bread, Eggs} → {Milk}\` comes back as a strong rule. What should the store do with it, and does the system now predict purchases?`,
    [
      { letter: "A", text: `Treat it as a prediction and pre-load milk into the basket of any customer who scans bread and eggs.`, rationale: `converts a descriptive co-occurrence statement into a per-customer prediction it cannot support.` },
      { letter: "B", text: `Nothing, until the rule has been validated on a held-out test set.`, rationale: `imports the predictive model's evaluation apparatus; a descriptive model is judged by whether the structure it exposes is interesting and usable.` },
      { letter: "C", text: `Act on it operationally — for instance, place milk near the bread and eggs sections to encourage impulse purchases — but the rule is descriptive: it describes co-occurrence in transactions already recorded and does not predict a target variable for any new customer.` },
      { letter: "D", text: `Act on it, and treat it as predictive, since milk is on the right-hand side and is therefore the target variable.`, rationale: `borrows the target/predictor vocabulary that belongs to predictive models; association rules have no target variable.` },
    ],
    "C"
  ),
  mcq(
    "U6-M11", 6, 2, "support-confidence-and-lift.md",
    `Define support, confidence and lift for a rule \`X → Y\`, and give lift's neutral value.`,
    [
      { letter: "A", text: `As in (B), except that lift = 0 means no association and any lift above 0 is a genuine relationship.`, rationale: `shifts the no-association anchor from 1 to 0; lift is a ratio against chance, so 1 is the neutral point.` },
      { letter: "B", text: `Support is how popular the itemset is — the fraction of all transactions containing it. Confidence is how often Y is present given X — a conditional probability. Lift(X → Y) = Confidence(X → Y) / Support(Y), ranging over [0, +∞): lift = 1 means no association, lift > 1 a genuine non-coincidental relationship, lift < 1 co-occurrence less often than chance.` },
      { letter: "C", text: `As in (B), except that Lift(X → Y) = Support(X → Y) / Confidence(Y).`, rationale: `swaps the two quantities in the ratio — lift divides the rule's confidence by the support of the consequent.` },
      { letter: "D", text: `Confidence is the fraction of all transactions containing both X and Y; support is the conditional probability of Y given X.`, rationale: `swaps the definitions of support and confidence outright.` },
    ],
    "B"
  ),
  mcq(
    "U6-M12", 6, 2.5, "support-confidence-and-lift.md",
    `\`{Bread} → {Milk}\` comes back with 100% confidence, and the category manager wants to act on it at once. What is the right response?`,
    [
      { letter: "A", text: `Check the lift first. In the lecture's example milk's support is also 100%, so lift = 100% / 100% = 1: no association at all, and the rule is worthless despite perfect confidence, because customers buy milk in every transaction regardless of bread. Had milk's support been 50%, the same confidence would have given a lift of 2 and a real finding — which is why high confidence alone cannot distinguish a real pattern from a popular item.` },
      { letter: "B", text: `Act on it — 100% confidence is the strongest possible evidence a rule can carry.`, rationale: `exactly the error lift exists to catch; confidence is 100% here simply because milk is in every basket.` },
      { letter: "C", text: `Reject it — 100% confidence is impossible in real transaction data and points to a bug.`, rationale: `attacks the number's plausibility instead of computing the lift that settles the question.` },
      { letter: "D", text: `Check the lift, which comes out at 0 here, so the rule should be discarded.`, rationale: `right instinct, wrong arithmetic: the lift is 1, the no-association value, not 0.` },
    ],
    "A"
  ),
  mcq(
    "U6-M13", 6, 2, "apriori-algorithm.md",
    `State the Apriori property and identify the form in which the algorithm actually applies it.`,
    [
      { letter: "A", text: `The stated form is applied directly: having found {Bread, Butter, Milk} frequent, the algorithm counts all its subsets to confirm they are frequent too.`, rationale: `confirming subsets prunes nothing; the efficiency comes from the contrapositive.` },
      { letter: "B", text: `If an itemset is infrequent, its subsets are also infrequent, so the subsets can be pruned.`, rationale: `reverses the direction — infrequency propagates upward to supersets, not downward to subsets.` },
      { letter: "C", text: `The property: if an itemset is frequent, then all of its subsets must also be frequent. The half the algorithm actually applies is the contrapositive — if an itemset is infrequent, then all of its supersets must also be infrequent — which is what lets it prune every larger itemset containing, say, {Beer, Chips} without ever counting them.` },
      { letter: "D", text: `If an itemset is frequent, its supersets are frequent too, so the search can skip counting them.`, rationale: `frequency does not propagate upward; the larger itemsets are precisely what has to be counted.` },
    ],
    "C"
  ),
  mcq(
    "U6-M14", 6, 2.5, "apriori-algorithm.md",
    `From the frequent itemset {Milk, Bread, Butter}, which rules can be generated — and when may the search legitimately stop at 2-itemsets?`,
    [
      { letter: "A", text: `\`{Milk} → {Bread}\` is valid, since any subset relation among frequent items yields a rule.`, rationale: `drops Butter, which the rule-generation constraint forbids — every item of the itemset must appear on one side or the other.` },
      { letter: "B", text: `Three rules, one for each item taken as the right-hand side.`, rationale: `counts only single-item consequents; there are six possible rules from a 3-itemset.` },
      { letter: "C", text: `Six rules, but stopping at 2-itemsets is an error whenever a frequent 3-itemset exists.`, rationale: `gets the count right, then forbids a stop the note calls legitimate — you may choose to extract only pairwise relationships.` },
      { letter: "D", text: `Six possible rules, and \`{Milk} → {Bread}\` is not one of them, because Butter is missing: every item must appear on the left or the right, none may be dropped, and both sides must be non-empty. Stopping at 2-itemsets is legitimate even when larger frequent itemsets exist — you are then choosing to extract only pairwise relationships.` },
    ],
    "D"
  ),

  written(
    "U6-W01", 6, 15, "k-modes-and-k-prototypes.md",
    `A bank clusters customers on age (years), income (baht) and several categorical attributes using K-prototypes, with the cost \`cost = (age1 − age2)² + (income1 − income2)² + (number of mismatches)\` computed on raw values. Explain why the result will be driven almost entirely by one column, name the preprocessing step that fixes it, and say why K-means with one-hot encoding would not have been a valid alternative in the first place.`,
    `Read the two kinds of term in the cost. The numerical terms are squared raw differences — income differences run into the millions once squared — while the categorical term is a small integer count of mismatches (0, 1, 2, …). Without normalising or standardising (Z-score) the numerical values first, the categorical part contributes essentially nothing and income decides every cluster; age is swamped along with it. The fix is feature scaling: normalisation or Z-score standardisation of the numerical attributes before the cost is computed. In K-prototypes this is not optional. K-means with one-hot encoding was never a valid alternative, because K-means is not suitable for non-numerical data: even when categories are encoded numerically, including one-hot, Euclidean distance over them is misleading — which is exactly why the K-modes / K-prototypes family exists. K-modes uses modes instead of means and measures dissimilarity by the number of mismatches, which is Hamming distance by another name; K-prototypes combines K-means for the numerical attributes with K-modes for the categorical ones, and calls its cluster centre a prototype rather than a centroid.`,
    `Answering only "you need to scale the features" without reading the asymmetry between the two kinds of term off the cost formula, or defending K-means-plus-one-hot as an acceptable fallback.`,
    `+15–20 requires the squared-versus-count asymmetry read off the formula, scaling named as the fix, AND the reason one-hot plus Euclidean distance is invalid. +10–14 if the scaling point is made but the one-hot objection is missing.`
  ),
  written(
    "U6-W02", 6, 14, "support-confidence-and-lift.md",
    `A grocery chain's rule engine returns \`{Bread} → {Milk}\` with support 100% and confidence 100%, and the category manager wants to act on it immediately. Compute the lift, say what it means, explain what would have had to be different for the same confidence to be a real finding, and state the general lesson about confidence.`,
    `Lift(X → Y) = Confidence(X → Y) / Support(Y) = 100% / 100% = 1. Lift = 1 means no association: bread and milk co-occur exactly as often as chance predicts. The rule is worthless despite perfect confidence, because customers buy milk in every transaction regardless of whether they buy bread — the confidence is 100% simply because milk is in everything, and confidence is only a conditional probability of Y given X. Had milk's support been lower — say 50% — the same 100% confidence would have produced a lift of 2, well above 1, and a genuine finding. Lift ranges over [0, +∞): above 1 is a real, non-coincidental relationship; below 1 means the items appear together less often than chance would predict. The general lesson: high confidence alone cannot distinguish a real pattern from a popular item, and that is exactly why lift exists. Worth adding that "frequent" is also a threshold-relative term — an itemset is frequent when it appears at or above a user-defined minimum support threshold, and that threshold is a choice you make, not a property of the data.`,
    `Acting on the 100% confidence, or computing lift as confidence divided by the support of X rather than the support of Y.`,
    `+15–20 requires the lift computed with the correct formula, lift = 1 read as no association, the counterfactual with a lower Support(Y), AND the general lesson about confidence. +10–14 if the arithmetic is right but the counterfactual is missing.`
  ),
  written(
    "U6-W03", 6, 14, "apriori-algorithm.md",
    `A transaction database is being mined at a 50% minimum support threshold. The 2-itemsets all clear it, but {milk, bread, eggs} appears in only 1 of the 3 transactions. Explain what the algorithm does at this point and why, stating the property it relies on and the exact form in which that property does the work. Then say which rules can be generated from the frequent itemset {Milk, Bread, Butter}, and which superficially plausible rule cannot.`,
    `{milk, bread, eggs} has support 1/3 = 33.33%, below the 50% threshold, so it is infrequent and the search stops at 2-itemsets — no itemset of the next size clears minimum support. The property is the Apriori property: if an itemset is frequent, then all of its subsets must also be frequent. But the form the algorithm actually applies is the contrapositive: if an itemset is infrequent, then all of its supersets must also be infrequent — so once a set is found infrequent, every larger itemset containing it is pruned without ever being counted. The pruning direction is the trap: frequency propagates downward to subsets, infrequency propagates upward to supersets. From {Milk, Bread, Butter} there are six possible rules, and every one of them must use all three items — all items appear on the left or the right, none may be dropped, and both sides must be non-empty. \`{Milk} → {Bread}\` is therefore not one of them, because Butter is missing. Stopping at 2-itemsets is a legitimate choice even where larger frequent itemsets exist: you are then extracting only pairwise relationships, and you go to 3-itemsets when more complex bundles are needed. Apriori's two steps overall are: find the frequent itemsets, growing by size and pruning as you go; then generate association rules from the frequent itemsets found.`,
    `Stating the property only in its "frequent → subsets frequent" form and claiming that is what does the pruning, or generating \`{Milk} → {Bread}\` from the 3-itemset.`,
    `+15–20 requires the support arithmetic, both forms of the property with the contrapositive identified as the one that prunes, the six-rules count, AND \`{Milk} → {Bread}\` rejected with the reason. +10–14 if the contrapositive is named but the rule-generation constraint is left vague.`
  ),
];

export function itemsForUnit(unit: number): ExamItem[] {
  return EXAM_ITEMS.filter((item) => item.unit === unit);
}

export function unitInfo(unit: number): UnitInfo | undefined {
  return UNITS.find((u) => u.number === unit);
}
