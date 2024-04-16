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
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  };

  useEffect(() => {
    setDateText(formatDateString(date));
    setDateNumbersText(formatDateNumbersOnly(date));
  }, [date]);

  return { date, setDate, dateNumbersText, dateText };
};
