import { format, isToday } from 'date-fns';
import { MouseEventHandler } from 'react';
import {
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowUpOnSquare,
  HiOutlineEye,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BOOKINGS, CHECK_IN } from '../../config/routePaths';
import { BookingAttributesExtended } from '../../services/types';
import { Menu } from '../../ui/Menu';
import { Table } from '../../ui/Table';
import { Tag } from '../../ui/Tag';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDistanceFromNow } from '../../utils/formatDistanceFromNow';
import { CheckOutModal } from '../check-in-out/CheckOutModal';
import { DeleteBookingModal } from './DeleteBookingModal';
import { statusToTagName } from './config';

export function BookingRow({
  booking,
}: {
  booking: BookingAttributesExtended;
}): JSX.Element {
  const navigate = useNavigate();

  const handleClickOnSeeDetails: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`/${BOOKINGS}/${booking.id}`);
  };

  const handleClickOnCheckIn: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`/${CHECK_IN}/${booking.id}`);
  };

  return (
    <Table.Row>
      <StyledCabin>{booking.cabins.name}</StyledCabin>

      <StyledStacked>
        <span>{booking.guests.fullName}</span>
        <span>{booking.guests.email}</span>
      </StyledStacked>

      <StyledStacked>
        <span>
          {isToday(new Date(booking.startDate))
            ? 'Today'
            : formatDistanceFromNow(booking.startDate)}{' '}
          &rarr; {booking.nights} night stay
        </span>
        <span>
          {format(new Date(booking.startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(booking.endDate), 'MMM dd yyyy')}
        </span>
      </StyledStacked>

      <Tag $variant={statusToTagName[booking.status]}>
        {booking.status.replace('-', ' ')}
      </Tag>

      <StyledAmount>{formatCurrency(booking.totalPrice)}</StyledAmount>

      <Menu.Provider>
        <Menu.OpenButton />
        <Menu.List>
          <Menu.ListItem>
            <button onClick={handleClickOnSeeDetails}>
              <span aria-hidden="true">
                <HiOutlineEye />
              </span>
              <span>See details</span>
            </button>
          </Menu.ListItem>

          {booking.status === 'unconfirmed' && (
            <Menu.ListItem>
              <button onClick={handleClickOnCheckIn}>
                <span aria-hidden="true">
                  <HiOutlineArrowDownOnSquare />
                </span>
                <span>Check in</span>
              </button>
            </Menu.ListItem>
          )}

          {booking.status === 'checked-in' && (
            <Menu.ListItem>
              <CheckOutModal bookingId={booking.id}>
                <button>
                  <span aria-hidden="true">
                    <HiOutlineArrowUpOnSquare />
                  </span>
                  <span>Check out</span>
                </button>
              </CheckOutModal>
            </Menu.ListItem>
          )}

          <Menu.ListItem>
            <DeleteBookingModal bookingId={booking.id}>
              <button>
                <span aria-hidden="true">
                  <HiOutlineTrash />
                </span>
                <span>Delete</span>
              </button>
            </DeleteBookingModal>
          </Menu.ListItem>
        </Menu.List>
      </Menu.Provider>
    </Table.Row>
  );
}

const StyledCabin = styled.td`
  display: block;
  font-family: 'Sono';
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledStacked = styled.td`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 0.75rem;
  }
`;

const StyledAmount = styled.td`
  display: block;
  font-family: 'Sono';
  font-weight: 500;
`;
