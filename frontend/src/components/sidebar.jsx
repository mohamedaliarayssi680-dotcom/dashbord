import {
  Home, // Icône pour "Home"
  User, // Icône pour "Client"
  Wrench, // Icône pour "Mécanicien"
  Car,
  BarChart, // Icône pour "Véhicule"
  Hammer, // Icône pour "Réparation" (clé-molette)
  Menu,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Home",
    icon: Home, // Icône remplacée
    color: "#6366f1",
    href: "/",
  },
  {
    name: "Client",
    icon: User, // Icône remplacée
    color: "#EC4899",
    href: "/client",
  },
  {
    name: "Mecanicien",
    icon: Wrench, // Icône remplacée
    color: "#10B981",
    href: "/mecanicien",
  },
  {
    name: "Vehicule",
    icon: Car, // Icône remplacée
    color: "#F59E0B",
    href: "/vehicule",
  },
  {
    name: "Reparation",
    icon: Hammer, // Icône remplacée (clé-molette)
    color: "#3B82F6",
    href: "/reparation",
  },
  {
    name: "Reporting",
    icon: BarChart, // Icône remplacée (clé-molette)
    color: "#3B82F6",
    href: "/reporting",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-200 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.2 }} // Durée réduite
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.1, delay: 0.1 }} // Durée réduite
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
