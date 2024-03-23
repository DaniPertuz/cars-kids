import { Layout } from '@ui-kitten/components';
import { Footnote, Title } from '../../ui';
import { authStyles } from '../../../styles/auth/styles';

interface Props {
  title: string;
  footnote: string;
}

export const LoginHeader = ({ title, footnote }: Props) => {
  return (
    <>
      <Layout style={authStyles.welcomeTextContainer}>
        <Title text={title} />
      </Layout>
      <Footnote text={footnote} />
    </>
  );
};
