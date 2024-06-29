import { Card, Layout, Modal } from '@ui-kitten/components';

import { DefaultInput } from '../../forms';
import { Headline, PrimaryButton, RadioGroupComponent, SelectComponent } from '../../ui';
import { useVehicleEntryModalData } from '../../../hooks';
import { Vehicle } from '../../../../core/entities';
import { IStatus } from '../../../../infrastructure/interfaces';
import { VehicleColorPicker } from '../VehicleColorPicker';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  vehicle?: Vehicle;
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
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={globalStyles.mainBackground}>
        <Layout style={globalStyles.modalContainer}>
          <Headline text={vehicle ? 'Actualizar vehículo' : 'Nuevo vehículo'} textColor={globalStyles.colorOnyx} />
          <DefaultInput caption='Este valor es único' placeholder={'Nombre o apodo'} value={vehicleState.nickname} onChangeText={handleNicknameChange} />
          <RadioGroupComponent initialValue={initialCategoryIndex} list={['Carro', 'Moto']} handleSelection={handleVehicleCategory} />
          <SelectComponent placeholder='Tamaño' options={['Pequeño', 'Estándar', 'Grande', 'Adultos']} handleSelection={handleVehicleSize} initialValue={initialSizeValue} />
          <VehicleColorPicker handleSelection={handleVehicleColor} initialValue={vehicle?.color || '#ffffff'} />
          {isAdmin && <RadioGroupComponent initialValue={vehicle ? vehicle.status === IStatus.Active ? 0 : 1 : 0} list={['Activo', 'Inactivo']} handleSelection={handleStatus} />}
          <PrimaryButton disabled={loading} text={vehicle ? 'Actualizar' : 'Agregar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
