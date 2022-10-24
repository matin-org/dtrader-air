import React, { useEffect, useState } from "react";
import { APP_ID, popupCenter, LOGIN_POPUP } from "helpers";
import { useCheckLogin } from "components/hooks";
import { useDtraderAirWS } from "store";

const Trade = () => {
  const { is_logged_in, token } = useCheckLogin();
  const [is_loading, setLoading] = useState(true);
  const [client, setClient] = useState({
    name: "",
    balance: 0,
    currency: "",
  });

  const { send } = useDtraderAirWS();

  useEffect(() => {
    if (is_logged_in && token) {
      send(
        {
          authorize: token,
        },
        (response) => {
          if (response.authorize) {
            const { fullname } = response.authorize;

            setClient({ ...client, name: fullname });
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

  return (
    <section className="common-container trade-container">
      {is_logged_in ? (
        <>Welcome! {client.name || client.email}</>
      ) : (
        <div>
          <button
            className="btn primary"
            onClick={() =>
              popupCenter({
                url: `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=en&brand=light-trader`,
                title: LOGIN_POPUP,
                w: 900,
                h: 500,
              })
            }
          >
            Log In
          </button>
        </div>
      )}
    </section>
  );
};

export default Trade;
