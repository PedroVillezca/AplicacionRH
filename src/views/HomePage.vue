<template>
  <ion-page>
    
    <ion-content :scroll-events="true">
      <div id="container">
        <h1 id="welcome-text"> {{this.welcomeText}} </h1>
      </div>
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
import { getUser, listNotifications } from '../graphql/queries'

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
      blueTag: "",
      welcomeText: ""
    }
  },
  methods: {
    getAuthenticatedUser: async () => {
      var user = await Auth.currentAuthenticatedUser()
      return {username: user.username, attributes: user.attributes}
    }
  },
  async created() {
    var userCognito = await Auth.currentAuthenticatedUser()
    var userDynamo: any = await API.graphql({query: getUser, variables: {blueTag: userCognito.username}})
    const user = userDynamo.data.getUser
    this.firstName = user.firstName
    this.blueTag = user.blueTag

    const today = new Date()
    if (user.birthDay == today.getDate() && user.birthMonth == today.getMonth() + 1) {
      this.welcomeText = "¡Felicidades, " + user.firstName + "!"
      // Activar efecto de confeti
    } else {
      this.welcomeText = "Hola, " + user.firstName
    }

    var notifications: any = await API.graphql({query: listNotifications, variables: {blueTag: this.blueTag}})
    console.log(notifications)

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
</style>
