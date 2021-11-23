import {ThunkActionResult} from '../types/action-type';
import {loadOffers, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {OfferType} from '../types/offer-type';
import {AuthDataType} from '../types/auth-data-type';
import {Adapter} from '../adapter/adapter';
import {toast} from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);

    dispatch(loadOffers(data.map(Adapter.adaptOfferToClient)));

  };


export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
    toast.info(AUTH_FAIL_MESSAGE);
  };

export const loginAction = ({login: email, password}: AuthDataType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    dispatch(redirectToRoute(AppRoute.SignIn));
  };