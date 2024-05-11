import { DayPicker } from '../DayPicker';
import { MonthPicker } from '../MonthPicker';
import { PeriodPicker } from '../PeriodPicker';

interface Props {
  lapse: string;
  dayDate: Date | undefined;
  dayDateText: string;
  setDayDate: (value: Date | undefined) => void;
  handleMonthYear: (type: 'month' | 'year', value: string) => void;
  handlePeriod: (startDate: string | undefined, endDate: string | undefined) => void;
}

export const PickerComponent = ({ lapse, dayDate, dayDateText, setDayDate, handleMonthYear, handlePeriod }: Props) => {
  switch (lapse) {
    case 'Día':
      return <DayPicker date={dayDate} dateText={dayDateText} setDate={setDayDate} />;
    case 'Mes':
      return <MonthPicker handleMonthYear={handleMonthYear} />;
    case 'Personalizado':
      return <PeriodPicker handleSelectedRange={handlePeriod} />;
    default:
      return null;
  }
};
