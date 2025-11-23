# MamaSafe SMS Interface - Product Requirements Document

## **Executive Summary**
MamaSafe SMS Interface enables complete pregnancy medication safety management through text messages, making the platform accessible to rural healthcare workers and patients without smartphones or internet connectivity.

## **Core Vision**
**"Every pregnant woman in rural Africa can access medication safety guidance through a simple text message"**

---

## **1. SMS User Flows**

### **1.1 Healthcare Provider Registration**
```
Provider → *123*MAMA# 
System → "Welcome to MamaSafe! Reply with: REG [Name] [Location] [License]"
Provider → "REG Dr Amina Kano 12345"
System → "Registration successful! Your ID: P001. Text HELP for commands."
```

### **1.2 Patient Registration**
```
Provider → "PATIENT Fatima 28 24weeks +2348031234567"
System → "Patient registered! ID: 176. SMS sent to patient."

Patient receives → "Welcome to MamaSafe! You're registered for pregnancy care. Your ID: 176. Reply HELP for options."
```

### **1.3 Medication Safety Check**

#### **Single Drug Check**
```
Provider → "CHECK 176 Paracetamol headache"
System → "✅ SAFE: Paracetamol is safe during pregnancy at recommended doses. Continue standard monitoring."
```

#### **Multi-Drug Check**
```
Provider → "CHECK 176 Paracetamol+Ibuprofen fever,headache"
System → "⚠️ CONTRAINDICATED: MAJOR INTERACTION - Ibuprofen dangerous after 28 weeks. Use Paracetamol only. Consult specialist."
```

#### **Patient Self-Check**
```
Patient → "DRUG Paracetamol headache"
System → "✅ SAFE for 24 weeks pregnancy. Take as directed. Next appointment: 15 Jan. Questions? Reply HELP."
```

---

## **2. SMS Command Structure**

### **2.1 Provider Commands**
| Command | Format | Example |
|---------|--------|---------|
| `REG` | REG [Name] [Location] [License] | REG Dr Amina Kano 12345 |
| `PATIENT` | PATIENT [Name] [Age] [Weeks] [Phone] | PATIENT Fatima 28 24weeks +234803 |
| `CHECK` | CHECK [PatientID] [Drug] [Symptoms] | CHECK 176 Paracetamol headache |
| `MULTI` | MULTI [PatientID] [Drug1+Drug2] [Symptoms] | MULTI 176 Paracetamol+Aspirin fever |
| `APPT` | APPT [PatientID] [Date] [Time] | APPT 176 15-Jan 10am |
| `HISTORY` | HISTORY [PatientID] | HISTORY 176 |
| `ALERT` | ALERT [PatientID] [Message] | ALERT 176 Come for checkup |

### **2.2 Patient Commands**
| Command | Format | Example |
|---------|--------|---------|
| `DRUG` | DRUG [Medication] [Symptoms] | DRUG Paracetamol headache |
| `STATUS` | STATUS | STATUS |
| `APPT` | APPT | APPT |
| `HELP` | HELP | HELP |
| `EMERGENCY` | EMERGENCY [Symptoms] | EMERGENCY severe bleeding |

### **2.3 System Responses**
| Risk Level | SMS Format | Example |
|------------|------------|---------|
| **Safe** | ✅ SAFE: [Message] | ✅ SAFE: Paracetamol is safe during pregnancy |
| **Caution** | ⚠️ CAUTION: [Message] | ⚠️ CAUTION: Monitor closely, consult if symptoms worsen |
| **High Risk** | 🚨 HIGH RISK: [Message] | 🚨 HIGH RISK: Requires specialist consultation |
| **Contraindicated** | ❌ CONTRAINDICATED: [Message] | ❌ CONTRAINDICATED: Do not use. Use [Alternative] |

---

## **3. Multi-Language Support**

### **3.1 Language Detection & Response**
```
Provider → "CHECK 176 Paracetamol ciwon kai" (Hausa)
System → "✅ LAFIYA: Paracetamol yana da aminci a lokacin daukar ciki..." (Hausa response)

Provider → "CHECK 176 Paracetamol ori" (Yoruba) 
System → "✅ AILEWU: Paracetamol ko lewu fun aboyun..." (Yoruba response)
```

### **3.2 Supported Languages**
- **English**: Default medical terminology
- **Hausa**: Northern Nigeria rural areas
- **Yoruba**: Southwest Nigeria communities  
- **Igbo**: Southeast Nigeria regions

---

## **4. Advanced SMS Features**

### **4.1 Appointment Management**
```
Provider → "APPT 176 15-Jan 10am medication_review"
System → "Appointment created for Fatima on 15-Jan 10am"
Patient receives → "Appointment: 15-Jan 10am for medication review. Reply CONFIRM or RESCHEDULE"

Patient → "CONFIRM"
System → "Appointment confirmed. Location: Kano Health Center. Bring medications."
```

### **4.2 Medication Reminders**
```
System → Patient: "REMINDER: Take Paracetamol as prescribed. Next dose: 2pm. Questions? Reply HELP"
System → Patient: "WEEKLY CHECK: How are you feeling? Reply: GOOD, FAIR, or CONCERN [symptoms]"
```

### **4.3 Emergency Alerts**
```
Patient → "EMERGENCY severe bleeding cramping"
System → "🚨 EMERGENCY ALERT sent to Dr Amina. Go to nearest hospital immediately. Call 199 for ambulance."
Provider receives → "🚨 EMERGENCY: Patient 176 (Fatima) reports severe bleeding, cramping. Last check: Paracetamol 2 days ago."
```

---

## **5. Technical Implementation**

### **5.1 SMS Gateway Integration**
- **Primary**: Twilio SMS API for reliability
- **Backup**: Local Nigerian SMS providers (MTN, Airtel, Glo)
- **USSD Fallback**: *123*MAMA# for areas with poor SMS coverage

### **5.2 Message Processing Pipeline**
```
SMS Received → Language Detection → Command Parsing → 
API Call (MamaSafe Backend) → Response Generation → 
Language Translation → SMS Delivery
```

### **5.3 Offline Capability**
- **Local SMS Rules**: Basic safety guidelines stored on SMS gateway
- **Sync When Online**: Full analysis when internet available
- **Priority Queue**: Emergency messages get immediate processing

---

## **6. User Experience Design**

### **6.1 Message Length Optimization**
- **Single SMS**: 160 characters max for basic responses
- **Multi-part**: Complex drug interactions split across 2-3 messages
- **Abbreviations**: Standard medical abbreviations for space efficiency

### **6.2 Error Handling**
```
Invalid Command → "Invalid format. Text HELP for commands or try: CHECK [PatientID] [Drug] [Symptoms]"
System Error → "Service temporarily unavailable. Try again in 5 minutes or call emergency line."
```

### **6.3 Help System**
```
User → "HELP"
System → "MamaSafe Commands:
CHECK [ID] [Drug] - Safety check
PATIENT [Name] [Age] [Weeks] - Register
APPT [ID] [Date] - Schedule
HELP [Command] - Detailed help"
```

---

## **7. Integration Points**

### **7.1 Backend API Mapping**
| SMS Command | API Endpoint | Parameters |
|-------------|--------------|------------|
| `CHECK` | `/api/v1/medications/check` | drug_name, patient_id, symptoms |
| `PATIENT` | `/api/v1/patient/create` | name, age, gestational_week, phone |
| `APPT` | `/api/v1/patient/appointments` | patient_id, date, type |
| `HISTORY` | `/api/v1/encounters/{patient_id}` | patient_id |

### **7.2 Real-time Sync**
- **Bidirectional**: SMS actions update web dashboard
- **Provider Notifications**: Web actions trigger SMS alerts
- **Data Consistency**: All platforms show same patient data

---

## **8. Success Metrics**

### **8.1 Adoption Metrics**
- **Provider Registration**: 500+ healthcare workers in 6 months
- **Patient Reach**: 10,000+ pregnant women registered
- **Daily Usage**: 200+ medication checks per day
- **Geographic Coverage**: 50+ rural communities

### **8.2 Clinical Impact**
- **Response Time**: <30 seconds for medication safety checks
- **Accuracy Rate**: 95%+ correct safety classifications
- **Emergency Response**: <2 minutes for critical alerts
- **Language Coverage**: 80%+ messages in local languages

### **8.3 Technical Performance**
- **SMS Delivery**: 99%+ success rate
- **Uptime**: 99.9% availability
- **Offline Capability**: 24/7 basic safety rules
- **Multi-language**: Real-time translation accuracy >90%

---

## **9. Implementation Phases**

### **Phase 1: Core SMS (Month 1-2)**
- Basic medication checks via SMS
- Provider and patient registration
- English language support
- Single drug analysis

### **Phase 2: Multi-language (Month 3)**
- Hausa, Yoruba, Igbo support
- Language detection and translation
- Cultural adaptation of medical terms

### **Phase 3: Advanced Features (Month 4-5)**
- Multi-drug interaction checks
- Appointment scheduling via SMS
- Emergency alert system
- Medication reminders

### **Phase 4: Scale & Optimize (Month 6)**
- USSD integration for feature phones
- Offline capability enhancement
- Performance optimization
- Analytics dashboard

---

## **10. Risk Mitigation**

### **10.1 Medical Safety**
- **Disclaimer Messages**: "Consult healthcare provider for final decisions"
- **Emergency Escalation**: Critical cases automatically escalated
- **Audit Trail**: All SMS interactions logged for review

### **10.2 Technical Risks**
- **SMS Gateway Redundancy**: Multiple provider fallbacks
- **Message Delivery Confirmation**: Receipt acknowledgments
- **Data Privacy**: Encrypted message storage and transmission

### **10.3 User Adoption**
- **Training Materials**: SMS command cards for providers
- **Local Champions**: Community health workers as advocates
- **Gradual Rollout**: Pilot in 5 communities before full launch

---

**MamaSafe SMS Interface transforms pregnancy care accessibility, ensuring every woman can receive medication safety guidance regardless of technology barriers.**