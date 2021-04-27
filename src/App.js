import React, { useState } from 'react';
import Suspense from 'suspense-overlay';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <button onClick={() => setIsLoading((isLoading) => !isLoading)}>
        {isLoading ? 'Stop' : 'Suspend'}
      </button>
      <Suspense fallback="loading...">
        <Suspender isLoading={isLoading} />
      </Suspense>
    </>
  );
}

function Suspender({ isLoading }) {
  if (isLoading) {
    throw new Promise(() => {});
  }
  return (
    <>
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </>
  );
}
