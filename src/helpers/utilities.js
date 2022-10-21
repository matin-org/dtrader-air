export const isBrowser = () => typeof window !== "undefined";
export const isLocal = () =>
  isBrowser && window.location.hostname === "localhost";
