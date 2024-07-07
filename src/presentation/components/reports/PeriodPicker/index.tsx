import { useEffect, useState } from 'react';
import { Layout, RangeDatepicker } from '@ui-kitten/components';

import { useCustomTheme, useFormattedDate } from '../../../hooks';
import { localeDateService } from '../../../../utils';
import { Footnote } from '../../ui';
import { EditSelectedDate } from '../EditSelectedDate';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  handleSelectedRange: (startDate: string | undefined, endDate: string | undefined) => void;
}

export const PeriodPicker = ({ handleSelectedRange }: Props) => {
  const { background } = useCustomTheme();
  const [range, setRange] = useState<{ startDate?: Date | undefined, endDate?: Date | undefined; }>({
    startDate: undefined,
    endDate: undefined
  });

  const { setDate: setStartDate, dateNumbersText: startDateNumbersText, dateText: startDateText } = useFormattedDate();
  const { setDate: setEndDate, dateNumbersText: endDateNumbersText, dateText: endDateText } = useFormattedDate();

  const onSelectedRange = () => {
    if (typeof range.startDate !== 'undefined' && typeof range.endDate !== 'undefined') {
      setStartDate(range.startDate);
      setEndDate(range.endDate);
    }
  };

  const onReset = () => {
    setRange({ startDate: undefined, endDate: undefined });
    handleSelectedRange(undefined, undefined);
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
    <Layout style={[styles.container, background]}>
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
        <EditSelectedDate text={`${startDateText}\n${endDateText}`} onPress={onReset} />
      }
    </Layout>
  );
};
