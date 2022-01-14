import webpackAliases from './webpackAliases';
import {
  reducer,
  listenToWalletData,
  INITIALIZE,
  UPDATE_WALLET_DATA,
  stateMiddleware,
  storageMiddleware,
} from './duck';
import packageJson from '../package.json';

const {
  walletVersion,
  components: {
    GlobalStyles,
    ThemeController,
    Icon,
    Panel,
    AutoSuggest,
    FieldSet,
    Switch,
    Modal,
    Tooltip,
    Select,
    TextField,
    FormField,
    Link,
    Arrow,
    Tab,
    Button,
    Dropdown,
  },
  utilities: {
    color,
    copyToClipboard,
    send,
    showNotification,
    showErrorDialog,
    showSuccessDialog,
    showInfoDialog,
    rpcCall,
    apiCall,
    secureApiCall,
    proxyRequest,
    confirm,
    updateState,
    updateStorage,
    onceInitialize,
    onWalletDataUpdated,
  },
} = NEXUS;

const browserslistQuery = packageJson.browserslist;

export {
  walletVersion,
  // Components
  GlobalStyles,
  ThemeController,
  Icon,
  Panel,
  AutoSuggest,
  FieldSet,
  Switch,
  Modal,
  Tooltip,
  Select,
  TextField,
  FormField,
  Link,
  Arrow,
  Tab,
  Button,
  Dropdown,
  // Utilities
  color,
  copyToClipboard,
  send,
  showNotification,
  showErrorDialog,
  showSuccessDialog,
  showInfoDialog,
  rpcCall,
  apiCall,
  secureApiCall,
  proxyRequest,
  confirm,
  updateState,
  updateStorage,
  onceInitialize,
  onWalletDataUpdated,
  // Helpers
  webpackAliases,
  browserslistQuery,
  reducer,
  listenToWalletData,
  INITIALIZE,
  UPDATE_WALLET_DATA,
  stateMiddleware,
  storageMiddleware,
};
