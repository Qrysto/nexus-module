const {
  utilities: { updateState, updateStorage },
} = NEXUS;

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
