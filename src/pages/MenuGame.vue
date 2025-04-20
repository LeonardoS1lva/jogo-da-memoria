<script setup>
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { useAudioStore } from 'src/stores/audioStore'

const router = useRouter()
const audioStore = useAudioStore()
const showSettings = ref(false)

const clickAndToggleSettings = () => {
  audioStore.playClickSound()
  showSettings.value = !showSettings.value
}

const startGame = () => {
  audioStore.playClickSound()
  router.push('/game')
}

const handleVisibilityChange = () => {
  audioStore.handleVisibilityChange()
}

onMounted(() => {
  audioStore.playBackgroundMusic()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <q-page class="flex flex-center menu-page">
    <q-card class="main-card q-pa-lg text-center shadow-15" style="background: rgba(0, 0, 0, 0.8)">
      <h1 class="text-h1 title non-selectable q-px-md no-margin" style="color: #00ff00">
        Jogo da Memória 8-bits
      </h1>
      <p class="text-subtitle1 non-selectable text-white q-py-md">
        Teste sua memória e divirta-se!
      </p>
      <div class="row justify-center q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-btn
            @click="startGame"
            label="Novo Jogo"
            color="primary"
            class="text-subtitle1 full-width"
            style="border-radius: 8px"
            size="lg"
            no-caps
          />
        </div>
        <div class="col-12 col-md-4">
          <q-btn
            @click="clickAndToggleSettings"
            label="Configurações"
            color="grey-7"
            class="text-subtitle1 full-width"
            style="border-radius: 8px"
            size="lg"
            no-caps
          />
        </div>
      </div>
    </q-card>

    <!-- Modal de Configurações -->
    <q-dialog v-model="showSettings" backdrop-filter="blur(2px)" persistent>
      <q-card class="settings-card q-pa-md text-white" style="background: rgba(0, 0, 0, 0.95)">
        <h5 class="text-h5 text-center">Configurações</h5>
        <div class="q-px-lg">
          <span>Volume da Música:</span>
          <q-slider
            v-model="audioStore.musicVolume"
            :min="0"
            :max="1"
            :step="0.1"
            @change="audioStore.updateMusicVolume(audioStore.musicVolume)"
            class="q-mt-md"
            markers
            track-color="white"
            track-size="8px"
            thumb-size="32px"
          />
        </div>
        <div class="q-mt-md q-px-lg">
          <span>Volume dos Efeitos:</span>
          <q-slider
            v-model="audioStore.effectsVolume"
            :min="0"
            :max="1"
            :step="0.1"
            @change="
              (audioStore.updateEffectsVolume(audioStore.effectsVolume),
              audioStore.playClickSound())
            "
            class="q-mt-md"
            markers
            track-color="white"
            track-size="8px"
            thumb-size="32px"
          />
        </div>
        <div class="q-px-lg">
          <q-btn
            @click="clickAndToggleSettings"
            label="Fechar"
            color="primary"
            class="text-subtitle2 q-my-md full-width"
            style="border-radius: 8px"
            size="md"
            no-caps
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped>
h1 {
  line-height: 1.5;
}

.main-card {
  width: 90%;
  max-width: 1000px;
  border-radius: 20px;
}

.menu-page {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.title {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
}

.settings-card {
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }
}
</style>
