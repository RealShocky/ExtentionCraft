import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Extension } from '../../types/extension';
import { getStatusStyle } from '../../utils/statusStyles';

interface ExtensionListProps {
  extensions: Extension[];
  limit?: number;
}

const ExtensionList: React.FC<ExtensionListProps> = ({ extensions, limit }) => {
  const navigate = useNavigate();
  const displayedExtensions = limit ? extensions.slice(0, limit) : extensions;

  const handleExtensionClick = (id: string) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="space-y-4">
      {displayedExtensions.map((extension) => (
        <div
          key={extension.id}
          onClick={() => handleExtensionClick(extension.id)}
          className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
        >
          <div>
            <h3 className="font-semibold">{extension.name}</h3>
            <p className="text-sm text-gray-500">{extension.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">v{extension.version}</span>
              <span className="text-xs text-gray-400">{extension.type}</span>
            </div>
          </div>
          <span
            className="px-3 py-1 rounded-full text-sm capitalize"
            style={getStatusStyle(extension.status)}
          >
            {extension.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExtensionList;