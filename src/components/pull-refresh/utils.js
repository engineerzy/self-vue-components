function on (el, event, fn) {
  el.addEventListener(event, fn )
}
export default {
  methods: {
    bindTouchEvent (el) {
      const { onTouchStart, onTouchMove, onTouchEnd } = this
      on(el, 'touchstart', onTouchStart)
      on(el, 'touchmove', onTouchMove)
      on(el, 'touchend', onTouchEnd)
    }
  }
}
