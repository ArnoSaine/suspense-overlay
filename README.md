Version of Suspense, which shows the fallback on top of previous content.

![demo](demo.gif 'Demo')

## API

Same as [React.Suspense](https://reactjs.org/docs/react-api.html#reactsuspense), with additional style overrides (see [Fallback.js](src/Fallback.js)).

## Example

```js
import Suspense from 'suspense-overlay';

export default function App() {
  return <Suspense fallback="loading...">...</Suspense>;
}
```
