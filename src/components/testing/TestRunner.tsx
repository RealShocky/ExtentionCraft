import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import Button from '../common/Button';
import { useExtensionStore } from '../../store/useExtensionStore';
import { TestSuite } from '../../types/testing';

interface TestRunnerProps {
  onRunTests: () => void;
  onStopTests: () => void;
  onReset: () => void;
  isRunning: boolean;
  extension?: Extension;
}

const TestRunner: React.FC<TestRunnerProps> = ({
  onRunTests,
  onStopTests,
  onReset,
  isRunning,
  extension,
}) => {
  if (!extension) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <p className="text-gray-500">Select an extension to run tests</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Test Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Environment
            </label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option value="node">Node.js</option>
              <option value="browser">Browser</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Pattern
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="**/*.test.{ts,tsx}"
              defaultValue="**/*.test.{ts,tsx}"
            />
          </div>
        </div>
      </div>

      <div className="p-4 flex gap-2">
        {!isRunning ? (
          <Button
            icon={Play}
            onClick={onRunTests}
            className="w-full"
          >
            Run Tests
          </Button>
        ) : (
          <Button
            icon={Pause}
            onClick={onStopTests}
            variant="outline"
            className="w-full"
          >
            Stop
          </Button>
        )}
        <Button
          icon={RotateCcw}
          variant="ghost"
          onClick={onReset}
          disabled={isRunning}
        />
      </div>
    </div>
  );
};

export default TestRunner;