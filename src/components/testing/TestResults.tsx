import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { TestResult, TestSuite } from '../../types/testing';

interface TestResultItemProps {
  result: TestResult;
}

const TestResultItem: React.FC<TestResultItemProps> = ({ result }) => {
  const getStatusIcon = () => {
    switch (result.status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className={`
      p-4 border-b last:border-b-0
      ${result.status === 'failed' ? 'bg-red-50' : ''}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h4 className="font-medium">{result.name}</h4>
            {result.suite && (
              <p className="text-sm text-gray-500">{result.suite}</p>
            )}
          </div>
        </div>
        {result.duration && (
          <span className="text-sm text-gray-500">
            {result.duration}ms
          </span>
        )}
      </div>
      
      {result.error && (
        <div className="mt-3 p-3 bg-red-100 rounded-md">
          <pre className="text-sm text-red-700 whitespace-pre-wrap">
            {result.error}
          </pre>
        </div>
      )}
    </div>
  );
};

interface TestSuiteComponentProps {
  suite: TestSuite;
}

const TestSuiteComponent: React.FC<TestSuiteComponentProps> = ({ suite }) => {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{suite.name}</h3>
        <div className="flex items-center gap-4">
          <span className={`
            px-2 py-1 rounded-full text-sm
            ${suite.status === 'passed' ? 'bg-green-100 text-green-700' : ''}
            ${suite.status === 'failed' ? 'bg-red-100 text-red-700' : ''}
            ${suite.status === 'running' ? 'bg-blue-100 text-blue-700' : ''}
            ${suite.status === 'pending' ? 'bg-gray-100 text-gray-700' : ''}
          `}>
            {suite.status.charAt(0).toUpperCase() + suite.status.slice(1)}
          </span>
          {suite.duration && (
            <span className="text-sm text-gray-500">
              {suite.duration}ms
            </span>
          )}
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        {suite.results.map((result) => (
          <TestResultItem key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

interface TestResultsProps {
  suites: TestSuite[];
  summary?: {
    total: number;
    passed: number;
    failed: number;
    duration: number;
  };
}

const TestResults: React.FC<TestResultsProps> = ({ suites, summary }) => {
  return (
    <div className="h-full bg-white overflow-y-auto">
      {summary && (
        <div className="p-4 border-b bg-gray-50">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{summary.total}</div>
              <div className="text-sm text-gray-500">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {summary.passed}
              </div>
              <div className="text-sm text-gray-500">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {summary.failed}
              </div>
              <div className="text-sm text-gray-500">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{summary.duration}ms</div>
              <div className="text-sm text-gray-500">Duration</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4">
        {suites.map((suite) => (
          <TestSuiteComponent key={suite.name} suite={suite} />
        ))}
      </div>
    </div>
  );
};

export default TestResults;