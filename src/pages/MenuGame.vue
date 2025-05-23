<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAudioStore } from 'src/stores/audioStore'
import { useAudioVisibility } from 'src/composable/useAudioVisibility'

const router = useRouter()
const audioStore = useAudioStore()

const showSettings = ref(false)

const clickAndToggleSettings = () => {
  audioStore.playClickSound()
  showSettings.value = !showSettings.value
}

const startGame = () => {
  audioStore.playClickSound()
  router.push('/chooseDifficulty')
}

useAudioVisibility()
</script>

<template>
  <q-page class="flex flex-center background-animation">
    <q-card class="main-card q-pa-lg text-center shadow-15" style="background: rgba(0, 0, 0, 0.8)">
      <h1 class="title-shadow non-selectable q-px-md no-margin" style="color: #00ff00">
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
.main-card {
  width: 90%;
  max-width: 1000px;
  border-radius: 20px;
}
.settings-card {
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
}

@media (max-width: 600px) {
  .title-shadow {
    font-size: 2rem;
  }
}
</style>
