export default {
  App: {
    title: '魔当 (LM Downloader)',
    subtitle: '大模型一键下载，随时启动',
    about: '关于魔当',
    help: '帮助中心',
    UnderConstruction: '帮助文档稍后提供',
  },
  AppMenu: {
    Home: '首页',
    MyLMs: '我的大模型',
    PopularLMs: '模型推荐',
    MyResources: '资源总览',
    FastDownloadHome: '极速下载',
    FastDownloadHomeSubtitle: '适合国内用户',
    MyInstalledApps: '我的AI',
    MyInstalledAppsSubtitle: '管理本机的AI应用',
    MyComputerResources: '我的设备',
    MyComputerResourcesSubtitle: '管理电脑硬件和资源',
  },
  Home: {
    SuggestedApps: '免费下载AI大模型App',
  },
  StoryPost: {
    RelatedApps: '相关App推荐',
  },
  MyLMS: {
    MainTitle: '我的大模型',
    Item: {
      MyResourceTitle: '安装统计',
    },
  },
  LMAppDetail: {
    goBack: '返回',
    share: '分享',
    version: '版本 ',
    installedVersion: '已安装版本 ',
    latestVersion: '最近版本 ',
    directory: '存储路径 ',
    appDirectory: 'App安装路径 ',
    releaseTime: '发布时间 ',
    licenseType: 'License ',
    isFree: '是否免费 ',
    isOpenSource: '是否开源 ',
    isFullOpenSource: '是否完全开源',
    sourceCodeRepo: 'Github ',
    installed: '已安装: ',
    installedAt: '安装时间: ',
    startApp: '启动',
    RunApp: '运行',
    install: '安装',
    notInstalled: '此App还未安装',
    refLink: '项目链接',
    refLinkHomePage: '首页',
    refLinkGithub: 'Github',
    refLinkOther: '其他',
    AppFeatures:"应用特点",
    AboutTheApp:"应用介绍",
    More: '更多',
    Close: '关闭',
    InstallRecord: '安装记录',
    AppInstalled: '此App已经安装',

  },
  StorageDialog: {
    title: ' 存储信息',
    application: ' 应用程序文件',
    model: ' 模型文件',
    installDir: ' 安装目录',
    UnderConstruction: '此功能即将发布',
    MissingFiles: '文件缺失。',
    FilesErrorTip: '无法找到App的文件，请确认文件是否存在。',
    FilesDeleteTip: '你可以删除这条记录，这个操作不会删除文件。',
    Delete: '删除记录',
    Cancel: '取消',
    DeleteFinished: '删除成功',
    Refresh: '刷新'
  },
  ConfigDialog: {
    globalConfigTitle: '全局设置',
    saveConfig: '保存',
    cancel: '取消',
    close: '关闭',
    DefaultStorageTitle: '数据存储配置',
    DefaultStorageSubtitle: '部分脚本、应用和模型文件，会存放于此。',
    DefaultStoragePathLabel: '存储根目录',
    DefaultStoragePathBrowse: '选择目录',
    UseDefaultValue: '恢复默认',

    HF_ENDPOINT_LABEL: 'HF_ENDPOINT (Hugging Face的镜像站，用于加速访问)',
    HF_ENDPOINT_TIP: '如果你无法正常访问 huggingface.co，可以试着填入 https://hf-mirror.com/',

    HFHOMEPathBrowse: '选择目录',
    HF_HOME_LABEL: 'HF_HOME (Hugging Face模型和缓存等文件的目录)',
    HF_HOME_TIP: '默认的模型目录会占用系统分区资源，您可以指定其他分区的目录，甚至是外接硬盘。建议使用固态硬盘，保证加载速度。',

    GITHUB_PROXY_LABEL: 'GITHUB_PROXY (Github的HTTP代理，用于加速访问)',
    GITHUB_PROXY_TIP: '如果你无法正常访问 github.com ，可以试着填入 https://gh.llkk.cc/',

    GlobalVariablesTitle: '全局环境变量',
    GlobalVariablesSubtitle: '如果不了解这些变量，请不要修改。',
    DirNotValid: '目录中存在不相关文件，请重新选择。',
    NoDefraultDirError: '未检测到默认存储目录，您可能需要更新软件。',
  },
  GitDialog: {
    DialogTitle: 'Git代码仓库',
    CardTitle: '欢迎贡献代码，和我们一起完善魔当(LM Downloader)。'
  },
  InstalledApps: {
    MainTitle: '我的AI',
    SubTitle: '已安装的AI应用',
    ImportOtherAIApp: '导入其他AI应用',
    UnderConstruction: '此功能即将发布',
    NoApp: '还未安装AI应用',
    InstalledByLMD: '使用魔当安装的',
    Imported: '手动导入的',
  },

  MyDevices: {
    MainTitle: '我的电脑和相关设备',
    UnderConstruction: '此功能正在开发中，即将发布。',
  },

  Common: {
    labelRunningApps: '正在运行的App',
    labelNoRunningApps: '暂无运行中的App',
    fieldRequired: '此处必填',
    close: '关闭',
    saveSuccess: '保存成功',
  },
  AppRunningWindow: {
    Version: "版本:",
    EnvVars: 'App 环境变量',
    Edit: '编辑',
    AppTerminal: 'App日志(终端)',
    Hide: '隐藏',
    Show: '显示',
    Access: '访问',
    Install: '安装',
    Reinstall: '重新安装',
    Update: '更新',
    Start: '启动',
    Stop: '停止',
    Restart: '重启',
    Settings: '设置',
    MainProcessTab: '主程序',
    ModelName: "模型名称",
    ParameterSize: '参数大小',
    StorageBtnTip: '所有模型文件大小',
    ModelDownload: '模型下载',
    ModelDownloadBtnLabel: "下载",
    ModelDeleteBtnLabel: "删除",
    ModelDownloaded: '已下载',
    ModelNotDownloaded: '未下载',
    InstallSuccess: '安装成功。',
    ModelDeleteSuccessful: '模型删除成功。',
    ModelDownloadSuccessful: '模型下载成功。',
  },
  AppSettingDialog: {
    Title: "设置",
    ModelsDirTip: `注意：
1. 指定的目录如果不存在，我们将尝试为您自动创建。
2. 如果想迁移原有模型目录，请手动迁移，再指定其新的位置，就能使用之前的模型。
3. 不要使用其他目录，以免损坏或丢失有用的文件。`,

    ModelsDirTipExtraMac: `
4. 在修改后，会重启Ollama，才能生效，若重启失败，请手动重启。`,
    ModelsDirTipExtraWindows: `
4. 在修改后，需要重新打开魔当和Ollama才能生效。`,

    ServerHostTip:`注意：
1. 如果清空此字段，或者用127.0.0.1，只能用当前电脑访问Ollama服务。
2. 如果您希望局域网其他电脑、手机等设备也能访问，请设置为0.0.0.0。`,

    ServerHostTipExtraMac: `
3. 在修改后，会重启Ollama，才能生效，若重启失败，请手动重启。`,
    ServerHostTipExtraWindows: `
3. 在修改后，需要重新打开魔当和Ollama才能生效。`,

    ModelsDirLabel: 'Ollama模型目录',
    AllowExternalAccessedLabel: '是否允许其他设备访问',
    ServerHostLabel: '服务地址',
    saveConfig: '保存',
    close: '取消',
    Browse: '选择目录',
    UseDefaultValue: '恢复默认',
    LocalAccess: '本地访问: ',
    RemoteAccess: '本地访问: ',
    OllamaModelsDirInfoIconTip: '默认的模型目录会占用系统分区资源，您可以指定其他分区的目录，甚至是外接硬盘。\n建议使用固态硬盘，保证加载速度。',
    ModelsDirDefaultHint: '未找到OLLAMA_MODELS环境变量，使用默认模型文件目录。',
    ModelsDirExistHint: '检测到OLLAMA_MODELS环境变量。',
    DataNotValid: '数据异常，无法保存。',
    ModelsDirNotValid: '目录中存在不相关文件，请重新选择。',
    HostNotValid: '请使用正确IP地址，或IP:PORT的格式。',
  },
  Api: {
    errors: {
      notFound: '数据不存在'
    }
  }
}
