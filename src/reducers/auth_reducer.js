import {
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGIN_SUCCESS
} from "../actions/actionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
      break;
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
      break;
    default:
      return state;
  }
}
