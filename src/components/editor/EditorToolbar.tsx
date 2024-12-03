import React from 'react';
import { Save, Play, Settings } from 'lucide-react';
import Button from '../common/Button';
import { useEditorStore } from '../../store/useEditorStore';

export const EditorToolbar: React.FC = () => {
  const { saveCurrentFile } = useEditorStore();

  return (
    <div className="h-12 border-b px-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Save}
          onClick={saveCurrentFile}
        >
          Save
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={Play}
        >
          Run
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        icon={Settings}
      >
        Editor Settings
      </Button>
    </div>
  );
};