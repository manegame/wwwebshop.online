<template>
  <div class="home">
    <template v-if="comeBack">
      <div id="alert">
        <p>
          <span class="inline-helper"></span>Looks like you've been inactive for awhile...
        </p>
      </div>
    </template>

    <header>
      <img src="../assets/logo-white@2x.png"/>
      <div class="user">
        <div class="counter">
          <p id="counter" v-on:click="addCount">
            {{patienceCount}}
          </p>
        </div>
      </div>
    </header>

    <main>

      <!-- Stage 1: Video -->
      <template v-if="showVideo">
        <div class="video main">
          <div class="container">
            <my-video :sources="video.sources" :options="video.options" @ended="videoEnded"></my-video>
          </div>
        </div>
      </template>

      <!-- Stage 2: Questionnaire -->

      <template v-if="showQuestionnaire">
        <div class="main questionnaire">

          <div class="question">
            Q:
            <p class="q">
              {{questions[qC].q}}
            </p>
          </div>

          <div class="answer">
            A:

            <!-- OPTION -->
            <template v-if="questions[qC].type == 'option'">
              <!-- Add option component -->
              <button v-for="(answer, index) in questions[qC].a.length" @click="nextQuestion">
                {{questions[qC].a[index]}}
              </button>
            </template>
            <!-- LIST -->
            <template v-if="questions[qC].type == 'list'">
              <form v-for="(item, index) in questions[qC].a.length">
                <input type="checkbox"/><label>{{questions[qC].a[index]}}</label>
              </form>
              <input type="submit" @click.stop="nextQuestion"/>
            </template>
            <!-- IMAGE -->
            <template v-else-if="questions[qC].type == 'image'">
              <img v-for="(image, index) in questions[qC].a.length" v-bind:src="questions[qC].a[index]" @click.stop="nextQuestion"/>
            </template>
            <!-- CHECKBOX -->
            <template v-else-if="questions[qC].type == 'checkbox'">
              <input v-for="(toggle, index) in questions[qC].a.length" type="checkbox"/>
              <input type="submit" @click.stop="nextQuestion"/>
            </template>
            <!-- TEXTBOX -->
            <template v-else-if="questions[qC].type == 'textbox'">
              <input type="text" />
              <input type="submit" @click.stop="nextQuestion"/>
            </template>
            <!-- DROPDOWN -->
            <template v-else-if="questions[qC].type == 'dropdown'">
              <select>
                <option :value="n" v-for="n in 2018">
                  {{2018-n}}
                </option>
              </select>
              <input type="submit" @click.stop="nextQuestion"/>
            </template>
          </div>
        </div>
      </template>

      <!-- Stage 3: Product -->

      <template v-if="showProduct">
        <div id="recommended">
          <p>
            <span class="inline-helper"></span>Recommended 4 U!
          </p>
        </div>
      </template>

      <template v-if="showProduct">
        <div class="main product">
          <div class="left">
            <img src="../assets/bread-gloves.jpg" />
            <h2 class="price">
              €15 for 5
            </h2>
          </div>

          <div class="right">
            <h1>Bread Gloves</h1>
            <p class="description">
              The perfect gift for the bread lover in your life or someone who just can’t keep their hands out of the food. These bread gloves makes it so easy to make a sandwich  One size fits all! Comes in 4 different flavours!
            </p>
            <p>
              <span class="user">loosingweight</span> <span class="stars">★★★<span class="filled">☆☆</span></span>
              <span class="review">
                This looks like a fantastic idea, but I kept dropping the meat and biting my fingers. Still tasty, tho.
              </span>
            </p>
            <input id="buy" type="submit" value="Buy Now" @click.stop="productEnded"/>
          </div>

        </div>
      </template>

      <!-- Stage 4: Payment -->

      <template v-if="showPayment">
        <div class="main payment">
          <img class="captcha" src="../assets/captcha.jpg"/>
          <input type="text" v-model="checkText"/><label>Type</label>
          Type what's in the box, pls
        </div>
      </template>

      <template v-if="popUp">
        <div class="popup" v-for="popup in popups" v-bind:class="popup.class">
          <p>
            {{popup.text}}
          </p>
        </div>
      </template>

      <template v-if="videoPop">
        <div class="video popup">
          <my-video :sources="videopopup.sources" :options="video.options"></my-video>
        </div>
      </template>

      <!-- <template v-if="userInteract">
        <div>
          <input v-model="parentMsg">
          <br>
          <child v-bind:my-message="parentMsg"></child>
        </div>
      </template> -->

    </main>

    <footer>
      <div class="box">
        <div class="row" v-for="category in categories">
          <h2>{{category.name}}</h2>
          <ul>
            <li v-for="x in category.list">
              <a href="#">
                {{x.item}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import myVideo from 'vue-video'
import _ from 'lodash'

export default {
  name: 'home',
  data () {
    return {
      msg: '',
      showVideo: true,
      showQuestionnaire: false,
      qC: 0,
      showProduct: false,
      showPayment: false,
      popUp: false,
      videoPop: false,
      isMinimized: false,
      comeBack: false,
      userInteract: false,
      patienceCount: 88,
      parentMsg: '',
      video: {
        sources: [{
          src: './static/web-shop-1.mp4',
          type: 'video/mp4'
        }],
        options: {
          controls: false,
          autoplay: true,
          loop: true,
          volume: 0.1,
          muted: true
        }
      },
      videopopup: {
        sources: [{
          src: './static/avocado.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: true,
          loop: true,
          volume: 0.1,
          muted: true
        }
      },
      popups: [
        {
          'title': '',
          'text': 'Hi 😀  Have a look around! Let us know if you have any questions.',
          'class': 'invite'
        },
        {
          'title': '',
          'text': 'Are you sure that\'s the answer you were thinking of?',
          'class': 'warning'
        },
        {
          'title': '',
          'text': 'Free download!',
          'class': 'freebie'
        }
      ],
      products: [
        {
          'title': 'Pet Petter',
          'src': './static/pet-petter.jpg'
        },
        {
          'title': 'Pet Petter',
          'src': './static/pet-petter.jpg'
        },
        {
          'title': 'Shoe Openings',
          'src': './static/shoe.jpg'
        },
        {
          'title': 'Snowball Stomper',
          'src': './static/snowball.jpg'
        }
      ],
      questions: [
        {
          q: 'What are you looking for?',
          a: ['Service', 'Product', 'Shoes'],
          type: 'option'
        },
        {
          q: 'What is your first name?',
          a: [''],
          type: 'textbox'
        },
        {
          q: 'Which category of products/services are you looking to explore?',
          a: [ 'Food', 'Clothing', 'Revenge', 'Time management', 'Temperature management', 'Anger management', 'Beauty/wellness', 'Home', 'Kitchen', 'Pets', 'Design', 'Advertising', 'Gardening', 'Other', 'Surprise me' ],
          type: 'list'
        },
        {
          q: 'What is most important for you in a product or service?',
          a: [ 'Sleek design', 'Efficiency', 'Easy to use', 'Practicality', 'Cost' ],
          type: 'list'
        },
        {
          q: 'Pick an aesthetic',
          a: [ 'Fun', 'grungy', 'minimal', 'bombastic', 'quirky', 'normcore', 'cozy', 'cute', 'dark', 'no preference' ],
          type: 'list'
        },
        {
          q: 'How do you like your eggs?',
          a: [ 'I hate eggs', 'poached', 'soft boiled', 'hard boiled', 'fried', 'sunny side up', 'scrambled', 'raw', 'omelette', 'every which way' ],
          type: 'option'
        },
        {
          q: 'Pick one',
          a: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          type: 'checkbox'
        },
        {
          q: 'Which answer is correct?',
          a: [ 'A', 'B' ],
          type: 'option'
        },
        {
          q: 'What was your worst job?',
          a: [''],
          type: 'textbox'
        },
        {
          q: 'Spot the difference:',
          a: ['https://suade.org/images/fire_2.jpg', 'http://assets.inhabitat.com/wp-content/blogs.dir/1/files/2016/02/ice-cubes.jpg'],
          type: 'image'
        },
        {
          q: '1+1=?',
          a: [ '3', '5', '0', 'apple' ],
          type: 'option'
        },
        {
          q: 'What is the first name of the person who has the middle name of Herbert?',
          a: [''],
          type: 'textbox'
        },
        {
          q: 'What street did you grow up on? ',
          a: [''],
          type: 'textbox'
        },
        {
          q: 'Favourite ice cream flavour?',
          a: [ 'Pistachio' ],
          type: 'option'
        },
        {
          q: 'What colour underwear are you wearing?',
          a: [ '' ],
          type: 'textbox'
        },
        {
          q: 'Find the cheese',
          a: [ 'http://cosimocavallaro.com/wp-content/uploads/2014/07/cheese_room.jpg' ],
          type: 'image'
        },
        {
          q: 'Do you often find that you’re always feeling too hot or too cold?',
          a: [ 'yes!', 'uh, no' ],
          type: 'option'
        },
        {
          q: 'Does global warming exist?',
          a: [ 'Baby, it\'s hot wherever I go...' ],
          type: 'option'
        },
        {
          q: 'Do you like accessories?',
          a: [ 'yes', 'no', 'I have a lot' ],
          type: 'option'
        },
        {
          q: 'Do you eat food?',
          a: [ 'yes', 'I am a rock' ],
          type: 'option'
        },
        {
          q: 'What is the first name of your favorite relative when you were a child?',
          a: [ 'Mariska' ],
          type: 'textbox'
        },
        {
          q: 'What is your greatest fear?',
          a: [ 'Clowns', 'sharks', 'spiders', 'heights', 'dying', 'myself', 'making bad art', 'Other' ],
          type: 'option'
        },
        {
          q: 'What was your best grade at primary school?',
          a: [ 'A', 'B', 'C', 'D', 'E', 'F', 'I went to an experimental school' ],
          type: 'option'
        },
        {
          q: 'What is your favourite body part?',
          a: [ 'Big toes', 'hands', 'head', 'belly button', 'butt', 'shoulders', 'elbows', 'knees', 'tail' ],
          type: 'option'
        },
        {
          q: 'What plant do you associate yourself with?',
          a: [ 'cactus', 'fern', 'fruit tree', 'weed', 'seaweed', 'one of those with flowers' ],
          type: 'option'
        },
        {
          q: 'Do you play a sport?',
          a: [ 'What is sport?', 'yes' ],
          type: 'option'
        },
        {
          q: 'In what year did you abandon your dreams?',
          a: [ '' ],
          type: 'dropdown'
        },
        {
          q: 'What was your favorite unpaid internship?',
          a: [ '' ],
          type: 'textbox'
        },
        {
          q: 'What is the name of your favorite canceled TV show?',
          a: [ '2 broke girls', '24: Legacy', 'Adventure Time', 'Baby Daddy', 'Bates Motel', 'Comedy Bang! Bang!', 'Sense8', 'Sleepy Hollow' ],
          type: 'option'
        }
      ],
      categories: [
        {
          name: 'About',
          list: [
            {item: 'Who are we?'},
            {item: 'Affiliates'},
            {item: 'News'},
            {item: 'Terms & Conditions'},
            {item: 'Privacy & Cookies'}
          ]
        },
        {
          name: 'Support',
          list: [
            {item: 'Customer service'},
            {item: 'Your orders'},
            {item: 'Forum'},
            {item: 'Shipping rates and policies'},
            {item: 'Return policies'}
          ]
        },
        {
          name: 'Sales',
          list: [
            {item: 'Sell your services'},
            {item: 'Sell your products'},
            {item: 'Become a wwwebshop vendor'},
            {item: 'Advertise your products'}
          ]
        },
        {
          name: 'Social',
          list: [
            {item: 'Blog'},
            {item: 'Twitter'},
            {item: 'Facebook'},
            {item: 'Instagram'},
            {item: 'Youtube'}
          ]
        },
        {
          name: 'Careers',
          list: [
            {item: 'Content'},
            {item: 'Customer Service'},
            {item: 'Marketing'},
            {item: 'Finance'},
            {item: 'Business development'}
          ]
        }
      ]
    }
  },
  components: {
    myVideo
  },
  methods: {
    videoEnded () {
      this.showVideo = false
      this.showQuestionnaire = true
    },
    nextQuestion () {
      if (this.qC < this.questions.length - 1) {
        this.qC++
        console.log('next question' + this.qC, this.questions.length)
      } else {
        this.questionnaireEnded()
      }
    },
    questionnaireEnded () {
      this.showQuestionnaire = false
      this.showProduct = true
    },
    productEnded () {
      this.showProduct = false
      this.showPayment = true
    },
    checkText () {
    },
    paymentEnded () {

    },
    minimizeVid (ended) {
      // this.isMinimized = ended
    },
    testComponents () {
      console.log(myVideo.data)
    },
    sequencePopups () {
      setTimeout(() => { this.videoPop = true }, 2000)
    },
    addCount () {
      this.patienceCount++
    },
    showAlert () {
      this.comeBack = true
    },
    mouseMove: _.debounce(function () {
      // this.comeBack = false
      // setTimeout(this.showAlert, 10000)
    }, 300)
  },
  created () {
    window.addEventListener('mousemove', this.mouseMove)
    this.testComponents()
  },
  mounted () {

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
</style>
