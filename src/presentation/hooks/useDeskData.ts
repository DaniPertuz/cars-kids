import { useEffect, useState } from 'react';
import { useDesksStore } from '../store/desk/useDeskStore';
import * as DeskUseCases from '../../core/use-cases/desks';
import { Desk } from '../../core/entities';

export const useDeskData = () => {
  const selectedDesk = useDesksStore(state => state.selectedDesk);
  const setSelectedDesk = useDesksStore(state => state.setSelectedDesk);
  const [desks, setDesks] = useState<Desk[]>([]);
  const [total, setTotal] = useState<number>(0);

  const getDesksTotal = async () => {
    const resp = await DeskUseCases.getDesksUseCase('desks');
    const total = resp.response?.total || 0;
    setTotal(total);
  };

  const getAllDesks = async (limit?: number) => {
    const query = limit ? `desks?limit=${limit}` : 'desks';
    const resp = await DeskUseCases.getDesksUseCase(query);
    setDesks(resp.response?.desks || []);
  };

  const fetchData = async () => {
    await getDesksTotal();
    await getAllDesks(total);
  };

  useEffect(() => {
    fetchData();
  }, [total, desks]);

  return {
    desks,
    selectedDesk,
    setSelectedDesk
  };
};
