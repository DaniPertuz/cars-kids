import { DateRange } from '../infrastructure/interfaces';

export const dayRangeValidation = (dateRange: DateRange) => {
  const { day, month, year } = dateRange;
  return typeof day !== 'undefined' && typeof month !== 'undefined' && typeof year !== 'undefined';
};

export const monthRangeValidation = (dateRange: DateRange) => {
  const { month, year } = dateRange;
  return typeof month !== 'undefined' && typeof year !== 'undefined';
};

export const periodRangeValidation = (dateRange: DateRange) => {
  const { startDate, endDate } = dateRange;
  return typeof startDate !== 'undefined' && typeof endDate !== 'undefined';
};

export const fullRangeValidation = (range: DateRange) => {
  return typeof range.day !== 'undefined' &&
    typeof range.month !== 'undefined' &&
    typeof range.year !== 'undefined' &&
    typeof range.startDate !== 'undefined' &&
    typeof range.endDate !== 'undefined';
};
