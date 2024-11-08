import { useState, useEffect } from 'react';

import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { Vehicle } from '../../core/entities';
import * as VehicleUseCases from '../../core/use-cases/vehicles';
import { IVehicleCategory, IUserRole, IVehicleSize, IStatus, VehicleRentalTime } from '../../infrastructure/interfaces';
import { useUserInfo } from './useUserInfo';

interface Props {
  vehicle?: Vehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useVehicleEntryModalData = ({ vehicle, visible, setVisible }: Props) => {
  const init = {
    _id: '',
    nickname: '',
    category: '',
    img: '',
    size: '',
    color: '',
    status: IStatus.Active
  };
  const [loading, setLoading] = useState(false);
  const [vehicleObject, setVehicleObject] = useState({});
  const [timePriceBlocks, setTimePriceBlocks] = useState<VehicleRentalTime[]>(vehicle?.rentalInfo || [{ time: 0, price: 0 }]);
  const [vehicleState, setVehicleState] = useState<Vehicle>({
    _id: vehicle?._id || '',
    nickname: vehicle?.nickname.trim() || '',
    category: vehicle?.category || IVehicleCategory.Car,
    size: vehicle?.size || '',
    color: vehicle?.color || ''
  });
  const { user } = useUserInfo();
  const isAdmin = user?.role === IUserRole.Admin;
  const initialCategoryIndex = vehicle ? vehicle.category === IVehicleCategory.Car ? 0 : 1 : 0;
  const initialSizeValue = vehicle ? vehicle.size === IVehicleSize.XLarge ? 'Adultos' : vehicle.size === IVehicleSize.Large ? 'Grande' : vehicle.size === IVehicleSize.Medium ? 'Estándar' : 'Pequeño' : '';

  const handleFieldChange = (fieldName: keyof Vehicle, value: string | number) => {
    if (!visible) setVehicleObject({});

    setVehicleObject(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
    setVehicleState(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleVehicleCategory = (category: number) => {
    switch (category) {
      case 0:
        handleFieldChange('category', IVehicleCategory.Car);
        break;
      case 1:
        handleFieldChange('category', IVehicleCategory.Cycle);
        break;
    }
  };

  const handleVehicleSize = (size: string) => {
    switch (size) {
      case 'Pequeño':
        handleFieldChange('size', IVehicleSize.Small);
        break;
      case 'Estándar':
        handleFieldChange('size', IVehicleSize.Medium);
        break;
      case 'Grande':
        handleFieldChange('size', IVehicleSize.Large);
        break;
      case 'Adultos':
        handleFieldChange('size', IVehicleSize.XLarge);
        break;
    }
  };

  const handleStatus = (status: number) => {
    switch (status) {
      case 0:
        handleFieldChange('status', IStatus.Active);
        break;
      case 1:
        handleFieldChange('status', IStatus.Inactive);
        break;
    }
  };

  const handleVehicleColor = (color: string) => {
    handleFieldChange('color', color);
  };

  const handleNicknameChange = (nickname: string) => {
    handleFieldChange('nickname', nickname);
  };

  const handleBlockChange = (index: number, field: 'time' | 'price', value: number) => {
    setTimePriceBlocks(prevBlocks => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[index] = { ...updatedBlocks[index], [field]: value };
      return updatedBlocks;
    });
  };

  const addTimePriceBlock = () => {
    setTimePriceBlocks([...timePriceBlocks, { time: 0, price: 0 }]);
  };

  const removeTimePriceBlock = (index: number) => {
    setTimePriceBlocks(timePriceBlocks.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    setLoading(true);
    if ((vehicleState.category === IVehicleCategory.Cycle && vehicleState.size !== IVehicleSize.Medium) ||
      (vehicleState.category === IVehicleCategory.Car && vehicleState.size === IVehicleSize.Medium)) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(vehicleState.category === IVehicleCategory.Cycle ? 'Tamaño no válido para moto' : 'Tamaño no válido para carro');
      return;
    }

    const updatedVehicleState = {
      ...vehicleObject,
      rentalInfo: timePriceBlocks
    };

    const resp = vehicle ? await VehicleUseCases.updateVehicleUseCase(vehicle.nickname, updatedVehicleState as Vehicle) : await VehicleUseCases.addVehicleUseCase(updatedVehicleState as Vehicle);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    setLoading(false);
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
  };
};
