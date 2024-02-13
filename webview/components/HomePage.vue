<template>
  <div class="kanban-board">
    <div class="column">
      <h2>Ready</h2>
      <div v-if="readyUser" class="card" @click="moveToInProgress" draggable="true" @dragstart="startDragging(readyUser[0])">
        <img :src="readyUser[0]?.picture.medium" alt="Avatar">
        <div class="info">
          <p>{{ readyUser[0]?.name.first }} {{ readyUser[0]?.name.last }}</p>
          <p>{{ readyUser[0]?.location.city }}, {{ readyUser[0]?.location.country }}</p>
          <p>{{ readyUser[0]?.phone }}</p>
        </div>
      </div>
      <button @click="createUser()">Создать пользователя</button>
    </div>
    <div class="column" @drop="onDrop($event, 'inProgress')" @dragover.prevent>
      <h2>In Progress</h2>
      <div v-for="(user, index) in inProgressUsers" :key="index" class="card" draggable="true" @dragstart="startDragging(user)">
        <img :src="user.picture.medium" alt="Avatar" @click="moveToUser(user)">
        <div class="info">
          <p>{{ user.name.first }} {{ user.name.last }}</p>
          <p>{{ user.location.city }}, {{ user.location.country }}</p>
          <p>{{ user.phone }}</p>
        </div>
      </div>
    </div>
    <div class="column" @drop="onDrop($event, 'completed')" @dragover.prevent>
      <h2>Completed</h2>
      <div v-for="(user, index) in completedUsers" :key="index" class="card" draggable="true" @dragstart="startDragging(user)">
        <img :src="user.picture.medium" alt="Avatar" @click="moveToUser(user)">
        <div class="info">
          <p>{{ user.name.first }} {{ user.name.last }}</p>
          <p>{{ user.location.city }}, {{ user.location.country }}</p>
          <p>{{ user.phone }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    readyUser () {
      return this.$store.getters['userStore/readyUser']
    },
    inProgressUsers () {
      return this.$store.getters['userStore/inProgressUser']
    },
    completedUsers () {
      return this.$store.getters['userStore/completedUser']
    }
  },
  // watch: {
  //   inProgressUsers (val) {
  //     if (val) { this.$store.dispatch('userStore/fetchUser') }
  //   },
  //   completedUsers (val) {
  //     if (val) { this.$store.dispatch('userStore/fetchUser') }
  //   }
  // }, //МЕТОД ЯВЛЯЕТСЯ НЕ ПРАКТИЧНЫМ ТАК КАК СОЗДАЕТ ДУБЛИРУЮЩИЕСЯ ЭЛЕМЕНТЫ
  created () {
    this.$store.dispatch('userStore/fetchUser')
  },
  methods: {
    moveToInProgress (user) {
      this.$store.dispatch('userStore/moveUserToInProgress', user)
    },
    createUser () {
      this.$store.dispatch('userStore/fetchUser')
    },
    moveToCompleted (user) {
      this.$store.dispatch('userStore/moveUserToCompleted', user)
    },
    moveToUser (user) {
      this.$router.push({ path: '/info', query: user })
    },
    onDrop (event, column) {
      const userId = event.dataTransfer.getData('user-id')
      if (column === 'inProgress') {
        this.moveToInProgress(userId)
      } else if (column === 'completed') {
        this.moveToCompleted(userId)
      }
    },
    startDragging (user) {
      event.dataTransfer.setData('user', JSON.stringify(user))
    }
  }
}
</script>

<style scoped>
.kanban-board {
  display: flex;
}

.column {
  flex: 1;
  border: 1px solid #ccc;
  padding: 16px;
  margin: 10px;
  border-radius: 16px;
}

.card {
  background-color: #f9f9f9;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
}

h2{
  font-size: 30px;
  text-align: center;
}

img{
  object-fit: contain;
  width: 100%;
  image-resolution: 100%;
  image-rendering: -webkit-optimize-contrast;
}

.card{
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  gap: 20px;
  border-radius: 16px;
}

.info{
  width: 100%;
  display: flex;
  flex-direction: column;
}

.info p{
  font-size: 18px;
  font-weight: 600;
}

.card {
  /* Ваш стиль карты */
  transition: transform 0.3s ease-in-out; /* Анимация трансформации */
}

.card:active {
  transform: scale(0.9); /* Увеличиваем размер карты при начале перетаскивания */
}

.card.dragging {
  transform: scale(0.9); /* Увеличиваем размер карты при начале перетаскивания */
  transition: transform 0.3s ease-in-out; /* Плавный переход размера */
}

.card:hover{
  background-color: #3dafe4;
  border: 1px solid #d3d4d4;
  transition: transform 0.5s ease-in-out;
  color: #fff;
}

button{
  margin-top: 40px;
  width: 300px;
  height: 50px;
  border-radius: 16px;
  background-color: #5cccc3 !important;
  color: #fff;
  border: none;
}
button:hover{
  background-color: #478ddd !important;
  border: 1px solid #f9f9f9;
}
button:active{
  background-color: #47dd74 !important;
}
</style>
