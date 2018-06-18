<template>
  <div id="result" class="block result-block">
    <h2>Результаты</h2>
    <at-table :columns="columns" :data="data" pagination />
  </div>
</template>

<script>
export default {
  // {name, reason, result, link}
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      columns: [
        { title: 'Название', key: 'name' },
        { title: 'Причина', key: 'reason' },
        { title: 'Удаление', key: 'result' },
        {
          title: 'Сссылка',
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
              }, 'Перейти')
            ])
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.result-block {
  max-width: 100%;
}
</style>
