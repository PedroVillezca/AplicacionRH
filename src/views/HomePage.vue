<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-text>
          <h1 id="welcome-text"> Hola, {{user.attributes.given_name}}! </h1>
        </ion-text>
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

#container {
  text-align: center;
  display: flex;
  position:absolute;
  top: 23%;
  left: 2%;
  right: 0;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#welcome-text{
  color:#ffff;
  justify-content: flex-start;
  position:absolute;
}
</style>
