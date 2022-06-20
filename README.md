# Effector-hotkey

Hotkeys with Effector made easy

- Easy-to-use, no need to implement by yourself
- Supports both Windows/MacOS style hotkeys
- Doesn't break if using with SSR

## Installation

```bash
npm i effector-hotkey
```

## Usage

```tsx
import { hotkey } from 'effector-hotkey';

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
import { hotkey } from 'effector-hotkey';

const spaceDown = hotkey({ key: 'Space', type: 'keydown' });
const spaceUp = hotkey({ key: 'Space', type: 'keyup' });
const spacePress = hotkey({ key: 'Space', type: 'keypress' });
```

#### Shortcut

```tsx
import { hotkey } from 'effector-hotkey';

const copyPressed = hotkey('Ctrl+C');
const spaceDown = hotkey('Space', 'keydown');
```

#### `filter` prop

```tsx
import { hotkey } from 'effector-hotkey';
import { createStore } from 'effector';

const $isConfirmModalOpened = createStore(true);

hotkey({
  key: 'Y',
  filter: $isConfirmModalOpened,
  target: removeFx,
});

hotkey({
  key: 'N',
  filter: $isConfirmModalOpened,
  target: closeModal,
});
```

#### `target` prop

If you want to just trigger something instead of listening to event, you can use `target` prop:

```tsx
import { sample } from 'effector';
import { hotkey } from 'effector-hotkey';

hotkey({
  key: 'Ctrl+C',
  target: copyTextFx,
});
// <=>
sample({
  clock: hotkey('Ctrl+C'),
  target: copyTextFx,
});
```

## Extra

#### `keyup`, `keydown`, `keypress` events

You can use internal wrappers for native events as well

```tsx
import { keyup, keydown, keypress } from 'effector-hotkey';

keyup.watch(console.log); // KeyboardEvent
```

#### `$isShiftDown`, `$isCtrlDown`, `$isAltDown`

You can also use pre-made stores to track if `Shift`/`Ctrl`/`Alt` buttons are held

Simple use-case: display hotkeys in UI while holding `Ctrl`

```tsx
import { useStore } from 'effector-react';
import { hotkey, $isCtrlDown } from 'effector-hotkey';

const SubmitButton = () => {
  const isCtrlDown = useStore($isCtrlDown);

  return (
    <Button onClick={savePressed}>{isCtrlDown ? 'Ctrl+S' : 'Save'}</Button>
  );
};

const savePressed = createEvent<MouseEvent>();

sample({
  clock: [savePressed, hotkey('Ctrl+S')],
  target: saveFx,
});
```

## `keyboardSequence`

It creates an event that triggers after a user types a given sequence on a keyboard in a browser.

```ts
const iddqdTyped = keyboardSequence('iddqd');

iddqd.watch(() => console.log('GOD MOD ENABLED'));
```

To use operator in application with `scope`, you have to pass `start` event explicitly.

```ts
const appStarted = createEvent();

const iddqdTyped = keyboardSequence('iddqd', { start: appStarted });

iddqd.watch(() => console.log('GOD MOD ENABLED'));

const scope = fork();

// call appStarted on scope to start keyboard listening
```
