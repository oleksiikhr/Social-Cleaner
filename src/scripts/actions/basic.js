import { writeLog } from './display'

/**
 * Get element from DOM.
 * @param {String} selector
 * @return {Element}
 */
export function scGetOne(selector) {
  writeLog('Getting element', selector)
  return document.querySelector(selector)
}

/**
 * Get elements from DOM.
 * @param {String} selector
 * @return {NodeListOf}
 */
export function scGetAll(selector) {
  writeLog('Getting elements: ' + selector)
  return document.querySelectorAll(selector)
}

/**
 * Remove one or more elements.
 * @param {String, Element} element
 * @return {void} - remove element(s)
 */
export function scRemove(element) {
  if (!(element instanceof Element)) {
    element = scGetOne(element)
  }

  writeLog('Remove')
  element.remove()
}

/**
 * Simulation of pressing the DOM element.
 * @param {String, Element} element
 * @return {void} - click to the element
 */
export function scClick(element) {
  if (!(element instanceof Element)) {
    element = scGetOne(element)
  }

  writeLog('Click to the element')
  element.click()
}

/**
 * Waiting for the appearance of the desired element on the page.
 * @param {String} selector
 * @param {Number} ms
 * @return {Element}
 */
export async function scWaitElement(selector, ms) {
  writeLog(`Trying to find the element: ${selector}`)
  const element = scGetOne(selector)

  if (element) {
    writeLog('Element found')
    return selector
  }

  await scTimeout(timeoutBasic)
  await scWaitElement(selector, ms)
}

/**
 * Set timeout.
 * @param {Number} ms
 * @return {Promise<any>}
 */
export function scTimeout(ms) {
  writeLog(`Wait ms: ${ms}`)
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default
scTimeout.toString()


// /**
//  * Scroll the modal window to the bottom until we get all the data.
//  * @param {String} selector
//  * @param {Function} callback
//  * @return {void} - callback.
//  */
// function scrollToBottom(selector, callback) {
//   window.setTimeout(function() {
//     var element = document.querySelector(selector);
//
//     if (!document.querySelector('div[role="dialog"] li:last-child').innerText || element.scrollTop + element.offsetHeight < element.scrollHeight) {
//       element.scrollTop = element.scrollHeight;
//       console.log('Scroll: ' + element.scrollTop);
//       scrollToBottom(selector, callback);
//     } else {
//       console.log('Scroll: finish!');
//       callback();
//     }
//   }, timeoutAjax);
// }
