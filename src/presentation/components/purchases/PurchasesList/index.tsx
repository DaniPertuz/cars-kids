import { StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { Purchase } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { PurchasesListItem } from '../PurchasesListItem';

export const PurchasesList = ({ purchases }: { purchases: Purchase[]; }) => {
  const { background } = useCustomTheme();
  return (
    <List
      data={purchases}
      showsVerticalScrollIndicator={false}
      style={[styles.container, background]}
      renderItem={({ item }) => <PurchasesListItem purchase={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  }
});
