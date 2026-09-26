import React, { useEffect } from 'react';
import Lenis from "lenis";

function LenisScroll() {
  useEffect(() => {
    // Initialize Lenis with optimized physics values
    const lenis = new Lenis({
      duration: 1.0,        // Slightly speed up duration (from 1.2 to 1.0) to make it snappier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium cubic easing curve
      smoothWheel: true,
      wheelMultiplier: 1.1, // Gives a slight, responsive punch to mouse wheel movements
    });

    let rafId;

    // The core animation loop frame handler
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf); // Store EVERY subsequent frame token correctly
    }

    // Initialize the continuous loop
    rafId = requestAnimationFrame(raf);

    // Strict cleanup loop
    return () => {
      cancelAnimationFrame(rafId); // Safely completely stops the active continuous loop thread
      lenis.destroy();            // Completely strips global wheel event listeners
    };
  }, []);

  return null;
}

export default LenisScroll;
