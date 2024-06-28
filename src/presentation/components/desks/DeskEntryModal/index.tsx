import { Card, Layout, Modal } from '@ui-kitten/components';
import { Desk } from '../../../../core/entities';
import { useDeskEntryModalData } from '../../../hooks';
import { DefaultInput } from '../../forms';
import { ModalTitle, PrimaryButton } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desk?: Desk;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const DeskEntryModal = ({ desk, visible, setVisible }: Props) => {
  const { loading, deskState, handleFieldChange, onSubmit } = useDeskEntryModalData({ desk, visible, setVisible });
  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={globalStyles.mainBackground}>
        <Layout style={globalStyles.modalContainer}>
          <ModalTitle setVisible={() => setVisible(false)} />
          <DefaultInput caption='Este valor es único' placeholder={'Nombre'} value={deskState.name} onChangeText={(name) => handleFieldChange('name', name)} />
          <PrimaryButton disabled={loading} text={desk ? 'Actualizar' : 'Agregar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
