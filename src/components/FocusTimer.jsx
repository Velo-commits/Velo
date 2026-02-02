import React, { useState, useEffect } from 'react';

const FocusTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('FOCUS');

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) { setIsActive(false); setMode(mode === 'FOCUS' ? 'BREAK' : 'FOCUS'); setMinutes(mode === 'FOCUS' ? 5 : 25); } 
          else { setMinutes(minutes - 1); setSeconds(59); }
        } else { setSeconds(seconds - 1); }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  return (
    <div className="timer-container">
      <div className="timer-circle">
        <div style={{color: mode === 'FOCUS' ? '#ef4444' : '#10b981', fontWeight:'bold', letterSpacing:'1px'}}>{mode === 'FOCUS' ? '🔥 DEEP WORK' : '☕ CHILL TIME'}</div>
        <div className="time-display">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
      </div>
      <button className="timer-btn" style={{background:'#1e293b', color:'white'}} onClick={() => setIsActive(!isActive)}>{isActive ? 'PAUSE' : 'START'}</button>
      <button className="timer-btn" onClick={() => { setIsActive(false); setMinutes(25); setSeconds(0); setMode('FOCUS'); }}>RESET</button>
    </div>
  );
};
export default FocusTimer;