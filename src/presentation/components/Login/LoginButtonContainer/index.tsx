import { Layout } from '@ui-kitten/components';
import { PrimaryButton, Spacer } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  buttonText: string;
  disabled: boolean;
  onPress: () => void;
}

export const LoginButtonContainer = ({ buttonText, disabled, onPress }: Props) => {
  return (
    <>
      <Spacer height={20} />
      <Layout style={globalStyles.mainBackground}>
        <PrimaryButton disabled={disabled} text={buttonText} onPress={onPress} />
      </Layout>
      <Spacer height={50} />
    </>
  );
};
