import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../../hooks';
import { BasicButton } from '../../BasicButton';
import { MainScreenHeaderLoadingSpinner } from '../../MainScreenHeaderLoadingSpinner';
import { globalColors } from '../../../../theme/globalColors';

interface Props {
  loading: boolean;
  buttonSize: { height: number, width: number; };
  onPress: () => void;
}

export const UploadTransactionsButton = ({ loading, buttonSize, onPress }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={{ alignItems: 'center', flex: 1, ...background }}>
      {!loading
        ?
        <BasicButton activeOpacity={0.5} iconName='upload-outline' fillColor={globalColors.primaryRed} size={buttonSize} onPress={onPress} />
        :
        <MainScreenHeaderLoadingSpinner />
      }
    </Layout>
  );
};
