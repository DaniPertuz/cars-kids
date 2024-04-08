import { useEffect, useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { DefaultInput } from '../../forms';
import { Headline, PrimaryButton, RadioGroupComponent, SelectComponent } from '../../ui';
import { IVehicle, IVehicleCategory, IVehicleSize } from '../../../../infrastructure/interfaces';
import { addVehicle, updateVehicle } from '../../../../actions/vehicles';
import { VehicleColorPicker } from '../VehicleColorPicker';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  vehicle?: IVehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const VehicleEntryModal = ({ vehicle, visible, setVisible }: Props) => {
  const init = {
    _id: '',
    nickname: '',
    category: '',
    size: '',
    color: '',
  };
  const [loading, setLoading] = useState(false);
  const [vehicleState, setVehicleState] = useState<IVehicle>({
    _id: vehicle?._id || '',
    nickname: vehicle?.nickname || '',
    category: vehicle?.category || IVehicleCategory.Car,
    size: vehicle?.size || '',
    color: vehicle?.color || '',
  });
  const initialCategoryIndex = vehicle ? vehicle.category === IVehicleCategory.Car ? 0 : 1 : 0;
  const initialSizeValue = vehicle ? vehicle.size === IVehicleSize.Large ? 'Grande' : vehicle.size === IVehicleSize.Medium ? 'Estándar' : 'Pequeño' : '';

  const handleVehicleCategory = (category: number) => {
    switch (category) {
      case 0:
        setVehicleState({ ...vehicleState, category: IVehicleCategory.Car });
        break;
      case 1:
        setVehicleState({ ...vehicleState, category: IVehicleCategory.Cycle });
        break;
    }
  };

  const handleVehicleSize = (size: string) => {
    switch (size) {
      case 'Pequeño':
        setVehicleState({ ...vehicleState, size: IVehicleSize.Small });
        break;
      case 'Estándar':
        setVehicleState({ ...vehicleState, size: IVehicleSize.Medium });
        break;
      case 'Grande':
        setVehicleState({ ...vehicleState, size: IVehicleSize.Large });
        break;
    }
  };

  const handleVehicleColor = (color: string) => {
    setVehicleState({ ...vehicleState, color });
  };

  const handleNicknameChange = (nickname: string) => {
    setVehicleState(vehicle ? { ...vehicle, nickname } : { ...vehicleState, nickname });
  };

  const onSubmit = async () => {
    setLoading(true);
    if ((vehicleState.category === IVehicleCategory.Cycle && vehicleState.size !== IVehicleSize.Medium) ||
      (vehicleState.category === IVehicleCategory.Car && vehicleState.size === IVehicleSize.Medium)) {
      setLoading(false);
      Snackbar.show({ text: vehicleState.category === IVehicleCategory.Cycle ? 'Tamaño no válido para moto' : 'Tamaño no válido para carro', duration: Snackbar.LENGTH_SHORT });
      return;
    }

    const resp = vehicle ? await updateVehicle(vehicle.nickname, vehicleState) : await addVehicle(vehicleState);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    const actionText = vehicle ? 'actualizado' : 'registrado';
    const successMessage = `Vehículo ${actionText} exitosamente`;

    setLoading(false);
    Snackbar.show({ text: successMessage, duration: Snackbar.LENGTH_SHORT });
    setVisible(false);
    setVehicleState(vehicle ? vehicleState : init);
  };

  useEffect(() => {
    if (!vehicle && !visible) {
      setVehicleState({ ...vehicleState, nickname: '' });
    }
  }, [vehicle, visible]);

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card>
        <Layout style={styles.container}>
          <Headline text={vehicle ? 'Actualizar vehículo' : 'Nuevo vehículo'} textColor={globalStyles.colorOnyx} />
          <DefaultInput caption='Este valor es único' placeholder={'Nombre o apodo'} value={vehicleState.nickname} onChangeText={handleNicknameChange} />
          <RadioGroupComponent initialValue={initialCategoryIndex} list={['Carro', 'Moto']} handleSelection={handleVehicleCategory} />
          <SelectComponent placeholder='Tamaño' options={['Pequeño', 'Estándar', 'Grande']} handleSelection={handleVehicleSize} initialValue={initialSizeValue} />
          <VehicleColorPicker handleSelection={handleVehicleColor} initialValue={vehicle?.color || '#ffffff'} />
          <PrimaryButton disabled={loading} text={vehicle ? 'Actualizar' : 'Agregar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
