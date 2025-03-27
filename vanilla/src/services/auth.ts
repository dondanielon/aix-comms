import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  idToken: string;
}

/**
 * Authentication service for handling user authentication
 */
class AuthService {
  private baseUrl = '/v1/user';

  /**
   * Login with email and password
   */
  public async login(credentials: LoginCredentials): Promise<void> {
    try {
      const response = await axios.post<LoginResponse>(`${this.baseUrl}/login`, credentials, {
        withCredentials: true,
      });

      const { accessToken, idToken } = response.data;
      localStorage.setItem('x-access-token', accessToken);
      localStorage.setItem('x-id-token', idToken);

      // Dispatch login event
      window.dispatchEvent(new CustomEvent('auth:login'));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Logout the current user
   */
  public logout(): void {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-id-token');
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!localStorage.getItem('x-access-token');
  }

  /**
   * Get the current access token
   */
  public getAccessToken(): string | null {
    return localStorage.getItem('x-access-token');
  }
}

// Create and export a singleton instance
export const authService = new AuthService();

/**
 * Initialize authentication
 */
export const setupAuth = async (credentials?: LoginCredentials): Promise<void> => {
  if (credentials) {
    await authService.login(credentials);
  }
};
