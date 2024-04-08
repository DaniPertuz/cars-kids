import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { BudgetAPIResponse, BudgetResponse, IBudget } from '../../infrastructure/interfaces';

export const getAllBudgets = async (url: string): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const getBudgetsByDay = async (day: string, month: string, year: string): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(`budgets/dates/day/${day}/${month}/${year}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const getBudgetsByMonth = async (url: string, date: string): Promise<BudgetAPIResponse> => {
  try {
    const split = date.split('-');
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${split[1]}/${split[2]}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const getBudgetsByPeriod = async (url: string, startingDate: string, endingDate: string): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${startingDate}/${endingDate}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const createBudget = async (budget: IBudget): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<BudgetAPIResponse>('budgets', budget);
    return { budget: data.budget };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const updateBudget = async (budget: IBudget): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<BudgetAPIResponse>(`budgets/${budget._id}`, budget);
    return { budget: data.budget };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const deleteBudget = async (budget: IBudget): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<BudgetAPIResponse>(`budgets/${budget._id}`);
    return { status: data.status };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};
