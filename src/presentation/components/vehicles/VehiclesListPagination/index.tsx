import { Layout, Text } from '@ui-kitten/components';
import { VehiclesResponse } from '../../../../infrastructure/interfaces';
import { HeaderFive, NextButton, PrevButton } from '../../ui';
import { styles } from './styles';

interface Props {
  bottom: number;
  vehiclesData: VehiclesResponse;
}

export const VehiclesListPagination = ({ bottom, vehiclesData }: Props) => {
  return (
    <Layout style={{ ...styles.container, bottom: bottom + 20 }}>
      <PrevButton iconSize={30} onPress={() => { }} />
      <HeaderFive text={String(vehiclesData.page)} />
      <NextButton iconSize={30} onPress={() => { }} />
    </Layout>
  );
};
