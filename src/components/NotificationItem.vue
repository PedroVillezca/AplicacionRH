<template>
  <div>
    <p>template</p>
  </div>
</template>

<script>


export default {
  name: 'NotificationItem',
  components: {

  },
  data() {
    return {
      blueTag: "",
      date: "",
      message: ""
    }
  },
  props: ["notificationData"],
  created() {
    console.log("I CAME IN")
    this.getNotificationData()
  },
  methods: {
    getNotificationData() {
      console.log(this.notificationData)
    }
  }
}
</script>


<style>

</style>