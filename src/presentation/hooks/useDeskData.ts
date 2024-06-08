import { useEffect } from 'react';
import { useDesksStore } from '../store/desk/useDeskStore';

export const useDeskData = () => {
  const selectedDesk = useDesksStore(state => state.selectedDesk);
  const desks = useDesksStore(state => state.desks);
  const desksData = useDesksStore(state => state.desksData);
  const getDesks = useDesksStore(state => state.getDesks);
  const setSelectedDesk = useDesksStore(state => state.setSelectedDesk);

  const getAllDesks = () => {
    const total = desksData.total;
    getDesks(total);
  };

  useEffect(() => {
    getAllDesks();
  }, [desks]);

  return {
    desks,
    selectedDesk,
    setSelectedDesk
  };
};
