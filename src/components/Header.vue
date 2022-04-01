<template>
  <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>BluePeople BirthDay</ion-title>
        <ion-button @click="signOut">Sign Out</ion-button>
      </ion-toolbar>
    </ion-header>
</template>

<script>
import { IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Auth } from 'aws-amplify';


export default defineComponent({
    name: 'AppHeader',
    components: {
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButton
    },
    methods: {
        signOut: async () => {
            try {
                await Auth.signOut();
            } catch (error) {
                console.log('error signing out: ', error);
            }
        }
    }
});

</script>
