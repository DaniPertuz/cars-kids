import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { Desk } from '../../entities';
import { DeskAPIResponse } from '../../../infrastructure/interfaces';

export const updateDeskUseCase = async (desk: Desk): Promise<DeskAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<DeskAPIResponse>(`desks/${desk.name}`, desk);
    return { desk: data.desk };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al actualizar puesto de trabajo');
  }
};
