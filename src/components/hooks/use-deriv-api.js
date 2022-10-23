import { useState, useLayoutEffect, useRef } from "react";
import DerivWS from "components/websocket/api";

export const useDerivApi = () => {
  const [is_opened, setOpened] = useState(false);
  const ws = useRef(null);

  useLayoutEffect(() => {
    if (!is_opened) {
      const deriv_api = new DerivWS();
      setOpened(true);
      ws.current = deriv_api;
    }
  }, [is_opened]);

  const send = async (data, callback) => {
    if (ws) {
      const response = await ws.current.send(data);

      ws.current.callbacks[response.req_id] = callback;

      callback(response);
    }
  };

  return { send };
};
