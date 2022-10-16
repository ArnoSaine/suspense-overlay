import Suspense from "suspense-overlay";
import Simulate from "./Simulate";

export default function Simulations(
  props: React.ComponentProps<typeof Suspense>
) {
  return (
    <>
      <Layout {...props} />
      <Layout {...props} contained={false} />
    </>
  );
}

function Layout(props: React.ComponentProps<typeof Suspense>) {
  return (
    <>
      <Simulate {...props} suspense immediate />
      <Simulate {...props} immediate />
      <Simulate {...props} suspense />
      <Simulate {...props} />
    </>
  );
}
