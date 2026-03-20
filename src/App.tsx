/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import BatmanTheme from './components/BatmanTheme';
import ProTheme from './components/ProTheme';
import BatSignalTransition from './components/BatSignalTransition';

export default function App() {
  // Default to the professional theme
  const [isBatmanMode, setIsBatmanMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerBatmanMode = () => {
    if (!isBatmanMode && !isTransitioning) {
      setIsTransitioning(true);
    }
  };

  const toggleTheme = () => {
    if (isBatmanMode) {
      setIsBatmanMode(false);
    } else {
      triggerBatmanMode();
    }
  };

  // Keyboard Easter Egg: Typing "BATMAN" or "BRUCE"
  useEffect(() => {
    let keyBuffer = '';
    const batmanCode = 'batman';
    const bruceCode = 'bruce';
    const maxLen = Math.max(batmanCode.length, bruceCode.length);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > maxLen) {
        keyBuffer = keyBuffer.slice(-maxLen);
      }

      if (!isBatmanMode && keyBuffer.endsWith(batmanCode)) {
        triggerBatmanMode();
        keyBuffer = '';
      } else if (isBatmanMode && keyBuffer.endsWith(bruceCode)) {
        setIsBatmanMode(false);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBatmanMode, isTransitioning]);

  return (
    <>
      {isTransitioning && (
        <BatSignalTransition 
          onComplete={() => {
            setIsTransitioning(false);
            setIsBatmanMode(true);
          }} 
        />
      )}
      
      {isBatmanMode ? (
        <BatmanTheme toggleTheme={toggleTheme} />
      ) : (
        <ProTheme toggleTheme={toggleTheme} />
      )}
    </>
  );
}
