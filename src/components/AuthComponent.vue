<template>
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
        <app-header></app-header>
        <ion-router-outlet />
    </authenticator>
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

      return API.graphql({query: createUser, variables: {input: newUser}})
      .then(() => {
          return Auth.signUp({
            username,
            password,
            attributes,
        })
        .catch((error) => {throw "Error desconocido"});
      })
      .catch((error) => {
          if (error.errors[0].errorType == "DynamoDB:ConditionalCheckFailedException") {
              throw "La BlueTag ya está en uso."
          } else {
              throw "Error desconocido."
          }
      });
    },
  };
</script>


