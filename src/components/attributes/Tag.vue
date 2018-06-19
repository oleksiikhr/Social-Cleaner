<template>
  <div class="block__attr">
    <top :obj="obj" :name="name" :compare="compare" :process="process" :active-status="obj.items.length" />
    <at-input v-model="obj.input" :disabled="process" @keyup.enter.native="push(obj)" />
    <div class="block__attr-inner">
      <at-tag v-for="(text, index) in obj.items" :key="index" :name="index" :closable="!process"
              @on-close="obj.items.splice(index, 1)">
        <a v-if="linkTag" :href="linkTag(text)" target="_blank" rel="noopener">{{ text }}</a>
        <span v-else>{{ text }}</span>
      </at-tag>
    </div>
    <small v-if="info">{{ info }}</small>
  </div>
</template>

<script>
import Top from './Top'

export default {
  components: {
    Top
  },
  props: {
    obj: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    push: {
      type: Function,
      required: true
    },
    linkTag: {
      type: Function,
      required: false
    },
    info: {
      type: String,
      required: false
    },
    compare: {
      type: Boolean,
      required: false
    },
    process: {
      type: Boolean,
      required: false
    }
  }
}
</script>
