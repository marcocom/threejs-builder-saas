interface Document {
  // @ts-ignore
  exitPointerLock?: () => void;
  mozExitPointerLock?: any;
  mozPointerLockElement?: any;
  mozRequestPointerLock?: any;
  pointerLockElement?: any;
  requestPointerLock?: any;
  webkitExitPointerLock?: any;
  webkitPointerLockElement?: any;
  webkitRequestPointerLock?: any;
}

interface HTMLElement {
  exitPointerLock?: () => void;
  mozExitPointerLock?: any;
  mozPointerLockElement?: any;
  mozRequestPointerLock?: any;
  pointerLockElement?: any;
  requestPointerLock?: any;
  webkitExitPointerLock?: any;
  webkitPointerLockElement?: any;
  webkitRequestPointerLock?: any;
}

interface WheelEvent {
  wheelDelta: number;
}

interface Window {
  player: THREE.Object3D;
  isFocused: boolean;
  isFreezed: boolean;
}

interface Math {
  seedrandom(seed?: string): void;
}

interface Math {
  seedrandom(): void;
}
