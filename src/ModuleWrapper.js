const nexus = global.NEXUS;
const React = nexus?.libraries.React;
const CacheProvider = nexus?.libraries.emotion.react.CacheProvider;
const createCache = nexus?.libraries.emotion.cache;
const ThemeController = nexus?.components.ThemeController;
const GlobalStyles = nexus?.components.GlobalStyles;

export default function ModuleWrapper({ initialized, theme, children }) {
  const [cache, setCache] = React.useState(null);
  React.useEffect(() => {
    if (nexus) {
      setCache(createCache({ container: document.head, key: 'emotion' }));
    }
  }, []);

  if (!nexus || !initialized || !cache) return null;

  return (
    <CacheProvider value={cache}>
      <ThemeController theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeController>
    </CacheProvider>
  );
}
