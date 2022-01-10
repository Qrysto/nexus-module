const {
  utilities: { updateState, updateStorage },
} = NEXUS;

export const INITIALIZE = '@@NWM/INITIALIZE';
export const UPDATE_CORE_INFO = '@@NWM/UPDATE_CORE_INFO';
export const UPDATE_THEME = '@@NWM/UPDATE_THEME';

export function stateMiddleware(getPersistedState) {
  return (store) => (next) => (action) => {
    const oldData = getPersistedState(store.getState());
    const result = next(action);
    const data = getPersistedState(store.getState());
    if (data !== oldData) {
      updateState(data);
    }
    return result;
  };
}

export function storageMiddleware(getStoredData) {
  return (store) => (next) => (action) => {
    const oldData = getStoredData(store.getState());
    const result = next(action);
    const data = getStoredData(store.getState());
    if (data !== oldData) {
      updateStorage(data);
    }
    return result;
  };
}

export const initialize = (data) => ({
  type: INITIALIZE,
  payload: data,
});

export const updateCoreInfo = (coreInfo) => ({
  type: UPDATE_CORE_INFO,
  payload: coreInfo,
});

export const updateTheme = (theme) => ({
  type: UPDATE_THEME,
  payload: theme,
});

const initialState = {
  initialized: false,
  coreInfo: null,
  theme: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        initialized: true,
        coreInfo: action.payload.coreInfo,
        theme: action.payload.theme,
      };
    case UPDATE_CORE_INFO:
      return {
        ...state,
        coreInfo: action.payload.coreInfo,
      };
    case UPDATE_THEME:
      return {
        ...state,
        initialized: true,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
}

export const initialize = (data) => ({
  type: TYPE.INITIALIZE,
  payload: data,
});

export const updateCoreInfo = (coreInfo) => ({
  type: TYPE.UPDATE_CORE_INFO,
  payload: coreInfo,
});

export const updateTheme = (theme) => ({
  type: TYPE.UPDATE_THEME,
  payload: theme,
});

const defaultGetWalletState = (state) => state.nexus;

export const selectInitialized = (
  state,
  getWalletState = defaultGetWalletState
) => getWalletState(state).initialized;

export const selectCoreInfo = (state, getWalletState = defaultGetWalletState) =>
  getWalletState(state).coreInfo;

export const selectTheme = (state, getWalletState = defaultGetWalletState) =>
  getWalletState(state).theme;
