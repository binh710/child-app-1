<template>
  <div class="container">
    <div class="row justify-content-center align-item-center text-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h3>Child app 1</h3>
        <p>This child application aims to show you how communication between stitcher app and parent can be done</p>
        <br/>
        <br/>
        
        <div class="form-group">
          <label for="messageToParent">Enter something you want to tell stitcher app</label>
          <input type="text" class="form-control centered-text" id="messageToParent" v-model="message">
        </div>
        
        <br/>
        <br/>

        <button
          class="btn btn-primary bold-text"
          @click="tellStitcherApp()"
          type="submit"
          :disabled="!message"
        >
          Tell stitcher app
        </button>
      </div>
    </div>
  </div>
  
</template>

<script>
import { updateParentApp } from '@/helpers/updateParentApp'

export default {
  name: 'App',
  data() {
    return {
      message: '',
      sticherAppDomain: process.env.VUE_APP_STITCHER_DOMAIN
    }
  },
  methods: {
    tellStitcherApp() {
      // create the message to inform stitcher app
      const msg = {
        action: 'alert',
        info: this.message
      }
      
      // call global helper method to update stitcher app about the route change
      updateParentApp(msg)
    },
    listenForStitcherMessage(event) {
      // check if the message come from a stitcher app
      if (this.sticherAppDomain && this.sticherAppDomain === event.origin) {
        // check if the message format is valid
        if ( event.data && event.data.action) {
          if (event.data.action === 'alert' && event.data.info) {
            window.alert(event.data.info);
          }
        }
      }
    }
  },
  mounted() {
    window.addEventListener('message', this.listenForStitcherMessage)
  },
  beforeUnmount () {
    window.removeEventListener('message', this.listenForStitcherMessage)
  }
}
</script>

<style>
body {
  background-color: aliceblue;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  background-color: aliceblue;
  height: 100vh;
}
label {
  margin-bottom: 8px;
}
.centered-text {
  text-align: center;
}
</style>
