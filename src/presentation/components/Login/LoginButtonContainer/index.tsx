import { Layout } from '@ui-kitten/components';
import { PrimaryButton, Spacer } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  buttonText: string;
  onPress: () => void;
}

export const LoginButtonContainer = ({ buttonText, onPress }: Props) => {
  return (
    <>
      <Spacer height={20} />
      <Layout style={globalStyles.mainBackground}>
        <PrimaryButton text={buttonText} onPress={onPress} />
      </Layout>
      <Spacer height={50} />
    </>
  );
};
