import { useCallback, useLayoutEffect, useState } from "react";

export default function useSetStateOnRender<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  const SetState = useCallback(function SetState({
    state = initialState,
  }: {
    state?: T;
  }) {
    useLayoutEffect(() => setState(state), [state, setState]);

    return null;
  },
  []);

  return [state, SetState] as [typeof state, typeof SetState];
}
