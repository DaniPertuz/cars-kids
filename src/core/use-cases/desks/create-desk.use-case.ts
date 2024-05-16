import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { DeskAPIResponse } from '../../../infrastructure/interfaces';
import { Desk } from '../../entities';

export const createDeskUseCase = async (desk: Desk): Promise<DeskAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<DeskAPIResponse>('desks', desk);
    return { desk: data.desk };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al crear puesto de trabajo' };
  }
};
