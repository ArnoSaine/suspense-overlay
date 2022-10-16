import { forwardRef } from "react";
import Contained from "./Contained";
import Portal from "./Portal";

export interface Props
  extends React.ComponentProps<typeof Contained>,
    React.ComponentProps<typeof Portal> {
  contained: boolean;
}

const Overlay = forwardRef<HTMLDivElement, Props>(function Overlay(
  { contained, ...otherProps },
  ref
) {
  const Component = contained ? Contained : Portal;

  return <Component ref={ref} {...otherProps} />;
});

export default Overlay;
