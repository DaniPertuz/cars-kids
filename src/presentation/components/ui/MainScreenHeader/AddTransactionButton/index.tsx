import { Layout } from '@ui-kitten/components';
import { BasicButton } from '../../BasicButton';
import { globalColors } from '../../../../theme/globalColors';

interface Props {
  buttonSize: { height: number, width: number; };
  onPress: () => void;
}

export const AddTransactionButton = ({ buttonSize, onPress }: Props) => {
  return (
    <Layout style={{ flex: 1 }}>
      <BasicButton activeOpacity={0.5} iconName='plus-circle' fillColor={globalColors.primaryRed} size={buttonSize} onPress={onPress} />
    </Layout>
  );
};
