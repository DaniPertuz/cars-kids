import { Card, Layout, Modal } from '@ui-kitten/components';

import { NumericInput } from '../../forms';
import { ModalTitle, PrimaryButton } from '../../ui';
import { useBudgetEntryModalData, useCustomTheme } from '../../../hooks';
import { Budget } from '../../../../core/entities';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  budget: Budget;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const BudgetEntryModal = ({ budget, visible, setVisible }: Props) => {
  const { background } = useCustomTheme();
  const { loading, budgetState, handleFieldChange, onSubmit } = useBudgetEntryModalData({ budget, visible, setVisible });

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={closeModal}>
      <Card style={background}>
        <Layout style={[globalStyles.modalContainer, background]}>
          <ModalTitle budget={budget} setVisible={closeModal} />
          <NumericInput caption='Base' placeholder='' value={budgetState.base} onChangeText={(base) => handleFieldChange('base', base)} />
          <NumericInput caption='Préstamos' placeholder='' value={budgetState.loans} onChangeText={(loans) => handleFieldChange('loans', loans)} />
          <NumericInput caption='Gastos' placeholder='' value={budgetState.expenses} onChangeText={(expenses) => handleFieldChange('expenses', expenses)} />
          <NumericInput caption='Nómina' placeholder='' value={budgetState.payroll} onChangeText={(payroll) => handleFieldChange('payroll', payroll)} />
          <PrimaryButton disabled={loading} text={'Actualizar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
