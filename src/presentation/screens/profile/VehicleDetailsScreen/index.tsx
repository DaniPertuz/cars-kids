import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { DataLayout, MainLayout, TopNavigation, CustomDivider } from '../../../components/ui';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { VehicleDetailsForm } from '../../../components/vehicles/VehicleDetailsForm';

interface Props extends StackScreenProps<RootStackParams, 'VehicleDetailsScreen'> { };

export const VehicleDetailsScreen = ({ route }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { top } = useSafeAreaInsets();
  const { vehicle } = route.params;

  const handleSubmit = (loading: boolean) => {
    if (!loading) navigation.goBack();
  };

  return (
    <MainLayout>
      <DataLayout paddingTop={Platform.OS === 'ios' ? top : top + 20}>
        <TopNavigation top={top} title='Actualizar vehículo' />
        <CustomDivider />
      </DataLayout>
      <VehicleDetailsForm vehicle={vehicle} visible={false} setVisible={() => { }} handleSubmit={handleSubmit} />
    </MainLayout>
  );
};

