const getTagNameBody = document.getElementsByTagName('body')[0]

export function bodySetOverflow (val) {
  getTagNameBody.style.overflow = val
}
