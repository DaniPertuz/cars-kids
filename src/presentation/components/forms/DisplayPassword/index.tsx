import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CustomIcon } from '../../ui/CustomIcon';

interface Props {
  handlePasswordVisibility: (isVisible: boolean) => void;
}

export const DisplayPassword = ({ handlePasswordVisibility }: Props) => {
  const [displayPassword, setDisplayPassword] = useState<boolean>(true);

  const switchDisplay = () => {
    setDisplayPassword(!displayPassword);
    handlePasswordVisibility(!displayPassword);
  };

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={switchDisplay}
      style={{ height: 25, width: 25 }}
    >
      {displayPassword
        ? <CustomIcon name='eye-outline' />
        : <CustomIcon name='eye-off-outline' />
      }
    </TouchableOpacity>
  );
};
