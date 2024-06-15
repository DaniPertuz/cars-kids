import { useEffect, useState } from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { adaptApiResponse } from '../../config/adapters/api-response-adapter';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { Purchase, Rental } from '../../core/entities';
import * as BudgetUseCases from '../../core/use-cases/budget';
import { BudgetResponse, DateRange, PurchaseResponse, RentalResponse } from '../../infrastructure/interfaces';
import { getCashPaymentTotal, getPurchasesBalance, getTotalByDesk, getTotalByVehicleNickname, getTransferPaymentTotal, imageUrl, imageUrl2, paymentDescriptions } from '../../utils';
import { useEntityData } from './useEntityData';
import { useFormattedDate } from './useFormattedDate';
import { globalColors } from '../theme/globalColors';

interface Props {
  category: string;
  range: DateRange;
  lapse: string;
  reportLapse: string;
  total: number;
}

export const useGeneratePDF = ({ category, range, lapse, reportLapse, total }: Props) => {
  const [dayBudget, setDayBudget] = useState<BudgetResponse>();
  const { addedTime, extractTimeFromStringDate, formatDateNumbersOnly } = useFormattedDate();

  const { entityData, fetchData } = useEntityData({
    category,
    range,
    rangeType: lapse,
    pagination: { page: 1, limit: total }
  });

  useEffect(() => {
    const generateData = async () => {
      await fetchData();
    };

    generateData();
  }, [category, range, lapse, reportLapse, total]);

  const generateBudget = async () => {
    const resp = await getDailyBudget();
    if (resp) {
      const adaptedResponse = adaptApiResponse(resp);
      setDayBudget(adaptedResponse as BudgetResponse);
    }
  };

  const getDailyBudget = async (): Promise<BudgetResponse> => {
    const budget = await BudgetUseCases.getBudgetsByDayUseCase('budgets/dates/day', range.day!, range.month!, range.year!, { page: 1, limit: 1 });
    return budget?.response!;
  };

  const htmlStyles = () => {
    return `
      <style>
        html {
          -webkit-print-color-adjust: exact;
        }

        * {
          font-family: Verdana;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th, td {
          border: 1px solid black;
          font-size: 8px;
          padding: 8px;
          text-align: left;
        }

        td {
          white-space: nowrap;
        }

        td:last-child {
          white-space: normal;
        }

        th {
          background-color: #E92E29;
          color: #FFFFFF;
          font-weight: 100;
        }

        #main {
          padding: 8px;
        }

        .img-header {
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        @media print {
          .pagebreak { clear: both; break-after: always; }
        }
      </style>
    `;
  };

  const htmlHeader = (title: string) => {
    return `
      <div class='img-header'>
        <img src="${imageUrl}" width="280" height="150" />
        <img src="${imageUrl2}" width="360" height="120" />
      </div>
      <div style='display: flex; flex-direction: row; justify-content: center;'>
        <h4>${title} - ${reportLapse}</h4>
      </div>
    `;
  };

  const fileOptions = {
    fileName: `${category === 'Alquileres' ? 'Pedidos' : 'Accesorios'} - ${reportLapse}`,
    directory: 'Documents/cars-kids',
    paddingBottom: 40,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 25,
    bgColor: globalColors.background
  };

  const fetchRentalsData = (rentalsData: RentalResponse) => {
    const cashPaymentTotal = rentalsData ? getCashPaymentTotal(rentalsData.data) : { title: '', total: 0 };
    const transferPaymentTotal = rentalsData ? getTransferPaymentTotal(rentalsData.data) : { title: '', total: 0 };
    const totalAmount = rentalsData ? rentalsData.sum : 0;
    const desksFilter = getTotalByDesk(rentalsData);
    const vehiclesFilter = getTotalByVehicleNickname(rentalsData);
    const rentalsTableHeaders: string[] = ['Fecha', 'Cliente', 'Tiempo', 'Hora Inicial', 'Hora Final', 'Vehículo', 'Forma de pago', 'Monto', 'Puesto de trabajo', 'Usuario', 'Observación'];
    const vehiclesTableHeaders: string[] = ['Vehículo', 'Cantidad', 'Venta'];
    const budgetTableHeaders: string[] = ['Base', 'Préstamos', 'Gastos', 'Nómina'];

    if (lapse === 'Día' && range.day) {
      generateBudget();
    }

    const options = {
      html: `
        ${htmlStyles()}
        <div id='main' class='pagebreak'>
          ${htmlHeader('PEDIDOS')}
          <div style='width: auto; display: flex; flex-direction: row; justify-content: ${lapse === 'Día' ? 'space-between' : 'space-around'};'>
            <table style='width: auto;'>
              <tr>
                <th colspan="2">Consolidado de ventas</th>
              </tr>
              <tr>
                <td>Cantidad</td>
                <td>${rentalsData.total}</td>
              </tr>
              <tr>
                <td>${cashPaymentTotal.title}</td>
                <td>${cashPaymentTotal.total > 0 ? `${cashPaymentTotal.total}` : '0'}</td>
              </tr>
              <tr>
                <td>${transferPaymentTotal.title}</td>
                <td>${transferPaymentTotal.total > 0 ? `${transferPaymentTotal.total}` : '0'}</td>
              </tr>
              <tr>
                <th>Total</th>
                <th>${totalAmount}</th>
              </tr>
            </table>
            <table style='width: auto;'>
              <tr>
                ${vehiclesTableHeaders.map(header => `<th>${header}</th>`).join('')}
              </tr>
              ${vehiclesFilter.map((vehicle) => (
                `
                <tr>
                  <td>${vehicle.nickname}</td>
                  <td>${vehicle.count}</td>
                  <td>${vehicle.totalAmount}</td>
                </tr>`
              )).join('')}
            </table>
            <table style='height: 50%; width: auto;'>
              <tr>
                ${['Puesto de trabajo', 'Cantidad'].map(header => `<th>${header}</th>`).join('')}
              </tr>
              ${desksFilter.map((desk) => (
                `<tr>
                  <td>${desk.name}</td>
                  <td>${desk.count}</td>
                </tr>`
              )).join('')}
            </table>
            ${(lapse === 'Día')
          ?
          `
            <table style='height: 50%; width: auto;'>
              <tr>
                <th>${budgetTableHeaders[0]}</th>
                <td>${dayBudget?.data[0].base || 0}</td>
              </tr>
              <tr>
                <th>${budgetTableHeaders[1]}</th>
                <td>${dayBudget?.data[0].loans || 0}</td>
              </tr>
              <tr>
                <th>${budgetTableHeaders[2]}</th>
                <td>${dayBudget?.data[0].expenses || 0}</td>
              </tr>
              <tr>
                <th>${budgetTableHeaders[3]}</th>
                <td>${dayBudget?.data[0].payroll || 0}</td>
              </tr>
            </table>
          `
          :
          ``
        }
          </div>
          <br /><br />
          <table>
            <tr>
              ${rentalsTableHeaders.map(header => `<th>${header}</th>`).join('')}
            </tr>
            ${rentalsData.data.map((rental: Rental) => {
              const payment = paymentDescriptions[rental.payment];
              const startingHour = extractTimeFromStringDate(rental.date);
              const endingHour = addedTime(rental.date, rental.time);
              return `<tr>
                        <td>${formatDateNumbersOnly(new Date(rental.date))}</td>
                        <td>${rental.client}</td>
                        <td>${rental.time}</td>
                        <td>${startingHour}</td>
                        <td>${endingHour}</td>
                        <td>${rental.vehicle.nickname}</td>
                        <td>${payment}</td>
                        <td>${rental.amount}</td>
                        <td>${rental.desk.name}</td>
                        <td>${rental.user.name}</td>
                        <td>${rental.exception ?? ''}</td>
                      </tr>`;
                    }).join('')}
          </table>
        </div>
      `,
      ...fileOptions
    };

    return options;
  };

  const fetchPurchasesData = (purchasesData: PurchaseResponse) => {
    const cashPaymentTotal = purchasesData ? getCashPaymentTotal(purchasesData.data) : { title: '', total: 0 };
    const transferPaymentTotal = purchasesData ? getTransferPaymentTotal(purchasesData.data) : { title: '', total: 0 };
    const totalAmount = purchasesData ? purchasesData.sum : 0;
    const { totalCost, totalPrice } = getPurchasesBalance(purchasesData.data);
    const purchasesTableHeaders: string[] = ['Fecha', 'Producto', 'Costo', 'Cantidad', 'Forma de pago', 'Precio', 'Puesto de trabajo', 'Usuario'];

    const options = {
      html: `
          ${htmlStyles()}
          <div id='main' class='pagebreak'>
            ${htmlHeader('ACCESORIOS')}
            <div style='width: auto; display: flex; flex-direction: row; justify-content: space-around;'>
              <table style='width: auto;'>
                <tr>
                  <td>Cantidad</td>
                  <td>${purchasesData.total}</td>
                </tr>
                <tr>
                  <td>${cashPaymentTotal.title}</td>
                  <td>${cashPaymentTotal.total > 0 ? `${cashPaymentTotal.total}` : '0'}</td>
                </tr>
                <tr>
                  <td>${transferPaymentTotal.title}</td>
                  <td>${transferPaymentTotal.total > 0 ? `${transferPaymentTotal.total}` : '0'}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>${totalAmount}</th>
                </tr>
              </table>
              <table style='width: auto;'>
                <tr>
                  <td>Total de costos</td>
                  <td>${totalCost}</td>
                </tr>
                <tr>
                  <td>Total de venta</td>
                  <td>${totalPrice}</td>
                </tr>
                <tr>
                  <td>Utilidad</td>
                  <td>${totalPrice - totalCost}</td>
                </tr>
              </table>
            </div>
            <br /><br />
            <table>
              <tr>
                ${purchasesTableHeaders.map(header => `<th>${header}</th>`).join('')}
              </tr>          
              ${purchasesData.data.map((purchase: Purchase) => {
                const payment = paymentDescriptions[purchase.payment];
                return `<tr>
                          <td>${formatDateNumbersOnly(new Date(purchase.purchaseDate))}</td>
                          <td>${purchase.product.name}</td>
                          <td>${purchase.product.cost}</td>
                          <td>${purchase.quantity}</td>
                          <td>${payment}</td>
                          <td>${purchase.price}</td>
                          <td>${purchase.desk.name}</td>
                          <td>${purchase.user.name}</td>
                        </tr>`;
                }).join('')}
            </table>
          </div>
      `,
      ...fileOptions
    };

    return options;
  };

  const generatePDF = async () => {
    let options: any;

    if ('rentals' in entityData.response) {
      const rentalsData = adaptApiResponse(entityData.response);
      options = fetchRentalsData(rentalsData as RentalResponse);
    }

    if ('purchases' in entityData.response) {
      const purchasesData = adaptApiResponse(entityData.response);
      options = fetchPurchasesData(purchasesData as PurchaseResponse);
    }

    const file = await RNHTMLtoPDF.convert(options);

    if (file.filePath) {
      SnackbarAdapter.showSnackbar(`Archivo ${category === 'Alquileres' ? 'Pedidos' : 'Accesorios'} - ${reportLapse}.pdf generado exitosamente`);
    }
  };

  return { generatePDF };
};
