export type StatusSeverity = 'normal' | 'elevated' | 'warning' | 'info';

export interface VitalItem {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: string;
  severity: StatusSeverity;
  trend: string;
  lastUpdated: string;
  iconName: 'heart' | 'bp' | 'o2' | 'temp' | 'scale' | 'glucose' | 'steps' | 'sleep';
  sparklineData: number[];
  targetRange?: string;
  historicalContext?: string;
}

export interface LabResultItem {
  id: string;
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'Borderline' | 'High' | 'Low';
  flag?: boolean;
}

export interface LabPanel {
  panelName: string;
  category: string;
  results: LabResultItem[];
}

export interface ImagingStudy {
  id: string;
  title: string;
  date: string;
  modality: string;
  findings: string;
  impression: string;
  status: 'Normal' | 'Borderline' | 'Follow-up Needed';
}

export interface CareRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'Important' | 'Recommended' | 'Upcoming';
  dueDate: string;
  actionText: string;
  completed?: boolean;
}

export interface PatientInfo {
  name: string;
  role: string;
  avatarUrl: string;
}
