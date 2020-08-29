import { createNamespaces } from '@/utils/create';
import Icon from '@/components/icon';
import Styles from './input.module.less';
const [createComponent] = createNamespaces('input');

export default createComponent({
  components: {
    [Icon.name]: Icon,
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      validator(type) {
        return ['text', 'password', 'tel', 'textarea'].includes(type);
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 20,
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default: new Date().getTime(),
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
      validator(size) {
        return ['small', 'medium', 'mini'].includes(size);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    labelAlign: {
      type: String,
      default: 'center',
      validator(labelAlign) {
        return ['left', 'center', 'right'].includes(labelAlign);
      },
    },
    labelWidth: {
      type: Number,
      default: 88,
    },
  },
  data() {
    return {
      selfValue: this.value,
      focused: false,
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue === oldValue) return;
      this.selfValue = newValue;
    },
  },
  computed: {
    showClear() {
      if (this.clearable && !this.readonly && !this.disabeld) {
        return !!this.selfValue && this.focused;
      }
      return false;
    },
    listeners() {
      return {
        ...this.$listeners,
        blur: this.onBlur,
        input: this.onInput,
        click: this.onClick,
        focus: this.onFocus,
        change: this.onChange,
      };
    },
    attrs() {
      return {
        ...this.$attrs,
        disabled: this.disabeld,
        readonly: this.readonly,
        placeholder: this.placeholder,
        maxlength: this.maxlength,
        name: this.name,
      };
    },
  },
  methods: {
    onInput(e) {
      if (e.target.composing) return;
      this.updateValue(e.target.value);
    },
    onChange() {
      this.$emit('change', this.selfValue);
    },
    onClick(e) {
      this.$emit('click', e);
    },
    onBlur() {
      this.focused = false;
      this.$emit('blur', this.selfValue);
    },
    onFocus() {
      this.focused = true;
      this.$emit('focus', this.selfValue);
    },
    updateValue(value) {
      if (!!value && value.length >= this.maxlength) {
        value = value.slice(0, this.maxlength);
      }
      this.selfValue = value;
      this.$emit('input', value);
    },
    clearValue() {
      this.$emit('clear');
      this.updateValue('');
    },
  },

  render(h) {
    const inputProps = {
      refs: 'input',
      class: this.type === 'textarea' ? Styles['x-input-textarea'] : '',
      domProps: {
        value: this.value,
      },
      attrs: this.attrs,
      on: this.listeners,
      directives: [
        {
          name: 'model',
          value: this.value,
        },
      ],
    };
    const contentClasses = {
      [Styles['x-input']]: true,
      [Styles['border']]: this.border,
    };
    const iconClasses = {
      [Styles['x-input-icon']]: true,
      [Styles['x-textarea-icon']]: this.type === 'textarea',
    };
    const inputClasses = {
      [Styles['disabled']]: this.disabled,
    };
    const labelStyles = {
      textAlign: this.labelAlign,
      width: `${this.labelWidth}px`,
      lineHeight: this.type !== 'textarea' && '42px',
    };
    function Label() {
      return this.type === 'textarea' ? <span>{this.label}</span> : this.label;
    }
    function Content() {
      return this.type === 'textarea' ? (
        <div class={Styles['x-input-textarea-wrap']}>
          <textarea {...inputProps} class={inputClasses} />
          <span class={Styles['x-input-textarea-length']}>
            {this.selfValue.length}/{this.maxlength}
          </span>
        </div>
      ) : (
        <input {...inputProps} class={inputClasses} />
      );
    }
    function ClearIcon() {
      if (this.showClear) {
        return (
          <x-icon name='iconguanbi2' class={iconClasses} size={18} onTouchstart={this.clearValue} />
        );
      }
    }
    return (
      <div class={Styles['x-input-wrap']}>
        <label htmlFor={this.name} class={contentClasses}>
          <div class={Styles['x-input-label']} style={labelStyles}>
            {Label.call(this)}
          </div>
          <div class={Styles['x-input-content']}>
            {Content.call(this)}
            {ClearIcon.call(this)}
            {this.type !== 'textarea' &&
              this.slots('extra') && (
                <div class={Styles['x-input-extra']}>{this.slots('extra')}</div>
              )}
          </div>
        </label>
      </div>
    );
  },
});
