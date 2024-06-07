import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { globalColors } from '../../../../theme/globalColors';
import { PrimaryButton } from '../../../ui';
import { globalStyles } from '../../../../styles/global.styles';

interface Props {
  selectPicture: () => Promise<void>;
  takePicture: () => Promise<void>;
}

export const ProfileUserImageModalButtons = ({ selectPicture, takePicture }: Props) => {
  return (
    <Layout style={styles.buttonsContainer}>
      <PrimaryButton disabled={false} text={'Foto'} color={globalColors.warning} onPress={takePicture} />
      <PrimaryButton disabled={false} text={'Galería'} color={globalColors.success} onPress={selectPicture} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    ...globalStyles.mainBackground
  }
});
