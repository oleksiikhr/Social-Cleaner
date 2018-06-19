export default {
  methods: {
    /* | -----------------------------------------------------------------------------
     * | Working with loop.
     * | -----------------------------------------------------------------------------
     * |
     */
    /**
     * Number of cycles to go through to delete all items.
     *
     * @param {object} countObj - {min, max}
     * @param {int} countMax
     *
     * @return number
     */
    getCountLoop (countObj, countMax) {
      return Math.ceil((countObj.max - countObj.min + 1) / countMax)
    },
    /**
     * How many posts you need to delete.
     *
     * @param {object} countObj - {min, max}
     *
     * @return number
     */
    getCountDeleteItems (countObj) {
      return countObj.max - countObj.min + 1
    }
  }
}
