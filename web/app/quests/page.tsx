import { ViewTransition } from "react";
import { getExercises } from "@/lib/vault";
import { questRank, questTypeGlyph, subjectGlyph } from "@/lib/gameFlavor";

export default function QuestsPage() {
  const exercises = getExercises();

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div className="page">
        <section id="quests">
          <div className="quest-board-head">
            <span className="eyebrow">Quest Board</span>
            <span className="quest-board-count num">
              {exercises.length} posted
            </span>
          </div>
          <div className="quests">
            {exercises.map((ex, i) => {
              const rank = questRank(ex.rewardXp);
              return (
                <article
                  className={"quest cut-sm" + (ex.retry ? " has-urgent" : "")}
                  key={i}
                >
                  {ex.retry && <span className="quest-urgent">Urgent</span>}
                  <span className={"quest-rank r" + rank} aria-label={`Rank ${rank}`}>
                    {rank}
                  </span>
                  <div className="quest-top">
                    <span className="quest-subject">
                      <span className="quest-glyph" aria-hidden="true">
                        {subjectGlyph(ex.subject)}
                      </span>
                      {ex.subject}
                    </span>
                  </div>
                  <div className="quest-title">{ex.title}</div>
                  <div className="quest-meta">
                    <span className="tag">
                      <span className="quest-glyph" aria-hidden="true">
                        {questTypeGlyph(ex.type)}
                      </span>
                      {ex.type}
                    </span>
                    <span className="tag">~{ex.minutes} min</span>
                    {ex.retry && <span className="tag untrained">Missed before</span>}
                  </div>
                  <div className="quest-foot">
                    <span className="quest-reward num">+{ex.rewardXp} XP</span>
                  </div>
                </article>
              );
            })}
            {!exercises.length && (
              <p style={{ color: "var(--text-faint)", fontSize: 13 }}>
                No exercises queued yet — Orin hasn&rsquo;t written today&rsquo;s quests.
              </p>
            )}
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}
