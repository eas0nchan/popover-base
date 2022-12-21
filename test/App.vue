<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted, onUpdated, nextTick } from 'vue'

const show = ref(false)
function toggle() {
  show.value = !show.value
}
</script>

<template>
  <div id="app">
    <PopoverBase trigger="hover">
      <template #trigger>
        <button class="btn">hover</button>
      </template>
      <div style="padding: 8px 16px; font-size: 14px; color: #333">hello! popover-base.</div>
    </PopoverBase>

    <PopoverBase trigger="click" :offset="10" transition-name="fade-in-scale-up" class="mx">
      <template #trigger>
        <button class="btn">custom transition</button>
      </template>
      <template #default="{ triggerWidth }">
        <div
          :style="{
            width: `${triggerWidth}px`,
            boxSizing: 'border-box',
            padding: '8px 16px',
            fontSize: '14px',
            color: '#333',
            wordBreak: 'break-all'
          }"
        >
          {{ 'hello! popover-base.' }}
        </div>
      </template>
    </PopoverBase>

    <PopoverBase :show="show" trigger="manual">
      <template #trigger>
        <button class="btn" @click="toggle">manual</button>
      </template>
      <div style="padding: 8px 16px; font-size: 14px; color: #333">hello! popover-base.</div>
    </PopoverBase>

    <PopoverBase background-color="#222" class="mx">
      <template #trigger>
        <button class="btn">custom theme</button>
      </template>
      <div style="padding: 8px 16px; font-size: 14px; color: #fff">hello! popover-base.</div>
    </PopoverBase>
  </div>
</template>

<style lang="scss" module="S"></style>
