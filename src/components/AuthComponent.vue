<template>
  <authenticator 
        :login-mechanisms="['username']"
        :form-fields="formFields"
        :sign-up-attributes="[
        'username',
        'given_name',
        'family_name'
        ]"
        :sign-up-fields="[
        {label: 'username', order: 4}
        ]"
    >
        <app-header></app-header>
        <ion-router-outlet />
    </authenticator>
</template>

<script>
import { I18n } from 'aws-amplify';
import { Authenticator, translations } from "@aws-amplify/ui-vue";
import { IonRouterOutlet } from '@ionic/vue';

import "@aws-amplify/ui-vue/styles.css";
import AppHeader from '../components/Header.vue';
    
export default {
    name: 'AuthComponent',
    components: {
        Authenticator,
        AppHeader,
        IonRouterOutlet
    }
}

I18n.putVocabularies(translations);
I18n.setLanguage('es');
I18n.putVocabularies({
es:{
    'Sign In': 'Iniciar Sesión',
    'Create Account': 'Registrarse',
    'Username': 'BlueTag',
}
});
I18n.putVocabulariesForLanguage( 'es', {
'Given Name': 'Nombre (s)',
'Family Name': 'Apellidos',
});
</script>
