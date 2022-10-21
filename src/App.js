import Cookies from "js-cookie";
import { useState } from "react";
import "./App.css";
import { APP_ID } from "./helpers";

function App() {
  const [token, setToken] = useState(Cookies.get("lt_token"));

  const query_string = window.location.search;

  const UrlParams = new URLSearchParams(query_string);

  const auth_token = UrlParams.get("token1");

  if (auth_token) {
    Cookies.set("lt_token", auth_token);
  }

  if (!token || token === "null") {
    return (
      <div>
        <button
          onClick={() => {
            const login_url = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=en&brand=light-trader`;

            window.location = login_url;
          }}
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      {token}-{APP_ID}
    </div>
  );
}

export default App;
