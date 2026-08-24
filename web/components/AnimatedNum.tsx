"use client";

import { useCountUp } from "@/lib/useCountUp";

export default function AnimatedNum({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const v = useCountUp(value);
  return <span className={className}>{Math.round(v)}</span>;
}
