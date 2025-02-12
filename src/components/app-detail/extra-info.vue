<template>
   <v-sheet class="mx-3 extra-info mt-3 mb-2">
    <template v-if="lmAppData.refLinks && lmAppData.refLinks.length > 0">
      <p v-for="(refLink, index) in lmAppData.refLinks" :key="index">
        <span class="text-medium-emphasis mr-2">
          {{ getRefLinkLabel(refLink) }}</span>
        <a :href="refLink.url" target="_blank">
          {{refLink.url}}
        </a>
      </p>
    </template>
    <p v-if="lmAppData?.newVersion">
      <span class="text-medium-emphasis mr-2">{{ $t('LMAppDetail.newVersion') }}</span>
      {{ lmAppData.newVersion }}
    </p>
    <p v-if="lmAppData?.releaseTime">
      <span class="text-medium-emphasis mr-2">{{ $t('LMAppDetail.releaseTime') }}</span>
      {{ lmAppData.releaseTime }}
    </p>
    <p v-if="lmAppData?.licenseInfo?.licenseType">
      <span class="text-medium-emphasis mr-2">{{ $t('LMAppDetail.licenseType') }}</span>
      {{ lmAppData?.licenseInfo?.licenseType }}
    </p>

    <p v-if="lmAppData?.licenseInfo?.isOpenSource">
      <span class="text-medium-emphasis mr-2">{{ $t('LMAppDetail.isOpenSource') }}</span>
      {{ lmAppData?.licenseInfo?.isOpenSource }}
    </p>

    <p v-if="lmAppData?.licenseInfo?.isFullOpenSource">
      <span class="text-medium-emphasis mr-2">{{ $t('LMAppDetail.isFullOpenSource') }}</span>
      {{ lmAppData?.licenseInfo?.isFullOpenSource }}
    </p>

    <p v-if="lmAppData?.licenseInfo?.isFree">
      <span class="text-medium-emphasis mr-2">{{ $t('LMAppDetail.isFree') }}</span>
      {{ lmAppData?.licenseInfo?.isFree }}
    </p>

    <p v-if="lmAppData?.licenseInfo?.sourceCodeRepo">
      <span class="text-medium-emphasis mr-2">{{ $t('LMAppDetail.sourceCodeRepo') }}</span>
      {{ lmAppData?.licenseInfo?.sourceCodeRepo }}
    </p>
   </v-sheet>
</template>
<style>
.extra-info {
  font-size: 0.9rem;
}
</style>
<script setup lang="ts">
import { AIAppDTO, AppRefLinkDTO } from '@/types/AIAppDTO';
import { useLocale } from 'vuetify';

const { t } = useLocale()

defineProps<{
  lmAppData: AIAppDTO
}>()

const getRefLinkLabel = (refLink: AppRefLinkDTO): string => {
  let label =  t('LMAppDetail.refLinkOther')
  // homepage, github, other
  if (refLink.type === 'homepage') {
    label = t('LMAppDetail.refLinkHomePage')
  } else if(refLink.type === 'github') {
    label = t('LMAppDetail.refLinkGithub')
  }
  return label
}


</script>
