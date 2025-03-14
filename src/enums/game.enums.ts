export enum GameEvent {
  Authentication = 1,
  CreateGame = 2,
  GamesList = 3,
  JoinGame = 4,
  PlayerMove = 5,
  PlayerMessage = 6,
  MessageList = 7,
  GameStateUpdate = 8,
}

export enum GameError {
  Invalid = 252,
  Forbidden = 253,
  Unauthorized = 254,
  ServerError = 255,
}
