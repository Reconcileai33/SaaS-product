import { Variants } from "framer-motion";

// Shared animation variants for consistent animations across components
export const pageAnimations = {
  // For entire page containers
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  },

  // For individual items in a staggered container
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  },

  // For cards that appear with a scale effect
  card: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 12px 24px -6px rgba(0, 0, 0, 0.12)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  },

  // For elements that fade in from the left
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  },

  // For elements that fade in from the right
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  },

  // For elements that fade in from the bottom
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  },

  // For buttons and interactive elements
  button: {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  },

  // For glowing elements
  glow: {
    initial: { 
      boxShadow: "0 0 0 rgba(59, 130, 246, 0)" 
    },
    animate: { 
      boxShadow: [
        "0 0 5px rgba(59, 130, 246, 0.5)",
        "0 0 15px rgba(59, 130, 246, 0.8)",
        "0 0 5px rgba(59, 130, 246, 0.5)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" 
      }
    }
  }
};

// Common page variants used across all main pages
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

// Background animation variants
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

// Specialized variants for specific components
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

// Animated gradient background
export const gradientBgVariants: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Pulse animation
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Shimmer effect for loading states
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ["-200px 0", "200px 0"],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear"
    }
  }
};