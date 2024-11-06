import { ScrollView } from 'react-native';
import { Card, Layout, Modal } from '@ui-kitten/components';

import { useCustomTheme } from '../../../hooks';
import { Headline, ModalCloseButtonContainer } from '../../ui';
import { VehicleDetailsForm } from '../VehicleDetailsForm';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const VehicleEntryModal = ({ visible, setVisible }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, maxHeight: 700, paddingBottom: 40 }}>
        <Card style={background}>
          <ModalCloseButtonContainer onPress={() => setVisible(false)} />
          <Layout style={[globalStyles.modalContainer, background]}>
            <Headline text={'Agregar vehículo'} />
            <VehicleDetailsForm visible={visible} setVisible={setVisible} />
          </Layout>
        </Card>
      </ScrollView>
    </Modal>
  );
};
