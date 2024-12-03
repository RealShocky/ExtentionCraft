import { ExtensionStatus } from '../types/extension';

export const getStatusStyle = (status: ExtensionStatus) => {
  switch (status) {
    case ExtensionStatus.PUBLISHED:
      return {
        backgroundColor: 'rgb(220 252 231)',
        color: 'rgb(22 163 74)',
      };
    case ExtensionStatus.TESTING:
      return {
        backgroundColor: 'rgb(254 249 195)',
        color: 'rgb(161 98 7)',
      };
    case ExtensionStatus.READY:
      return {
        backgroundColor: 'rgb(219 234 254)',
        color: 'rgb(29 78 216)',
      };
    default:
      return {
        backgroundColor: 'rgb(226 232 240)',
        color: 'rgb(71 85 105)',
      };
  }
};