import { useState, useEffect } from 'react';
import Snackbar from 'react-native-snackbar';
import { Desk, Purchase, Product } from '../../core/entities';
import * as ProductUseCases from '../../core/use-cases/products';
import { Fee, IPayment, IStatus } from '../../infrastructure/interfaces';
import { paymentDescriptions } from '../../utils';
import { useTransactionStore } from '../store/transactions/useTransactionsStore';
import { useUserInfo } from './useUserInfo';

interface Props {
  desk: Desk;
  purchase?: Purchase;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const usePurchaseEntryModalData = ({ desk, purchase, visible, setVisible }: Props) => {
  const { user } = useUserInfo();
  const purchases = useTransactionStore(state => state.purchases);
  const addPurchase = useTransactionStore(state => state.addTransaction);
  const updatePurchase = useTransactionStore(state => state.updateTransaction);

  const initPurchase = {
    price: 0,
    payment: IPayment.Cash,
    product: {} as Product,
    purchaseDate: new Date(),
    quantity: 0,
    desk,
    user: user!
  };

  const [loading, setLoading] = useState(false);
  const [customPayment, setCustomPayment] = useState(false);
  const [firstFee, setFirstFee] = useState({ payment: IPayment.Cash, price: 0 });
  const [secondFee, setSecondFee] = useState({ payment: IPayment.Cash, price: 0 });
  const [thirdFee, setThirdFee] = useState({ payment: IPayment.Cash, price: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const [newPurchase, setNewPurchase] = useState<Purchase>(purchase ? purchase : initPurchase);

  const fetchProducts = async () => {
    const initialData = await ProductUseCases.getProductsUseCase(`products/status/${IStatus.Active}`);
    const allProducts = initialData.response?.total;

    const data = await ProductUseCases.getProductsUseCase(`products/status/${IStatus.Active}?limit=${allProducts}`);
    const productsData = data.response?.products ? data.response?.products : [];
    setProducts(productsData);
  };

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

  const handleDesk = () => {
    if (desk) {
      setNewPurchase(prevState => ({
        ...prevState,
        desk
      }));
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

  const handleQuantity = (value: string) => {
    setNewPurchase(prevState => ({
      ...prevState,
      quantity: parseInt(value, 10)
    }));
  };

  const handlePayment = (value: string) => {
    switch (value) {
      case 'Efectivo':
        setNewPurchase(prevState => ({
          ...prevState,
          payment: IPayment.Cash
        }));
        break;
      case 'Bancolombia':
        setNewPurchase(prevState => ({
          ...prevState,
          payment: IPayment.Bancolombia
        }));
        break;
      case 'Nequi':
        setNewPurchase(prevState => ({
          ...prevState,
          payment: IPayment.Nequi
        }));
        break;
      case 'Daviplata':
        setNewPurchase(prevState => ({
          ...prevState,
          payment: IPayment.Daviplata
        }));
        break;
      case 'Personalizado':
        setCustomPayment(true);
        break;
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
    setNewPurchase(prevState => ({
      ...prevState,
      user: user!
    }));
  };

  const handleFees = (fee: Fee) => ({
    ...newPurchase,
    price: fee.price,
    payment: fee.payment,
    purchaseDate: new Date()
  });

  const onSubmit = async () => {
    setLoading(true);

    if (newPurchase.desk?.name.length === 0) {
      setLoading(false);
      setVisible(false);
      Snackbar.show({ text: 'Puesto de trabajo no válido', duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (customPayment && !validateFees()) {
      setLoading(false);
      Snackbar.show({ text: 'Cuotas no son válidas', duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (customPayment && validateFees()) {
      if (firstFee.price > 0) {
        addPurchase(handleFees(firstFee), 'Purchase');
      }
      if (secondFee.price > 0) {
        addPurchase(handleFees(secondFee), 'Purchase');
      }
      if (thirdFee.price > 0) {
        addPurchase(handleFees(thirdFee), 'Purchase');
      }

      setLoading(false);
      setVisible(false);
      Snackbar.show({ text: 'Compra por cuotas agregada', duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (purchase) {
      const index = purchases.indexOf(purchase);
      const updatedPurchase = {
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

      updatePurchase(index, updatedPurchase, 'Purchase');
      setLoading(false);
      setVisible(false);
      Snackbar.show({ text: 'Compra actualizada', duration: Snackbar.LENGTH_SHORT });
      return;
    }

    addPurchase(newPurchase, 'Purchase');
    setLoading(false);
    setVisible(false);
    Snackbar.show({ text: 'Compra agregada', duration: Snackbar.LENGTH_SHORT });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleDesk();
  }, [desk]);

  useEffect(() => {
    handleUser();
  }, [user]);

  useEffect(() => {
    if (!visible) {
      setCustomPayment(false);
      setNewPurchase(initPurchase);
    }
  }, [visible]);

  return {
    customPayment,
    firstFee,
    loading,
    newPurchase,
    products,
    secondFee,
    thirdFee,
    convertPurchasePayment,
    handleProduct,
    handleQuantity,
    handlePayment,
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
