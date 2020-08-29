export function throttle (fn, wait = 100) {
  if(!fn) return;
  let timer = null
  let start = new Date().getTime()
  return function () {
    let now = new Date().getTime()
    let context = this
    let args = arguments
    if(now - start >= wait) {
      fn.apply(context, [...args])
      start = now
    }else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, [...args])
      }, wait);
    }
  }
}

export function debounce (fn, wait = 100) {
  let timer = null
  return function () {
    clearTimeout(timer)
    let context = this
    let args = arguments
    setTimeout(() => {
      fn.apply(context, [...args])
    }, wait)
  }
}

const SlotsMixin = {
  methods: {
    slots(name = 'default', props) {
      const { $slots, $scopedSlots } = this
      const scopeSlots = $scopedSlots[name]
      if(scopeSlots) {
        return scopeSlots(props)
      }else {
        return $slots[name]
      }
    }
  }
}

export function createNamespaces (name) {
  const namespace = 'x-' + name
  return [createComponent(namespace)]
}

export function createComponent (name= '' ) {
  return function (component) {
    component.name = name
    component.mixins = component.mixins || []
    component.mixins.push(SlotsMixin)
    return component
  }
}
