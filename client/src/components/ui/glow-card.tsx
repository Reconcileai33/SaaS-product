import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderColor?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlowCard = ({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.5)",
  borderColor = "border-primary/10",
  hoverEffect = true,
  onClick
}: GlowCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden",
        hoverEffect && "group cursor-pointer",
        className
      )}
      initial={{ boxShadow: "0 0 0 rgba(59, 130, 246, 0)" }}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              boxShadow: `0 8px 20px -5px ${glowColor}`,
              transition: { duration: 0.3 }
            }
          : {}
      }
      onClick={onClick}
    >
      {/* Glow effect border */}
      <motion.div
        className="absolute inset-0 rounded-xl z-0"
        initial={{ opacity: 0.2 }}
        animate={{
          boxShadow: [
            `0 0 5px ${glowColor}`,
            `0 0 15px ${glowColor}`,
            `0 0 5px ${glowColor}`
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Content container */}
      <div className={cn(
        "relative z-10 bg-card border rounded-xl overflow-hidden",
        borderColor
      )}>
        {children}
      </div>
      
      {/* Hover animation underline effect */}
      {hoverEffect && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 z-20"
          initial={{ scaleX: 0.5, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default GlowCard;
