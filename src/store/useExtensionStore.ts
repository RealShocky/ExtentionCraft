import { create } from 'zustand';
import { Extension } from '../types/extension';

interface ExtensionStore {
  extensions: Extension[];
  activeExtension: Extension | null;
  setActiveExtension: (extension: Extension | null) => void;
  addExtension: (extension: Extension) => void;
  updateExtension: (id: string, extension: Partial<Extension>) => void;
}

export const useExtensionStore = create<ExtensionStore>((set) => ({
  extensions: [],
  activeExtension: null,
  setActiveExtension: (extension) => set({ activeExtension: extension }),
  addExtension: (extension) =>
    set((state) => ({ extensions: [...state.extensions, extension] })),
  updateExtension: (id, updatedExtension) =>
    set((state) => ({
      extensions: state.extensions.map((ext) =>
        ext.id === id ? { ...ext, ...updatedExtension } : ext
      ),
    })),
}));