import { notFound } from "next/navigation";
import FinalApproach from "@/components/FinalApproach";
import { findSubjectEntry } from "@/data/finalApproach/registry";
import type { ExamItem, ExamMeta, UnitInfo } from "@/data/finalApproach/types";
import * as modernSwePrinciples from "@/data/finalApproach/modernSwePrinciples";
import * as dataScienceEngineering from "@/data/finalApproach/dataScienceEngineering";
import * as softwareArchitecture from "@/data/finalApproach/softwareArchitecture";

// One entry per subject that has an exam data file. Adding a fourth means
// adding its data file, an entry here, and an entry in the registry — see the
// comment at the top of data/finalApproach/registry.ts.
type SubjectExam = { items: ExamItem[]; units: UnitInfo[]; meta: ExamMeta };

const DATA_BY_SLUG: Record<string, SubjectExam> = {
  "modern-software-engineering-principles": {
    items: modernSwePrinciples.EXAM_ITEMS,
    units: modernSwePrinciples.UNITS,
    meta: modernSwePrinciples.EXAM_META,
  },
  "data-science-and-engineering-principles": {
    items: dataScienceEngineering.EXAM_ITEMS,
    units: dataScienceEngineering.UNITS,
    meta: dataScienceEngineering.EXAM_META,
  },
  "software-architecture": {
    items: softwareArchitecture.EXAM_ITEMS,
    units: softwareArchitecture.UNITS,
    meta: softwareArchitecture.EXAM_META,
  },
};

export function generateStaticParams() {
  return Object.keys(DATA_BY_SLUG).map((subject) => ({ subject }));
}

export default async function FinalApproachSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: slug } = await params;
  const entry = findSubjectEntry(slug);
  const data = DATA_BY_SLUG[slug];
  if (!entry || !data) notFound();

  return (
    <div className="page">
      <FinalApproach
        subjectSlug={slug}
        subjectTitle={entry.subjectName}
        items={data.items}
        units={data.units}
        meta={data.meta}
      />
    </div>
  );
}
