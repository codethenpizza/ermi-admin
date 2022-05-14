
export enum LoadingState {
  PENDING = 'pending',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed'
}

export type SliceLoadingState = {
  loadingState: LoadingState
}
