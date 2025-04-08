"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  currentImageUrl?: string;
  onlyScrollOnFirstLoad?: boolean;
}

export function ImageCarousel({
  images,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  currentImageUrl,
  onlyScrollOnFirstLoad = false,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibility, setVisibility] = useState<boolean[]>(Array(images.length).fill(false));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Initialize slide refs
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, images.length);
  }, [images.length]);

  // // Set initial visibility
  // useEffect(() => {
  //   const newVisibility = [...visibility];
  //   newVisibility[0] = true;
  //
  //   // Preload adjacent images
  //   if (images.length > 1) newVisibility[1] = true;
  //
  //   setVisibility(newVisibility);
  // }, []);

  const updateVisibility = (imageIndex: number) => {
    const newVisibility = [...visibility];
    newVisibility[imageIndex] = true;
    // Preload adjacent images
    if (imageIndex > 0) newVisibility[imageIndex - 1] = true;
    if (imageIndex < images.length - 1) newVisibility[imageIndex + 1] = true;
    setVisibility(newVisibility);
  };

  console.log(`visibility`, visibility);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; // Skip on initial mount as we'll handle it separately

      if (currentImageUrl && images.includes(currentImageUrl)) {
        const initialIndex = images.indexOf(currentImageUrl);
        setCurrentIndex(initialIndex); // Set initial index based on currentImageUrl if provided
        updateVisibility(initialIndex);
      }
      return;
    }

    if (currentImageUrl && images.includes(currentImageUrl)) {
      if (!isInitialMount.current && onlyScrollOnFirstLoad) return;

      const imageIndex = images.indexOf(currentImageUrl);

      setCurrentIndex(imageIndex); // Update the current index immediately for indicators

      if (!visibility[imageIndex]) {
        updateVisibility(imageIndex); // Ensure the image is marked as visible
      }

      setTimeout(() => {
        if (scrollContainerRef.current && slideRefs.current[imageIndex]) {
          scrollContainerRef.current.scrollTo({
            left: imageIndex * scrollContainerRef.current.clientWidth,
            behavior: "smooth",
          }); // Direct DOM manipulation for more reliable scrolling
        }
      }, 50); // Use a small timeout to ensure DOM is ready
    }
  }, [currentImageUrl, images, visibility]); // Handle currentImageUrl changes - more reliable approach

  useEffect(() => {
    if (typeof window === "undefined") return;

    const options = {
      root: scrollContainerRef.current,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));
        if (entry.isIntersecting && !visibility[index]) {
          updateVisibility(index);
        }
      });
    }, options);

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => {
      slideRefs.current.forEach((slide) => {
        if (slide) observer.unobserve(slide);
      });
    };
  }, [visibility]); // Setup intersection observer for lazy loading

  // Handle scroll events to update current index
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const slideWidth = scrollContainerRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        setCurrentIndex(newIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex, images.length]);

  // Initial scroll setup - runs once after component mounts
  useEffect(() => {
    // If currentImageUrl is provided, scroll to that image
    if (currentImageUrl && images.includes(currentImageUrl)) {
      const imageIndex = images.indexOf(currentImageUrl);

      // Wait for DOM to be ready
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            left: imageIndex * scrollContainerRef.current.clientWidth,
            behavior: "auto", // Use 'auto' for initial scroll to avoid animation issues
          });
        }
      }, 100);
    }
  }, []); // Empty dependency array means this runs once after mount

  // Auto play functionality
  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, currentIndex, images.length]);

  function startAutoPlay() {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollToIndex(nextIndex);
    }, autoPlayInterval);
  }

  function scrollToIndex(index: number) {
    if (index < 0 || index >= images.length) return;

    setCurrentIndex(index); // Update the current index immediately for indicators

    if (!visibility[index]) updateVisibility(index); // Ensure the image is visible

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      }); // Use direct scrollTo for more reliable scrolling
    }

    if (autoPlay) startAutoPlay();
  }

  function goToNext() {
    const nextIndex = (currentIndex + 1) % images.length;
    scrollToIndex(nextIndex);
  }

  function goToPrevious() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToIndex(prevIndex);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length]); // Keyboard navigation

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      <div ref={scrollContainerRef} className="flex h-full w-full snap-x snap-mandatory overflow-hidden scroll-smooth">
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            data-index={index}
            className="h-full w-full flex-shrink-0 snap-start"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${images.length}`}
          >
            {visibility[index] && (
              <div className="relative aspect-video h-full w-full">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Carousel image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                  sizes="90vw"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {showArrows && images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="bg-background/80 hover:bg-background/90 absolute top-1/2 left-2 z-10 -translate-y-1/2 backdrop-blur-sm"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="bg-background/80 hover:bg-background/90 absolute top-1/2 right-2 z-10 -translate-y-1/2 backdrop-blur-sm"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentIndex === index ? "w-4 bg-white" : "bg-white/50 hover:bg-white/80",
              )}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
