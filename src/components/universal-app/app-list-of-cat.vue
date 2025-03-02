<template>
  <div class="cat-item-container" ref="catItemContainerRef">
    <div class="cat-title mb-4">
      <div class="main-title">
        {{ getLocaleName(catetory) }}
      </div>
      <!-- <div class="sub-cats" v-if="subCats"> -->
      <v-slide-group show-arrows class="sub-cats" v-if="subCats">
        <div :key="index+subCat.name_en" v-for="(subCat,index) in subCats"
          :class="['sub-cats-item', getSelectedClass(index)]"
          @click="toggleSubCat(subCat, index)">
          {{ getLocaleName(subCat) }}
        </div>
      </v-slide-group>
      <!-- </div> -->
    </div>
    <v-row class="app-list gap-2 mb-2" >
      <v-col :key="app.name"
        cols="12" xs="12" sm="6" md="4" lg="3"  xl="2"
        v-for="(app, appIndex) in selectedCategory?.apps">
        <SingleAppItem :app-data="app"></SingleAppItem>
        <!-- <div class="app-item">
          <div style="width: 40px; height: 40px; display: block;">
            <v-img width="40" height="40" :src="app.icon"></v-img>
          </div>

          <div class="app-title-container">
            <div class="app-title">
              {{ app.name }}
            </div>
            <div class="app-short-desc" v-if="getShortDesc(app)">
              {{ getShortDesc(app) }}
              <v-tooltip
               activator="parent" location="bottom" transition="false">
                {{ getShortDesc(app) }}
              </v-tooltip>
            </div>
          </div>
        </div> -->
      </v-col>

      <v-col v-if="allApps.length > 17"
        cols="12" xs="12" sm="6" md="4" lg="3"  xl="2">
        <div style="height: 72px; display: flex; align-items: center; justify-content: center;">
          <a href="#" @click.prevent="showMoreApps()">
          {{ $t('UniversalApps.MoreApps') }} &gt;
          </a>
        </div>

      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
// import { UniversalAIAppDTO } from '@/types/universal-app/UniversalAIAppDTO';
import { getUAppsByCatId } from '@/api/universal-app';
import { UniversalAIAppDTO } from '@/types/universal-app/UniversalAIAppDTO';
import { UniversalAICategoryDTO } from '@/types/universal-app/UniversalAICategoryDTO';
import CatUtil from '@/util/universal-app/CatUtil';
// import UAppUtil from '@/util/universal-app/UAppUtil';
import SingleAppItem from './single-app-item.vue';

const props = defineProps<{
  catetory: UniversalAICategoryDTO,
  isAppListHomepage: boolean
  // apps: UniversalAIAppDTO
}>()

const loading = ref(false); // 加载状态

const selectedCategory = ref<UniversalAICategoryDTO | null>(null)
const subCats = ref<UniversalAICategoryDTO[] | null | undefined>(null)
const subCatIndex = ref(0)
const allApps = ref<UniversalAIAppDTO[]>([])

onMounted(() => {
  const mainCat = props.catetory
  subCats.value = mainCat?.subCats
  if(subCats.value && subCats.value.length > 0) {
    selectedCategory.value = subCats.value[0]
  } else {
    selectedCategory.value = props.catetory
  }
  initIntersectionObserver()
})
onUnmounted(() => {
  if (observer) {
    observer.value?.disconnect();
  }
});

const catItemContainerRef = ref(null);
const observer = ref<IntersectionObserver|null>(null);

const initIntersectionObserver = () => {
  if (!catItemContainerRef.value) return;

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchAppData();
        observer.value?.unobserve(entry.target);
      }
    });
  });

  observer.value.observe(catItemContainerRef.value);
};

const fetchAppData = async () => {
  if(selectedCategory.value && selectedCategory.value.id) {
    loading.value = true
    const catId: string = selectedCategory.value.id
    allApps.value = await getUAppsByCatId(catId)
    let apps = allApps.value
    // show limited apps for home page
    if(props.isAppListHomepage) {
      apps = allApps.value.slice(0,17)
    }
    selectedCategory.value.apps = apps
    loading.value = false
    // console.log('got AppData list')
  } else {
    // console.log('no catid')
  }
}

const getLocaleName = (cat:UniversalAICategoryDTO) => {
  return CatUtil.getLocaleName(cat)
}

// const getShortDesc = (app: UniversalAIAppDTO) => {
//   return UAppUtil.getLocaleDesc(app)
// }

const getSelectedClass = (currentIndex: number) => {
  if( subCatIndex.value === currentIndex ) {
    return 'active'
  } else {
    return ''
  }
}

const toggleSubCat = (subCat, index) => {
  subCatIndex.value = index
  updateSelectedCat(subCat)
  fetchAppData()
}

const updateSelectedCat = (subCat) => {
  selectedCategory.value = subCat
}

const showMoreApps = () => {

}

</script>
<style>
.cat-item-container .cat-title {
  display: flex;
  /* line-height: 100%; */
}

.cat-item-container .cat-title .main-title {
  font-weight: bold;
  font-size: 1.4rem;
  width: auto;
  padding-left: 20px;
  position: relative;
}

.cat-item-container .cat-title .main-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 4px;
  background-color: #FB6900;
  border-radius: 2px;
}

.cat-item-container .cat-title .sub-cats {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 0.5rem;
}
.cat-item-container .cat-title .sub-cats  .v-slide-group__content {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 0.5rem;
}

.cat-item-container .app-list {
  display: flex;
  min-height: 200px;
  flex-direction: row;
  flex-wrap: wrap;
  /* gap: 16px; */
}

.cat-item-container .sub-cats .sub-cats-item {
  /* width: 8rem; */
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid rgb(var(--v-theme-surface-light));
  /* border: 1px solid #EBEBF7; */
  color: rgba(43, 50, 61, 0.75);
  align-items: center;
  text-align: center;
  line-height: 200%;
  white-space: nowrap;
  /* text-overflow:ellipsis; */
  /* border-color: rgb(var(--v-theme-primary)); */
}
.cat-item-container .sub-cats .sub-cats-item.active {
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
  background-color: #FFEDE1;
  border: 1px solid #FFEDE1;
  font-weight: bold;
  /* transition: all;
  transition-duration: 0.2s; */
}


</style>
