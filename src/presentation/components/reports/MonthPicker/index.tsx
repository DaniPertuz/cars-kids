import { useState } from 'react';
import { Layout, TranslationWidth } from '@ui-kitten/components';

import { EditSelectedDate } from '../EditSelectedDate';
import { Footnote, SelectComponent } from '../../ui';
import { i18n } from '../../../../utils';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  handleMonthYear: (type: "month" | "year", value: string) => void;
}

export const MonthPicker = ({ handleMonthYear }: Props) => {
  const [monthDate, setMonthDate] = useState('');
  const [yearDate, setYearDate] = useState('');

  const onMonthChange = (value: string) => {
    handleMonthYear('month', value);
    setMonthDate(value);
  };

  const onYearChange = (value: string) => {
    handleMonthYear('year', value);
    setYearDate(value);
  };

  const reset = () => {
    setMonthDate('');
    setYearDate('');
  };

  return (
    <Layout style={styles.container}>
      {monthDate !== '' && yearDate !== ''
        ?
        <Layout style={globalStyles.mainBackground}>
          <Footnote text={'Mes'} />
          <EditSelectedDate text={`${monthDate} de ${yearDate}`} onPress={reset} />
        </Layout>
        :
        <>
          <SelectComponent placeholder='Mes' options={i18n.monthNames[TranslationWidth.LONG]!} initialValue='' handleSelection={onMonthChange} />
          <SelectComponent placeholder='Año' options={['2024']} initialValue='' handleSelection={onYearChange} />
        </>
      }
    </Layout>
  );
};
