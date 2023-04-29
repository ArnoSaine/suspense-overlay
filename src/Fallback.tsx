import { ClassNames } from "@emotion/react";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Overlay from "./Overlay/index.js";

export const defaults = {
  visibleStyles: {
    backdropFilter: "blur(4px)",
    opacity: 1,
  },
  hiddenStyles: {
    backdropFilter: "blur(0px)",
    opacity: 0,
  },
  timeout: 225,
  cssTransitionProps(
    props: Props,
    css: Parameters<
      React.ComponentProps<typeof ClassNames>["children"]
    >[0]["css"]
  ): React.ComponentProps<typeof CSSTransition> {
    return {
      in: props.open,
      timeout: this.timeout,
      unmountOnExit: true,
      classNames: {
        enter: css(this.hiddenStyles),
        enterActive: css({
          ...this.visibleStyles,
          transition: `all ${this.timeout}ms`,
        }),
        enterDone: css(this.visibleStyles),
        exit: css(this.visibleStyles),
        exitActive: css({
          ...this.hiddenStyles,
          transition: `all ${this.timeout}ms`,
        }),
      },
    };
  },
  Overlay,
};

interface Props extends React.ComponentProps<typeof Overlay> {
  cssTransitionProps?: typeof defaults.cssTransitionProps;
  open: boolean;
  Overlay?: typeof defaults.Overlay;
}

export default function Fallback(props: Props) {
  props = {
    ...defaults,
    ...props,
  };
  const { Overlay, cssTransitionProps, ...otherProps } = props;
  const Overlay_ = Overlay!;

  const nodeRef = useRef(null);

  return (
    <ClassNames>
      {({ css }) => (
        <CSSTransition
          nodeRef={nodeRef}
          {...props.cssTransitionProps!(props, css)}
        >
          <Overlay_ ref={nodeRef} {...otherProps} />
        </CSSTransition>
      )}
    </ClassNames>
  );
}
