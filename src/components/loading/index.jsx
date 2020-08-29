import { createNamespaces } from '@/utils/create';
import Icon from '@/components/icon';
import Styles from './loading.module.less';

const [createComponent] = createNamespaces('loading');
export default createComponent({
  props: {
    size: {
      type: Number,
      default: 16,
    },
  },
  components: {
    [Icon.name]: Icon,
  },
  render(h) {
    return (
      <div class={Styles['x-loading']}>
        <x-icon name='iconjiazai' size={this.size} />
        {
					this.slots() && <span>{this.slots()}</span>
				}
      </div>
    );
  },
});
