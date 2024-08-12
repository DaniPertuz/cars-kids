import { Layout } from '@ui-kitten/components';
import { BasicButton } from '../../BasicButton';
import { MainScreenHeaderLoadingSpinner } from '../../MainScreenHeaderLoadingSpinner';
import { globalColors } from '../../../../theme/globalColors';

interface Props {
  loading: boolean;
  buttonSize: { height: number, width: number; };
  onPress: () => void;
}

export const UploadTransactionsButton = ({ loading, buttonSize, onPress }: Props) => {
  return (
    <Layout style={{ flex: 1 }}>
      {!loading
        ?
        <BasicButton activeOpacity={0.5} iconName='upload-outline' fillColor={globalColors.primaryRed} size={buttonSize} onPress={onPress} />
        :
        <MainScreenHeaderLoadingSpinner />
      }
    </Layout>
  );
};
