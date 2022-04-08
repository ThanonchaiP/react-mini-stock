import { REGISTER_FAILED, REGISTER_FETCHING, REGISTER_SUCCESS, server } from "../Constants";
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

export const register = (user: User) => {
  return async (dispatch: any) => {
    try {
      //begin connecting...
      dispatch(setRegisterFetchingToState);

      //connect
      const result = await httpClient.post(server.REGISTER_URL, user);
      dispatch(setRegisterSuccess(result.data));
    } catch (error) {
      dispatch(setRegisterFailedToState);
    }
  };
};