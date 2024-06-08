import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../../core/entities';
import { Callout } from '../../../ui';
import { globalStyles } from '../../../../styles/global.styles';

export const DeskTitle = ({ desk }: { desk: Desk; }) => {
  return (
    <Layout style={globalStyles.platinumBackground}>
      <Callout text={desk.name} />
    </Layout>
  );
};
