import { Extension, ExtensionType, ExtensionStatus } from '../types/extension';

export const createNewExtension = (
  name: string,
  description: string,
  type: ExtensionType
): Extension => {
  return {
    id: crypto.randomUUID(),
    name,
    description,
    version: '0.1.0',
    type,
    status: ExtensionStatus.DRAFT,
  };
};

export const validateExtension = (extension: Partial<Extension>): string[] => {
  const errors: string[] = [];

  if (!extension.name?.trim()) {
    errors.push('Extension name is required');
  }

  if (!extension.description?.trim()) {
    errors.push('Description is required');
  }

  if (!extension.type) {
    errors.push('Extension type must be selected');
  }

  if (extension.version && !/^\d+\.\d+\.\d+$/.test(extension.version)) {
    errors.push('Version must follow semantic versioning (e.g., 1.0.0)');
  }

  return errors;
};