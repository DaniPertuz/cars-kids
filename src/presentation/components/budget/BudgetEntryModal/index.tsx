import { Card, Layout, Modal } from '@ui-kitten/components';

import { NumericInput } from '../../forms';
import { Headline, PrimaryButton } from '../../ui';
import { useBudgetEntryModalData } from '../../../hooks';
import { Budget } from '../../../../core/entities';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  budget: Budget;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const BudgetEntryModal = ({ budget, visible, setVisible }: Props) => {
  const { loading, budgetState, handleFieldChange, onSubmit } = useBudgetEntryModalData({ budget, visible, setVisible });

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card>
        <Layout style={globalStyles.modalContainer}>
          <Headline text={'Actualizar presupuesto'} textColor={globalStyles.colorOnyx} />
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
