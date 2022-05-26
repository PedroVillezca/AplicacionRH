<template>
  <ion-page>
    <ion-content :scroll-events="true">
      <div id="container">
        <div id="history-title">
          <ion-button @click="$router.go(-1)" class="set_btn">
            <ion-icon class="setIcon" name="arrow-back"></ion-icon>
          </ion-button>
          Historial
        </div>
        <hr class="line">
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
import NotificationItem from '../components/NotificationItem.vue'

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
      var notifications = await API.graphql({query: listNotifications, variables: {blueTag: blueTag, limit: 20, sortDirection: "DESC"}})
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

<style scoped>

ion-content{
  --background: var(--ion-color-tertiary);

}
.line{
  background-color: #25305F;
  color:#25305F;
  border-radius: 25px;
  height: 4px;
  margin-left: 0px;
  margin-right: 5%;
  margin-bottom: 30px;
}
.set_btn{
  margin-right: 5px;
  color:white;
}
.setIcon{
  color: rgb(255, 255, 255);
}
#history-title {
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
  margin-top: 30%;

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