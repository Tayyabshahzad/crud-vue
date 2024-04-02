import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'


import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
DataTable.use(DataTablesCore);

createApp(App).use(router).mount('#app')
