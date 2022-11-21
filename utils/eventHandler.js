let body = null
if (process.browser) {
  // ここに window とか document を使った処理
  body = document.documentElement
}

export function debounce(fn, ms = 250, context) {
  let timer = null

  return function (...args) {
    const self = context || this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(self, args)
    }, ms)
  }
}
export const scrollHandler = () => {
  return body.scrollTop
}
