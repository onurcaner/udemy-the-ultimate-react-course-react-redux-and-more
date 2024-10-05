export enum ReservationsFormKeys {
  NumberOfGuests = 'numberOfGuests',
  Observations = 'observations',
}

export type UpdateReservationsFormFields = Record<
  Extract<
    ReservationsFormKeys,
    ReservationsFormKeys.NumberOfGuests | ReservationsFormKeys.Observations
  >,
  string
>;
