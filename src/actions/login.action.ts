import { LOGIN_FAILED, LOGIN_FETCHING, LOGIN_SUCCESS, LOGOUT, OK, server, TOKEN } from "../Constants";
import { LoginResult } from "../types/authen.type";
import { User } from "../types/user.type";
import { httpClient } from "../utils/httpclient";

export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccess = (payload: LoginResult) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginFailedToState = () => ({
  type: LOGIN_FAILED,
});

export const setLogoutToState = () => ({
  type: LOGOUT,
});

export const login = (user: User, navigate: any) => {
  return async (dispatch: any) => {
    try {
      //begin connecting...
      dispatch(setLoginFetchingToState());

      //connect
      const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
      if (result.data.result === OK) {
        localStorage.setItem(TOKEN, result.data.token!);
        dispatch(setLoginSuccess(result.data));
        navigate("/stock", { replace: true });
      } else {
        dispatch(setLoginFailedToState());
      }
    } catch (error) {
      dispatch(setLoginFailedToState());
    }
  };
};

export const restoreLogin = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      dispatch(
        setLoginSuccess({
          result: OK,
          token,
          message: "login successfully",
        })
      );
    }
  };
};

export const logout = (navigate: any) => {
  return (dispatch: any) => {
    localStorage.removeItem(TOKEN);
    dispatch(setLogoutToState());
    alert("logout successfully");
    navigate("/login");
  };
};
