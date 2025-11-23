/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#10b77f",
        "background-light": "#ffffff",
        "background-dark": "#10221c",
        safe: "#10b77f",
        caution: "#f59e0b",
        "caution-light": "#fffbeb",
        "caution-dark": "#78350f",
        danger: "#ef4444",
        "danger-light": "#fef2f2",
        "risk-high": "#f59e0b",
        "risk-high-bg": "#fffbeb",
        "risk-high-dark-bg": "#78350f",
        info: "#3b82f6",
        "info-light": "#eff6ff",
        disabled: "#6c757d",
        "mama-blue": "#10b981",
        "mama-offwhite": "#F8F9FA",
        "mama-text-dark": "#343A40",
        "mama-border": "#DEE2E6",
        "mama-critical": "#D9534F",
        "mama-moderate": "#F0AD4E",
        "mama-minor": "#5BC0DE",
        "mama-safe": "#5CB85C",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      boxShadow: {
        card: '0 4px 12px 0 rgba(0, 0, 0, 0.07)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}