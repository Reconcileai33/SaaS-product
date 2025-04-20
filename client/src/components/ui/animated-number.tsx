import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formattedValue?: string;
}

const AnimatedNumber = ({ value, duration = 1.5, formattedValue }: AnimatedNumberProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const prevValue = useRef(0);
  
  useEffect(() => {
    prevValue.current = hasAnimated ? value : 0;
    setHasAnimated(true);
  }, [value, hasAnimated]);
  
  const spring = useSpring(prevValue.current, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });
  
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  
  const display = useTransform(spring, (current) => {
    // If a formatted value is provided, just display that at the end
    if (formattedValue && Math.abs(current - value) < 0.01) {
      return formattedValue;
    }
    
    // Format the number based on its type
    if (Number.isInteger(value)) {
      return Math.round(current).toLocaleString();
    }
    
    // For percentages or currencies with decimals
    return current.toFixed(1).replace(/\.0$/, '').toLocaleString();
  });
  
  return <motion.span>{display}</motion.span>;
};

export default AnimatedNumber;
