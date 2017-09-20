<template>
    <span class="countdown">
      just <span id="part">{{ days | two_digits }}</span> days, <span id="part">{{ hours | two_digits }}</span> hours, <span id="part">{{ minutes | two_digits }}</span> minutes and <span id="part">{{ seconds | two_digits }}</span> seconds from now
    </span>
</template>

<script>
import myVideo from 'vue-video'

export default {
  name: 'countdown',
  props: {
    date: {
      type: String
    }
  },
  data () {
    return {
      msg: 'Coming Soon',
      showVideo: true,
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    coercedDate () {
      // coerce: str => Math.trunc(Date.parse(str) / 1000)
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds () {
      return (this.coercedDate - this.now) % 60
    },
    minutes () {
      return Math.trunc((this.coercedDate - this.now) / 60) % 60
    },
    hours () {
      return Math.trunc((this.coercedDate - this.now) / 60 / 60) % 24
    },
    days () {
      return Math.trunc((this.coercedDate - this.now) / 60 / 60 / 24)
    }
  },
  components: {
    myVideo
  },
  methods: {
    minimizeVid (ended) {
      this.isMinimized = ended
    }
  },
  mounted () {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
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

#part {
  font-family: $Museo300;
  color: $white;
  background: $black;
  border-radius: 2px;
  padding: 0 2px;
  display: inline-block;
  text-align: right;
  width: 32px;
  @include screen-size('small') {
    padding: 0 2px;
    width: 22px;
  }
}

</style>
