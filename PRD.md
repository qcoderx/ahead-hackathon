# MamaSafe - Product Requirements Document (PRD)

## 🎯 **PRODUCT OVERVIEW**

**MamaSafe** is an AI-powered pregnancy medication safety system designed for healthcare providers in rural Africa. It combines Gemini AI analysis with EMR integration to provide evidence-based medication guidance when specialist access is limited.

### **Core Value Proposition**
- **Prevents medication errors** in resource-limited settings
- **Provides specialist-level guidance** without specialist access  
- **Maintains complete medical records** for continuity of care
- **Reduces maternal and fetal risks** through AI-powered decision support

---

## 🏗️ **SYSTEM ARCHITECTURE**

### **Backend Components (COMPLETED)**
1. **AI Safety Analysis** - Gemini 2.5 Flash analyzes medication safety
2. **Multi-Language Support** - Yoruba, Igbo, Hausa, English
3. **Predictive Risk Scoring** - Uses patient history for personalized recommendations
4. **EMR Integration** - Dorra EMR for patient records and encounters
5. **Authentication System** - JWT-based secure access
6. **Twilio Integration** - SMS/WhatsApp fallback support

### **API Endpoints Available**
- `POST /api/v1/medications/check` - Main medication safety check
- `POST /api/v1/encounters/update` - Update patient medical history
- `POST /api/v1/encounters/create-test-data/{patient_id}` - Create test data
- `POST /api/v1/auth/login` - User authentication

---

## 🎨 **FRONTEND REQUIREMENTS**

### **1. CORE USER INTERFACE**

#### **Main Dashboard**
- **Patient Search Bar** - Search by ID or name
- **Quick Medication Check** - Drug name input with autocomplete
- **Language Selector** - Prominent toggle for EN/YO/IG/HA
- **Recent Checks** - History of last 10 medication checks
- **Risk Alert Banner** - Show high-risk patients

#### **Medication Check Form**
```
┌─────────────────────────────────────┐
│ Language: [EN] [YO] [IG] [HA]      │
├─────────────────────────────────────┤
│ Patient ID: [____________]          │
│ Drug Name: [_____________]          │
│ Symptoms: [______________]          │
│ Gestational Week: [____] weeks      │
│                                     │
│ [CHECK MEDICATION SAFETY]           │
└─────────────────────────────────────┘
```

#### **Results Display**
```
┌─────────────────────────────────────┐
│ 🔴 HIGH RISK - CONTRAINDICATED     │
├─────────────────────────────────────┤
│ Drug: Ibuprofen                     │
│ Risk Score: 85/100                  │
│                                     │
│ ⚠️ NSAIDs in 3rd trimester can     │
│ cause premature closure of ductus   │
│ arteriosus. Avoid after 28 weeks.   │
│                                     │
│ 💡 Safer Alternatives:              │
│ • Paracetamol                       │
│ • Acetaminophen                     │
│                                     │
│ 📋 Patient History Notes:           │
│ Consider: hypertension, preeclampsia │
│                                     │
│ [SEND SMS] [PRINT] [SAVE]          │
└─────────────────────────────────────┘
```

### **2. LANGUAGE FEATURES**

#### **Language Toggle Component**
- **Prominent placement** - Top right corner
- **Visual flags** - Nigerian flag icons for local languages
- **Auto-detection** - Detect language from input text
- **Real-time translation** - All UI elements translate instantly

#### **Supported Languages**
- **English (EN)** - Default
- **Yoruba (YO)** - Yorùbá
- **Igbo (IG)** - Igbo
- **Hausa (HA)** - Hausa

#### **Translation Requirements**
- **Form labels** translate
- **Button text** translates
- **Error messages** translate
- **Results** translate (AI handles this)
- **Navigation** translates

### **3. SMS/WHATSAPP INTEGRATION**

#### **SMS Fallback Features**
```
┌─────────────────────────────────────┐
│ 📱 SMS FALLBACK                    │
├─────────────────────────────────────┤
│ Phone: [+234___________]            │
│                                     │
│ [SEND RESULTS VIA SMS]              │
│ [SEND VIA WHATSAPP]                 │
│                                     │
│ ✅ Sent to +234801234567           │
│ "Ibuprofen - HIGH RISK. Use        │
│ Paracetamol instead. -MamaSafe"     │
└─────────────────────────────────────┘
```

#### **SMS Templates (Backend Ready)**
- **High Risk**: "⚠️ {drug} - HIGH RISK for {weeks}w pregnancy. Use {alternative}. -MamaSafe"
- **Safe**: "✅ {drug} - SAFE for {weeks}w pregnancy. Follow dosage. -MamaSafe"
- **Caution**: "⚠️ {drug} - USE WITH CAUTION at {weeks}w. Monitor closely. -MamaSafe"

### **4. PATIENT MANAGEMENT**

#### **Patient Profile View**
- **Basic Info** - Name, age, gestational week
- **Risk Score** - 0-100 with color coding
- **Medical History** - Previous encounters
- **Current Medications** - Active prescriptions
- **Allergies** - Known drug allergies
- **Risk Factors** - Chronic conditions, complications

#### **Encounter History**
- **Timeline view** of all medical encounters
- **Medication checks** with results
- **Risk score trends** over time
- **Export functionality** for reports

### **5. OFFLINE CAPABILITIES**

#### **Offline Mode**
- **Cache common medications** for offline checks
- **Store patient data** locally
- **Queue actions** for when online
- **Sync indicator** showing connection status

#### **Progressive Web App (PWA)**
- **Installable** on mobile devices
- **Works offline** with cached data
- **Push notifications** for high-risk alerts
- **Fast loading** with service workers

---

## 🔧 **TECHNICAL SPECIFICATIONS**

### **Frontend Stack**
- **React.js** with TypeScript
- **Tailwind CSS** for styling
- **React Query** for API state management
- **React Hook Form** for form handling
- **i18next** for internationalization
- **PWA** capabilities with service workers

### **API Integration**
```javascript
// Main medication check
const checkMedication = async (data) => {
  const response = await fetch('/api/v1/medications/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      drug_name: data.drugName,
      patient_id: data.patientId,
      gestational_week: data.gestationalWeek,
      symptoms: data.symptoms,
      language: data.language // "en", "yo", "ig", "ha"
    })
  });
  return response.json();
};
```

### **State Management**
```javascript
// Global state structure
{
  user: { id, name, role, token },
  language: "en", // "yo", "ig", "ha"
  currentPatient: { id, name, gestationalWeek, riskScore },
  medicationCheck: { loading, result, error },
  offline: { isOffline, queuedActions, cachedData }
}
```

---

## 📱 **MOBILE RESPONSIVENESS**

### **Mobile-First Design**
- **Touch-friendly** buttons (min 44px)
- **Swipe gestures** for navigation
- **Large text** for readability
- **Voice input** for medication names
- **Camera integration** for prescription scanning

### **Responsive Breakpoints**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

---

## 🚀 **PRIORITY FEATURES**

### **Phase 1 (IMMEDIATE)**
1. ✅ **Basic medication check form**
2. ✅ **Language selector (EN/YO/IG/HA)**
3. ✅ **Results display with risk scoring**
4. ✅ **SMS integration buttons**
5. ✅ **Patient search functionality**

### **Phase 2 (NEXT SPRINT)**
1. **Patient profile management**
2. **Encounter history timeline**
3. **Offline mode with caching**
4. **PWA installation**
5. **Voice input for drug names**

### **Phase 3 (FUTURE)**
1. **Camera prescription scanning**
2. **Advanced analytics dashboard**
3. **Bulk patient management**
4. **Integration with other EMR systems**

---

## 🎨 **UI/UX GUIDELINES**

### **Color Scheme**
- **Primary**: #10B981 (Green - Safe)
- **Warning**: #F59E0B (Yellow - Caution)
- **Danger**: #EF4444 (Red - High Risk)
- **Critical**: #7C2D12 (Dark Red - Contraindicated)
- **Background**: #F9FAFB
- **Text**: #111827

### **Typography**
- **Headers**: Inter Bold
- **Body**: Inter Regular
- **Monospace**: JetBrains Mono (for IDs, codes)

### **Icons**
- **Heroicons** for UI elements
- **Flag icons** for languages
- **Medical icons** for drug categories

---

## 🔌 **TWILIO INTEGRATION SPECS**

### **SMS Functionality**
```javascript
// SMS sending (Backend handles this)
const sendSMS = async (phoneNumber, message, language) => {
  await fetch('/api/v1/sms/send', {
    method: 'POST',
    body: JSON.stringify({
      to: phoneNumber,
      message: message,
      language: language
    })
  });
};
```

### **WhatsApp Integration**
- **WhatsApp Business API** integration
- **Template messages** for medication results
- **Rich media** support for images/PDFs
- **Two-way communication** for follow-ups

### **Frontend SMS Components**
1. **Phone number input** with country code
2. **Send SMS button** with loading state
3. **Delivery confirmation** display
4. **Message preview** before sending
5. **Contact history** for recent SMS

---

## 📊 **ANALYTICS & MONITORING**

### **Key Metrics to Track**
- **Medication checks per day**
- **High-risk alerts generated**
- **Language usage distribution**
- **SMS delivery rates**
- **User engagement patterns**
- **Error rates and types**

### **Dashboard Requirements**
- **Real-time usage statistics**
- **Risk alert trends**
- **Popular medications checked**
- **Geographic usage patterns**
- **Performance metrics**

---

## 🔒 **SECURITY & COMPLIANCE**

### **Data Protection**
- **HTTPS only** for all communications
- **JWT token** authentication
- **Patient data encryption** at rest
- **Audit logging** for all actions
- **GDPR compliance** for data handling

### **Medical Compliance**
- **Disclaimer text** on all results
- **"Consult a doctor" messaging**
- **Clear AI limitations** statements
- **Emergency contact information**

---

## 🚀 **DEPLOYMENT CHECKLIST**

### **Pre-Launch**
- [ ] All API endpoints tested
- [ ] Multi-language functionality verified
- [ ] SMS/WhatsApp integration working
- [ ] Offline mode functional
- [ ] Mobile responsiveness confirmed
- [ ] Security audit completed
- [ ] Performance optimization done

### **Launch Requirements**
- [ ] PWA installable
- [ ] Analytics tracking active
- [ ] Error monitoring setup
- [ ] Backup systems ready
- [ ] User documentation complete
- [ ] Training materials prepared

---

**GET THIS SHIT BUILT! 🔥**