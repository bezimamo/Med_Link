const API_BASE_URL = "http://localhost:3001" // Changed from 3000 to 3001

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export async function apiCall<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  token?: string,
  body?: Record<string, any>,
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(body)
  }

  try {
    console.log(`[API] ${method} ${url}`, body ? { body } : "")
    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.json()
      console.log(`[API] Error ${response.status}:`, errorData)
      return {
        success: false,
        error: errorData.message || `HTTP Error: ${response.status}`,
      }
    }

    const data = await response.json()
    console.log(`[API] Success:`, data)
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("[API] Fetch error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// User Management API calls
export const userApi = {
  // List all users for a hospital (backend handles filtering by hospitalId from token)
  getUsers: (token: string) => apiCall<any[]>("GET", `/users`, token),

  // Create a new user (doctor or liaison officer)
  createUser: (
    data: { fullName: string; email: string; password: string; role: string; hospitalId: string },
    token: string,
  ) => apiCall<any>("POST", "/users", token, data),

  // Update a user (use PATCH, not PUT)
  updateUser: (userId: string, data: Record<string, any>, token: string) =>
    apiCall<any>("PATCH", `/users/${userId}`, token, data),

  // Delete a user
  deleteUser: (userId: string, token: string) => apiCall<any>("DELETE", `/users/${userId}`, token),
}

// Auth API calls
export const authApi = {
  login: (email: string, password: string) => 
    apiCall<any>("POST", "/auth/login", undefined, { email, password }),
}