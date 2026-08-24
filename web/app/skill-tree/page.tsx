import { ViewTransition } from "react";
import SkillTreeClient from "@/components/SkillTreeClient";
import { getAllConcepts, getSubjects } from "@/lib/vault";

export default function SkillTreePage() {
  const concepts = getAllConcepts();
  const subjects = getSubjects();

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div className="page">
        <SkillTreeClient concepts={concepts} subjects={subjects} />
      </div>
    </ViewTransition>
  );
}
