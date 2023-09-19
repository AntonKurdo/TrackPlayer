import {MMKVLoader} from 'react-native-mmkv-storage';

interface IClient {
  setInt: (name: string, value: number) => boolean;
  getInt: (name: string) => number;
  setString: (name: string, value: string) => boolean;
  getString: (name: string) => string;
  setArray: <T>(name: string, value: T[]) => boolean;
  getArray: <T>(name: string) => T[];
  clearStore: () => boolean;
}
class StorageService {
  private client;

  private _storageKeys = {
    lastTrackId: 'lastTrackId',
    favouritesList: 'favouritesList',
    repeatMode: 'repeatMode',
    theme: 'theme',
  };

  constructor(client: MMKVStorageClient) {
    this.client = client;
  }

  get storageKeys() {
    return this._storageKeys;
  }

  setInt = (name: string, value: number) => {
    return this.client.setInt(name, value);
  };

  getInt = (name: string) => {
    return this.client.getInt(name);
  };

  setString = (name: string, value: string) => {
    return this.client.setString(name, value);
  };

  getString = (name: string) => {
    return this.client.getString(name);
  };

  setArray = <T>(name: string, value: T[]) => {
    return this.client.setArray(name, value);
  };

  getArray = <T>(name: string): T[] => {
    return this.client.getArray(name);
  };

  clearStore = () => {
    return this.client.clearStore();
  };
}

class MMKVStorageClient implements IClient {
  private storage;

  constructor() {
    this.storage = new MMKVLoader().initialize();
  }

  setInt = (name: string, value: number) => {
    return this.storage.setInt(name, value);
  };

  getInt = (name: string) => {
    return this.storage.getInt(name);
  };

  setString = (name: string, value: string) => {
    return this.storage.setString(name, value);
  };

  getString = (name: string) => {
    return this.storage.getString(name);
  };

  setArray = <T>(name: string, value: T[]) => {
    return this.storage.setArray(name, value);
  };

  getArray = <T>(name: string): T[] => {
    return this.storage.getArray(name);
  };

  clearStore = () => {
    return this.storage.clearStore();
  };
}

export const Storage = new StorageService(new MMKVStorageClient());
