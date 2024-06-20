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
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useTransactionEntryModalData = ({ desk, purchase, rental, visible, setVisible }: Props) => {
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
  const [newPurchase, setNewPurchase] = useState<Purchase>(purchase ? purchase : initPurchase);
  const [newRental, setNewRental] = useState<Rental>(rental ? rental : initRental);
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

  const updateBothTransactionStates = (updates: Partial<Purchase & Rental>, transaction?: Transaction) => {
    if (transaction === 'Purchase') {
      setNewPurchase(prevState => ({
        ...prevState,
        ...updates
      }));
    }

    if (transaction === 'Rental') {
      setNewRental(prevState => ({
        ...prevState,
        ...updates
      }));
    }
  };

  const handleDesk = () => {
    if (desk) {
      updateBothTransactionStates({ desk }, 'Purchase');
      updateBothTransactionStates({ desk }, 'Rental');
    }
  };

  const handleProduct = (value: string) => {
    const selectedProduct = products.find(p => p.name === value);
    if (selectedProduct) {
      setNewPurchase(prevState => ({
        ...prevState,
        price: selectedProduct.price,
        product: selectedProduct
      }));
    }
  };

  const handleRentalAmount = (value: IVehicleSize) => {
    let rentalAmount: number = 0;
    const time = newRental.time;

    switch (value) {
      case IVehicleSize.Small:
        rentalAmount = time === 15 ? 8000 : time === 20 ? 10000 : 15000;
        break;
      case IVehicleSize.Medium:
      case IVehicleSize.Large:
        rentalAmount = time === 15 ? 10000 : time === 20 ? 14000 : 18000;
        break;
    }

    return rentalAmount;
  };

  const handleRentalClient = (value: string) => {
    setNewRental(prevState => ({
      ...prevState,
      client: value
    }));
  };

  const handleRentalTime = (value: string) => {
    const rentalTime = parseInt(value, 10);
    setNewRental(prevState => ({
      ...prevState,
      time: rentalTime
    }));
  };

  const handleRentalVehicle = (value: string) => {
    const selectedVehicle = vehicles.find(v => v.nickname === value);
    if (selectedVehicle && selectedVehicle !== newRental.vehicle) {
      setNewRental(prevState => ({
        ...prevState,
        amount: handleRentalAmount(selectedVehicle.size as IVehicleSize),
        vehicle: selectedVehicle
      }));
    }
  };

  const handleQuantity = (value: string, transaction: Transaction) => {
    const quantity = parseInt(value, 10);
    updateBothTransactionStates({ quantity }, transaction);
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
      updateBothTransactionStates({ payment: paymentMethod }, transaction);
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

  const validateFees = () => {
    const fees = [firstFee, secondFee, thirdFee];
    const accum = fees.reduce((acc: number, curr) => acc + curr.price, 0);
    return newPurchase.product.price === accum;
  };

  const handleUser = () => {
    if (user) {
      updateBothTransactionStates({ user }, 'Purchase');
      updateBothTransactionStates({ user }, 'Rental');
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

  const showError = (message: string) => {
    setLoading(false);
    setVisible(false);
    SnackbarAdapter.showSnackbar(message);
  };

  const fieldValidations = (transaction: Transaction) => {
    if (newPurchase.desk?.name.length === 0) {
      showError('Puesto de trabajo no válido');
      return false;
    }

    if (customPayment && !validateFees()) {
      showError('Cuotas no son válidas');
      return false;
    }

    if (transaction === 'Purchase' && isPurchaseInvalid(newPurchase)) {
      showError('Compra inválida');
      return false;
    }

    if (transaction === 'Rental' && isRentalInvalid(newRental)) {
      showError('Alquiler inválido');
      return false;
    }

    if (customPayment && validateFees()) {
      [firstFee, secondFee, thirdFee].forEach((fee) => {
        if (fee.price > 0) {
          addTransaction(handleFees(fee, transaction), transaction);
        }
      });

      setLoading(false);
      setVisible(false);
      SnackbarAdapter.showSnackbar(`${transaction === 'Purchase' ? 'Compra' : 'Alquiler'} por cuotas agregada`);
      return false;
    }

    return true;
  };

  const onSubmit = async (transaction: Transaction) => {
    setLoading(true);

    if (!fieldValidations(transaction)) {
      return;
    }

    if (transaction === 'Purchase') {
      if (purchase) {
        const index = purchases.indexOf(purchase);
        const updatedPurchase: Purchase = {
          ...purchase,
          ...newPurchase,
          desk: newPurchase.desk || purchase.desk,
          payment: newPurchase.payment || purchase.payment,
          price: newPurchase.price || purchase.price,
          product: Object.keys(newPurchase.product).length ? newPurchase.product : purchase.product,
          purchaseDate: newPurchase.purchaseDate || purchase.purchaseDate,
          quantity: newPurchase.quantity || purchase.quantity,
          user: newPurchase.user || purchase.user,
        };

        updateTransaction(index, updatedPurchase, transaction);
        setLoading(false);
        setVisible(false);
        SnackbarAdapter.showSnackbar('Compra actualizada');
        return;
      }

      addTransaction(newPurchase, transaction);
      setLoading(false);
      setVisible(false);
      SnackbarAdapter.showSnackbar('Compra agregada');
      return;
    }

    if (transaction === 'Rental') {
      const updatedRental: Rental = {
        ...rental,
        ...newRental,
        client: newRental.client || rental?.client || 'NN',
        time: newRental.time || rental?.time!,
        date: newRental.date || rental?.date,
        vehicle: newRental.vehicle || rental?.vehicle,
        payment: newRental.payment || rental?.payment,
        amount: newRental.amount || rental?.amount!,
        desk: newRental.desk || rental?.desk,
        user: newRental.user || rental?.user
      };

      if (rental) {
        const index = rentals.indexOf(rental);
        updateTransaction(index, updatedRental, transaction);
      } else {
        addTransaction(updatedRental, transaction);
      }

      setLoading(false);
      setVisible(false);
      SnackbarAdapter.showSnackbar(rental ? 'Alquiler actualizado' : 'Alquiler agregado');
      return;
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
    handleUser();
  }, [user]);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  useEffect(() => {
    if (!visible) {
      setCustomPayment(false);
      setNewPurchase(initPurchase);
      setNewRental(initRental);
    }
  }, [visible]);

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
