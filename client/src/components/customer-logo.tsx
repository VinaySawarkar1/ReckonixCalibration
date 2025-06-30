import { motion } from "framer-motion";

interface CustomerLogoProps {
  name: string;
}

export default function CustomerLogo({ name }: CustomerLogoProps) {
  return (
    <motion.div 
      className="flex-shrink-0 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-32 h-16 bg-gray-100 rounded flex items-center justify-center border border-gray-200">
        <span className="text-gray-600 font-semibold text-sm text-center px-2">
          {name}
        </span>
      </div>
    </motion.div>
  );
}
