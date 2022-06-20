/**
 * @jest-environment jsdom
 */

import userEvent from '@testing-library/user-event';
import { allSettled, createEvent, fork } from 'effector';
import { keyboardSequence } from '../src/keyboard_sequence';

describe('keyboardSequence/scope', () => {
  test('trigger after typing', async () => {
    const start = createEvent();
    const typed = keyboardSequence('iddqd', { start });

    const listener = jest.fn();
    typed.watch(listener);

    const user = userEvent.setup();

    const scope = fork();

    await allSettled(start, { scope });

    await user.keyboard('iddqd');

    expect(listener).toBeCalledTimes(1);
  });

  test('DO NOT open after random typing', async () => {
    const start = createEvent();
    const typed = keyboardSequence('randomstring', { start });

    const listener = jest.fn();
    typed.watch(listener);

    const user = userEvent.setup();

    const scope = fork();

    await allSettled(start, { scope });

    await user.keyboard('iddqd');

    expect(listener).not.toHaveBeenCalled();
  });
});

describe('keyboardSequence', () => {
  test('trigger after typing', async () => {
    const typed = keyboardSequence('iddqd');

    const listener = jest.fn();
    typed.watch(listener);

    const user = userEvent.setup();

    await user.keyboard('iddqd');

    expect(listener).toBeCalledTimes(1);
  });

  test('DO NOT open after random typing', async () => {
    const typed = keyboardSequence('randomstring');

    const listener = jest.fn();
    typed.watch(listener);

    const user = userEvent.setup();

    await user.keyboard('iddqd');

    expect(listener).not.toHaveBeenCalled();
  });
});
