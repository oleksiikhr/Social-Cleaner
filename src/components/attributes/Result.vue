<template>
  <div id="result" class="block result-block">
    <h2>{{ $t('app.attributes.result.h2') }}</h2>
    <at-table :columns="columns" :data="data" pagination />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      // {name, reason, result, link}
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // FIXME change locale - change title
      columns: [
        { title: this.$t('app.attributes.result.columns[0]'), key: 'name' },
        { title: this.$t('app.attributes.result.columns[1]'), key: 'reason' },
        { title: this.$t('app.attributes.result.columns[2]'), key: 'result' },
        {
          title: this.$t('app.attributes.result.columns[3]'),
          render: (h, params) => {
            return h('div', [
              h('AtButton', {
                props: {
                  size: 'small',
                  hollow: true
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    window.open(params.item.link, '_blank')
                  }
                }
              }, this.$t('app.attributes.result.button'))
            ])
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
  background: #f7f7f7;
  padding: 5px;
}

.result-block {
  max-width: 100%;
}
</style>
