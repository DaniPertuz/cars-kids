import { Radio, RadioGroup } from '@ui-kitten/components';
import { useEffect, useState } from 'react';

interface Props {
  list: string[];
  handleUserRole: (role: number) => void;
}

export const RadioGroupComponent = ({ list, handleUserRole }: Props) => {
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    handleUserRole(selectedItem);
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
