<template>
    <ion-page>
        <auth-component></auth-component>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage } from '@ionic/vue';

import AuthComponent from '../components/AuthComponent.vue'


export default defineComponent({
name: 'LandingPage',
components: {
    IonPage,
    AuthComponent 
}
});
</script>