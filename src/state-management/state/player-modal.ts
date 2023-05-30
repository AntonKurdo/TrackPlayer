import {appMakeAutoObsevable} from '../utils';

class PlayerModal {
  isOpen = false;

  constructor() {
    appMakeAutoObsevable(this);
  }

  openModel() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}

export default new PlayerModal();
