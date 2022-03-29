# Effector-hotkey

Hotkeys with Effector made easy

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
