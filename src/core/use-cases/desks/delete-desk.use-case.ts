import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { DeskAPIResponse } from '../../../infrastructure/interfaces';
import { Desk } from '../../entities';

export const deleteDeskUseCase = async (desk: Desk): Promise<DeskAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<DeskAPIResponse>(`desks/${desk.name}`);
    return { desk: data as Desk };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al eliminar puesto de trabajo' };
  }
};
