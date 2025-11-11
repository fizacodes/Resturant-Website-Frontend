import { useState, useRef } from "react";
import SignUp from "./SignUp";
import SignIn from "./Signin";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousActiveRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Open menu: save previous focus, show menu and move focus to close button
  const openMenu = () => {
    previousActiveRef.current = document.activeElement;
    setMobileMenu(true);
    // focus the close button once menu is visible
    setTimeout(() => {
      try {
        closeBtnRef.current?.focus?.();
      } catch (e) {}
    }, 50);
  };

  // Close menu: restore focus first, then hide menu (delay to ensure focus moved)
  const closeMenu = () => {
    const prev = previousActiveRef.current;
    if (prev && typeof prev.focus === "function") {
      try {
        prev.focus();
      } catch (e) {}
      setTimeout(() => setMobileMenu(false), 50);
    } else {
      setMobileMenu(false);
    }
  };

  return (
    <div className="relative">
      {/* Navbar bar itself */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-md shadow-lg z-[1000]">
        {/* Logo */}
        <h1 className="text-amber-400 text-3xl font-medium font-serif tracking-wider">
          La Cuisine
        </h1>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-6">
          <button onClick={()=>setShowSignIn(true)} className="text-white flex items-center gap-2 cursor-pointer hover:text-amber-300 transition-colors duration-300">
            <img src="/user-plus.svg" alt="" className="w-5 h-5" aria-hidden="true" />
            Sign in
          </button>
          <button onClick={()=>setShowSignUp(true)} className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-2 px-5 rounded-md flex items-center gap-2 shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105">
            <img src="/user-plus.svg" alt="" className="w-5 h-5" aria-hidden="true" />
            Sign Up Free
          </button>
        </div>
       

        {/* Mobile Menu Button */}
        <button
          ref={toggleBtnRef}
          className="sm:hidden cursor-pointer z-[1001] p-1"
          onClick={() => (mobileMenu ? closeMenu() : openMenu())}
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenu}
          type="button"
        >
          <img src="/menu.svg" alt="menu" className="w-7 h-7" />
        </button>
      </nav>

        {/* Mobile menu (drawer + backdrop) - always mounted, animate with transform/opacity */}
      <div className={`sm:hidden fixed inset-0 z-[1100] ${mobileMenu ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileMenu ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => closeMenu()}
        />

        {/* sliding panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[70%] max-w-xs bg-black/95 p-6 flex flex-col gap-6 transform transition-transform duration-300 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}
          aria-hidden={!mobileMenu}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-amber-400 text-2xl font-serif">La Cuisine</h2>
            <button
              ref={closeBtnRef}
              onClick={() => closeMenu()}
              aria-label="Close menu"
              className="text-white text-2xl"
              type="button"
            >
              ✕
            </button>
          </div>

            <nav className="flex flex-col gap-4 mt-4">
            <button onClick={()=>setShowSignIn(true)}  className="text-white flex items-center gap-2 cursor-pointer hover:text-amber-300 transition-colors duration-300">
              <img src="/user-plus.svg" alt="" className="w-5 h-5" aria-hidden="true" />
              Sign in
            </button>

            <button onClick={()=>setShowSignUp(true)} className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-2 px-5 rounded-md flex items-center gap-2 shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105">
              <img src="/user-plus.svg" alt="" className="w-5 h-5" aria-hidden="true" />
              Sign Up Free
            </button>

          </nav>
        </aside>
      </div>
       {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
       {showSignIn && <SignIn onClose={()=>{setShowSignIn(false)}}/>}
    </div>
  );
}

export default Navbar;
