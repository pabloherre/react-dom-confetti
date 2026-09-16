# @pabloherre/react-dom-confetti

A lightweight React component that adds animated confetti to an existing DOM element.

## Preview

[View the live demo](https://pabloherre.github.io/react-dom-confetti/)

## Install

```bash
npm install @pabloherre/react-dom-confetti
```

## Usage by ref

```jsx
import { useState } from 'react';
import Confetti from '@pabloherre/react-dom-confetti';
import '@pabloherre/react-dom-confetti/styles.css';

export default function Celebration() {
  const [celebration, setCelebration] = useState(null);

  return (
    <section ref={setCelebration} id="celebration">
      <h1>Congratulations!</h1>
      <Confetti element={celebration} particles={42} speed={2} glow />
    </section>
  );
}
```

## Usage by id
```jsx
import { useState } from 'react';
import Confetti from '@pabloherre/react-dom-confetti';
import '@pabloherre/react-dom-confetti/styles.css';

export default function Celebration() {
  return (
    <section id="celebration">
      <h1>Congratulations!</h1>
      <Confetti elementId="celebration" particles={42} speed={2} glow />
    </section>
  );
}
```

You can also target an element by ID with `elementId="celebration"`. When both
`element` and `elementId` are provided, `element` takes precedence.

The target element should have `position: relative` so the confetti stays inside it.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `element` | `HTMLElement \| null` | — | DOM element that receives the confetti portal. Takes precedence over `elementId`. |
| `elementId` | `string` | — | ID of the element that receives the confetti portal when `element` is not provided. |
| `particles` | `number` | `40` | Number of confetti pieces to render. |
| `speed` | `number` | `1` | Animation speed multiplier. Higher values make the confetti move faster. |
| `delay` | `number` | `0` | Delay before the animation starts, in milliseconds. |
| `repeat` | `string` | `'infinite'` | CSS animation repeat value, such as `'infinite'` or `'1'`. |
| `size` | `number` | `1` | Confetti piece size multiplier. Values below `1` shrink pieces; values above `1` enlarge them. |
| `glow` | `boolean` | `true` | Enables a soft color-matched glow around each confetti piece. |

## Development

Run the local showcase with `npm run dev`. Build both the demo and package with `npm run build`.

To preview the production demo, run `npm run preview`. This builds `dist-demo`
and serves it through Vite. Do not open `dist-demo/index.html` through the
WebStorm `localhost:63342` static server, because that server does not serve
the generated `/assets` files from the demo output directory.
