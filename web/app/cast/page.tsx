import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CastGrid from "@/components/CastGrid";
import { getAgents, getSharedContract } from "@/lib/vault";

export default function CastPage() {
  const agents = getAgents();
  const contract = getSharedContract();

  return (
    <div className="page">
      <section className="panel" id="cast">
        <h2>The Cast</h2>

        <div className="cast-contract">
          <div className="cast-contract-head">
            Shared Contract<span className="cast-contract-sub">every agent follows this</span>
          </div>
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{contract}</ReactMarkdown>
          </div>
        </div>

        <CastGrid agents={agents} />
      </section>
    </div>
  );
}
