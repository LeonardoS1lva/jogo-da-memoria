<template>
  <q-page class="flex flex-center game-page">
    <div class="game-container text-center">
      <h1 class="game-title">Jogo da Memória</h1>
      <div class="grid" style="justify-items: center">
        <q-btn
          v-for="(card, index) in cards"
          :key="index"
          :label="card.revealed ? card.icon : '❓'"
          class="card-btn"
          :class="card.revealed ? 'bg-green' : 'bg-grey'"
          @click="revealCard(index)"
          :disabled="card.revealed || gameOver"
        />
      </div>
      <div v-if="gameOver" class="game-over">
        <p class="game-over-text">Parabéns! Você completou o jogo!</p>
        <q-btn @click="resetGame" label="Novo Jogo" color="secondary" class="reset-btn" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'GamePage',
  data() {
    return {
      cards: [],
      flippedCards: [],
      matchedCards: 0,
      gameOver: false,
    }
  },
  mounted() {
    this.initGame()
  },
  methods: {
    initGame() {
      const icons = ['💣', '💎', '🍀', '🌟', '🎮', '🍄', '👾', '🚀']
      this.cards = [...icons, ...icons]
        .map((icon) => ({ icon, revealed: false }))
        .sort(() => Math.random() - 0.5)
    },
    revealCard(index) {
      if (this.flippedCards.length === 2) return
      this.cards[index].revealed = true
      this.flippedCards.push(index)

      if (this.flippedCards.length === 2) {
        this.checkMatch()
      }
    },
    checkMatch() {
      const [firstIndex, secondIndex] = this.flippedCards
      if (this.cards[firstIndex].icon === this.cards[secondIndex].icon) {
        this.matchedCards += 1
        if (this.matchedCards === this.cards.length / 2) {
          this.gameOver = true
        }
      } else {
        setTimeout(() => {
          this.cards[firstIndex].revealed = false
          this.cards[secondIndex].revealed = false
        }, 1000)
      }
      this.flippedCards = []
    },
    resetGame() {
      this.matchedCards = 0
      this.gameOver = false
      this.initGame()
    },
  },
}
</script>

<style scoped>
h1 {
  line-height: 1.2;
}

.game-page {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
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

.game-container {
  background: rgba(0, 0, 0, 0.85);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 90%;
}

.game-title {
  font-family: 'Press Start 2P', system-ui;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #00ff00;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 1rem;
}

.card-btn {
  font-family: 'Press Start 2P', system-ui;
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

.bg-green {
  background-color: #28a745 !important;
  color: #fff !important;
}

.bg-grey {
  background-color: #6c757d !important;
  color: #fff !important;
}

.game-over {
  margin-top: 2rem;
  text-align: center;
}

.game-over-text {
  font-family: 'Press Start 2P', system-ui;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.reset-btn {
  font-family: 'Press Start 2P', system-ui;
  font-size: 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  background-color: #007bff;
  color: #fff;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.reset-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

@media (max-width: 600px) {
  .game-container {
    width: 90%;
    padding: 1rem;
  }
  .game-title {
    font-size: 1.5rem;
  }
  .card-btn {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}
</style>
