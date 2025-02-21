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
    MyInstalledApps: 'My AI Apps',
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
    Reinstall: 'Reinstall',
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
    DefaultStorageTitle: 'Data Storage Configuration',
    DefaultStorageSubtitle:
      'Some scripts, Apps and Large Models are stored here.',
    DefaultStoragePathLabel: 'Storage Root Directory',
    DefaultStoragePathBrowse: 'Browse',
    UseDefaultValue: 'Restore',

    HF_ENDPOINT_LABEL: 'HF_ENDPOINT (The Hub base URL of Hugging Face)',
    HF_ENDPOINT_TIP: 'If you can\'t access huggingface.co properly, you can try setting this value to https://hf-mirror.com/',

    HFHOMEPathBrowse: 'Browse',
    HF_HOME_LABEL: 'HF_HOME (Model and Cache dir of Hugging Face)',
    HF_HOME_TIP: 'The default directory consumes system partition resources.\nYou can specify directories for other partitions, or even external hard drives.\nIt is recommended to use an SSD to ensure loading speed.',

    GITHUB_PROXY_LABEL: 'HF_ENDPOINT (HTTP Proxy for Github)',
    GITHUB_PROXY_TIP: 'If you can\'t access github.com properly, you can try setting this value to https://gh.llkk.cc/',

    GlobalVariablesTitle: 'Global Environment Variables',
    GlobalVariablesSubtitle: 'If you are not familiar with this, do not change.',
    DirNotValid: 'There are unrelated files in the directory, please select another one.',
    NoDefraultDirError: 'The default storage directory is not detected and you may need to update LM Downloader.',
  },
  GitDialog: {
    DialogTitle: 'Git Repository',
    CardTitle: 'You are welcome to contribute to project LM Downloader.'
  },

  InstalledApps: {
    MainTitle: 'My AI Apps',
    SubTitle: 'AI Apps installed on this device',
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
    Reinstall: 'Reinstall',
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
    ModelDeleteBtnLabel: "Delete",
    ModelDownloaded: 'Downloaded',
    ModelNotDownloaded: 'Not Downloaded',
    ModelStorageLabel: 'Model Storage',
    StorageUsage: 'Storage Usage',
    InstallSuccess: 'Installation successful.',
    ModelDeleteSuccessful: 'Model Delete Successful.',
    ModelDownloadSuccessful: 'Model Download Successful.',
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
