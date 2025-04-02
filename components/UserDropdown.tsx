"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth.action";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

const UserDropdown = ({ username }: { username: string }) => {
  const router = useRouter();
  const { language, setLanguage, voiceGender, setVoiceGender } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleLanguageChange = (lang: "vi" | "en") => {
    setLanguage(lang);
  };

  const handleVoiceChange = (gender: "male" | "female") => {
    setVoiceGender(gender);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-white hover:bg-gray-700 p-2 rounded-md transition-all duration-200">
        <span>{username}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700">
          <div className="p-3">
            {/* Language Change */}
            <div className="border-b pb-2 mb-2">
              <p className="text-sm font-semibold text-white">AI Language</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`text-sm py-2 px-4 rounded-md transition-all ${language === "en" ? "bg-gray-600" : "hover:bg-gray-600"}`}>
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("vi")}
                  className={`text-sm py-2 px-4 rounded-md transition-all ${language === "vi" ? "bg-gray-600" : "hover:bg-gray-600"}`}>
                  Vietnamese
                </button>
              </div>
            </div>

            {/* Voice Gender Change */}
            <div className="border-b pb-2 mb-2">
              <p className="text-sm font-semibold text-white">AI Voice Gender</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleVoiceChange("male")}
                  className={`text-sm py-2 px-4 rounded-md transition-all ${voiceGender === "male" ? "bg-gray-600" : "hover:bg-gray-600"}`}>
                  Male
                </button>
                <button
                  onClick={() => handleVoiceChange("female")}
                  className={`text-sm py-2 px-4 rounded-md transition-all ${voiceGender === "female" ? "bg-gray-600" : "hover:bg-gray-600"}`}>
                  Female
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm py-2 px-4 w-full text-red-600 hover:bg-red-100 rounded-md transition-all">
                <LogOut className="text-xl" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserDropdown;
