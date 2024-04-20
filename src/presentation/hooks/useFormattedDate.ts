import { useState, useEffect } from 'react';
import { i18n, padTo2Digits } from '../../utils';
import { TranslationWidth } from '@ui-kitten/components';

export const useFormattedDate = (initialDateValue = undefined) => {
  const [date, setDate] = useState<Date | undefined>(initialDateValue);
  const [dateText, setDateText] = useState('');
  const [dateNumbersText, setDateNumbersText] = useState('');

  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

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
    const year = utcDate.getFullYear();
    const hour = padTo2Digits(utcDate.getHours());
    const minute = padTo2Digits(utcDate.getMinutes());

    return `${day} de ${months[monthIndex]} de ${year} ${hour}:${minute}`;
  };

  useEffect(() => {
    setDateText(formatDateString(date));
    setDateNumbersText(formatDateNumbersOnly(date));
  }, [date]);

  return { date, setDate, dateNumbersText, dateText, formatDateTime, formatDateNumbersOnly, formatDateString };
};
