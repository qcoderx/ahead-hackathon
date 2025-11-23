import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onLogout,
}) => {
  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Information", value: "Dr. Sarah Smith" },
        { icon: Shield, label: "Security & Privacy", value: "2FA Enabled" },
        { icon: Globe, label: "Language", value: "English" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", value: "On" },
        { icon: Moon, label: "Dark Mode", value: "Off" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
              {section.title}
            </h2>
            <Card className="overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <motion.div
                  key={itemIdx}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    itemIdx !== section.items.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                  whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-900">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-sm">{item.value}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </Card>
          </div>
        ))}

        <Button
          variant="ghost"
          className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 mt-8"
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              onLogout();
            }
          }}
          type="button"
          aria-label="Log out"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Version 1.0.0 • Build 2024.11.23
        </p>
      </div>
    </div>
  );
};

export default SettingsScreen;
