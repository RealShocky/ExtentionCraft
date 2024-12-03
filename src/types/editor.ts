export interface ExtensionFile {
  path: string;
  name: string;
  content: string;
  language: string;
}

export interface EditorSettings {
  theme: 'light' | 'dark';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
}