<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <app-header></app-header>

      <div id="container">
        <p>{{ user.username }}</p>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage  } from '@ionic/vue';
import { defineComponent } from 'vue';
import AppHeader from '../components/Header.vue';
import { Auth } from 'aws-amplify';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    AppHeader
  },
  data () {
    return {
      user: {username: null, attributes: null}
    }
  },
  methods: {
    getAuthenticatedUser: async () => {
      var user = await Auth.currentAuthenticatedUser()
      return {username: user.username, attributes: user.attributes}
    }
  },
  async created() {
    this.user = await this.getAuthenticatedUser()
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
