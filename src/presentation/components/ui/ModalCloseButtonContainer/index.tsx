import { Layout } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';
import { BasicButton } from '../BasicButton';
import { globalColors } from '../../../theme/globalColors';

export const ModalCloseButtonContainer = ({ onPress }: { onPress: () => void; }) => {
  return (
    <Layout style={{ ...globalStyles.mainBackground, alignItems: 'flex-end' }}>
      <BasicButton activeOpacity={1.0} iconName={'close-circle-outline'} fillColor={globalColors.primaryRed} size={{ height: 35, width: 35 }} onPress={onPress} />
    </Layout>
  );
};
