import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../../core/entities';
import { useCustomTheme } from '../../../../hooks';
import { MainScreenHeaderTitle } from '../../MainScreenHeaderTitle';

interface Props {
  desks: Desk[];
  selectedDesk: Desk;
  title: string;
  onPress: (value: string) => void;
}

export const HeaderTitleContainer = ({ desks, selectedDesk, title, onPress }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={{ flex: 6, ...background }}>
      <MainScreenHeaderTitle desks={desks} selectedDesk={selectedDesk!} title={title} handleDesk={onPress} />
    </Layout>
  );
};
