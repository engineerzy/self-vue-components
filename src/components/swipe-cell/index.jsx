import { createNamespaces } from '@/utils/create';
import Button from '@/components/button';
import Styles from './swipecell.module.less';
const [createComponent] = createNamespaces('swipe-cell');

export default createComponent({
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      distance: 0,
      leftWidth: 0,
      rightWidth: 0,
    };
  },
  props: {
		align: {
			type: String,
			default: 'left',
			validator (align) {
				return ['left', 'right', 'center'].includes(align)
			}
		}
	},
  mounted() {
    this.getSlotsWidth();
  },
  methods: {
		onSwipe (direction) {
			const dir = direction === 'left' ? 'right' : 'left'
			if(this.distance !== 0) {
				this.distance = Math.abs(event.distance) > 3 * this[`${direction}Width`] ? -this[`${dir}Width`] : 0;
			}else {
				this.distance = -this[`${dir}Width`]
			}
			this.distance =  direction === 'left' ? this.distance : -this.distance
		},
    getSlotsWidth() {
      const { left, right } = this.$refs;
      this.leftWidth = left.clientWidth;
      this.rightWidth = right.clientWidth;
    },
  },
  render(h) {
    function Left() {
      return this.slots('left');
    }
    function Right() {
      return this.slots('right');
    }
    const wrapStyles = {
      transform: `translate3d(${this.distance}px, 0, 0)`
		};
		const contentStyles = {
			textAlign: this.align
		}
    return (
      <v-touch
        tag='div'
        class={Styles['x-swipecell']}
        onSwiperight={() => this.onSwipe('right')}
        onSwipeleft={() => this.onSwipe('left')}
				>
        <div class={Styles['x-swipecell-inner']} style={wrapStyles}>
          <div class={Styles['swipecell-left']} ref='left'>
            {Left.call(this)}
          </div>
          <div class={Styles['swipecell-content']} style={contentStyles}>{this.slots()}</div>
          <div class={Styles['swipecell-right']} ref='right'>
            {Right.call(this)}
          </div>
        </div>
      </v-touch>
    );
  },
});
