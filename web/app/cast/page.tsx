import CastGrid from "@/components/CastGrid";
import { getAgents, getSharedContract } from "@/lib/vault";

export default function CastPage() {
  const agents = getAgents();
  const contract = getSharedContract();

  return (
    <div className="page">
      <section className="panel" id="cast">
        <h2>The Cast</h2>
        <CastGrid agents={agents} contract={contract} />
      </section>
    </div>
  );
}
