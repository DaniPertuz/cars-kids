import { useWindowDimensions } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ReportsEntitiesList, ReportsListPagination, ReportsSelectComponentsGroup } from '../../../components/reports';
import { Back, PrimaryButton, TitleHeader } from '../../../components/ui';
import { useReportsDataHandling } from '../../../hooks';

import { globalStyles } from '../../../styles/global.styles';

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
    <Layout style={globalStyles.container}>
      <Layout style={{ paddingTop: height * 0.045, ...globalStyles.mainLayout }}>
        <Back top={top} />
        <TitleHeader text='Reportes' />
        <ReportsSelectComponentsGroup category={category} lapse={lapse} dayDate={dayDate} dayDateText={dayDateText} setCategory={setCategory} setDayDate={setDayDate} setLapse={setLapse} handleMonthYear={handleMonthYear} handlePeriod={handlePeriod} />
        {isButtonEnabled() &&
          <Layout style={{ ...globalStyles.mainMargin, ...globalStyles.mainBackground, marginTop: lapse === '' ? top : 0 }}>
            <PrimaryButton disabled={display} text={category === 'Usuarios' ? 'Listar' : 'Generar'} onPress={fetchData} />
          </Layout>
        }
        <ReportsEntitiesList category={category} entityData={entityData} />
        <Divider style={globalStyles.mainBackground} />
        {entityData && entityData.total !== 0 &&
          <ReportsListPagination bottom={bottom} category={category} entityData={entityData} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
        }
      </Layout>
    </Layout>
  );
};
