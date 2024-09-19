import { HeaderLayout } from '../../ui';
import { LoginHeader } from '../LoginHeader';
import { LoginMainImage } from '../LoginMainImage';

interface Props {
  height: number;
  footnote: string;
  title: string;
}

export const LoginHeaderContainer = ({ height, footnote, title }: Props) => {
  return (
    <HeaderLayout paddingTop={height * 0.05}>
      <LoginMainImage />
      <LoginHeader title={title} footnote={footnote} />
    </HeaderLayout>
  );
};
