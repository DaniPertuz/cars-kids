import { useState, useEffect } from 'react';
import { i18n, padTo2Digits } from '../../utils';
import { TranslationWidth } from '@ui-kitten/components';

export const useFormattedDate = (initialDateValue = undefined) => {
  const [date, setDate] = useState<Date | undefined>(initialDateValue);
  const [dateText, setDateText] = useState('');
  const [dateNumbersText, setDateNumbersText] = useState('');

  const formatDateString = (date: Date | undefined) => {
    if (!date) return '';

    const month = i18n.monthNames[TranslationWidth.LONG]?.at(date.getMonth());
    return [
      padTo2Digits(date.getDate()),
      month,
      date.getFullYear(),
    ].join(' de ');
  };

  const formatDateNumbersOnly = (date: Date | undefined) => {
    if (!date) return '';

    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join('-');
  };

  const formatDateTime = (date: Date | undefined) => {
    if (!date) return '';

    const utcDate = new Date(date);

    utcDate.setHours(utcDate.getHours());

    const day = padTo2Digits(utcDate.getDate());
    const monthIndex = utcDate.getMonth();
    const month = i18n.monthNames[TranslationWidth.LONG]?.at(monthIndex);
    const year = utcDate.getFullYear();
    const hour = padTo2Digits(utcDate.getHours());
    const minute = padTo2Digits(utcDate.getMinutes());

    return `${day} de ${month} de ${year} ${hour}:${minute}`;
  };

  const extractTimeFromStringDate = (originalDateString: Date) => {
    const originalDate = new Date(originalDateString);

    const originalHours = originalDate.getHours();
    const originalMinutes = originalDate.getMinutes();

    let formattedHours = originalHours % 12 || 12;
    const amPm = originalHours < 12 ? "AM" : "PM";

    const formattedTime = `${formattedHours}:${originalMinutes < 10 ? '0' : ''}${originalMinutes} ${amPm}`;

    return formattedTime;
  };

  const addedTime = (originalDateString: Date, additionalMinutes: number) => {
    const originalDate = new Date(originalDateString);

    const originalHours = originalDate.getHours();
    const originalMinutes = originalDate.getMinutes();

    const totalMinutes = originalMinutes + additionalMinutes;

    const finalHours = originalHours + Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;

    let formattedHours = finalHours % 12 || 12;
    const amPm = finalHours < 12 ? "AM" : "PM";

    const formattedTime = `${formattedHours}:${finalMinutes < 10 ? '0' : ''}${finalMinutes} ${amPm}`;

    return formattedTime;
  };

  useEffect(() => {
    setDateText(formatDateString(date));
    setDateNumbersText(formatDateNumbersOnly(date));
  }, [date]);

  return { date, setDate, dateNumbersText, dateText, addedTime, extractTimeFromStringDate, formatDateTime, formatDateNumbersOnly, formatDateString };
};
