import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../core/entities';
import { SelectComponent } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desksNames: string[];
  selectedDesk: Desk;
  handleDesk: (value: string) => void;
}

export const DeskSelect = ({ desksNames, selectedDesk, handleDesk }: Props) => {
  return (
    <>
      {!selectedDesk &&
        <Layout style={globalStyles.fullWidth}>
          <SelectComponent initialValue={''} disabled={desksNames.length === 0} placeholder={desksNames.length === 0 ? 'No hay puestos' : 'Puesto'} options={desksNames} handleSelection={handleDesk} />
        </Layout>
      }
      {selectedDesk &&
        <Layout style={globalStyles.fullWidth}>
          <SelectComponent initialValue={selectedDesk.name} disabled={desksNames.length === 0} placeholder={desksNames.length === 0 ? 'No hay puestos' : 'Puesto'} options={desksNames} handleSelection={handleDesk} />
        </Layout>
      }
    </>
  );
};
