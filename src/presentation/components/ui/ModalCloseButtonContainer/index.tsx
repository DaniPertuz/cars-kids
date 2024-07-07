import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { BasicButton } from '../BasicButton';
import { globalColors } from '../../../theme/globalColors';

export const ModalCloseButtonContainer = ({ onPress }: { onPress: () => void; }) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ alignItems: 'flex-end' }, background]}>
      <BasicButton activeOpacity={1.0} iconName={'close-circle-outline'} fillColor={globalColors.primaryRed} size={{ height: 35, width: 35 }} onPress={onPress} />
    </Layout>
  );
};
