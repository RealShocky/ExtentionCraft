import React from 'react';
import { useExtensionStore } from '../store/useExtensionStore';
import TestRunner from '../components/testing/TestRunner';
import TestResults from '../components/testing/TestResults';
import Card from '../components/common/Card';
import { Play } from 'lucide-react';
import Button from '../components/common/Button';

const Testing = () => {
  const { activeExtension } = useExtensionStore();
  const [isRunning, setIsRunning] = React.useState(false);
  const [results, setResults] = React.useState<TestResult[]>([]);

  const handleRunTests = async () => {
    if (!activeExtension) return;
    
    setIsRunning(true);
    setResults([]);

    // Simulate test running
    const testCases = generateTestCases(activeExtension);
    
    for (const test of testCases) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setResults(prev => [...prev, test]);
    }

    setIsRunning(false);
  };

  if (!activeExtension) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Testing Suite</h1>
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500">Please select an extension to test</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Testing Suite</h1>
        <Button
          icon={Play}
          onClick={handleRunTests}
          disabled={isRunning}
        >
          Run Tests
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TestRunner
          extension={activeExtension}
          isRunning={isRunning}
        />
        <TestResults results={results} />
      </div>
    </div>
  );
};

export default Testing;