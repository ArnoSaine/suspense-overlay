import { useState } from "react";
import Suspense from "suspense-overlay";
import Simulations from "./Simulations";
import Suspend from "./Suspend";

export default function App() {
  return (
    <>
      <InteractiveDemo />
      <InteractiveDemo contained={false} />

      <Simulations fallback="loading...">
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </Simulations>
    </>
  );
}

function InteractiveDemo({ contained }: { contained?: boolean }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <button onClick={() => setIsLoading((isLoading) => !isLoading)}>
        {isLoading ? "Stop" : "Suspend"}
      </button>
      <Suspense
        // Backdrop={({ children }) => (
        //   <div
        //     style={{
        //       display: "flex",
        //       alignItems: "center",
        //       justifyContent: "center",
        //       backgroundColor: "lime",
        //       gridArea: "1 / 1",
        //     }}
        //   >
        //     {children}
        //   </div>
        // )}
        fallback={
          contained === false ? (
            <>
              loading...
              <button
                onClick={() => {
                  setIsLoading(false);
                }}
              >
                Stop
              </button>
            </>
          ) : (
            "loading..."
          )
        }
        contained={contained}
      >
        <Suspend isLoading={isLoading} />
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </Suspense>
    </>
  );
}
