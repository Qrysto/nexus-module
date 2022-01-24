const CacheProvider = NEXUS?.libraries.emotion.react;
const ThemeController = NEXUS?.components.ThemeController;
const GlobalStyles = NEXUS?.components.GlobalStyles;
const { useEffect, useState } = NEXUS?.libraries.React;

export default function ModuleWrapper({ initialized, theme, children }) {
  const [cache, setCache] = useState(null);
  useEffect(() => {
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
