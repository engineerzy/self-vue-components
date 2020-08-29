export default function (classes = {}) {
  let classStr = ''
  for (const key in classes) {
    if (classes.hasOwnProperty(key)) {
      classStr += classes[key] ? ` ${key}` : ''
    }
  }
  return classStr
}