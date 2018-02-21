<template>
  <q-card style="margin: 0;" flat>
    <q-card-title>
      <q-icon name="dashboard" /> Status
      <q-btn flat round small color="primary" slot="right" loader v-model="process" @click="fetchGetStatus()">
        <q-icon name="refresh" />
        <q-tooltip anchor="bottom middle" self="top middle">Refresh</q-tooltip>
      </q-btn>
    </q-card-title>
    <q-card-main>
      <blockquote>
        <p>{{ status }}</p>
        <small>{{ name }}</small>
      </blockquote>
      <div style="margin-bottom: 1.5rem;">
        <q-btn v-model="process" icon="delete" color="red" outline class="full-width"
               :disabled="process || status.length < 1" :loading="process" @click.native="openDialogDelete()">
          Delete
        </q-btn>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
  import { addLogs, ICON_STATUS, COLOR_NEGATIVE, COLOR_POSITIVE, SOCIAL_VK } from '../../helpers/logs'
  import { QCard, QCardTitle, QIcon, QBtn, QTooltip, QCardMain, Dialog, Toast } from 'quasar'
  import { jsonp } from '../../helpers/vk'

  export default {
    components: {
      QCard, QCardTitle, QIcon, QBtn, QTooltip, QCardMain, Dialog, Toast
    },
    data () {
      return {
        status: '',
        process: false,
        dialogDelete: false
      }
    },
    activated () {
      this.fetchGetStatus()
    },
    computed: {
      user () {
        return this.$store.state.vk.user
      },
      name () {
        return this.user.first_name + ' ' + this.user.last_name
      }
    },
    methods: {
      fetchGetStatus () {
        this.process = true

        jsonp('status.get', {
          user_id: this.user.id
        })
          .then(res => {
            if (res.data.response) {
              addLogs(SOCIAL_VK, 'Received', null, ICON_STATUS, COLOR_POSITIVE)
              this.status = res.data.response.text
            }
            this.process = false
          })
          .catch(() => {
            this.process = false
          })
      },
      fetchDeleteStatus () {
        this.process = true

        jsonp('status.set', {
          text: ''
        })
          .then(res => {
            if (res.data.response) {
              addLogs(SOCIAL_VK, 'Cleared', null, ICON_STATUS, COLOR_POSITIVE)
              Toast.create.positive({ html: 'Status cleared' })
              this.status = ''
            }
            else {
              addLogs(SOCIAL_VK, 'Is\'nt cleared', null, ICON_STATUS, COLOR_NEGATIVE)
              Toast.create.positive({ html: 'Status is not cleared' })
            }
            this.process = false
          })
          .catch(() => {
            this.process = false
          })
      },
      openDialogDelete () {
        this.processDelete = false

        Dialog.create({
          title: 'Delete status',
          message: 'Do you really want to clear the status?<br>',
          buttons: [
            {
              label: 'Cancel',
              color: 'negative'
            },
            {
              label: 'Delete',
              handler: () => {
                this.fetchDeleteStatus()
              }
            }
          ]
        })
      }
    }
  }
</script>
