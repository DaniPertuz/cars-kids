import { Back } from '../Back';
import { TitleHeader } from '../TitleHeader';

interface Props {
  top: number;
  title?: string;
}

export const TopNavigation = ({ top, title }: Props) => {
  return (
    <>
      <Back top={top} />
      {title && <TitleHeader text={title} />}
    </>
  );
};
