import styled from "@emotion/styled";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import Grid from "../Grid";
import useMemoizedHTMLElement from "../utils/useMemoizedHTMLElement";
import Backdrop from "./Backdrop";

const MaxSpace = styled(Grid)(
  ({ isFullscreen }: { isFullscreen: boolean }) => ({
    position: isFullscreen ? "fixed" : "absolute",
    inset: 0,
  })
);

export const defaults = {
  Backdrop,
  fullscreenContainer: document.body,
  OverlayPortal: MaxSpace,
};

interface Props {
  Backdrop?: typeof Backdrop;
  children?: React.ComponentProps<typeof Backdrop>["children"];
  container?: string | HTMLElement;
  fullscreenContainer?: string | HTMLElement;
  OverlayPortal?: typeof MaxSpace;
}

const Portal = forwardRef<HTMLDivElement, Props>(function Portal(
  {
    Backdrop = defaults.Backdrop,
    children,
    container,
    fullscreenContainer = defaults.fullscreenContainer,
    OverlayPortal = defaults.OverlayPortal,
  },
  ref
) {
  fullscreenContainer = useMemoizedHTMLElement(fullscreenContainer);
  container ??= fullscreenContainer;
  container = useMemoizedHTMLElement(container);

  const isFullscreen = container === fullscreenContainer;

  return createPortal(
    <OverlayPortal ref={ref} isFullscreen={isFullscreen}>
      <Backdrop>{children}</Backdrop>
    </OverlayPortal>,
    container!
  );
});

export default Portal;
