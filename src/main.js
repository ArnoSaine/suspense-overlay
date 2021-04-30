import { Suspense, useRef } from 'react';
import Fallback from './Fallback';
import MinDurationHandler from './MinDurationHandler';

export default function SuspenseOverlay({
  children,
  containerComponent: ContainerComponent = 'div',
  containerStyle = { position: 'relative' },
  minDuration = 500,
  wrapperComponent: WrapperComponent = 'div',
  ...otherProps
}) {
  const contentRef = useRef();
  const minDurationHandler = useRef();
  const suspense = (
    <Suspense
      fallback={
        <Fallback
          {...otherProps}
          startMinDuration={minDurationHandler.current?.startMinDuration}
          contentRef={contentRef}
          WrapperComponent={WrapperComponent}
        />
      }
    >
      <MinDurationHandler ref={minDurationHandler} minDuration={minDuration}>
        <WrapperComponent ref={contentRef}>{children}</WrapperComponent>
      </MinDurationHandler>
    </Suspense>
  );
  return ContainerComponent ? (
    <ContainerComponent style={containerStyle}>{suspense}</ContainerComponent>
  ) : (
    suspense
  );
}
