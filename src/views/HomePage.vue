<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <div id="container">
<<<<<<< HEAD
        <p>{{ user.username }}</p>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
=======
        <ion-text>
          <h1 id="welcome-text"> Hola, {{user.attributes.given_name}}! </h1>
        </ion-text>
>>>>>>> 49d6bce7c27f46112090a97b7e235df86110cf22
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonText  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Auth } from 'aws-amplify';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonText
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
<<<<<<< HEAD
=======

>>>>>>> 49d6bce7c27f46112090a97b7e235df86110cf22
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
