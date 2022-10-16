export default function Suspend({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    throw new Promise(() => {});
  }
  return null;
}
