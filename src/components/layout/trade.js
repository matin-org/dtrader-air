import React, { useEffect, useState } from "react";
import { APP_ID, popupCenter, LOGIN_POPUP, isMobile, isBrowser } from "helpers";
import { useCheckLogin } from "components/hooks";
import { useDtraderAirWS, DtraderAirStore } from "store";
import { TradeTypes, Duration, Stake } from "components/widgets";

const Trade = () => {
  const { is_logged_in, token } = useCheckLogin();
  const [is_loading, setLoading] = useState(true);
  const [client, setClient] = useState({
    name: "",
    balance: 0,
    currency: "",
    email: "",
  });

  const { send } = useDtraderAirWS();
  const { useAccounts } = React.useContext(DtraderAirStore);
  const [, setAccounts] = useAccounts;

  useEffect(() => {
    if (is_logged_in && token) {
      send(
        {
          authorize: token,
        },
        (response) => {
          if (response.authorize) {
            const { fullname, balance, currency, email, account_list } =
              response.authorize;

            setAccounts(account_list);
            setClient({ name: fullname, balance, currency, email });
            setLoading(false);
          }
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  if (is_loading) {
    return <></>;
  }

  const handleLogin = () => {
    const login_url = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=en&brand=light-trader`;

    if (isMobile()) {
      if (isBrowser()) {
        window.location = login_url;
      }
    } else {
      popupCenter({
        url: login_url,
        title: LOGIN_POPUP,
        w: 900,
        h: 500,
      });
    }
  };

  return (
    <section className="common-container trade-container">
      {is_logged_in ? (
        <>
          <TradeTypes />
          <Duration />
          <Stake />
          {/* <div className="client-profile">
            <div>Welcome! {client.name || client.email}</div>
            <br />
            <div>Your balance is {`${client.balance} ${client.currency}`}</div>
          </div> */}
        </>
      ) : (
        <div>
          <button className="btn primary" onClick={handleLogin}>
            Log In
          </button>
        </div>
      )}
    </section>
  );
};

export default Trade;
