import { Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ReportsEntitiesList, ReportsListPagination, ReportsSelectComponentsGroup } from '../../../components/reports';
import { CustomDivider, PrimaryButton, Spacer, TopNavigation } from '../../../components/ui';
import { useCustomTheme, useReportsDataHandling } from '../../../hooks';

import { styles } from './styles';

export const ReportsScreen = () => {
  const { background } = useCustomTheme();
  const { top, bottom } = useSafeAreaInsets();
  const {
    category,
    dayDate,
    dayDateText,
    display,
    entityData,
    lapse,
    range,
    reportLapse,
    fetchData,
    fetchNextPage,
    fetchPrevPage,
    handleMonthYear,
    handlePeriod,
    isButtonEnabled,
    setCategory,
    setDayDate,
    setLapse
  } = useReportsDataHandling();

  return (
    <Layout style={[{ paddingTop: Platform.OS === 'ios' ? top + 10 : top + 20, ...styles.container }, background]}>
      <TopNavigation top={top} title='Reportes' />
      <Spacer height={20} />
      <CustomDivider />
      <Layout style={[styles.selectsButtonContainer, background]}>
        <ReportsSelectComponentsGroup category={category} lapse={lapse!} dayDate={dayDate} dayDateText={dayDateText} setCategory={setCategory} setDayDate={setDayDate} setLapse={setLapse} handleMonthYear={handleMonthYear} handlePeriod={handlePeriod} />
        {isButtonEnabled() &&
          <Layout style={[{ ...styles.buttonsContainer, marginTop: lapse === '' ? top : 0 }, background]}>
            <PrimaryButton disabled={display} text={'Generar'} onPress={fetchData} />
          </Layout>
        }
      </Layout>
      <Layout style={[styles.dataContainer, background]}>
        {entityData &&
          <Layout style={styles.container}>
            <Layout style={[styles.listContainer, background]}>
              <ReportsEntitiesList category={category} entityData={entityData} />
            </Layout>
            <Layout style={styles.flexOne}>
              <ReportsListPagination bottom={bottom} category={category} entityData={entityData} lapse={lapse!} reportLapse={reportLapse} range={range} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
            </Layout>
          </Layout>
        }
      </Layout>
    </Layout>
  );
};
