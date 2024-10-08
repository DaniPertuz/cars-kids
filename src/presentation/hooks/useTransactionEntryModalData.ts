import { useState, useEffect } from 'react';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { Desk, Purchase, Product, Rental, Vehicle } from '../../core/entities';
import { Fee, IPayment, Transaction, VehicleRentalTime } from '../../infrastructure/interfaces';
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

  const hasCustomRentalInfo = rental?.vehicle.rentalInfo?.find(info => {
    return (info.time === rental.time && info.price === rental.amount);
  });

  const [loading, setLoading] = useState(false);
  const [customPayment, setCustomPayment] = useState(false);
  const [isCustomRentalInfo, setIsCustomRentalInfo] = useState<boolean>(hasCustomRentalInfo !== undefined);
  const [customRentalAmount, setCustomRentalAmount] = useState(rental?.amount || 0);
  const [customRentalTime, setCustomRentalTime] = useState(rental?.time || 0);
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

  const handleCustomRentalAmount = (value: boolean) => {
    setIsCustomRentalInfo(value);
  };

  const handleVehicleRentalInfo = (time: number): VehicleRentalTime => {
    const rentalPrice = newRental.vehicle.rentalInfo?.find(info => info.time === time);
    return rentalPrice
      ? rentalPrice
      : {
        time: rental?.time!,
        price: rental?.amount!
      };
  };

  const handleRentalVehicle = (value: string) => {
    const selectedVehicle = vehicles.find(v => v.nickname === value);
    if (selectedVehicle && selectedVehicle !== newRental.vehicle) {
      updateTransactionState('vehicle', selectedVehicle, 'Rental');
    }
  };

  const handleRentalClient = (value: string) => {
    updateTransactionState('client', value, 'Rental');
  };

  const handleRentalException = (value: string) => {
    updateTransactionState('exception', value, 'Rental');
  };

  const handleRentalTime = (value: string) => {
    const rentalTime = parseInt(value, 10);
    updateTransactionState('time', rentalTime, 'Rental');
  };

  const handleRentalAmount = (value: string) => {
    const rentalAmount = parseInt(value, 10);
    updateTransactionState('amount', rentalAmount, 'Rental');
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

    setCustomPayment(value === 'Personalizado');
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
        if (fees[i].payment && fees[j].payment && (fees[i].payment === fees[j].payment)) {
          isDuplicated = true;
        }
      }
    }

    const accum = fees.reduce((acc: number, curr) => acc + curr.price, 0);
    const expectedAmount = transaction === 'Purchase' ? newPurchase.product.price : handleVehicleRentalInfo(newRental.time).price;

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
      (!customPayment && isEmptyObject(rental.payment)) ||
      isEmptyObject(rental.vehicle);
  };

  const showMessage = (message: string) => {
    setLoading(false);
    setVisible(false);
    SnackbarAdapter.showSnackbar(message);
  };

  const fieldValidations = (transaction: Transaction) => {
    if ((transaction === 'Purchase' && !newPurchase.desk) || (transaction === 'Rental' && !newRental.desk)) {
      showMessage('Puesto de trabajo no válido');
      return false;
    }

    if (transaction === 'Purchase' && isPurchaseInvalid(newPurchase)) {
      showMessage('Compra inválida');
      return false;
    }

    if (transaction === 'Rental' && isRentalInvalid(newRental)) {
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
          price: newPurchase.product.price * newPurchase.quantity,
          product: newPurchase.product,
          purchaseDate: newPurchase.purchaseDate,
          quantity: newPurchase.quantity
        };

        if (purchase) {
          const index = purchases.indexOf(purchase);
          updateTransaction(index, updatedPurchase, transaction);
          showMessage('Compra actualizada');
          return;
        }

        addTransaction(updatedPurchase, transaction);
      }

      if (transaction === 'Rental') {
        if (isCustomRentalInfo && (customRentalAmount === 0 || customRentalTime === 0 || !newRental.exception)) {
          showMessage('Alquiler personalizado inválido');
          setVisible(true);
          return;
        }

        const updatedRental: Rental = {
          ...rental,
          ...newRental,
          ...commonFields,
          client: newRental.client.trim() || 'NN',
          time: isCustomRentalInfo ? customRentalTime : newRental.time,
          date: newRental.date,
          vehicle: newRental.vehicle,
          amount: isCustomRentalInfo ? customRentalAmount : handleVehicleRentalInfo(newRental.time).price
        };

        if (rental) {
          const index = rentals.indexOf(rental);
          updateTransaction(index, updatedRental, transaction);
          showMessage('Alquiler actualizado');
          return;
        }

        addTransaction(updatedRental, transaction);
        setLoading(false);
        setVisible(false);
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
    customRentalAmount,
    customRentalTime,
    firstFee,
    loading,
    isCustomRentalInfo,
    newPurchase,
    newRental,
    products,
    secondFee,
    thirdFee,
    vehicles,
    convertPurchasePayment,
    handleCustomRentalAmount,
    handleProduct,
    handleQuantity,
    handlePayment,
    handleRentalAmount,
    handleRentalClient,
    handleRentalException,
    handleRentalTime,
    handleRentalVehicle,
    handleFeePayment,
    handleFeeValue,
    paymentOptions,
    quantityPurchases,
    setCustomRentalAmount,
    setCustomRentalTime,
    setFirstFee,
    setSecondFee,
    setThirdFee,
    onSubmit
  };
};
