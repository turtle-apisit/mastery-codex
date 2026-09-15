import SimulationRound from "@/components/SimulationRound";

export default async function SimulationRoundPage({
  params,
}: {
  params: Promise<{ setId: string }>;
}) {
  const { setId } = await params;
  return <SimulationRound setId={setId} />;
}
