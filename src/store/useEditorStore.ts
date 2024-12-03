import { create } from 'zustand';
import { ExtensionFile } from '../types/editor';

interface EditorStore {
  files: ExtensionFile[];
  currentFile: ExtensionFile | null;
  setCurrentFile: (file: ExtensionFile) => void;
  addFile: (file: ExtensionFile) => void;
  removeFile: (path: string) => void;
  saveCurrentFile: () => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  files: [],
  currentFile: null,
  setCurrentFile: (file) => set({ currentFile: file }),
  addFile: (file) => set((state) => ({ 
    files: [...state.files, file],
    currentFile: state.currentFile || file,
  })),
  removeFile: (path) => set((state) => ({
    files: state.files.filter((f) => f.path !== path),
    currentFile: state.currentFile?.path === path 
      ? state.files[0] || null 
      : state.currentFile,
  })),
  saveCurrentFile: () => {
    const { currentFile } = get();
    if (!currentFile) return;
    // Implement save logic here
    console.log('Saving file:', currentFile.path);
  },
}));