import { APP_ID } from "helpers";

class CustomPromise {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolveFn = resolve;
      this.rejectFn = reject;
    });
  }

  reject(reason) {
    this.rejectFn(reason);
  }

  resolve(param) {
    this.resolveFn(param);
  }
}

export default class DerivWS {
  pendingRequests = {};
  resolvedRequests = [];
  reqId = 0;
  connected = new CustomPromise();
  socket_url = `wss://ws.binaryws.com/websockets/v3?app_id=${APP_ID}`;

  constructor() {
    const connection = new WebSocket(this.socket_url);
    connection.onopen = this.openHandler;
    connection.onmessage = this.messageHandler;

    this.connection = connection;
    this.callbacks = {};
  }

  isConnectionClosed() {
    const closed_state = [2, 3];
    return closed_state.includes(this.connection.readyState);
  }

  openHandler = () => {
    if (this.connection.readyState === 1) {
      this.connected.resolve();
    } else {
      setTimeout(this.openHandler, 50);
    }
  };

  send(request) {
    const pending = new CustomPromise();

    request.req_id = ++this.reqId;

    this.pendingRequests[request.req_id] = pending;

    this.connected.promise
      .then(() => {
        if (this.isConnectionClosed()) return;

        this.connection.send(JSON.stringify(request));
      })
      .catch((e) => pending.reject(e));

    return pending.promise;
  }

  messageHandler = (msg) => {
    const response = JSON.parse(msg.data);
    const reqId = response.req_id;

    if (reqId) {
      if (this.resolvedRequests.includes(reqId)) {
        this.callbacks[reqId](response);
      }

      if (reqId in this.pendingRequests) {
        this.resolvedRequests.push(reqId);
        this.pendingRequests[reqId].resolve(response);
        delete this.pendingRequests[reqId];
      }
    }
  };
}
