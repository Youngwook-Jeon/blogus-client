import { Dispatch } from 'redux';
import { AUTH, IAuthType } from '../types/authTypes';
import { ALERT, IAlertType } from '../types/alertTypes';
import { IUserLogin, IUserRegister } from '../../utils/TypeScript';
import { postAPI, getAPI } from '../../utils/FetchData';
import { validRegister, validPhone } from '../../utils/Validators';
// import { checkTokenExp } from '../../utils/CheckTokenExp';

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true }});

    const res = await postAPI('auth/login', userLogin);

    dispatch({
      type: AUTH,
      payload: res.data
    });

    dispatch({ type: ALERT, payload: { success: res.data.msg }});
    localStorage.setItem('refresh', 'ok');
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg }});
  }
}

export const register = (userRegister: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const check = validRegister(userRegister);
  if (check.errLength > 0) return dispatch({ type: ALERT, payload: { errors: check.errMsg }});

  try {
    dispatch({ type: ALERT, payload: { loading: true }});
    const res = await postAPI(`auth/register`, userRegister);

    dispatch({ type: ALERT, payload: { success: res.data.msg }});
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.errors }});
  }
}