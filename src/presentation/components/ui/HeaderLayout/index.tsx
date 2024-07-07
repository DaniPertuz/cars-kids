import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { LayoutProps } from '../../../../infrastructure/interfaces';

export const HeaderLayout = ({ paddingTop, children }: LayoutProps) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ paddingTop: paddingTop ? paddingTop : 0, gap: 10 }, background]}>
      {children}
    </Layout>
  );
};
