import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import { SnackbarAdapter } from '../../../../config/adapters/snackbar.adapter';
import { User } from '../../../../core/entities';
import * as UserUseCases from '../../../../core/use-cases/users';
import { IUserRole } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { RadioGroupComponent, PrimaryButton, Callout } from '../../ui';
import { UserEntryModalTitle } from './UserEntryModalTitle';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  user: User;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const UserEntryModal = ({ user, visible, setVisible }: Props) => {
  const { background } = useCustomTheme();
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(IUserRole.Editor);
  const initialUserIndex = user.role === IUserRole.Admin ? 0 : 1;

  const handleUserRole = (category: number) => {
    switch (category) {
      case 0:
        setUserRole(IUserRole.Admin);
        break;
      case 1:
        setUserRole(IUserRole.Editor);
        break;
    }
  };

  const onUpdate = async () => {
    setLoading(true);

    const resp = await UserUseCases.updateUserRoleUseCase(user.email, userRole);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    if (resp.user) {
      setLoading(false);
      SnackbarAdapter.showSnackbar('Rol de usuario actualizado');
      setVisible(false);
    }
  };

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={background}>
        <UserEntryModalTitle title='Actualizar rol de usuario' onPress={() => setVisible(false)} />
        <Layout style={globalStyles.modalContainer}>
          <Callout text={user.email} />
          <RadioGroupComponent initialValue={initialUserIndex} list={[IUserRole.Admin, IUserRole.Editor]} handleSelection={handleUserRole} />
          <PrimaryButton disabled={loading} text={'Actualizar'} onPress={onUpdate} />
        </Layout>
      </Card>
    </Modal>
  );
};
