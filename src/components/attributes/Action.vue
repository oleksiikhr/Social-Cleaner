<template>
  <div class="block block-buttons">
    <div class="block-buttons__inner">
      <div class="block-buttons__process" v-if="loading">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <span class="sr-only">Loading...</span>
      </div>
      <template v-else-if="!process">
        <at-button type="info" @click="emitPreview()" v-if="canPreview">
          {{ textPreview }}
        </at-button>
        <at-button type="error" @click="modal = true">
          {{ textStart }}
        </at-button>
      </template>
      <div class="block-buttons__info" v-else>There is another cleaning</div>
    </div>

    <at-modal v-model="modal">
      <div slot="header">
        <span>The confirmation</span>
      </div>
      <div style="text-align:center;">
        <p>{{ textModal }}</p>
      </div>
      <div slot="footer">
        <at-button @click="modal = false">Cancel</at-button>
        <at-button type="error" @click="emitStart()">Start</at-button>
      </div>
    </at-modal>
  </div>
</template>

<script>
export default {
  props: {
    textStart: {
      type: String,
      required: false,
      default: 'Start'
    },
    textPreview: {
      type: String,
      required: false,
      default: 'Preview'
    },
    textModal: {
      type: String,
      required: false,
      default: 'Do you really want to start cleaning?'
    },
    canPreview: {
      type: Boolean,
      required: false
    },
    // From store
    process: {
      type: Boolean,
      required: true
    },
    // Component
    loading: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {
    emitStart () {
      this.modal = false
      this.$emit('start', true)
    },
    emitPreview () {
      this.$emit('preview', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.block-buttons__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  > button {
    max-width: 150px;
    width: 100%;
    margin: 0 15px;
  }
}
</style>
