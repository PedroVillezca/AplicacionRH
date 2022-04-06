<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-text>
          <h1 id="welcome-text"> Hi, {{user.attributes.given_name}}! </h1>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Auth } from 'aws-amplify';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage
  },
  data () {
    return {
      user: {username: null, attributes: null}
    }
  },
  methods: {
    getAuthenticatedUser: async () => {
      var user = await Auth.currentAuthenticatedUser()
      return {username: user.username, attributes: user.attributes}
    }
  },
  async created() {
    this.user = await this.getAuthenticatedUser()
  }
});

</script>

<style scoped>
/*ion-page{
  background-color: #19478C;
}*/
#container {
  text-align: center;
  display: flex;
  position:absolute;
  top: 23%;
  left: 2%;
  right: 0;
  transform: translateY(-50%);
  /*background-color:#25305F;*/
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#welcome-text{
  color:#ffff;
  justify-content: flex-start;
  position:absolute;
}
</style>
