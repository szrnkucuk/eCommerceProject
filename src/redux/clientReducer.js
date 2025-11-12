const SET_USER = "client/SET_USER";
const LOGOUT   = "client/LOGOUT";

function safeParseUser() {
  try {
    const str = localStorage.getItem("user");
    if (!str || str === "undefined" || str === "null") return null;
    return JSON.parse(str);
  } catch {
    return null;
  }
}

const initialState = {
  user: safeParseUser(),
};

export function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { ...state, user: null };
    default:
      return state;
  }
}

export const setUser      = (user) => ({ type: SET_USER, payload: user });
export const logoutAction = () => ({ type: LOGOUT });
