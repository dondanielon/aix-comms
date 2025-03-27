import { BaseComponent } from '../base/BaseComponent';

/**
 * UI component that handles the game's user interface
 */
export class UI extends BaseComponent {
  constructor() {
    super();
  }

  protected render(): void {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .ui-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .score {
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 24px;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .timer {
          position: absolute;
          top: 20px;
          left: 20px;
          color: white;
          font-size: 24px;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      </style>
      <div class="ui-container">
        <div class="score">Score: <span id="score-value">0</span></div>
        <div class="timer">Time: <span id="timer-value">0:00</span></div>
      </div>
    `;
  }

  protected setupEventListeners(): void {
    // TODO: Set up event listeners for score and timer updates
  }

  protected removeEventListeners(): void {
    // TODO: Clean up event listeners
  }

  /**
   * Update the score display
   */
  public updateScore(score: number): void {
    const scoreElement = this.shadow.getElementById('score-value');
    if (scoreElement) {
      scoreElement.textContent = score.toString();
    }
  }

  /**
   * Update the timer display
   */
  public updateTimer(time: number): void {
    const timerElement = this.shadow.getElementById('timer-value');
    if (timerElement) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }
}

customElements.define('ui-component', UI);
