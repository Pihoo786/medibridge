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
    extractedMetrics: {
      bloodPressure: '148/92',
      heartRate: 112,
      spO2: 93,
      temperature: 38.4,
    },
    aiExplanation:
      'The reported symptoms, together with elevated blood pressure and a low oxygen saturation reading, suggest a possible acute stress response or early respiratory concern. The patient should be monitored closely for worsening symptoms, especially if dizziness or shortness of breath increases. Hydration, rest, and urgent follow-up are recommended.'
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
    extractedMetrics: {
      bloodPressure: '126/80',
      heartRate: 82,
      spO2: 97,
      temperature: 37.1,
    },
    aiExplanation:
      'Current readings appear generally stable, with no major oxygen drop or fever. The symptoms are mild and may be related to exertion, allergies, or mild irritation. Continued observation and a follow-up assessment are advised if the cough persists.'
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
    extractedMetrics: {
      bloodPressure: '118/76',
      heartRate: 74,
      spO2: 99,
      temperature: 36.9,
    },
    aiExplanation:
      'The patient shows signs of improvement with a normal temperature and stable oxygenation. The reduced nausea and improved appetite suggest a positive response to treatment. Ongoing monitoring is recommended to ensure steady recovery.'
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
    extractedMetrics: {
      bloodPressure: '90/58',
      heartRate: 128,
      spO2: 95,
      temperature: 38.8,
    },
    aiExplanation:
      'These findings indicate a concerning pattern that may require urgent intervention. The combination of low blood pressure, elevated heart rate, and severe pain suggests potential deterioration. Immediate medical escalation is advised.'
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
    extractedMetrics: {
      bloodPressure: '120/78',
      heartRate: 76,
      spO2: 98,
      temperature: 37.6,
    },
    aiExplanation:
      'The symptoms point to a mild viral illness rather than an emergency. Vital signs remain mostly stable, and the patient is not showing signs of respiratory distress. Supportive care and rest are appropriate.'
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
    extractedMetrics: {
      bloodPressure: '122/79',
      heartRate: 71,
      spO2: 99,
      temperature: 36.8,
    },
    aiExplanation:
      'The patient appears to be improving. The lower swelling and stable vital signs suggest good recovery progress. Continued monitoring and adherence to care instructions are recommended.'
  }
]
