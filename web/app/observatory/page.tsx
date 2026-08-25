import CastGrid from "@/components/CastGrid";
import { getAgents, getSharedContract } from "@/lib/vault";

export default function ObservatoryPage() {
  const agents = getAgents();
  const contract = getSharedContract();

  return (
    <div className="page">
      <header className="cast-head">
        <h1>The Observatory</h1>
        <p className="cast-head-sub">
          Seven named stars — each one a real Claude Code subagent that reads your
          material, sets your work, or keeps the record. Ordered by how often you
          reach for them.
        </p>
      </header>

      <CastGrid agents={agents} contract={contract} />
    </div>
  );
}
