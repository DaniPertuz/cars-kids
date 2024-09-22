import { Layout } from '@ui-kitten/components';
import { NumericInput } from '../../forms';
import { BasicButton } from '../../ui';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  timePriceBlocks: { time: number; price: number; }[];
  addTimePriceBlock: () => void;
  handleBlockChange: (index: number, field: "time" | "price", value: number) => void;
  removeTimePriceBlock: (index: number) => void;
}

export const VehicleTimePriceBlock = ({ timePriceBlocks, addTimePriceBlock, handleBlockChange, removeTimePriceBlock }: Props) => {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.subContainer}>
        {timePriceBlocks.map((block, index) => (
          <Layout key={index} style={styles.itemContainer}>
            <Layout style={styles.inputContainer}>
              <NumericInput placeholder='Tiempo' caption='Tiempo' value={block.time} onChangeText={(value) => handleBlockChange(index, 'time', Number(value))} />
            </Layout>
            <Layout style={styles.inputContainer}>
              <NumericInput placeholder='Precio' caption='Precio' value={block.price} onChangeText={(value) => handleBlockChange(index, 'price', Number(value))} />
            </Layout>
            <Layout style={styles.buttonContainer}>
              <BasicButton activeOpacity={0.5} iconName={`${index >= 1 ? 'minus' : 'plus'}-circle`} fillColor={globalColors.primaryRed} size={{ height: 40, width: 40 }} onPress={index >= 1 ? () => removeTimePriceBlock(index) : addTimePriceBlock} />
            </Layout>
          </Layout>
        ))
        }
      </Layout>
    </Layout>
  );
};
