import { Purchase, Rental } from '../core/entities';
import { IPayment, RentalResponse } from '../infrastructure/interfaces';

interface PaymentTotals {
  title: string;
  total: number;
}

export const getCashPaymentTotal = (data: Purchase[] | Rental[]): PaymentTotals => {
  const cashPaymentTotal = data.reduce((acc: number, curr) => {
    if ('price' in curr) {
      const purchaseCurr = curr as Purchase;
      if (purchaseCurr.payment === IPayment.Cash) {
        return acc + purchaseCurr.price;
      }
    }
    if ('amount' in curr) {
      const rentalCurr = curr as Rental;
      if (rentalCurr.payment === IPayment.Cash) {
        return acc + rentalCurr.amount;
      }
    }
    return acc;
  }, 0);

  return {
    title: 'Efectivo',
    total: cashPaymentTotal,
  };
};

export const getTransferPaymentTotal = (data: Purchase[] | Rental[]): PaymentTotals => {
  const transferPaymentTotal = data.reduce((acc: number, curr) => {
    if ('price' in curr) {
      const purchaseCurr = curr as Purchase;
      if (purchaseCurr.payment !== IPayment.Cash) {
        return acc + purchaseCurr.price;
      }
    }
    if ('amount' in curr) {
      const rentalCurr = curr as Rental;
      if (rentalCurr.payment !== IPayment.Cash) {
        return acc + rentalCurr.amount;
      }
    }
    return acc;
  }, 0);

  return {
    title: 'Transferencias',
    total: transferPaymentTotal,
  };
};

export const getPurchasesBalance = (data: Purchase[]) => {
  const { totalCost, totalPrice } = data.reduce((acc, curr) => {
    const { product, quantity } = curr;
    const { cost, price } = product;

    acc.totalCost += cost * quantity;
    acc.totalPrice += price * quantity;

    return acc;
  }, { totalCost: 0, totalPrice: 0 });

  return {
    totalCost,
    totalPrice
  };
};

export const getTotalByVehicleNickname = (rentalsData: RentalResponse): { nickname: string; count: number; totalAmount: number; }[] => {
  const result: { [nickname: string]: { count: number; totalAmount: number; }; } = {};

  rentalsData.data.forEach(rental => {
    const { vehicle, amount } = rental;
    const { nickname } = vehicle;

    result[nickname] = result[nickname] || { count: 0, totalAmount: 0 };
    result[nickname].count++;
    result[nickname].totalAmount += amount;
  });

  return Object.entries(result).map(([nickname, { count, totalAmount }]) => ({
    nickname,
    count,
    totalAmount,
  })).sort((a, b) => b.count - a.count);
};
