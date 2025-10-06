/**
 * Legacy API Adapter
 * Maps old Express.js backend API calls to Supabase
 *
 * Base URL: http://localhost:5001/
 *
 * All requests include JWT token in Authorization header: Bearer <token>
 * Token is stored in sessionStorage under key 'userToken'
 */

// Types for legacy API responses and requests
export interface LegacyApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
  description: string
  params?: string
  bodyData?: Record<string, any>
  notes?: string
}

// Complete mapping of all API endpoints found in the codebase
export const LEGACY_API_ENDPOINTS = {
  // ==================== User Endpoints ====================
  user: {
    login: {
      method: 'POST',
      endpoint: 'user/login',
      description: 'User login - returns JWT token',
      bodyData: {
        email: 'string',
        password: 'string (min 4 chars)',
      },
      notes: 'Response: { token: "JWT token" }',
    } as LegacyApiEndpoint,

    register: {
      method: 'POST',
      endpoint: 'user/register',
      description: 'User registration',
      bodyData: {
        email: 'string (valid email)',
        password: 'string (min 4 chars)',
        name: 'string (min 2 chars)',
      },
    } as LegacyApiEndpoint,

    resetPassword: {
      method: 'POST',
      endpoint: 'user/reset-password',
      description: 'Send temporary password to user email',
      bodyData: {
        name: 'string (min 2 chars)',
        email: 'string (valid email)',
      },
      notes: 'Sends temporary password via email',
    } as LegacyApiEndpoint,

    getCurrent: {
      method: 'GET',
      endpoint: 'user/current',
      description: 'Get current logged-in user information',
      params: 'none (uses JWT token from header)',
      notes: 'Used on app initialization and after login',
    } as LegacyApiEndpoint,

    getById: {
      method: 'GET',
      endpoint: 'user',
      description: 'Get user by ID',
      params: 'userId (appended to path: user/:userId)',
      notes: 'Used in Portfolio and User components',
    } as LegacyApiEndpoint,

    updateUser: {
      method: 'PUT',
      endpoint: 'user/:userId',
      description: 'Update user profile information',
      bodyData: {
        name: 'string',
        email: 'string',
        description: 'string',
        stacks: 'string[] (array of stack names)',
      },
      notes: 'Used in UserEditForm component',
    } as LegacyApiEndpoint,

    updateUserWithImage: {
      method: 'PUT',
      endpoint: 'user/:userId',
      description: 'Update user profile with image (multipart/form-data)',
      bodyData: {
        profileImage: 'File',
        name: 'string',
        email: 'string',
        description: 'string',
        stacks: 'string[] (FormData appended multiple times)',
      },
      notes: 'Uses putMulter function with Content-Type: multipart/form-data',
    } as LegacyApiEndpoint,

    getUserList: {
      method: 'GET',
      endpoint: 'userlist',
      description: 'Get all users list (for network page)',
      params: 'none',
      notes: 'Returns array of all users, used in Network component',
    } as LegacyApiEndpoint,
  },

  // ==================== Education Endpoints ====================
  education: {
    getByUserId: {
      method: 'GET',
      endpoint: 'education',
      description: 'Get all education records for a user',
      params: 'userId (appended to path: education/{userId})',
      notes: 'Returns array of education records',
    } as LegacyApiEndpoint,

    create: {
      method: 'POST',
      endpoint: 'education',
      description: 'Create new education record',
      bodyData: {
        title: 'string (school name)',
        major: 'string',
        startDate: 'date string',
        endDate: 'date string',
        grades: 'number (decimal)',
      },
      notes: 'Author is inferred from JWT token',
    } as LegacyApiEndpoint,

    update: {
      method: 'PUT',
      endpoint: 'education/:educationId',
      description: 'Update education record',
      bodyData: {
        title: 'string (school name)',
        major: 'string',
        startDate: 'date string',
        endDate: 'date string',
        grades: 'number (decimal)',
      },
      notes: 'Used in EducationEditForm',
    } as LegacyApiEndpoint,

    delete: {
      method: 'DELETE',
      endpoint: 'education',
      description: 'Delete education record',
      params: 'educationId (appended to path: education/{educationId})',
      notes: 'Used in EducationCardForm',
    } as LegacyApiEndpoint,
  },

  // ==================== Project Endpoints ====================
  project: {
    getByUserId: {
      method: 'GET',
      endpoint: 'project',
      description: 'Get all projects for a user',
      params: 'userId (appended to path: project/{userId})',
      notes: 'Returns array of project records',
    } as LegacyApiEndpoint,

    create: {
      method: 'POST',
      endpoint: 'project',
      description: 'Create new project',
      bodyData: {
        author: 'string (userId)',
        title: 'string (project name)',
        role: 'string',
        startDate: 'date string',
        endDate: 'date string',
        description: 'string',
      },
      notes: 'Author must be explicitly provided',
    } as LegacyApiEndpoint,

    update: {
      method: 'PUT',
      endpoint: 'project/:projectId',
      description: 'Update project',
      bodyData: {
        title: 'string (project name)',
        role: 'string',
        startDate: 'date string',
        endDate: 'date string',
        description: 'string',
      },
      notes: 'Used in ProjectEditForm',
    } as LegacyApiEndpoint,

    delete: {
      method: 'DELETE',
      endpoint: 'project/:projectId',
      description: 'Delete project',
      params: 'projectId (full path: project/{projectId})',
      notes: 'Used in ProjectCard',
    } as LegacyApiEndpoint,
  },

  // ==================== Award Endpoints ====================
  award: {
    getByUserId: {
      method: 'GET',
      endpoint: 'award',
      description: 'Get all awards for a user',
      params: 'userId (appended to path: award/{userId})',
      notes: 'Returns array of award records',
    } as LegacyApiEndpoint,

    create: {
      method: 'POST',
      endpoint: 'award',
      description: 'Create new award record',
      bodyData: {
        author: 'string (userId)',
        date: 'date string',
        issuer: 'string (award organization)',
        title: 'string (award title)',
        info: 'string (award information)',
      },
      notes: 'Author must be explicitly provided',
    } as LegacyApiEndpoint,

    update: {
      method: 'PUT',
      endpoint: 'award/:awardId',
      description: 'Update award record',
      bodyData: {
        issuer: 'string (award organization)',
        title: 'string (award title)',
        info: 'string (award information)',
        date: 'date string',
      },
      notes: 'Used in UserAwardEdit',
    } as LegacyApiEndpoint,

    delete: {
      method: 'DELETE',
      endpoint: 'award/:awardId',
      description: 'Delete award record',
      params: 'awardId (full path: award/{awardId})',
      notes:
        'Used in UserAwardCard. Note: typo in code - "awrard" instead of "award"',
    } as LegacyApiEndpoint,
  },

  // ==================== Certification Endpoints ====================
  certification: {
    getByUserId: {
      method: 'GET',
      endpoint: 'crtfc',
      description: 'Get all certifications for a user',
      params: 'userId (appended to path: crtfc/{userId})',
      notes: 'Returns array of certification records, or empty array if none',
    } as LegacyApiEndpoint,

    create: {
      method: 'POST',
      endpoint: 'crtfc',
      description: 'Create new certification record',
      bodyData: {
        title: 'string (certification name)',
        license: 'string (certification number, no hyphens)',
        issuer: 'string (issuing organization)',
        issuedDate: 'date string',
        langscore: 'string (language score, default "0")',
      },
      notes: 'Author is inferred from JWT token. Returns 200 or 201 status',
    } as LegacyApiEndpoint,

    update: {
      method: 'PUT',
      endpoint: 'crtfc/:certificationId',
      description: 'Update certification record',
      bodyData: {
        title: 'string (certification name)',
        license: 'string (certification number)',
        issuer: 'string (issuing organization)',
        issuedDate: 'date string',
        langscore: 'string (language score)',
      },
      notes: 'Used in UserCertificationCard',
    } as LegacyApiEndpoint,

    delete: {
      method: 'DELETE',
      endpoint: 'crtfc/:certificationId',
      description: 'Delete certification record',
      params: 'certificationId (full path: crtfc/{certificationId})',
      notes: 'Used in UserCertificationCard',
    } as LegacyApiEndpoint,
  },
} as const

// ==================== Helper Types ====================
export type UserEndpoints = typeof LEGACY_API_ENDPOINTS.user
export type EducationEndpoints = typeof LEGACY_API_ENDPOINTS.education
export type ProjectEndpoints = typeof LEGACY_API_ENDPOINTS.project
export type AwardEndpoints = typeof LEGACY_API_ENDPOINTS.award
export type CertificationEndpoints = typeof LEGACY_API_ENDPOINTS.certification

// ==================== API Configuration ====================
export const API_CONFIG = {
  baseUrl: 'http://localhost:5001/',
  authHeader: 'Authorization',
  authScheme: 'Bearer',
  tokenStorageKey: 'userToken',
  contentTypes: {
    json: 'application/json',
    formData: 'multipart/form-data',
  },
} as const

// ==================== Stack Options (for user profile) ====================
export const STACK_OPTIONS = [
  { label: '프론트', name: 'front' },
  { label: '백', name: 'backend' },
  { label: '데브옵스', name: 'devOps' },
  { label: '데이터분석', name: 'data' },
  { label: '인공지능', name: 'ai' },
  { label: '앱', name: 'app' },
] as const
