<template>
  <div class="cat-nav-container ga-2">
    <div style="width: auto;" class="d-flex flex-row ga-2">
      <template :key="index+getLocaleName(cat)" v-for="(cat, index) in navCatsLargeList">
        <div :class="['nav-item', 'nav-item-large', getSelectedClass(index)]"
          @click="toggle(index)">
          <span :class="['iconfont', getIconClass(cat.alias)]"></span>
          <div class="cat-name">
          {{ getLocaleName(cat) }}
          </div>
        </div>
      </template>
    </div>

    <!-- <span class="iconfont icon-a-bianzu15beifen17" style="font-size: 20px; color: #FF0000"></span> -->
    <div class="d-flex flex-1 flex-wrap ga-2" style="overflow: hidden; height: 88px;">
      <template :key="index+getLocaleName(cat)" v-for="(cat, index) in navCatsSmallList">
        <div :class="['nav-item', 'nav-item-small', getSelectedClass(largeNavItemCounts + index)]"
          @click="toggle(largeNavItemCounts + index)">
          <span :class="['iconfont', getIconClass(cat.alias)]"></span>
          {{ getLocaleName(cat) }}
        </div>
      </template>
    </div>

  </div>
</template>
<script lang="ts" setup>
import { UniversalAICategoryDTO } from '@/types/universal-app/UniversalAICategoryDTO';
import CatUtil from '@/util/universal-app/CatUtil';

// const selectedIndex = ref(0)

// const navCatsData = ref<UniversalAICategoryDTO[]>([])
// const navCatsLargeList = ref<UniversalAICategoryDTO[]>([])
// const navCatsSmallList = ref<UniversalAICategoryDTO[]>([])
const largeNavItemCounts = ref(4)

const emit = defineEmits([
  'update:modelValue'
])

const props = defineProps<{
  modelValue: number,
  navCatsData: UniversalAICategoryDTO[],
}>()

onMounted(() => {
  console.log('onMounted props.navCatsData', props.navCatsData)
  updateNavData()
})


watch(() => props.navCatsData, async () => {
  console.log('watch props.navCatsData', props.navCatsData)
  updateNavData()
})

const navCatsLargeList = computed(() => {
  const clonedNavCatsData = JSON.parse(JSON.stringify(props.navCatsData))
  const result = clonedNavCatsData.splice(0, largeNavItemCounts.value)
  return result
})

const navCatsSmallList = computed(() => {
  const clonedNavCatsData = JSON.parse(JSON.stringify(props.navCatsData))
  const result = clonedNavCatsData.splice(largeNavItemCounts.value)
  return result
})

const updateNavData = () => {
  // const clonedNavCatsData = JSON.parse(JSON.stringify(props.navCatsData))
  // console.log('props.navCatsData', props.navCatsData)
  // console.log('clonedNavCatsData', clonedNavCatsData)
  // navCatsLargeList.value = clonedNavCatsData.splice(0, largeNavItemCounts.value)
  // navCatsSmallList.value = clonedNavCatsData
}
const getLocaleName = (cat:UniversalAICategoryDTO) => {
  return CatUtil.getLocaleName(cat)
}

const getSelectedClass = (currentIndex: number) => {
  if( props.modelValue === currentIndex ) {
    return 'active'
  } else {
    return ''
  }
}

const toggle = (index) => {
  // selectedIndex.value = index
  emit('update:modelValue', index)
  console.log('toggle', index)
}

const getIconClass = (alias: string) => {
  // icon-bianzu15beifen17
    return `icon-${alias}`
}

</script>
<style>
.cat-nav-container {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  /* text-align: left; */
  justify-content: start;
}

.cat-nav-container .nav-item {
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid rgb(var(--v-theme-surface-light));
  line-height: 150%;
  color: rgba(43, 50, 61, 0.75);
  gap: 4px;
  background-color:#F3F3FA;
}

.cat-nav-container .nav-item-large .iconfont {
  font-size: 40px;
}
.cat-nav-container .nav-item-small .iconfont {
  font-size: 2rem;
}

.cat-nav-container .nav-item:hover {
  /* border: 1px solid rgb(var(--v-theme-primary)); */
  border: 1px solid rgba(250, 100, 0, .50);
  transition: all;
  transition-duration: .2s;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.09);
  background-color: #FFF;
}

.cat-nav-container .nav-item.active {
  color: #FFF;
  background-color: rgb(var(--v-theme-primary));
}

.cat-nav-container .nav-item-large {
  vertical-align: middle;
  text-align: center;
  display: flex;
  flex-direction: column;
  /* font-size: 1.2rem; */
  font-size: 14px;
  font-weight: bold;
  width: 116px;
  height: 88px;
}

.cat-nav-container .nav-item-large .cat-name {
  line-height: 100%;
  margin-top: 8px;

}

.cat-nav-container .nav-item-small {
  display: flex;
  text-align: center;
  vertical-align: middle;
  justify-content: center;
  height: 40px;
  width: 138px;
}

</style>
