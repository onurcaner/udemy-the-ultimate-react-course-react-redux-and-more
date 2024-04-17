import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import { Empty } from '../../ui/Empty';
import { SpinnerMini } from '../../ui/SpinnerMini';
import { formatCurrency } from '../../utils/formatCurrency';
import { useQueryCabins } from '../cabins/useQueryCabins';
import { Stat } from './Stat';
import { filterStaysFromBooking } from './filterStaysFromBooking';
import { useQueryBookingsAfterDate } from './useQueryBookingsAfterDate';
import { useSearchParamsLastDays } from './useSearchParamsLastDays';

export function Stats(): JSX.Element {
  const { isPending: isPendingBookings, data: lastBookings } =
    useQueryBookingsAfterDate();
  const { isPending: isPendingCabins, data: cabins } = useQueryCabins();
  const lastDaysParam = useSearchParamsLastDays();

  const isPending = isPendingBookings || isPendingCabins;

  if (isPending) {
    return (
      <>
        <Stat
          color="blue"
          title="Bookings"
          icon={<SpinnerMini />}
          value="Loading..."
        />

        <Stat
          color="green"
          title="Sales"
          icon={<SpinnerMini />}
          value="Loading..."
        />

        <Stat
          color="indigo"
          title="Check ins"
          icon={<SpinnerMini />}
          value="Loading..."
        />

        <Stat
          color="yellow"
          title="Occupancy rate"
          icon={<SpinnerMini />}
          value="Loading..."
        />
      </>
    );
  }

  if (!lastBookings) return <Empty resourceName="bookings" />;
  if (!cabins) return <Empty resourceName="cabins" />;

  const lastStays = lastBookings.filter(filterStaysFromBooking);

  const totalPayment = lastStays.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0,
  );

  const occupancyRatio =
    lastStays.reduce((sum, stay) => sum + stay.nights, 0) /
    (cabins.length * +lastDaysParam);

  return (
    <>
      <Stat
        color="blue"
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        value={lastBookings.length + ''}
      />

      <Stat
        color="green"
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalPayment)}
      />

      <Stat
        color="indigo"
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        value={lastStays.length + ''}
      />

      <Stat
        color="yellow"
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRatio * 100) + '%'}
      />
    </>
  );
}
