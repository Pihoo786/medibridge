export const mockPatientData = [
  {
    id: 'PT-2048',
    name: 'Aaliyah Patel',
    age: 29,
    gender: 'Female',
    contact: '+91 98765 20481',
    lastCheckIn: '2 mins ago',
    triageStatus: 'Critical',
    rawWhatsAppMessage:
      'Hello doctor, I have been having severe headache, dizziness, and shortness of breath since this morning. I also noticed my hands are shaking and I feel very weak.',
    aiResponse: {
      category: 'SYMPTOM_MESSAGE',
      summary: 'Patient reports severe headache, dizziness, shortness of breath, shaking hands, and weakness.',
      patient_explanation:
        'The reported symptoms, together with elevated blood pressure and a low oxygen saturation reading, suggest a possible acute stress response or early respiratory concern.',
      doctor_notes:
        'The patient should be monitored closely for worsening symptoms, especially if dizziness or shortness of breath increases. Hydration, rest, and urgent follow-up are recommended.',
      extracted_data: [
        { name: 'Blood Pressure', value: '148/92', status: 'High' },
        { name: 'Heart Rate', value: '112 bpm', status: 'Elevated' },
        { name: 'SpO2', value: '93%', status: 'Low' },
        { name: 'Temperature', value: '38.4°C', status: 'High' }
      ]
    }
  },
  {
    id: 'PT-2039',
    name: 'Marcus Lee',
    age: 46,
    gender: 'Male',
    contact: '+91 98765 31245',
    lastCheckIn: '18 mins ago',
    triageStatus: 'Stable',
    rawWhatsAppMessage:
      'My chest feels tight after walking up the stairs. I have mild cough and occasional fatigue, but the pain is not severe.',
    aiResponse: {
      category: 'SYMPTOM_MESSAGE',
      summary: 'Patient reports chest tightness after exertion with mild cough and fatigue.',
      patient_explanation:
        'Current readings appear generally stable, with no major oxygen drop or fever. The symptoms are mild and may be related to exertion, allergies, or mild irritation.',
      doctor_notes:
        'Continued observation and a follow-up assessment are advised if the cough persists.',
      extracted_data: [
        { name: 'Blood Pressure', value: '126/80', status: 'Normal' },
        { name: 'Heart Rate', value: '82 bpm', status: 'Normal' },
        { name: 'SpO2', value: '97%', status: 'Normal' },
        { name: 'Temperature', value: '37.1°C', status: 'Normal' }
      ]
    }
  },
  {
    id: 'PT-2027',
    name: 'Sophia Nguyen',
    age: 34,
    gender: 'Female',
    contact: '+91 98765 66177',
    lastCheckIn: '42 mins ago',
    triageStatus: 'Recovering',
    rawWhatsAppMessage:
      'I have been taking the new medication and have less nausea today. I still feel a bit tired, but my appetite is improving.',
    aiResponse: {
      category: 'PRESCRIPTION',
      summary: 'Patient reports improved appetite and reduced nausea while on medication.',
      patient_explanation:
        'The patient shows signs of improvement with a normal temperature and stable oxygenation. The reduced nausea and improved appetite suggest a positive response to treatment.',
      doctor_notes:
        'Ongoing monitoring is recommended to ensure steady recovery.',
      extracted_data: [
        { name: 'Blood Pressure', value: '118/76', status: 'Normal' },
        { name: 'Heart Rate', value: '74 bpm', status: 'Normal' },
        { name: 'SpO2', value: '99%', status: 'Normal' },
        { name: 'Temperature', value: '36.9°C', status: 'Normal' }
      ]
    }
  },
  {
    id: 'PT-2014',
    name: 'Noah Williams',
    age: 57,
    gender: 'Male',
    contact: '+91 98765 47190',
    lastCheckIn: '1 hour ago',
    triageStatus: 'Critical',
    rawWhatsAppMessage:
      'I woke up with severe abdominal pain and vomiting. My wife says I look pale and I am sweating heavily.',
    aiResponse: {
      category: 'SYMPTOM_MESSAGE',
      summary: 'Patient reports severe abdominal pain, vomiting, pallor, and heavy sweating.',
      patient_explanation:
        'These findings indicate a concerning pattern that may require urgent intervention. The combination of low blood pressure, elevated heart rate, and severe pain suggests potential deterioration.',
      doctor_notes:
        'Immediate medical escalation is advised.',
      extracted_data: [
        { name: 'Blood Pressure', value: '90/58', status: 'Low' },
        { name: 'Heart Rate', value: '128 bpm', status: 'Elevated' },
        { name: 'SpO2', value: '95%', status: 'Normal' },
        { name: 'Temperature', value: '38.8°C', status: 'High' }
      ]
    }
  },
  {
    id: 'PT-2006',
    name: 'Emma Rodriguez',
    age: 25,
    gender: 'Female',
    contact: '+91 98765 84522',
    lastCheckIn: '2 hours ago',
    triageStatus: 'Stable',
    rawWhatsAppMessage:
      'I have had mild fever for 2 days and sore throat. I am able to drink fluids and I do not have trouble breathing.',
    aiResponse: {
      category: 'LAB_REPORT',
      summary: 'Patient reports mild fever and sore throat without respiratory distress.',
      patient_explanation:
        'The symptoms point to a mild viral illness rather than an emergency. Vital signs remain mostly stable, and the patient is not showing signs of respiratory distress.',
      doctor_notes:
        'Supportive care and rest are appropriate.',
      extracted_data: [
        { name: 'Blood Pressure', value: '120/78', status: 'Normal' },
        { name: 'Heart Rate', value: '76 bpm', status: 'Normal' },
        { name: 'SpO2', value: '98%', status: 'Normal' },
        { name: 'Temperature', value: '37.6°C', status: 'High' }
      ]
    }
  },
  {
    id: 'PT-1998',
    name: 'Liam Chen',
    age: 41,
    gender: 'Male',
    contact: '+91 98765 33819',
    lastCheckIn: '3 hours ago',
    triageStatus: 'Recovering',
    rawWhatsAppMessage:
      'I am feeling better today. The swelling in my ankle has reduced and I can walk a little more comfortably now.',
    aiResponse: {
      category: 'LAB_REPORT',
      summary: 'Patient reports reduced ankle swelling and improved mobility.',
      patient_explanation:
        'The patient appears to be improving. The lower swelling and stable vital signs suggest good recovery progress.',
      doctor_notes:
        'Continued monitoring and adherence to care instructions are recommended.',
      extracted_data: [
        { name: 'Blood Pressure', value: '122/79', status: 'Normal' },
        { name: 'Heart Rate', value: '71 bpm', status: 'Normal' },
        { name: 'SpO2', value: '99%', status: 'Normal' },
        { name: 'Temperature', value: '36.8°C', status: 'Normal' }
      ]
    }
  }
]
