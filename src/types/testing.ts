export interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration?: number;
  error?: string;
  suite?: string;
}

export interface TestSuite {
  name: string;
  results: TestResult[];
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration?: number;
}

export interface TestReport {
  suites: TestSuite[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    duration: number;
  };
}