import React from 'react';
import { Settings, Package, Globe, Box } from 'lucide-react';
import { useExtensionStore } from '../../store/useExtensionStore';
import { ExtensionType } from '../../types/extension';
import Button from '../common/Button';

const ConfigPanel: React.FC = () => {
  const { activeExtension, updateExtension } = useExtensionStore();

  if (!activeExtension) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select an extension to view settings</p>
      </div>
    );
  }

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateExtension(activeExtension.id, { version: e.target.value });
  };

  return (
    <div className="h-full bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuration
        </h2>
      </div>

      <div className="p-4 space-y-6">
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Extension Details
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={activeExtension.name}
                onChange={(e) => updateExtension(activeExtension.id, { name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Version
              </label>
              <input
                type="text"
                value={activeExtension.version}
                onChange={handleVersionChange}
                placeholder="0.1.0"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Type
              </label>
              <select
                value={activeExtension.type}
                onChange={(e) => updateExtension(activeExtension.id, { 
                  type: e.target.value as ExtensionType 
                })}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                {Object.values(ExtensionType).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Marketplace
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                value={activeExtension.description}
                onChange={(e) => updateExtension(activeExtension.id, { 
                  description: e.target.value 
                })}
                rows={3}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Box className="w-4 h-4" />
            Build Settings
          </h3>
          
          <div className="space-y-3">
            <Button variant="outline" size="sm" className="w-full">
              Configure Build Options
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConfigPanel;