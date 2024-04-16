import { useEffect, useState } from 'react';
import { Layout, RangeDatepicker } from '@ui-kitten/components';

import { EditSelectedDate } from '../EditSelectedDate';
import { Footnote } from '../../ui';
import { useFormattedDate } from '../../../hooks';
import { localeDateService } from '../../../../utils';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  handleSelectedRange: (startDate: string, endDate: string) => void;
}

export const PeriodPicker = ({ handleSelectedRange }: Props) => {
  const [range, setRange] = useState<{ startDate?: Date | null, endDate?: Date | null; }>({
    startDate: null,
    endDate: null
  });

  const { date: startDate, setDate: setStartDate, dateNumbersText: startDateNumbersText, dateText: startDateText } = useFormattedDate();
  const { date: endDate, setDate: setEndDate, dateNumbersText: endDateNumbersText, dateText: endDateText } = useFormattedDate();

  const onSelectedRange = () => {
    if (range.startDate && range.endDate) {
      setStartDate(range.startDate);
      setEndDate(range.endDate);
    }
  };

  useEffect(() => {
    onSelectedRange();
  }, [range]);

  useEffect(() => {
    if (range.endDate) {
      handleSelectedRange(startDateNumbersText, endDateNumbersText);
    }
  }, [startDateNumbersText, endDateNumbersText]);

  return (
    <Layout style={styles.container}>
      <Footnote text={'Rango'} />
      {!range.endDate
        ?
        <RangeDatepicker
          range={range}
          onSelect={nextRange => setRange(nextRange)}
          dateService={localeDateService}
          style={globalStyles.fullWidth}
        />
        :
        <EditSelectedDate text={`${startDateText}\n${endDateText}`} onPress={() => setRange({})} />
      }
    </Layout>
  );
};
