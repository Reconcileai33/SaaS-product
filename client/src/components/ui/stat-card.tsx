import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import AnimatedNumber from "./animated-number";

interface StatCardProps {
  title: string;
  value: number;
  formattedValue?: string;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  progress?: number;
  progressColor?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  iconColor?: string;
  iconBackground?: string;
}

const StatCard = ({
  title,
  value,
  formattedValue,
  icon,
  change,
  changeLabel,
  progress,
  progressColor = "bg-primary",
  className,
  prefix = "",
  suffix = "",
  iconColor = "text-primary",
  iconBackground = "bg-primary/10"
}: StatCardProps) => {
  const isPositiveChange = change && change > 0;
  
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 20px -5px rgba(59, 130, 246, 0.25)" }}
      transition={{ duration: 0.3 }}
      className={cn(className)}
    >
      <Card className="relative overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm">{title}</p>
              <h2 className="text-2xl font-bold mt-1">
                {prefix}
                <AnimatedNumber
                  value={value}
                  formattedValue={formattedValue}
                />
                {suffix}
              </h2>
              {(change || changeLabel) && (
                <div className={cn(
                  "flex items-center mt-1 text-sm",
                  isPositiveChange ? "text-green-500" : "text-red-500"
                )}>
                  {change && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn("h-4 w-4 mr-1", isPositiveChange ? "rotate-0" : "rotate-180")}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  )}
                  <span>{changeLabel || `${isPositiveChange ? '+' : ''}${change}%`}</span>
                </div>
              )}
            </div>
            <div className={cn("p-3 rounded-lg", iconBackground)}>
              <div className={cn("h-6 w-6", iconColor)}>
                {icon}
              </div>
            </div>
          </div>
          {progress !== undefined && (
            <div className="h-1 w-full bg-accent rounded-full overflow-hidden">
              <motion.div
                className={cn("h-1 rounded-full", progressColor)}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          )}
          
          {/* Glow effect at the bottom */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
