import { create } from 'zustand';
import { IBudget } from '../../../infrastructure/interfaces';
import { createBudget, deleteBudget, getAllBudgets, getBudgetsByDay, getBudgetsByMonth, getBudgetsByPeriod, updateBudget } from '../../../actions/budgets';

export interface BudgetState {
  reload: boolean;
  getAllBudgets: (url: string) => Promise<any>;
  getBudgetsByDay: (day: string, month: string, year: string) => Promise<any>;
  getBudgetsByMonth: (url: string, date: string) => Promise<any>;
  getBudgetsByPeriod: (url: string, startingDate: string, endingDate: string) => Promise<any>;
  addBudget: (budget: IBudget) => Promise<any>;
  updateBudget: (budget: IBudget) => Promise<any>;
  deleteBudget: (budget: IBudget) => Promise<any>;
  setReload: (value: boolean) => void;
}

export const useBudgetStore = create<BudgetState>()((set) => ({
  reload: false,
  getAllBudgets: async (url: string) => {
    const resp = await getAllBudgets(url);
    return resp;
  },
  getBudgetsByDay: async (day: string, month: string, year: string) => {
    const resp = await getBudgetsByDay(day, month, year);
    return resp;
  },
  getBudgetsByMonth: async (url: string, date: string) => {
    const resp = await getBudgetsByMonth(url, date);
    return resp;
  },
  getBudgetsByPeriod: async (url: string, startingDate: string, endingDate: string) => {
    const resp = await getBudgetsByPeriod(url, startingDate, endingDate);
    return resp;
  },
  addBudget: async (budget: IBudget) => {
    const resp = await createBudget(budget);
    return resp;
  },
  updateBudget: async (budget: IBudget) => {
    const resp = await updateBudget(budget);
    return resp;
  },
  deleteBudget: async (budget: IBudget) => {
    const resp = await deleteBudget(budget);
    return resp;
  },
  setReload: (value: boolean) => set({ reload: value })
}));
