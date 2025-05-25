'use client';

import { useEffect, useRef } from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text: string;
  bgColor?: string;
  textColor?: string;
}

export default function PlaceholderImage({
  width,
  height,
  text,
  bgColor = '#f3f4f6',
  textColor = '#6b7280'
}: PlaceholderImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `${Math.max(16, Math.min(width, height) / 10)}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    // Draw border
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);
  }, [width, height, text, bgColor, textColor]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className="w-full h-full object-cover"
    />
  );
}
