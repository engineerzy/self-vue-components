export function ChildrenMixin (parent) {
  return {
    inject: {
      [parent]: { // 在此处接受parent名称
        default: null
      }
    },
    mounted () {
      // 因为子组件的mounted早于父组件的mounted，
      // 所以可以在子组件的mounted中将子组件本身追加到父组件的children列表中
      // 当父组件的mounted执行时，父组件的children已将全部children包含
      this.bindRelation()
    },
    beforeDestroy () {
      // 当子组件卸载时，要及时将子组件从父组件的children列表中移出
      if (!this[parent] || this[parent].children.every(item => item !== this)) return;
      this[parent].children = this[parent].children.filter(item => item !== this)
    },
    methods: {
      bindRelation () {
        // 如果没有parent或者parent的children列表中已包含当前children则不做处理
        if (!this[parent] || this[parent].children.includes(this)) return;
        const children = [...this[parent].children, this]
        this[parent].children = children
      }
    }
  }
}

export function ParentMixin (parent) {
  return {
    provide () { // 父组件提供parent名族
      return {
        [parent]: this
      }
    },
    data () {
      return {
        children: [] // 提前定义好children列表
      }
    }
  }
}
