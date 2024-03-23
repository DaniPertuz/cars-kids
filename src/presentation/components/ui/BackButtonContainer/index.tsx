import { Layout } from '@ui-kitten/components';
import { Back } from '../Back';
import { globalStyles } from '../../../styles/global.styles';

export const BackButtonContainer = ({ top }: { top: number; }) => {
  return (
    <Layout style={{ ...globalStyles.backButtonContainer, marginTop: top }}>
      <Back />
    </Layout>
  );
}
