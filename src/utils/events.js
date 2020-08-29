export function preventDefault (event, isStoPropagation) {
  if(typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }
  if(isStoPropagation) {
    event.stopPropagation()
  }
}