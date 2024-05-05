import { Layout } from '@ui-kitten/components';
import { EditButton } from '../../ui';
import { Budget } from '../../../../core/entities';
import { styles } from './styles';

export const BudgetActions = ({ budget }: { budget: Budget; }) => {
  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} budget={budget} />
    </Layout>
  );
};
