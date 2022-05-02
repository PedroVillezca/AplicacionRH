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
          <h1>Información Personal</h1>
          
          <ion-text>Fecha de nacimiento:</ion-text>
          <ion-datetime value="1999-08-18T13:47:20.789"></ion-datetime>
        </div>

        <div id ="preferences">
          <h1>Preferencias</h1>
          <div class="pref-options">
          <ion-text>Permitir a otros conocer mi cumpleaños</ion-text>
          <ion-toggle></ion-toggle>
          </div>
          <div class="pref-options">
            <ion-text>Permitir saber el cumpleaños de otros</ion-text>
            <ion-toggle></ion-toggle>
          </div>
        </div>
        <ion-button id="bttn-save">Guardar Cambios</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonText, IonToggle, IonIcon, IonButton  } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfigurationPage',
  components: {
    IonContent,
    IonPage,
    IonText,
    IonToggle
  },
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

#personal-info {

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