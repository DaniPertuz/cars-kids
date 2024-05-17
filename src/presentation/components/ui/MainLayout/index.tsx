import { Layout } from '@ui-kitten/components';
import { LayoutProps } from '../../../../infrastructure/interfaces';
import { globalStyles } from '../../../styles/global.styles';

export const MainLayout = ({ paddingTop, children }: LayoutProps) => {
  return (
    <Layout style={{ paddingTop: paddingTop ? paddingTop : 0, ...globalStyles.container }}>
      {children}
    </Layout>
  );
};
