<template>
  <ion-header>
      <ion-toolbar class="header" color="#333366">
            <img class="logo_bar" src="../assets/bluepeople-logo.png" style="display:inline-block"/>
            <ion-button class="so_btn" color="white" fill="clear" slot="end"  @click="signOut">Cerrar Sesión</ion-button>
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
<style scoped>
.logo_bar{
    margin-left: 20px;
}
.so_btn{
    color: white;
}
</style>