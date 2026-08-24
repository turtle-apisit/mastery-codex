import SkillTreeClient from "@/components/SkillTreeClient";
import { getAllConcepts, getSubjects } from "@/lib/vault";

export default function SkillTreePage() {
  const concepts = getAllConcepts();
  const subjects = getSubjects();

  return (
    <div className="page">
      <SkillTreeClient concepts={concepts} subjects={subjects} />
    </div>
  );
}
