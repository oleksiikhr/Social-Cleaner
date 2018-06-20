export default {
  methods: {
    /**
     * Number of cycles to go through to delete all items.
     *
     * @param {object} countObj - {min, max}
     * @param {number} countMax
     *
     * @return number
     */
    getCountLoop (countObj, countMax) {
      return Math.ceil((countObj.max - countObj.min + 1) / countMax)
    },
    /**
     * Number of posts that need to be cleared.
     *
     * @param {object} countObj - {min, max}
     *
     * @return number
     */
    getCountItems (countObj) {
      return countObj.max - countObj.min + 1
    },
    /**
     * Maximum number of items to clear.
     *
     * @param {object} countObj - {min, max}
     * @param {number} max - the maximum number that can be obtained from the API
     *
     * @return number
     */
    getMaxCountItems (countObj, max) {
      const count = this.getCountItems(countObj)

      return count > max ? max : count
    }
  }
}
