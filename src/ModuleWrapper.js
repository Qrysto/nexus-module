const CacheProvider = NEXUS?.libraries.emotion.react.CacheProvider;
const createCache = NEXUS?.libraries.emotion.cache.default;
const ThemeController = NEXUS?.components.ThemeController;
const GlobalStyles = NEXUS?.components.GlobalStyles;
const useEffect = NEXUS?.libraries.React.useEffect;
const useState = NEXUS?.libraries.React.useState;

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
