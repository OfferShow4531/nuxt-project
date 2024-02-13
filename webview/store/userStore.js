import axios from 'axios'

export const state = () => ({
  readyUser: [],
  completedUser: [],
  inProgressUser: []
})

export const mutations = {
  addReadyUser (state, user) {
    state.readyUser.push(user)
  },
  deleteUsers (state) {
    state.readyUser = []
  },
  deleteUser (state, { column, userId }) {
    if (column === 'inProgress') {
      state.inProgressUser = state.inProgressUser.filter(user => user.id !== userId)
    } else if (column === 'completed') {
      state.completedUser = state.completedUser.filter(user => user.id !== userId)
    }
  },
  moveUserToInProgress (state) {
    let user = null
    if (state.readyUser.length > 0) {
      user = state.readyUser.shift()
    } else if (state.completedUser.length > 0) {
      user = state.completedUser.shift()
    }
    if (user) {
      const userIndex = state.inProgressUser.findIndex(u => u.id === user.id)
      if (userIndex === -1) {
        state.inProgressUser.push(user)
      }
    }
  },
  moveUserToCompleted (state) {
    let user = null
    if (state.readyUser.length > 0) {
      user = state.readyUser.shift()
    } else if (state.inProgressUser.length > 0) {
      user = state.inProgressUser.shift()
    }
    if (user) {
      const userIndex = state.completedUser.findIndex(u => u.id === user.id)
      if (userIndex === -1) {
        state.completedUser.push(user)
      }
    }
  }
}

export const actions = {
  async fetchUser ({ commit }) {
    try {
      const response = await axios.get('https://randomuser.me/api')
      const user = response.data.results[0]
      commit('addReadyUser', user)
      return user
    } catch (error) {
      console.error('Ошибка при получении профиля пользователя:', error)
      throw error
    }
  },
  moveUserToInProgress ({ commit }, userId) {
    commit('moveUserToInProgress', { userId })
  },
  moveUserToCompleted ({ commit }, userId) {
    commit('moveUserToCompleted', { userId })
  }
}

export const getters = {
  readyUser: state => state.readyUser,
  completedUser: state => state.completedUser,
  inProgressUser: state => state.inProgressUser
}
