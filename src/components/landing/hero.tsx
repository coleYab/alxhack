'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  // Close on ESC & click outside (mobile overlay)
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setMenuOpen(false);
    }

    if (menuOpen) {
      document.addEventListener('keydown', onKey);
      document.addEventListener('click', onClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClickOutside);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <section 
      className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] bg-background w-full bg-cover bg-center bg-no-repeat pb-44 text-sm text-foreground">
        <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-full">
          <a href="#" aria-label="Wonder AI home" className="flex items-center gap-2">
            <Image src='/icon.png' alt='Wonder AI' width={28} height={28} className='size-7 object-contain' />
            <span className='text-base font-semibold tracking-tight text-foreground'>Wonder AI</span>
          </a>

          <div
            id="menu"
            ref={menuRef}
            className={[
              'max-md:absolute max-md:top-0 max-md:left-0 max-md:h-full max-md:overflow-hidden max-md:bg-background/90 max-md:backdrop-blur max-md:transition-all max-md:duration-300',
              'flex items-center font-medium',
              'max-md:flex-col max-md:justify-center',
              menuOpen ? 'max-md:w-full' : 'max-md:w-0',
            ].join(' ')}
          >

            <button
              onClick={() => setMenuOpen(false)}
              className="md:hidden aspect-square rounded-md bg-primary p-2 font-medium text-primary-foreground transition hover:opacity-90"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <Link
            href='/auth/sign-in'
            className='hidden rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90 md:block'
          >
            Sign In
          </Link>

          <button
            id="open-menu"
            onClick={() => setMenuOpen(true)}
            className="md:hidden aspect-square rounded-md bg-primary p-2 font-medium text-primary-foreground transition hover:opacity-90"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          </button>
        </nav>

        <div className="mx-auto mt-40 flex w-max items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 hover:border-muted-foreground/40 md:mt-32">
          <span> The AI Journey Planner is here</span>
          {/* <button className="flex items-center gap-1 font-medium">
            <span>Read more</span>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3.959 9.5h11.083m0 0L9.501 3.958M15.042 9.5l-5.541 5.54" stroke="#050040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg> */}
          {/* </button> */}
        </div>

        <h5 className="text-4xl md:text-7xl font-medium max-w-[850px] text-center mx-auto mt-8">
          The AI Journey Planner
        </h5>

        <p className="mx-auto mt-6 max-w-2xl px-2 text-center text-sm text-muted-foreground md:px-0 md:text-base">
          A visually intelligent, self-updating travel assistant designed for modern hospitality experiences. Transform travel from a static checklist into a living, guided experience.
        </p>

        <div className="mx-auto w-full flex items-center justify-center gap-3 mt-4">
          <Link
            href='/auth/sign-up'
            className='rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90'
          >
            Sign Up
          </Link>
          <Link href='/dashboard' className='flex items-center gap-2 rounded-full border border-border px-6 py-3 transition hover:bg-muted'>
            <span>Start Planning</span>
            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M1.25.5 4.75 4l-3.5 3.5" stroke="#050040" strokeOpacity=".4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
