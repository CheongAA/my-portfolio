import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  easeInOut,
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Container from "../Container";
import Trans from "../Trans";

export default function HeroSection() {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageMobileLoaded, setIsImageMobileLoaded] = useState(false);
  const isLoading = !isVideoLoaded || !isImageLoaded || !isImageMobileLoaded;

  // Calculate loading progress (0 to 100)
  const loadingProgress =
    (((isVideoLoaded ? 1 : 0) +
      (isImageLoaded ? 1 : 0) +
      (isImageMobileLoaded ? 1 : 0)) /
      3) *
    100;

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
      {/* Loading Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Circular Progress */}
              <div className="relative w-24 h-24">
                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-medium text-primary">
                    {Math.round(loadingProgress)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-secondary">Loading resources...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* laptop stage */}
      <div className="fixed top-0 h-screen w-screen overflow-hidden z-0">
        {/* laptop screen video  */}
        <motion.video
          className="absolute inset-0 pointer-events-none w-full h-full object-cover"
          src={`${import.meta.env.BASE_URL}videos/coding.mp4`}
          style={{
            opacity: gifOpacity,
            y: gifY,
            filter:
              "contrast(1.18) saturate(1.08) brightness(0.92) hue-rotate(-10deg)",
            willChange: "transform, opacity, filter",
          }}
          onCanPlay={() => {
            console.log("Video loaded");
            setIsVideoLoaded(true);
          }}
          onError={() => {
            console.log("Video error");
            setIsVideoLoaded(true);
          }}
          autoPlay
          loop
          muted
          playsInline
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
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-[url('/images/laptop_m.webp')] md:bg-[url('/images/laptop.webp')]"
          style={{
            scale: laptopScale,
            opacity: bgOpacity,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {/* Preload images */}
          <img
            src={`${import.meta.env.BASE_URL}images/laptop.webp`}
            alt=""
            className="hidden"
            onLoad={() => {
              console.log("Desktop image loaded");
              setIsImageLoaded(true);
            }}
            onError={() => {
              console.log("Desktop image error");
              setIsImageLoaded(true);
            }}
          />
          <img
            src={`${import.meta.env.BASE_URL}images/laptop_m.webp`}
            alt=""
            className="hidden"
            onLoad={() => {
              console.log("Mobile image loaded");
              setIsImageMobileLoaded(true);
            }}
            onError={() => {
              console.log("Mobile image error");
              setIsImageMobileLoaded(true);
            }}
          />
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
            {t("hero.titleTop")}
            <br />
            {t("hero.titleBottom")}
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
              <Trans i18nKey="hero.leftBottomTitle" />
            </span>
            <hr className="my-5 h-px w-1/6 bg-border" />
            <span className="text-[0.83em] tracking-[-0.03em] text-secondary">
              <Trans i18nKey="hero.leftBottomDescription" />
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
              <Trans i18nKey="hero.name" />
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
                    {t("hero.scrollDown")}
                  </span>
                </motion.span>

                <span>{t("hero.exploreWork")}</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
