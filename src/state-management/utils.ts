import {
  IComputedFactory,
  IObservableFactory,
  makeObservable,
  makeAutoObservable,
} from 'mobx';
export {
  observable as appObservable,
  computed as appComputed,
  action as appAction,
  toJS as appToJS,
} from 'mobx';
export {observer as appObserver, Observer as AppObserver} from 'mobx-react';

export const appMakeObservable = <T>(
  target: T,
  annotations: {[key: string]: IObservableFactory | IComputedFactory},
) => makeObservable<any>(target, annotations);

export const appMakeAutoObsevable = <T>(target: T) =>
  makeAutoObservable<any>(target);
