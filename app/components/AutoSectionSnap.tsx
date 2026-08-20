"use client";

import { useEffect, useRef } from "react";

export default function AutoSectionSnap() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<number | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    const sectionIds = [
      "inicio",
      "renders",
      "tours",
      "planos",
      "info",
    ];

    const cancelAnimation = () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      isSnappingRef.current = false;
    };

    const smoothScrollTo = (targetY: number) => {
      cancelAnimation();

      const startY = window.scrollY;
      const distance = targetY - startY;
      const absoluteDistance = Math.abs(distance);

      const duration = Math.min(
        1000,
        Math.max(700, absoluteDistance * 1.2)
      );

      let startTime: number | null = null;

      isSnappingRef.current = true;

      const animate = (time: number) => {
        if (startTime === null) {
          startTime = time;
        }

        const progress = Math.min(
          (time - startTime) / duration,
          1
        );

        const eased =
          -(Math.cos(Math.PI * progress) - 1) / 2;

        window.scrollTo({
          top: startY + distance * eased,
          left: 0,
          behavior: "auto",
        });

        if (progress < 1) {
          animationRef.current =
            requestAnimationFrame(animate);
        } else {
          animationRef.current = null;
          isSnappingRef.current = false;
        }
      };

      animationRef.current =
        requestAnimationFrame(animate);
    };

    const snapToNearestSection = () => {
      if (document.body.style.overflow === "hidden") {
        return;
      }

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(
          (section): section is HTMLElement =>
            section !== null
        );

      if (sections.length === 0) return;

      const viewportHeight = window.innerHeight;

      let nearestSection: HTMLElement | null = null;
      let nearestDistance = Infinity;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestSection = section;
        }
      }

      if (nearestSection === null) return;

      if (nearestDistance > viewportHeight * 0.55) {
        return;
      }

      const rect =
        nearestSection.getBoundingClientRect();

      const targetY =
        window.scrollY + rect.top;

      if (
        Math.abs(targetY - window.scrollY) < 3
      ) {
        return;
      }

      smoothScrollTo(targetY);
    };

    const handleScroll = () => {
      if (isSnappingRef.current) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Espera solo 400 ms después de dejar de scrollear
      timeoutRef.current = setTimeout(() => {
        snapToNearestSection();
      }, 400);
    };

    const handleUserInteraction = () => {
      if (isSnappingRef.current) {
        cancelAnimation();
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "wheel",
      handleUserInteraction,
      { passive: true }
    );

    window.addEventListener(
      "touchstart",
      handleUserInteraction,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "wheel",
        handleUserInteraction
      );

      window.removeEventListener(
        "touchstart",
        handleUserInteraction
      );

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      cancelAnimation();
    };
  }, []);

  return null;
}