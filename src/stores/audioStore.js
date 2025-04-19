import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    backgroundMusic: new Audio('/sounds/8_bit_nostalgia.mp3'),
    musicVolume: 0.2,
    effectsVolume: 0.3,
  }),
  actions: {
    playBackgroundMusic() {
      if (this.backgroundMusic.paused) {
        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = this.musicVolume
        this.backgroundMusic.play().catch((e) => {
          console.warn('Autoplay bloqueado pelo navegador:', e)
        })
      }
    },
    stopBackgroundMusic() {
      this.backgroundMusic.pause()
      this.backgroundMusic.currentTime = 0
    },
    updateMusicVolume(volume) {
      this.musicVolume = volume
      this.backgroundMusic.volume = volume
    },
    playClickSound() {
      const clickSound = new Audio('/sounds/click.wav')
      clickSound.volume = this.effectsVolume
      clickSound.play()
    },
    updateEffectsVolume(volume) {
      this.effectsVolume = volume
    },
  },
})
