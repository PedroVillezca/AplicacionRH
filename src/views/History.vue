<template>
  <ion-page>
    <ion-content>
      <div>
        <ion-text>Este va a ser el historial de notificaciones, el arreglo en 'data' tiene los objetos de notificaciones de Dynamo.</ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { Auth, API } from 'aws-amplify';
import { IonContent, IonPage, IonText  } from '@ionic/vue';
import { getUser } from '../graphql/queries'
import { listNotifications } from '../graphql/queries'

export default {
  name: 'NotificationPage',
  components: {
    IonContent,
    IonPage,
    IonText
  },
  data() {
    return {
      blueTag: "",
      notifications: []
    }
  },
  methods: {
    getDynamoUser: async () => {
      var userCognito = await Auth.currentAuthenticatedUser()
      var userDynamo = await API.graphql({query: getUser, variables: {blueTag: userCognito.username}})
      return userDynamo.data.getUser
    },
    getNotifications: async (blueTag) => {
      var notifications = await API.graphql({query: listNotifications, variables: {blueTag: blueTag}})
      return notifications.data.listNotifications.items
    }
  },
  async created() {
    var userDynamo = await this.getDynamoUser()
    this.blueTag = userDynamo.blueTag
    this.notifications = await this.getNotifications(this.blueTag)
  }
}
</script>

<style>

</style>