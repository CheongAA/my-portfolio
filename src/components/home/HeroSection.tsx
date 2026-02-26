"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  easeInOut,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Container from "../Container";
import Trans from "../Trans";

export default function HeroSection() {
  const t = useTranslations("hero");
  const mainRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"],
  });

  // image
  const laptopScale = useTransform(
    scrollYProgress,
    [0, 0.55, 0.75, 1],
    [1, 1.35, 2.4, 3.2],
    {
      ease: easeInOut,
    }
  );
  const bgOpacity = useTransform(scrollYProgress, [0, 0.62, 0.74], [1, 1, 0]);

  // video
  const gifOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.4, 0]);
  const gifY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7],
    ["0%", "-5%", "-10%"]
  );

  // text
  const leftTopX = useTransform(scrollYProgress, [0, 0.4], ["0%", "-300%"]);
  const leftTopY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-120%"]);
  const leftTopScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.15], {
    ease: easeInOut,
  });

  const leftBottomX = useTransform(scrollYProgress, [0, 0.4], ["0%", "-300%"]);
  const leftBottomY = useTransform(scrollYProgress, [0, 0.4], ["0%", "120%"]);
  const leftBottomScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.15], {
    ease: easeInOut,
  });

  const rightTextX = useTransform(scrollYProgress, [0, 0.4], ["0%", "300%"]);
  const rightTextY = useTransform(scrollYProgress, [0, 0.4], ["0%", "120%"]);
  const rightTextScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.15], {
    ease: easeInOut,
  });

  return (
    <section ref={mainRef} className="relative h-[200vh] w-full">
      {/* laptop stage */}
      <div className="fixed top-0 h-screen w-screen overflow-hidden z-0">
        {/* laptop screen video  */}
        <motion.video
          className="absolute inset-0 pointer-events-none w-full h-full object-cover [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-enclosure]:hidden"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/videos/coding.mp4`}
          style={{
            opacity: gifOpacity,
            y: gifY,
            filter:
              "contrast(1.18) saturate(1.08) brightness(0.92) hue-rotate(-10deg)",
            willChange: "transform, opacity, filter",
          }}
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: gifOpacity }}
        >
          {/* 상단 쿨톤 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 45% 35%, rgba(120,180,255,0.16), transparent 55%)",
              mixBlendMode: "screen",
            }}
          />
          {/* 하단 웜톤 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 55% 75%, rgba(255,190,140,0.10), transparent 55%)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

        {/* laptop background image */}
        <motion.div
          className="laptop-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            scale: laptopScale,
            opacity: bgOpacity,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
        </motion.div>

        {/* hero */}
        <Container className="relative h-full my-0">
          {/* Lt text */}
          <motion.span
            className="absolute top-1/5 text-[3em] md:text-[5em] leading-[0.88em] tracking-[-0.06em] font-medium text-primary"
            style={{
              scale: leftTopScale,
              x: leftTopX,
              y: leftTopY,
              willChange: "transform",
            }}
          >
            {t("titleTop")}
            <br />
            {t("titleBottom")}
          </motion.span>

          {/* Lb text */}
          <motion.div
            className="absolute bottom-1/10 w-1/3 font-medium hidden md:block"
            style={{
              scale: leftBottomScale,
              x: leftBottomX,
              y: leftBottomY,
              willChange: "transform",
            }}
          >
            <span className="text-[1.67em] tracking-[-0.064em] leading-1 text-primary">
              <Trans text={t("leftBottomTitle")} />
            </span>
            <hr className="my-5 h-px w-1/6 bg-border" />
            <span className="text-[0.83em] tracking-[-0.03em] text-secondary">
              <Trans text={t("leftBottomDescription")} />
            </span>
          </motion.div>

          {/* Right big typography */}
          <motion.div
            className="absolute right-10 md:right-20 bottom-1/10 text-right"
            style={{
              scale: rightTextScale,
              x: rightTextX,
              y: rightTextY,
              willChange: "transform",
            }}
          >
            <span className="text-[3em] md:text-[5em] leading-[0.92] tracking-[-0.06em] font-medium text-primary">
              {t("name")}
            </span>

            <div className="mt-10 ml-auto hidden md:block w-[30vw]">
              <hr className="h-px w-full bg-foreground" />

              {/* scroll guide */}
              <div className="mt-5 flex items-center justify-between text-[11px] tracking-[0.24em] uppercase text-secondary">
                <motion.span
                  className="flex items-center gap-3"
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.span
                    className="h-1.5 w-1.5 rotate-45 border-r border-b border-foreground"
                    animate={{
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-primary font-medium">
                    {t("scrollDown")}
                  </span>
                </motion.span>

                <span>{t("exploreWork")}</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
