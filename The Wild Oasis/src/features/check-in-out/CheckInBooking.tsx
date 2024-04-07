import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BOOKINGS } from '../../config/routePaths';
import { useNavigateBack } from '../../hooks/useNavigateBack';
import { Button } from '../../ui/Button';
import { ButtonGroup } from '../../ui/ButtonGroup';
import { ButtonText } from '../../ui/ButtonText';
import { Checkbox } from '../../ui/Checkbox';
import { Empty } from '../../ui/Empty';
import { Heading } from '../../ui/Heading';
import { Spinner } from '../../ui/Spinner';
import { formatCurrency } from '../../utils/formatCurrency';
import { BookingDataBox } from '../bookings/BookingDataBox';
import { useMutationUpdateBooking } from '../bookings/useMutationUpdateBooking';
import { useQueryBooking } from '../bookings/useQueryBooking';
import { useQuerySettings } from '../settings/useQuerySettings';

export function CheckInBooking() {
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [hasAdditionalBreakfast, setHasAdditionalBreakfast] = useState(false);
  const navigateBack = useNavigateBack();
  const navigate = useNavigate();
  const { data: booking, isLoading: isLoadingBooking } = useQueryBooking();
  const { data: settings, isLoading: isLoadingSettings } = useQuerySettings();
  const { mutateAsync, isPending } = useMutationUpdateBooking();

  const isLoading = isLoadingBooking || isLoadingSettings;

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  if (!settings) return <Empty resourceName="settings" />;

  const additionalBreakfastPrice =
    settings.breakfastPrice * booking.nights * booking.numberOfGuests;

  const displayTotalPrice =
    booking.totalPrice +
    (hasAdditionalBreakfast ? additionalBreakfastPrice : 0);

  const canProceed =
    (isPaymentConfirmed || (booking.isPaid && !hasAdditionalBreakfast)) &&
    booking.status === 'unconfirmed';

  const handleChangeOfBreakfastCheckbox: ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { checked } = e.target;
    setHasAdditionalBreakfast(checked);
    setIsPaymentConfirmed(false);
  };

  const handleChangeOfPaymentCheckbox: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { checked } = e.target;
    setIsPaymentConfirmed(checked);
  };

  const handleClickToCheckIn: MouseEventHandler<HTMLButtonElement> = () => {
    mutateAsync({
      isPaid: true,
      status: 'checked-in',
      ...(hasAdditionalBreakfast && {
        hasBreakfast: true,
        extrasPrice: booking.extrasPrice + additionalBreakfastPrice,
        totalPrice: booking.totalPrice + additionalBreakfastPrice,
      }),
    })
      .then(() => {
        navigate(`/${BOOKINGS}/${booking.id}`);
      })
      .catch(() => {
        return;
      });
  };

  return (
    <>
      <StyledRow>
        <Heading as="h2">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={navigateBack}>&larr; Back</ButtonText>
      </StyledRow>

      <BookingDataBox booking={booking} />

      <StyledBox>
        <Checkbox>
          <label htmlFor="additionalBreakfast">
            Want to add breakfast for {formatCurrency(additionalBreakfastPrice)}
          </label>
          <input
            type="checkbox"
            id="additionalBreakfast"
            onChange={handleChangeOfBreakfastCheckbox}
            checked={hasAdditionalBreakfast || booking.hasBreakfast}
            disabled={booking.hasBreakfast || isPending}
          />
        </Checkbox>
      </StyledBox>

      <StyledBox>
        <Checkbox>
          <label htmlFor="confirmPayment">
            I confirm that {booking.guests.fullName} has paid the total amount
            of {formatCurrency(displayTotalPrice)}{' '}
            {(booking.hasBreakfast || hasAdditionalBreakfast) && (
              <>
                ({formatCurrency(booking.cabinPrice)} cabin +{' '}
                {formatCurrency(
                  booking.hasBreakfast
                    ? booking.extrasPrice
                    : additionalBreakfastPrice,
                )}{' '}
                breakfast)
              </>
            )}
          </label>
          <input
            type="checkbox"
            id="confirmPayment"
            onChange={handleChangeOfPaymentCheckbox}
            checked={canProceed}
            disabled={(booking.isPaid && !hasAdditionalBreakfast) || isPending}
          />
        </Checkbox>
      </StyledBox>

      <ButtonGroup>
        <Button
          onClick={handleClickToCheckIn}
          disabled={!canProceed || isPending}
        >
          Check in booking #{booking.id}
        </Button>
        <Button $variation="secondary" onClick={navigateBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledBox = styled.div`
  padding: 1.5rem 2.5rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  margin-block: 2rem;
`;
