<template>
  <v-navigation-drawer app width="240" class="lmd-bg-gray lmd-left-nav window-drag" permanent>
    <template v-slot:prepend>
      <div class="pt-10"></div>
      <!-- <v-text-field size="sm" >
      <template v-slot:prepend>
        <v-icon color="green">
          mdi-minus
        </v-icon>
      </template>
    </v-text-field> -->
    </template>

    <!-- <div class="d-flex flex-column pa-4 text-center mx-auto justify-center window-no-drag" style="height: 100%;" rounded="lg"> -->
    <div class="pa-4 text-center mx-auto">
      <v-list
        nav
        style="padding: 0px"
        class="d-flex flex-column ga-6"
        v-model:selected="selectedMenuIndexs"
        color="#FA6400"
        base-color="#424254"
      >
        <v-list-item
          v-for="(item, index) in LMD_MAIN_MENU"
          :key="index"
          active-class="nav-item-active"
          class="nav-item window-no-drag"
          v-slot="navChangeItem"
          draggable="false"
          variant="plain"
          rounded="lg"
          style="height: 118px; background-color: #fff"
          @click="onMenuClick(item)"
          :value="index"
        >
          <v-img
            class="mx-auto nav-item-icon"
            draggable="false"
            :src="getNavItemIcon(item, navChangeItem.isActive)"
            width="60"
            height="60"
          ></v-img>
          <div style="width: 192px">{{ $t(item.name) }}</div>
        </v-list-item>
      </v-list>
      <!-- <v-spacer class="window-drag" style="flex:1; margin-left: -15px; margin-right: -15px;"></v-spacer> -->
    </div>
    <template v-slot:append>
      <!-- d-flex -->
      <v-list class="mb-2 window-no-drag">
        <v-list-item>
          <template v-slot:prepend>
            <v-img src="./images/icons/about.png" width="24" height="24"></v-img>
          </template>
          <div class="lmd-left-bottom-link">
            <a href="#" @click="showAboutDialog">{{ $t('App.about') }}</a>
          </div>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-img src="./images/icons/help.png" width="24" height="24"></v-img>
          </template>
          <div class="lmd-left-bottom-link">
            <a href="#" @click="showHelpDialog">
              {{ $t('App.help') }}
              <v-tooltip activator="parent" location="right">
                {{ $t('App.UnderConstruction') }}
              </v-tooltip>
            </a>
          </div>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { LMD_MAIN_MENU, LMDMainMenuItem } from '@/app-config/menu'
import router from '@/router'
import AboutUtil from '@/util/AboutUtil'
import MainMenuUtil from '@/util/MainMenuUtil'

const selectedMenuIndexs = ref([0])

onMounted(() => {
  const name = router.currentRoute.value.name
  if(name) {
    const index = MainMenuUtil.getCurrentIndex(name.toString())
    selectedMenuIndexs.value = [index]
  }
})


const getNavItemIcon = (menuItem: LMDMainMenuItem, isSelected) => {
  let result
  if (isSelected) {
    result = menuItem.iconActive
  } else {
    result = menuItem.icon
  }
  return result
}

const onMenuClick = (item: LMDMainMenuItem) => {
  router.push({
    name: item.routerName,
  })
}

const showAboutDialog = (event) => {
  event.preventDefault()
  AboutUtil.info()
}

const showHelpDialog = (event) => {
  event.preventDefault()
}

router.afterEach((to, from) => {
  // console.log('afterEach ', to, from)
  const routerName = to.name
  if (routerName) {
    const index = MainMenuUtil.getCurrentIndex(String(routerName))
    selectedMenuIndexs.value = [index]
  }
})
</script>
<style scoped>
.lmd-bg-gray {
  background-color: #f3f3fa !important;
  /* padding-top: 50px; */
}
.lmd-left-bottom-link {
  color: rgba(0, 0, 0, 0.75);
  margin-left: 10px;
  font-size: 14px;
}

.lmd-left-bottom-link a {
  color: rgba(0, 0, 0, 0.75);
  text-decoration: none;
  text-decoration-line: none;
}

.lmd-left-bottom-link a:hover {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.lmd-left-bottom-link a:active {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.lmd-left-nav .v-list-item {
  min-height: 34px;
}

.lmd-left-nav .nav-item {
  /* background-color: #8a8eb1;
  opacity: 1; */
}

.nav-item-active {
  background-color: #fff;
  opacity: 1;
}
.lmd-left-nav .v-list-item .v-list-item--active .v-list-item__overlay {
  background-color: #fff;
  opacity: 1;
}
</style>
