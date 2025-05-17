<script setup>
import { useRouter } from 'vue-router'
import { useAudioStore } from 'src/stores/audioStore'
import { useAudioVisibility } from 'src/composable/useAudioVisibility'

const router = useRouter()
const audioStore = useAudioStore()

const selectDifficulty = (difficulty) => {
  audioStore.playClickSound()
  router.push({ name: 'Game', params: { difficulty } })
}

useAudioVisibility()
</script>

<template>
  <q-page class="flex flex-center background-animation">
    <q-card class="level-card q-pa-lg text-center shadow-15" style="background: rgba(0, 0, 0, 0.8)">
      <h1 class="title-shadow non-selectable q-pb-md no-margin menu-title" style="color: #00ff00">
        Escolha a Dificuldade
      </h1>
      <div class="q-gutter-md">
        <q-btn
          label="Fácil"
          no-caps
          color="primary"
          size="md"
          style="border-radius: 8px"
          @click="selectDifficulty('easy')"
        />
        <q-btn
          label="Médio"
          no-caps
          color="primary"
          size="md"
          style="border-radius: 8px"
          @click="selectDifficulty('medium')"
        />
        <q-btn
          label="Difícil"
          no-caps
          color="primary"
          size="md"
          style="border-radius: 8px"
          @click="selectDifficulty('hard')"
        />
      </div>
    </q-card>
  </q-page>
</template>

<style scoped>
.level-card {
  width: 90%;
  max-width: 600px;
  border-radius: 20px;
}

.menu-title {
  font-size: 2.5rem;
}
</style>
