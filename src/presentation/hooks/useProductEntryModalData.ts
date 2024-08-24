import { useState, useEffect } from 'react';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { Product } from '../../core/entities';
import * as ProductUseCases from '../../core/use-cases/products';
import { IStatus, IUserRole } from '../../infrastructure/interfaces';
import { useUserInfo } from './useUserInfo';

interface Props {
  product?: Product;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useProductEntryModalData = ({ product, visible, setVisible }: Props) => {
  const init: Product = {
    _id: '',
    name: '',
    cost: 0,
    price: 0,
    status: IStatus.Active,
  };
  const [loading, setLoading] = useState(false);
  const [productObject, setProductObject] = useState({});
  const [productState, setProductState] = useState<Product>({
    _id: product?._id || '',
    name: product?.name.trim() || '',
    cost: product?.cost || 0,
    price: product?.price || 0,
    status: product?.status || IStatus.Active
  });
  const { user } = useUserInfo();
  const isAdmin = user?.role === IUserRole.Admin;

  const handleFieldChange = (fieldName: keyof Product, value: string | number) => {
    if (!visible) setProductObject({});

    setProductObject(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
    setProductState(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleStatus = (status: number) => {
    switch (status) {
      case 0:
        setProductState({
          ...productState,
          status: IStatus.Active
        });
        break;
      case 1:
        setProductState({
          ...productState,
          status: IStatus.Inactive
        });
        break;
    }
  };

  const onSubmit = async () => {
    setLoading(true);

    if (productState.cost >= productState.price) {
      setLoading(false);
      SnackbarAdapter.showSnackbar('Costo debe ser menor a precio de venta');
      return;
    }

    const resp = product ? await ProductUseCases.updateProductUseCase(product.name, productObject as Product) : await ProductUseCases.addProductUseCase(productState);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }
    
    const actionText = product ? 'actualizado' : 'registrado';
    const successMessage = `Producto ${actionText} exitosamente`;
    
    setLoading(false);
    setVisible(false);
    SnackbarAdapter.showSnackbar(successMessage);
    setProductObject(init);
    setProductState(product ? productState : init);
  };

  useEffect(() => {
    if (!product && !visible) {
      setProductState({ ...productState, name: '' });
    }
  }, [product, visible]);

  return {
    loading,
    productState,
    isAdmin,
    handleFieldChange,
    handleStatus,
    onSubmit
  }
}
