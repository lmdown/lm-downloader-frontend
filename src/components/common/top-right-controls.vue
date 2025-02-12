<template>
  <div class="lmd-top-right-controls ga-6 mr-12 window-no-drag">
    <!-- <a href="https://github.com" class="d-flex"
      target="_blank"
      style="align-items: center;">
      <v-img src="./images/icons/icon-github.png" :transition="false"
        width="36" height="36" class="github-icon mr-4"></v-img>
      Github &gt;
    </a> -->
    <GitInfoBtn></GitInfoBtn>
    <VDivider vertical style="opacity: 1;" color="#EBEBF7"></VDivider>
    <GlobalConfigBtn></GlobalConfigBtn>
    <v-btn class="hover-border" style="margin-left:-6px" width="38" height="38"
      icon="" @click="onLocaleBtnClick()">
        <v-img style="margin-left: 16px;" width="56" height="36" :transition="false"
          :src="localeIcon"></v-img>
    </v-btn>
  </div>
</template>
<style>

.lmd-top-right-controls {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #6F6F8C;
}
.hover-border {
  border: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.hover-border:hover {
  border-color: #FA6400
}

.lmd-top-right-controls a {
  font-size: 16px;
  color: #6F6F8C;
  text-decoration: none;
  text-decoration-line: none;
}

.lmd-top-right-controls a:hover {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.lmd-top-right-controls a:active {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

/* .lmd-top-right-controls .github-icon {
  margin-right: ;
} */
</style>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import {
  getBaseConfig,
  saveBaseConfig
} from '@/client-api/config-file';
import LMDBaseConfig from '@/types/config/LMDBaseConfig';
import LocaleUtil from '@/util/LocaleUtil';

import GlobalConfigBtn from '../common/global-config-btn.vue';
import GitInfoBtn from './git-info-btn.vue';

const { locale } = useI18n();

onMounted(async () => {
  let localeVal: string
  try {
    const config: LMDBaseConfig = await getBaseConfig()
    localeVal = config.LMD_LOCALE
  } catch (err) {
    localeVal = LocaleUtil.getDefaultLocale()
  }
  changeLocale(localeVal)
})

const onLocaleBtnClick = () => {
  if(locale.value === 'zhHans') {
    changeLocale('en')
  } else {
    changeLocale('zhHans')
  }
}

const changeLocale = async (localeVal: string) => {
  locale.value = localeVal
  const config: LMDBaseConfig = await getBaseConfig()
  config.LMD_LOCALE = locale.value
  await saveBaseConfig(config)
};

const localeIcon = computed((): string => {
  return LocaleUtil.getLocaleIcon(locale.value)
})

</script>
