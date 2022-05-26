<template>
  <ion-page>
    <ion-content :scroll-events="true">
      <div id="container">
        <h1 id="welcome-text" > Hola, {{this.firstName}}! </h1>
        <div class="party-div"> 
          <ion-button id="party" @click="shoot=!shoot"> Party</ion-button>
        </div>
      </div>
      <canvas id="my-canvas" v-show="shoot"></canvas>
    </ion-content>

    <div id="ft">
      <ion-footer>
        <ion-toolbar class="footer" color="#000">
          <ion-button class="notif_btn" slot="start" fill="clear">
              <ion-icon name="notifications" class="notIcon"> </ion-icon>
          </ion-button>
          <ion-button class="set_btn" slot="end" fill="clear" router-link="/configuration">
              <ion-icon name="settings" class="setIcon"> </ion-icon>
          </ion-button>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>


<script lang="ts">
import { IonContent, IonPage, IonFooter, IonButton} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Auth, API } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import ConfettiGenerator from "../confetti-js-master/src/confetti.js";
import { bool } from 'aws-sdk/clients/signer';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonFooter,
    IonButton
  },
  data () {
    return {
      firstName: "",
      confetti: null,
      canvas: null,
      shoot: false,
    }
  
  },
  methods: {
    getAuthenticatedUser: async () => {
      var user = await Auth.currentAuthenticatedUser()
      return {username: user.username, attributes: user.attributes}
    },
    confettiShoot: (shoot:bool) =>{
      shoot = !shoot;
    }
  },
  async created() {
    var userCognito = await Auth.currentAuthenticatedUser()
    var userDynamo: any = await API.graphql({query: getUser, variables: {blueTag: userCognito.username}})
    console.log(JSON.stringify(userDynamo))
    this.firstName = userDynamo.data.getUser.firstName
    const confettiElement = document.getElementById('my-canvas');
    const confettiSettings = { target: confettiElement };
    const confetti = new (ConfettiGenerator as any)(confettiSettings)
    confetti.render();
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
  top: 20%;
  transform: translateY(-50%);
  display: flexbox;
  flex-direction: column;
}
#welcome-text {
  color:black;
  margin-top: 0px;
  /*margin-right: 80%;*/
  width: 100%;
  text-align: left;
  text-indent: 15px;
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

.set_btn{
  margin-right: 5px;
  color:white;
}
.setIcon{
  color: rgb(255, 255, 255);
}
.notif_btn{
  margin-left: 5px;
  color:white;
}
.notIcon{
  color: rgb(255, 255, 255);
}
#party, #stop{
  color: #ffff;
  font-family: 'Montserrat';
  background-color: #4285F4;
}
#my-canvas{
  top: 50%;
}
</style>
