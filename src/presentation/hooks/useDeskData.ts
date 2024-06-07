import { useEffect } from 'react';
import { useDesksStore } from '../store/desk/useDeskStore';

export const useDeskData = () => {
  const selectedDesk = useDesksStore(state => state.selectedDesk);
  const desks = useDesksStore(state => state.desks);
  const getDesks = useDesksStore(state => state.getDesks);
  const setSelectedDesk = useDesksStore(state => state.setSelectedDesk);

  useEffect(() => {
    getDesks();
  }, []);

  return {
    desks,
    selectedDesk,
    setSelectedDesk
  };
};
