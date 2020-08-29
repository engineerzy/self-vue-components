import Vue from 'vue';
import XDailog from './dialog';
const TYPES = ['confirm', 'alert']
let instance;

function isInDocument(el) {
  return document.body.contains(el);
}

function initInstnace() {
  if (instance) {
    instance.$destroy();
  }
  instance = new (Vue.extend(XDailog))({
    el: document.createElement('div'),
	});
	
	instance.$on('update:visible', value => {
		instance.visible = value
	})
}

function callback (action) {
	instance[action === 'confirm' ? 'resolve' : 'reject'](action)
}

function Dialog(options = {}) {
  return new Promise((resolve, reject) => {
    if (!instance || !isInDocument(instance.$el)) {
      initInstnace();
		}
    Object.assign(instance, instance.currentOptions, options, { 
			visible: true,
			resolve,
			reject,
			callback
    });
    document.body.appendChild(instance.$el)
  });
}

Dialog.close = () => {
	if(instance) {
		instance.visible = false
	}
}
Dialog.remove = () => {
  if(instance) {
    document.body.removeChild(instance.$el)
  }
}
for (const type of TYPES) {
	Dialog[type] = (options = {}) => {
		return Dialog({
			...options,
			visible: true,
			type
		})
	}
}
Dialog.install = () => {
  Vue.use(XDailog)
}
Dialog.Component = XDailog
Vue.prototype.$dialog = Dialog;
export default Dialog


