import {
  createEvent,
  createStore,
  Event,
  Store,
  sample,
  scopeBind,
  createEffect,
  is,
  restore,
  attach,
} from 'effector';

/**
 * Creates an event that triggers after a user types a given sequence on a keyboard in a browser
 *
 * @param wantedSequence - Sequence of keys that should be typed
 * @param options.start - Event that triggers the start of the listening, used to bound result of operator to `scope`
 * @param options.stop - Event that destroys listener
 */
function keyboardSequence(
  wantedSequence: Store<string> | string,
  options?: { start: Event<void>; stop: Event<void> }
): Event<void> {
  const keypress = createEvent<KeyboardEvent>();

  const $pressedKeys = createStore<string[]>([], { serialize: 'ignore' });

  const setBoundKeypress = createEvent<(event: KeyboardEvent) => void>();
  const $boundKeypress = restore(setBoundKeypress, keypress);

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

    setBoundKeypress(boundKeypress);

    document.addEventListener('keypress', boundKeypress);
  });

  const unsubscribeFx = attach({
    source: $boundKeypress,
    effect(boundKeypress) {
      document.removeEventListener('keypress', boundKeypress);
    },
  });

  if (options) {
    // Scope-full
    sample({ clock: options.start, target: subscribeFx });
    sample({ clock: options.stop, target: unsubscribeFx });
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

  sample({ clock: typed, fn: () => [], target: $pressedKeys });

  return typed;
}

export { keyboardSequence };
