import Overlay from '@/components/overlay';
import context from './context';

export default {
  methods: {
    renderOverlay () {
      Overlay.open({
        zIndex: context.zIndex
      })
    },
    destroyOverlay () {
      Overlay.close()
    },
  },
  watch: {
    visible (newValue) {
      if(newValue) {
        this.renderOverlay()
      }else {
        this.destroyOverlay()
      }
    }
  }
}