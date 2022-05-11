<template>
  <ion-header>
      <ion-toolbar class="header" color="#25305F">
            <img class="logo_bar"  src="../assets/bluepeople-logo-white-blue-72.png" style="display:inline-block"/>
            <ion-button class="so_btn" fill="clear" slot="end"  @click="signOut">
                <ion-icon name="log-out-outline" color="white"> </ion-icon>
            </ion-button>
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
    margin-bottom: 10px;
    margin-top: 10px;
}
.so_btn{
    color: white;
}

</style>