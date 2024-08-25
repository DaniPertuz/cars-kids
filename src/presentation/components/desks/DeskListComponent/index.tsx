import { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../core/entities';
import * as DesksUseCases from '../../../../core/use-cases/desks';
import { useCustomTheme } from '../../../hooks';
import { LoadingScreen } from '../../../screens/LoadingScreen';
import { EmptyListMessage } from '../../ui';
import { DeskList } from '../DeskList';

export const DeskListComponent = () => {
  const { background } = useCustomTheme();
  const [desks, setDesks] = useState<Desk[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const desks = await DesksUseCases.getDesksUseCase('desks');
    const resp = desks.response;
    if (!resp || !resp.desks) {
      setDesks([]);
      setLoading(false);
      return;
    }

    setDesks(resp.desks);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout style={[{ marginHorizontal: 20, height: '85%', marginBottom: '25%', paddingBottom: '15%' }, background]}>
      {loading
        ?
        <LoadingScreen />
        :
        (desks.length === 0)
          ?
          <EmptyListMessage heightBy={0.9} text='No hay puestos de trabajo' />
          :
          <DeskList desks={desks} />
      }
    </Layout>
  );
};
