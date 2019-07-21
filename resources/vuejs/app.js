require('bootstrap');

window.Vue = require('vue');

Vue.component('overview', require('./components/Overview.vue').default);

const app = new Vue({
    el: '#app',
});
