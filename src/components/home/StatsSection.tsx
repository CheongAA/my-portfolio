"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [triggered, target, duration]);

  return count;
}

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
  triggered: boolean;
  borderRight?: boolean;
}

function StatItem({
  value,
  suffix = "",
  label,
  delay,
  triggered,
  borderRight,
}: StatItemProps) {
  const [localTriggered, setLocalTriggered] = useState(false);
  const count = useCountUp(value, 1500, localTriggered);

  useEffect(() => {
    if (!triggered) return;
    const timer = setTimeout(() => setLocalTriggered(true), delay);
    return () => clearTimeout(timer);
  }, [triggered, delay]);

  return (
    <div
      className={`flex-1 text-center py-10 px-6 md:py-16 md:px-16${
        borderRight ? " border-r border-border" : ""
      }`}
    >
      <div className="text-5xl lg:text-[9rem] font-medium tracking-tight leading-none text-primary">
        {count}
        {suffix}
      </div>
      <div className="mt-3 md:mt-4 text-[10px] md:text-xs tracking-[0.2em] uppercase text-secondary">
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const t = useTranslations("stats");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full border-t border-border">
      <div className="flex flex-row">
        <StatItem
          value={5}
          suffix="+"
          label={t("yearsLabel")}
          delay={0}
          triggered={isInView}
          borderRight
        />
        <StatItem
          value={15}
          suffix="+"
          label={t("projectsLabel")}
          delay={150}
          triggered={isInView}
          borderRight
        />
        <StatItem
          value={3}
          label={t("companiesLabel")}
          delay={300}
          triggered={isInView}
        />
      </div>
    </section>
  );
}
