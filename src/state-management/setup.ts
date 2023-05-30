import {configure} from 'mobx';

export const initializeStateManagement = () => {
  configure({
    enforceActions: 'never',
    useProxies: 'never',
  });
};
