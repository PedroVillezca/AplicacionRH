
<template>
  <ion-app>
    <authenticator 
    :login-mechanisms="['email']"
    :form-fields="formFields"
    :sign-up-attributes="[
    'username',
    'given_name',
    'family_name',
    ]"
    :sign-up-fields="[
    {label: 'username', order: 4}
    ]"
    >
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </ion-app>
</template>

<script lang="ts">


import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';

import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    Authenticator
  }
});

import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-vue';
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

