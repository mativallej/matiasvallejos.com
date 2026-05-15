'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ResultsCard, MakeItCard, PressStripCard } from './dashboard';

const socialLinks = [
  {
    label: 'X / Twitter',
    href: 'https://x.com/mativallej_',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mativallej',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mativallej/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/mativallej_',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export function Hero() {
  const t = useTranslations('Hero');
  const [copied, setCopied] = useState(false);
  const [socialHover, setSocialHover] = useState(false);
  const [photoIsVideo, setPhotoIsVideo] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [aboutAnchor, setAboutAnchor] = useState<{ top: number; left: number; width: number } | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const bioRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const toggleAbout = () => {
    if (!aboutExpanded && bioRef.current) {
      const r = bioRef.current.getBoundingClientRect();
      setAboutAnchor({ top: r.top, left: r.left, width: r.width });
    }
    setAboutExpanded((v) => !v);
  };

  useEffect(() => {
    if (!aboutExpanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAboutExpanded(false);
    };
    window.addEventListener('keydown', onKey);
    // Lock scroll AND reserve scrollbar width so the page doesn't jump
    // sideways on platforms with classic (non-overlay) scrollbars.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [aboutExpanded]);
  const [doctaOpen, setDoctaOpen] = useState(false);
  const [doctaImageIndex, setDoctaImageIndex] = useState(0);
  const doctaImages = ['/images/projects/docta-valley/event-001.jpeg', '/images/projects/docta-valley/event-002.jpeg'];

  useEffect(() => {
    if (!doctaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDoctaOpen(false);
      if (e.key === 'ArrowRight') setDoctaImageIndex((i) => (i + 1) % doctaImages.length);
      if (e.key === 'ArrowLeft') setDoctaImageIndex((i) => (i - 1 + doctaImages.length) % doctaImages.length);
    };
    window.addEventListener('keydown', onKey);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [doctaOpen, doctaImages.length]);


  const handleCopy = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <section id="about" className="px-4 lg:px-8 pt-8 pb-4 md:pt-16 md:pb-6 max-w-[1080px] mx-auto">
      <aside
        id="hero-panel"
        className="md:rounded-3xl bg-[#080706] p-0 md:p-3 grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {/* Row 1: Photo + Name+Socials + Bio (spans 2) */}
        <div className="relative rounded-2xl border border-[#3D3935]/60 overflow-hidden bg-[#12100E] h-full min-h-[200px] md:min-h-[260px]">
          <button
            type="button"
            onClick={() => setPhotoIsVideo((v) => !v)}
            aria-label={photoIsVideo ? 'Show photo' : 'Play video'}
            className="absolute inset-0 w-full h-full cursor-pointer group"
          >
            <AnimatePresence initial={false} mode="sync">
              {photoIsVideo ? (
                <motion.div
                  key="me-video"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <video
                    src="/me.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover block"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="me-photo"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/me.webp"
                    alt="Matias Vallejos"
                    fill
                    priority
                    sizes="(max-width: 768px) 70vw, 340px"
                    className="object-cover object-center block"
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </button>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={handleCopy}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCopy();
            }
          }}
          className={`relative text-left rounded-2xl border border-[#3D3935]/60 p-4 flex flex-col gap-4 md:gap-3 justify-between h-full md:min-h-[260px] transition-colors group cursor-pointer ${socialHover ? '' : 'hover:border-[#57534E]'}`}
          data-social-hover={socialHover ? 'true' : 'false'}
        >
          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-[26px] sm:text-[32px] md:text-[40px] font-bold text-white tracking-[-0.03em] leading-[1]">
              Matias
              <br />
              <span className="text-[#FB923C]">Vallejos</span>
            </h1>
            <div className="flex flex-col gap-0.5">
              <p className="font-mono text-[12px] md:text-[15px] text-[#A8A29E] tracking-wide">{t('roleLine1')}</p>
              <p className="font-mono text-[12px] md:text-[15px] text-[#A8A29E] tracking-wide">{t('roleLine2')}</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-auto">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setSocialHover(true)}
                onMouseLeave={() => setSocialHover(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 + i * 0.06 }}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#3D3935]/50 bg-transparent text-[#A8A29E] hover:text-[#A8A29E] hover:border-[#57534E] transition-all duration-200"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Copied toast */}
          <AnimatePresence>
            {copied && (
              <motion.div
                key="copied-toast"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#080706]/90 backdrop-blur-sm gap-2 rounded-2xl"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A3B86C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-mono text-[12px] text-[#FAFAF9] uppercase tracking-[0.08em]">Link copied</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          ref={bioRef}
          type="button"
          onClick={toggleAbout}
          aria-expanded={aboutExpanded}
          aria-controls="about-extended"
          className="relative col-span-2 md:col-span-2 w-full text-left rounded-2xl border border-[#3D3935]/60 p-5 pb-9 flex flex-col gap-4 hover:border-[#57534E] transition-colors group cursor-pointer md:min-h-[260px]"
        >
          <p className="font-serif text-[15px] md:text-[19px] text-[#FAFAF9] leading-[1.5] tracking-[-0.01em] font-normal">
            {t('intro')}
          </p>
          <span className="absolute bottom-3 left-4 font-mono text-[10px] text-[#A8A29E] uppercase tracking-[0.08em]">
            {aboutExpanded ? t('ctaAboutExpanded') : t('ctaAbout')}
          </span>
        </button>

        {/* Row 2: Results (wide, with chart) · GitHub · Community */}
        <div className="col-span-2 md:col-span-2">
          <ResultsCard />
        </div>
        <div className="col-span-1 md:col-span-1">
          <MakeItCard />
        </div>
        <button
          type="button"
          onClick={() => { setDoctaImageIndex(0); setDoctaOpen(true); }}
          className="relative w-full text-left rounded-2xl border border-[#3D3935]/60 p-4 pb-9 hover:border-[#57534E] transition-colors group flex flex-col items-start gap-2 min-h-[170px] overflow-hidden cursor-pointer"
        >
          <span className="font-serif text-[34px] md:text-[44px] leading-none tracking-tight text-[#F5E6B0]">
            +240
          </span>
          <p className="text-[13px] text-[#FAFAF9] leading-snug font-medium">
            {t('secondary.communityTitle')}
          </p>
          <Image
            src="/images/projects/docta-valley/logo.jpg"
            alt="Docta Valley"
            width={32}
            height={32}
            className="absolute bottom-3 right-4 h-7 w-7 rounded-full object-cover opacity-90"
          />
          <span className="absolute bottom-3 left-4 font-mono text-[10px] text-[#A8A29E] uppercase tracking-[0.08em]">
            {t('secondary.communityTag')}
          </span>
        </button>

        {/* Row 3: Press strip (full width) */}
        <div className="col-span-2 md:col-span-4">
          <PressStripCard />
        </div>
      </aside>

      <AnimatePresence>
        {doctaOpen && (
          <motion.div
            key="docta-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setDoctaOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Docta Valley"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[720px] rounded-2xl border border-[#3D3935] bg-[#0C0A09] overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setDoctaOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[#FAFAF9] bg-[#080706]/70 hover:bg-[#080706] transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Main image */}
              <div className="relative aspect-[16/10] bg-[#080706]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={doctaImages[doctaImageIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={doctaImages[doctaImageIndex]}
                      alt={`Docta Valley event ${doctaImageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {doctaImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setDoctaImageIndex((i) => (i - 1 + doctaImages.length) % doctaImages.length)}
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#080706]/60 hover:bg-[#080706] text-[#FAFAF9] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDoctaImageIndex((i) => (i + 1) % doctaImages.length)}
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#080706]/60 hover:bg-[#080706] text-[#FAFAF9] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {doctaImages.length > 1 && (
                <div className="flex items-center gap-2 px-5 pt-4">
                  {doctaImages.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setDoctaImageIndex(i)}
                      aria-label={`Image ${i + 1}`}
                      className={`relative w-14 h-14 rounded-md overflow-hidden border transition-colors cursor-pointer ${
                        i === doctaImageIndex ? 'border-[#F5E6B0]' : 'border-[#3D3935] hover:border-[#57534E]'
                      }`}
                    >
                      <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Footer: copy + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 p-5">
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-[28px] md:text-[32px] leading-none tracking-tight text-[#F5E6B0]">
                    +240
                  </span>
                  <p className="text-[13px] text-[#FAFAF9] leading-snug font-medium">
                    {t('secondary.communityTitle')}
                  </p>
                  <span className="font-mono text-[10px] text-[#A8A29E] uppercase tracking-[0.08em]">
                    {t('secondary.communityTag')}
                  </span>
                </div>
                <a
                  href="https://doctavalley.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.04em] bg-[#F5E6B0] text-[#080706] px-4 py-2.5 rounded-md hover:bg-[#E8D89E] transition-colors duration-200 self-start sm:self-end"
                >
                  doctavalley.com.ar
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {portalReady &&
        createPortal(
          <AnimatePresence initial={false}>
            {aboutExpanded && aboutAnchor && (
              <>
                <motion.div
                  key="about-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setAboutExpanded(false)}
                  className="fixed inset-0 z-[80] bg-[#080706]/85 backdrop-blur-md cursor-default"
                  aria-hidden="true"
                />
                <motion.div
                  id="about-extended"
                  key="about-popup"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    position: 'fixed',
                    top: aboutAnchor.top,
                    left: aboutAnchor.left,
                    width: aboutAnchor.width,
                    maxHeight: `calc(100vh - ${aboutAnchor.top}px - 16px)`,
                  }}
                  className="z-[90] overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-[#3D3935] bg-[#0C0A09] shadow-2xl"
                  role="dialog"
                  aria-modal="true"
                  aria-label="About me"
                >
                  <button
                    type="button"
                    onClick={() => setAboutExpanded(false)}
                    aria-label="Close about section"
                    className="w-full text-left p-5 pb-9 relative cursor-pointer flex flex-col gap-4 hover:bg-[#12100E] transition-colors"
                  >
                    <p className="font-serif text-[15px] md:text-[19px] text-[#FAFAF9] leading-[1.5] tracking-[-0.01em] font-normal">
                      {t('intro')}
                    </p>
                    <p className="text-[13px] md:text-[14px] text-[#A8A29E] leading-relaxed">
                      {t('aboutExtended')}
                    </p>
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAboutExpanded(false);
                        }}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#A8A29E] border border-[#3D3935] px-3 py-2 rounded-md hover:text-white hover:border-[#57534E] transition-colors"
                      >
                        {t('aboutCtaSecondary')} →
                      </a>
                      <Link
                        href="/about"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.04em] bg-[#FB923C] text-[#080706] px-3 py-2 rounded-md hover:bg-[#E8742A] transition-colors"
                      >
                        {t('aboutCtaPrimary')} →
                      </Link>
                    </div>
                    <span className="absolute bottom-3 left-4 font-mono text-[10px] text-[#A8A29E] uppercase tracking-[0.08em]">
                      {t('ctaAboutExpanded')}
                    </span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
