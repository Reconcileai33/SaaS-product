import { Variants } from "framer-motion";

export const pageContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

export const pageItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const backgroundVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 0.05,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

export const listItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10,
    transition: { duration: 0.2 } 
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }),
  removed: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export const tabVariants: Variants = {
  inactive: { opacity: 0.6, y: 0 },
  active: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 } 
  }
};

export const tabContentVariants: Variants = {
  inactive: { opacity: 0, x: 20 },
  active: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 } 
  }
};