import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CHECK_IN } from '../../config/routePaths';
import { BookingAttributesExtended } from '../../services/types';
import { Button } from '../../ui/Button';
import { Flag } from '../../ui/Flag';
import { Tag } from '../../ui/Tag';
import { CheckOutModal } from './CheckOutModal';

export function TodaysActivityItem({
  booking,
}: {
  booking: BookingAttributesExtended;
}): JSX.Element {
  const {
    status,
    nights,
    id,
    guests: { countryFlag, nationality, fullName },
  } = booking;

  return (
    <StyledTodaysActivityItem>
      {status === 'checked-in' && <Tag $variant="blue">Departing</Tag>}
      {status === 'unconfirmed' && <Tag $variant="green">Arriving</Tag>}

      <Flag src={countryFlag} alt={`${nationality} flag`} />

      <StyledGuestName>{fullName}</StyledGuestName>

      <p>
        {nights} night{nights > 1 && 's'}
      </p>

      {status === 'unconfirmed' && (
        <Button
          $size="small"
          style={{ textAlign: 'center' }}
          as={Link}
          to={`/${CHECK_IN}/${id}`}
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && (
        <CheckOutModal bookingId={id}>
          <Button $size="small">Check out</Button>
        </CheckOutModal>
      )}
    </StyledTodaysActivityItem>
  );
}

const StyledTodaysActivityItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  grid-template-columns: 0.75fr 0.25fr 1.25fr 0.5fr 1fr;
  gap: 0.75rem;
  align-items: center;

  font-size: 0.85rem;
  padding-block: 0.5rem;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const StyledGuestName = styled.p`
  font-weight: 500;
`;
