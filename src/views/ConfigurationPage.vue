<template>
  <ion-page>
    <ion-content :scroll-events="true">
      <div id="container">
        <div id="conf-title">
          <ion-button @click="$router.go(-1)">
            <ion-icon name="arrow-back" class="setIcon"></ion-icon>
            <!-- <ion-icon name="settings" class="setIcon"> </ion-icon> -->
          </ion-button>
          Configuración
        </div>
        <ion-item class="line"></ion-item>
        <!-- <div id="personal-info"> -->
          <!-- NOMBES, APELLIDOS Y FECHA DE NACIMIENTO -->
          <h1>Información Personal</h1>
          <div id="personal-info">
          <!-- <ion-text> -->
            <div id="names">
              <h4>Nombre(s):</h4>
              <ion-input v-model="name" placeholder="Nombre" maxlength="30"></ion-input>
              <h4>Apellidos:</h4>
              <ion-input v-model="lastname" placeholder="Apellidos" maxlength="30"></ion-input>
              <h4>Fecha de nacimiento:</h4> 
            </div>
          <div id="birthdate">
            <ion-input v-model="day" placeholder="DD" type="text" maxlength="2" inputmode="numeric"></ion-input>/
            <ion-input v-model="month" placeholder="MM" type="text" maxlength="2" inputmode="numeric"></ion-input>/
            <ion-input v-model="year" placeholder="YYYY" type="text" maxlength="4" inputmode="numeric"></ion-input>
          </div>
          <!-- </ion-text> -->
          
        </div>
        <!-- PREFERENCIAS -->
        <div id ="preferences">
          <h1>Preferencias</h1>
          <div class="pref-options">
          <ion-text>Enviar notificación de mi cumpleaños</ion-text>
          <ion-toggle v-model="sendNotifs"></ion-toggle>
          </div>
          <div class="pref-options">
            <ion-text>Recibir notificaciones de cumpleaños</ion-text>
            <ion-toggle v-model="receiveNotifs"></ion-toggle>
          </div>
        </div>
        <ion-button id="bttn-save" @click="saveInfo">Guardar Cambios</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Auth, API } from 'aws-amplify';
import { IonContent, IonPage, IonText, IonToggle, IonIcon, IonButton, IonInput  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { updateUser } from '../graphql/mutations'
import { getUser } from '../graphql/queries'
import { subscribeEmployee, unsubscribeEmployee } from '../services/pushNotifications'
import { Storage } from '@capacitor/storage';
// import { arrow-back } from "ionicons/icons";

export default defineComponent({
  name: 'ConfigurationPage',
  components: {
    IonContent,
    IonPage,
    IonText,
    IonToggle,
    IonIcon,
    IonInput,
    IonButton
  },
  data() {
    return {
      blueTag: "",
      name: "",
      lastname: "",
      day: "",
      month: "",
      year: "",
      sendNotifs: true,
      receiveNotifs: true
    };
  },
  methods:{
    async saveInfo() {
      var dia = parseInt(this.day);
      var mes = parseInt(this.month);
      var anio = parseInt(this.year);

      if (dia > 31 || dia < 1 || mes < 1 || mes > 12 || anio < 1950){
        alert("Verificar la fecha")
      } else{
        const updatedUser = {
          blueTag: this.blueTag,
          firstName: this.name,
          lastName: this.lastname,
          birthDay: parseInt(this.day),
          birthMonth: parseInt(this.month),
          birthYear: parseInt(this.year),
          receiveNotifications: this.receiveNotifs,
          sendNotifications: this.sendNotifs
        }

        await API.graphql({query: updateUser, variables: {input: updatedUser}})
        if(this.receiveNotifs) {
          const {value} = await Storage.get({key: 'endpoint'})
          await subscribeEmployee(value);
        } else {
          await unsubscribeEmployee();
        }
        alert("Información actualizada correctamente")
      }
    },
    getDynamoUser: async () => {
      var userCognito = await Auth.currentAuthenticatedUser()
      var userDynamo: any = await API.graphql({query: getUser, variables: {blueTag: userCognito.username}})
      return userDynamo.data.getUser
    }
  },
  async mounted() {
    var userDynamo = await this.getDynamoUser()

    this.blueTag = userDynamo.blueTag
    this.name = userDynamo.firstName
    this.lastname = userDynamo.lastName
    this.day = userDynamo.birthDay
    this.month = userDynamo.birthMonth
    this.year = userDynamo.birthYear
    this.sendNotifs = userDynamo.sendNotifications
    this.receiveNotifs = userDynamo.receiveNotifications
  }
});

</script>

<style scoped>

ion-content{
  --background: var(--ion-color-tertiary);
}
.setIcon{
  color: rgb(255, 255, 255);
}
.line{
  border: 0;
  height: 5px;
  margin-left: 0px;
  margin-right: 5%;
  margin-bottom: 40px;
}
#names {
  display: flex;
  flex-direction: column;
  /* margin-left: 3%; */
  
}
#birthdate{
  display: flex;
  align-items: center;
  justify-content: flex-start;

}
#calendario{
  margin-top: 5%;
  margin-left: 15%;  
}
#bttn-save {
  margin-top: 70px;
  margin-bottom: 70px;
  margin-left: 30%;
  margin-right: 30%;
  display: flex;
  justify-content: center;
  color: white;
}
#preferences {
  margin-top: 70px;
}

.pref-options{
  display: flex;
  margin-left: 5%;
  margin-right: 15%;
  align-items: center;
  justify-content: space-between;
}
#conf-title {
  display: flex;
  align-content: center;
  align-items: center;
  margin-top: 8px;
  font-size: 9vw;
}



ion-input {
  /* margin-left: 20px; */
  font-family: 'Montserrat';

}
#container {
  position: absolute;
  left: 20px;
  right: 0;
  top: 20%;
  color: black;
  /* transform: translateY(-50%); */
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