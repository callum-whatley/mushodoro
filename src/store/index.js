import { createStore } from 'vuex'
import router from '../router'

let b = false;

function notifyMe() {
  if (!window.Notification) {
    console.log('Browser does not support notifications.');
  } else {
    // check if permission is already granted
    if (Notification.permission === 'granted') {
      // show notification here
      if (b) {
        let notify = new Notification('Mushodoro', {
          body: 'Begin Work'
        })
        setTimeout(() => {
          notify.close()
        }, 5000)
      } else {
        let notify = new Notification('Mushodoro', {
          body: 'Begin Break'
        })
        setTimeout(() => {
          notify.close()
        }, 5000)
      }
    } else {
      // request permission from user
      Notification.requestPermission().then(function (p) {
        if (p === 'granted') {
          // show notification here
          if (b) {
            let notify = new Notification('Mushodoro', {
              body: 'Begin Work'
            })
            setTimeout(() => {
              notify.close()
            }, 5000)
          } else {
            let notify = new Notification('Mushodoro', {
              body: 'Begin Break'
            })
            setTimeout(() => {
              notify.close()
            }, 5000)
          }
        } else {
          console.log('User blocked notifications.');
        }
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
}

export default createStore({
  state: {
    minutes: 0,
    minutesInitial: 0,
    seconds: 0,
    break: 0,
    isBreak: false,
    isLongBreak: true,
    rounds: 0,
    backgroundUrl: require('../assets/images/asleep.jpg')
  },
  getters: {
    getMinutes: state => state.minutes,
    getSeconds: state => state.seconds,
    getBreak: state => state.break,
    getRounds: state => state.rounds,
    getBackgroundUrl: state => state.backgroundUrl
  },
  mutations: {
    setMinutes(state, payload) {
      state.minutes = payload
    },
    setMinutesInitial(state, payload) {
      state.minutesInitial = (payload - 1)
    },
    decrementMinutes(state) {
      state.minutes--
    },
    setSeconds(state, payload) {
      state.seconds = payload
    },
    decrementSeconds(state) {
      state.seconds--
    },
    setBreak(state, payload) {
      state.break = payload
    },
    isBreak(state, payload) {
      state.isBreak = payload
    },
    isLongBreak(state, payload) {
      state.isLongBreak = payload
    },
    setRounds(state, payload) {
      state.rounds = payload
    },
    decrementRounds(state) {
      state.rounds--
    },
    setBackgroundUrl(state, payload) {
      state.backgroundUrl = payload
    }
  },
  actions: {
    addMushodoro({ commit }, mushodoro) {
      commit('setMinutes', mushodoro.minutes)
      commit('setMinutesInitial', mushodoro.minutes)
      commit('setBreak', mushodoro.break)
      commit('setRounds', mushodoro.rounds)
    },
    minuteHandler({ commit, dispatch }) {
      //If minute timer is 0 and the round is 0 end Mushodoro timer
      if (this.state.minutes === 0 && this.state.rounds === 0) {
        if (this.state.isLongBreak) {
          commit('setMinutes', (this.state.break * 3))
          commit('isLongBreak', !this.state.isLongBreak)
          dispatch('backgroundHandler')
        } else {
          alert("Mushodoro Timer Complete")
          return router.push("/")
        }
      }
      //If minute timer equals 0, reset the minute timer to initial value
      //and decrement the round
      if (this.state.minutes === 0 && !this.state.isBreak) {
        dispatch('backgroundHandler')
        dispatch('breakHandler')
      } else if (this.state.minutes === 0 && this.state.rounds > 0) {
        commit('decrementRounds')
        dispatch('backgroundHandler')
        commit('setMinutes', this.state.minutesInitial)
        commit('isBreak', !this.state.isBreak)
      } else {
        commit('decrementMinutes')
      }
    },
    secondHandler({ commit, dispatch }) {
      //If seconds < 0, then reset it to 59 and decrement minute timer
      if (this.state.seconds === 0 && this.state.minutes >= 0) {
        dispatch('minuteHandler')
        commit('setSeconds', 59)
      } else if (this.state.seconds > 0) {
        commit('decrementSeconds')
      }
    },
    breakHandler({ commit }) {
      //Set the timer to the break amount and reverse isBreak
      commit('isBreak', !this.state.isBreak)
      commit('setMinutes', (this.state.break - 1))
    },
    backgroundHandler({ commit }) {
      b = !b
      notifyMe()
      if (this.state.backgroundUrl === require("../assets/images/asleep.jpg")) {
        commit('setBackgroundUrl', require("../assets/videos/MushroomOpeningG.gif"))
        setTimeout(() => {
          commit('setBackgroundUrl', require("../assets/images/awake.jpg"))
        }, 2300)
      } else {
        commit('setBackgroundUrl', require("../assets/videos/MushroomCloseG.gif"))
        setTimeout(() => {
          commit('setBackgroundUrl', require("../assets/images/asleep.jpg"))
        }, 2300)
      }
    }
  }
})
