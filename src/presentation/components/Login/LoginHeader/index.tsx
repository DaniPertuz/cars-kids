import { Layout } from '@ui-kitten/components';
import { Footnote, Title } from '../../ui';
import { useCustomTheme } from '../../../hooks';

interface Props {
  title: string;
  footnote: string;
}

export const LoginHeader = ({ title, footnote }: Props) => {
  const { background } = useCustomTheme();
  return (
    <>
      <Layout style={[{ alignItems: 'center', gap: 10 }, background]}>
        <Title text={title} />
        <Footnote text={footnote} />
      </Layout>
    </>
  );
};
