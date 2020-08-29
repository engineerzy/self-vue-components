import { ParentMixin } from './mixins';
import { createNamespaces } from './utils'
import Styles from './tab.module.less';
const [createComponent] = createNamespaces('tabs')

// title部分
const Title = {
  name: 'x-tab-title-r',
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    activeName: {
      type: [String, Number],
      default: '',
    },
  },
  methods: {
    // 组件滚动距离计算
    computedDistance(x = 0, index = 0) {
      const wrapRef = this.$refs['x-tabwrap'];
      const wrapWidth = wrapRef.offsetWidth;
      const title = this.$refs[`titles${index}`]
      const titleWidth = title.$el.offsetWidth
      const distance = title.$el.offsetLeft - (wrapWidth - titleWidth) / 2
      wrapRef.scrollTo({
        left: distance,
        behavior: 'smooth'
      })
    },
    // 处理点击事件
    handleClick(name, disabled, e, index) {
      this.$emit('titleClick', name, disabled, e, index);
      !disabled && this.computedDistance(e.center.x, index);
    },
  },

  render(h) {
    return (
      <div class={Styles['x-tab-titles']} ref='x-tabwrap'>
        <ul class={Styles['x-tablist']} ref='x-tablist'>
          {this.tabs.map((item, index) => (
            <v-touch
              tag='li'
              ref={`titles${index}`}
              onTap={e => this.handleClick(item.name, item.disabled, e, index)}
              key={index}
              class={`${Styles['x-tab-item']} ${item.disabled ? Styles['disabled'] : ''} ${
                this.activeName === item.name ? Styles['active'] : ''
              }`}>
              <span>{item.title}</span>
            </v-touch>
          ))}
        </ul>
      </div>
    );
  },
};


// tab主体内容部分
export default createComponent({
  mixins: [ParentMixin('x-tabs')],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    const context = this;
    return {
      activeName: context.value,
    };
  },
  mounted() {
    this.$on('onClick', this.handleClick);
    this.$on('clickDisabeld');
    this.computedWidth();
  },

  methods: {
    // 计算宽度
    computedWidth(index) {
      const wrapRef = this.$refs['tab_wrap'];
      const contentRef = this.$refs['x-tab-content'];
      const wrapWidth = wrapRef.clientWidth;
      contentRef.style.transform = `translateX(-${wrapWidth * index}px)`;
    },
    // 处理点击事件
    handleClick(name, disabled, e, index) {
      if (!disabled) {
        this.computedWidth(index);
        this.activeName = name;
        this.$emit('input', name);
      } else {
        this.$emit('clickDisabled', name);
      }
    },
  },
  watch: {
    value(name) {
      this.activeName = name;
    },
  },
  render(h) {
    return (
      <div class={Styles['x-tab__wrap']} ref='tab_wrap'>
        <Title tabs={this.children} activeName={this.activeName} onTitleClick={this.handleClick} />
        <div class={Styles['x-tab-content__wrap']} ref='x-tab-content'>
          {this.slots()}
        </div>
      </div>
    );
  },
});
