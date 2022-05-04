<template>
  <ion-page>
    <ion-content :scroll-events="true">
      <div id="container">
        <div id="conf-title">
          <ion-button>
          <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
          Configuración
        </div>
        <ion-item class="line"></ion-item>
        <div id="personal-info">
          <!-- NOMBES, APELLIDOS Y FECHA DE NACIMIENTO -->
          <h1>Información Personal</h1>
          <ion-text>
            <h4>Nombre(s):</h4>
          <ion-input v-model="names" placeholder="Guillermo Enrique"></ion-input>
          <h4>Apellidos:</h4>
          <ion-input v-model="lastnames" placeholder="Valles Villegas"></ion-input>
          <h4>Fecha de nacimiento:</h4>
          <div id="birthdate">
          <ion-input v-model="day" placeholder="DD" type="text" maxlength="2"></ion-input>/
          <ion-input v-model="month" placeholder="MM" type="text" maxlength="2"></ion-input>/
          <ion-input v-model="year" placeholder="YYYY" type="text" maxlength="4"></ion-input>
          </div>
          </ion-text>
          
        </div>
        <!-- PREFERENCIAS -->
        <div id ="preferences">
          <h1>Preferencias</h1>
          <div class="pref-options">
          <ion-text>Permitir a otros conocer mi cumpleaños</ion-text>
          <ion-toggle v-model = "myBD"></ion-toggle>
          </div>
          <div class="pref-options">
            <ion-text>Permitir saber el cumpleaños de otros</ion-text>
            <ion-toggle v-model = "othersBD"></ion-toggle>
          </div>
        </div>
        <ion-button id="bttn-save" @click="saveInfo">Guardar Cambios</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonText, IonToggle, IonIcon, IonButton, IonInput  } from '@ionic/vue';
import { defineComponent } from 'vue';
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
  data(){
    return{
      names:"",
      lastnames:"",
      day:"",
      month:"",
      year:"",
      myBD: true,
      othersBD: true
    };
  },
  methods:{
    // FUNCION PARA GUARDAR LOS DATOS CON EL BOTON DE GUARDAR
    saveInfo(){
      var dia = parseInt(this.day);
      var mes = parseInt(this.month);
      var anio = parseInt(this.year);

      if(this.names == ""){
        this.names = "Guillermo Enrique"
      }
      if(this.lastnames == ""){
        this.lastnames = "Valles Villegas"
      }
      if(dia > 31 || dia <1 || mes < 1 || mes >12 || anio < 1950){
        alert("Verificar la fecha")
      }else{
        // AQUI VA CON LO DE LA BASE DE DATOS
      console.log(this.names, this.lastnames, this.day, this.month, this.year, this.myBD, this.othersBD);
      }
    },
    
  }
});

</script>

<style scoped>

.line{
  border: 0;
  height: 5px;
  margin-left: 0px;
  margin-right: 5%;
  margin-bottom: 40px;
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
  margin-top: 10px;
  font-size: 50px;
}

#personal-info h4 {
    margin-left: 20px;
}
ion-input {
  margin-left: 20px;
  font-family: 'Montserrat';

}

#container {
  position: absolute;
  left: 20px;
  right: 0;
  top: 20%;
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