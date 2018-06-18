import 'font-awesome/scss/font-awesome.scss'
import VueResource from 'vue-resource'
import AtComponents from 'at-ui'
import networks from './media'
import router from './router'
import i18n from './locale'
import store from './store'
import App from './App'
import Vue from 'vue'
import 'at-ui-style'

Vue.use(AtComponents)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.interceptors.push((req, next) => {
  const isFind = networks.some(network => {
    if (req.url.indexOf(network.urlApi) !== -1) {
      network.logs(req, next)
      return true
    }
  })

  if (!isFind) {
    Vue.prototype.$Notify.warning({ title: 'Undefined API', message: req.url })
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.vk && !store.state.media.vk.user.id) {
    next({ name: 'vk' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

Vue.mixin({
  methods: {
    /* | -----------------------------------------------------------------------------
     * | Check.
     * | -----------------------------------------------------------------------------
     * |
     * | null  - config is off
     * | false - no matches found
     * | true  - matches found
     * |
     */
    /**
     * Checking settings for startup.
     *
     * @param {object} countObj - {min, max}
     *
     * @return boolean
     */
    checkStart (countObj) {
      const min = parseInt(this.main.count.min)
      const max = parseInt(this.main.count.max)

      if (min > 0 && max > 0 && max >= min) {
        this.main.count.min = min.toString()
        this.main.count.max = max.toString()
        return true
      }

      this.$Modal.alert({ title: 'Ошибка', content: 'Проверьте диапазон в основных настройках' })
      return false
    },
    /**
     * @param {array} items - {obj, method, param}
     * @param {boolean} reverse
     *
     * @return object - {result(bool), index(number)}
     */
    checkFinal (items, reverse = false) {
      let onlyNull = true

      for (const [index, item] of items.entries()) {
        const result = item.method(item.obj, item.param)

        if (result === null) {
          continue
        }

        onlyNull = false

        if (!result) {
          return { result: reverse, index: index }
        }
      }

      return { result: reverse ? onlyNull : !onlyNull, index: null }
    },

    checkNumber (obj, need) {
      const compareAll = obj.compareAll
      const items = obj.items
      const len = items.length

      if (!len) {
        return null
      }

      if (compareAll) {
        for (let i = 0; i < items; i++) {
          if (items[i] !== need) {
            return false
          }
        }
        return true
      }

      return items.includes(need)
    },
    checkText (obj, need) {
      const compareAll = obj.compareAll
      const items = obj.items
      const len = items.length

      if (!len) {
        return null
      }

      need = need.toLowerCase().trim()

      for (let i = 0; i < len; i++) {
        const isFind = need.indexOf(items[i]) !== -1

        if (compareAll && !isFind) {
          return false
        }
        if (!compareAll && isFind) {
          return true
        }
      }

      return compareAll
    },
    checkTextFull (obj, need) {
      const compareAll = obj.compareAll
      const items = obj.items
      const len = items.length

      if (!len) {
        return null
      }

      need = need.toLowerCase().trim()

      for (let i = 0; i < len; i++) {
        const isFind = need === items[i]

        if (compareAll && !isFind) {
          return false
        }
        if (!compareAll && isFind) {
          return true
        }
      }

      return compareAll
    },

    /* | -----------------------------------------------------------------------------
     * | Working with loop.
     * | -----------------------------------------------------------------------------
     * |
     */
    /**
     * Number of cycles to go through to delete all items.
     *
     * @param {object} countObj - {min, max}
     * @param {int} countMax
     *
     * @return number
     */
    getCountLoop (countObj, countMax) {
      return Math.ceil((countObj.max - countObj.min + 1) / countMax)
    },
    /**
     * How many posts you need to delete.
     *
     * @param {object} countObj - {min, max}
     *
     * @return number
     */
    getCountDeleteItems (countObj) {
      return countObj.max - countObj.min + 1
    },

    /* | -----------------------------------------------------------------------------
     * | Working with attributes.
     * | -----------------------------------------------------------------------------
     * |
     */
    /**
     * Add a new, unique and sorted number to an array from the input.
     *
     * @param {object} obj - {input, numbers, compareAll*}
     *
     * @return void - adding an input value to the array
     */
    pushNumber (obj) {
      const id = parseInt(obj.input)

      if (id) {
        obj.items.push(id)
        obj.items = Array.from(new Set(obj.items.sort((a, b) => a - b)))
      }

      obj.input = ''
    },
    /**
     * Add a new, unique, and sorted string to an array from the input.
     *
     * @param {object} obj - {input, items, compareAll*}
     *
     * @return void - adding an input value to the array
     */
    pushString (obj) {
      const value = obj.input.toLowerCase().trim()

      if (value) {
        obj.items.push(value)
        obj.items = Array.from(new Set(obj.items.sort()))
      }

      obj.input = ''
    },

    /* | -----------------------------------------------------------------------------
     * | Other.
     * | -----------------------------------------------------------------------------
     * |
     */
    /**
     * HTML (on / off).
     *
     * @param {boolean|number} inner
     *
     * @return string
     */
    getStyleStatus (inner) {
      return 'status status-' + (inner ? 'on' : 'off')
    }
  }
})
