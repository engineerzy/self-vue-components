import { createNamespaces } from '@/utils/create';
import Styles from './overlay.module.less';
const [createComponent] = createNamespaces('overlay');

export default createComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
	},
	watch: {
		visible (newValue) {
			function preventDefault (event) {
				event.preventDefault();　　
			}
			if(this.$refs['overlay']) {
				if(newValue) {
					document.body.style.overflowY = 'hidden'
					this.$refs['overlay'].addEventListener('touchmove', preventDefault)
				}else {
					document.body.style.overflowY = 'auto'
					this.$refs['overlay'].removeEventListener('touchmove', preventDefault)
				}
			}	
		}
	},
  render(h) {
    const style = {
      zIndex: this.zIndex || 0,
    };
    return (
      <transition name='overlay-fade'>
        <div
					tag='div'
					ref="overlay"
          class={Styles['x-overlay']}
          onClick={this.onClick}
          style={style}
          vShow={this.visible}>
          {this.slots()}
        </div>
      </transition>
    );
  },
});
