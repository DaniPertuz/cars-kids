import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { DefaultInput } from '../../forms';
import { Headline, PrimaryButton, RadioGroupComponent, SelectComponent } from '../../ui';
import { IVehicle, IVehicleCategory, IVehicleSize } from '../../../../infrastructure/interfaces';
import { useVehicleStore } from '../../../store/vehicles/useVehicleStore';
import { VehicleColorPicker } from '../VehicleColorPicker';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

export const AddEditVehicleModal = ({ visible, setVisible }: { visible: boolean, setVisible: (visible: boolean) => void; }) => {
  const [loading, setLoading] = useState(false);
  const [vehicleNickname, setVehicleNickname] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState(IVehicleCategory.Car);
  const [vehicleSize, setVehicleSize] = useState('');
  const [vehicleColor, setVehicleColor] = useState<string>('');

  const { addVehicle } = useVehicleStore();

  const handleVehicleCategory = (category: number) => {
    switch (category) {
      case 0:
        setVehicleCategory(IVehicleCategory.Car);
        break;
      case 1:
        setVehicleCategory(IVehicleCategory.Cycle);
        break;
    }
  };

  const handleVehicleSize = (size: string) => {
    switch (size) {
      case 'Pequeño':
        setVehicleSize(IVehicleSize.Small);
        break;
      case 'Estándar':
        setVehicleSize(IVehicleSize.Medium);
        break;
      case 'Grande':
        setVehicleSize(IVehicleSize.Large);
        break;
    }
  };

  const handleVehicleColor = (color: string) => {
    setVehicleColor(color);
  };

  const onSubmit = async () => {
    setLoading(true);
    const vehicle: IVehicle = {
      nickname: vehicleNickname,
      category: vehicleCategory,
      color: vehicleColor,
      size: vehicleSize
    };

    const resp = await addVehicle(vehicle);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    setLoading(false);
    Snackbar.show({ text: 'Vehículo registrado exitosamente', duration: Snackbar.LENGTH_SHORT });
    setVisible(false);
    setVehicleNickname('');
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card>
        <Layout style={styles.container}>
          <Headline text='Nuevo vehículo' textColor={globalStyles.colorOnyx} />
          <DefaultInput caption='Este valor es único' placeholder={'Nombre o apodo'} value={vehicleNickname} onChangeText={setVehicleNickname} />
          <RadioGroupComponent list={['Carro', 'Moto']} handleSelection={handleVehicleCategory} />
          <SelectComponent placeholder='Tamaño' options={['Pequeño', 'Estándar', 'Grande']} handleSelection={handleVehicleSize} />
          <VehicleColorPicker handleSelection={handleVehicleColor} />
          <PrimaryButton disabled={loading} text='Agregar' onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
