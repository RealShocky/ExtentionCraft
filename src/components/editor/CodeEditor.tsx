import React from 'react';
import Editor from '@monaco-editor/react';
import { useExtensionStore } from '../../store/useExtensionStore';
import { useEditorStore } from '../../store/useEditorStore';
import { FileTab } from './FileTab';
import { EditorToolbar } from './EditorToolbar';

const CodeEditor: React.FC = () => {
  const { activeExtension } = useExtensionStore();
  const { currentFile, setCurrentFile, files } = useEditorStore();

  const handleEditorChange = (value: string | undefined) => {
    if (!currentFile || !value) return;
    setCurrentFile({ ...currentFile, content: value });
  };

  if (!activeExtension) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select an extension to start editing</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar />
      <div className="flex items-center border-b bg-gray-50 px-2">
        {files.map((file) => (
          <FileTab
            key={file.path}
            file={file}
            isActive={currentFile?.path === file.path}
            onClick={() => setCurrentFile(file)}
          />
        ))}
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={currentFile?.content || ''}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;