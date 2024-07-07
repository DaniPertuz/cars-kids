import { Layout } from '@ui-kitten/components';
import { LayoutProps } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';

export const DataLayout = ({ paddingTop, children }: LayoutProps) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ paddingTop: paddingTop, gap: 20 }, background]}>
      {children}
    </Layout>
  );
};
