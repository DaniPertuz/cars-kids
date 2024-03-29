import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import { DefaultInput } from '../../forms';
import { PrimaryButton, RadioGroupComponent, SelectComponent } from '../../ui';
import { IVehicle, IVehicleCategory, IVehicleSize } from '../../../../infrastructure/interfaces';
import { useVehicleStore } from '../../../store/vehicles/useVehicleStore';
import { styles } from './styles';

export const AddNewVehicleModal = ({ visible, setVisible }: { visible: boolean, setVisible: (visible: boolean) => void; }) => {
  const [form, setForm] = useState({
    nickname: '',
    color: ''
  });
  const [vehicleCategory, setVehicleCategory] = useState(IVehicleCategory.Car);
  const [vehicleSize, setVehicleSize] = useState(IVehicleSize.Medium);

  const { nickname, color } = form;

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

  const onSubmit = async () => {
    setVisible(false);
    const vehicle: IVehicle = {
      nickname,
      category: vehicleCategory,
      color: '',
      img: '',
      size: vehicleSize
    }

    await addVehicle(vehicle);
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card>
        <Layout style={{ gap: 10, width: 250 }}>
          <DefaultInput placeholder={'Nombre o apodo'} value={nickname} onChangeText={(nickname: string) => setForm({ ...form, nickname })} />
          <RadioGroupComponent list={['Carro', 'Moto']} handleSelection={handleVehicleCategory} />
          <SelectComponent placeholder='Tamaño' options={['Pequeño', 'Estándar', 'Grande']} handleSelection={handleVehicleSize} />
          <PrimaryButton text='Agregar' onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
