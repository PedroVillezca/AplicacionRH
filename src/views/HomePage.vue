<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <h1 id="welcome-text"> Hola, {{user.attributes.given_name}}! </h1>
      </div>
    </ion-content>
    <ion-footer class="footer-border">
    <ion-toolbar>
      <ion-title>Footer - No Border</ion-title>
      <ion-button color="clear" class="settings_icon">
        <img class="settings" src="../assets/settings-icon.png"/>
      </ion-button>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonFooter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Auth } from 'aws-amplify';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonFooter
  },
  data () {
    return {
      user: {username: '', attributes: {birthdate:'', email:'', family_name:'', given_name:''}}
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
ion-content{
  --background: var(--ion-color-tertiary);
}
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
}
#welcome-text {
  color:black;
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  display: flex;
  font-size: 16px;
  line-height: 22px;
  flex-direction: column;
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
.footer-border{
  background-color: black;
}
</style>
