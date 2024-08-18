import { useState, useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { Rental } from '../../core/entities';
import { TimeStatus } from '../../infrastructure/interfaces';
import { useFormattedDate } from './useFormattedDate';

export const useRentalTimer = ({ rental }: { rental: Rental; }) => {
  const { formatDateTime } = useFormattedDate();
  const rentalDate = formatDateTime(rental.date).replaceAll(' ', '_');
  const rentalKey = `rental_time_${rental.client}_${rental.vehicle.nickname}_${rental.date}`;
  const rentalDoneKey = `rental_done_${rental.client}_${rental.vehicle.nickname}_${rentalDate}`;
  const [timerOn, setTimerOn] = useState(true);
  const [timerStatus, setTimerStatus] = useState<TimeStatus>('RUNNING');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [done, setDone] = useState<boolean>(false);
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

  const startTimer = async () => {
    const now = Date.now();
    await StorageAdapter.setItem(`${rentalKey}_startTime`, now.toString());
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(prevTime => {
        const newTime = prevTime + 1;
        saveTime(newTime);
        return newTime;
      });
    }, 1000);
    setTimerStatus('RUNNING');
  };

  const pauseTimer = () => {
    BackgroundTimer.stopBackgroundTimer();
    setTimerOn((current) => !current);
    setTimerStatus(prevStatus => (prevStatus === 'RUNNING' ? 'STOPPED' : 'RUNNING'));
  };

  const resetTimer = () => {
    setTimerOn(false);
    setSecondsLeft(0);
    setTimerStatus('STOPPED');
  };

  const advanceTime = (timeToAdd: number) => {
    const secondsToAdd = timeToAdd * 60;
    setSecondsLeft(prevTime => (prevTime + secondsToAdd));
  };

  const initializeTimer = async () => {
    const savedTime = await StorageAdapter.getItem(rentalKey);
    const savedStartTime = await StorageAdapter.getItem(`${rentalKey}_startTime`);

    if (savedStartTime && savedTime) {
      const now = Date.now();
      const elapsed = Math.floor((now - parseInt(savedStartTime, 10)) / 1000);
      const totalElapsedTime = parseInt(savedTime, 10) + elapsed;
      setSecondsLeft(totalElapsedTime);
    }

    if (timerOn) startTimer();
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
    pauseTimer,
    resetTimer
  };
};
