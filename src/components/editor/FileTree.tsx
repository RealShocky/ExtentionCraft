import React from 'react';
import { Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';
import { getSpecialFileIcon } from '../../utils/fileIcons';
import { ExtensionFile } from '../../types/editor';

interface FileTreeItemProps {
  name: string;
  path: string;
  isFolder?: boolean;
  level?: number;
  isOpen?: boolean;
  onToggle?: () => void;
  onSelect?: () => void;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  name,
  path,
  isFolder = false,
  level = 0,
  isOpen = false,
  onToggle,
  onSelect,
}) => {
  const Icon = isFolder 
    ? isOpen ? FolderOpen : Folder
    : getSpecialFileIcon(name);

  const ChevronIcon = isOpen ? ChevronDown : ChevronRight;

  return (
    <div
      className={`
        flex items-center px-2 py-1 cursor-pointer text-sm
        hover:bg-gray-100 transition-colors
      `}
      style={{ paddingLeft: `${level * 12 + 8}px` }}
      onClick={isFolder ? onToggle : onSelect}
    >
      {isFolder && (
        <ChevronIcon className="w-4 h-4 text-gray-400 mr-1" />
      )}
      <Icon className="w-4 h-4 text-gray-500 mr-2" />
      <span className="truncate">{name}</span>
    </div>
  );
};

const FileTree: React.FC = () => {
  const { files, setCurrentFile } = useEditorStore();
  const [openFolders, setOpenFolders] = React.useState<Set<string>>(new Set(['src']));

  const toggleFolder = (path: string) => {
    setOpenFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const handleFileSelect = (file: ExtensionFile) => {
    setCurrentFile(file);
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-sm font-medium text-gray-700">Project Files</h2>
      </div>
      <div className="py-2">
        <FileTreeItem
          name="src"
          path="src"
          isFolder
          isOpen={openFolders.has('src')}
          onToggle={() => toggleFolder('src')}
        />
        {openFolders.has('src') && files.map((file) => (
          <FileTreeItem
            key={file.path}
            name={file.name}
            path={file.path}
            level={1}
            onSelect={() => handleFileSelect(file)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileTree;