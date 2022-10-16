import Grid from "./Grid";

type Props = React.PropsWithChildren<{ contained: boolean }>;

export default function Container({ contained, children }: Props) {
  return contained ? <Grid>{children}</Grid> : (children as JSX.Element);
}
