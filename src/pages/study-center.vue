<template>
  <div>
    <x-tabs v-model="active">
      <x-tab-item
        v-for="(item, index) in tabs"
        :key="index"
        :title="item.name"
        :disabled="item.disabled"
        :name="item.id"
      >
        <pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载完成！！！！">
          <div class="pull-list">
            <x-swipe-cell>
              <template #left>
                <x-button type="primary" :square="false" class="swiper-button">成功</x-button>
              </template>
              一件商品
              <template #right>
                <x-button type="danger" :square="false" class="swiper-button">失败</x-button>
              </template>
            </x-swipe-cell>
            <x-swipe-cell>
              <template #left>
                <x-button type="primary" :square="false" class="swiper-button">成功</x-button>
              </template>
              一件商品
              <template #right>
                <x-button type="danger" :square="false" class="swiper-button">失败</x-button>
              </template>
            </x-swipe-cell>
            <x-swipe-cell>
              <template #left>
                <x-button type="primary" :square="false" class="swiper-button">成功</x-button>
              </template>
              一件商品
              <template #right>
                <x-button type="danger" :square="false" class="swiper-button">失败</x-button>
              </template>
            </x-swipe-cell>
            <x-swipe-cell>
              <template #left>
                <x-button type="primary" :square="false" class="swiper-button">成功</x-button>
              </template>
              一件商品
              <template #right>
                <x-button type="danger" :square="false" class="swiper-button">失败</x-button>
              </template>
            </x-swipe-cell>
          </div>
        </pull-refresh>
      </x-tab-item>
    </x-tabs>
    <x-tabs v-model="active">
      <x-tab-item :title="btnTabs[0].name" :disabled="btnTabs[0].disabled" :name="btnTabs[0].id">
        <pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载完成！！！！">
          <x-button type="danger" size="mini" @click="openDialog">
            默认dialog
          </x-button>
          <br />
          <x-button type="danger" size="mini" @click="() => openDialog({ title: '' })">
            没有标题dialog
          </x-button>
          <br />
          <x-button type="danger" size="mini" @click="() => openDialog({ type: 'alert' })">
            alert类型dialog
          </x-button>
        </pull-refresh>
      </x-tab-item>
      <x-tab-item :title="btnTabs[1].name" :disabled="btnTabs[1].disabled" :name="btnTabs[1].id">
        <pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载完成！！！！">
          <x-button type="danger" size="mini" @click="openSheet">
            打开actionSheet
          </x-button>
          <x-input
            v-model="inputValue"
            label="名称"
            label-align="left"
            placeholder="请输入账户"
            type="textarea"
            clearable
          >
            <template #extra>
              <x-button type="primary" :square="false" size="mini">额外按钮</x-button>
            </template>
          </x-input>
        </pull-refresh>
      </x-tab-item>
    </x-tabs>
    <x-dialog :visible.sync="visible" title="dialog title 提示">
      <div>
        dialog default slot
      </div>
      <template #footer>
        <div>
          dialog footer slot
        </div>
      </template>
    </x-dialog>
    <x-action-sheet
      :visible.sync="sheetVisible"
      @actionClick="handleActionClick"
      title="sheet 标题"
      :actions="actions"
    >
    </x-action-sheet>
  </div>
</template>

<script>
import LiveCard from '@/components/live-card';
import Tab from '@/components/tabs';
import PullRefresh from '@/components/pull-refresh';
import Overlay from '@/components/overlay';
import Button from '@/components/button';
import Dialog from '@/components/dialog';
import ActionSheet from '@/components/action-sheet/ActionSheet';
import SwipeCell from '@/components/swipe-cell';
import Input from '@/components/input';
const { Item } = Tab;
export default {
  name: 'study-center',
  components: {
    LiveCard,
    PullRefresh,
    [Tab.name]: Tab,
    [Item.name]: Item,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Dialog.Component.name]: Dialog.Component,
    [SwipeCell.name]: SwipeCell,
    [Input.name]: Input,
  },
  data() {
    return {
      active: 0,
      isRefresh: false,
      visible: false,
      sheetVisible: false,
      actions: [
        { name: '11111' },
        { name: '11111', disabled: true },
        { name: '11111' },
        { name: '11111' },
        { name: '11111' },
        { name: '11111' },
      ],
      btnTabs: [
        { name: 'dialog', id: 0 },
        { name: 'actionSheet', id: 1 },
      ],
      inputValue: '输入框只读',
      tabs: [
        { name: '营销获客', id: 0 },
        { name: '售后服务', id: 1 },
        { name: '渠道订货', id: 2 },
        { name: '安全中心', id: 3, disabled: true },
        { name: '你的中心', id: 4 },
        { name: '我的中心', id: 5 },
        { name: '他的中心', id: 6 },
        { name: '废物中心', id: 7 },
      ],
    };
  },
  methods: {
    openDialog(config = {}) {
      // this.visible = true
      Dialog({
        content: '确认框内容',
        title: '提示',
        ...config,
      })
        .then(res => {
          console.log('res ==>', res);
        })
        .catch(err => {
          console.log('err ==>', err);
        });
    },
    openSheet() {
      this.sheetVisible = true;
    },
    handleActionClick(action) {
      console.log('action ==>', action);
    },
    onRefresh() {
      this.isRefresh = true;
      setTimeout(() => {
        this.isRefresh = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.page_tab_content {
  font-size: 14px;
  color: @subColor;
}
.pull-list {
  height: 300px;
  text-align: center;
  font-size: 14px;
  color: @mainColor;
  overflow: scroll;
}
.swiper-button {
  height: 100%;
  margin: 0;
}
</style>
