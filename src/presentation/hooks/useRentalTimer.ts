import { useState, useEffect } from 'react';
import { useTimer } from 'use-timer';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { Rental } from '../../core/entities';
import { useFormattedDate } from './useFormattedDate';

export const useRentalTimer = ({ rental }: { rental: Rental; }) => {
  const { formatDateTime } = useFormattedDate();
  const rentalDate = formatDateTime(rental.date).replaceAll(' ', '_');
  const rentalKey = `rental_time_${rental.client}_${rental.vehicle.nickname}_${rental.date}`;
  const rentalDoneKey = `rental_done_${rental.client}_${rental.vehicle.nickname}_${rentalDate}`;
  const [initialTime, setInitialTime] = useState<number | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const { status, time, advanceTime, start, pause, reset } = useTimer({
    initialTime: 0,
    autostart: false
  });
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

  const loadTime = async () => {
    try {
      const savedTime = await StorageAdapter.getItem(rentalKey);
      if (savedTime !== null) {
        setInitialTime(parseInt(savedTime));
      }
    } catch (e) {
      console.error("Error loading time: ", e);
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
    loadTime();
  }, []);

  useEffect(() => {
    checkRentalDone();
  }, []);

  useEffect(() => {
    if (initialTime !== null) {
      advanceTime(initialTime);
      start();
    }
  }, [initialTime, advanceTime, start]);

  useEffect(() => {
    if (!done && time === 0) {
      start();
    }
  }, [done, time, start]);

  useEffect(() => {
    saveTime(time);
  }, [time]);

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
