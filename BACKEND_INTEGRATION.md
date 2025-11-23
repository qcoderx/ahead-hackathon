# MamaSafe Backend Integration Guide

## Overview
This document outlines the complete backend integration for the MamaSafe frontend application, connecting all UI components to the production API endpoints.

## Backend API Base URL
```
https://ahead-hackathon.onrender.com/api/v1
```

## Key Integration Features Implemented

### 1. Authentication System
- **Provider Login**: OAuth2 password flow with JWT tokens
- **Patient Login**: Simple patient ID-based authentication  
- **User Registration**: New provider/admin registration
- **Token Management**: Automatic token storage and refresh

**Files:**
- `src/hooks/useAuth.ts` - Authentication logic
- `src/contexts/AuthContext.tsx` - Global auth state
- `src/components/screens/AuthScreen.tsx` - Login UI

### 2. Medication Safety Analysis
- **Single Drug Check**: Primary medication safety analysis
- **Multi-Drug Interactions**: Complex drug interaction detection
- **Risk Scoring**: AI-powered risk assessment
- **Personalized Recommendations**: Patient-specific guidance

**API Endpoint:** `POST /medications/check`

**Files:**
- `src/hooks/useMedicationCheck.ts` - Medication checking logic
- `src/components/screens/SingleDrugCheckScreen.tsx` - Drug check UI
- `src/components/screens/MedicationResultsScreen.tsx` - Results display

### 3. Patient Management
- **Patient Registration**: Complete patient onboarding
- **Patient Search**: Find patients by name/phone
- **Patient Profiles**: Comprehensive patient data
- **SMS Invitations**: Patient portal access via SMS

**API Endpoints:**
- `POST /patient/create` - Create new patient
- `GET /patient/search` - Search patients
- `POST /patient/invite` - Send SMS invite
- `DELETE /patient/{id}` - Remove patient

**Files:**
- `src/hooks/usePatients.ts` - Patient management logic
- `src/components/screens/PatientRegistrationScreen.tsx` - Registration UI
- `src/components/screens/PatientManagementScreen.tsx` - Patient list

### 4. Appointment System
- **Appointment Scheduling**: Book patient appointments
- **Appointment Management**: View and manage bookings
- **SMS Reminders**: Automated appointment reminders

**API Endpoints:**
- `POST /patient/appointments` - Create appointment
- `GET /patient/appointments/{id}` - Get patient appointments

**Files:**
- `src/hooks/useAppointments.ts` - Appointment logic
- `src/components/screens/ScheduleAppointmentScreen.tsx` - Scheduling UI
- `src/components/screens/AppointmentsScreen.tsx` - Appointment list

### 5. Clinical Encounters
- **Encounter Updates**: Detailed medical information
- **AI Risk Scoring**: Enhanced risk assessment
- **Medical History**: Comprehensive patient records

**API Endpoint:** `POST /encounters/update`

**Files:**
- `src/hooks/useEncounters.ts` - Encounter management
- Integration in patient registration and medication checks

### 6. Analytics Dashboard (Admin)
- **System Overview**: Usage statistics and metrics
- **High-Risk Cases**: Critical patient monitoring
- **Performance Metrics**: System health indicators

**API Endpoints:**
- `GET /admin/analytics/overview` - System overview
- `GET /admin/analytics/high-risk` - High-risk cases

**Files:**
- `src/hooks/useAnalytics.ts` - Analytics logic
- `src/components/screens/AdminAnalyticsScreen.tsx` - Analytics UI

### 7. Emergency Alert System
- **Critical Alerts**: High-risk medication detection
- **Emergency Actions**: Immediate response workflows
- **Audit Logging**: Complete action tracking

**API Endpoint:** `POST /audit/log`

**Files:**
- `src/hooks/useAudit.ts` - Audit logging
- `src/components/screens/EmergencyAlertScreen.tsx` - Emergency UI

### 8. SMS Integration
- **Bidirectional SMS**: Two-way SMS communication
- **Patient Notifications**: Automated alerts
- **System Testing**: SMS service verification

**API Endpoints:**
- `GET /sms/test` - Test SMS service
- `POST /sms/test-json` - Test with JSON payload
- `POST /sms/webhook` - SMS webhook handler

### 9. Visit Logging
- **Consultation Records**: EMR integration
- **Provider Actions**: Complete audit trail
- **Patient History**: Comprehensive visit logs

**API Endpoint:** `POST /visits/log`

### 10. System Monitoring
- **Health Checks**: Real-time system status
- **Connectivity Tests**: Backend service monitoring
- **Performance Tracking**: Response time monitoring

**Files:**
- `src/components/ui/SystemStatus.tsx` - Status monitoring UI
- `src/hooks/useMamaSafeIntegration.ts` - Comprehensive integration

## Comprehensive Integration Hook

The `useMamaSafeIntegration` hook provides complete workflow integration:

```typescript
const {
  // Core workflows
  performMedicationCheck,      // Complete medication analysis
  registerPatientComplete,     // Full patient registration
  scheduleAppointmentComplete, // Appointment with SMS
  handleEmergencyAlert,        // Emergency response
  getComprehensiveAnalytics,   // Full analytics
  searchPatientsEnhanced,      // Enhanced patient search
  testSystemConnectivity,      // System health check
  
  // State
  loading,
  error,
  lastResult
} = useMamaSafeIntegration()
```

## Multi-Language Support

All API calls support language parameters:
- English (`en`) - Default
- Hausa (`ha`) - Northern Nigeria
- Yoruba (`yo`) - Western Nigeria  
- Igbo (`ig`) - Eastern Nigeria

## Error Handling

Comprehensive error handling with:
- Network error detection
- API error parsing
- User-friendly error messages
- Automatic retry logic
- Offline mode support

## Security Features

- JWT token authentication
- Secure token storage
- Automatic token refresh
- HIPAA-compliant data handling
- Audit trail logging

## Real-Time Features

- Live system status monitoring
- Automatic health checks
- Real-time alert notifications
- Background data synchronization

## Mobile Optimization

- Offline-first architecture
- Progressive Web App (PWA) support
- Touch-optimized interfaces
- Responsive design patterns

## Testing & Validation

- API connectivity tests
- Mock data fallbacks
- Error scenario handling
- Performance monitoring

## Deployment Considerations

1. **Environment Variables:**
   ```env
   VITE_API_URL=https://ahead-hackathon.onrender.com/api/v1
   VITE_APP_VERSION=1.0.0
   ```

2. **Build Configuration:**
   - Production API endpoints
   - Error tracking setup
   - Performance monitoring
   - Security headers

3. **Monitoring:**
   - API response times
   - Error rates
   - User engagement
   - System health

## Next Steps

1. **Production Deployment:**
   - Configure production API endpoints
   - Set up monitoring and alerting
   - Implement proper error tracking

2. **Enhanced Features:**
   - Real-time notifications
   - Advanced analytics
   - Offline synchronization
   - Multi-tenant support

3. **Performance Optimization:**
   - API response caching
   - Background data sync
   - Image optimization
   - Bundle size reduction

## Support & Maintenance

- Regular API health monitoring
- Automated testing pipelines
- Performance optimization
- Security updates
- Feature enhancements

This integration provides a complete, production-ready connection between the MamaSafe frontend and backend systems, enabling healthcare providers to deliver safe, effective maternal care through intelligent medication analysis and comprehensive patient management.