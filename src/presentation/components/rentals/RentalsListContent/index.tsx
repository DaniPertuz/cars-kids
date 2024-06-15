import { Rental } from '../../../../core/entities';
import { EmptyListMessage } from '../../ui';
import { RentalsList } from '../RentalsList';

export const RentalsListContent = ({ rentals }: { rentals: Rental[]; }) => {
  return (
    <>
      {rentals.length === 0 ? <EmptyListMessage heightBy={0.75} text='No hay alquileres' /> : <RentalsList rentals={rentals} />}
    </>
  );
};
