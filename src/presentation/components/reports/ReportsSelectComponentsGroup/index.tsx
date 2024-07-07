import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { SelectComponent } from '../../ui';
import { PickerComponent } from '../PickerComponent';
import { styles } from './styles';

interface Props {
  category: string;
  lapse: string;
  dayDate: Date | undefined;
  dayDateText: string;
  setCategory: (value: string) => void;
  setDayDate: (value: Date | undefined) => void;
  setLapse: (value: string) => void;
  handleMonthYear: (type: 'month' | 'year', value: string | undefined) => void;
  handlePeriod: (startDate: string | undefined, endDate: string | undefined) => void;
}

export const ReportsSelectComponentsGroup = ({ category, lapse, dayDate, dayDateText, setCategory, setDayDate, setLapse, handleMonthYear, handlePeriod }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.container, background]}>
      <SelectComponent placeholder='Categoría' options={['Alquileres', 'Compras', 'Presupuestos']} initialValue='' handleSelection={setCategory} />
      {category &&
        <>
          <SelectComponent placeholder='Lapso' options={['Día', 'Mes', 'Personalizado']} initialValue={lapse} handleSelection={setLapse} />
          <PickerComponent lapse={lapse} dayDate={dayDate} dayDateText={dayDateText} setDayDate={setDayDate} handleMonthYear={handleMonthYear} handlePeriod={handlePeriod} />
        </>
      }
    </Layout>
  );
};
