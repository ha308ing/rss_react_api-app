
export interface IAppState {
  status: null | 'loading' | 'error';
  searchInput: string;
  searchQuery: string;
}

type ChangeStateMethod<T, R = void> = (newValue: T) => R;

export interface IAppStateExtended extends IAppState {
  changeStatus: ChangeStateMethod<IAppState['status']>;
  changeSearchQuery: ChangeStateMethod<IAppState['searchQuery']>;
  changeSearchInput: ChangeStateMethod<IAppState['searchInput']>;
}
