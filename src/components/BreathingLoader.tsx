import { motion } from "framer-motion";

interface BreathingLoaderProps {
  text?: string;
}

export function BreathingLoader({ text = "Taking a moment..." }: BreathingLoaderProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-12 h-12 rounded-full bg-primary/20"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}