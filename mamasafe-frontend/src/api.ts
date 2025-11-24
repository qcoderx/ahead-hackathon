import axios from 'axios';

const API_BASE_URL = 'https://ahead-hackathon.onrender.com/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Offline cache
const offlineCache = new Map();

// Cache API responses
const cacheResponse = (key: string, data: any) => {
  offlineCache.set(key, { data, timestamp: Date.now() });
  localStorage.setItem(`cache_${key}`, JSON.stringify({ data, timestamp: Date.now() }));
};

// Get cached response
const getCachedResponse = (key: string) => {
  const cached = offlineCache.get(key) || JSON.parse(localStorage.getItem(`cache_${key}`) || 'null');
  return cached?.data;
};

// Intercept responses to cache them
apiClient.interceptors.response.use(
  (response) => {
    if (response.config.method === 'get') {
      cacheResponse(response.config.url || '', response.data);
    }
    return response;
  },
  async (error) => {
    if (!navigator.onLine && error.config?.method === 'get') {
      const cached = getCachedResponse(error.config.url || '');
      if (cached) {
        return { data: cached, status: 200, statusText: 'OK (Cached)' };
      }
    }
    throw error;
  }
);

// Set JWT token for authorization header
export function setAuthToken(authToken: string) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

// Clear the auth token (e.g. on logout)
export function clearAuthToken() {
  delete apiClient.defaults.headers.common['Authorization'];
}

// Auth API
export async function login(username: string, password: string) {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('grant_type', 'password');
  
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(userData: UserCreate) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email: userData.email,
      password: userData.password,
      full_name: userData.full_name || null,
      role: userData.role || 'provider',
      is_active: userData.is_active ?? true,
      is_superuser: userData.is_superuser ?? false
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Test backend connection
export async function testConnection() {
  try {
    const response = await axios.get(`${API_BASE_URL.replace('/api/v1', '')}/`);
    return response.data;
  } catch (error) {
    console.error('Connection test failed:', error);
    throw error;
  }
}

// Test patient endpoint specifically
export async function testPatientEndpoint() {
  try {
    console.log('Testing patient endpoint with auth...');
    console.log('Current auth header:', apiClient.defaults.headers.common['Authorization']);
    
    // Try a simple authenticated endpoint first
    const response = await apiClient.get('/patient/search', { params: { query: 'test' } });
    console.log('Patient endpoint test successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Patient endpoint test failed:', error);
    console.error('Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers
    });
    throw error;
  }
}

// Medication check API
export async function checkMedication(data: {
  drug_name: string;
  additional_drugs?: string[];
  patient_id?: string;
  manual_gestational_week?: number;
  override_lmp?: string;
  symptoms?: string[];
  language?: string;
}) {
  try {
    console.log('=== API CALL DEBUG ===');
    console.log('Calling /medications/check with data:', data);
    
    const response = await apiClient.post('/medications/check', data);
    
    console.log('Raw response status:', response.status);
    console.log('Raw response headers:', response.headers);
    console.log('Raw response data:', response.data);
    console.log('Response data type:', typeof response.data);
    console.log('Response data keys:', response.data ? Object.keys(response.data) : 'null');
    console.log('=== END API CALL DEBUG ===');
    
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Patient APIs
export async function createPatient(patientData: PatientCreate) {
  try {
    console.log('Creating patient with data:', patientData);
    const response = await apiClient.post('/patient/create', {
      first_name: patientData.first_name,
      last_name: patientData.last_name,
      date_of_birth: patientData.date_of_birth,
      gender: patientData.gender,
      address: patientData.address || '',
      phone_number: patientData.phone_number || '',
      email: patientData.email || '',
      allergies: patientData.allergies || []
    });
    console.log('Patient creation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Patient creation error:', error);
    console.error('Error response:', error.response);
    throw error;
  }
}

export async function getAllPatients() {
  try {
    console.log('Making GET request to /patient/all');
    
    // Check offline first
    if (!navigator.onLine) {
      const cached = getCachedResponse('/patient/all');
      if (cached) {
        console.log('Using cached patient data (offline)');
        return cached;
      }
    }
    
    const response = await apiClient.get('/patient/all');
    console.log('Patient list response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Patient list error:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    console.error('Error config:', error.config);
    
    // If 405 Method Not Allowed or other errors, try search endpoint as fallback
    if (error.response?.status === 405 || error.response?.status === 404) {
      console.log('Primary endpoint failed, trying search endpoint as fallback...');
      try {
        const searchResponse = await apiClient.get('/patient/search', { 
          params: { query: '' } 
        });
        console.log('Search fallback response:', searchResponse.data);
        
        // Handle different response formats
        if (searchResponse.data.patients && Array.isArray(searchResponse.data.patients)) {
          // Convert search format to /all format
          return searchResponse.data.patients.map(p => ({
            id: p.id,
            first_name: p.name?.split(' ')[0] || '',
            last_name: p.name?.split(' ').slice(1).join(' ') || '',
            full_name: p.name || '',
            phone_number: p.phone || '',
            date_of_birth: null,
            gender: null,
            address: '',
            created_at: null,
            updated_at: null
          }));
        } else if (Array.isArray(searchResponse.data)) {
          return searchResponse.data;
        } else {
          return [];
        }
      } catch (searchError) {
        console.error('Search fallback also failed:', searchError);
        // Return empty array as last resort
        return [];
      }
    }
    
    throw error;
  }
}

export async function searchPatients(query: string) {
  try {
    const response = await apiClient.get('/patient/search', { params: { query } });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPatientProfile() {
  try {
    const response = await apiClient.get('/patient/me');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePatient(patientId: number) {
  try {
    const response = await apiClient.delete(`/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function invitePatient(patientId: string, phoneNumber: string) {
  try {
    const response = await apiClient.post('/patient/invite', {
      patient_id: patientId,
      phone_number: phoneNumber
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function patientLogin(patientId: string) {
  try {
    const response = await apiClient.post('/patient/login', { patient_id: patientId });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Visit logging
export async function logVisit(visitData: {
  patient_id: string;
  provider_id: number;
  drug_checked: string;
  risk_result: string;
  notes?: string;
}) {
  try {
    const response = await apiClient.post('/visits/log', visitData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Audit logging
export async function logAudit(auditData: {
  patient_id: string;
  drug_name: string;
  risk_level: string;
  override_reason: string;
  action?: string;
}) {
  try {
    const response = await apiClient.post('/audit/log', auditData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Appointments API
export async function createAppointment(appointmentData: {
  patient_id: number;
  appointment_date: string;
  appointment_type?: string;
  notes?: string;
}) {
  try {
    const response = await apiClient.post('/patient/appointments', appointmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPatientAppointments(patientId: number) {
  try {
    const response = await apiClient.get(`/patient/appointments/${patientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Encounters API
export async function updateEncounter(encounterData: {
  patient_id: number;
  diagnosis?: string;
  medications?: string[];
  allergies?: string[];
  chronic_conditions?: string[];
  previous_complications?: string[];
  notes?: string;
  vital_signs?: Record<string, any>;
  weight?: string;
  height?: string;
  blood_pressure?: string;
  heart_rate?: string;
  temperature?: string;
  consultation_reason?: string;
  summary?: string;
  follow_up?: string;
}) {
  try {
    const response = await apiClient.post('/encounters/update', encounterData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createTestEncounterData(patientId: number) {
  try {
    const response = await apiClient.post(`/encounters/create-test-data/${patientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Analytics API
export async function getAnalyticsOverview() {
  try {
    const response = await apiClient.get('/admin/analytics/overview');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getHighRiskCases() {
  try {
    const response = await apiClient.get('/admin/analytics/high-risk');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// SMS API
export async function testSms() {
  try {
    const response = await axios.get(`${API_BASE_URL}/sms/test`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function testSmsJson(smsData: {
  Body: string;
  From: string;
  To?: string;
  MessageSid?: string;
}) {
  try {
    const response = await axios.post(`${API_BASE_URL}/sms/test-json`, smsData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Webhook APIs
export async function receivePharmavigilanceWebhook(data: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/webhook/pharmavigilance`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getWebhookEvents() {
  try {
    const response = await axios.get(`${API_BASE_URL}/webhook/events`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Error handling helper
export function handleApiError(error: any) {
  if (error.response) {
    return {
      message: error.response.data?.detail || 'An error occurred',
      status: error.response.status
    };
  }
  return {
    message: 'Network error occurred',
    status: 0
  };
}

// Type definitions based on OpenAPI spec
export interface Token {
  access_token: string;
  token_type: string;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name?: string | null;
  role?: string | null;
  is_active?: boolean | null;
  is_superuser?: boolean;
}

export interface PatientCreate {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  address?: string;
  phone_number?: string;
  email?: string;
  allergies?: any[];
}

export interface PatientCreateResponse {
  status: boolean;
  status_code: number;
  message: string;
  patient_id: number;
}

export interface MedicationCheckRequest {
  drug_name: string;
  additional_drugs?: string[];
  patient_id?: string;
  manual_gestational_week?: number;
  override_lmp?: string;
  symptoms?: string[];
  language?: string;
}

export interface MedicationCheckResponse {
  drug_name: string;
  additional_drugs?: string[];
  risk_category: string;
  message: string;
  alternative_drug?: string;
  is_safe: boolean;
  gestational_week?: number;
  patient_id?: string;
  personalized_notes?: string;
  risk_score?: number;
  analysis_type?: string;
}

export interface AppointmentCreate {
  patient_id: number;
  appointment_date: string;
  appointment_type?: string;
  notes?: string;
}

export interface AppointmentResponse {
  id: number;
  patient_id: number;
  appointment_date: string;
  status: string;
  notes: string;
}

export interface VisitLogRequest {
  patient_id: string;
  provider_id: number;
  drug_checked: string;
  risk_result: string;
  notes?: string;
}

export interface AuditLogCreate {
  patient_id: string;
  drug_name: string;
  risk_level: string;
  override_reason: string;
  action?: string;
}

export interface EncounterUpdateRequest {
  patient_id: number;
  diagnosis?: string;
  medications?: string[];
  allergies?: string[];
  chronic_conditions?: string[];
  previous_complications?: string[];
  notes?: string;
  vital_signs?: Record<string, any>;
  weight?: string;
  height?: string;
  blood_pressure?: string;
  heart_rate?: string;
  temperature?: string;
  consultation_reason?: string;
  summary?: string;
  follow_up?: string;
}

export interface EncounterUpdateResponse {
  success: boolean;
  encounter_id?: number;
  message: string;
}

export interface PatientLogin {
  patient_id: string;
}

export interface PatientInviteRequest {
  patient_id: string;
  phone_number: string;
}

export interface SMSTestRequest {
  Body: string;
  From: string;
  To?: string;
  MessageSid?: string;
}

export default apiClient;
