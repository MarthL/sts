import React from 'react';
export const Waves: React.FC = () => (
  <>
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox="0 100 1440 300"
      xmlns="http://www.w3.org/2000/svg"
      className="transition pathAnim-0 duration-300 ease-in-out delay-150"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="5%" stopColor="#0693e3" />
          <stop offset="95%" stopColor="#8ED1FC" />
        </linearGradient>
      </defs>
      <path
        d="M0,200 C77.904,247.952 155.809,295.904 252,273 C348.191,250.096 462.67,156.335 571,161 C679.33,165.665 781.512,268.756 872,268 C962.488,267.244 1041.282,162.641 1134,134 C1226.718,105.359 1333.359,152.679 1440,200 L1440,600 L0,600 Z"

        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        fillOpacity="0.53"
        className="transition-all duration-300 ease-in-out delay-150 path-0"
      />
    </svg>
  </>
);





