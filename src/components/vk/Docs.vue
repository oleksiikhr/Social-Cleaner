<template>
  <div id="docs">
    <div class="main-config block">
      <attr-section name="vk.docs.main_config.h2" />
      <attr-input name="vk.docs.main_config.owner_id.name" info="vk.docs.main_config.owner_id.info"
                  :model.sync="main.owner_id" :process="process" />
      <attr-count name="vk.docs.main_config.count.name" :model="main.count" :process="process" />
      <attr-radio name="vk.docs.main_config.type.name" :model.sync="main.type.value" :html="main.type.html"
                  :process="process" />
    </div>

    <div class="additional-config block">
      <attr-section name="vk.docs.additional_config.h2" :reverse.sync="config.reverse" :process="process" can-reverse />
      <attr-tag :obj="config.fromIds" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                 info="vk.docs.additional_config.from_ids.info" />
      <attr-tag :obj="config.exts" :push="pushString" :process="process"
                info="vk.docs.additional_config.exts.info" />
      <attr-tag :obj="config.texts" :push="pushString" :process="process" compare />
      <attr-indicators :obj="config.indicators" :process="process" />
      <!--TODO Date-->
    </div>

    <attr-action :process="process" :loading="loading" canPreview @start="doStart" @preview="doPreview" />
    <attr-result :data="result" />
  </div>
</template>

<script>
import AttrIndicators from '../attributes/Indicators'
import AttrSection from '../attributes/Section'
import { bytesToMB } from '../../heplers/file'
import AttrResult from '../attributes/Result'
import AttrAction from '../attributes/Action'
import AttrInput from '../attributes/Input'
import AttrCount from '../attributes/Count'
import AttrRadio from '../attributes/Radio'
import { bytes } from '../../heplers/info'
import AttrTag from '../attributes/Tag'
import VK from '../../media/VK'

const SLEEP_GET_MIN = 500
const SLEEP_GET_MAX = 1500

const SLEEP_DELETE_MIN = 1500
const SLEEP_DELETE_MAX = 2500

const MAX_COUNT_API = VK.prototype.COUNT_DOCS

export default {
  components: {
    AttrTag, AttrInput, AttrRadio, AttrCount, AttrAction, AttrSection, AttrResult, AttrIndicators
  },
  data () {
    return {
      main: {
        owner_id: '',
        count: {
          min: '1',
          max: '20'
        },
        type: {
          value: 0,
          html: [
            { name: 'vk.docs.main_config.type.items[0]', val: 0 },
            { name: 'vk.docs.main_config.type.items[1]', val: 1 },
            { name: 'vk.docs.main_config.type.items[2]', val: 2 },
            { name: 'vk.docs.main_config.type.items[3]', val: 3 },
            { name: 'vk.docs.main_config.type.items[4]', val: 4 },
            { name: 'vk.docs.main_config.type.items[5]', val: 5 },
            { name: 'vk.docs.main_config.type.items[6]', val: 6 },
            { name: 'vk.docs.main_config.type.items[7]', val: 7 },
            { name: 'vk.docs.main_config.type.items[8]', val: 8 }
          ]
        }
      },
      config: {
        fromIds: {
          name: 'vk.docs.additional_config.from_ids.name',
          input: '',
          items: [],
          compareAll: false
        },
        exts: {
          name: 'vk.docs.additional_config.exts.name',
          input: '',
          items: [],
          compareAll: false
        },
        texts: {
          name: 'vk.docs.additional_config.texts.name',
          input: '',
          items: [],
          compareAll: false
        },
        indicators: {
          name: 'vk.docs.additional_config.indicators.name',
          items: [{
            name: 'vk.docs.additional_config.indicators.items[0]',
            info: bytes,
            icon: 'server',
            state: 0,
            count: 0
          }],
          compareAll: false
        },
        reverse: false
      },
      result: [],
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.media.vk.user
    },
    process () {
      return this.$store.state.media.vk.process
    },
    cancel () {
      return this.$store.state.media.vk.cancel
    },
    ownerId () {
      return this.main.owner_id ? '-' + this.main.owner_id : this.user.id
    }
  },
  methods: {
    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    async fetchGet (count = VK.prototype.COUNT_DOCS, offset = this.main.count.min - 1) {
      const res = await VK.fetchDocsGet(count, offset, this.main.type.value, this.ownerId, SLEEP_GET_MIN, SLEEP_GET_MAX)

      return res
    },
    async fetchDelete (docId) {
      const res = await VK.fetchDocsDelete(docId, this.ownerId, SLEEP_DELETE_MIN, SLEEP_DELETE_MAX)

      return res
    },
    async callbackGet (...params) {
      const res = await this.fetchGet(...params)

      return res
    },
    async callbackDelete (data) {
      const res = await this.fetchDelete(data.id)

      return res
    },

    /* | -----------------------------------------------------------------------------
     * | Start / Stop
     * | -----------------------------------------------------------------------------
     * |
     */
    async doStart () {
      await VK.doStartDefault(this, this.check, MAX_COUNT_API)
    },
    async doPreview () {
      await VK.doPreviewDefault(this, this.check, MAX_COUNT_API)
    },
    start () {
      this.$store.commit('START_PROCESS', 'vk')
      this.loading = true
      this.result = []

      return this.checkStart(this.main.count)
    },
    stop () {
      this.$store.commit('STOP_PROCESS', 'vk')
      this.$store.commit('CLEAR_CANCEL', 'vk')
      this.loading = false
    },

    /* | -----------------------------------------------------------------------------
     * | Check
     * | -----------------------------------------------------------------------------
     * |
     */
    check (doc) {
      const items = [
        { obj: this.config.fromIds, method: this.checkNumber, param: doc.owner_id },
        { obj: this.config.exts, method: this.checkTextFull, param: doc.ext },
        { obj: this.config.texts, method: this.checkText, param: doc.title },
        { obj: this.config.indicators, method: this.checkIndicators, param: [doc.size] }
      ]

      const checked = this.checkFinal(items, this.config.reverse)

      const name = `${doc.title} [${Math.floor(bytesToMB(doc.size))} MB]`
      this.pushResult(this.result, name, VK.getLinkDoc(doc.id, this.ownerId), items, checked)

      return checked.result
    },

    /* | -----------------------------------------------------------------------------
     * | Links
     * | -----------------------------------------------------------------------------
     * |
     */
    getLinkPage (id) {
      return VK.getLinkPage(id)
    }
  }
}
</script>
