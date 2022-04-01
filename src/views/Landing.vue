<template>
    <ion-page>
        <authenticator 
            :login-mechanisms="['username']"
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
            
            <home-page></home-page>

        </authenticator>
    </ion-page>
</template>

<script>
    import { I18n } from 'aws-amplify';
    import { defineComponent } from 'vue';
    import { Authenticator, translations } from "@aws-amplify/ui-vue";
    import { IonPage } from '@ionic/vue';

    import "@aws-amplify/ui-vue/styles.css";
    import HomePage from './HomePage.vue';


    export default defineComponent({
    name: 'LandingPage',
    components: {
        Authenticator,
        HomePage,
        IonPage    
    },
    data () {
        return {
        }
    }
    });

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