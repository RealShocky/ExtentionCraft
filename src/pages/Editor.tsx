import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useExtensionStore } from '../store/useExtensionStore';
import Split from 'split.js';
import FileTree from '../components/editor/FileTree';
import CodeEditor from '../components/editor/CodeEditor';
import ConfigPanel from '../components/editor/ConfigPanel';
import { Save, Play } from 'lucide-react';
import Button from '../components/common/Button';

const Editor = () => {
  const { id } = useParams();
  const { activeExtension, setActiveExtension, extensions } = useExtensionStore();
  const splitRef = useRef<Split.Instance>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const extension = extensions.find(e => e.id === id);
    setActiveExtension(extension || null);
  }, [id, extensions, setActiveExtension]);

  useEffect(() => {
    if (containerRef.current) {
      splitRef.current = Split(['.file-tree', '.editor-main', '.config-panel'], {
        sizes: [20, 60, 20],
        minSize: [200, 400, 200],
        gutterSize: 4,
        snapOffset: 0,
      });
    }

    return () => {
      splitRef.current?.destroy();
    };
  }, []);

  if (!activeExtension) {
    return (
      <div className="h-[calc(100vh-7rem)] flex items-center justify-center">
        <p className="text-gray-500">No extension selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{activeExtension.name}</h1>
          <p className="text-gray-500">Version {activeExtension.version}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Save}>Save</Button>
          <Button icon={Play}>Run Extension</Button>
        </div>
      </div>

      <div ref={containerRef} className="h-[calc(100vh-12rem)] flex">
        <div className="file-tree border-r">
          <FileTree />
        </div>
        <div className="editor-main">
          <CodeEditor />
        </div>
        <div className="config-panel border-l">
          <ConfigPanel />
        </div>
      </div>
    </div>
  );
};

export default Editor;