import { useState } from 'react';
import { Input, useTheme } from '@ui-kitten/components';
import { DisplayPassword } from '../DisplayPassword';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (password: string) => void;
}

export const PasswordInput = ({ placeholder, value, onChangeText }: Props) => {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handlePasswordVisibility = (isVisible: boolean) => {
    setIsPasswordVisible(isVisible);
  };

  return (
    <Input
      placeholder={placeholder}
      autoCapitalize='none'
      secureTextEntry={isPasswordVisible}
      value={value}
      onChangeText={onChangeText}
      textStyle={globalStyles.colorOnyx}
      accessoryRight={<DisplayPassword handlePasswordVisibility={handlePasswordVisibility} />}
      style={[globalStyles.input, { backgroundColor: theme['color-basic-100'] }]}
    />
  );
};
