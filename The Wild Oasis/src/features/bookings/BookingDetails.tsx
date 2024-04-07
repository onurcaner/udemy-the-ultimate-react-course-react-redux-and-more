import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { CHECK_IN } from '../../config/routePaths';
import { useNavigateBack } from '../../hooks/useNavigateBack';
import { Button } from '../../ui/Button';
import { ButtonGroup } from '../../ui/ButtonGroup';
import { ButtonText } from '../../ui/ButtonText';
import { Empty } from '../../ui/Empty';
import { Heading } from '../../ui/Heading';
import { Spinner } from '../../ui/Spinner';
import { Tag } from '../../ui/Tag';
import { CheckOutModal } from '../check-in-out/CheckOutModal';
import { BookingDataBox } from './BookingDataBox';
import { DeleteBookingModal } from './DeleteBookingModal';
import { statusToTagName } from './config';
import { useQueryBooking } from './useQueryBooking';

export function BookingDetails(): JSX.Element {
  const { data: booking, isLoading } = useQueryBooking();
  const navigate = useNavigate();
  const navigateBack = useNavigateBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  return (
    <>
      <StyledRow>
        <StyledHeadingGroup>
          <Heading as="h2" $marginBottom="0">
            Booking #{booking.id}
          </Heading>
          <Tag $variant={statusToTagName[booking.status]}>
            {booking.status.replace('-', ' ')}
          </Tag>
        </StyledHeadingGroup>
        <ButtonText onClick={navigateBack}>&larr; Back</ButtonText>
      </StyledRow>

      <BookingDataBox booking={booking} />

      <ButtonGroup style={{ marginTop: '2rem' }}>
        <Button $variation="secondary" onClick={navigateBack}>
          Back
        </Button>

        <DeleteBookingModal bookingId={booking.id} onSuccess={navigateBack}>
          <Button $variation="danger">Delete Booking</Button>
        </DeleteBookingModal>

        {booking.status === 'checked-in' && (
          <CheckOutModal bookingId={booking.id}>
            <Button>Check out</Button>
          </CheckOutModal>
        )}

        {booking.status === 'unconfirmed' && (
          <Button
            onClick={() => {
              navigate(`/${CHECK_IN}/${booking.id}`);
            }}
          >
            Check in
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

const StyledHeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 2rem;
`;
