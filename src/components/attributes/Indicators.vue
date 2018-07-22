<template>
  <div class="block__attr">
    <top :obj="obj" :name="nameAttribute" :compare="compare" :process="process" :active-status="isActive" />
    <div class="indicators">
      <div class="indicator" v-for="(item, index) in obj.items" :key="index">
        <div class="flex">
          <i v-if="item.icon" :class="`fa fa-${item.icon}`" aria-hidden="true"></i>
          <p>{{ $t(item.name) }}</p>
        </div>

        <at-popover v-if="item.info" placement="top" :content="item.info(item.count)">
          <at-input v-model="item.count" :disabled="process || item.state === 0" @blur="eventBlur(index)" />
        </at-popover>
        <template v-else>
          <at-input v-model="item.count" :disabled="process || item.state === 0" @blur="eventBlur(index)" />
        </template>

        <at-radio-group v-model="item.state" :disabled="process">
          <at-radio-button :label="-1">{{ $t('app.attributes.indicators.less') }}</at-radio-button>
          <at-radio-button :label="0">{{ $t('app.attributes.indicators.disable') }}</at-radio-button>
          <at-radio-button :label="1">{{ $t('app.attributes.indicators.more') }}</at-radio-button>
        </at-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import Top from './Top'

export default {
  components: {
    Top
  },
  props: {
    obj: { // {items: [{name1, info, icon1, state1, count1}], compareAll}
      type: Object,
      required: true
    },
    name: {
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
    },
    onlyNumbers: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      nameAttribute: ''
    }
  },
  mounted () {
    if (this.name) {
      this.nameAttribute = this.name
    } else if (this.obj.name) {
      this.nameAttribute = this.obj.name
    }
  },
  computed: {
    isActive () {
      return this.obj.items.some(item => {
        if (item.state !== 0) {
          return true
        }
      })
    }
  },
  methods: {
    eventBlur (index) {
      if (this.onlyNumbers) {
        const count = this.obj.items[index].count
        this.obj.items[index].count = count.toString().replace(/[^0-9]/g, '') || 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.indicators {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e7e7e7;
    margin: 5px;
    padding: 10px 6px;
    p {
      font-weight: bold;
      margin: 0;
    }
    i {
      font-size: 1.1rem;
      margin-right: 10px;
    }
    .flex {
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .at-input {
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 550px) {
  .indicators {
    justify-content: center;
  }
}
</style>
