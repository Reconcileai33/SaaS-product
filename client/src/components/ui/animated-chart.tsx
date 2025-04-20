import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ChartBar {
  value: number;
  label: string;
  color?: string;
}

interface AnimatedChartProps {
  data: ChartBar[];
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  className?: string;
}

const AnimatedChart = ({
  data,
  height = 200,
  showLabels = true,
  showValues = true,
  className = "",
}: AnimatedChartProps) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!chartRef.current) return;
      
      const rect = chartRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const bars = chartRef.current.querySelectorAll<HTMLDivElement>('.chart-bar');
      
      bars.forEach((bar) => {
        const barRect = bar.getBoundingClientRect();
        const barX = barRect.left + barRect.width / 2 - rect.left;
        const barY = barRect.top + barRect.height / 2 - rect.top;
        
        const distanceX = Math.abs(x - barX) / rect.width;
        const distanceY = Math.abs(y - barY) / rect.height;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        const intensity = 1 - Math.min(distance * 3, 1);
        const glow = `0 0 ${intensity * 15}px ${intensity * 5}px rgba(59, 130, 246, ${intensity * 0.5})`;
        
        bar.style.boxShadow = glow;
        bar.style.transform = `scaleY(${1 + intensity * 0.05})`;
        bar.style.opacity = `${0.7 + intensity * 0.3}`;
      });
    };
    
    const handleMouseLeave = () => {
      if (!chartRef.current) return;
      
      const bars = chartRef.current.querySelectorAll<HTMLDivElement>('.chart-bar');
      
      bars.forEach((bar) => {
        bar.style.boxShadow = '';
        bar.style.transform = 'scaleY(1)';
        bar.style.opacity = '0.7';
      });
    };
    
    const chart = chartRef.current;
    
    if (chart) {
      chart.addEventListener('mousemove', handleMouseMove);
      chart.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (chart) {
        chart.removeEventListener('mousemove', handleMouseMove);
        chart.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <div 
      ref={chartRef}
      className={`relative w-full ${className}`} 
      style={{ height: `${height}px` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg"></div>
      <div className="relative flex items-end justify-between h-full w-full px-1">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`chart-bar relative w-12 bg-primary rounded-t-sm mx-1 ${item.color || ''}`}
                style={{ height: '0%', opacity: 0.7 }}
                initial={{ height: '0%' }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ opacity: 1 }}
              >
                {showValues && (
                  <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                    {item.value}
                  </div>
                )}
              </motion.div>
              {showLabels && (
                <div className="text-xs text-muted-foreground mt-2">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedChart;
