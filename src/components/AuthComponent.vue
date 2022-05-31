<template>
    <ion-content :scroll-events="true">
    <authenticator id="authenticator"
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
                src="../assets/bluepeople-logo-white-blue-72.png"
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
import { getUserByEmail } from '../graphql/queries'
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
          blueTag: username.toLowerCase(),
          firstName: attributes.given_name,
          lastName: attributes.family_name,
          birthDay: parseInt(attributes.birthdate.substring(8, 10)),
          birthMonth: parseInt(attributes.birthdate.substring(5, 7)),
          birthYear: parseInt(attributes.birthdate.substring(0, 4)),
          email: attributes.email,
          receiveNotifications: true,
          sendNotifications: true
      }

      
      var duplicateEmails = await API.graphql({query: getUserByEmail, variables: {email: newUser.email}})
      if (duplicateEmails.data.getUserByEmail.items.length >= 1) {
          throw "El correo ya está en uso."
      }

      return API.graphql({query: createUser, variables: {input: newUser}})
      .then(() => {
          return Auth.signUp({
            username,
            password,
            attributes,
        })
        .catch(() => {throw "Error desconocido"});
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
<style scoped>
.amplify-image{
    height: 120px;
    width: 210px;
    margin-top: 12%;
    margin-bottom:12%;
}

/* 
#authenticator[data-amplify-authenticator] [data-amplify-container] {
    width: var(--amplify-components-authenticator-container-width-max);
    
  } */


</style>