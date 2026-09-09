import React from 'react';

const StatCard = ({ imageCount, userCount, iconLogo, onRefresh, refreshing = false }) => {
  return (
    <div className="relative w-full max-w-[380px] md:min-w-[380px] md:max-w-[450px] overflow-hidden rounded-2xl bg-[#10131f] shadow-[0_12px_40px_rgba(0,0,0,0.06)] grid grid-cols-[1fr_auto_1fr] items-center gap-y-1 px-6 py-5">
      <div className="text-4xl font-semibold tracking-tight text-white tabular-nums text-center">
        {userCount.toLocaleString()}
      </div>

      <img src={iconLogo} alt="" className="w-12 h-12 shrink-0 justify-self-center" aria-hidden="true" />

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
        className="justify-self-center text-white p-0.5 rounded-md hover:opacity-80 transition-opacity disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
      >
        <svg
          className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-3.2-6.86" />
          <polyline points="21 3 21 9 15 9" />
        </svg>
      </button>

      <p className="text-white text-[16px] text-center">Images</p>
    </div>
  );
};

export default StatCard;
