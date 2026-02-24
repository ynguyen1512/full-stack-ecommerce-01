import { useState, useEffect, useCallback, useRef } from "react";
import type { TouchEvent } from "react";
import { Link } from "react-router-dom";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

const SLIDES = [
  {
    id: 1,
    image: banner1,
    alt: "Nệm Rạng Đông - Khuyến mãi 60% hôm nay",
    ctaLabel: "Mua ngay",
    ctaTo: "/collection",
  },
  {
    id: 2,
    image: banner2,
    alt: "Nệm Rạng Đông - Chăm sóc sức khỏe từ giấc ngủ, giao hàng miễn phí",
    ctaLabel: "Xem sản phẩm",
    ctaTo: "/collection",
  },
  {
    id: 3,
    image: banner3,
    alt: "Nệm Rạng Đông - Mua online giảm giá 60%",
    ctaLabel: "Mua ngay",
    ctaTo: "/collection",
  },
];

const AUTOPLAY_INTERVAL = 6000;
const SWIPE_THRESHOLD = 50;

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalSlides = SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      let next = index;
      if (index < 0) next = totalSlides - 1;
      else if (index >= totalSlides) next = 0;
      setActiveIndex(next);
    },
    [totalSlides],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const id = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [prefersReducedMotion, isPaused, activeIndex, goNext]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    el.setAttribute("tabIndex", "0");
    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) =>
    setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      ref={sliderRef}
      className="relative w-full overflow-hidden rounded-lg max-w-7xl mx-auto py-10"
      aria-roledescription="carousel"
      aria-label="Banner khuyến mãi"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${slide.id} of ${totalSlides}`}
          >
            <div className="relative rounded-lg overflow-hidden aspect-[21/9] min-h-[200px] sm:min-h-[280px] md:min-h-[320px]">
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading={slide.id === 1 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={slide.id === 1 ? "high" : "low"}
              />
              <div className="absolute inset-0 bg-black/10" aria-hidden />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
                <Link
                  to={slide.ctaTo}
                  className="inline-flex items-center justify-center rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {slide.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-800 shadow-md transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 sm:left-4"
        aria-label="Xem slide trước"
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-800 shadow-md transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 sm:right-4"
        aria-label="Xem slide tiếp theo"
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-6"
        role="tablist"
        aria-label="Chọn slide"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 ${
              i === activeIndex
                ? "w-6 bg-white"
                : "w-2 bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {activeIndex + 1} of {totalSlides}
      </p>
    </section>
  );
};

export default Hero;
