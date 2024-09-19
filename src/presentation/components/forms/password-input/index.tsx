import { useState } from 'react';
import { Input } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { DisplayPassword } from '../DisplayPassword';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (password: string) => void;
}

export const PasswordInput = ({ placeholder, value, onChangeText }: Props) => {
  const { borderColor } = useCustomTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  

  const handlePasswordVisibility = (isVisible: boolean) => {
    setIsPasswordVisible(isVisible);
  };

  return (
    <Input
      placeholder={placeholder}
      label={placeholder}
      autoCapitalize='none'
      secureTextEntry={isPasswordVisible}
      value={value}
      onChangeText={onChangeText}
      accessoryRight={<DisplayPassword handlePasswordVisibility={handlePasswordVisibility} />}
      style={[{ borderRadius: 10, borderWidth: 1 }, borderColor]}
    />
  );
};
