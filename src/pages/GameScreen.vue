<script setup>
import { ref } from 'vue'
import { useAudioStore } from 'src/stores/audioStore'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAudioVisibility } from 'src/composable/useAudioVisibility'

const audioStore = useAudioStore()
const router = useRouter()

const cards = ref([])
const flippedCards = ref([])
const matchedCards = ref(0)
const gameOver = ref(false)
const icons = ['💣', '💎', '🍀', '🌟', '🎮', '🍄', '👾', '🚀']

const initGame = () => {
  cards.value = [...icons, ...icons]
    .map((icon) => ({ icon, revealed: false }))
    .sort(() => Math.random() - 0.5)
}

const revealCard = (index) => {
  if (flippedCards.value.length === 2 || cards.value[index].revealed) return
  audioStore.playClickSound()
  cards.value[index].revealed = true
  flippedCards.value.push(index)

  if (flippedCards.value.length === 2) {
    checkMatch()
  }
}

const resetGame = () => {
  audioStore.playClickSound()
  matchedCards.value = 0
  gameOver.value = false
  initGame()
}

const checkMatch = () => {
  const [firstIndex, secondIndex] = flippedCards.value
  if (cards.value[firstIndex].icon === cards.value[secondIndex].icon) {
    matchedCards.value += 1
    if (matchedCards.value === cards.value.length / 2) {
      gameOver.value = true
    }
  } else {
    setTimeout(() => {
      cards.value[firstIndex].revealed = false
      cards.value[secondIndex].revealed = false
    }, 1000)
  }
  flippedCards.value = []
}

const backToMenu = () => {
  audioStore.playClickSound()
  router.push('/')
}

useAudioVisibility()

onMounted(() => {
  initGame()
})
</script>

<template>
  <q-page class="flex flex-center background-animation">
    <q-card class="card-game text-center q-py-lg shadow-15" style="background: rgba(0, 0, 0, 0.85)">
      <h1 class="no-margin title-shadow q-pb-md game-title" style="color: #00ff00">
        Jogo da Memória
      </h1>
      <div class="row justify-center">
        <div v-for="(card, index) in cards" :key="index" class="col-3">
          <q-btn
            :label="card.revealed ? card.icon : '❓'"
            class="card-btn q-mb-md"
            :class="card.revealed ? 'bg-green-5' : 'bg-grey-7'"
            @click="revealCard(index)"
            :disabled="card.revealed || gameOver"
          />
        </div>
      </div>
      <div v-if="gameOver" class="text-center q-px-lg">
        <p class="text-white q-my-md" style="font-size: 1.2rem">Parabéns! Você completou o jogo!</p>
        <div class="row justify-center q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-btn
              @click="resetGame"
              label="Novo Jogo"
              color="primary"
              class="reset-btn full-width"
              size="md"
              padding="0.8rem 1.5rem"
              style="border-radius: 8px"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-btn
              @click="backToMenu"
              label="Voltar ao Menu"
              color="grey-7"
              class="reset-btn q-ml-md full-width"
              size="md"
              padding="0.8rem 1.5rem"
              style="border-radius: 8px"
            />
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped>
.card-game {
  width: 90%;
  max-width: 600px;
  border-radius: 15px;
}

.game-title {
  font-size: 2rem;
}

.card-btn {
  width: 70px;
  height: 70px;
  font-size: 1.5rem;
  border-radius: 10px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.reset-btn {
  transition: transform 0.2s box-shadow 0.2s;
}

.reset-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

@media (max-width: 600px) {
  .game-title {
    font-size: 1.2rem;
  }
  .card-btn {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}
</style>
