import {MMKVLoader} from 'react-native-mmkv-storage';

class StorageService {
  private storage;

  private _storageNames = {
    lastTrackId: 'lastTrackId',
  };

  constructor() {
    this.storage = new MMKVLoader().initialize();
  }

  get storageNames() {
    return this._storageNames;
  }

  setInt = (name: string, value: number) => {
    return this.storage.setInt(name, value);
  };

  getInt = (name: string) => {
    return this.storage.getInt(name);
  };

  clearAll = () => {
    return this.storage.clearStore();
  };
}

export const Storage = new StorageService();
