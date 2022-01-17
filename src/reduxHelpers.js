const {
  utilities: {
    updateState,
    updateStorage,
    onceInitialize,
    onWalletDataUpdated,
  },
} = NEXUS;

export const INITIALIZE = '@@NWM/INITIALIZE';
export const UPDATE_WALLET_DATA = '@@NWM/UPDATE_WALLET_DATA';

const initialState = {
  initialized: false,
  theme: null,
  settings: null,
  coreInfo: null,
  userStatus: null,
  addressBook: null,
};

export function walletDataReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        initialized: true,
        theme: action.payload.theme,
        settings: action.payload.settings,
        coreInfo: action.payload.coreInfo,
        userStatus: action.payload.userStatus,
        addressBook: action.payload.addressBook,
      };
    case UPDATE_WALLET_DATA:
      return {
        ...state,
        ...action.payload,
        initialized: true,
      };
    default:
      return state;
  }
}

export function listenToWalletData(store) {
  onceInitialize((data) => {
    store.dispatch({
      type: INITIALIZE,
      payload: data,
    });
  });

  onWalletDataUpdated((updates) => {
    store.dispatch({
      type: UPDATE_WALLET_DATA,
      payload: updates,
    });
  });
}

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
