import { Layout } from '@ui-kitten/components';
import { IUserRole } from '../../../../infrastructure/interfaces';
import { Callout, RadioGroupComponent, PrimaryButton } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  loading: boolean;
  initialUserIndex: 1 | 0;
  userEmail: string;
  handleUserRole: (value: number) => void;
  onUpdate: () => void;
}

export const UserEntryModalBody = ({ loading, initialUserIndex, userEmail, handleUserRole, onUpdate }: Props) => {
  return (
    <Layout style={globalStyles.modalContainer}>
      <Callout text={userEmail} />
      <RadioGroupComponent initialValue={initialUserIndex} list={[IUserRole.Admin, IUserRole.Editor]} handleSelection={handleUserRole} />
      <PrimaryButton disabled={loading} text={'Actualizar'} onPress={onUpdate} />
    </Layout>
  );
};
