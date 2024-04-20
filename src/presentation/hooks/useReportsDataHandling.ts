import { useState, useEffect } from 'react';
import { TranslationWidth } from '@ui-kitten/components';
import { useEntityData } from './useEntityData';
import { useFormattedDate } from './useFormattedDate';
import { padTo2Digits, i18n } from '../../utils';

export const useReportsDataHandling = () => {
  const [category, setCategory] = useState<string>('');
  const [lapse, setLapse] = useState<string>('');
  const [dayRange, setDayRange] = useState({ day: '', month: '', year: '' });
  const [monthRange, setMonthRange] = useState({ month: '', year: '' });
  const [range, setRange] = useState({ startDate: '', endDate: '' });

  const { date: dayDate, setDate: setDayDate, dateNumbersText: dayDateNumbersText, dateText: dayDateText } = useFormattedDate();

  const handleMonthYear = (type: 'month' | 'year', value: string) => {
    setMonthRange(prev => ({
      ...prev,
      [type]: type === 'month' ? String(padTo2Digits(i18n.monthNames[TranslationWidth.LONG]!.indexOf(value) + 1)) : value
    }));
  };

  const handlePeriod = (startDate: string, endDate: string) => {
    setRange(prev => ({
      ...prev,
      startDate,
      endDate
    }));
  };

  const { display, entityData, fetchData, fetchNextPage, fetchPrevPage, setEntityData }
    = useEntityData({
      category,
      rangeType: lapse,
      range: lapse === 'Día'
        ? { day: dayRange.day, month: dayRange.month, year: dayRange.year }
        : lapse === 'Mes'
          ? { month: monthRange.month, year: monthRange.year }
          : range
    });

  useEffect(() => {
    if (lapse === 'Día') {
      const sp = dayDateNumbersText.split('-');
      setDayRange({ day: sp[0], month: sp[1], year: sp[2] });
    }
  }, [dayDateNumbersText, lapse]);

  useEffect(() => {
    setEntityData(null);
    setLapse('');
    setDayRange({ day: '', month: '', year: '' });
    setMonthRange({ month: '', year: '' });
    setRange({ startDate: '', endDate: '' });
  }, [category]);

  const isButtonEnabled = () => {
    if (category === 'Usuarios') return true;

    if (!category || !lapse) return false;

    switch (lapse) {
      case 'Día':
        return dayRange.day && dayRange.month && dayRange.year;
      case 'Mes':
        return monthRange.month && monthRange.year;
      case 'Personalizado':
        return range.startDate && range.endDate;
      default:
        return false;
    }
  };

  return {
    category,
    dayDate,
    dayDateNumbersText,
    dayDateText,
    dayRange,
    display,
    entityData,
    lapse,
    monthRange,
    range,
    handleMonthYear,
    handlePeriod,
    fetchData,
    fetchNextPage,
    fetchPrevPage,
    isButtonEnabled,
    setCategory,
    setLapse,
    setDayRange,
    setMonthRange,
    setRange,
    setDayDate
  };
};
