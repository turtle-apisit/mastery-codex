import CastGrid from "@/components/CastGrid";
import { getAgents, getSharedContract } from "@/lib/vault";

export default function CastPage() {
  const agents = getAgents();
  const contract = getSharedContract();

  return (
    <div className="page">
      <header className="cast-head">
        <h1>The Cast</h1>
        <p className="cast-head-sub">
          The agents that read your material, set your work, and keep the record —
          each one a real Claude Code subagent behind the scenes.
        </p>
      </header>

      <CastGrid agents={agents} contract={contract} />
    </div>
  );
}
