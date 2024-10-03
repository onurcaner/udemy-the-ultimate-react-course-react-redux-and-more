export enum GuestFormKeys {
  NationalId = 'nationalId',
  Nationality = 'nationality',
}

export type UpdateGuestFormFields = Record<
  Extract<GuestFormKeys, GuestFormKeys.Nationality | GuestFormKeys.NationalId>,
  string
>;
