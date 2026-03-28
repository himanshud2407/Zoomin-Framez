"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { submitContactForm } from "@/app/actions";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus("success");
      // Reset form or close after delay
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 3000);
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex justify-center items-center px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#161407] border border-white/10 p-8 md:p-12 rounded-3xl w-full max-w-lg relative"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <h2 className="font-headline text-3xl font-bold text-[#E9E2CD] mb-2 tracking-tight">Get in Touch</h2>
            <p className="font-body text-sm text-white/50 mb-8">
              {status === "success" 
                ? "Your message has been sent successfully!" 
                : "Fill out the form below to shoot us an email."}
            </p>

            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-10"
              >
                <div className="w-16 h-16 bg-[#E9E2CD]/10 rounded-full flex items-center justify-center mb-4">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E9E2CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <p className="text-[#E9E2CD] font-medium">Thank you! We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <label className="font-label text-[10px] uppercase tracking-widest text-[#E9E2CD]/50 font-bold">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#E9E2CD] focus:outline-none focus:border-[#E9E2CD]/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label text-[10px] uppercase tracking-widest text-[#E9E2CD]/50 font-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#E9E2CD] focus:outline-none focus:border-[#E9E2CD]/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label text-[10px] uppercase tracking-widest text-[#E9E2CD]/50 font-bold">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#E9E2CD] focus:outline-none focus:border-[#E9E2CD]/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label text-[10px] uppercase tracking-widest text-[#E9E2CD]/50 font-bold">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#E9E2CD] focus:outline-none focus:border-[#E9E2CD]/50 transition-colors resize-none"
                  ></textarea>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs text-center border border-red-900/50 bg-red-900/10 p-3 rounded-lg">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`mt-4 bg-[#E9E2CD] text-[#161407] font-bold uppercase tracking-[0.2em] font-label py-4 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-white/20 active:scale-[0.98] ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

