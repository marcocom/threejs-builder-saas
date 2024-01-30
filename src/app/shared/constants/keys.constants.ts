import { storageSvc } from '@shared/services/storage.service';
import { STORAGES_KEY } from '@achievements/constants/storageKey.constants';

export enum MouseAction {
  LEFT_CLICK = 'left_click',
  RIGHT_CLICK = 'right_click',
  SCROLL = 'scroll',
}

export enum KeyAction {
  FREEZE = 'freeze',
  MOVE_DOWN = 'down',
  MOVE_UP = 'up',
  MOVE_RIGHT = 'right',
  MOVE_LEFT = 'left',
  MOVE_BACK = 'back',
  MOVE_FRONT = 'front',
  VOCAL = 'vocal',
  MUTE = 'mute',
  MENU = 'menu',
  RELOAD = 'reload',
  CHAT = 'chat'
}

export const KeysTmp = {
  [KeyAction.FREEZE]: 'F',
  [KeyAction.MOVE_DOWN]: 'Q',
  [KeyAction.MOVE_UP]: 'E',
  [KeyAction.MOVE_RIGHT]: 'D',
  [KeyAction.MOVE_LEFT]: 'A',
  [KeyAction.MOVE_BACK]: 'S',
  [KeyAction.MOVE_FRONT]: 'W',
  [KeyAction.VOCAL]: 'V',
  [KeyAction.MUTE]: 'X',
  [KeyAction.MENU]: 'M',
  [KeyAction.RELOAD]: 'F5',
  [KeyAction.CHAT]: '²'
};

export const Keys = storageSvc.get(STORAGES_KEY.keyboard) || Object.assign({}, KeysTmp);
