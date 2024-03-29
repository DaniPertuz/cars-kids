import { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import ColorPicker from 'react-native-wheel-color-picker';

interface Props {
  handleSelection: (value: string) => void;
}

export const VehicleColorPicker = ({ handleSelection }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');

  const onColorChange = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    handleSelection(selectedColor);
  }, [selectedColor]);

  return (
    <Layout style={{ padding: 20 }}>
      <ColorPicker
        onColorChangeComplete={onColorChange}
      />
    </Layout>
  );
};
