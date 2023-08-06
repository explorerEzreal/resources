import { getToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() || ''
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  }
}

const actions = {
  async userLogin(context, loginForm) {
    const { data = '' } = await login(loginForm)
    context.commit('setToken', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
