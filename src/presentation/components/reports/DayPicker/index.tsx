import { Layout, Datepicker } from '@ui-kitten/components';

import { EditSelectedDate } from '../EditSelectedDate';
import { Footnote, CustomIcon } from '../../ui';
import { localeDateService } from '../../../../utils';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  date: Date | undefined;
  dateText: string;
  setDate: (value: Date | undefined) => void;
}

export const DayPicker = ({ date, dateText, setDate }: Props) => {

  return (
    <Layout style={styles.container}>
      <Footnote text={'Fecha'} />
      {!date && (
        <Datepicker
          date={date}
          onSelect={setDate}
          dateService={localeDateService}
          placeholder='Ingrese fecha'
          accessoryRight={() => <CustomIcon name='calendar' fillColor={globalColors.darkDisabled} />}
        />
      )}
      {date &&
        <EditSelectedDate text={dateText} onPress={() => setDate(undefined)} />
      }
    </Layout>
  );
};
