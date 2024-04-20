import { Layout } from '@ui-kitten/components';
import { PickerComponent } from '../PickerComponent';
import { SelectComponent } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';
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
  handlePeriod: (startDate: string, endDate: string) => void;
}

export const ReportsSelectComponentsGroup = ({ category, lapse, dayDate, dayDateText, setCategory, setDayDate, setLapse, handleMonthYear, handlePeriod }: Props) => {
  return (
    <Layout style={styles.container}>
      <SelectComponent placeholder='Categoría' options={['Alquileres', 'Compras', 'Presupuestos', 'Usuarios']} initialValue='' handleSelection={setCategory} />
      {(category.length !== 0 && category !== 'Usuarios') &&
        <>
          <SelectComponent placeholder='Lapso' options={['Día', 'Mes', 'Personalizado']} initialValue='' handleSelection={setLapse} />
          <PickerComponent lapse={lapse} dayDate={dayDate} dayDateText={dayDateText} setDayDate={setDayDate} handleMonthYear={handleMonthYear} handlePeriod={handlePeriod} />
        </>
      }
    </Layout>
  );
};
