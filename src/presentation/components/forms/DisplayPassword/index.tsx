import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { EyeClosedIcon } from '../../ui/EyeIconClosed';
import { EyeIcon } from '../../ui/EyeIcon';

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
        ? <EyeIcon />
        : <EyeClosedIcon />
      }
    </TouchableOpacity>
  );
};
