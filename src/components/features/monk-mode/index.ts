// src/components/features/monk-mode/index.ts

export { default as SetupMode } from './SetupMode';
export { default as DeepWorkMode } from './DeepWorkMode';
export { default as RecoveryMode } from './RecoveryMode';

/**
 * Shared types for the Monk Mode module
 * Used to manage the state machine in App.tsx
 */
export type MonkModeState = 'IDLE' | 'ACTIVE' | 'REST';
