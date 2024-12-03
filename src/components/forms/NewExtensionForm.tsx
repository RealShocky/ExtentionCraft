import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExtensionType } from '../../types/extension';
import { useExtensionStore } from '../../store/useExtensionStore';
import { createNewExtension, validateExtension } from '../../utils/extensionHelpers';
import Button from '../common/Button';
import { Code2, Palette, Bug, Terminal } from 'lucide-react';

const extensionTypes = [
  { type: ExtensionType.SYNTAX, icon: Code2, label: 'Syntax Highlighting' },
  { type: ExtensionType.THEME, icon: Palette, label: 'Theme' },
  { type: ExtensionType.DEBUGGER, icon: Bug, label: 'Debugger' },
  { type: ExtensionType.COMMAND, icon: Terminal, label: 'Command' },
];

const NewExtensionForm: React.FC = () => {
  const navigate = useNavigate();
  const addExtension = useExtensionStore((state) => state.addExtension);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '' as ExtensionType | '',
  });
  
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateExtension(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newExtension = createNewExtension(
      formData.name,
      formData.description,
      formData.type as ExtensionType
    );
    
    addExtension(newExtension);
    navigate(`/editor/${newExtension.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Extension Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="My Awesome Extension"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Describe your extension's functionality..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Extension Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {extensionTypes.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({ ...formData, type })}
              className={`p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                formData.type === type ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
        <Button type="submit">
          Create Extension
        </Button>
      </div>
    </form>
  );
};

export default NewExtensionForm;