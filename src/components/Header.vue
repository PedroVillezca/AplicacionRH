<template>
  <ion-header :translucent="true">
      <ion-toolbar color="light">
            <img class="logo_bar" src="../assets/bluepeople-logo.png" style="display:inline-block"/>
            <ion-button class="so_btn" fill="clear" slot="end"  @click="signOut">Sign Out</ion-button>
      </ion-toolbar>
    </ion-header>
</template>

<script>
import { IonHeader, IonToolbar, IonButton} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Auth } from 'aws-amplify';


export default defineComponent({
    name: 'AppHeader',
    components: {
        IonHeader,
        IonToolbar,
        IonButton,
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
