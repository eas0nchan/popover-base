import Vue from 'vue'
import App from './App.vue'
import './style.scss'

import PopoverBase from '../dist/popover-base'
import '../dist/style/index.css'

Vue.use(PopoverBase)

new Vue({ render: h => h(App) }).$mount('#app')
