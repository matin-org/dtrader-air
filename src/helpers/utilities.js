export const isBrowser = () => typeof window !== "undefined";
export const isLocal = () =>
  isBrowser() && window.location.hostname === "localhost";

export const popupCenter = ({ url, title, w, h }) => {
  const dualScreenLeft =
    isBrowser() && window.screenLeft !== undefined
      ? isBrowser() && window.screenLeft
      : isBrowser() && window.screenX;
  const dualScreenTop =
    isBrowser() && window.screenTop !== undefined
      ? isBrowser() && window.screenTop
      : isBrowser() && window.screenY;

  const width =
    isBrowser() && window.innerWidth
      ? isBrowser() && window.innerWidth
      : isBrowser() && document.documentElement.clientWidth
      ? isBrowser() && document.documentElement.clientWidth
      : screen.width;
  const height =
    isBrowser() && window.innerHeight
      ? isBrowser() && window.innerHeight
      : isBrowser() && document.documentElement.clientHeight
      ? isBrowser() && document.documentElement.clientHeight
      : screen.height;

  const systemZoom = width / isBrowser() && window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow =
    isBrowser() &&
    window.open(
      url,
      title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );

  if (isBrowser() && window.focus) newWindow.focus();
};

export const ArrRemoveItemByValue = (arr, item) =>
  arr.filter((f) => f !== item);
