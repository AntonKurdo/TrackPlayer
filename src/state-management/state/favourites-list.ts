import {appMakeAutoObsevable} from '../utils';

import {TrackType} from '../../data/types';
import {Storage} from '../../services/storage';

class FavouritesList {
  private _favourites: TrackType[] =
    Storage.getArray(Storage.storageKeys.favouritesList) ?? [];

  constructor() {
    appMakeAutoObsevable(this);
  }

  get list() {
    return this._favourites;
  }

  addTrackToFavourites(track: TrackType) {
    const updatedList = [...this._favourites, track];

    this._favourites = updatedList;

    Storage.setArray(Storage.storageKeys.favouritesList, updatedList);
  }

  removeTrackFromFavourites(id: TrackType['id']) {
    const updatedList = this._favourites.filter(track => track.id !== id);

    this._favourites = updatedList;

    Storage.setArray(Storage.storageKeys.favouritesList, updatedList);
  }

  updateList(list: TrackType[]) {
    this._favourites = list;

    Storage.setArray(Storage.storageKeys.favouritesList, list);
  }
}

export default new FavouritesList();
