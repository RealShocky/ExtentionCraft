export interface Extension {
  id: string;
  name: string;
  description: string;
  version: string;
  type: ExtensionType;
  status: ExtensionStatus;
}

export enum ExtensionType {
  SYNTAX = 'syntax',
  DEBUGGER = 'debugger',
  THEME = 'theme',
  COMMAND = 'command',
}

export enum ExtensionStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  TESTING = 'testing',
  READY = 'ready',
  PUBLISHED = 'published',
}