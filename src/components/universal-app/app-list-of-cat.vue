<template>
  <div class="cat-item-container" v-if="selectedCategory">
    <div class="cat-title mt-2 mx-2">
      <div class="main-title">
        {{ catetory.name }}
      </div>
      <div class="sub-cats" v-if="subCats">
        <!-- {{ navItem.name }} - {{ index }} -->
        <div :key="index+subCat.name" v-for="(subCat,index) in subCats"
          :class="['sub-cats-item', getSelectedClass(index)]"
          @click="toggleSubCat(subCat, index)">
          {{ subCat.name }}
        </div>
      </div>
    </div>
    <div class="app-list" >
      <div :key="app.name" v-for="(app, appIndex) in selectedCategory.apps"
        class="app-item">
        <div style="width: 2rem; height: 2rem;">
          <v-img src="./images/icons/about.png"
            width="2rem" height="2rem"></v-img>
        </div>

        <div style="flex: 1;" class="app-title-container">
          <div class="app-title">
            {{ app.name }}
          </div>
          <div class="app-short-desc" v-if="app.shortDesc">
            {{ app.shortDesc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { UniversalAIAppDTO } from '@/types/universal-app/UniversalAIAppDTO';
import { UniversalAICategoryDTO } from '@/types/universal-app/UniversalAICategoryDTO';

const props = defineProps<{
  catetory: UniversalAICategoryDTO
  // apps: UniversalAIAppDTO
}>()

const selectedCategory = ref<UniversalAICategoryDTO | null>(null)
const subCats = ref<UniversalAICategoryDTO[] | null | undefined>(null)
const subCatIndex = ref(0)

onMounted(() => {
  const mainCat = props.catetory
  subCats.value = mainCat?.subCats
  if(mainCat?.apps && mainCat?.apps.length>0) {
    selectedCategory.value = props.catetory
  } else if(subCats.value && subCats.value.length > 0) {
    selectedCategory.value = subCats.value[0]
  }
})

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
}

const updateSelectedCat = (subCat) => {
  selectedCategory.value = subCat
}

</script>
<style>
.cat-item-container .cat-title {
  display: flex;
}

.cat-item-container .cat-title .main-title {
  font-weight: bold;
  font-size: 1.4rem;
  width: auto;
}

.cat-item-container .cat-title .sub-cats {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 0.5rem;
}

.cat-item-container .app-list {
  display: flex;
}

.cat-item-container .sub-cats .sub-cats-item {
  /* width: 8rem; */
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid rgb(var(--v-theme-surface-light));
  align-items: center;
  text-align: center;
  line-height: 200%;
  /* border-color: rgb(var(--v-theme-primary)); */
}
.cat-item-container .sub-cats .sub-cats-item.active {
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
}

.cat-item-container .app-list .app-item {
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid rgb(var(--v-theme-surface-light));
  margin: 4px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14rem;
  gap: 0.5rem;
}

.cat-item-container .app-list .app-item .app-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.cat-item-container .app-list .app-item .app-short-desc {
  font-size: 1.rem;
}

</style>
