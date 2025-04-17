<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const gameStarted = ref(false)
const startGame = () => {
  gameStarted.value = true
  router.push('/game')
}
const exitGame = () => {
  if (confirm('Você tem certeza que deseja sair do jogo?')) {
    window.close()
  }
}
</script>

<template>
  <q-page class="flex flex-center menu-page">
    <div class="menu-container text-center q-gutter-md">
      <h1 class="text-8xl title">Jogo da Memória 8-bit</h1>
      <p class="subtitle">Teste sua memória e divirta-se!</p>
      <q-btn @click="startGame" label="Novo Jogo" color="primary" class="q-mt-md animated-btn" />
      <q-btn @click="exitGame" label="Sair" color="secondary" class="q-mt-md animated-btn" />
    </div>
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
