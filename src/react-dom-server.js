const {
  libraries: { ReactDOM },
} = NEXUS;

const {
  renderToNodeStream,
  renderToReadableStream,
  renderToStaticMarkup,
  renderToStaticNodeStream,
  renderToString,
  version,
} = ReactDOM.server;

export {
  renderToNodeStream,
  renderToReadableStream,
  renderToStaticMarkup,
  renderToStaticNodeStream,
  renderToString,
  version,
};

export default ReactDOM.server.default;
