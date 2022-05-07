<template>
  <ion-page>
    
    <ion-content :scroll-events="true">
      <div id="container">
        <h1 id="welcome-text"> Hola, {{this.firstName}}! </h1>
      </div>
    </ion-content>

    <div id="ft">
      <ion-footer>
        <ion-toolbar class="footer">
          <ion-button class="set_btn" slot="end" fill="clear" router-link="/configuration">
              <ion-icon name="settings" color="white"></ion-icon>
          </ion-button>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>


<script lang="ts">
import { IonContent, IonPage, IonFooter, IonButton, IonIcon} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Auth, API } from 'aws-amplify';
import { getUser } from '../graphql/queries'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonFooter,
    IonButton,
    IonIcon
  },
  data () {
    return {
      firstName: "",
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

    this.firstName = userDynamo.data.getUser.firstName
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
  top: 25%;
  transform: translateY(-50%);
  display: flexbox;
  flex-direction: column;
}
#welcome-text {
  color:black;
  margin-top: 0px;
  margin-right: 80%;
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
  margin-right: 20px;
}
.ion-icon{
  --color: var(--ion-color-tertiary);
  fill: clear;
}
</style>
