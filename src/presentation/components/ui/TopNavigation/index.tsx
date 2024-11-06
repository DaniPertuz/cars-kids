import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { Back } from '../Back';
import { Search } from '../Search';
import { TitleHeader } from '../TitleHeader';

interface Props {
  top: number;
  title?: string;
  renderSearchButton?: boolean;
}

export const TopNavigation = ({ top, title, renderSearchButton }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  return (
    <>
      <Back top={top} />
      {title && <TitleHeader text={title} />}
      {renderSearchButton && <Search top={top} onPress={() => navigation.navigate('SearchScreen', { entity: 'vehicles' })} />}
    </>
  );
};
