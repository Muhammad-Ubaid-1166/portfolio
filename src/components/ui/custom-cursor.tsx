'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Check if device supports hover (not touch)
  useEffect(() => {
    const checkDevice = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setIsTouchDevice(!hasHover);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const updatePosition = useCallback((e: MouseEvent) => {
    // Use animate for smoother movement without bounce
    animate(cursorX, e.clientX, { 
      type: 'tween', 
      duration: 0.08,
      ease: 'linear'
    });
    animate(cursorY, e.clientY, { 
      type: 'tween', 
      duration: 0.08,
      ease: 'linear'
    });
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');
      
      if (isInteractive) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isTouchDevice, updatePosition]);

  // Don't render on touch devices
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.3 : 1,
            opacity: 1,
          }}
          transition={{ 
            type: 'tween',
            duration: 0.12,
            ease: 'easeOut'
          }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          {/* Inner dot */}
          <div 
            className="w-3 h-3 rounded-full bg-violet-500"
            style={{
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Outer ring for hover states */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 0.8 : 0,
          }}
          transition={{ 
            type: 'tween',
            duration: 0.15,
            ease: 'easeOut'
          }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          <div 
            className="w-8 h-8 rounded-full border-2 border-violet-400"
            style={{
              boxShadow: '0 0 12px rgba(139, 92, 246, 0.25)',
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
