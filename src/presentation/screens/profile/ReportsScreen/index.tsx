import { useWindowDimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ReportsEntitiesList, ReportsListPagination, ReportsSelectComponentsGroup } from '../../../components/reports';
import { CustomDivider, PrimaryButton, TopNavigation } from '../../../components/ui';
import { useReportsDataHandling } from '../../../hooks';

import { styles } from './styles';

export const ReportsScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

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
    <Layout style={{ paddingTop: height * 0.045, ...styles.container }}>
      <Layout style={styles.container}>
        <TopNavigation top={0} title='Reportes' />
      </Layout>
      <CustomDivider />
      <Layout style={styles.selectsButtonContainer}>
        <ReportsSelectComponentsGroup category={category} lapse={lapse!} dayDate={dayDate} dayDateText={dayDateText} setCategory={setCategory} setDayDate={setDayDate} setLapse={setLapse} handleMonthYear={handleMonthYear} handlePeriod={handlePeriod} />
        {isButtonEnabled() &&
          <Layout style={{ ...styles.buttonsContainer, marginTop: lapse === '' ? top : 0 }}>
            <PrimaryButton disabled={display} text={'Generar'} onPress={fetchData} />
          </Layout>
        }
      </Layout>
      <Layout style={styles.dataContainer}>
        {entityData &&
          <Layout style={styles.container}>
            <Layout style={styles.listContainer}>
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
