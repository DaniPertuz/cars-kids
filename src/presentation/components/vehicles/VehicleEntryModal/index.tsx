import { ScrollView, StyleSheet } from 'react-native';
import { Card, Layout, Modal } from '@ui-kitten/components';

import { DefaultInput } from '../../forms';
import { Headline, ModalCloseButtonContainer, PrimaryButton, RadioGroupComponent, SelectComponent } from '../../ui';
import { useCustomTheme, useVehicleEntryModalData } from '../../../hooks';
import { Vehicle } from '../../../../core/entities';
import { IStatus } from '../../../../infrastructure/interfaces';
import { VehicleColorPicker } from '../VehicleColorPicker';
import { VehicleTimePriceBlock } from '../VehicleTimePriceBlock';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  vehicle?: Vehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const VehicleEntryModal = ({ vehicle, visible, setVisible }: Props) => {
  const { background } = useCustomTheme();
  const {
    isAdmin,
    initialCategoryIndex,
    initialSizeValue,
    loading,
    timePriceBlocks,
    vehicleState,
    addTimePriceBlock,
    handleBlockChange,
    handleStatus,
    handleVehicleCategory,
    handleVehicleColor,
    handleVehicleSize,
    handleNicknameChange,
    onSubmit,
    removeTimePriceBlock
  } = useVehicleEntryModalData({ vehicle, visible, setVisible });

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, maxHeight: 700, paddingBottom: 40 }}>
        <Card style={background}>
          <ModalCloseButtonContainer onPress={() => setVisible(false)} />
          <Layout style={[globalStyles.modalContainer, background]}>
            <Headline text={vehicle ? 'Actualizar vehículo' : 'Nuevo vehículo'} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, paddingBottom: 140, gap: 10 }}>
              <DefaultInput caption='Este valor es único' placeholder={'Nombre o apodo'} value={vehicleState.nickname} onChangeText={handleNicknameChange} />
              <RadioGroupComponent initialValue={initialCategoryIndex} list={['Carro', 'Moto']} handleSelection={handleVehicleCategory} />
              <SelectComponent placeholder='Tamaño' options={['Pequeño', 'Estándar', 'Grande', 'Adultos']} handleSelection={handleVehicleSize} initialValue={initialSizeValue} />
              <VehicleTimePriceBlock timePriceBlocks={timePriceBlocks} addTimePriceBlock={addTimePriceBlock} handleBlockChange={handleBlockChange} removeTimePriceBlock={removeTimePriceBlock} />
              <VehicleColorPicker handleSelection={handleVehicleColor} initialValue={vehicle?.color || '#ffffff'} />
              {isAdmin && <RadioGroupComponent initialValue={vehicle ? vehicle.status === IStatus.Active ? 0 : 1 : 0} list={['Activo', 'Inactivo']} handleSelection={handleStatus} />}
              <PrimaryButton disabled={loading} text={vehicle ? 'Actualizar' : 'Agregar'} onPress={onSubmit} />
            </ScrollView>
          </Layout>
        </Card>
      </ScrollView>
    </Modal>
  );
};
