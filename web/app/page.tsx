import CharacterView from "@/components/CharacterView";
import { getAllConcepts, getCycleInfo, getJobSummaries, getStreak } from "@/lib/vault";

export default function CharacterPage() {
  const concepts = getAllConcepts();
  const jobs = getJobSummaries();
  const cycle = getCycleInfo();
  const streak = getStreak();

  return <CharacterView concepts={concepts} jobs={jobs} cycle={cycle} streak={streak} />;
}
