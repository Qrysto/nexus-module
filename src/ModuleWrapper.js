const React = NEXUS?.libraries.React;
const CacheProvider = NEXUS?.libraries.emotion.react.CacheProvider;
const createCache = NEXUS?.libraries.emotion.cache.default;
const ThemeController = NEXUS?.components.ThemeController;
const GlobalStyles = NEXUS?.components.GlobalStyles;

export default function ModuleWrapper({ initialized, theme, children }) {
  const [cache, setCache] = React.useState(null);
  React.useEffect(() => {
    if (NEXUS) {
      setCache(createCache({ container: document.head, key: 'emotion' }));
    }
  }, []);

  if (!NEXUS || !initialized || !cache) return null;

  return (
    <CacheProvider value={cache}>
      <ThemeController theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeController>
    </CacheProvider>
  );
}
