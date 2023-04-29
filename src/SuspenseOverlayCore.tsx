import { cloneElement, Suspense, useLayoutEffect, useRef } from "react";
import useSetStateOnRender from "./utils/useSetStateOnRender.js";

export interface SuspenseOverlayCoreProps
  extends React.ComponentProps<typeof Suspense> {
  children: React.ReactElement;
  fallback: React.ReactElement;
  inProp?: string;
}

export default function SuspenseOverlayCore({
  children,
  fallback,
  inProp = "open",
}: SuspenseOverlayCoreProps) {
  const [suspend, SetSuspend] = useSetStateOnRender(false);
  const childrenRef = useRef<HTMLElement>();
  const displayRef = useRef<string>();

  useLayoutEffect(() => {
    if (suspend && childrenRef.current) {
      if (displayRef.current) {
        childrenRef.current.style.setProperty("display", displayRef.current);
      } else {
        childrenRef.current.style.removeProperty("display");
      }
    }
  }, [suspend, childrenRef]);

  return (
    <>
      <Suspense fallback={<SetSuspend state />}>
        <>
          {cloneElement(children, {
            ref: (elem: HTMLElement) => {
              // Don't lose the value on suspend. Update only if we get a new element.
              if (elem) {
                childrenRef.current = elem;
                displayRef.current = elem.style.display;
              }
            },
          })}
          <SetSuspend />
        </>
      </Suspense>
      {cloneElement(fallback, { [inProp]: suspend })}
    </>
  );
}
