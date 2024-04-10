import { useState, useEffect } from 'react';
import Snackbar from 'react-native-snackbar';
import { updateProduct, addProduct } from '../../actions/products';
import { IProduct, IStatus, IUserRole } from '../../infrastructure/interfaces';
import { useUserInfo } from './useUserInfo';

interface Props {
  product?: IProduct;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useProductEntryModalData = ({ product, visible, setVisible }: Props) => {
  const init: IProduct = {
    _id: '',
    name: '',
    cost: 0,
    price: 0,
    status: IStatus.Active,
  };
  const [loading, setLoading] = useState(false);
  const [productObject, setProductObject] = useState({});
  const [productState, setProductState] = useState<IProduct>({
    _id: product?._id || '',
    name: product?.name || '',
    cost: product?.cost || 0,
    price: product?.price || 0,
    status: product?.status || IStatus.Active
  });
  const { user } = useUserInfo();
  const isAdmin = user?.role === IUserRole.Admin;

  const handleFieldChange = (fieldName: keyof IProduct, value: string | number) => {
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

    const resp = product ? await updateProduct(product.name, productObject as IProduct) : await addProduct(productState);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    const actionText = product ? 'actualizado' : 'registrado';
    const successMessage = `Producto ${actionText} exitosamente`;

    setLoading(false);
    Snackbar.show({ text: successMessage, duration: Snackbar.LENGTH_SHORT });
    setVisible(false);
    setProductState(product ? productState : init);
  };

  useEffect(() => {
    if (!product && !visible) {
      setProductState({ ...productState, name: '' });
    }
  }, [product, visible]);

  useEffect(() => {
    console.log(productObject)
  }, [productObject]);

  return {
    loading,
    productState,
    isAdmin,
    handleFieldChange,
    handleStatus,
    onSubmit
  }
}
