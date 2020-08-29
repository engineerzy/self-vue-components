import { createNamespaces } from '@/utils/create';
const [createComponent] = createNamespaces('icon');
export default createComponent({
  props: {
    name: {
      type: String,
      default: '',
      required: true,
    },
    size: {
      type: Number,
      default: 12,
    },
    color: {
      type: String,
      default: '#646566',
    },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
		},
		onTouchStart(e) {
			this.$emit('touchstart', e)
		}
  },
  render(h) {
		const otherProps = {
			...this.$listeners
		}
    const trackStyle = {
      fontSize: this.size - 1 + 'px',
      lineHeight: this.size + 'px',
      textAlign: 'center',
      verticalAlign: 'middle',
      color: this.color,
    };
    return (
      <i
        {...otherProps}
				onTap={this.onClick}
				onTouchstart={this.onTouchStart}
        class={`iconfont ${this.name}`}
        style={trackStyle}></i>
    );
  },
});
