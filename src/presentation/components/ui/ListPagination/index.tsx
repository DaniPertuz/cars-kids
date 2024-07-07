import { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { HeaderFive, NextButton, PrevButton } from '../../ui';
import { styles } from './styles';

interface PaginationProps<T> {
  bottom: number;
  data: T;
  fetchNextPage: (url: string) => void;
  fetchPrevPage: (url: string) => void;
}

export const ListPagination = <T extends { prev: string | null; next: string | null; page: number }>(
  { bottom, data, fetchPrevPage, fetchNextPage }: PaginationProps<T>
) => {
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const { background } = useCustomTheme();

  useEffect(() => {
    setPrevUrl(data.prev);
    setNextUrl(data.next);
  }, [data.prev, data.next]);

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
    <Layout style={[{ ...styles.container, bottom: bottom + 20 }, background]}>
      <PrevButton iconSize={30} prevUrl={prevUrl} onPress={handlePrevClick} />
      <HeaderFive text={String(data.page)} />
      <NextButton iconSize={30} nextUrl={nextUrl} onPress={handleNextClick} />
    </Layout>
  );
};
