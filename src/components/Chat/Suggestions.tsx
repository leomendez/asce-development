'use client';
import React from "react";
import { motion } from "framer-motion";

type Props = {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
};

export const Suggestions = ({ suggestions, onSelect }: Props) => (
  <div className="flex flex-wrap gap-2">
    {suggestions.map((suggestion, index) => (
      <motion.button
        key={suggestion}
        type="button"
        onClick={() => onSelect(suggestion)}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 + index * 0.08, duration: 0.35 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-400
          hover:border-teal-600 hover:text-teal-500 transition-colors"
      >
        {suggestion}
      </motion.button>
    ))}
  </div>
);
