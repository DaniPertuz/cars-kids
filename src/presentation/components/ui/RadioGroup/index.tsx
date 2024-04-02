import { Radio, RadioGroup } from '@ui-kitten/components';
import { useEffect, useState } from 'react';

interface Props {
  initialValue: number;
  list: string[];
  handleSelection: (value: number) => void;
}

export const RadioGroupComponent = ({ initialValue, list, handleSelection }: Props) => {
  const [selectedItem, setSelectedItem] = useState(initialValue);

  useEffect(() => {
    handleSelection(selectedItem);
  }, [selectedItem]);

  return (
    <RadioGroup
      selectedIndex={selectedItem}
      onChange={index => setSelectedItem(index)}
    >
      {list.map((item, index) => (
        <Radio key={index} status='danger'>
          {item}
        </Radio>
      ))}
    </RadioGroup>
  );
};
