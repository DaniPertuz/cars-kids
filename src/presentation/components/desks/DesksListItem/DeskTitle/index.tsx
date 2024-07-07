import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../../core/entities';
import { useCustomTheme } from '../../../../hooks';
import { Callout } from '../../../ui';

export const DeskTitle = ({ desk }: { desk: Desk; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={platinumItemBackgroundColor}>
      <Callout text={desk.name} />
    </Layout>
  );
};
