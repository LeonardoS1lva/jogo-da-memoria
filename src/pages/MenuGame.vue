<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
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

onMounted(() => {
  audioStore.playBackgroundMusic()
})
</script>

<template>
  <q-page class="flex flex-center menu-page">
    <div class="menu-container text-center q-gutter-md">
      <h1 class="text-8xl title">Jogo da Memória 8-bit</h1>
      <p class="subtitle">Teste sua memória e divirta-se!</p>
      <q-btn @click="startGame" label="Novo Jogo" color="primary" class="q-mt-md animated-btn" />
      <q-btn
        @click="clickAndToggleSettings"
        label="Configurações"
        color="secondary"
        class="q-mt-md animated-btn"
      />
    </div>

    <!-- Modal de Configurações -->
    <q-dialog v-model="showSettings" persistent>
      <div class="settings-modal">
        <h2 class="settings-title">Configurações</h2>
        <div class="volume-control">
          <label for="music-volume">Volume da Música:</label>
          <input
            id="music-volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            v-model="audioStore.musicVolume"
            @input="audioStore.updateMusicVolume(audioStore.musicVolume)"
          />
        </div>
        <div class="volume-control">
          <label for="effects-volume">Volume dos Efeitos:</label>
          <input
            id="effects-volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            v-model="audioStore.effectsVolume"
            @input="
              (audioStore.updateEffectsVolume(audioStore.effectsVolume),
              audioStore.playClickSound())
            "
          />
        </div>
        <q-btn
          @click="clickAndToggleSettings"
          label="Fechar"
          color="primary"
          class="q-mt-md animated-btn"
        />
      </div>
    </q-dialog>
  </q-page>
</template>

<style scoped>
h1 {
  line-height: 1.5;
}

.menu-page {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

.menu-container {
  background: rgba(0, 0, 0, 0.85);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  width: 1000px;
  max-width: 90%;
  text-align: center;
}

.title {
  font-family: 'Press Start 2P', system-ui;
  color: #00ff00;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
}

.subtitle {
  font-family: 'Press Start 2P', system-ui;
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.animated-btn {
  font-family: 'Press Start 2P', system-ui;
  text-transform: none;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    background-color 0.3s;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 12px;
}

.animated-btn.primary {
  background-color: #007bff;
  color: #fff;
}

.animated-btn.primary:hover {
  background-color: #0056b3;
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
}

.animated-btn.secondary {
  background-color: #dc3545;
  color: #fff;
}

.animated-btn.secondary:hover {
  background-color: #a71d2a;
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
}

.settings-modal {
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  color: #fff;
  max-width: 400px;
  margin: auto;
}

.settings-title {
  font-family: 'Press Start 2P', system-ui;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.volume-control {
  margin-bottom: 1.5rem;
}

.volume-control label {
  font-family: 'Press Start 2P', system-ui;
  font-size: 0.8rem;
  margin-right: 1rem;
}

.volume-control input[type='range'] {
  width: 100%;
  max-width: 300px;
}

@media (max-width: 600px) {
  .menu-container {
    width: 90%;
    padding: 1.5rem;
  }
  .title {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1rem;
  }

  .animated-btn {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }

  .animated-btn.primary,
  .animated-btn.secondary {
    width: 100%;
    margin: 0.5rem 0;
  }
  .animated-btn.primary:hover,
  .animated-btn.secondary:hover {
    transform: scale(1);
    box-shadow: none;
  }
}
</style>
