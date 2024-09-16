import { useState } from 'react';
import { Card, Modal } from '@ui-kitten/components';
import { SnackbarAdapter } from '../../../../config/adapters/snackbar.adapter';
import { User } from '../../../../core/entities';
import * as UserUseCases from '../../../../core/use-cases/users';
import { IUserRole } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { EntryModalTitle } from '../../ui';
import { UserEntryModalBody } from '../UserEntryModalBody';
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
        <EntryModalTitle title='Actualizar rol de usuario' onPress={() => setVisible(false)} />
        <UserEntryModalBody userEmail={user.email} initialUserIndex={initialUserIndex} loading={loading} handleUserRole={handleUserRole} onUpdate={onUpdate} />
      </Card>
    </Modal>
  );
};
