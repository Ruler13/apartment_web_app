// global styles
import './_styles.sass';
import Vue from 'vue';

import TrialApp from './trial_app';
Vue.config.productionTip = false;
new Vue({
  render: h => h(TrialApp, {
    props:{
      apartments: apartments,
      rooms:rooms,
      floor:floor,
    }
  }),
}).$mount('#app');
