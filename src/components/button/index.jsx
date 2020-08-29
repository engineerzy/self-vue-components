import { createNamespaces } from '@/utils/create';
import Loading from '@/components/loading'
import classnames from '@/utils/classnames';
import Styles from './button.module.less';
const [createComponent] = createNamespaces('button');

export default createComponent({
  props: {
    type: { // 按钮类型
      type: String,
      default: 'default',
      validator(type) {
        return ['default', 'primary', 'danger', 'text', 'info'].includes(type);
      },
    },
    size: { // 尺寸
      type: String,
      default: 'small',
      validator(size) {
        return ['small', 'mini', 'medium'].includes(size);
      },
    },
    disabled: { // 是否不可点击
      type: Boolean,
      default: false,
    },
    loading: { // 是否loading
      type: Boolean,
      default: false,
		},
		square: { // 是否圆角
			type: Boolean,
			default: true
		}
	},
	components: {
		[Loading.name]: Loading
	},
  methods: {
    onClick() {
			if(this.disabled) return;
      this.$emit('click');
    },
  },
  render(h) {
    const classes = classnames({
			[Styles['x-button']]: true,
			[Styles['square']]: this.square,
      [Styles['primary']]: this.type === 'primary',
      [Styles['danger']]: this.type === 'danger',
      [Styles['info']]: this.type === 'info',
			[Styles['default']]: !this.type || this.type === 'default',
			[Styles['disabled']]: this.disabled, 
			[Styles['text']]: this.type === 'text',
			[Styles['mini']]: this.size === 'mini',
			[Styles['medium']]: this.size === 'medium',
			[Styles['small']]: this.size === 'small',
    });
    return (this.type !== 'text' ? (
      <button class={classes} onClick={this.onClick}>
				{this.loading && <x-loading />}
        {this.slots()}
      </button>
    ) : (
      <span onClick={this.onClick} class={classes}>{this.slots()}</span>
    ))
  },
});
