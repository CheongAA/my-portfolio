"use client";

import React, { memo, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Container from "../Container";

const Char = memo(function Char({
  ch,
  i,
  progress,
}: {
  ch: string;
  i: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [i - 0.5, i + 1], [0.4, 1]);

  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {ch === " " ? "\u00A0" : ch}
    </motion.span>
  );
});

export default function AboutSection() {
  const t = useTranslations("about");
  const ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 70%"],
  });

  // <br/> 태그를 실제 줄바꿈으로 변환하고, 각 문자를 배열로 만듦
  const text = t("text");
  const parts = text.split("<br/>");
  const totalChars = text.replace(/<br\/>/g, "").length;
  const progress = useTransform(scrollYProgress, [0, 1], [0, totalChars]);

  return (
    <section id="about">
      <Container>
        <motion.span
          ref={ref}
          className="block text-3xl md:text-7xl font-medium tracking-tight text-primary leading-tight"
        >
          {parts.map((part, partIndex) => (
            <React.Fragment key={partIndex}>
              {part.split("").map((ch, charIndex) => {
                // 전체 인덱스 계산 (이전 파트들의 길이 + 현재 인덱스)
                const globalIndex =
                  parts
                    .slice(0, partIndex)
                    .reduce((acc, p) => acc + p.length, 0) + charIndex;
                return (
                  <Char
                    key={globalIndex}
                    ch={ch}
                    i={globalIndex}
                    progress={progress}
                  />
                );
              })}
              {partIndex < parts.length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.span>
      </Container>
    </section>
  );
}
