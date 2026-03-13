export type ScenarioStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface RiskReportResponse {
  score: number;
  level: RiskLevel;
  summary: string;
  details: {
    financial: string;
    legal: string;
    operational: string;
    recommendations: string[];
  };
  createdAt: string;
}

export interface ScenarioResponse {
  id: string;
  title: string;
  description: string;
  status: ScenarioStatus;
  inputData: Record<string, unknown>;
  report?: RiskReportResponse;
  createdAt: string;
}

export interface CreateScenarioDto {
  categoryId: string;
  title: string;
  description: string;
  inputData: Record<string, unknown>;
}
