type Key =
  | 'Ctrl'
  | 'Shift'
  | 'Backspace'
  | 'Enter'
  | 'Tab'
  | 'Alt'
  | 'CapsLock'
  | 'Delete'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'PageUp'
  | 'PageDown'
  | 'Home'
  | 'End'
  | 'Insert'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'Escape'
  | 'PrintScreen'
  | 'ScrollLock'
  | 'Pause'
  | 'ContextMenu'
  | 'Super'
  | 'Meta'
  | 'NumLock'
  | 'AudioVolumeUp'
  | 'AudioVolumeDown'
  | 'AudioVolumeMute'
  | 'MediaPlayPause'
  | 'MediaStop'
  | 'MediaNextTrack'
  | 'MediaPreviousTrack'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'num0'
  | 'num1'
  | 'num2'
  | 'num3'
  | 'num4'
  | 'num5'
  | 'num6'
  | 'num7'
  | 'num8'
  | 'num9'

export type Hotkey = `${Key}` | `${Key}+${Key}`;
