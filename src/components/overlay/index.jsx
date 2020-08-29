import Vue from 'vue';
import XOverlay from './overlay';

let instance;
function isDocument(el) {
  return document.body.contains(el);
}

function createInstance(options) {
  if (instance) {
    instance.$destroy();
  }
  let OverlayInstance = Vue.extend(XOverlay);

  instance = new OverlayInstance({
    el: document.createElement('div'),
	});
  Object.assign(instance, instance.currentOptions, options);
}

function Overlay(options = {}) {
  if (!instance || !isDocument(instance.$el)) {
    createInstance(options);
    document.body.appendChild(instance.$el);
  } else {
    instance.visible = true;
  }
}
Overlay.open = options => {
  Overlay({
    ...options,
    visible: true,
	});
	
};
Overlay.close = () => {
  if (instance) {
    instance.visible = false;
  }
};

Overlay.remove = () => {
  if (instance) {
    document.body.removeChild(instance.$el);
  }
};

export default Overlay;
