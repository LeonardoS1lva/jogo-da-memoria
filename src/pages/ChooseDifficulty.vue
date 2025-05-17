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
      <h1 class="non-selectable q-pb-md no-margin menu-title" style="color: #00ff00">
        Escolha a Dificuldade
      </h1>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-btn
            label="Fácil"
            no-caps
            color="primary"
            size="md"
            style="border-radius: 8px"
            class="full-width"
            @click="selectDifficulty('easy')"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-btn
            label="Médio"
            no-caps
            color="primary"
            size="md"
            style="border-radius: 8px"
            class="full-width"
            @click="selectDifficulty('medium')"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-btn
            label="Difícil"
            no-caps
            color="primary"
            size="md"
            style="border-radius: 8px"
            class="full-width"
            @click="selectDifficulty('hard')"
          />
        </div>
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

@media (max-width: 600px) {
  .menu-title {
    font-size: 1.9rem;
  }
}

@media (max-width: 400px) {
  .menu-title {
    font-size: 1.5rem;
  }
}
</style>
