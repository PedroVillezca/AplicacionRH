
<template>
  <ion-app>
      <landing-page></landing-page>
  </ion-app>
</template>

<script lang="ts">


import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import LandingPage from './views/Landing.vue'

Amplify.configure(awsconfig);

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    LandingPage
  }
});

</script>

