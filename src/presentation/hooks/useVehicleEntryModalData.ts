import { useState, useEffect } from 'react';
import Snackbar from 'react-native-snackbar';
import { updateVehicle, addVehicle } from '../../actions/vehicles';
import { IVehicle, IVehicleCategory, IUserRole, IVehicleSize, IStatus } from '../../infrastructure/interfaces';
import { useUserInfo } from './useUserInfo';

interface Props {
  vehicle?: IVehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useVehicleEntryModalData = ({ vehicle, visible, setVisible }: Props) => {
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
  const { user } = useUserInfo();
  const isAdmin = user?.role === IUserRole.Admin;
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

  const handleStatus = (status: number) => {
    switch (status) {
      case 0:
        setVehicleState({
          ...vehicleState,
          status: IStatus.Active
        });
        break;
      case 1:
        setVehicleState({
          ...vehicleState,
          status: IStatus.Inactive
        });
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

  return {
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
  }
}