const {
  libraries: { ReactDOM },
} = NEXUS;

const { createRoot, hydrateRoot } = ReactDOM.client;

export { createRoot, hydrateRoot };

export default ReactDOM.client.default;
