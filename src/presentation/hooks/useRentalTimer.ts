import { useState, useEffect, useRef } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { Rental } from '../../core/entities';
import { TimeStatus } from '../../infrastructure/interfaces';

export const useRentalTimer = ({ rental }: { rental: Rental; }) => {
  const rentalDateFormatString = rental.date.toString().replaceAll(' ', '').replaceAll('-', '').replaceAll(', ', '').replaceAll(':', '').replaceAll('T', '').replaceAll('.', '').replaceAll('Z', '');
  const rentalKey = `rental_time${rental.client}_${rental.vehicle.nickname.replaceAll(' ', '')}_${rentalDateFormatString}`;
  const rentalDoneKey = `rental_done_${rental.client}_${rental.vehicle.nickname}_${rentalDateFormatString}`;
  const rentalStatusKey = `${rentalKey}_status`;
  const [timerOn, setTimerOn] = useState(true);
  const [timerStatus, setTimerStatus] = useState<TimeStatus>('RUNNING');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [done, setDone] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const buttonSize = { height: 30, width: 30 };
  const buttonOpacity = 0.7;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const saveTime = async (currentTime: number) => {
    try {
      await StorageAdapter.setItem(rentalKey, currentTime.toString());
    } catch (e) {
      console.error("Error saving time: ", e);
    }
  };

  const saveTimerStatus = async (status: TimeStatus) => {
    try {
      await StorageAdapter.setItem(rentalStatusKey, status);
    } catch (e) {
      console.error("Error saving timer status: ", e);
    }
  };

  const startTimer = async () => {
    const now = Date.now();
    await StorageAdapter.setItem(`${rentalKey}_startTime`, now.toString());
    timerRef.current = BackgroundTimer.setTimeout(() => {
      setSecondsLeft((prevTime) => {
        const newTime = prevTime + 1;
        saveTime(newTime);
        return newTime;
      });
      startTimer();
    }, 1000);
    setTimerStatus('RUNNING');
  };

  const pauseTimer = async () => {
    if (timerRef.current !== null) {
      BackgroundTimer.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setTimerOn(current => !current);
    const newStatus = timerStatus === 'RUNNING' ? 'STOPPED' : 'RUNNING';
    setTimerStatus(newStatus);
    await saveTimerStatus(newStatus);
  };

  const resetTimer = async () => {
    if (timerRef.current !== null) {
      BackgroundTimer.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setTimerOn(false);
    setSecondsLeft(0);
    setTimerStatus('STOPPED');
    await saveTimerStatus('STOPPED');
  };

  const advanceTime = (timeToAdd: number) => {
    const secondsToAdd = timeToAdd * 60;
    setSecondsLeft(prevTime => (prevTime + secondsToAdd));
  };

  const initializeTimer = async () => {
    const savedTime = await StorageAdapter.getItem(rentalKey);
    const savedStartTime = await StorageAdapter.getItem(`${rentalKey}_startTime`);
    const savedStatus = await StorageAdapter.getItem(rentalStatusKey);

    if (savedStartTime && savedTime) {
      const now = Date.now();
      const elapsed = Math.floor((now - parseInt(savedStartTime, 10)) / 1000);
      const totalElapsedTime = parseInt(savedTime, 10) + elapsed;
      setSecondsLeft(totalElapsedTime);
    }

    if (savedStatus === 'STOPPED') {
      setTimerStatus('STOPPED');
      setTimerOn(false);
    } else if (timerOn) {
      startTimer();
    }
  };

  const checkRentalDone = async () => {
    try {
      const savedDone = await StorageAdapter.getItem(rentalDoneKey);
      if (savedDone !== null) {
        setDone(true);
      }
    } catch (e) {
      console.error("Error loading time: ", e);
    }
  };

  useEffect(() => {
    checkRentalDone();
  }, []);

  useEffect(() => {
    initializeTimer();
  }, []);

  return {
    buttonOpacity,
    buttonSize,
    done,
    secondsLeft,
    timerStatus,
    advanceTime,
    formatTime,
    setDone,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
