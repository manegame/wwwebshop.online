<template>
  <div class="splash">
    <header>
      <div class="menu">
        <img id="logo" src="../assets/logo@2x.png"/>
        <p id="links">
          <a href="instagram.com/wwwwebshop.online">Find Us On Instagram</a> <a href="mailto:wwwebshop.online@gmail.com">Contact Us</a>
        </p>
      </div>
    </header>

    <div class="main">
          <div class="video main">
            <div class="container">
              <my-video :sources="video.sources" :options="video.options"></my-video>
            </div>
          </div>
    </div class="main">

    <div id="container">
      <!-- <img id="logo" src="../assets/logo@2x.png"/> -->
      <h1 id="message">Coming to <a href="http://todaysart.nl/2017/" target="_blank">TodaysArt 2017</a><Countdown date="18:00 September 22, 2017"></Countdown>.</h1>
    </div>
  </div>
</template>

<script>
import myVideo from 'vue-video'
import Countdown from '../components/Countdown.vue'

export default {
  name: 'splash',
  data () {
    return {
      showVideo: true,
      ended: false,
      video: {
        sources: [{
          src: './static/web-shop-2.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: true,
          loop: true,
          volume: 0.1,
          muted: true
        }
      }
    }
  },
  components: {
    myVideo,
    Countdown
  }
}
</script>

<style lang="scss">
@import "../style/helpers/_embed.scss";
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_reset.css';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';
@import '../style/parts/_home.scss';
@import '../style/parts/_footer.scss';
@import '../style/parts/_header.scss';
@import '../assets/fonts/Museo100-Regular.css';
@import '../assets/fonts/Museo300-Regular.css';
@import '../assets/fonts/Museo500-Regular.css';
@import '../assets/fonts/Museo700-Regular.css';
@import '../assets/fonts/Museo900-Regular.css';

.splash {
  display: block;
  height: 100vh;
  .video {
    &.main {
      width: 80vw;
      box-shadow: 0px 10px 15px #888888;
      @include center;
    }
  }
  a {
    font-family: $Museo500;
    text-decoration: none;
    color: $black;
    &:active {
      color: $black;
    }
    &:hover {
      color: $black;
      text-decoration: underline;
    }
    &:visited {
      color: $black;
    }
  }
  .menu {
    width: 100%;
    height: 6vh;
    text-align: right;
    clear: both;
    #logo {
      float: left;
      display: inline-block;
      height: 100%;
      width: auto;
      vertical-align: top;
      text-align: left !important;
    }
    #links {
      float: right;
      width: auto;
      display: inline-block;
      vertical-align: top;
      margin-top: 10px;
      @include screen-size('small') {
        float: left;
        padding-left: 10px
      }
      > a {
        padding: 0 10px 0 0;
      }
    }
  }
}

#container {
    position: absolute;
    width: 100%;
    padding: 0 3%;
    bottom: 2vh;
  #logo {
    width: 100%;
  }
  #message {
    font-family: $Museo300;
    text-align: center;
    font-size: $font-size * 2;
    line-height: $line-height * 2.4;
    @include screen-size('small') {
      font-size: $font-size;
      line-height: $line-height * 1.4;
    }
  }
}
</style>
