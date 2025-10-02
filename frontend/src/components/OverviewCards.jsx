import { motion } from "framer-motion";
import {
  Users,
  Car, // Icône de voiture
  Wrench,
  Hammer, // Icône de clé à molette (réparation)
} from "lucide-react";

const overviewData = [
  { name: "Client", value: "32", change: 12.5, icon: Users },
  { name: "Mecanicien", value: "10", change: 8.3, icon: Wrench },
  { name: "vehicules", value: "38", change: -3.2, icon: Car }, // Icône de voiture
  { name: "Reparation", value: "1,234,567", change: 15.7, icon: Hammer }, // Icône de clé à molette
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {overviewData.map((item, index) => (
        <motion.div
          key={item.name}
          className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg
            rounded-xl p-6 border border-gray-700
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">{item.name}</h3>
              <p className="mt-1 text-xl font-semibold text-gray-500">
                {item.value}
              </p>
            </div>

            <div
              className={`
              p-3 rounded-full bg-opacity-20 ${
                item.change >= 0 ? "bg-blue-500" : "bg-blue-500"
              }
              `}
            >
              <item.icon
                className={`size-6  ${
                  item.change >= 0 ? "text-blue-500" : "text-blue-400"
                }`}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;
