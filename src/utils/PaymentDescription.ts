import { IPayment } from '../infrastructure/interfaces';

export const paymentDescriptions = {
  [IPayment.Cash]: 'Efectivo',
  [IPayment.Bancolombia]: 'Bancolombia',
  [IPayment.Daviplata]: 'Daviplata',
  [IPayment.Nequi]: 'Nequi'
};
