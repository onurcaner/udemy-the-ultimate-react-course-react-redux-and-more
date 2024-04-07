import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import styled from 'styled-components';

import { BookingAttributesExtended } from '../../services/types';
import { DataItem } from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDistanceFromNow } from '../../utils/formatDistanceFromNow';

export function BookingDataBox({
  booking,
}: {
  booking: BookingAttributesExtended;
}): JSX.Element {
  const {
    createdAt,
    startDate,
    endDate,
    nights,
    numberOfGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: {
      fullName: guestName,
      email,
      nationality,
      countryFlag,
      nationalId,
    },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {nights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
          <p>
            {guestName}{' '}
            {numberOfGuests > 1 ? `+ ${numberOfGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalId}</p>
        </Guest>

        {observations && (
          <DataItem
            label="Observations"
            icon={<HiOutlineChatBubbleBottomCenterText />}
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.125rem;
  font-weight: 500;
  color: #e0e7ff;
  color: var(--color-grey-200);

  background-color: var(--color-brand-500);
  padding: 1.25rem 2.5rem;

  svg {
    height: 2rem;
    width: 2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1rem;

    font-size: 1.125rem;
    font-weight: 600;
  }

  & span {
    font-family: 'Sono';
    font-size: 1.25rem;
    margin-left: 0.25rem;
  }
`;

const Section = styled.section`
  padding: 2rem 2.5rem 0.75rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--color-grey-500);
  margin-bottom: 1rem;

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div<{ $isPaid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 1.5rem;

  background-color: ${(props) =>
    props.$isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.$isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  font-size: 0.75rem;
  text-align: right;
  color: var(--color-grey-500);
  padding: 1rem 2.5rem;
`;
