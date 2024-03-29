import { useEffect, useState } from 'react';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { styles } from './styles';

interface Props {
  options: string[];
  placeholder: string;
  handleSelection: (value: string) => void;
}

export const SelectComponent = ({ options, placeholder, handleSelection }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (selectedIndex !== undefined && !Array.isArray(selectedIndex)) {
      setSelectedValue(options[selectedIndex.row]);
      handleSelection(selectedValue);
    }
  }, [selectedIndex, selectedValue]);

  return (
    <Select
      style={styles.container}
      placeholder={placeholder}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
      value={selectedValue}
    >
      {options.map((option, index) => (
        <SelectItem key={index} title={option} />
      ))
      }
    </Select>
  );
};
