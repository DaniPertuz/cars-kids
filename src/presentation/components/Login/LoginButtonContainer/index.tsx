import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { PrimaryButton, Spacer } from '../../ui';

interface Props {
  buttonText: string;
  disabled: boolean;
  onPress: () => void;
}

export const LoginButtonContainer = ({ buttonText, disabled, onPress }: Props) => {
  const { background } = useCustomTheme();
  return (
    <>
      <Spacer height={20} />
      <Layout style={background}>
        <PrimaryButton disabled={disabled} text={buttonText} onPress={onPress} />
      </Layout>
      <Spacer height={50} />
    </>
  );
};
