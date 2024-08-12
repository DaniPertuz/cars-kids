import { Layout } from '@ui-kitten/components';
import { MainScreenHeaderTitle } from '../../MainScreenHeaderTitle';
import { Desk } from '../../../../../core/entities';

interface Props {
  desks: Desk[];
  selectedDesk: Desk;
  title: string;
  onPress: (value: string) => void;
}

export const HeaderTitleContainer = ({ desks, selectedDesk, title, onPress }: Props) => {
  return (
    <Layout style={{ flex: 6 }}>
      <MainScreenHeaderTitle desks={desks} selectedDesk={selectedDesk!} title={title} handleDesk={onPress} />
    </Layout>
  );
};
