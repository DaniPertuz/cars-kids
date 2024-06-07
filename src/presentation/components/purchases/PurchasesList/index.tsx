import { StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { Purchase } from '../../../../core/entities';
import { PurchasesListItem } from '../PurchasesListItem';
import { globalStyles } from '../../../styles/global.styles';

export const PurchasesList = ({ purchases }: { purchases: Purchase[]; }) => {
  return (
    <List
      data={purchases}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      renderItem={({ item }) => <PurchasesListItem purchase={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainBackground,
    marginVertical: 5
  }
});
