// lib/api-client.ts
const API_BASE_URL = "http://localhost:3001"

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Initialize with token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token') || null;
    }
  }

  // Method to set token (call this after login)
  setToken(token: string | null) {
    this.token = token;
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // Method to get current token
  getToken(): string | null {
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    endpoint: string,
    body?: Record<string, any>,
    customToken?: string // Allow passing token directly
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Use customToken if provided, otherwise use stored token
    const tokenToUse = customToken || this.token;
    
    if (tokenToUse) {
      headers["Authorization"] = `Bearer ${tokenToUse}`;
      console.log(`[API] Request to ${url} with token: ${tokenToUse.substring(0, 20)}...`);
    } else {
      console.warn(`[API] Request to ${url} without token`);
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      options.body = JSON.stringify(body);
    }

    try {
      console.log(`[API] ${method} ${url}`, body ? { body } : "");
      const response = await fetch(url, options);
      
      console.log(`[API] Response status: ${response.status} for ${url}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`[API] Error ${response.status}:`, errorData);
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      // Handle empty responses (204 No Content, or responses with no content)
      const contentLength = response.headers.get("content-length");
      
      // If it's 204 No Content, return empty object
      if (response.status === 204) {
        console.log(`[API] Success for ${url}: (204 No Content)`);
        return {} as T;
      }
      
      // Try to parse JSON, but handle empty responses gracefully
      try {
        const text = await response.text();
        
        // If response is empty, return empty object
        if (!text || text.trim().length === 0) {
          console.log(`[API] Success for ${url}: (empty response)`);
          return {} as T;
        }
        
        const data = JSON.parse(text);
        console.log(`[API] Success for ${url}:`, data);
        return data;
      } catch (parseError) {
        // If JSON parsing fails but response was OK, return empty object
        console.log(`[API] Success for ${url}: (non-JSON or empty response)`);
        return {} as T;
      }
    } catch (error) {
      console.error(`[API] ${method} ${endpoint} failed:`, error);
      throw error;
    }
  }

  // User methods
  async getUsers(params?: {
    role?: string;
    hospitalId?: string;
    limit?: number;
    skip?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.role) queryParams.append('role', params.role);
    if (params?.hospitalId) queryParams.append('hospitalId', params.hospitalId);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    
    const queryString = queryParams.toString();
    const endpoint = `/users${queryString ? `?${queryString}` : ''}`;
    
    return this.request<any>("GET", endpoint);
  }

  async createUser(data: any) {
    return this.request<any>("POST", "/users", data);
  }

  async updateUser(userId: string, data: any) {
    return this.request<any>("PATCH", `/users/${userId}`, data);
  }

  async deleteUser(userId: string) {
    return this.request<any>("DELETE", `/users/${userId}`);
  }

  async resetPassword(userId: string, newPassword: string) {
    return this.request<any>("PATCH", `/users/${userId}/reset-password`, { password: newPassword });
  }

  // Hospital methods
  async getHospitals() {
    return this.request<any>("GET", "/hospitals");
  }

  async createHospital(data: any) {
    return this.request<any>("POST", "/hospitals", data);
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<any>("POST", "/auth/login", { email, password }, undefined); // Don't send token for login
    
    // If login successful and we got a token, store it
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    
    return response;
  }

  // Method to get hospitals with a specific token (for components that have token in context)
  async getHospitalsWithToken(token: string) {
    return this.request<any>("GET", "/hospitals", undefined, token);
  }
}

export const apiClient = new ApiClient();