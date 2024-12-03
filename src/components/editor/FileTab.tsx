import React from 'react';
import { X } from 'lucide-react';
import { ExtensionFile } from '../../types/editor';
import { getFileIcon } from '../../utils/fileIcons';

interface FileTabProps {
  file: ExtensionFile;
  isActive: boolean;
  onClick: () => void;
}

export const FileTab: React.FC<FileTabProps> = ({ file, isActive, onClick }) => {
  const Icon = getFileIcon(file.path);

  return (
    <button
      className={`
        flex items-center gap-2 px-3 py-2 text-sm
        ${isActive 
          ? 'bg-white border-t border-l border-r border-b-white -mb-px' 
          : 'text-gray-600 hover:bg-gray-100'}
      `}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span>{file.name}</span>
      {isActive && (
        <X 
          className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-600" 
          onClick={(e) => {
            e.stopPropagation();
            // Handle close tab
          }}
        />
      )}
    </button>
  );
};