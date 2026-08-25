import { notFound } from "next/navigation";
import FinalApproach from "@/components/FinalApproach";
import { findSubjectEntry } from "@/data/finalApproach/registry";
import { EXAM_ITEMS, UNITS, EXAM_META } from "@/data/finalApproach/modernSwePrinciples";

// Only one subject has an exam authored so far. Adding a second means adding
// its data file next to modernSwePrinciples.ts and a case below — see the
// comment at the top of data/finalApproach/registry.ts.
const DATA_BY_SLUG: Record<
  string,
  { items: typeof EXAM_ITEMS; units: typeof UNITS; meta: typeof EXAM_META }
> = {
  "modern-software-engineering-principles": { items: EXAM_ITEMS, units: UNITS, meta: EXAM_META },
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
