import { 
  FileJson, 
  FileCode, 
  FileText,
  FileType,
  Package,
  Settings,
  LucideIcon 
} from 'lucide-react';

export const getFileIcon = (path: string): LucideIcon => {
  const extension = path.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'json':
      return FileJson;
    case 'ts':
    case 'tsx':
    case 'js':
    case 'jsx':
      return FileCode;
    case 'md':
      return FileText;
    case 'css':
    case 'scss':
      return FileType;
    default:
      return FileText;
  }
};

export const getSpecialFileIcon = (filename: string): LucideIcon => {
  switch (filename.toLowerCase()) {
    case 'package.json':
      return Package;
    case '.eslintrc':
    case '.prettierrc':
      return Settings;
    default:
      return getFileIcon(filename);
  }
};