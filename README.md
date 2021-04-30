Suspense, which shows the fallback on top of previous content.

![demo](demo.gif 'Demo')

## Example

```js
import Suspense from 'suspense-overlay';

export default function App() {
  return <Suspense fallback="loading...">...</Suspense>;
}
```

## `<Suspense>`

### Props

| Name       | Description          |
| ---------- | -------------------- |
| `children` | As in React.Suspense |
| `fallback` | As in React.Suspense |

#### Optional

| Name                       | Default value              | Description                                                       |
| -------------------------- | -------------------------- | ----------------------------------------------------------------- |
| `contained`                | `true`                     | Set `false` to show fullscreen overlay                            |
| `containerComponent`       | `div`                      | Component that wraps everything                                   |
| `containerStyle`           | `{ position: 'relative' }` | Styles for `containerComponent`                                   |
| `filter`                   | `blur(4px)`                | Style applied to the overlay                                      |
| `delay`                    | `100`                      | Delay in ms before the visible overlay is shown                   |
| `minDuration`              | `500`                      | Min duration in ms to show the overlay                            |
| `root`                     | `"#root"`                  | Query selector for application root (when `contained` is `false`) |
| `wrapperComponent`         | `div`                      | Component that wraps the actual children                          |
| `fallbackStyle`            | <i>(centered)</i>          | Style for `fallbackWrapperComponent`                              |
| `overlayComponent`         | `div`                      | Component for the overlay                                         |
| `fallbackWrapperComponent` | `div`                      | Component that wraps the fallback element                         |

see [Fallback.js](src/Fallback.js) for more overrides and details.
