import { Layout } from '@ui-kitten/components';
import { PickerComponent } from '../PickerComponent';
import { SelectComponent } from '../../ui';
import { styles } from './styles';

interface Props {
  category: string;
  lapse: string;
  dayDate: Date | undefined;
  dayDateText: string;
  setCategory: (value: string) => void;
  setDayDate: (value: Date | undefined) => void;
  setLapse: (value: string) => void;
  handleMonthYear: (type: 'month' | 'year', value: string) => void;
  handlePeriod: (startDate: string | undefined, endDate: string | undefined) => void;
}

export const ReportsSelectComponentsGroup = ({ category, lapse, dayDate, dayDateText, setCategory, setDayDate, setLapse, handleMonthYear, handlePeriod }: Props) => {
  return (
    <Layout style={styles.container}>
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
