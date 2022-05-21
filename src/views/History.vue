<template>
  <ion-page>
    <ion-content :scroll-events="true">
      <div id="container">
        <div id="conf-title">
          <ion-button @click="$router.go(-1)">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
          Historial
        </div>

        <p>TEEEEEXTTT</p>
        <div v-bind:key="notification.blueTag" v-for="notification in notifications">
          <notification-item v-bind:notificationData="notification" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { Auth, API } from 'aws-amplify';
import { IonContent, IonPage } from '@ionic/vue';
import { getUser } from '../graphql/queries'
import { listNotifications } from '../graphql/queries'
import { NotificationItem } from '../components/NotificationItem.vue'

export default {
  name: 'NotificationPage',
  components: {
    IonContent,
    IonPage,
    NotificationItem
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
    console.log("ENTER CREATED")
    var userDynamo = await this.getDynamoUser()
    console.log("AFTER DYNAMO USER")
    this.blueTag = userDynamo.blueTag
    this.notifications = await this.getNotifications(this.blueTag)
    console.log("AFTER NOTIFICATIONS")
    console.log(this.notifications)
  }
}
</script>

<style>
#conf-title {
  display: flex;
  align-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 50px;
}

#container {
  position: absolute;
  left: 20px;
  right: 0;
  top: 20%;
  /* transform: translateY(-50%); */
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>