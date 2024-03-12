import { CityAttributes } from '../data/types';

export interface CityProviderState {
  selectedCityId: string | null;
  cityToPostCity: Omit<CityAttributes, 'id'> | null;
  cityIdToDeleteCity: string | null;
}

export const initialCityProviderState: CityProviderState = {
  selectedCityId: null,
  cityToPostCity: null,
  cityIdToDeleteCity: null,
};

interface SelectedCityIdWillBeFetched {
  type: 'selectedCityId/will-be-fetched';
  payload: string;
}

interface CityWillBePosted {
  type: 'city/will-be-posted';
  payload: Omit<CityAttributes, 'id'>;
}

interface CityIdWillBeDeleted {
  type: 'cityId/will-be-deleted';
  payload: string;
}

export type CityProviderAction =
  | SelectedCityIdWillBeFetched
  | CityWillBePosted
  | CityIdWillBeDeleted;

export function reduceCityProvider(
  state: CityProviderState,
  action: CityProviderAction,
): CityProviderState {
  const { type, payload } = action;

  switch (type) {
    case 'selectedCityId/will-be-fetched': {
      return { ...state, selectedCityId: payload };
    }

    case 'city/will-be-posted': {
      return { ...state, cityToPostCity: payload };
    }

    case 'cityId/will-be-deleted': {
      return { ...state, cityIdToDeleteCity: payload };
    }

    default: {
      throw new Error('Invalid CityProviderAction.Type');
    }
  }
}
