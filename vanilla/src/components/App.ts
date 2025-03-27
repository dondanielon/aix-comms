import { BaseComponent } from './base/BaseComponent';
import { GameState } from '../types/game';

/**
 * Main application component that serves as the root of the application
 * Manages the game state and renders either the game or lobby based on the state
 */
export class App extends BaseComponent {
  private gameState: GameState | null = null;

  constructor() {
    super();
    this.setupState();
  }

  private async setupState(): Promise<void> {
    // TODO: Initialize game state from store
    this.setState({ gameState: null });
  }

  protected render(): void {
    const gameState = this.getState<GameState | null>('gameState');

    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="app-container">
        <ui-component></ui-component>
        ${gameState ? '<game-loader></game-loader>' : '<lobby-component></lobby-component>'}
      </div>
    `;
  }

  protected setupEventListeners(): void {
    // TODO: Set up event listeners for game state changes
  }

  protected removeEventListeners(): void {
    // TODO: Clean up event listeners
  }
}

customElements.define('app-component', App);
