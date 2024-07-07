import { Layout } from '@ui-kitten/components';
import { adaptApiResponse } from '../../../../config/adapters/api-response-adapter';
import { useCustomTheme } from '../../../hooks';
import { CalloutBold } from '../../ui';
import { ReportsListComponent } from '../ReportsListComponent';
import { styles } from './styles';

interface Props {
  entityData: any;
  category: string;
}

export const ReportsEntitiesList = ({ entityData, category }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.container, background]}>
      {entityData &&
        <Layout style={styles.listContainer}>
          {category !== 'Presupuestos' && <CalloutBold text={`Total de venta: ${entityData.response.sum}`} />}
          <ReportsListComponent data={adaptApiResponse(entityData.response)} />
        </Layout>
      }
    </Layout>
  );
};
