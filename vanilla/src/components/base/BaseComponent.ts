/**
 * Base class for all Web Components in the application
 * Provides common functionality and lifecycle methods
 */
export abstract class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;
  protected state: Record<string, unknown> = {};

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  /**
   * Lifecycle method called when the component is connected to the DOM
   */
  connectedCallback(): void {
    this.render();
    this.setupEventListeners();
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM
   */
  disconnectedCallback(): void {
    this.removeEventListeners();
  }

  /**
   * Lifecycle method called when an attribute is changed
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this.state[name] = newValue;
      this.render();
    }
  }

  /**
   * Abstract method that must be implemented by child classes to render the component
   */
  protected abstract render(): void;

  /**
   * Abstract method that must be implemented by child classes to set up event listeners
   */
  protected abstract setupEventListeners(): void;

  /**
   * Abstract method that must be implemented by child classes to remove event listeners
   */
  protected abstract removeEventListeners(): void;

  /**
   * Updates the component's state and triggers a re-render
   */
  protected setState(newState: Partial<Record<string, unknown>>): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  /**
   * Gets the current state value for a given key
   */
  protected getState<T>(key: string): T {
    return this.state[key] as T;
  }
}
