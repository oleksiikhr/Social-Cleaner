export default {
  methods: {
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
}
