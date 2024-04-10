import { Card, Layout, Modal } from '@ui-kitten/components';

import { DefaultInput } from '../../forms';
import { Headline, PrimaryButton, RadioGroupComponent, SelectComponent } from '../../ui';
import { useVehicleEntryModalData } from '../../../hooks';
import { IStatus, IVehicle } from '../../../../infrastructure/interfaces';
import { VehicleColorPicker } from '../VehicleColorPicker';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  vehicle?: IVehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const VehicleEntryModal = ({ vehicle, visible, setVisible }: Props) => {
  const {
    isAdmin,
    initialCategoryIndex,
    initialSizeValue,
    loading,
    vehicleState,
    handleStatus,
    handleVehicleCategory,
    handleVehicleColor,
    handleVehicleSize,
    handleNicknameChange,
    onSubmit
  } = useVehicleEntryModalData({ vehicle, visible, setVisible });

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card>
        <Layout style={styles.container}>
          <Headline text={vehicle ? 'Actualizar vehículo' : 'Nuevo vehículo'} textColor={globalStyles.colorOnyx} />
          <DefaultInput caption='Este valor es único' placeholder={'Nombre o apodo'} value={vehicleState.nickname} onChangeText={handleNicknameChange} />
          <RadioGroupComponent initialValue={initialCategoryIndex} list={['Carro', 'Moto']} handleSelection={handleVehicleCategory} />
          <SelectComponent placeholder='Tamaño' options={['Pequeño', 'Estándar', 'Grande']} handleSelection={handleVehicleSize} initialValue={initialSizeValue} />
          <VehicleColorPicker handleSelection={handleVehicleColor} initialValue={vehicle?.color || '#ffffff'} />
          {isAdmin && <RadioGroupComponent initialValue={vehicle ? vehicle.status === IStatus.Active ? 0 : 1 : 0} list={['Activo', 'Inactivo']} handleSelection={handleStatus} />}
          <PrimaryButton disabled={loading} text={vehicle ? 'Actualizar' : 'Agregar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
