import { useState } from "react";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "helpers";

const useCheckLogin = () => {
  const [token, setToken] = useState(
    Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY)
  );

  const query_string = window.location.search;

  const UrlParams = new URLSearchParams(query_string);

  const auth_token = UrlParams.get("token1");

  if (auth_token) {
    Cookies.set(TOKEN_KEY, auth_token);
    setToken(auth_token);
  }

  return {
    token,
    is_logged_in:
      token && token !== "null" && token !== undefined ? true : false,
  };
};

export default useCheckLogin;
