import { Layout } from '@ui-kitten/components';
import { adaptApiResponse } from '../../../../config/adapters/api-response-adapter';
import { CalloutBold } from '../../ui';
import { ReportsListComponent } from '../ReportsListComponent';
import { styles } from './styles';

interface Props {
  entityData: any;
  category: string;
}

export const ReportsEntitiesList = ({ entityData, category }: Props) => {
  const hasCategorySum = category !== 'Usuarios' && category !== 'Presupuestos';

  return (
    <Layout style={styles.container}>
      {entityData &&
        <Layout style={styles.listContainer}>
          {hasCategorySum && <CalloutBold text={`Total de venta: ${entityData.response.sum}`} />}
          <ReportsListComponent data={adaptApiResponse(entityData.response)} />
        </Layout>
      }
    </Layout>
  );
};
