import { useState, useEffect } from 'react';
import { useTimer } from 'use-timer';
import { Rental } from '../../core/entities';

export const useRentalTimer = ({ rental }: { rental: Rental; }) => {
  const [done, setDone] = useState<boolean>(false);
  const [timerType, setTimerType] = useState<'DECREMENTAL' | 'INCREMENTAL'>('DECREMENTAL');
  const { status, time, advanceTime, start, pause, reset } = useTimer({
    initialTime: rental.time * 60,
    timerType: timerType
  });
  const buttonSize = { height: 30, width: 30 };
  const buttonOpacity = 0.7;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (!done) start();
  }, [done]);

  useEffect(() => {
    if (!done && time === 0) {
      setTimerType('INCREMENTAL');
      start();
    }
  }, [done, time]);

  return {
    buttonOpacity,
    buttonSize,
    done,
    status,
    time,
    advanceTime,
    formatTime,
    pause,
    reset,
    setDone,
    start
  };
};
