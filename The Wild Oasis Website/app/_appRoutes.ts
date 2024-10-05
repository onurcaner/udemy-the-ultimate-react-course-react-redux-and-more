enum Crumbs {
  About = 'about',
  Account = 'account',
  Cabins = 'cabins',

  Edit = 'edit',
  Login = 'login',
  Logout = 'logout',
  Profile = 'profile',
  Reservations = 'reservations',
}

export enum Params {
  CabinId = 'cabinId',
  BookingId = 'bookingId',
}

export const appRoutes = {
  root: '/',

  about: '/' + Crumbs.About,

  account: '/' + Crumbs.Account,
  profile: '/' + Crumbs.Account + '/' + Crumbs.Profile,
  reservations: '/' + Crumbs.Account + '/' + Crumbs.Reservations,
  editReservation: (bookingId: string) =>
    '/' +
    Crumbs.Account +
    '/' +
    Crumbs.Reservations +
    '/' +
    Crumbs.Edit +
    '/' +
    bookingId,

  cabins: '/' + Crumbs.Cabins,
  cabin: (cabinId: string) => '/' + Crumbs.Cabins + '/' + cabinId,

  login: '/' + Crumbs.Login,
  logout: '/' + Crumbs.Logout,
};
