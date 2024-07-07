import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useCustomTheme } from '../../../../hooks';
import { PrimaryButton } from '../../../ui';
import { globalColors } from '../../../../theme/globalColors';

interface Props {
  selectPicture: () => Promise<void>;
  takePicture: () => Promise<void>;
}

export const ProfileUserImageModalButtons = ({ selectPicture, takePicture }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.buttonsContainer, background]}>
      <PrimaryButton disabled={false} text={'Foto'} color={globalColors.warning} onPress={takePicture} />
      <PrimaryButton disabled={false} text={'Galería'} color={globalColors.success} onPress={selectPicture} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20
  }
});
