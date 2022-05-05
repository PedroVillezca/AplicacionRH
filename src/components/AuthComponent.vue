<template>
    <ion-content :scroll-events="true">
    <authenticator 
        :login-mechanisms="['username']"
        :sign-up-attributes="[
        'username',
        'email',
        'given_name',
        'family_name',
        'birthdate'
        ]"
        :services="services"
    >
        <template v-slot:header>
            <div style="text-align: center">
                <img
                class="amplify-image"
                alt = "Logo BluePeople"
                src="../assets/bluepeople-logo.svg"
                />
            </div>
        </template>

        <template v-slot:sign-up-header>
            <h4 class="amplify-heading"
                style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)">
                Crea una cuenta nueva
            </h4>
        </template>
        <template v-slot:sign-in-header>
            <h4 class="amplify-heading"
                style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)">
                Ingresa con tu cuenta
            </h4>
        </template>
        <app-header></app-header>
        <ion-router-outlet />
    </authenticator>
    </ion-content>
</template>

<script>
import { I18n, Auth, API } from 'aws-amplify';
import { Authenticator, translations } from "@aws-amplify/ui-vue";
import { IonRouterOutlet } from '@ionic/vue';
import "@aws-amplify/ui-vue/styles.css";
import { createUser } from '../graphql/mutations'
import AppHeader from '../components/Header.vue';

export default {
    name: 'AuthComponent',
    components: {
        Authenticator,
        AppHeader,
        IonRouterOutlet
    },
    data() {
        return {
            services
        }
    }
}

I18n.putVocabularies(translations);
I18n.setLanguage('es');
I18n.putVocabularies({
es:{
    'Sign In': 'Iniciar Sesión',
    'Create Account': 'Registrarse',
    'Username': 'BlueTag',
    'Birthdate': 'Fecha de Nacimiento'
}
});
I18n.putVocabulariesForLanguage( 'es', {
'Given Name': 'Nombre (s)',
'Family Name': 'Apellidos',
});

const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;

      // Save user in DynamoDB
      const newUser = {
          blueTag: username,
          name: `${attributes.given_name} ${attributes.family_name}`,
          birthday: attributes.birthdate,
          devices: ["dummy"] 
      }
      await API.graphql({query: createUser, variables: {input: newUser}})
      
      return Auth.signUp({
        username,
        password,
        attributes,
      });
    },
  };
</script>


