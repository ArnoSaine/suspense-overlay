import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { forwardRef } from "react";
import Backdrop from "./Backdrop.js";

export const maxGridAreaCss = css({
  gridArea: "1 / 1",
});

const BackdropGridItem = styled(Backdrop)(maxGridAreaCss);

export const defaults = {
  Backdrop: BackdropGridItem,
};

interface Props extends React.ComponentProps<typeof Backdrop> {
  Backdrop?: typeof Backdrop;
}

const Contained = forwardRef<HTMLDivElement, Props>(function Contained(
  { Backdrop = defaults.Backdrop, ...otherProps },
  ref
) {
  return <Backdrop ref={ref} {...otherProps} />;
});

export default Contained;
