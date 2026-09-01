import { getAllConcepts } from "@/lib/vault";
import SessionDetail from "./SessionDetail";

export default function SessionDetailPage() {
  const allConcepts = getAllConcepts();

  return <SessionDetail allConcepts={allConcepts} />;
}
