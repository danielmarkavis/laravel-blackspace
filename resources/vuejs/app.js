require('bootstrap');

window.Vue = require('vue');

Vue.component('overview', require('./components/Overview.vue').default);

import {FontAwesomeIcon, FontAwesomeLayers} from '@fortawesome/vue-fontawesome';
import {library, dom} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
// import {fab} from '@fortawesome/free-brands-svg-icons';
// import {fas} from '@fortawesome/pro-solid-svg-icons';
// import {far} from '@fortawesome/pro-regular-svg-icons';
// import {fal} from '@fortawesome/pro-light-svg-icons';
library.add(fas);
Vue.component('fa', FontAwesomeIcon);
Vue.component('fa-layers', FontAwesomeLayers);
dom.watch();


const app = new Vue({
    el: '#app',
});
