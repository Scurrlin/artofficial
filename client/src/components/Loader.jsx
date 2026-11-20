import React from 'react';
import LottieModule from 'lottie-react';
import darkAnimation from '../assets/darkLoader.json';
import lightAnimation from '../assets/lightLoader.json';

// Vite 8 returns the CJS module.exports object for default imports in "type": "module" projects.
const Lottie = LottieModule.default ?? LottieModule;

const animations = { dark: darkAnimation, light: lightAnimation };

const Loader = ({ size = 400, variant = 'dark' }) => (
  <div role="status" aria-live="polite" style={{ width: size, height: size }}>
    <Lottie animationData={animations[variant]} loop />
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loader;
