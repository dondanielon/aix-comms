import { BaseComponent } from '../base/BaseComponent';

/**
 * Lobby component that handles the game lobby interface
 */
export class Lobby extends BaseComponent {
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

        .lobby-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #1a1a1a;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .title {
          font-size: 48px;
          margin-bottom: 40px;
          text-align: center;
        }

        .players {
          font-size: 24px;
          margin-bottom: 40px;
        }

        .start-button {
          padding: 15px 30px;
          font-size: 24px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .start-button:hover {
          background-color: #45a049;
        }

        .start-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      </style>
      <div class="lobby-container">
        <h1 class="title">Game Lobby</h1>
        <div class="players">Players: <span id="player-count">0</span></div>
        <button class="start-button" id="start-button" disabled>Start Game</button>
      </div>
    `;
  }

  protected setupEventListeners(): void {
    const startButton = this.shadow.getElementById('start-button') as HTMLButtonElement;
    if (startButton) {
      startButton.addEventListener('click', () => this.handleStartGame());
    }
  }

  protected removeEventListeners(): void {
    const startButton = this.shadow.getElementById('start-button') as HTMLButtonElement;
    if (startButton) {
      startButton.removeEventListener('click', () => this.handleStartGame());
    }
  }

  /**
   * Update the player count
   */
  public updatePlayerCount(count: number): void {
    const playerCountElement = this.shadow.getElementById('player-count');
    if (playerCountElement) {
      playerCountElement.textContent = count.toString();
    }

    const startButton = this.shadow.getElementById('start-button') as HTMLButtonElement;
    if (startButton) {
      startButton.disabled = count < 2;
    }
  }

  private handleStartGame(): void {
    // TODO: Implement game start logic
    window.dispatchEvent(new CustomEvent('game:start'));
  }
}

customElements.define('lobby-component', Lobby);
