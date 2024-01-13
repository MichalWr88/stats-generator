import { connections, ConnectionStates } from 'mongoose';

export const checkMongoConnected = (): boolean => {
  if (connections[0].readyState !== ConnectionStates.connected) {
    return false;
  }
  return true;
};
