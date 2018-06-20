<template>
  <div class="block block-buttons">
    <div class="block-buttons__inner">
      <div class="block-buttons__process" v-if="loading">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>
      <template v-else-if="!process">
        <at-button type="info" @click="emitPreview()" v-if="canPreview">
          {{ $t(textPreview) }}
        </at-button>
        <at-button type="error" @click="modal = true">
          {{ $t(textStart) }}
        </at-button>
      </template>
      <div class="block-buttons__info" v-else>{{ $t('app.attributes.action.another_cleaning') }}</div>
    </div>

    <at-modal v-model="modal">
      <div slot="header">
        <span>{{ $t('app.attributes.action.confirmation') }}</span>
      </div>
      <div style="text-align:center;">
        <p>{{ $t(textModal) }}</p>
      </div>
      <div slot="footer">
        <at-button @click="modal = false">{{ $t('app.attributes.action.cancel') }}</at-button>
        <at-button type="error" @click="emitStart()">{{ $t('app.attributes.action.start') }}</at-button>
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
      default: 'app.attributes.action.start'
    },
    textPreview: {
      type: String,
      required: false,
      default: 'app.attributes.action.preview'
    },
    textModal: {
      type: String,
      required: false,
      default: 'app.attributes.action.text_modal'
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
