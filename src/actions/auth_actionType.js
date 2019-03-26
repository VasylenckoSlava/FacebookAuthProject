import { AsyncStorage } from "react-native";
import * as actionTypes from "./actionTypes";
import { Facebook } from "expo";

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem("fb_token");
  // console.log('token',token)
  if (token) {
    // dispatch an action saying FB login is done
    dispatch({ type: actionTypes.FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // start up FB Login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  let { type, token} = await Facebook.logInWithReadPermissionsAsync(
    "1509093279223886", {
      permissions: ["public_profile"]
    });
  if(type === 'cancel') {
    return dispatch({type: actionTypes.FACEBOOK_LOGIN_FAIL})
  }
  await AsyncStorage.setItem('fb_token', token);
  dispatch({type: actionTypes.FACEBOOK_LOGIN_SUCCESS, payload: token})
};


