import { useLayoutEffect, useState } from "react";
import Suspense from "suspense-overlay";
import Suspend from "./Suspend";

interface SimulateProps extends React.ComponentProps<typeof Suspense> {
  immediate?: boolean;
  suspense?: boolean;
}
export default function Simulate({
  children,
  immediate = false,
  suspense = false,
  ...otherProps
}: SimulateProps) {
  const [hasContent, setHasContent] = useState(immediate);
  const [container, setContainer] = useState<HTMLElement | undefined>(
    undefined
  );

  const suspenseElement = (
    <Suspense {...otherProps} container={container}>
      <Suspend isLoading={suspense && hasContent} />
      {children}
      <TrackComponentLifecycle
        onMount={() => {
          setHasContent(true);
        }}
      />
    </Suspense>
  );

  // Default for `contained` is true. Check only if prop is false.
  const isFullscreen = otherProps.contained === false;

  return (
    <>
      <h2>
        {[
          immediate ? "immediate" : "subsequent",
          suspense ? "fallback" : "children",
          isFullscreen ? "fullscreen (portal)" : "contained",
        ].join(" / ")}
      </h2>
      {isFullscreen ? (
        <div
          ref={(elem) => setContainer(elem ?? undefined)}
          style={{ position: "relative" }}
        >
          <div>Container</div>
          <div>Container</div>
          <div>Container</div>
          {container && suspenseElement}
          <div>Container</div>
        </div>
      ) : (
        suspenseElement
      )}
    </>
  );
}

function TrackComponentLifecycle({ onMount }: { onMount: () => void }) {
  useLayoutEffect(onMount, []);

  return null;
}
