import { guard, createEvent, Event } from 'effector';

export const keyup = createEvent<KeyboardEvent>();
export const keydown = createEvent<KeyboardEvent>();
export const keypress = createEvent<KeyboardEvent>();

if (typeof document !== 'undefined') {
  document.addEventListener('keyup', (evt) => keyup(evt));
  document.addEventListener('keydown', (evt) => keydown(evt));
  document.addEventListener('keypress', (evt) => keypress(evt));
}

const keyEvents = {
  keyup,
  keydown,
  keypress,
};

interface hotkeyT {
  (
    key: KeyboardEvent['key'],
    type?: keyof typeof keyEvents
  ): Event<KeyboardEvent>;
  (params: {
    key: KeyboardEvent['key'];
    type?: keyof typeof keyEvents;
  }): Event<KeyboardEvent>;
}

/** Returns `Event` that gets triggered when a certain key pressed (or keyup/keydown events triggered) */
export const hotkey: hotkeyT = (...args) => {
  const normalizedParams =
    typeof args[0] === 'string'
      ? { key: args[0], type: args[1] }
      : { key: args[0].key, type: args[0].type };
  return guard({
    clock: keyEvents[normalizedParams.type || 'keyup'],
    filter: (e) => e.key === normalizedParams.key,
  });
};
