import { getQuestLog } from "@/lib/vault";

function timeAgo(dateStr: string): string {
  const days = Math.round((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return dateStr;
}

export default function LogPage() {
  const entries = getQuestLog().slice(0, 40);

  return (
    <div className="page">
      <section className="panel" id="log">
        <h2>Quest Log</h2>
        <ul className="log-list">
          {entries.map((e, i) => (
            <li key={i}>
              <span
                className="delta num"
                style={e.activity === "rust-check" ? { color: "var(--rusty)" } : undefined}
              >
                {e.delta > 0 ? `+${e.delta}` : e.delta === 0 ? "—" : e.delta}
              </span>
              <span className="skill">{e.concept}</span>
              <span className="meta">
                {e.activity} &middot; {timeAgo(e.date)}
              </span>
            </li>
          ))}
          {!entries.length && (
            <li style={{ color: "var(--text-faint)" }}>No activity logged yet.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
