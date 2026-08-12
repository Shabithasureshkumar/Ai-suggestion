import { VitalItem, LabPanel, ImagingStudy, CareRecommendation, PatientInfo } from '../types/health';

export const patientInfo: PatientInfo = {
  name: "David Brock",
  role: "General Physician",
  avatarUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80",
};

export const heroMetadata = {
  title: "Your AI Health Summary",
  generatedDate: "May 27, 2026",
  dataSources: "Based on 3 visits, 8 labs, and continuous vitals",
  disclaimer: "This report is AI-generated for informational purposes and reviewed alongside — not in place of — your clinical team. It is not a medical diagnosis.",
  aiModelVersion: "Ava Clinical Intelligence v4.2",
  healthScore: 88,
  scoreChange: "+3 points vs last month",
};

export const overallHealthStatusData = {
  title: "Overall Health Status",
  shortSummary: "Stable overall with well-managed hypertension.",
  detailedExplanation: "Your overall health picture is stable and trending positive. Blood pressure is under control on your current regimen. Recent labs show mild elevation in LDL cholesterol worth monitoring at your next visit. Weight and BMI remain in a healthy range and your resting heart rate has trended down since November — likely reflecting your daily walking habit.",
  keyHighlights: [
    { label: "Blood Pressure", text: "Under control on current regimen", status: "managed" },
    { label: "Lipid Profile", text: "Mild elevation in LDL cholesterol", status: "monitor" },
    { label: "Heart Rate", text: "Trended down since November", status: "positive" },
    { label: "Weight & BMI", text: "Maintained in healthy range", status: "positive" },
  ]
};

export const vitalsData: VitalItem[] = [
  {
    id: "hr",
    name: "Heart Rate",
    value: "72",
    unit: "bpm",
    status: "Normal",
    severity: "normal",
    trend: "Stable 12 min ago",
    lastUpdated: "12 min ago",
    iconName: "heart",
    sparklineData: [68, 70, 71, 74, 73, 71, 72],
    targetRange: "60 - 100 bpm",
    historicalContext: "Resting HR has decreased by 4 bpm over the past 30 days due to regular exercise."
  },
  {
    id: "bp",
    name: "Blood Pressure",
    value: "132/86",
    unit: "mmHg",
    status: "Elevated",
    severity: "elevated",
    trend: "↓ 2% vs yesterday 2 min ago",
    lastUpdated: "2 min ago",
    iconName: "bp",
    sparklineData: [138, 136, 135, 134, 133, 134, 132],
    targetRange: "< 120/80 mmHg",
    historicalContext: "Systolic pressure improved from 140 mmHg over 3 months with daily medication."
  },
  {
    id: "o2",
    name: "Blood Oxygen",
    value: "98",
    unit: "%",
    status: "Normal",
    severity: "normal",
    trend: "Optimal 15 min ago",
    lastUpdated: "15 min ago",
    iconName: "o2",
    sparklineData: [97, 98, 98, 99, 98, 98, 98],
    targetRange: "95 - 100 %",
    historicalContext: "Oxygen saturation remains consistently optimal across all continuous wear readings."
  },
  {
    id: "temp",
    name: "Temperature",
    value: "98.6",
    unit: "°F",
    status: "Normal",
    severity: "normal",
    trend: "Stable 1 hour ago",
    lastUpdated: "1 hour ago",
    iconName: "temp",
    sparklineData: [98.4, 98.5, 98.6, 98.6, 98.7, 98.6, 98.6],
    targetRange: "97.8 - 99.1 °F",
    historicalContext: "Body temperature remains stable within baseline circadian fluctuations."
  },
  {
    id: "weight",
    name: "Weight",
    value: "185",
    unit: "lbs",
    status: "No Change",
    severity: "info",
    trend: "Steady 1 day ago",
    lastUpdated: "1 day ago",
    iconName: "scale",
    sparklineData: [186.2, 185.8, 185.5, 185.2, 185.0, 185.1, 185.0],
    targetRange: "175 - 188 lbs (BMI 24.1)",
    historicalContext: "Weight has stabilized over the last 60 days following diet adjustments."
  },
  {
    id: "glucose",
    name: "Blood Glucose",
    value: "110",
    unit: "mg/dL",
    status: "Normal",
    severity: "normal",
    trend: "Within target 4 hours ago",
    lastUpdated: "4 hours ago",
    iconName: "glucose",
    sparklineData: [105, 115, 122, 118, 112, 108, 110],
    targetRange: "70 - 140 mg/dL (Fasting)",
    historicalContext: "Fasting glucose is within target bounds with smooth post-meal glycemic recovery."
  },
  {
    id: "steps",
    name: "Steps",
    value: "8,420",
    unit: "steps",
    status: "Below Goal",
    severity: "info",
    trend: "Goal 10,000 Today",
    lastUpdated: "Today",
    iconName: "steps",
    sparklineData: [6200, 9100, 10400, 7800, 11200, 9500, 8420],
    targetRange: "10,000 steps/day",
    historicalContext: "Current step count is 84% of daily goal. 1,580 steps remaining today."
  },
  {
    id: "sleep",
    name: "Sleep",
    value: "7h 15m",
    unit: "",
    status: "Normal",
    severity: "normal",
    trend: "Consistent cycle Last night",
    lastUpdated: "Last night",
    iconName: "sleep",
    sparklineData: [6.5, 7.0, 7.8, 6.8, 7.2, 7.4, 7.25],
    targetRange: "7.0 - 9.0 hours",
    historicalContext: "Sleep architecture shows 1h 45m REM and 1h 30m deep sleep stage recovery."
  }
];

export const labPanelsData: LabPanel[] = [
  {
    panelName: "Lipid Panel",
    category: "Cardiovascular Health",
    results: [
      { id: "l1", testName: "LDL Cholesterol", value: "135", unit: "mg/dL", referenceRange: "< 100 mg/dL", status: "Borderline", flag: true },
      { id: "l2", testName: "HDL Cholesterol", value: "52", unit: "mg/dL", referenceRange: "> 40 mg/dL", status: "Normal" },
      { id: "l3", testName: "Triglycerides", value: "140", unit: "mg/dL", referenceRange: "< 150 mg/dL", status: "Normal" },
      { id: "l4", testName: "Total Cholesterol", value: "198", unit: "mg/dL", referenceRange: "< 200 mg/dL", status: "Normal" },
    ]
  },
  {
    panelName: "Comprehensive Metabolic Panel (CMP)",
    category: "Metabolic & Renal",
    results: [
      { id: "c1", testName: "Fasting Glucose", value: "110", unit: "mg/dL", referenceRange: "70 - 99 mg/dL", status: "Normal" },
      { id: "c2", testName: "eGFR", value: ">90", unit: "mL/min", referenceRange: "> 60 mL/min", status: "Normal" },
      { id: "c3", testName: "Serum Creatinine", value: "0.9", unit: "mg/dL", referenceRange: "0.7 - 1.3 mg/dL", status: "Normal" },
      { id: "c4", testName: "BUN", value: "14", unit: "mg/dL", referenceRange: "7 - 20 mg/dL", status: "Normal" },
    ]
  },
  {
    panelName: "Complete Blood Count (CBC)",
    category: "Hematology",
    results: [
      { id: "cb1", testName: "Hemoglobin", value: "15.2", unit: "g/dL", referenceRange: "13.8 - 17.2 g/dL", status: "Normal" },
      { id: "cb2", testName: "White Blood Cells (WBC)", value: "6.8", unit: "k/µL", referenceRange: "4.5 - 11.0 k/µL", status: "Normal" },
      { id: "cb3", testName: "Platelets", value: "240", unit: "k/µL", referenceRange: "150 - 450 k/µL", status: "Normal" },
    ]
  }
];

export const imagingSummaryData: ImagingStudy[] = [
  {
    id: "img1",
    title: "12-Lead Electrocardiogram (ECG)",
    date: "May 20, 2026",
    modality: "Electrophysiology",
    findings: "Normal Sinus Rhythm, Heart Rate 71 bpm. PR interval 156 ms, QRS duration 88 ms, QTc 410 ms.",
    impression: "ECG normal sinus rhythm with crisp wave morphology. No evidence of ischemia, conduction delay, or arrhythmia.",
    status: "Normal"
  },
  {
    id: "img2",
    title: "Chest X-Ray (PA & Lateral)",
    date: "Apr 15, 2026",
    modality: "Radiology",
    findings: "Lungs are clear bilaterally without focal consolidation, vascular congestion, or pleural effusion.",
    impression: "Chest X-ray unremarkable. Cardiac silhouette and mediastinal contours are normal.",
    status: "Normal"
  },
  {
    id: "img3",
    title: "Transthoracic Echocardiogram",
    date: "Jan 10, 2026",
    modality: "Ultrasound",
    findings: "Left ventricular ejection fraction (LVEF) 62%. Normal wall thickness and motion.",
    impression: "Preserved systolic function. No significant valvular stenosis or regurgitation.",
    status: "Normal"
  }
];

export const careRecommendationsData: CareRecommendation[] = [
  {
    id: "rec1",
    title: "Schedule Annual Lipid & HbA1c Re-check",
    description: "Follow-up blood draw to monitor borderline LDL cholesterol (135 mg/dL) and confirm lipid stability.",
    priority: "Important",
    dueDate: "Due in 2 weeks",
    actionText: "Book Appointment"
  },
  {
    id: "rec2",
    title: "Maintain Daily 10,000 Step Walking Goal",
    description: "Sustained physical activity supports blood pressure management and aerobic fitness.",
    priority: "Recommended",
    dueDate: "Active Daily Habit",
    actionText: "Log Activity"
  },
  {
    id: "rec3",
    title: "Seasonal Vaccination Booster",
    description: "Annual influenza and preventive respiratory immunization update recommended for upcoming season.",
    priority: "Upcoming",
    dueDate: "Scheduled Oct 2026",
    actionText: "Set Reminder"
  }
];
