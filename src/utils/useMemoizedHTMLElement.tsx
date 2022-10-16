import { useMemo } from "react";

const useMemoizedHTMLElement = (elementOrSelector: string | HTMLElement) =>
  useMemo(
    () =>
      typeof elementOrSelector === "string"
        ? document.querySelector<HTMLElement>(elementOrSelector)!
        : elementOrSelector,
    [elementOrSelector]
  );

export default useMemoizedHTMLElement;
