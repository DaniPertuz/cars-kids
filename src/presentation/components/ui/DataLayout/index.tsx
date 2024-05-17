import { Layout } from '@ui-kitten/components';
import { LayoutProps } from '../../../../infrastructure/interfaces';
import { globalStyles } from '../../../styles/global.styles';

export const DataLayout = ({ paddingTop, children }: LayoutProps) => {
  return (
    <Layout style={{ paddingTop: paddingTop, ...globalStyles.mainLayout }}>
      {children}
    </Layout>
  );
};
