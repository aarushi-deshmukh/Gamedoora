import React from "react";
import { usePathname } from "next/navigation";
import { Menu, X, User, Edit, RefreshCcw, Trash2 } from "lucide-react";
import Link from "next/link";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname(); // Get current route

  return (
    <aside
      className={`fixed top-0 left-0 h-screen p-4 transition-all duration-300 shadow-lg z-50 
        ${isOpen ? "w-48" : "w-16"} 
        bg-gradient-to-b from-[#fbbf24]/80 to-[#ff9f1c]/80 backdrop-blur-lg border border-white/10 rounded-r-3xl`}
    >
      {/* Toggle Button */}
      <button
        className="flex items-center space-x-2 text-[#7f38e9] p-2 hover:bg-white/10 rounded transition-all"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} color="#7f38e9" /> : <Menu size={24} color="#7f38e9" />}
        {isOpen && <span className="font-semibold">Close</span>}
      </button>

      {/* Navigation Links */}
      <ul className="mt-6 space-y-4">
        {[
          { icon: <User size={20} />, text: "Profile", href: "/profile" },
          { icon: <Edit size={20} />, text: "Edit", href: "/edit" },
          { icon: <RefreshCcw size={20} />, text: "Update", href: "/update" },
          { icon: <Trash2 size={20} />, text: "Delete", href: "/delete" },
        ].map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 text-[#7f38e9] w-full p-2 rounded-lg transition-all 
                hover:bg-white/10 relative
                ${isActive ? "bg-white/20 shadow-[0px_0px_10px_#7f38e9] scale-105" : ""}`}
              >
                {item.icon}
                {isOpen && <span className="font-medium">{item.text}</span>}
                {isActive && (
                  <span className="absolute left-0 w-1 h-full bg-[#7f38e9] rounded-r-lg"></span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
