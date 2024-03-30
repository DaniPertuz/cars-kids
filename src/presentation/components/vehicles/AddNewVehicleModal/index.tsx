import { useEffect, useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { DefaultInput } from '../../forms';
import { Headline, PrimaryButton, RadioGroupComponent, SelectComponent } from '../../ui';
import { IVehicle, IVehicleCategory, IVehicleSize } from '../../../../infrastructure/interfaces';
import { useVehicleStore } from '../../../store/vehicles/useVehicleStore';
import { VehicleColorPicker } from '../VehicleColorPicker';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const AddNewVehicleModal = ({ visible, setVisible }: Props) => {
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<IVehicle>({
    nickname: '',
    category: '',
    size: '',
    color: '',
  });

  const { addVehicle, updateVehicle } = useVehicleStore();

  const handleVehicleCategory = (category: number) => {
    switch (category) {
      case 0:
        setVehicle({ ...vehicle, category: IVehicleCategory.Car });
        break;
      case 1:
        setVehicle({ ...vehicle, category: IVehicleCategory.Cycle });
        break;
    }
  };

  const handleVehicleSize = (size: string) => {
    switch (size) {
      case 'Pequeño':
        setVehicle({ ...vehicle, size: IVehicleSize.Small });
        break;
      case 'Estándar':
        setVehicle({ ...vehicle, size: IVehicleSize.Medium });
        break;
      case 'Grande':
        setVehicle({ ...vehicle, size: IVehicleSize.Large });
        break;
    }
  };

  const handleVehicleColor = (color: string) => {
    setVehicle({ ...vehicle, color });
  };

  const onSubmit = async () => {
    setLoading(true);

    const resp = await addVehicle(vehicle);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    setLoading(false);
    Snackbar.show({ text: `Vehículo ${vehicle ? 'actualizado' : 'registrado'} exitosamente`, duration: Snackbar.LENGTH_SHORT });
    setVisible(false);
    setVehicle({ ...vehicle, nickname: '' });
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
          <DefaultInput caption='Este valor es único' placeholder={'Nombre o apodo'} value={vehicle.nickname} onChangeText={(nickname: string) => setVehicle({ ...vehicle, nickname })} />
          <RadioGroupComponent list={['Carro', 'Moto']} handleSelection={handleVehicleCategory} />
          <SelectComponent placeholder='Tamaño' options={['Pequeño', 'Estándar', 'Grande']} handleSelection={handleVehicleSize} />
          <VehicleColorPicker handleSelection={handleVehicleColor} />
          <PrimaryButton disabled={loading} text='Agregar' onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
