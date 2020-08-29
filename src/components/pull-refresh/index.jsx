import { createNamespaces } from '@/utils/create';
import bindMixins from './utils';
import Loading from '@/components/loading';
import Styles from './pullrefresh.module.less';
const [createComponent] = createNamespaces('pull-refresh');
const TEXT_STATUS = ['pulling', 'loosing', 'success'];
const PULL_TEXT = ['释放即可刷新...', '正在加载中...', '加载完成!'];

let headHeight = 0;
let startPosi = '';
let endPosi = '';

export default createComponent({
  props: {
    value: {
      // 是否正在加载
      type: Boolean,
      default: false,
    },
    duration: {
      // 下拉延时
      type: Number,
      default: 300,
    },
    successText: {
      // 加载成功时的文案
      type: String,
      default: '加载成功！',
    },
    successDuration: {
      // 加载成功时文案停留时间
      type: Number,
      default: 800,
    },
  },
  components: {
    [Loading.name]: Loading,
  },
  mixins: [bindMixins],
  data() {
    return {
      text: '释放即可刷新...',
      pullStatus: 'normal',
      distance: 0, // pull距离
      pullAbled: false, // 是否可以下拉
      direction: 'normal', // 上: top 下: bottom
      headAbled: false, // pull头部是否可以出现
      wrapOffset: { // 容器盒子边界
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    };
  },
  mounted() {
		const textRef = this.$refs['pull-text'];
		headHeight = textRef.offsetHeight;
    this.bindTouchEvent(this.$refs['pull-wrap']);
  },
  methods: {
    onTouchStart(e) {
      startPosi = e.touches[0].pageY;
      this.pullStatus = TEXT_STATUS[0];
      this.text = PULL_TEXT[0];
      this.$emit('onPullStart');
    },

    onTouchMove(e) {
      endPosi = e.touches[0].pageY;
      let distance = endPosi - startPosi;
      this.direction = 'bottom';
      if (Math.abs(distance) > headHeight) {
        if (Math.abs(distance) < headHeight * 2) {
          distance = headHeight + (distance - headHeight) / 2;
        } else {
          distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
        }
      }
      this.distance = distance;
    },

    onTouchEnd(e) {
      endPosi = startPosi = 0;
      if (this.distance >= headHeight) {
        this.pullStatus = TEXT_STATUS[1];
        this.text = PULL_TEXT[1];
        this.distance = headHeight;
        this.$nextTick(() => {
          this.$emit('onPullEnd');
          this.$emit('refresh');
        });
      } else {
        this.pullStatus = TEXT_STATUS[0];
        this.text = PULL_TEXT[0];
        this.distance = 0;
      }
    },
  },
  watch: {
    value(newValue) {
      if (!newValue) {
        this.text = PULL_TEXT[2];
        this.pullStatus = TEXT_STATUS[2];
        this.pullAbled = true;
        setTimeout(() => {
          this.headAbled = false;
          this.distance = 0;
        }, this.successDuration);
      }
    },
  },
  render(h) {
    const trackStyle = {
      position: 'relative',
      transitionDuration: `${this.duration}ms`,
      transform: this.distance ? `translate3d(0, ${this.distance}px, 0)` : '',
    };
    const Head = status => {
      const maps = {
        pulling: this.slots('pulling'),
        loosing: this.slots('loosing'),
        success: this.slots('success') || this.successText,
      };
      return maps[status] || this.text;
    };
    return (
      <div class={Styles['pull-refresh-wrap']}>
        <div ref='pull-wrap' style={trackStyle}>
          <div class={Styles['pull-text']} ref='pull-text'>
            {this.pullStatus === 'loosing' && <x-loading name='iconjiazai' size={20} />}{' '}
            {Head(this.pullStatus)}
          </div>
          {this.slots()}
        </div>
      </div>
    );
  },
});
