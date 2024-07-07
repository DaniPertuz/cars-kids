import { Layout } from '@ui-kitten/components';
import { LayoutProps } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';

export const MainLayout = ({ paddingTop, children }: LayoutProps) => {
  const { background } = useCustomTheme();

  return (
    <Layout style={[{ paddingTop: paddingTop ? paddingTop : 0, flex: 1 }, background]}>
      {children}
    </Layout>
  );
};
