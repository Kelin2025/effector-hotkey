# Effector-hotkey

Hotkeys with Effector made easy

- Easy-to-use, no need to implement by yourself
- Supports both Windows/MacOS style hotkeys
- Doesn't break if using with SSR

## Installation

```bash
npm i effectot-hotkey
```

## Usage

```tsx
import { hotkey } from 'effector';

const copyPressed = hotkey({ key: 'Ctrl+C' });

sample({
  clock: copyPressed,
  source: $formData,
  target: saveFx,
});
```

## Customization

#### Specifying event type

```tsx
const spaceDown = hotkey({ key: 'Space', type: 'keydown' });
const spaceUp = hotkey({ key: 'Space', type: 'keyup' });
const spacePress = hotkey({ key: 'Space', type: 'keypress' });
```

#### Shortcut

```tsx
const copyPressed = hotkey('Ctrl+C');
const spaceDown = hotkey('Space', 'keydown');
```

## Extra

#### `keyup`, `keydown`, `keypress` events

You can use internal wrappers for native events as well

```tsx
import { keyup, keydown, keypress } from 'effector';

keyup.watch(console.log); // KeyboardEvent
```
