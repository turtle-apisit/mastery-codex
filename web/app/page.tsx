import CharacterView from "@/components/CharacterView";
import { getCycleInfo } from "@/lib/vault";

export default function CharacterPage() {
  const cycle = getCycleInfo();

  return <CharacterView cycle={cycle} />;
}
