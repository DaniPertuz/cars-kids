import { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { VehiclesResponse } from '../../../../infrastructure/interfaces';
import { HeaderFive, NextButton, PrevButton } from '../../ui';
import { styles } from './styles';

interface Props {
  bottom: number;
  vehiclesData: VehiclesResponse;
  fetchNextPage: (url: string) => void;
  fetchPrevPage: (url: string) => void;
}

export const VehiclesListPagination = ({ bottom, vehiclesData, fetchPrevPage, fetchNextPage }: Props) => {
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    setPrevUrl(vehiclesData.prev);
    setNextUrl(vehiclesData.next);
  }, [vehiclesData.prev, vehiclesData.next]);

  const handlePrevClick = () => {
    if (prevUrl) {
      fetchPrevPage(prevUrl);
    }
  };

  const handleNextClick = () => {
    if (nextUrl) {
      fetchNextPage(nextUrl);
    }
  };

  return (
    <Layout style={{ ...styles.container, bottom: bottom + 20 }}>
      <PrevButton iconSize={30} prevUrl={prevUrl} onPress={handlePrevClick} />
      <HeaderFive text={String(vehiclesData.page)} />
      <NextButton iconSize={30} nextUrl={nextUrl} onPress={handleNextClick} />
    </Layout>
  );
};
