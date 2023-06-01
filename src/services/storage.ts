import {MMKVLoader} from 'react-native-mmkv-storage';

class StorageService {
  private storage;

  private _storageKeys = {
    lastTrackId: 'lastTrackId',
    favouritesList: 'favouritesList',
  };

  constructor() {
    this.storage = new MMKVLoader().initialize();
  }

  get storageKeys() {
    return this._storageKeys;
  }

  setInt = (name: string, value: number) => {
    return this.storage.setInt(name, value);
  };

  getInt = (name: string) => {
    return this.storage.getInt(name);
  };

  setArray = <T>(name: string, value: T[]) => {
    return this.storage.setArray(name, value);
  };

  getArray = <T>(name: string): T[] => {
    return this.storage.getArray(name);
  };

  clearAll = () => {
    return this.storage.clearStore();
  };
}

export const Storage = new StorageService();
