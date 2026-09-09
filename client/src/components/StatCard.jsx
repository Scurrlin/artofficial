import React from 'react';

const StatCard = ({ imageCount, userCount, iconLogo, iconClassName = 'w-12 h-12', onRefresh, refreshing = false }) => {
  return (
    <div className="relative w-full max-w-[380px] md:min-w-[380px] md:max-w-[450px] overflow-hidden rounded-2xl bg-[#10131f] shadow-[0_12px_40px_rgba(0,0,0,0.06)] grid grid-cols-[1fr_auto_1fr] items-center gap-y-1 px-6 py-5">
      <div className="text-4xl font-semibold tracking-tight text-white tabular-nums text-center">
        {userCount.toLocaleString()}
      </div>

      <img src={iconLogo} alt="" className={`${iconClassName} shrink-0 justify-self-center`} aria-hidden="true" />

      <div className="text-4xl font-semibold tracking-tight text-white tabular-nums text-center">
        {imageCount.toLocaleString()}
      </div>

      <p className="text-white text-[16px] text-center">Users</p>

      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        aria-label="Refresh feed"
        aria-busy={refreshing}
        className="justify-self-center text-white p-0.5 rounded-md disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
      >
        <svg
          className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M8 16H3v5" />
        </svg>
      </button>

      <p className="text-white text-[16px] text-center">Images</p>
    </div>
  );
};

export default StatCard;
