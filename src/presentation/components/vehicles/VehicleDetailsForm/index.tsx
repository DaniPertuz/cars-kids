import { ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Vehicle } from '../../../../core/entities';
import { IStatus } from '../../../../infrastructure/interfaces';
import { useCustomTheme, useVehicleEntryModalData } from '../../../hooks';
import { DefaultInput } from '../../forms';
import { RadioGroupComponent, SelectComponent, PrimaryButton } from '../../ui';
import { VehicleColorPicker } from '../VehicleColorPicker';
import { VehicleTimePriceBlock } from '../VehicleTimePriceBlock';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  vehicle?: Vehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleSubmit: (loading: boolean) => void
}

export const VehicleDetailsForm = ({ vehicle, visible, setVisible, handleSubmit }: Props) => {
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

  const onFormSubmit = () => {
    handleSubmit(loading);
    onSubmit();
  };

  return (
    <Layout style={[globalStyles.mainMargin, background]}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1, paddingBottom: 120, gap: 10, marginVertical: 20 }}>
        <DefaultInput autoFocus={true} caption='Este valor es único' placeholder={'Nombre o apodo'} value={vehicleState.nickname} onChangeText={handleNicknameChange} />
        <RadioGroupComponent initialValue={initialCategoryIndex} list={['Carro', 'Moto']} handleSelection={handleVehicleCategory} />
        <SelectComponent placeholder='Tamaño' options={['Pequeño', 'Estándar', 'Grande', 'Adultos']} handleSelection={handleVehicleSize} initialValue={initialSizeValue} />
        <VehicleTimePriceBlock timePriceBlocks={timePriceBlocks.length > 0 ? timePriceBlocks : [{ price: 0, time: 0 }]} addTimePriceBlock={addTimePriceBlock} handleBlockChange={handleBlockChange} removeTimePriceBlock={removeTimePriceBlock} />
        <VehicleColorPicker handleSelection={handleVehicleColor} initialValue={vehicle?.color || '#ffffff'} />
        {isAdmin && <RadioGroupComponent initialValue={vehicle ? vehicle.status === IStatus.Active ? 0 : 1 : 0} list={['Activo', 'Inactivo']} handleSelection={handleStatus} />}
        <PrimaryButton disabled={loading} text={vehicle ? 'Actualizar' : 'Agregar'} onPress={vehicle ? onFormSubmit : onSubmit} />
      </ScrollView>
    </Layout>
  );
};
