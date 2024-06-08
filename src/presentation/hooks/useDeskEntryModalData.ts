import { useState, useEffect } from 'react';
import Snackbar from 'react-native-snackbar';
import { Desk } from '../../core/entities';
import * as DeskUseCases from '../../core/use-cases/desks';

interface Props {
  desk?: Desk;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useDeskEntryModalData = ({ desk, visible, setVisible }: Props) => {
  const init: Desk = {
    _id: '',
    name: ''
  };
  const [loading, setLoading] = useState(false);
  const [deskState, setDeskState] = useState<Desk>({
    _id: desk?._id || '',
    name: desk?.name || ''
  });

  const handleFieldChange = (fieldName: keyof Desk, value: string | number) => {
    setDeskState(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const onSubmit = async () => {
    setLoading(true);

    const resp = desk ? await DeskUseCases.updateDeskUseCase(desk, deskState) : await DeskUseCases.createDeskUseCase(deskState);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    const actionText = desk ? 'actualizado' : 'registrado';
    const successMessage = `Puesto de trabajo ${actionText} exitosamente`;

    setLoading(false);
    Snackbar.show({ text: successMessage, duration: Snackbar.LENGTH_SHORT });
    setVisible(false);
    setDeskState(desk ? deskState : init);
  };

  useEffect(() => {
    if (!desk && !visible) {
      setDeskState(init);
    }
  }, [desk, visible]);

  return {
    loading,
    deskState,
    handleFieldChange,
    onSubmit
  };
};
