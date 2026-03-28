"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export function MenuOverlay({ isOpen, onClose, onContactClick }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#100E04] text-[#E9E2CD] flex flex-col justify-center items-center px-6"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:right-12 p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors flex justify-center items-center group bg-white/5"
          >
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform duration-300">close</span>
          </button>

          <nav className="flex flex-col gap-6 md:gap-10 text-center items-center justify-center">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/#services" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Albums", href: "/albums" },
              { label: "About", href: "/#about" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="font-headline text-5xl md:text-7xl lg:text-[6vw] font-bold tracking-tighter hover:text-white transition-colors inline-block hover:scale-[1.02] active:scale-95"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Contact Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => onContactClick(), 500); // Wait for menu exit animation
                }}
                className="font-headline text-5xl md:text-7xl lg:text-[6vw] font-bold tracking-tighter hover:text-white transition-colors inline-block hover:scale-[1.02] active:scale-95"
              >
                Contact
              </button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
