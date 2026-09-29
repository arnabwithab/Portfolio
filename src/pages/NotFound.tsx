import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 — Lost Woods | Arnab Mandal</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center px-6 text-center font-sans">
        <p className="font-mono text-[13px] tracking-[0.2em] text-emerald-300">
          ⚠ 404 — YOU WANDERED OFF THE MAP
        </p>
        <h1 className="mt-4 font-pixel text-2xl leading-relaxed text-slate-100 sm:text-3xl">
          Lost Woods
        </h1>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-300">
          The page you're looking for got finetuned out of existence.
        </p>
        <div aria-hidden="true" className="mt-6 select-none font-mono text-[13px] tracking-[0.4em] text-emerald-700">
          · · ─── ◆ ─── · ·
        </div>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-emerald-300 px-6 py-2 font-mono text-sm font-semibold text-emerald-900 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          [ RESPAWN ] → home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
