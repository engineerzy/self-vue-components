import { ChildrenMixin } from './mixins';
import { createNamespaces } from './utils';
import Styles from './xtabitem.module.less';
const [createComponent] = createNamespaces('tab-item');
export default createComponent({
  name: 'x-tab-item-r',
  mixins: [ChildrenMixin('x-tabs')],
  props: {
    title: {
      // tab名称
      type: String,
      default: '',
    },
    name: {
      // 唯一标识
      type: String | Number,
      default: '',
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeName() {
      return this.$parent.value;
    },
  },

  methods: {
    handleClick(name, disabled, e) {
      this.$parent.$emit('onClick', name, disabled, e);
    },
  },

  render(h) {
    return <div class={Styles['x-tab-item__content']}>{this.slots()}</div>;
  },
});
