import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../../hooks';
import { BasicButton } from '../../BasicButton';
import { globalColors } from '../../../../theme/globalColors';

interface Props {
  buttonSize: { height: number, width: number; };
  onPress: () => void;
}

export const AddTransactionButton = ({ buttonSize, onPress }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={{ alignItems: 'center', flex: 1, ...background }}>
      <BasicButton activeOpacity={0.5} iconName='plus-circle' fillColor={globalColors.primaryRed} size={buttonSize} onPress={onPress} />
    </Layout>
  );
};
