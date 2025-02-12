export default {
  App: {
    title: 'LM Downloader',
    subtitle: 'One-click download, ready to start',
    about: 'About LM Downloader',
    help: 'Help Center',
    UnderConstruction: 'Docs will be provided later.',
  },
  AppMenu: {
    Home: 'Home',
    MyLMs: 'My Models',
    PopularLMs: 'Popular Models',
    MyResources: 'System Stat',
    FastDownloadHome: 'Fast Download Apps',
    FastDownloadHomeSubtitle: 'Optimized download process',
    MyInstalledApps: 'Installed AI apps',
    MyInstalledAppsSubtitle: 'Manage installed Apps',
    MyComputerResources: 'My Device Stat',
    MyComputerResourcesSubtitle: "View your Computer's resources",
  },
  Home: {
    SuggestedApps: 'Free AI App Downloads',
  },
  StoryPost: {
    RelatedApps: 'Related Apps',
  },
  MyLMS: {
    MainTitle: 'My Large Models',
    Item: {
      MyResourceTitle: 'Installed models',
    },
  },
  LMAppDetail: {
    goBack: 'Back',
    share: 'Share',
    version: 'Version: ',
    installedVersion: 'installed Version: ',
    directory: 'Storage Directory',
    appDirectory: 'App Directory',
    latestVersion: 'Latest Version: ',
    releaseTime: 'Release Time: ',

    licenseType: 'License: ',
    isFree: 'Free: ',
    isOpenSource: 'Open Source: ',
    isFullOpenSource: 'Completely Source: ',
    sourceCodeRepo: 'Github: ',

    installed: 'Installed: ',
    installedAt: 'Installed Time',
    startApp: 'Start',
    RunApp: 'Run',
    install: 'Install',
    notInstalled: 'The App is not yet installed.',
    refLink: 'Link',
    refLinkHomePage: 'HomePage:',
    refLinkGithub: 'Github:',
    refLinkOther: 'Other Ref:',
    AppFeatures:"App features",
    AboutTheApp:"About this app",
    More: 'More',
    Close: 'Close',
    InstallRecord: 'Install History',
    AppInstalled: 'The app has been installed',
  },

  StorageDialog: {
    title: ' Storage',
    application: ' Executable File',
    model: ' Model File',
    installDir: 'Directory',
    UnderConstruction: 'This feature will be available in the next release.',
    MissingFiles: 'Missing files.',
    FilesErrorTip: 'The app\'s files cannot be found, please make sure they exist.',
    FilesDeleteTip: 'You can delete this record. this action will not delete the file.',
    Delete: 'Delete Record',
    Cancel: 'Cancel',
    DeleteFinished: 'Deletion successful',
    Refresh: 'Refresh'
  },
  ConfigDialog: {
    globalConfigTitle: 'Global Config',
    saveConfig: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    DefaultStorageTitle: 'Default Storage Configuration',
    DefaultStorageSubtitle:
      'Apps and Large Models are stored here by default. Each App can also choose a different path.',
    DefaultStoragePathLabel: 'Default Storage Path',
    DefaultStoragePathBrowse: 'Browse',

    GlobalVariablesTitle: 'Global Environment Variables',
    GlobalVariablesSubtitle:
      'The variables of each App will override these. If you are not familiar with this, do not change.',
  },
  GitDialog: {
    DialogTitle: 'Git Repository',
    CardTitle: 'You are welcome to contribute to project LM Downloader.'
  },

  InstalledApps: {
    MainTitle: 'Installed AI Apps',
    ImportOtherAIApp: 'Import App',
    UnderConstruction: 'This feature will be available in the next release.',
    NoApp: 'No App has been installed.',
    InstalledByLMD: 'Installed by LM Downloader',
    Imported: 'Imported by yourself',
  },

  MyDevices: {
    MainTitle: 'My Computer and Related Devices',
    UnderConstruction: 'This feature will be available in the next release.',
  },

  Common: {
    labelRunningApps: 'Running Apps: ',
    labelNoRunningApps: 'No Running Apps.',
    fieldRequired: 'Field is required',
    close: 'Close',
    saveSuccess: 'Saved',
  },
  AppRunningWindow: {
    Version: "Version:",
    EnvVars: 'App ENV',
    Edit: 'Edit',
    AppTerminal: 'App Logs (Terminal)',
    Hide: 'Hide',
    Show: 'Show',
    Access: 'Access',
    Install: 'Install',
    Update: 'Update',
    Start: 'Start',
    Stop: 'Stop',
    Restart: 'Restart',
    Settings: 'Settings',
    MainProcessTab: 'Main Process',
    ModelName: 'Model Name',
    ParameterSize: 'Parameter Size',
    StorageBtnTip: 'The size of all model files',
    ModelDownload: 'Model Download',
    ModelDownloadBtnLabel: "Download",
    ModelDownloaded: 'Downloaded',
    ModelNotDownloaded: 'Not Downloaded',
  },
  AppSettingDialog: {
    Title: "Settings for ",
    ModelsDirTip: `Important:
1. If the specified directory doesn't exist, we'll try to create it automatically for you.
2. If you want to migrate the original model directory, please manually migrate it, and then specify the new location to use the previous files.
3. Do not use other directories to avoid damage or loss of useful files.`,

    ModelsDirTipExtraMac:`
4. After the modification, Ollama will be restarted for it to take effect, if the restart fails, please restart it manually.`,
    ModelsDirTipExtraWindows:`
4. LM Downloader and Ollama need to be restart for it to take effect.`,

    ServerHostTip:`Important
1. If this field is cleared, or use 127.0.0.1, you can only use this computer to access the service
2. If you want the LAN to be accessible to other computers, mobile phones, and other devices, please use 0.0.0.0`,
    ServerHostTipExtraMac:`
3. After the modification, Ollama will be restarted for it to take effect, if the restart fails, please restart it manually.`,
    ServerHostTipExtraWindows:`
3. LM Downloader and Ollama need to be restart for it to take effect.`,

    ModelsDirLabel: 'Ollama Models Directory',
    ServerHostLabel: 'Server Host',
    saveConfig: 'Save',
    close: 'Close',
    Browse: 'Browse',
    UseDefaultValue: 'Restore',
    LocalAccess: 'Local Access: ',
    RemoteAccess: 'Remote Access: ',
    OllamaModelsDirInfoIconTip: 'The default model directory consumes system partition resources.\nYou can specify directories for other partitions, or even external hard drives.\nIt is recommended to use an SSD to ensure loading speed.',
    ModelsDirDefaultHint: 'OLLAMA_MODELS not found, default model files directory used.',
    ModelsDirExistHint: 'OLLAMA_MODELS was detected',
    DataNotValid: 'The data is abnormal and cannot be saved.',
    ModelsDirNotValid: 'There are unrelated files in the directory, please select them again.',
    HostNotValid: 'Invalid IP address or IP:Port format.',
  },
  Api: {
    errors: {
      notFound: 'Not Found'
    }
  }
}
