import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    if (phone && pin) {
      navigate("/patient/dashboard");
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center items-center py-5 px-4 sm:px-6 lg:px-8">
          <div className="layout-content-container flex flex-col w-full max-w-md flex-1">
            <div className="flex justify-center mb-6">
              <img
                alt="MamaSafe Logo with a heart"
                className="h-12 w-auto"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtWZ4axxUA93T_zguUHYH95dlx38ibtU6NJ0uu_B607e2C_Mr9NwGMioRgBAdX2m8OXvyxynj_rYW8vsKBjezYCxdwqz1l7hjJi3X0RYfe9I_IolfIL65R08yKr3OVs6ef-IsTVJ8jqpyhVuwn43x-y8jzlqikUxk94N7U42-xm5_e0zxqKB6Lyur4U3EDeIBC82RK9AOePNIhaaU7BdnB7jIuti7LZMEZf7oW3K076g3nKgDaZblpCQtA_k1uo0hBiRge45amxoQ"
              />
            </div>
            <h1 className="text-neutral-text dark:text-white tracking-tight text-3xl font-bold leading-tight px-4 text-center pb-2 pt-6">
              Welcome to MamaSafe
            </h1>
            <p className="text-neutral-text/80 dark:text-white/80 text-lg font-normal leading-normal pb-8 pt-1 px-4 text-center">
              Your Safe Pregnancy Journey
            </p>
            <form
              onSubmit={handleLogin}
              className="flex w-full flex-col items-center gap-4 px-4 py-3"
            >
              <div className="w-full">
                <label className="flex flex-col w-full">
                  <p className="text-neutral-text dark:text-white text-base font-medium leading-normal pb-2">
                    Phone Number / Patient ID
                  </p>
                  <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <span className="material-symbols-outlined text-neutral-text/60 dark:text-white/60">
                        phone
                      </span>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-text dark:text-white focus:outline-0 focus:ring-0 border bg-white dark:bg-background-dark/50 dark:border-white/20 h-14 placeholder:text-neutral-text/50 dark:placeholder:text-white/50 p-[15px] pl-12 text-base font-normal leading-normal"
                      placeholder="Enter your phone number or ID"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              <div className="w-full">
                <label className="flex flex-col w-full">
                  <p className="text-neutral-text dark:text-white text-base font-medium leading-normal pb-2">
                    PIN / Password
                  </p>
                  <div className="relative flex w-full flex-1 items-stretch rounded-lg">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <span className="material-symbols-outlined text-neutral-text/60 dark:text-white/60">
                        lock
                      </span>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-text dark:text-white focus:outline-0 focus:ring-0 border bg-white dark:bg-background-dark/50 dark:border-white/20 h-14 placeholder:text-neutral-text/50 dark:placeholder:text-white/50 p-[15px] pl-12 text-base font-normal leading-normal"
                      placeholder="Enter your 4-6 digit PIN"
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-text/60 dark:text-white/60 hover:text-primary bg-transparent border-none cursor-pointer"
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined"
                        data-icon="Eye"
                        data-size="24px"
                        data-weight="regular"
                      >
                        visibility
                      </span>
                    </button>
                  </div>
                </label>
              </div>
              <div className="px-4 py-4 w-full">
                <button className="flex w-full items-center justify-center rounded-lg bg-primary h-14 text-white text-lg font-bold leading-normal transition-colors hover:bg-primary/90 cursor-pointer">
                  Log In
                </button>
              </div>
            </form>
            <div className="flex justify-between items-center px-4 pt-4 text-sm">
              <button className="font-medium text-primary hover:underline bg-transparent border-none cursor-pointer">
                Forgot PIN?
              </button>
              <button className="font-medium text-primary hover:underline bg-transparent border-none cursor-pointer">
                Need Help?
              </button>
            </div>
            <div className="mt-12 border-t border-neutral-text/10 dark:border-white/10 w-full"></div>
            <div className="flex justify-center items-center gap-2 mt-6">
              <span className="material-symbols-outlined text-neutral-text/80 dark:text-white/80">
                language
              </span>
              <select className="form-select bg-transparent border-0 text-neutral-text/80 dark:text-white/80 focus:ring-0 focus:border-0 p-1 text-sm font-medium">
                <option>English</option>
                <option>Swahili</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
