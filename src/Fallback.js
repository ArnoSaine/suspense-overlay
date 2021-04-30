import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import replaceFirstChild from './replaceFirstChild';
import useStateIfMounted from './useStateIfMounted';

export default function Fallback({
  contained = true,
  delay = 100,
  filter = 'blur(4px)',
  root = '#root',
  fallbackWrapperComponent: FallbackWrapperComponent = 'div',
  overlayComponent: OverlayComponent = 'div',
  WrapperComponent,
  overlayDelayBaseStyle = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlayDelayStyle = {
    ...overlayDelayBaseStyle,
    position: 'fixed',
  },
  overlayDelayContainedStyle = {
    ...overlayDelayBaseStyle,
    position: 'absolute',
  },
  overlayStyle = {
    ...overlayDelayStyle,
    backdropFilter: filter,
  },
  overlayContainedStyle = {
    ...overlayDelayContainedStyle,
  },
  fallbackStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  wrapperOnOverlayStyle,
  wrapperOnOverlayContainedStyle = {
    filter,
  },
  contentRef,
  fallback,
  startMinDuration,
}) {
  const [delayed, setDelayed] = useStateIfMounted(Boolean(delay));
  useEffect(() => {
    if (delayed) {
      const timeout = setTimeout(() => {
        if (setDelayed(false) && startMinDuration) {
          startMinDuration();
        }
      }, delay);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [delay, delayed, setDelayed, startMinDuration]);
  const overlay = (
    <OverlayComponent
      style={
        delayed
          ? contained
            ? overlayDelayContainedStyle
            : overlayDelayStyle
          : contained
          ? overlayContainedStyle
          : overlayStyle
      }
    >
      {!delayed && (
        <FallbackWrapperComponent style={fallbackStyle}>
          {fallback}
        </FallbackWrapperComponent>
      )}
    </OverlayComponent>
  );
  return (
    <>
      <WrapperComponent
        style={
          delayed
            ? undefined
            : contained
            ? wrapperOnOverlayContainedStyle
            : wrapperOnOverlayStyle
        }
        ref={
          contentRef.current &&
          ((elem) => {
            if (elem) {
              const clone = contentRef.current.cloneNode(true);
              clone.style.removeProperty('display');
              elem::replaceFirstChild(clone);
            }
          })
        }
      />
      {contained
        ? overlay
        : createPortal(overlay, document.querySelector(root))}
    </>
  );
}
