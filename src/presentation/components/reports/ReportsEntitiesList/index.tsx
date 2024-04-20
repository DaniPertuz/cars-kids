import { Layout } from '@ui-kitten/components';
import { adaptApiResponse } from '../../../../config/adapters/api-response-adapter';
import { CalloutBold } from '../../ui';
import { ReportsListComponent } from '../ReportsListComponent';
import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  entityData: any;
  category: string;
}

export const ReportsEntitiesList = ({ entityData, category }: Props) => {
  return (
    <Layout style={styles.container}>
      {entityData &&
        <Layout style={styles.listContainer}>
          {category !== 'Usuarios' && <CalloutBold text={!entityData.response.sum ? '' : `Total de venta: ${entityData.response.sum}`} />}
          <ReportsListComponent category={category} data={adaptApiResponse(entityData?.response)} />
        </Layout>
      }
    </Layout>
  );
};
