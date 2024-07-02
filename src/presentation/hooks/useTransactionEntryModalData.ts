import { useState, useEffect } from 'react';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { Desk, Purchase, Product, Rental, Vehicle } from '../../core/entities';
import { Fee, IPayment, IVehicleSize, Transaction } from '../../infrastructure/interfaces';
import { paymentDescriptions } from '../../utils';
import { useTransactionStore } from '../store/transactions/useTransactionsStore';
import { useProductsStore } from '../store/products/useProductsStore';
import { useVehiclesStore } from '../store/vehicles/useVehiclesStore';
import { useUserInfo } from './useUserInfo';

interface Props {
  desk: Desk;
  purchase?: Purchase;
  rental?: Rental;
  setVisible: (visible: boolean) => void;
}

export const useTransactionEntryModalData = ({ desk, purchase, rental, setVisible }: Props) => {
  const { user } = useUserInfo();
  const purchases = useTransactionStore(state => state.purchases);
  const rentals = useTransactionStore(state => state.rentals);
  const addTransaction = useTransactionStore(state => state.addTransaction);
  const updateTransaction = useTransactionStore(state => state.updateTransaction);

  const initPurchase: Purchase = {
    price: 0,
    payment: {} as IPayment,
    product: {} as Product,
    purchaseDate: new Date(),
    quantity: 0,
    desk,
    user: user!
  };

  const initRental: Rental = {
    client: '',
    time: 0,
    date: new Date(),
    vehicle: {} as Vehicle,
    payment: {} as IPayment,
    amount: 0,
    desk,
    user: user!
  };

  const [loading, setLoading] = useState(false);
  const [customPayment, setCustomPayment] = useState(false);
  const [firstFee, setFirstFee] = useState({ payment: {} as IPayment, price: 0 });
  const [secondFee, setSecondFee] = useState({ payment: {} as IPayment, price: 0 });
  const [thirdFee, setThirdFee] = useState({ payment: {} as IPayment, price: 0 });
  const [newPurchase, setNewPurchase] = useState<Purchase>(purchase || initPurchase);
  const [newRental, setNewRental] = useState<Rental>(rental || initRental);
  const products = useProductsStore(state => state.products);
  const fetchTotalProducts = useProductsStore(state => state.fetchTotalProducts);
  const fetchProductsData = useProductsStore(state => state.fetchProductsData);
  const vehicles = useVehiclesStore(state => state.vehicles);
  const fetchTotalVehicles = useVehiclesStore(state => state.fetchTotalVehicles);
  const fetchVehiclesData = useVehiclesStore(state => state.fetchVehiclesData);

  const isEmptyObject = (obj: any) => Object.keys(obj).length === 0;

  const quantityPurchases = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    return numbers.map(number => number.toString());
  };

  const paymentOptions = () => {
    const options = [...Object.values(paymentDescriptions), 'Personalizado'];
    if (purchase) {
      options.pop();
    }
    return options;
  };

  const updateTransactionState = (field: string, value: any, transaction: Transaction) => {
    if (transaction === 'Purchase') {
      setNewPurchase(prevState => ({
        ...prevState,
        [field]: value
      }));
    }

    if (transaction === 'Rental') {
      setNewRental(prevState => ({
        ...prevState,
        [field]: value
      }));
    }
  };

  const handleDesk = () => {
    if (desk) {
      updateTransactionState('desk', desk, 'Purchase');
      updateTransactionState('desk', desk, 'Rental');
    }
  };

  const handleProduct = (value: string) => {
    const selectedProduct = products.find(p => p.name === value);
    if (selectedProduct) {
      updateTransactionState('product', selectedProduct, 'Purchase');
      updateTransactionState('price', selectedProduct.price, 'Purchase');
    }
  };

  const handleRentalAmount = (size: IVehicleSize, time: number) => {
    let rentalAmount: number = 0;
    switch (size) {
      case IVehicleSize.Small:
        rentalAmount = time === 15 ? 8000 : time === 20 ? 10000 : 15000;
        break;
      case IVehicleSize.Medium:
      case IVehicleSize.Large:
        rentalAmount = time === 15 ? 10000 : time === 20 ? 14000 : 18000;
        break;
      case IVehicleSize.XLarge:
        rentalAmount = time === 15 ? 15000 : time === 20 ? 20000 : 25000;
        break;
    }
    return rentalAmount;
  };

  const handleRentalVehicle = (value: string) => {
    const selectedVehicle = vehicles.find(v => v.nickname === value);
    if (selectedVehicle && selectedVehicle !== newRental.vehicle) {
      const amount = handleRentalAmount(selectedVehicle.size as IVehicleSize, newRental.time);
      updateTransactionState('vehicle', selectedVehicle, 'Rental');
      updateTransactionState('amount', amount, 'Rental');
    }
  };

  const handleRentalClient = (value: string) => {
    updateTransactionState('client', value, 'Rental');
    setNewRental(prevState => ({
      ...prevState,
      client: value
    }));
  };

  const handleRentalException = (value: string) => {
    updateTransactionState('exception', value, 'Rental');
    setNewRental(prevState => ({
      ...prevState,
      exception: value
    }));
  };

  const handleRentalTime = (value: string) => {
    const rentalTime = parseInt(value, 10);
    updateTransactionState('time', rentalTime, 'Rental');
  };

  const handleQuantity = (value: string, transaction: Transaction) => {
    const quantity = parseInt(value, 10);
    updateTransactionState('quantity', quantity, transaction);
  };

  const handlePayment = (value: string, transaction: Transaction) => {
    const paymentMethodMap: { [key: string]: IPayment; } = {
      'Efectivo': IPayment.Cash,
      'Bancolombia': IPayment.Bancolombia,
      'Nequi': IPayment.Nequi,
      'Daviplata': IPayment.Daviplata
    };

    const paymentMethod = paymentMethodMap[value];
    if (paymentMethod) {
      updateTransactionState('payment', paymentMethod, transaction);
    }

    if (value === 'Personalizado') {
      setCustomPayment(true);
    }
  };

  const convertPurchasePayment = (value: string): string => {
    let payment: string = '';
    switch (value) {
      case IPayment.Bancolombia:
        payment = 'Bancolombia';
        break;
      case IPayment.Daviplata:
        payment = 'Daviplata';
        break;
      case IPayment.Nequi:
        payment = 'Nequi';
        break;
      case IPayment.Cash:
        payment = 'Efectivo';
        break;
    }

    return payment;
  };

  const setFeeState = (feeSetter: React.Dispatch<React.SetStateAction<Fee>>, value: Partial<Fee>) => {
    feeSetter(prevState => ({
      ...prevState,
      ...value
    }));
  };

  const handleFeePayment = (feeSetter: React.Dispatch<React.SetStateAction<Fee>>, value: string) => {
    const paymentMethodMap: { [key: string]: IPayment; } = {
      'Efectivo': IPayment.Cash,
      'Bancolombia': IPayment.Bancolombia,
      'Nequi': IPayment.Nequi,
      'Daviplata': IPayment.Daviplata
    };

    const paymentMethod = paymentMethodMap[value];
    if (paymentMethod) {
      setFeeState(feeSetter, { payment: paymentMethod });
    }
  };

  const handleFeeValue = (feeSetter: React.Dispatch<React.SetStateAction<Fee>>, value: number) => {
    setFeeState(feeSetter, { price: value });
  };

  const validateFees = (transaction: Transaction) => {
    const fees = [firstFee, secondFee, thirdFee];
    let isDuplicated: boolean = false;

    for (let i = 0; i < fees.length; i++) {
      for (let j = i + 1; j < fees.length; j++) {
        if (fees[i].payment && fees[j].payment && fees[i].payment === fees[j].payment) {
          isDuplicated = true;
        }
      }
    }

    const accum = fees.reduce((acc: number, curr) => acc + curr.price, 0);
    const expectedAmount = transaction === 'Purchase' ? newPurchase.product.price : handleRentalAmount(newRental.vehicle.size as IVehicleSize, newRental.time);

    if (accum !== expectedAmount || isDuplicated) {
      return false;
    }

    return true;
  };

  const handleUser = () => {
    if (user) {
      updateTransactionState('user', user, 'Purchase');
      updateTransactionState('user', user, 'Rental');
    }
  };

  const handleFees = (fee: Fee, transaction: Transaction) => {
    switch (transaction) {
      case 'Purchase':
        return {
          ...newPurchase,
          price: fee.price,
          payment: fee.payment,
          purchaseDate: new Date()
        };
      case 'Rental':
        return {
          ...newRental,
          amount: fee.price,
          payment: fee.payment,
          date: new Date()
        };
    }
  };

  const isPurchaseInvalid = (purchase: Purchase) => {
    return purchase.quantity === 0 ||
      purchase.price === 0 ||
      isEmptyObject(purchase.payment) ||
      isEmptyObject(purchase.product);
  };

  const isRentalInvalid = (rental: Rental) => {
    return rental.time === 0 ||
      isEmptyObject(rental.payment) ||
      isEmptyObject(rental.vehicle);
  };

  const showMessage = (message: string) => {
    setLoading(false);
    setVisible(false);
    SnackbarAdapter.showSnackbar(message);
  };

  const fieldValidations = (transaction: Transaction) => {
    if (!newPurchase.desk || !newRental.desk) {
      showMessage('Puesto de trabajo no válido');
      return false;
    }

    if (transaction === 'Purchase' && isPurchaseInvalid(newPurchase) && !customPayment) {
      showMessage('Compra inválida');
      return false;
    }

    if (transaction === 'Rental' && isRentalInvalid(newRental) && !customPayment) {
      showMessage('Alquiler inválido');
      return false;
    }

    if (customPayment && !validateFees(transaction)) {
      showMessage('Cuotas no son válidas');
      return false;
    }

    return true;
  };

  const onSubmit = async (transaction: Transaction) => {
    setLoading(true);
    try {
      if (!fieldValidations(transaction)) {
        setVisible(true);
        return;
      }

      if (customPayment && validateFees(transaction)) {
        [firstFee, secondFee, thirdFee].forEach((fee) => {
          if (fee.price > 0) {
            addTransaction(handleFees(fee, transaction), transaction);
          }
        });
        showMessage(`${transaction === 'Purchase' ? 'Compra' : 'Alquiler'} por cuotas agregada`);
        return;
      }

      const commonFields = {
        desk: transaction === 'Purchase' ? newPurchase.desk : newRental.desk,
        payment: transaction === 'Purchase' ? newPurchase.payment : newRental.payment,
        user: transaction === 'Purchase' ? newPurchase.user : newRental.user,
      };

      if (transaction === 'Purchase') {
        const updatedPurchase: Purchase = {
          ...purchase,
          ...newPurchase,
          ...commonFields,
          price: newPurchase.price,
          product: newPurchase.product,
          purchaseDate: newPurchase.purchaseDate,
          quantity: newPurchase.quantity,
        };

        if (purchase) {
          const index = purchases.indexOf(purchase);
          updateTransaction(index, updatedPurchase, transaction);
          showMessage('Compra actualizada');
          return;
        }

        addTransaction(updatedPurchase, transaction);
        showMessage('Compra agregada');
      }

      if (transaction === 'Rental') {
        const updatedRental: Rental = {
          ...rental,
          ...newRental,
          ...commonFields,
          client: newRental.client || 'NN',
          time: newRental.time!,
          date: newRental.date,
          vehicle: newRental.vehicle,
          amount: newRental.amount!,
        };

        if (rental) {
          const index = rentals.indexOf(rental);
          updateTransaction(index, updatedRental, transaction);
          showMessage('Alquiler actualizado');
          return;
        }

        addTransaction(updatedRental, transaction);
        showMessage('Alquiler agregado');
      }
    } catch (error) {
      showMessage('Error al procesar la transacción');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await fetchTotalProducts();
    await fetchProductsData();
    await fetchTotalVehicles();
    await fetchVehiclesData();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleDesk();
  }, [desk]);

  useEffect(() => {
    if (user) handleUser();
  }, [user]);

  return {
    customPayment,
    firstFee,
    loading,
    newPurchase,
    newRental,
    products,
    secondFee,
    thirdFee,
    vehicles,
    convertPurchasePayment,
    handleProduct,
    handleQuantity,
    handlePayment,
    handleRentalClient,
    handleRentalException,
    handleRentalTime,
    handleRentalVehicle,
    handleFeePayment,
    handleFeeValue,
    paymentOptions,
    quantityPurchases,
    setFirstFee,
    setSecondFee,
    setThirdFee,
    onSubmit
  };
};
