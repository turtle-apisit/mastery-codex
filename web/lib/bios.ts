/**
 * In-world character introductions, one per agent. Written from what
 * each agent actually does (see .claude/agents/<slug>.md) but in
 * narrative voice — the technical spec still lives in the agent file
 * and renders below this on the Cast page, this is just the framing
 * a visitor reads first.
 */
export const BIOS: Record<string, string> = {
  yuki:
    "The first to lay eyes on anything new. When a lecture lands in the vault, Yuki reads every page before you do — pulling out one idea at a time, writing it down clean, and quietly noting which older ideas it leans on. She never guesses at how well you know something; until you've actually tried it, it stays untouched on her shelf.",
  bram:
    "Keeper of the ledger. Every attempt you make — right, wrong, or somewhere between — passes through Bram's hands before it becomes a number. He doesn't argue with the grade he's given; he just writes it down, precisely, in the same book, in the same order it happened. If a skill goes quiet too long, he's the one who marks it fading.",
  sable:
    "Always looking at the whole board, not just today. Sable walks the full length of what you know each week, marking what's gone stale and what's never been tried, then lays out where the coming days should go — weakest first. When the exam looms four weeks in, she's the one who says: stop spreading thin, go narrow.",
  orin:
    "The one you actually sit across from. Orin sets the day's trial to match what the material calls for — a question if it's a question kind of idea, a real problem to solve if it's not — and never lets a wrong answer go untested twice. Thursdays are hers alone: no new exercises, just your own words, read closely, corrected exactly.",
  vesna:
    "Watches the curriculum, not the student. Vesna checks that what Orin is asking actually matches what the source material taught, and that the threads Yuki draws between ideas are real dependencies, not just neighbors. She'll fix an obviously wrong thread herself; anything less certain, she flags and leaves for a human call.",
  kade:
    "Audits the machine, never the person in it. Kade samples the week's exercises, scores, and feedback looking for drift — grading gone soft, corrections gone vague, estimates gone wrong — and fixes only what's small and obvious. Anything bigger goes into a report, not a rewrite.",
  ashen:
    "Shows up once every five weeks, and only then. When boss week arrives, Ashen pulls the full record, builds a real exam weighted toward what's weakest, and grades it as strictly as Orin grades an essay. Where the exam disagrees with what the scorecard promised, that's not written off as forgetting — it's flagged as a question for the system itself.",
};

export function bioTeaser(slug: string): string {
  const bio = BIOS[slug] ?? "";
  const firstSentence = bio.split(/(?<=[.!?])\s/)[0];
  return firstSentence || bio;
}
