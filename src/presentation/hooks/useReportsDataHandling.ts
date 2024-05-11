import { useState, useEffect } from 'react';
import { TranslationWidth } from '@ui-kitten/components';
import { useEntityData } from './useEntityData';
import { useFormattedDate } from './useFormattedDate';
import { DateRange } from '../../infrastructure/interfaces';
import { padTo2Digits, i18n } from '../../utils';

export const useReportsDataHandling = () => {
  const [category, setCategory] = useState<string>('');
  const [lapse, setLapse] = useState<string | undefined>('');
  const [reportLapse, setReportLapse] = useState<string>('');
  const [range, setRange] = useState<DateRange>({ day: undefined, month: undefined, year: undefined, startDate: undefined, endDate: undefined });

  const { display, entityData, fetchData, fetchNextPage, fetchPrevPage, setEntityData }
    = useEntityData({
      category,
      rangeType: lapse,
      range: lapse === 'Día'
        ? { day: range.day, month: range.month, year: range.year }
        : lapse === 'Mes'
          ? { month: range.month, year: range.year }
          : { startDate: range.startDate, endDate: range.endDate }
    });
  const { date: dayDate, setDate: setDayDate, dateNumbersText: dayDateNumbersText, dateText: dayDateText, formatDateString } = useFormattedDate();

  const handleMonthYear = (type: 'month' | 'year', value: string) => {
    const updatedMonth = type === 'month' ? String(padTo2Digits(i18n.monthNames[TranslationWidth.LONG]!.indexOf(value) + 1)) : range.month;
    setRange(prev => ({
      ...prev,
      [type]: type === 'month' ? updatedMonth : value
    }));
  };

  const handlePeriod = (startDate: string | undefined, endDate: string | undefined) => {
    setRange(prev => ({
      ...prev,
      startDate,
      endDate
    }));
  };

  const handleReportLapse = () => {
    let updatedReportLapse = '';
    switch (lapse) {
      case 'Día':
        updatedReportLapse = dayDateText;
        break;
      case 'Mes':
        const selectedMonth = i18n.monthNames[TranslationWidth.LONG]?.at(Number(range.month) - 1);
        updatedReportLapse = `${selectedMonth} de ${range.year}`;
        break;
      case 'Personalizado':
        if (typeof range.startDate !== 'undefined' && typeof range.endDate !== 'undefined') {
          const [dayStart, monthStart, yearStart] = range?.startDate!.split("-").map(Number);
          const [dayEnd, monthEnd, yearEnd] = range?.endDate!.split("-").map(Number);
          const formattedStartDate = formatDateString(new Date(yearStart, monthStart - 1, dayStart));
          const formattedEndDate = formatDateString(new Date(yearEnd, monthEnd - 1, dayEnd));
          updatedReportLapse = `${formattedStartDate} - ${formattedEndDate}`;
        }
        break;
    }
    setReportLapse(updatedReportLapse);
  };

  const isButtonEnabled = () => {
    const isRangeDefined = typeof range.day !== 'undefined' &&
      typeof range.month !== 'undefined' &&
      typeof range.year !== 'undefined' &&
      typeof range.startDate !== 'undefined' &&
      typeof range.endDate !== 'undefined';

    if (!category || !lapse || isRangeDefined)
      return false;

    switch (lapse) {
      case 'Día':
        return typeof range.day !== 'undefined' && typeof range.month !== 'undefined' && typeof range.year !== 'undefined';
      case 'Mes':
        return typeof range.month !== 'undefined' && typeof range.year !== 'undefined';
      case 'Personalizado':
        return typeof range.startDate !== 'undefined' && typeof range.endDate !== 'undefined';
    }
  };

  useEffect(() => {
    if (lapse === 'Día' && typeof dayDate !== 'undefined') {
      const sp = dayDateNumbersText.split('-');
      setRange({ day: sp[0], month: sp[1], year: sp[2] });
    }
  }, [dayDateNumbersText, lapse, dayDate]);

  useEffect(() => {
    setEntityData(null);
    setLapse(undefined);
    setRange({ day: undefined, month: undefined, year: undefined, startDate: undefined, endDate: undefined });
  }, [category]);

  useEffect(() => {
    handleReportLapse();
  }, [lapse, dayDateText, range]);

  return {
    category,
    dayDate,
    dayDateNumbersText,
    dayDateText,
    display,
    entityData,
    lapse,
    range,
    reportLapse,
    handleMonthYear,
    handlePeriod,
    fetchData,
    fetchNextPage,
    fetchPrevPage,
    isButtonEnabled,
    setCategory,
    setLapse,
    setRange,
    setDayDate
  };
};
