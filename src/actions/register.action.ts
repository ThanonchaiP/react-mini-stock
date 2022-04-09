import { REGISTER_FAILED, REGISTER_FETCHING, REGISTER_SUCCESS, server } from "../Constants";
import { RegisterResult } from "../types/authen.type";
import { User } from "../types/user.type";
import { httpClient } from "../utils/httpclient";

export const setRegisterFetchingToState = () => ({
  type: REGISTER_FETCHING,
});

export const setRegisterSuccess = (payload: any) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const setRegisterFailedToState = () => ({
  type: REGISTER_FAILED,
});

export const register = (user: User, navigate: any) => {
  return async (dispatch: any) => {
    try {
      //begin connecting...
      dispatch(setRegisterFetchingToState());

      //connect
      const result = await httpClient.post<RegisterResult>(server.REGISTER_URL, user);
      if (result.data.result === "ok") {
        dispatch(setRegisterSuccess(result.data));
        navigate("/login", { replace: true });
      } else {
        dispatch(setRegisterFailedToState());
      }
    } catch (error) {
      dispatch(setRegisterFailedToState());
    }
  };
};
