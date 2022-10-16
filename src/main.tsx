import styled from "@emotion/styled";
import { Suspense } from "react";
import Container from "./Container";
import Fallback from "./Fallback";
import { maxGridAreaCss } from "./Overlay/Contained";
import SuspenseOverlayCore from "./SuspenseOverlayCore";

const GridItem = styled.div(({ contained }: { contained: boolean }) =>
  contained ? maxGridAreaCss : undefined
);

export const defaults = {
  ChildrenWrapper: GridItem,
  Container,
  // Omit prop `open`. The prop is set by SuspenseOverlayCore.
  Fallback: Fallback as (
    props: Omit<React.ComponentProps<typeof Fallback>, "open">
  ) => ReturnType<typeof Fallback>,
  // If a specific container is not given, default `contained` to `true` – the
  // fallback is contained to be inside the SuspenseOverlay.
  // If a specific container is given, default `contained` to `false` – the
  // fallback is rendered using a portal.
  contained: (props: Props) => typeof props.container === "undefined",
};

interface Props
  extends React.ComponentProps<typeof Suspense>,
    Omit<
      React.ComponentProps<typeof SuspenseOverlayCore>,
      "children" | "fallback"
    >,
    Omit<
      React.ComponentProps<typeof Fallback>,
      "contained" | "suspend" | "open" | "children"
    > {
  ChildrenWrapper?: typeof defaults.ChildrenWrapper;
  Container?: typeof defaults.Container;
  Fallback?: typeof defaults.Fallback;
  contained?: boolean;
}

export default function SuspenseOverlay(props: Props) {
  const {
    ChildrenWrapper = defaults.ChildrenWrapper,
    Container = defaults.Container,
    Fallback = defaults.Fallback,
    children,
    contained = defaults.contained(props),
    fallback,
    ...otherProps
  } = props;

  const forwardProps = { contained, ...otherProps };

  return (
    <Container {...forwardProps}>
      <SuspenseOverlayCore
        {...otherProps}
        fallback={<Fallback {...forwardProps}>{fallback}</Fallback>}
      >
        <ChildrenWrapper {...forwardProps}>{children}</ChildrenWrapper>
      </SuspenseOverlayCore>
    </Container>
  );
}

export { SuspenseOverlayCore };
