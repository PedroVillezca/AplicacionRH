<template>
  <div>
    <p>{{this.notificationData.blueTag}}</p>
    <p>{{this.notificationData.date}}</p>
    <p>{{this.notificationData.message}}</p>
  </div>
</template>

<script>


export default {
  name: 'NotificationItem',
  props: ["notificationData"]
}
</script>


<style>

</style>