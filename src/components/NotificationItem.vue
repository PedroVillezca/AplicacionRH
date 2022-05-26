<template>
  <div class="notification">
    <p class="blueTag">{{this.notificationData.blueTag}}</p>
    <p class="date">{{this.notificationData.date}}</p>
    <p class="message">{{this.notificationData.message}}</p>
  </div>
</template>

<script>


export default {
  name: 'NotificationItem',
  props: ["notificationData"]
}
</script>

<style>

.notification{
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  background: rgb(223, 223, 223);
  margin-bottom: 30px;
  margin-right: 5%;
  border-radius: 25px;
  padding-right: 3%;
  padding-left: 3%;
  color: #25305F;
}

.blueTag{
  font-size: 25px;
  font-weight: bolder;
  border-radius: 15px;
  padding-right: 3%;
  padding-left: 3%;
  background: #25305F;
  color: white;
}
 
.date{
  align-items: flex-end;
  font-weight: bold;
  font-size: 20px;
}
.message{
  font-size: 18px;
}
</style>



