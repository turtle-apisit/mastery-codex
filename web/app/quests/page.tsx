import { ViewTransition } from "react";
import { getExercises } from "@/lib/vault";

export default function QuestsPage() {
  const exercises = getExercises();

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
    <div className="page">
      <section id="quests">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Today&rsquo;s Quests
        </div>
        <div className="quests">
          {exercises.map((ex, i) => (
            <div className="quest" key={i}>
              <div className="quest-top">
                <span className="quest-subject">{ex.subject}</span>
                <span className="quest-reward num">+{ex.rewardXp} XP</span>
              </div>
              <div className="quest-title">{ex.title}</div>
              <div className="quest-meta">
                <span className="tag">{ex.type}</span>
                <span className="tag">~{ex.minutes} min</span>
                {ex.retry && <span className="tag untrained">Retry &middot; missed before</span>}
              </div>
            </div>
          ))}
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
