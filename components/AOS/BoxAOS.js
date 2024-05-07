"use client";

import Aos, { AosOptions } from "aos";
import { useEffect, useRef, useState } from "react";

import "aos/dist/aos.css";
import { Box } from "@mui/material";

export default function BoxAos({ children, active = false, styleAOS }) {
  const scrollRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  });

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  useEffect(() => {
    const box = document.querySelector(".HomeBanner");

    const result = isInViewport(box);
  });

  return (
    <Box className="HomeBanner">
      <Box data-aos={styleAOS} data-aos-once="true">
        {children}
      </Box>
    </Box>
  );
}
