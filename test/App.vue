<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted, onUpdated, nextTick } from 'vue'
import PopoverBase from '../src/popover/PopoverBase.vue'

const trigger = ref('hover')
</script>

<template>
  <div id="app">
    <PopoverBase :trigger="trigger">
      <template #trigger>
        <button class="btn">hover</button>
      </template>
      <div style="padding: 8px 16px; font-size: 14px; color: #333">hello! vfloating-ui</div>
    </PopoverBase>
    <PopoverBase
      trigger="click"
      placement="left"
      :offset="10"
      transition-name="fade-in-scale-up"
      style="margin-left: 10px"
    >
      <template #trigger>
        <button class="btn">click</button>
      </template>
      <template #default="{ triggerWidth }">
        <div
          :style="{
            minWidth: `${triggerWidth}px`,
            boxSizing: 'border-box',
            padding: '8px 16px',
            fontSize: '14px',
            color: '#333'
          }"
        >
          {{ 'hello! vfloating-ui' }}
        </div>
      </template>
    </PopoverBase>
  </div>
</template>

<style lang="scss" module="S"></style>
