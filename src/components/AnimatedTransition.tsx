
import React, { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTransitionProps {
  children: ReactNode;
  direction?: "forward" | "backward";
  duration?: number;
  className?: string;
}

const variants = {
  enter: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? -50 : 50,
    opacity: 0,
  }),
};

const AnimatedTransition = ({
  children,
  direction = "forward",
  duration = 0.3,
  className,
}: AnimatedTransitionProps) => {
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    setKey(Date.now());
  }, [children]);

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={key}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className={cn("w-full", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
