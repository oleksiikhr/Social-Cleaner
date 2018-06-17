<template>
  <div id="result">
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
