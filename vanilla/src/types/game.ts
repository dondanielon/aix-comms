/**
 * Represents the current state of the game
 */
export interface GameState {
  id: string;
  status: GameStatus;
  players: Player[];
  currentRound?: number;
  maxRounds?: number;
}

/**
 * Represents a player in the game
 */
export interface Player {
  id: string;
  name: string;
  score: number;
  isActive: boolean;
}

/**
 * Enum representing the possible game statuses
 */
export enum GameStatus {
  WAITING = 'WAITING',
  STARTING = 'STARTING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}
