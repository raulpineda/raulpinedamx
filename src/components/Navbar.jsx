import { motion } from "framer-motion";
import { useState } from "react";
import { NAV_TEXT } from "../data";

export default function Navbar({ navLinks }) {
  const [isToggled, setIsToggled] = useState(false);
  const subMenuLinkStyles = `text-xl text-slate-700 hover:text-slate-950 transition-all duration-[0.3s]`;
  const MenuLinkStyles = `text-lg text-slate-700 hover:text-slate-950 transition-all duration-[0.3s]`;
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0 },
  };
  return (
    <nav className="relative left-0 top-0 w-full">
      <div className="flex items-center justify-between p-5">
        <a href="/" className="text-highlight logo text-md font-bold">
          {NAV_TEXT}
        </a>
        <div className="links">
          <ul className="hidden items-center gap-3 md:flex">
            {navLinks.map(link => (
              <li key={link.name} className={MenuLinkStyles}>
                <a href={`${link.href}`}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          className={`z-50 flex cursor-pointer flex-col gap-[3.5px] md:hidden ${
            isToggled ? "fixed right-5 top-6" : ""
          }`}
          onClick={() => setIsToggled(prev => !prev)}
        >
          <motion.span
            animate={{
              rotate: isToggled ? 45 : 0,
              translateY: isToggled ? 7 : 0,
              width: isToggled ? 30 : 30,
            }}
            className="h-[2px] w-[30px] bg-black"
          />
          <motion.span
            animate={{ opacity: isToggled ? 0 : 1, width: isToggled ? 0 : 25 }}
            className="h-[2px] w-[20px] bg-black"
          />
          <motion.span
            animate={{
              rotate: isToggled ? -45 : 0,
              translateY: isToggled ? -5 : 0,
              width: isToggled ? 30 : 15,
            }}
            className="h-[2px] w-[15px] bg-black"
          />
        </motion.div>
      </div>
      {isToggled && (
        <motion.div className="fixed left-0 top-0 z-30 flex h-screen w-screen flex-col items-center justify-center bg-white md:hidden">
          <motion.ul
            className="flex flex-col items-center gap-3 md:hidden"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {navLinks.map(link => (
              <motion.li variants={item} key={link.name}>
                <a
                  href={link.href}
                  className={subMenuLinkStyles}
                  onClick={() => setIsToggled(false)}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </nav>
  );
}
