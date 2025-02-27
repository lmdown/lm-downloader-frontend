<template>
  <div class="cat-nav-container ga-2">
    <div style="width: auto;" class="d-flex flex-row ga-2">
      <template :key="index+cat.name" v-for="(cat, index) in navCatsLargeList">
        <div :class="['nav-item', 'nav-item-large', getSelectedClass(index)]"
          @click="toggle(index)">
          {{ cat.id }}
          -
          {{ cat.name }}
        </div>
      </template>
    </div>

    <div class="d-flex flex-1 flex-wrap ga-2" style="overflow: hidden; height: 7rem;">
      <template :key="index+cat.name" v-for="(cat, index) in navCatsSmallList">
        <div :class="['nav-item', 'nav-item-small', getSelectedClass(largeNavItemCounts + index)]"
          @click="toggle(largeNavItemCounts + index)">
          {{ cat.id }}
          -
          {{ cat.name }}
        </div>
      </template>
    </div>

  </div>
</template>
<script lang="ts" setup>
import { UniversalAICategoryDTO } from '@/types/universal-app/UniversalAICategoryDTO';

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
  const result = navCatsSmallList.value = clonedNavCatsData.splice(largeNavItemCounts.value)
  return result
})

const updateNavData = () => {
  // const clonedNavCatsData = JSON.parse(JSON.stringify(props.navCatsData))
  // console.log('props.navCatsData', props.navCatsData)
  // console.log('clonedNavCatsData', clonedNavCatsData)
  // navCatsLargeList.value = clonedNavCatsData.splice(0, largeNavItemCounts.value)
  // navCatsSmallList.value = clonedNavCatsData
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
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid rgb(var(--v-theme-surface-light));
}

.cat-nav-container .nav-item:hover {
  border: 1px solid rgb(var(--v-theme-primary));
}

.cat-nav-container .nav-item.active {
  color: #FFF;
  background-color: rgb(var(--v-theme-primary));
}

.cat-nav-container .nav-item-large {
  background-color: rgb(var(--v-theme-surface-light));
  vertical-align: middle;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  height: 7rem;
  width: 8rem;
}

.cat-nav-container .nav-item-small {
  background-color: rgb(var(--v-theme-surface-light));
  text-align: center;
  vertical-align: middle;
  height: 2rem;
  width: 8rem;
}

</style>
