import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { RadioGroupComponent, PrimaryButton, HeaderFive, Callout } from '../../ui';
import { User } from '../../../../core/entities';
import * as UserUseCases from '../../../../core/use-cases/users';
import { IUserRole } from '../../../../infrastructure/interfaces';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  user: User;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const UserEntryModal = ({ user, visible, setVisible }: Props) => {
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
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (resp.user) {
      setLoading(false);
      Snackbar.show({ text: 'Rol de usuario actualizado', duration: Snackbar.LENGTH_SHORT });
      setVisible(false);
    }
  };

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card>
        <Layout style={globalStyles.modalContainer}>
          <HeaderFive text={'Actualizar rol de usuario'} />
          <Callout text={user.email} />
          <RadioGroupComponent initialValue={initialUserIndex} list={[IUserRole.Admin, IUserRole.Editor]} handleSelection={handleUserRole} />
          <PrimaryButton disabled={loading} text={'Actualizar'} onPress={onUpdate} />
        </Layout>
      </Card>
    </Modal>
  );
};
