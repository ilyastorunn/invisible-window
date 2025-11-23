import React, { useEffect, useRef, useState } from 'react';
import { VideoFilter } from '../types';

interface GhostOverlayProps {
  filter: VideoFilter;
}

const GhostOverlay: React.FC<GhostOverlayProps> = ({ filter }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // 1. Setup Camera
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        // We request a high resolution to match screen capabilities if possible
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: window.screen.width },
            height: { ideal: window.screen.height },
            frameRate: { ideal: 60 }
          },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.error("Play error:", e));
        }
      } catch (err) {
        console.error("Camera access denied or failed", err);
        setError("Camera access is required for the transparent effect.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // 2. High-performance Render Loop for Window Position
  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      if (videoRef.current && containerRef.current) {
        // Core Illusion Math:
        // We want the video to remain fixed relative to the SCREEN (Monitor),
        // not the browser window.
        // 
        // 1. Video Size = Screen Size
        // 2. Video Position = Negative Window Position
        
        const screenW = window.screen.width;
        const screenH = window.screen.height;
        const winX = window.screenX;
        const winY = window.screenY;

        // Force video element to match physical screen dimensions
        videoRef.current.style.width = `${screenW}px`;
        videoRef.current.style.height = `${screenH}px`;
        
        // Offset the video so it aligns with the monitor's top-left corner
        // regardless of where this window is.
        // using translate3d for GPU acceleration
        videoRef.current.style.transform = `translate3d(${-winX}px, ${-winY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900 text-red-400 p-8 text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Permission Error</h2>
          <p>{error}</p>
          <p className="text-sm text-neutral-500 mt-4">Please allow camera access and refresh.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-black pointer-events-none"
      style={{ zIndex: -1 }} // Ensure it stays behind everything
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 max-w-none object-cover transition-[filter] duration-300"
        style={{
            // Initial styles, updated by JS loop
            width: '100vw', 
            height: '100vh',
            filter: filter
        }}
        muted
        playsInline
      />
      {/* Vignette for a bit of depth/realism to the 'window' frame */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none"></div>
    </div>
  );
};

export default GhostOverlay;