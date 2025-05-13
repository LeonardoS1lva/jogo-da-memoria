import { onMounted, onUnmounted } from 'vue'
import { useAudioStore } from 'src/stores/audioStore'

export function useAudioVisibility() {
  const audioStore = useAudioStore()

  const handleVisibilityChange = () => {
    audioStore.handleVisibilityChange()
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })
}
