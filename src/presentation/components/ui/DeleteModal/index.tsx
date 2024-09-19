import { Card, Layout, Modal } from '@ui-kitten/components';

import { BasicButton, Callout, PrimaryButton } from '../';
import { Desk, Product, Purchase, Rental, User, Vehicle } from '../../../../core/entities';
import { useCustomTheme, useDeleteModal } from '../../../hooks';
import { IStatus } from '../../../../infrastructure/interfaces';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  desk?: Desk;
  product?: Product;
  purchase?: Purchase;
  rental?: Rental;
  user?: User;
  vehicle?: Vehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const DeleteModal = ({ desk, product, purchase, rental, user, vehicle, visible, setVisible }: Props) => {
  const { background } = useCustomTheme();
  const { loading, handleDeleteDesk, handleDeleteProduct, handleDeleteTransaction, handleDeleteUser, handleDeleteVehicle } = useDeleteModal({ desk, product, purchase, rental, user, vehicle, visible, setVisible });
  const startText = '¿Desea eliminar';

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card style={background}>
        <Layout style={[styles.container, background]}>
          <Layout style={[styles.titleContainer, background]}>
            <Layout style={[styles.closeButtonContainer, background]}>
              <BasicButton activeOpacity={1.0} iconName={'close-circle-outline'} fillColor={globalColors.primaryRed} size={{ height: 35, width: 35 }} onPress={() => setVisible(false)} />
            </Layout>
          </Layout>
          <Layout style={[styles.textContainer, background]}>
            {desk && <Callout text={`${startText} ${desk.name}?`} />}
            {product && <Callout text={`${startText} el producto ${product.name}?`} />}
            {purchase && <Callout text={`${startText} esta compra?`} />}
            {rental && <Callout text={`${startText} este alquiler?`} />}
            {user && <Callout text={`¿Desea ${user.status === IStatus.Active ? 'desactivar' : 'reactivar'} el usuario ${user.name}?`} />}
            {vehicle && <Callout text={`${startText} el vehículo ${vehicle.nickname}?`} />}
          </Layout>
          <PrimaryButton activeOpacity={0.6} disabled={loading} text={(purchase || desk || rental) ? 'Eliminar' : user?.status === IStatus.Inactive ? 'Reactivar' : 'Desactivar'} onPress={desk ? handleDeleteDesk : product ? handleDeleteProduct : (purchase || rental) ? handleDeleteTransaction : user ? handleDeleteUser : handleDeleteVehicle} />
        </Layout>
      </Card>
    </Modal>
  );
};
