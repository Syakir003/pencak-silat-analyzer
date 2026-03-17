export interface AthleteData {
  name: string;
  age: number;
  weight: number;
  height: number;
}

export interface AnalysisResult {
  category: 'Fighter' | 'Seni';
  reasoning: string;
  trainingProgram: string;
  powerSchedule: string;
  nutritionPlan: string;
}

export interface VideoAnalysisResult {
  punches: number;
  kicks: number;
  techniques: string[];
  explanation: string;
}
