import { Suspense, useRef } from 'react';
import Fallback from './Fallback';
import MinDurationHandler from './MinDurationHandler';

export default function SuspenseOverlay({
  wrapper: WrapperComponent = 'div',
  children,
  container: ContainerComponent = 'div',
  containerStyle = { position: 'relative' },
  minDuration = 500,
  ...otherProps
}) {
  const contentRef = useRef();
  const minDurationHandler = useRef();
  const suspense = (
    <Suspense
      fallback={
        <Fallback
          startMinDuration={minDurationHandler.current?.startMinDuration}
          contentRef={contentRef}
          WrapperComponent={WrapperComponent}
          {...otherProps}
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
