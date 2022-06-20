import {
  createEvent,
  createStore,
  Event,
  Store,
  sample,
  scopeBind,
  createEffect,
  is,
} from 'effector';

/**
 * Creates an event that triggers after a user types a given sequence on a keyboard in a browser
 *
 * @param wantedSequence - Sequence of keys that should be typed
 * @param options.start - Event that triggers the start of the listening, used to bound result of operator to `scope`
 */
function keyboardSequence(
  wantedSequence: Store<string> | string,
  options?: { start: Event<void> }
): Event<void> {
  const keypress = createEvent<KeyboardEvent>();

  const $pressedKeys = createStore<string[]>([], { serialize: 'ignore' });

  sample({
    clock: keypress,
    source: $pressedKeys,
    fn: (oldKeys, event) => [...oldKeys, event.key],
    target: $pressedKeys,
  });

  const subscribeFx = createEffect(() => {
    let boundKeypress: (e: KeyboardEvent) => void;

    try {
      boundKeypress = scopeBind(keypress);
    } catch (e) {
      boundKeypress = keypress;
    }

    document.addEventListener('keypress', boundKeypress);
  });

  if (options) {
    // Scope-full
    sample({ clock: options.start, target: subscribeFx });
  } else {
    // Scope-less
    subscribeFx();
  }

  const $wantedSequence: Store<string> = is.store(wantedSequence)
    ? wantedSequence
    : createStore(wantedSequence as string, { serialize: 'ignore' });

  const typed = sample({
    source: { pressedKeys: $pressedKeys, wantedSequence: $wantedSequence },
    filter: ({ pressedKeys, wantedSequence }) =>
      pressedKeys.join('').includes(wantedSequence),
    fn: () => {},
  });

  return typed;
}

export { keyboardSequence };
