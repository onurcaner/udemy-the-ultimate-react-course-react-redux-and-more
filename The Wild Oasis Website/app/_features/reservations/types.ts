export enum ReservationsFormKeys {
  NumberOfGuests = 'numberOfGuests',
  Observations = 'observations',
  StartDate = 'startDate',
  EndDate = 'endDate',
}

export type UpdateReservationsFormFields = Record<
  Extract<
    ReservationsFormKeys,
    ReservationsFormKeys.NumberOfGuests | ReservationsFormKeys.Observations
  >,
  string
>;

export type CreateReservationsFormFields = Record<
  Extract<
    ReservationsFormKeys,
    | ReservationsFormKeys.NumberOfGuests
    | ReservationsFormKeys.Observations
    | ReservationsFormKeys.StartDate
    | ReservationsFormKeys.EndDate
  >,
  string
>;
