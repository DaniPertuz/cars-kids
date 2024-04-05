import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { BudgetResponse, IBudget } from '../../infrastructure/interfaces';

export const getAllBudgets = async (url: string) => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(url);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const getBudgetsByDay = async (day: string, month: string, year: string) => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(`budgets/dates/day/${day}/${month}/${year}`);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const getBudgetsByMonth = async (url: string, date: string) => {
  try {
    const split = date.split('-');
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${split[1]}/${split[2]}`);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const getBudgetsByPeriod = async (url: string, startingDate: string, endingDate: string) => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${startingDate}/${endingDate}`);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const createBudget = async (budget: IBudget) => {
  try {
    const { data } = await carskidsApi.post<BudgetResponse>('budgets', budget);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const updateBudget = async (budget: IBudget) => {
  try {
    const { data } = await carskidsApi.put<BudgetResponse>(`budgets/${budget._id}`, budget);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const deleteBudget = async (budget: IBudget) => {
  try {
    const { data } = await carskidsApi.delete<BudgetResponse>(`budgets/${budget._id}`);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
