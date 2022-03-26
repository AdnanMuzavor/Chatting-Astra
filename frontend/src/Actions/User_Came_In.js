//To initialise current chat to {}

import { RE_INITIALISE_CHAT } from "../Constants/ChatConstants";

//So as to facilitate proper socket io functionality
export const UserCameIn = () => (dispatch) => {
  dispatch({ type: RE_INITIALISE_CHAT });
};
