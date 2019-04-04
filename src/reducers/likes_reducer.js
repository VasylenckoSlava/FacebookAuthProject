import _ from "lodash";
import { REHYDRATE } from "redux-persist/es/constants";
import { CLEAR_LIKED_JOB, LIKE_JOB } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case LIKE_JOB:
      return _.uniqBy([action.payload, ...state], "jobkey");
    case CLEAR_LIKED_JOB:
      return [];
    default:
      return state;
  }
}
