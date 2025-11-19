import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProviderLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    if (email && password) {
      navigate("/provider/dashboard");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark group/design-root overflow-hidden font-display">
      <div
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
        data-alt="A soft-focus, professional image of a healthcare provider using a tablet, conveying technology in a medical setting."
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSyMWqbW4BoORUzGe4u2G9IdzL8WZgjaExFkLhCQjM1htvm7F68c17mpCDTox0QZa3CBdl0UBUwBwfLbOJkaqY9JmmLt9_PjgudS3-SpkZ9ZhB-A4VnwHJsv-yqR4eplnqzNyNJZBAqnpL6gz-GRFVMUImJRQ64WHdD07lsUpfGpcop34te_99yZEnxb7b1C5_wczQKIBNxrVugzzF9OXst8zD4KKoBE7kloXGL1rx5CeDo37Zigl9mVM3_sknJ2jr5Jp97eMuHpo')",
        }}
      >
        <div className="absolute inset-0 h-full w-full bg-background-light/80 dark:bg-background-dark/90 backdrop-blur-sm"></div>
      </div>
      <main className="relative z-10 flex w-full max-w-md flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full rounded-xl border border-border-light bg-card-light dark:border-border-dark dark:bg-card-dark p-8 shadow-2xl shadow-slate-900/10 dark:shadow-black/40">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center space-y-2 text-center">
              <span className="material-symbols-outlined text-secondary dark:text-primary text-5xl">
                health_and_safety
              </span>
              <p className="text-3xl font-black tracking-[-0.033em] text-text-main dark:text-white">
                Welcome to MamaSafe
              </p>
              <p className="text-base font-normal text-text-subtle dark:text-slate-300">
                Log in to access your dashboard
              </p>
            </div>
            <form
              onSubmit={handleLogin}
              className="flex w-full flex-col space-y-5"
            >
              <label className="flex flex-col flex-1">
                <p className="pb-2 text-sm font-medium text-text-main dark:text-slate-200">
                  Username or Email
                </p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-border-light bg-card-light p-[15px] text-base font-normal leading-normal text-text-main placeholder:text-text-subtle/70 focus:border-secondary focus:outline-0 focus:ring-2 focus:ring-secondary/40 dark:border-border-dark dark:bg-card-dark dark:text-white dark:focus:border-primary dark:focus:ring-primary/40 h-14"
                  placeholder="Enter your email or username"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="flex flex-col flex-1">
                <p className="pb-2 text-sm font-medium text-text-main dark:text-slate-200">
                  Password
                </p>
                <div className="flex w-full flex-1 items-stretch rounded-lg">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg border border-r-0 border-border-light bg-card-light p-[15px] pr-2 text-base font-normal leading-normal text-text-main placeholder:text-text-subtle/70 focus:border-secondary focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-secondary/40 dark:border-border-dark dark:bg-card-dark dark:text-white dark:focus:border-primary dark:focus:ring-primary/40 h-14"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    aria-label="Toggle password visibility"
                    className="flex items-center justify-center rounded-r-lg border border-l-0 border-border-light bg-card-light px-[15px] text-text-subtle hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary/40 dark:border-border-dark dark:bg-card-dark dark:text-slate-400 dark:hover:bg-slate-800 dark:focus:ring-primary/40"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button>
                </div>
              </label>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-sm bg-transparent border-none cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                className="flex h-14 w-full items-center justify-center rounded-lg bg-secondary px-6 text-base font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-200 ease-in-out hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 dark:bg-primary dark:text-background-dark dark:shadow-primary/20 dark:hover:bg-primary/90 dark:focus:ring-primary/50 dark:focus:ring-offset-card-dark cursor-pointer"
                type="submit"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-text-subtle dark:text-slate-400">
          © 2024 MamaSafe. All rights reserved.
        </p>
      </main>
    </div>
  );
};

export default ProviderLogin;
