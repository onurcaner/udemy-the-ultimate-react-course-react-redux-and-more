enum Crumbs {
  About = 'about',
  Account = 'account',
  Cabins = 'cabins',
  Profile = 'profile',
  Reservations = 'reservations',
  Login = 'login',
  Logout = 'logout',
}

export enum Params {
  CabinId = 'cabinId',
}

export const appRoutes = {
  root: '/',

  about: '/' + Crumbs.About,

  account: '/' + Crumbs.Account,
  profile: '/' + Crumbs.Account + '/' + Crumbs.Profile,
  reservations: '/' + Crumbs.Account + '/' + Crumbs.Reservations,

  cabins: '/' + Crumbs.Cabins,
  cabin: (cabinId: string) => '/' + Crumbs.Cabins + '/' + cabinId,

  login: '/' + Crumbs.Login,
  logout: '/' + Crumbs.Logout,
};
