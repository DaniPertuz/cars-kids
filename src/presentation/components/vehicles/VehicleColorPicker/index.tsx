import { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import ColorPicker from 'react-native-wheel-color-picker';
import { useCustomTheme } from '../../../hooks';

interface Props {
  initialValue: string;
  handleSelection: (value: string) => void;
}

export const VehicleColorPicker = ({ initialValue, handleSelection }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>(initialValue);
  const { background } = useCustomTheme();

  useEffect(() => {
    handleSelection(initialValue);
  }, []);
  
  const onColorChange = (color: string) => {
    setSelectedColor(color);
    handleSelection(selectedColor);
  };

  return (
    <Layout style={[{ padding: 20 }, background]}>
      <ColorPicker color={selectedColor} onColorChangeComplete={onColorChange} />
    </Layout>
  );
};
