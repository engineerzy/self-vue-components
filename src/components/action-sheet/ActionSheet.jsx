import { createNamespaces } from '@/utils/create';
import Overlay from '@/components/overlay/overlay';
import Styles from './actionSheet.module.less';
const [createComponent] = createNamespaces('action-sheet');

export default createComponent({
  components: {
    [Overlay.name]: Overlay,
  },
  props: {
    actions: {
      // 列表项目
      type: Array,
      default() {
        return [];
      },
    },
    visible: {
      // 是否可见
      type: Boolean,
      default: false,
    },
    title: {
      // 标题文字
      type: String,
      default: '',
    },
    showCancel: {
      // 显示底部按钮
      type: Boolean,
      default: true,
    },
    footerText: {
      type: String,
      default: '取消',
    },
  },
  methods: {
    wrapPreventDefault(event) {
      event.stopPropagation();
    },
    onClick() {
      this.$emit('update:visible', false);
    },
    onCancel() {
      this.$emit('cancel');
      this.onClick();
    },
    actionClick(action) {
      if (!action.disabled) {
        this.$emit('actionClick', action);
        this.onClick();
      } else {
        this.$emit('disabledClick', action);
      }
    },
  },

  render(h) {
    function Title() {
      return this.slots('title') ? (
        this.slots('title')
      ) : (
        <div class={Styles['x-actionsheet-title']}>{this.title}</div>
      );
    }
    function Content() {
      return (
        <div class={Styles['x-actionsheet-content']}>
          {this.slots() ? (
            this.slots()
          ) : (
            <ul>
              {this.actions &&
                this.actions.map(action => (
                  <v-touch
                    tag='li'
                    onTap={() => this.actionClick(action)}
                    class={{
                      [Styles['actionsheet-content-item']]: true,
                      [Styles['disabled']]: action.disabled,
                    }}>
                    {action.name}
                  </v-touch>
                ))}
            </ul>
          )}
        </div>
      );
    }
    function Footer() {
      return (
        <div class={Styles['x-actionsheet-footer']} onClick={this.onCancel}>
          {this.slots('footer') ? this.slots('footer') : this.showCancel && this.footerText}
        </div>
      );
    }
    return (
      <x-overlay visible={this.visible} onClick={this.onClick}>
        <transition name='sheet-slide'>
          <div
            tag='div'
            class={Styles['x-actionsheet']}
            vShow={this.visible}
            onClick={this.wrapPreventDefault}>
            {Title.call(this)}
            {Content.call(this)}
            {Footer.call(this)}
          </div>
        </transition>
      </x-overlay>
    );
  },
});
