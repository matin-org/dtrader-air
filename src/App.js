import Cookies from "js-cookie";
import "./App.css";
import { APP_ID } from "./helpers";

function App() {
  const query_string = window.location.search;

  const UrlParams = new URLSearchParams(query_string);

  const token = UrlParams.get("token1");

  Cookies.set("lt_token", token);

  return (
    <div className="App">
      {token}-{APP_ID}
    </div>
  );
}

export default App;
