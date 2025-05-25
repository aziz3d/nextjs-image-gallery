'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Engine, Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

interface ParticlesBackgroundProps {
  height?: string;
}

// Define particle configuration
const particlesConfig: ISourceOptions = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
    },
    number: {
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};

export default function ParticlesBackground({ height = '100%' }: ParticlesBackgroundProps) {
  const [init, setInit] = useState(false);

  // Initialize the particles engine once
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // You can use the container here if needed
    // console.log(container);
  }, []);

  return (
    <div style={{ height, position: 'relative', overflow: 'hidden', width: '100%' }}>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particlesConfig}
          className="absolute inset-0 z-0"
        />
      )}
    </div>
  );
}
