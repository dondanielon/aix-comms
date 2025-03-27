import { BaseComponent } from '../base/BaseComponent';
import { GameState } from '../../types/game';

/**
 * Game loader component that handles loading and initializing the game
 */
export class GameLoader extends BaseComponent {
  private gameState: GameState | null = null;

  constructor() {
    super();
  }

  protected render(): void {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }

        .game-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #000;
        }

        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 24px;
          text-align: center;
        }
      </style>
      <div class="game-container">
        <div class="loading">Loading game...</div>
      </div>
    `;
  }

  protected setupEventListeners(): void {
    // TODO: Set up event listeners for game state changes
  }

  protected removeEventListeners(): void {
    // TODO: Clean up event listeners
  }

  /**
   * Set the game state
   */
  public setGameState(state: GameState): void {
    this.gameState = state;
    this.render();
  }
}

customElements.define('game-loader', GameLoader);
