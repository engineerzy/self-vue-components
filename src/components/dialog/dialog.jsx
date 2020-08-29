import { createNamespaces } from '@/utils/create';
import PopupMixin from '@/mixins/popup';
import context from '@/mixins/context';
import Styles from './dialog.module.less';
const [createComponent] = createNamespaces('dialog');

export default createComponent({
  mixins: [PopupMixin],
  props: {
    title: {
      // 标题
      type: String,
      default: 'dialog标题',
    },
    type: {
      type: String, // dialog 类型
      default: 'confirm',
      validator(type) {
        return ['alert', 'confirm'].includes(type);
      },
    },
    content: {
      // 中间内容
      type: String,
      default: 'dialog message',
    },
    visible: {
      // 是否显示
      type: Boolean,
      default: false,
		},
		cancelText: { 
			// 取消按钮文字
			type: String,
			default: '取消'
		},
		confirmText: {
			// 确定按钮文字 
			type: String,
			default: '确定'
		}
  },
  methods: {
    onClose(action) {
      this.$emit('update:visible', false);
      if (this.callback) {
        this.callback(action);
      }
    },
    onConfirm() {
      this.onClose('confirm');
      this.$emit('confirm');
    },
    onCancel() {
      this.onClose('cancel');
      this.$emit('cancel');
    },
  },
  render(h) {
    const style = {
      zIndex: context.zIndex + 1,
    };
    return (
      <transition name='fade'>
        <div class={Styles['x-dialog-content']} style={style} vShow={this.visible}>
          <div class={Styles['dialog-content-title']}>
            {this.slots('title') ? this.slots('title') : this.title}
          </div>
          <div class={Styles['dialog-content-main']}>
            {this.slots() ? this.slots() : this.content}
          </div>
          <div class={Styles['dialog-content-footer']}>
            {this.type === 'confirm' && (
              <v-touch tag='div' class={Styles['dialog-footer-cancel']} onTap={this.onCancel}>
                { this.cancelText }
              </v-touch>
            )}
            <v-touch tag='div' class={Styles['dialog-footer-confirm']} onTap={this.onConfirm}>
						{ this.confirmText }
            </v-touch>
          </div>
        </div>
      </transition>
    );
  },
});
