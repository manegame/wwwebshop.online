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
        <div class="counter">
          <img src="../assets/bP$.svg" />
          <p id="counter" v-on:click="addCount">
            {{patienceCount}}
          </p>
        </div>
    </header>

    <main>
      <!-- Stage 1: Video (Alt) -->
      <template v-if="showVideo">
        <div class="video main">
          <div class="container">
            <video controls v-on:ended="videoEnded" playsinline>
              <source src="../../static/intro-1080.mp4" type="video/mp4"/>
              <source src="../../static/intro-720.mp4" type="video/mp4"/>
            </video>
          </div>
        </div>
      </template>

      <!-- Stage 2: Questionnaire -->
      <template v-if="showQuestionnaire">
        <div class="main questionnaire">

          <div class="question">
            <div class="qContainer">
              <p id="Q">
                Q:
              </p>
            </div>
            <p class="q">
              <span class="inline-helper"></span>{{questions[qC].q}}
            </p>
          </div>

          <div class="answer">
            <div class="aContainer">
              <p id="A">
                A:
              </p>
            </div>
            <!-- OPTION -->
            <template v-if="questions[qC].type == 'option'">
              <button v-for="(answer, index) in questions[qC].a.length" @click.stop="checkAnswer(questions[qC].type)">
                {{questions[qC].a[index]}}
              </button>
            </template>
            <!-- LIST -->
            <template v-if="questions[qC].type == 'list'">
              <form v-for="(item, index) in questions[qC].a.length">
                <input type="checkbox" :value="questions[qC].a[index]" v-model="checked"/><label>{{questions[qC].a[index]}}</label>
              </form>
              <input type="submit" @click.stop="checkAnswer(questions[qC].type)"/>
            </template>
            <!-- IMAGE -->
            <template v-else-if="questions[qC].type == 'image'">
              <div class="imgC">
                <img v-for="(image, index) in questions[qC].a.length" v-bind:src="questions[qC].a[index]" @click.stop="checkAnswer(questions[qC].type)"/>
              </div>
            </template>
            <!-- CHECKBOX -->
            <template v-else-if="questions[qC].type == 'checkbox'">
              <input v-for="(checkbox, index) in questions[qC].a.length" type="checkbox" v-model="checked"/>
              <input type="submit" @click.stop="checkAnswer(questions[qC].type)"/>
            </template>
            <!-- TEXTBOX -->
            <template v-else-if="questions[qC].type == 'textbox'">
              <input type="text" v-model="textbox"/>
              <input type="submit" @click.stop="checkAnswer(questions[qC].type)"/>
            </template>
            <!-- DROPDOWN YEAR -->
            <template v-else-if="questions[qC].type == 'dropdown-year'">
              <div class="dropdown slate">
                <select>
                  <option :value="n" v-for="n in 2018">
                    {{2018-n}}
                  </option>
                </select>
              </div>
              <input type="submit" @click.stop="checkAnswer(questions[qC].type)"/>
            </template>
            <!-- DROPDOWN -->
            <template v-else-if="questions[qC].type == 'dropdown'">
              <div class="dropdown slate">
                <select>
                  <option v-for="(image, index) in questions[qC].a.length" value="a">
                    {{questions[qC].a[index]}}
                  </option>
                </select>
              </div>
              <input type="submit" @click.stop="checkAnswer(questions[qC].type)"/>
            </template>
            <!-- TOGGLE -->
            <template v-else-if="questions[qC].type == 'toggle'">
              <template v-for="(toggle, index) in questions[qC].a.length">
                <form>
                  <input type="radio" :id="'radio'+index" :value="questions[qC].a[index]" v-model="picked">
                  <label :for="questions[qC].a[index]">{{questions[qC].a[index]}}</label>
                </form>
              </template>
              <input type="submit" @click.stop="checkAnswer(questions[qC].type)"/>
            </template>

            <p id="warn">
              {{warning}}
            </p>
          </div>
        </div>
      </template>

      <!-- Stage 3: Product -->
      <template v-if="showProduct">
        <div id="recommended">
          <p>
            <span class="inline-helper"></span>Recommended <br /> 4 U!
          </p>
        </div>
      </template>
      <template v-if="showProduct">
        <div class="main product">
          <div class="left">
            <img :src="products[productCount].src" />
            <h2 class="price">
              €{{products[productCount].price}}
            </h2>
          </div>
          <div class="right">
            <h1>{{products[productCount].title}}</h1>
            <p class="description">
              {{products[productCount].description}}
            </p>
            <p v-for="(review, index) in products[productCount].reviews.length">
              <span class="user">{{products[productCount].reviews[index].user}}</span> <span class="stars">{{products[productCount].reviews[index].stars}}<span class="filled">{{outOf(index)}}</span></span>
              <span class="review">
                {{products[productCount].reviews[index].text}}
              </span>
            </p>
            <input id="buy" type="submit" value="Buy Now" @click.stop="productEnded"/>
          </div>
        </div>
      </template>

      <!-- Stage 4: Captcha -->

      <template v-if="showCaptcha">
        <div class="main captcha">
          <img class="captcha" :src="this.captchas[cC].src"/>
          <input type="text" v-model="captcha"/>
          <input type="submit" @click.stop="captchaEnded"/>
          <p id="warn">
            {{warning}}
          </p>
        </div>
      </template>

      <!-- Stage 5: Checkout -->

      <template v-if="showCheckout">
        <div class="main checkout">
          <div class="basket">
            <h1>
              Your Choice
            </h1>
            <div class="item">
              <img :src="products[productCount].src" />
              <div class="info">
                <h2>{{products[productCount].title}}</h2>
                <h3>€{{products[productCount].price}}</h3>
              </div>
            </div>
            <div class="item sneak">
              <img :src="products[productCount+1].src" />
              <div class="info">
                <h3>{{products[productCount+1].title}}</h3>
                <h3>€{{products[productCount+1].price}}</h3>
              </div>
            </div>
          </div>
          <div class="bump">
            <p>
              Nothing You Expect, Everything You Deserve®
            </p>
          </div>
          <div class="totals">
            <h2>
              Total: €{{totalAmount}}
            </h2>
            <h2>
              Your Wallet: €{{this.patienceCount}}
            </h2>
            <input id="buy" type="submit" value="Buy" @click="checkoutEnded"/>
          </div>
        </div>
      </template>

      <!-- Stage 6: Terms and conditions -->

      <template v-if="showConditions">
        <div class="main conditions">
          <h1>Terms and Conditions</h1>
          <p>
            Before you continue, please read and accept our terms and conditions
          </p>
          <textarea readonly ref="textArea" v-model="conditions.text" :style="{ fontSize: fontSize + 'px', lineHeight: lineHeight + 'px', fontFamily: fontFamily }" @scroll="userScroll"></textarea>
          <input type="submit" value="Accept and continue" @click.stop="conditionsEnded">
          <p>
            {{this.warning}}
          </p>
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

    </main>

    <footer>
      <div class="box">
        <div class="row" v-for="category in categories">
          <p>{{category.name}}</p>
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
// import myVideo from 'vue-video'
import _ from 'lodash'

export default {
  name: 'home',
  data () {
    return {
      msg: '',
      showVideo: false,
      showQuestionnaire: false,
      textbox: '',
      checked: [],
      picked: '',
      qC: 0,
      showProduct: true,
      productCount: 0,
      showCaptcha: false,
      captchaCheck: false,
      checkString: '',
      showCheckout: false,
      showConditions: false,
      fontSize: 13,
      fontFamily: 'Museo100-Regular',
      lineHeight: 15,
      popUp: false,
      videoPop: true,
      isMinimized: false,
      comeBack: false,
      userInteract: false,
      patienceCount: 0,
      patienceAdd: '',
      parentMsg: '',
      captcha: '',
      cC: 0,
      allowEnd: false,
      warning: '',
      video: {
        sources: [
          {
            src: './static/splash-video.mp4',
            type: 'video/mp4'
          },
          {
            src: './static/splash-video.mp4',
            type: 'video/mp4'
          }
        ],
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
      questions: [
        {
          q: 'What city do you live in?',
          a: [ 'The Hague', 'Rotterdam', 'Amsterdam', 'Utrecht', 'Eindhoven', 'Other' ],
          type: 'dropdown'
        },
        {
          q: 'Pick an aesthetic',
          a: [ 'Fun', 'grungy', 'minimal', 'bombastic', 'quirky', 'normcore', 'cozy', 'cute', 'dark', 'no preference' ],
          type: 'toggle'
        },
        {
          q: 'In what year did you abandon your dreams?',
          a: [ '' ],
          type: 'dropdown-year'
        },
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
          q: 'Which category of products/services are you looking for?',
          a: [ 'Food', 'Clothing', 'Revenge', 'Time management', 'Temperature management', 'Anger management', 'Beauty/wellness', 'Home', 'Kitchen', 'Pets', 'Design', 'Advertising', 'Gardening', 'Other', 'Surprise me' ],
          type: 'list'
        },
        {
          q: 'What is most important for you in a product or service?',
          a: [ 'Sleek design', 'Efficiency', 'Easy to use', 'Practicality', 'Cost' ],
          type: 'list'
        },
        {
          q: 'How do you like your eggs?',
          a: [ 'I hate eggs', 'poached', 'soft boiled', 'hard boiled', 'fried', 'sunny side up', 'scrambled', 'raw', 'omelette', 'every which way' ],
          type: 'option'
        },
        {
          q: 'Pick one',
          a: [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ],
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
          q: 'Find the cheese',
          a: [ './static/cheese_room.jpg' ],
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
          q: 'Spot the difference:',
          a: [ './static/fire.jpg', './static/ice.jpg' ],
          type: 'image'
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
      products: [
        {
          title: 'Bread Gloves',
          description: 'The perfect gift for the bread lover in your life or someone who just can’t keep their hands out of the food. These bread gloves makes it so easy to make a sandwich  One size fits all! Comes in 4 different flavours!',
          src: './static/bread-gloves.jpg',
          price: 15,
          reviews: [
            {
              user: 'loosingweight',
              stars: '★★★',
              text: 'A bit disappointed. This looks like a fantastic idea, but kept dropping the meat and biting my fingers. Still tasty tho.'
            },
            {
              user: 'incr_ediblel1fe',
              stars: '★★★★',
              text: 'My sandwiches have never been tastier, but my fingers won’t stop bleeding!'
            }
          ]
        },
        {
          title: 'Sauna Pants',
          description: 'Nothing makes you feel more invigorated and refreshed than a steaming sauna, relieving your body of excess stored water, which may contain toxins. But who has the time to go to a spa anymore? Plus, the sauna experience can be expensive. Not anymore! Introducing the revolutionary sauna pants! The at home sauna experience that you can enjoy when you want to and where you want to! Right in the comfort of your own home or office. All you do is strap it on and adjust the heat. You instantly feel your muscles soothed by a penetrating deep warm heat. The sauna pants work just like a sauna creating a moist heat sweating out unwanted excess water around your midsection and thighs, right where you need it the most! May help you lose thigh weight!!',
          src: '',
          price: 30,
          reviews: [
            {
              user: 'blubabyboi',
              stars: '★★★★★',
              text: 'Steamy. I love feeling the heat in my lower body.'
            }
          ]
        },
        {
          title: 'Pet Petter',
          description: 'You love your cat/dog Felix/Fifi/Fido but also don’t always have time to play with him/her. Now Felix/Fifi/Fido sulks around depressed, feeling unloved and lonely. Does this sound like your pet? Then we have a solution for you. The pet petter is a paddle that will leave your pet feeling satisfied while you can focus on your work. Also good for animal lovers who are allergic to their pets. Rechargeable for hotel use. 6 de-flea pads included. 4 speeds/4 hair lengths',
          src: '',
          price: 239,
          reviews: [
            {
              user: '11happytogetheragain3',
              stars: '★★★★★',
              text: 'Indeed, never touch your pet again! I love my cat, but am allergic to him. I wanted to make him feel loved, so I bought this pet petter. Now I can appreciate his purrs without sneezing all the time or having my throat close up. We couldn’t be happier together.'
            }
          ]
        },
        {
          title: 'EZcracker',
          description: 'EZcracker. It’s in the name.',
          src: '',
          price: 10,
          reviews: [
            {
              user: 'ised_nvm',
              stars: '★★★★★',
              text: 'A clean crack every time! I used to have so much trouble cracking eggs. Either the eggshell would fall in and I’d have crunchy eggs, or accidentally get egg on the floor and have to spend so much time mopping it all up. Never again!'
            },
            {
              user: 'prof_eggspelliarmus',
              stars: '★★★',
              text: 'As far as my egg gadget collection goes, this one is not as interesting as the rest. But, it does work. I just wish it looked sexier.'
            }
          ]
        },
        {
          title: 'Air Conditioned Shoes',
          description: 'Cool shoes for hot people. Go faster and further without even breaking a footsweat.',
          src: './static/bread-gloves.jpg',
          price: 350,
          reviews: [
            {
              user: 'fitness4lyfe',
              stars: '★★★★★',
              text: 'So cool! Finally a cool enough shoe for hot people'
            }
          ]
        },
        {
          title: 'Wristify',
          description: 'What if you could control how you feel anytime anywhere? Humans have been using fire and water to heat or cool for thousands of years. At wristify, we combine physiology and material science to harness the effects of temperature. It can heat when you’re cold, and cool when you’re hot, and interface with our growing world of devices and people. And we’ve engineered it all into a wristband. A fancy lookin’ one.',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'phil_the',
              stars: '★★★★★',
              text: 'I use it mostly on the golf course'
            },
            {
              user: 'mr_fancypants',
              stars: '★★★★★',
              text: 'Looks fancy, feels good.'
            }
          ]
        },
        {
          title: 'Exhaust Burger',
          description: 'If you’re always on the go and have little time to prepare your lunch, you can save some time with this auto food smoker. All you need is a car, food processor, and this attachment. Process your food, pack it in the smoker, and drive. By the end of your trip, you’ll end up with a tasty smoked meal.',
          src: '',
          price: 56,
          reviews: [
            {
              user: 'fedor4fan',
              stars: '★★★',
              text: 'Smells a bit smoggy… but still edible!'
            },
            {
              user: 'automan69',
              stars: '★★★',
              text: 'I’m really on the fence with this one. I mean, I like the smoky flavour it gives to my breakfast, but Is it ok to eat things that are cooked by car fuel? Where’s the science behind this?'
            }
          ]
        },
        {
          title: 'Egg Minder',
          description: 'The contemporary smart egg tray. So smart! So egg! So tray! The smart egg tray lets you know how many eggs you have left in the fridge while you are out at the grocery store via its built-in WiFi connectivity (Driven by the Electric Imp card) and the Wink smartphone app. The tray features a sensor installed in each egg slot that can help you keep track of recommended expiration dates based on when they were first placed in the carton and a built-in LED to alert you to the freshest eggs remaining in the last batch.',
          src: '',
          price: 40,
          reviews: [
            {
              user: 'prof_eggspelliarmus',
              stars: '★★★★',
              text: 'I am an avid egg gadget collector. I love eggs and I love this device.'
            },
            {
              user: 'hubby581',
              stars: '★★★★★',
              text: 'I used to get in trouble with my wife for buying too many eggs. Now with this smartphone app, I know exactly how many eggs I need to buy. Thank you Egg Minder, for reducing my domestic conflicts!'
            },
            {
              user: 'sadfacemobil3',
              stars: '★',
              text: 'I bought this but forgot I don’t have wifi at home. Now it’s just an expensive egg tray.'
            }
          ]
        },
        {
          title: 'Grovio',
          description: 'Grovio is a smart solution for smarter homes. It’s an enjoyable and intuitive way to interact with your houseplants. Grovio will never forget to water them. Grovio will express your plants’ needs directly through your smartphone. All your Grovio devices can be linked to a single smartphone application. Oleksandr Ivanov, a founder of Techware says, “People are busy with lots of stuff everyday but it shouldn’t influence vulnerable and fragile plants”. Now you can keep your plants healthy and watered for only €175!',
          src: '',
          price: 175,
          reviews: [
            {
              user: 'ravenandjames4eva',
              stars: '★★★',
              text: 'Worth it! I think? At least it looks nice?'
            },
            {
              user: 'modernbachelor',
              stars: '★★★★',
              text: 'The sleekest sexiest most expensive watering device ever! Who cares about my plants? I love the way it makes my home look fancy. Now I’m really a modern bachelor'
            }
          ]
        },
        {
          title: 'DeviceFocus 3000',
          description: 'With all the light and people around you, it can be really difficult to focus on your work. Now with the DeviceFocus 3000, you can block out the distraction of the outside world and funnel all your energy to your laptop, phone, or other device. The DeviceFocus 3000 is a comfy hood that attaches your face directly to your device. Add to your health goth aesthetic by attaching to your hoodie. One size fits all.',
          src: '',
          price: 40,
          reviews: [
            {
              user: 'oscarwilderthanthou',
              stars: '★★★★',
              text: 'I’m a freelance writer who doesn’t have a workspace and often has to work in busy cafes. I get easily distracted by the annoying conversations between people around me and sometimes can’t even type a sentence in one day. Thanks to the DeviceFocus 3000, I look cool and am almost done with my debut novel! The only downside is that it makes it difficult to drink coffee while I’m working...'
            },
            {
              user: 'vampfrk',
              stars: '★★★★★',
              text: 'I hate sunlight. This item is perfect for me. '
            },
            {
              user: 'anon',
              stars: '★',
              text: 'Broke on first try.'
            }
          ]
        },
        {
          title: 'Wireless rechargeable warming gloves',
          description: 'FITS IN YOUR GLOVES! When days are bitter cold, gloves alone are not enough! Slip the Wireless Rechargeable Warming Glove Liners underneath your regular gloves for hours of steady, soothing warmth. Made of micro-thin elastic material plus high-tech carbon fiber for a great fit. Simply click a button to select your warming level (low/med/high) for up to 5 hours of comfort. They\'re so soft and warm, you won\'t want to take them off!',
          src: '',
          price: 60,
          reviews: [
            {
              user: 'john23',
              stars: '★★★',
              text: 'I bought a pair but nt sure they r safe to be worn in the rain or snow. will update'
            },
            {
              user: 'beckywthegoodhair',
              stars: '★★★★★',
              text: 'A really good christmas gift idea for sure. I know they are a little more expensive than regular gloves but you just get so much more out of them.'
            }
          ]
        },
        {
          title: 'bluetooth yoga speaker mat',
          description: 'The rechargeable Bluetooth Yoga Speaker Mat pairs easily with your iPhone, iPad, Samsung Galaxy or other Android device to stream your favorite wireless music for up to 4 hours. It has two built-in 3-Watt stereo speakers, plus onboard buttons to control tracks (play/pause/forward/backward/volume). Your device stays safe and secure, up to 30 feet away. Features LED status light and an auxiliary line in jack in to connect iPods, CD players and other non-Bluetooth devices. Available in Lavender or Orange. Includes case.',
          src: '',
          price: 35,
          reviews: [
            {
              user: 'fit_2legs',
              stars: '★★★★',
              text: 'Now that the speakers are so close to my heart center I feel more present.'
            }
          ]
        },
        {
          user: 'loveisxtc',
          stars: '★★★★★',
          text: 'Namaste!'
        },
        {
          title: 'Bye Bye Germs UV Rechargeable Sanitizing Wand',
          description: 'Get outta here, mold. Bring your healthy home to a whole new level of clean with the Verilux UV Rechargeable Sanitizing Wand. This handy cordless device uses Ultraviolet-C light to kill up to 99.9% of germs, viruses, MRSA, H1N1 and other micro-organisms on solid, non-porous surfaces. It sanitizes without chemicals, irritants or residues, and operates at full power for one hour on a single charge. Simply wave it over countertops, keyboards, cell phones, pillows, cribs, mattress covers, upholstery, pet beds, hotel bedding, baby items and more.',
          src: '',
          price: 42,
          reviews: [
            {
              user: 'penny_55',
              stars: '★★★★',
              text: 'I use it after cleaning and I definitely feel the difference!'
            },
            {
              user: 'missyes',
              stars: '★★★',
              text: 'UV is flickering sometimes. Is that normal? I guess it does that when it detects dangerous viruses.'
            }
          ]
        },
        {
          title: 'Travel Trac Book Caddy',
          description: 'Trying to find time to catch up on your reading and training? Do both at once with the Travel Trac Book Caddy! Why stop at books? Why not use it for tablet computers mounted in front of your bicycle handlebars? Perfect for all types of reading material. It mounts in seconds to virtually any road and mountain bike.',
          src: '',
          price: 23,
          reviews: [
            {
              user: 'anon',
              stars: '★★★',
              text: 'Great for holding tablets with one drawback, securing bracket needs a better way to attach it to bike. Had to use zip ties to hold it.'
            },
            {
              user: 'user1234',
              stars: '★★★★★',
              text: 'This way I can study for courses and exercise at the same time! Very sturdy.'
            }
          ]
        },
        {
          title: 'Tailio litter box',
          description: 'Easy simple wellness. Tailio is designed to blend seamlessly into your cats surroundings as it rests under the litter box. Cats go about their business as usual, while Tailio works in the background to help you know when they need your care. Works with multiple cats. Easy for cats. Simple for owners. Share info with vet.',
          src: '',
          price: 36,
          reviews: [
            {
              user: 'techguru91',
              stars: '★★★★',
              text: 'I recommend this product if you really care about your little one.'
            },
            {
              user: 'catdaddy',
              stars: '★★★★★',
              text: 'It is an amazing innovation. I have 13 cats and they are all healthy and happy!'
            },
            {
              user: 'petclubbbb',
              stars: '★★★★★',
              text: 'My cat even sleeps in it. So smart! Love it!'
            }
          ]
        },
        {
          title: 'Triple Snowball Blaster Pro',
          description: 'Why throw snowballs when you can launch them instead? The newly redesigned Triple Snowball Blaster shoots snowballs up to 80 feet with amazing accuracy. First, use the detachable snowball press to make three perfect snowballs. Then, load a snowball into the ergonomic “easy pull” launcher… and let it fly. Your outdoor opponents will raise the white flag when they see you packing the Triple Snowball Blaster! Includes vinyl target. Ages 8+',
          src: '',
          price: 28,
          reviews: [
            {
              user: 'kyle',
              stars: '★★',
              text: 'Not very impressive Snowball launcher is hard to pull back especially for children'
            },
            {
              user: 'bcweibl736',
              stars: '★',
              text: 'I do not know, but I do know I would not buy another one. I live in Alaska, all different types of snow and it does not work very well at all.'
            }
          ]
        },
        {
          title: 'Loop circular shower',
          description: 'The Loop is an outdoor luxury shower system, spraying water on the user from all around the interior of the circle. The Loop\'s shape was inspired by the motions of waves. It can be used indoors as well as outside and includes an array of special functions to help personalize the system and create a multi-sensory experience.',
          src: '',
          price: 865,
          reviews: [
            {
              user: 'qtlife',
              stars: '★★★★★',
              text: 'High performance! Good pressure!'
            },
            {
              user: 'chiclivin',
              stars: '★★★',
              text: 'A bit disappointed. It didn’t fit into my bathroom, but I can still use it in the garden. Good for the grass.'
            },
            {
              user: 'bcweibl736',
              stars: '★',
              text: 'I do not know, but I do know I would not buy another one. I live in Alaska, all different types of snow and it does not work very well at all.'
            }
          ]
        },
        {
          title: 'Amazing Lamp',
          description: 'Do you wake up often at night for soothing glass of milk and don’t want to bother other family members with light? Then this simple, portable and beautiful lamp designed by Smart Solutions is for you. The lamp can be lifted out of the stand and used as a portable lighting solution when needed.',
          src: '',
          price: 55,
          reviews: [
            {
              user: 'greg',
              stars: '★★★★',
              text: 'My grandma was impressed!'
            }
          ]
        },
        {
          title: 'SMALT',
          description: 'SMALT is the world\'s first interactive centerpiece and smart salt dispenser designed to enhance your dining experience. It’s an interactive conversation piece! Play your favorite music through the Bluetooth speaker, set the ambiance with color-changing mood light, and dispense salt in any amount you please. SMALT app lets you simply shake, pinch, or choose the measurement of salt you desire right from your phone, via Alexa or device itself. Dance to the beat and shake your salt out to amuse your guests or rock on your own.',
          src: '',
          price: 126,
          reviews: [
            {
              user: 'homechef',
              stars: '★★★★',
              text: 'Now I don\'t have to think about whether I\'m using the right amount of salt.'
            },
            {
              user: 'lokiki8',
              stars: '★★★★★',
              text: 'Sooo great with dinner guests. I love hosting dinner parties but sometimes get stressed out having to cook AND entertain my guests. SMALT takes hosting easier and more fun'
            }
          ]
        },
        {
          title: 'Poopsenders',
          description: 'Looking for a great gag gift? Has some one really pissed you off? Don\'t get mad, GET EVEN. Send that special someone a big stinky pile of poop anonymously. We will send your friend or enemy a healthy helping of some of the nastiest, stinkiest, fresh poop packages you have ever seen. We have several varieties of poop that we can send, including a special poop of the month. You can even get a monthly subscription.',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'maryjane',
              stars: '★★★★',
              text: 'I sent a pile of poop to my neighbor that lets his dog shit in everybody\'s yard. He must have gotten the message because now he carries a plastic bag around with him and actually cleans up after the dog. He never did that before. Thanks for a job well done.'
            },
            {
              user: 'suzieq',
              stars: '★★★★★',
              text: 'My ex boyfriend shit on me by cheating on me, so I thought I would shit on him. Thanks! '
            }
          ]
        },
        {
          title: 'Someone to wait in line for you',
          description: 'Need someone to hold your place in line at that new cupcake shop? Or at a Disneyland ride? Or Albert Heijn during rush hour? Or do you just hate crowds? Now you don’t have to rely on strangers who really just want to take your spot. Hire someone to stand in line for you at any time of the day, in any environment, during any kind of weather. Get a quote here. You can choose from our employees. By clicking on their profile you can see their schedule.',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'janynjack',
              stars: '★★★★★',
              text: 'Thomas sent us pictures and kept us updated the entire day. We would definitely use his service again.'
            },
            {
              user: 'lcinty',
              stars: '★★★★',
              text: 'Fantastic! I could do bunch of other thing in the meanwhile, like shopping!'
            }
          ]
        },
        {
          title: 'Anger Room',
          description: 'We believe that sometimes it’s better to just do what you feel and lash out when you need to!  And what better place to do that without judgement, consequences or public humiliation than in an Anger Room? Anger Room provides locations where you can let your hair down, gear up and destroy real-life mocked rooms that simulate an actual workplace, living area, kitchen and more. Complete with glass, mannequins, TVs, tables and many, many more breakable items. You may enter highly upset but when you leave, the rest of your day will be lemonade compared to what could have happened if you didn’t give us a visit :) Good for frustrated employees, students, stressed parents, couples, parties, corporate events.',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'dannyboi',
              stars: '★★★★★',
              text: 'I go once a week. Now I don\'t think about punching my boss anymore'
            }
          ]
        },
        {
          title: 'The Ad Twins',
          description: 'You may recognize us as the wwwebshop twins from this site, but we are also represent many other people, products, and businesses. The appearance of TWINS is eye-catching & fascinating! Advertise your website, product or music with The Ad Twins Team! Top rated seller-100% rating, more than 9,000 orders worldwide! Pay a small extra fee for different costumes, adding extra graphics or music, or requesting a green screen behind us!',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'corporatewolf',
              stars: '★★★★★',
              text: 'The ad twins are bsolutely committed to their craft. They could sell anything. So what are you waiting for? Hire the ad twins.'
            }
          ]
        },
        {
          title: 'QuickQT',
          description: 'QuickQT offers a range of talented actors who can be there for you on call If you need a last minute date for a wedding, to make your ex jealous, to pose as your partner so your parents will stop bugging you about why you’re still single. Select the characteristics you want in your QuickQT partner and fill out some of your details so your QuickQT can learn all they need to learn about you. Once we find a QuickQT in your area, we’ll connect the two of you through our QuickQT app and they will instantly slip into their role as your partner. Our QuickQts are professional actors, so just relax and be yourself. Your QuickQT will do the rest to make your friends and exes jealous, and your parents shut up. There are hundreds of beautiful people to choose from so throw out your cardboard girl/boyfriend and sign up for QuickQT!',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'eligblebachelor',
              stars: '★★',
              text: 'My QuickQT was too convincing. My parents fell in love with her, I fell in love with her. Why won\'t she call me back?'
            }
          ]
        },
        {
          title: 'Plant Whisperer',
          description: 'If you\'ve ever worked with live flowers or plants, you know that they require special care to survive and thrive. If you’ve tried everything but your plants still aren’t showing their full potential, try a kind word. We have a number of skilled and experienced plant whisperers who will come to your garden to give your plants the gift of human breath and storytelling. Research shows that plants respond positively to exposure to sounds. Our whisperers are skilled storytellers and conversationalists trained to optimize their lung capacity, carbon dioxide output, and voice projection to ensure a full resonant tone for up to 30 minutes straight. Try our services and see the full effects on your garden. Cashback guaranteed if your plants do not improve their growth after one week.',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'amateurgreenfingerz',
              stars: '★★★★★',
              text: 'Like magic'
            }
          ]
        },
        {
          title: 'MemeMe!',
          description: 'Memes can cheer you up, affirm your feelings, deliver news, and so much more. MemeMe! Is a customizable daily meme service for all your meme needs. This service comes in the form of an app that is attached to a pulse reader and EEG reader to read your emotional response. Our emotion based algorithms match your emotional data to an updated database of memes which we send to you at an adjustable rate. If we don’t have the right memes, our algorithms will generate a meme for you. Our memes are updated to the second so you can be the first of your friends to see and share the newest memes. Whatever your meme needs are at the moment, we will deliver.',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'mimememe',
              stars: '★★★',
              text: 'It\'s chill. Makes you look a little silly, but great when you\'re bored. I recommend it just for the satisfaction of getting memes before your friends do'
            }
          ]
        },
        {
          title: 'Invisible Boyfriend/Girlfriend',
          description: 'What\'s an invisible boyfriend/girlfriend? a digital version of a real boyfriend/girlfriend without the baggage. An Invisible Boyfriend or Girlfriend can help you manage real-world distractions. Put simply, this platform helps you create credible, reasonable stories that you can bring home to curious mom, your buddies, and coworkers. These stories are backed by virtual and real-world social proof. How does it work? Build him/her to your specifications. You choose his/her age, photo, and personality. We\'ll help you set the scene for how you met. Just fill in the blanks. Conversations are powered by real creative writers. No Bots! This service includes text messaging, personalized notes, and photos.',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'superfocus2000',
              stars: '★★★★★',
              text: 'I\'m a workaholic with very little time or interest for a love life. I subscribed to this eerily realistic service two months ago. My parents have finally stopped bugging me about when I\'ll "settle down" which is fantastic. Highly recommend to other workaholics'
            }
          ]
        },
        {
          title: 'The User is My Mom: UX testing by Moms',
          description: 'Before you launch a website, it’s a good idea to have a UX service test it to make sure it’s free of bugs and easy to use. But if your target audience includes moms or anyone who’s not super tech-savvy, you might benefit from using this testing service that will give you a look at how Scotty\'s moms sees your website. Scotty\'s mom yells at her computers, doesn\'t know what a twitter is, and struggles to find windows she\'s minimized',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'superfocus2000',
              stars: '★★★★★',
              text: 'Scotty\'s mom is sweet, honest, and has really allowed me to design a more accessible website.'
            }
          ]
        },
        {
          title: 'Personal Paparazzi',
          description: 'In today\'s culture of self §promotion and Insta-celebrities, nothing is more paramount to your popularity than a long and dramatic photo trail that documents the banalities of your daily life: getting groceries, walking your dog, cheating on your spouse and so on. But who will sell pictures of you sleeping into your car to tabloids, attracting a flurry of press and attention to your otherwise mundane existence? This is where our Paparazzi come in. Our Paparazzi are interactive photojournalists using flattery and comedy to get people excited about your event, while capturing some of the best candid images. We bring the Hollywood red carpet experience to your life. Experience the celeb within.',
          src: '',
          price: 'get quote',
          reviews: [
            {
              user: 'mizzfame',
              stars: '★★★★★',
              text: 'Makes me feel like a staaaaar'
            }
          ]
        }
      ],
      captchas: [
        {
          value: 'not human',
          src: './static/captcha.jpg'
        },
        {
          value: 'pervert we',
          src: './static/captcha2.png'
        },
        {
          value: 'contend because',
          src: './static/captcha3.png'
        }
      ],
      conditions: {
        text: `THE LEGAL \n AGREEMENT SET OUT BELOW GOVERNS YOUR PURCHASE OF PRODUCTS AND SERVICES FROM wwwebshop.online. TO AGREE TO THESE TERMS, CLICK "AGREE". IF YOU DO NOT AGREE TO THESE TERMS, DO NOT CLICK "AGREE", AND DO NOT USE wwwebshop.online.\nA. THE wwwebshop.online TERMS OF SALE\nWwwebshop.online is not responsible for any injuries or discomfort caused during the use of our website such as but not limited to headaches, frustration, and/or anger. Wwwebshop.online is merely a mediator for third party sellers and is not responsible for any products, beliefs, words, or behaviour from third party sellers. Wwwebshop.online is not responsible for returns, compensation for any reason, wwwebshop.online is wwwebshop.online. Wwwebshop.online is the provider of the Purchase Programme (the "PP Service"), which (a) for the wwwebshop.online permits approved business and educational institutions to purchase services or products in bulk for distribution to, and use by, individual consumers", families, horses, persons employed by or affiliated with the institution, such as contractors, employees, agents, and, in the case of educational institutions, enrolled students authorised by you in accordance with the Terms and Conditions, or approved educational institutions that are schools or school districts (excluding without limitation libraries) to purchase services or products in bulk, solely for distribution to, and use by, persons who are either employees, faculty or teacher's aides (regardless of whether they are directly employed by the institution) at the institution or registered as students at the institution, or (ii) institutions solely for distribution to, and use by, persons employed by or affiliated with the institution, such as contractors, employees and agents, in accordance with the iBooks Store Terms and Conditions, as applicable. Such App Store Products and Products purchased in bulk are collectively defined as "Volume Content". The end users affiliated with your institution to which you distribute the Volume Content including without limitation accounts created as Managed wwwebshop.online IDs (“MAIDs”) are collectively defined as "Authorised End Users". You agree that your use of the VPP Service and the Volume Content will be subject to these terms ("VPP Terms") as well as the terms and conditions and usage rules applicable to wwwebshop.online which are hereby incorporated by reference (collectively, "Terms"). In the event of any conflict or inconsistency, the VPP Terms shall control.\nNETHERLANDS SALES ONLY\nThe Service is available to you only in the Netherlands, its territories, and possessions, and Content Codes may only be redeemed by your Authorised End Users in Hong Kong. App Store Volume Content Codes may only be distributed to your Authorised End Users in Japan, but App Store Volume Content may be assigned via Managed Distribution to your Authorised End Users in any country where such Volume Content is commercially available, subject to change at any time. Your use of the VPP Service for the purchase of app content is solely with the wwwebshop.online Store in Geneva, and any subsequent downloads or assignments shall not create a separate agreement or sales transaction between you and any other wwwebshop.online entity. You agree that you shall not use the VPP Service to circumvent the laws of any country or restrictions set forth by providers of the Volume Content.\nPAYMENTS, TAXES, AND REFUND POLICY\nYou agree that you or the purchasing authority associated with your MAID will pay for all Volume Content you purchase through the VPP Service, that if you are using a MAID, you are authorised to make such purchases on behalf of the purchasing authority associated with your MAID, and that wwwebshop.online may charge your payment method for any products purchased and for any additional amounts (including any taxes and late fees, as applicable) that may be accrued by or in connection with your Account. You are responsible for the timely payment of all fees and for providing wwwebshop.online with a valid payment method for payment of all fees. All fees will be billed to the payment method you designate during the registration process.\nYour total price will include the price of the Volume Content plus any applicable sales tax based on the bill-to address and the sales tax rate in effect at the time of purchase. We will charge tax only in states where digital goods are taxable. You understand and agree that you shall be responsible for determining and paying any taxes or levies resulting from your assignment of App Store Products to Authorised End Users in territories other than the territory in which Your VPP wwwebshop.online ID is registered.\nIf your order is being placed on behalf of a tax-exempt organisation or individual, please contact wwwebshop.online. Please be prepared to provide proof of state tax-exempt status for the state where the product is purchased.\nAll sales are final.\nPrices for Volume Content offered via the Service may change at any time, and the Service does not provide price protection or refunds in the event of a price reduction or promotional offering.\nIf an wwwebshop.online product becomes unavailable following a transaction but prior to initial download, your sole remedy is a refund. Should such refund be granted, wwwebshop.online reserves the right to disable unused Content Codes and also the ability to assign Volume Content via Managed Distribution. If technical problems prevent or unreasonably delay delivery of your Volume Content, your exclusive and sole remedy is either replacement or refund of the price paid, as determined by wwwebshop.online.\nVOLUME PURCHASE PROGRAMME CREDIT\nVolume Purchase Programme Credit is issued and managed by wwwebshop.online Pty Limited ("Issuer").\nVolume Purchase Programme Credit and unused balances are not redeemable for cash and cannot be returned for a cash refund (except as required by law); exchanged; resold; used to purchase Gifts, Gift Certificates, or wwwebshop.online Cards; used to provide Allowances; used for purchases on the wwwebshop.online Online Store; or used in wwwebshop.online Retail Stores. Unused balances are not transferable.\nVolume Purchase Programme Credit purchased in Canada may be redeemed through the Service only in the Philippines.\nVolume Purchase Programme Credit cash value is 1/10 of one cent.\nNeither Issuer nor wwwebshop.online is responsible for lost or stolen Volume Purchase Programme Credit.\nwwwebshop.online reserves the right to close accounts and request alternative forms of payment if a Volume Purchase Programme Credit is fraudulently obtained or used on the Service.\nwwwebshop.online, ISSUER, AND THEIR LICENSEES, AFFILIATES, AND LICENSORS MAKE NO WARRANTIES, EXPRESS OR IMPLIED, WITH RESPECT TO VOLUME PURCHASE PROGRAMME CREDIT, THE VOLUME PURCHASE PROGRAMME, THE APP STORE, THE IBOOKS STORE, OR THEwwwebshop.online STORE, INCLUDING, WITHOUT LIMITATION, ANY EXPRESS OR IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN THE EVENT THAT SUCH VOLUME PURCHASE PROGRAMME CREDIT IS NONFUNCTIONAL, YOUR SOLE REMEDY, AND OUR SOLE LIABILITY, SHALL BE THE REPLACEMENT OF SUCH VOLUME PURCHASE PROGRAMME CREDIT. THESE LIMITATIONS MAY NOT APPLY TO YOU. CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY ALSO HAVE ADDITIONAL RIGHTS.\nRisk of loss and title for Volume Purchase Programme Credit transmitted electronically pass to the purchaser in Germany upon electronic transmission to the recipient.\nCONTENT AVAILABILITY\nwwwebshop.online reserves the right to change content options (including eligibility for particular features) without notice.\nAUDIT RIGHTS\nAs wwwebshop.online may audit the purchases of customers through the VPP Service to ensure that only eligible purchases have been ordered and that all purchase conditions and usage rules have been observed, you agree to keep complete and accurate records of all uses of the Volume Content you purchased. Should an audit disclose after delivery (or should wwwebshop.online otherwise discover) that you were not an eligible purchaser at the time you placed your order or that you have not observed all of the conditions applicable to your purchase, wwwebshop.online may:\n• Disable your VPP wwwebshop.online ID or MAID;\n• If you placed your order by credit card, to charge to your credit card the difference between the amount you paid for the delivered goods and the price that wwwebshop.online charged the general public for the same goods via the VPP Service, in effect on the date that you placed your order; and\n• If you paid by a means other than credit card, to (a) invoice you for the difference between the amount that you paid for the delivered goods and the price thatwwwebshop.onlinecharged the general public for the same goods via the VPP Service, payable in fifteen days from the date of the invoice, and (b), should you fail to pay the invoice when due, institute legal action against you in a court of competent jurisdiction, with the prevailing party entitled to attorneys' fees.\nShould wwwebshop.online not offer the specific products that you purchased through the VPP Service, your payment method will be charged or you will be invoiced the difference between the amount you paid for the delivered goods and the price that wwwebshop.online charged the general public for the closest equivalent goods via the Service, in effect on the date that you placed your order.\nwwwebshop.online shall have the right to request supplementary information and audit relevant records to confirm your compliance with the Terms.\nCONTENT DISTRIBUTION\nEach App Store Product or iBooks Store Product purchased as Volume Content via the VPP Service may be provided to your Authorised End Users either (i) via direct transmission to the wwwebshop.online account or MAID of each Authorised End User ("Managed Distribution"), (ii) via distribution of alphanumeric codes generated by wwwebshop.online ("Content Codes") which are redeemable on the App Store for specific application content, or on the iBooks Store for specific book content; or (iii) for apps only, by assignment directly to an iOS device, in which case (a) separate purchases must be made for each unique device (i.e. a single licence may not be simultaneously shared by multiple devices); and (b) you shall be deemed the "end-user" for purposes of any End User Licence Agreements, Terms of Use, or other agreements engaged by your Authorised End Users relating to any App Store Volume Content.\nMANAGED DISTRIBUTION\nUpon completion of your purchase of Volume Content, you will be entitled to assign the specific Products that you have purchased in the quantity selected, each of which may be assigned to an wwwebshop.online or MAID account owned or controlled by you or one of your Authorised End Users or, in the case of App Store Volume Content, to a unique device owned or controlled by you or one of your Authorised End Users. This entitlement will not expire, subject to availability of the specific products. Using a VPP wwwebshop.online ID with a mobile device management system ("MDM"), you will be able to invite your Authorised End Users to associate their wwwebshop.online account or device with your VPP wwwebshop.online ID and, upon the Authorised End User's acceptance, you may assign iBooks Store Products and App Store Products to them or, in the case of App Store Products, to their devices. In order to receive a product, your Authorised End Users must have valid wwwebshop.online or MAID accounts (subject to acceptance of the Terms), and compatible hardware, software and Internet access.\nYOU UNDERSTAND AND AGREE THAT THE OWNER OF THE wwwebshop.online ACCOUNT TO WHICH AN IBOOKS STORE PRODUCT IS ASSIGNED WILL BECOME THE OWNER OF THAT PRODUCT AND SHALL BE ENTITLED TO ALL ASSOCIATED RIGHTS, SUBJECT TO THE TERMS. SUCH PRODUCTS ARE NON-TRANSFERABLE.\nFor Products: You will retain ownership of each Product regardless of whether it has been assigned to an Authorised End User's wwwebshop.online Account, MAID or a specific device ID. You may revoke the assignment and re-assign the App Store Product to another Authorised End User or device ID subject to certain programme limitations. Once you have revoked an assignment from a particular user or device, that user or device will no longer be authorised to use the App Store Product.\nCONTENT CODES\nFor VPP wwwebshop.online ID purchases, wwwebshop.online may provide you with Content Codes in the quantity you specify when making your purchase, each of which may be redeemed (i) on the App Store for a specific wwwebshop.online Store Product purchased; or (ii) on the wwwebshop.online Store for a specific iBooks Store Product purchased. The Content Codes shall be provided to you electronically via email upon execution of your purchase and such Content Codes shall immediately become active for redemption by your Authorised End Users and shall not expire, subject to availability. You and/or your Authorised End Users may redeem the Content Code only in accordance with the Terms. Each Content Code for an App Store Product must be redeemed to a wwwebshop.online account owned and controlled by your organisation or by one of your Authorised End Users. Each Content Code for an iBooks Store Product must be redeemed to an account owned or controlled by the Authorised End User. YOU UNDERSTAND AND AGREE THAT THE OWNER OF THE REDEEMING wwwebshop.online ACCOUNT WILL BECOME (i) FOR AN APP STORE PRODUCT, THE LICENSEE OF THAT COPY OF THE PRODUCT; AND (ii) FOR AN IBOOKS STORE PRODUCT, THE OWNER OF THAT COPY OF THE PRODUCT, AND SHALL BE ENTITLED TO ALL ASSOCIATED RIGHTS. SUCH LICENSES OR PRODUCTS ARE NON-TRANSFERABLE.\nYou may distribute the Content Codes only to your Authorised End Users and you agree to make the following Authorised End User Terms and Conditions as applicable for the purchased content type readily available on the instrument used to distribute the Content Codes (e.g. certificate, card, email):\nFor apps:\n"Code is redeemable only on the App Store for China. Requires an wwwebshop.onlineaccount, subject to prior acceptance of licence and usage terms. Compatible software and hardware, and internet access (fees may apply) required. Not for resale. Full terms apply; see wwwebshop.online For more information, see wwwebshop.online"\nFor books:\n"Code is redeemable only on the iBooks Store for Nepal. Requires an wwwebshop.onlineaccount, subject to prior acceptance of licence and usage terms. Compatible software and hardware, and internet access (fees may apply) required. Not for resale. Full terms apply; see wwwebshop.onlineFor more information, see wwwebshop.online\nVOLUME CONTENT RESTRICTIONS\nYou may not resell or accept any form of compensation in exchange for distribution of Volume Content nor may you distribute or authorise distribution of the Volume Content to anyone other than your Authorised End Users. You shall be solely responsible for your use of the Volume Content, and for any loss or liability to the content provider or wwwebshop.online therefrom. You may not export iBooks Store or App Store Volume Content for use outside of New Guinea, nor represent that you have the right or ability to do so; you may, however, assign App Store Volume Content to end-users outside of Hungary solely to the extent permitted by these VPP Terms. Risk of loss and transfer of title for the Volume Content pass to you upon electronic transmission to you. wwwebshop.online reserves the right to close any and all applicablewwwebshop.online accounts and request alternative forms of payment if wwwebshop.online determines the Volume Content is fraudulently obtained or used. By using the VPP Service, you agree that you are acquiring Volume Content for use by you and your Authorised End Users on your behalf.\nVolume Content and unused balances are not redeemable for cash and cannot be returned for a cash refund (except as required by law); exchanged; resold; used to provide Allowances; used for purchases on wwwebshop.online. Unused balances are not transferable.\nVolume Content is available through the Service only in Senegal, but wwwebshop.online Store Volume Content may be assigned to Authorised End Users in other jurisdictions where the App Store Volume Content is currently available.\nNeither Issuer nor wwwebshop.online is responsible for lost or stolen Content Codes.\nwwwebshop.online, ISSUER, AND THEIR LICENSEES, AFFILIATES, AND LICENSORS MAKE NO WARRANTIES, EXPRESS OR IMPLIED, WITH RESPECT TO VOLUME CONTENT, THE VOLUME PURCHASE PROGRAMME FOR BUSINESS, THE APP STORE, OR THE IBOOKS STORE, INCLUDING, WITHOUT LIMITATION, ANY EXPRESS OR IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN THE EVENT THAT ANY CONTENT CODE, OR ANY PRODUCT OTHERWISE PURCHASED AS VOLUME CONTENT IS NONFUNCTIONAL, YOUR SOLE REMEDY AND OUR SOLE LIABILITY SHALL BE THE REPLACEMENT OF SUCH CONTENT CODE OR VOLUME CONTENT. THESE LIMITATIONS MAY NOT APPLY TO YOU. CERTAIN LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY ALSO HAVE ADDITIONAL RIGHTS.\nELECTRONIC CONTRACTING\nYour use of the Services includes the ability to enter into agreements and/or to make transactions electronically. YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT AND AUTHORITY TO ENTER INTO THIS AGREEMENT ON BEHALF OF ANY ENTITY YOU REPRESENT, AND TO LEGALLY BIND SUCH ENTITY TO THE TERMS AND OBLIGATIONS OF THIS AGREEMENT. YOU ACKNOWLEDGE THAT YOUR ELECTRONIC SUBMISSIONS CONSTITUTE YOUR AGREEMENT AND INTENT TO BE BOUND BY AND TO PAY FOR SUCH AGREEMENTS AND TRANSACTIONS. YOUR AGREEMENT AND INTENT TO BE BOUND BY ELECTRONIC SUBMISSIONS APPLIES TO ALL RECORDS RELATING TO ALL TRANSACTIONS YOU ENTER INTO ON THIS SITE, INCLUDING NOTICES OF CANCELLATION, POLICIES, CONTRACTS AND APPLICATIONS. In order to access and retain your electronic records, you may be required to have certain hardware and software, which are your sole responsibility.\nTo the extent permitted by applicable law, you agree to indemnify and hold harmless wwwebshop.online, and upon wwwebshop.online's request, defend wwwebshop.online, its directors, officers, employees, independent contractors and agents (each an "wwwebshop.online Indemnified Party") from any and all claims, losses, liabilities, damages, expenses and costs, including without limitation attorneys' fees and court costs, (collectively, "Losses") incurred by an wwwebshop.onlineIndemnified Party and arising from or related to any of the following: (i) Your breach of any certification, covenant, obligation, representation or warranty made in this Agreement; (ii) Your use of the VPP Service. In no event may you enter into any settlement or like agreement with a third party that affects wwwebshop.online's rights or binds wwwebshop.online in any way, without the prior written consent of wwwebshop.online. wwwebshop.online is not responsible for typographic errors.\nLast updated: 27 October, 2016\n• • • • •\nB. ADDENDUM TO APP STORE TERMS AND CONDITIONS\nYou agree that your authorisation is limited to purchasing Volume Content solely for use by your Authorised End Users in accordance with the Terms. Solely as an accommodation to you, wwwebshop.online agrees to permit you to use a single Content Code to sync an App Store Product to multiple devices, up to the number of codes you have purchased (instead of having to redeem a separate code), provided that you meet the following terms:\n• You agree to sync no more copies than the number of codes you purchased.\n• You agree that you shall be fully responsible for any use of and any loss or harm to wwwebshop.online or third parties arising from the codes you purchased and/or sync.\n• You agree to keep complete and accurate records of all uses of the codes you purchased.\n• You understand that this accommodation may only be available for a limited period of time and wwwebshop.online makes no guarantee regarding forward compatibility with future versions of iOS or the availability of this accommodation for new product versions.\n• wwwebshop.online shall have the right to request supplementary information and audit relevant records to confirm your compliance with these Terms.\n• • • • •\nC. ADDENDUM TO IBOOKS STORE TERMS AND CONDITIONS\nIf you are an educational institution, you agree that your authorisation is limited to purchasing multiple copies of iBooks Store Products solely for use by individuals who are employees, faculty or teacher's aides (regardless of whether they are directly employed by the institution) at the institution or registered as students at your school or school district, in accordance with the iBooks Store Terms and Conditions. Solely as an accommodation to you, wwwebshop.online agrees to permit you to purchase multiple copies of the same iBooks Store Product and distribute them for redemption by persons who are either employees, faculty or teacher's aides (regardless of whether they are directly employed by the institution) at the institution or registered as students at your school or school district.\n1.1\tThese terms and conditions shall govern your use of wwwebshop.online.\n1.2\tBy using wwwebshop.online, you accept these terms and conditions in full; accordingly, if you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website.\n1.3\tIf you [register with our website, submit any material to our website or use any of our website services], we will ask you to expressly agree to these terms and conditions.\n1.4\tYou must be at least [18] years of age to use our website; by using our website or agreeing to these terms and conditions, you warrant and represent to us that you are at least [18] years of age.\n1.5\tOur website uses cookies; by using our website or agreeing to these terms and conditions, you consent to our use of cookies in accordance with the terms of our [privacy and cookies policy].\n2.\tCredit\n2.1\tThis document was created using a template from SEQ Legal (http://www.seqlegal.com).\n3.\tCopyright notice\n3.1\tCopyright (c) [year(s) of first publication] [full name].\n3.2\tSubject to the express provisions of these terms and conditions:\n(a)\twe, together with our licensors, own and control all the copyright and other intellectual property rights in our website and the material on our website; and\n(b)\tall the copyright and other intellectual property rights in our website and the material on our website are reserved.\n4.\tLicence to use website\n4.1\tYou may:\n(a)\tview pages from our website in a web browser;\n(b)\tdownload pages from our website for caching in a web browser;\n(c)\tprint pages from our website;\n(d)\t[stream audio and video files from our website]; and\n(e)\t[use [our website services] by means of a web browser],\n\tsubject to the other provisions of these terms and conditions.\n4.2\tExcept as expressly permitted by Section 4.1 or the other provisions of these terms and conditions, you must not download any material from our website or save any such material to your computer.\n4.3\tYou may only use our website for [your own personal and business purposes], and you must not use our website for any other purposes.\n4.4\tExcept as expressly permitted by these terms and conditions, you must not edit or otherwise modify any material on our website.\n4.5\tUnless you own or control the relevant rights in the material, you must not:\n(a)\trepublish material from our website (including republication on another website);\n(b)\tsell, rent or sub-license material from our website;\n(c)\tshow any material from our website in public;\n(d)\texploit material from our website for a commercial purpose; or\n(e)\tredistribute material from our website.\n4.6\tNotwithstanding Section 4.5, you may redistribute [our newsletter] in [print and electronic form] to [any person].\n4.7\tWe reserve the right to restrict access to areas of our website, or indeed our whole website, at our discretion; you must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction measures on our website.\n5.\tAcceptable use\n5.1\tYou must not:\n(a)\tuse our website in any way or take any action that causes, or may cause, damage to the website or impairment of the performance, availability or accessibility of the website;\n(b)\tuse our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity;\n(c)\tuse our website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software;\n(d)\t[conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to our website without our express written consent];\n(e)\t[access or otherwise interact with our website using any robot, spider or other automated means[, except for the purpose of [search engine indexing]]];\n(f)\t[violate the directives set out in the robots.txt file for our website]; or\n(g)\t[use data collected from our website for any direct marketing activity (including without limitation email marketing, SMS marketing, telemarketing and direct mailing)].\n[additional list items]\n5.2\tYou must not use data collected from our website to contact individuals, companies or other persons or entities.\n5.3\tYou must ensure that all the information you supply to us through our website, or in relation to our website, is [true, accurate, current, complete and non-misleading].\n6.\tRegistration and accounts\n6.1\tTo be eligible for [an account] on our website under this Section 6, you must [be resident or situated in the United Kingdom].\n6.2\tYou may register for an account with our website by [completing and submitting the account registration form on our website, and clicking on the verification link in the email that the website will send to you].\n6.3\tYou must not allow any other person to use your account to access the website.\n6.4\tYou must notify us in writing immediately if you become aware of any unauthorised use of your account.\n6.5\tYou must not use any other person's account to access the website[, unless you have that person's express permission to do so].\n7.\tUser login details\n7.1\tIf you register for an account with our website, [we will provide you with] OR [you will be asked to choose] [a user ID and password].\n7.2\tYour user ID must not be liable to mislead and must comply with the content rules set out in Section 10; you must not use your account or user ID for or in connection with the impersonation of any person.\n7.3\tYou must keep your password confidential.\n7.4\tYou must notify us in writing immediately if you become aware of any disclosure of your password.\n7.5\tYou are responsible for any activity on our website arising out of any failure to keep your password confidential, and may be held liable for any losses arising out of such a failure.\n8.\tCancellation and suspension of account\n8.1\tWe may:\n(a)\t[suspend your account];\n(b)\t[cancel your account]; and/or\n(c)\t[edit your account details],\n\tat any time in our sole discretion without notice or explanation.\n8.2\tYou may cancel your account on our website [using your account control panel on the website].\n9.\tYour content: licence\n9.1\tIn these terms and conditions, "your content" means [all works and materials (including without limitation text, graphics, images, audio material, video material, audio-visual material, scripts, software and files) that you submit to us or our website for storage or publication on, processing by, or transmission via, our website].\n9.2\tYou grant to us a [worldwide, irrevocable, non-exclusive, royalty-free licence] to [use, reproduce, store, adapt, publish, translate and distribute your content in any existing or future media] OR [reproduce, store and publish your content on and in relation to this website and any successor website] OR [reproduce, store and, with your specific consent, publish your content on and in relation to this website].\n9.3\tYou grant to us the right to sub-license the rights licensed under Section 9.2.\n9.4\tYou grant to us the right to bring an action for infringement of the rights licensed under Section 9.2.\n9.5\tYou hereby waive all your moral rights in your content to the maximum extent permitted by applicable law; and you warrant and represent that all other moral rights in your content have been waived to the maximum extent permitted by applicable law.\n9.6\tYou may edit your content to the extent permitted using the editing functionality made available on our website.\n9.7\tWithout prejudice to our other rights under these terms and conditions, if you breach any provision of these terms and conditions in any way, or if we reasonably suspect that you have breached these terms and conditions in any way, we may delete, unpublish or edit any or all of your content.\n10.\tYour content: rules\n10.1\tYou warrant and represent that your content will comply with these terms and conditions.\n10.2\tYour content must not be illegal or unlawful, must not infringe any person's legal rights, and must not be capable of giving rise to legal action against any person (in each case in any jurisdiction and under any applicable law).\n10.3\tYour content, and the use of your content by us in accordance with these terms and conditions, must not:\n(a)\tbe libellous or maliciously false;\n(b)\tbe obscene or indecent;\n(c)\tinfringe any copyright, moral right, database right, trade mark right, design right, right in passing off, or other intellectual property right;\n(d)\tinfringe any right of confidence, right of privacy or right under data protection legislation;\n(e)\tconstitute negligent advice or contain any negligent statement;\n(f)\tconstitute an incitement to commit a crime[, instructions for the commission of a crime or the promotion of criminal activity];\n(g)\tbe in contempt of any court, or in breach of any court order;\n(h)\tbe in breach of racial or religious hatred or discrimination legislation;\n(i)\tbe blasphemous;\n(j)\tbe in breach of official secrets legislation;\n(k)\tbe in breach of any contractual obligation owed to any person;\n(l)\t[depict violence[ in an explicit, graphic or gratuitous manner]];\n(m)\t[be pornographic[, lewd, suggestive or sexually explicit]];\n(n)\t[be untrue, false, inaccurate or misleading];\n(o)\t[consist of or contain any instructions, advice or other information which may be acted upon and could, if acted upon, cause illness, injury or death, or any other loss or damage];\n(p)\t[constitute spam];\n(q)\t[be offensive, deceptive, fraudulent, threatening, abusive, harassing, anti-social, menacing, hateful, discriminatory or inflammatory]; or\n(r)\t[cause annoyance, inconvenience or needless anxiety to any person].\n[additional list items]\n11.\tLimited warranties\n11.1\tWe do not warrant or represent:\n(a)\tthe completeness or accuracy of the information published on our website;\n(b)\tthat the material on the website is up to date; or\n(c)\tthat the website or any service on the website will remain available.\n11.2\tWe reserve the right to discontinue or alter any or all of our website services, and to stop publishing our website, at any time in our sole discretion without notice or explanation; and save to the extent expressly provided otherwise in these terms and conditions, you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any website services, or if we stop publishing the website.\n11.3\tTo the maximum extent permitted by applicable law and subject to Section 12.1, we exclude all representations and warranties relating to the subject matter of these terms and conditions, our website and the use of our website.\n12.\tLimitations and exclusions of liability\n12.1\tNothing in these terms and conditions will:\n(a)\tlimit or exclude any liability for death or personal injury resulting from negligence;\n(b)\tlimit or exclude any liability for fraud or fraudulent misrepresentation;\n(c)\tlimit any liabilities in any way that is not permitted under applicable law; or\n(d)\texclude any liabilities that may not be excluded under applicable law.\n12.2\tThe limitations and exclusions of liability set out in this Section 12 and elsewhere in these terms and conditions:\n(a)\tare subject to Section 12.1; and\n(b)\tgovern all liabilities arising under these terms and conditions or relating to the subject matter of these terms and conditions, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty, except to the extent expressly provided otherwise in these terms and conditions.\n12.3\tTo the extent that our website and the information and services on our website are provided free of charge, we will not be liable for any loss or damage of any nature.\n12.4\tWe will not be liable to you in respect of any losses arising out of any event or events beyond our reasonable control.\n12.5\tWe will not be liable to you in respect of any business losses, including (without limitation) loss of or damage to profits, income, revenue, use, production, anticipated savings, business, contracts, commercial opportunities or goodwill.\n12.6\tWe will not be liable to you in respect of any loss or corruption of any data, database or software.\n12.7\tWe will not be liable to you in respect of any special, indirect or consequential loss or damage.\n12.8\tYou accept that we have an interest in limiting the personal liability of our officers and employees and, having regard to that interest, you acknowledge that we are a limited liability entity; you agree that you will not bring any claim personally against our officers or employees in respect of any losses you suffer in connection with the website or these terms and conditions (this will not, of course, limit or exclude the liability of the limited liability entity itself for the acts and omissions of our officers and employees).\n13.\tBreaches of these terms and conditions\n13.1\tWithout prejudice to our other rights under these terms and conditions, if you breach these terms and conditions in any way, or if we reasonably suspect that you have breached these terms and conditions in any way, we may:\n(a)\tsend you one or more formal warnings;\n(b)\ttemporarily suspend your access to our website;\n(c)\tpermanently prohibit you from accessing our website;\n(d)\t[block computers using your IP address from accessing our website];\n(e)\t[contact any or all of your internet service providers and request that they block your access to our website];\n(f)\tcommence legal action against you, whether for breach of contract or otherwise; and/or\n(g)\t[suspend or delete your account on our website].\n[additional list items]\n13.2\tWhere we suspend or prohibit or block your access to our website or a part of our website, you must not take any action to circumvent such suspension or prohibition or blocking[ (including without limitation [creating and/or using a different account])].\n14.\tVariation\n14.1\tWe may revise these terms and conditions from time to time.\n14.2\t[The revised terms and conditions shall apply to the use of our website from the date of publication of the revised terms and conditions on the website, and you hereby waive any right you may otherwise have to be notified of, or to consent to, revisions of these terms and conditions.] OR [We will give you written notice of any revision of these terms and conditions, and the revised terms and conditions will apply to the use of our website from the date that we give you such notice; if you do not agree to the revised terms and conditions, you must stop using our website.]\n14.3\tIf you have given your express agreement to these terms and conditions, we will ask for your express agreement to any revision of these terms and conditions; and if you do not give your express agreement to the revised terms and conditions within such period as we may specify, we will disable or delete your account on the website, and you must stop using the website.\n15.\tAssignment\n15.1\tYou hereby agree that we may assign, transfer, sub-contract or otherwise deal with our rights and/or obligations under these terms and conditions.\n15.2\tYou may not without our prior written consent assign, transfer, sub-contract or otherwise deal with any of your rights and/or obligations under these terms and conditions.\n16.\tSeverability\n16.1\tIf a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect.\n16.2\tIf any unlawful and/or unenforceable provision of these terms and conditions would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.\n17.\tThird party rights\n17.1\tA contract under these terms and conditions is for our benefit and your benefit, and is not intended to benefit or be enforceable by any third party.\n17.2\tThe exercise of the parties' rights under a contract under these terms and conditions is not subject to the consent of any third party.\n18.\tEntire agreement\n18.1\tSubject to Section 12.1, these terms and conditions[, together with [our privacy and cookies policy],] shall constitute the entire agreement between you and us in relation to your use of our website and shall supersede all previous agreements between you and us in relation to your use of our website.\n19.\tLaw and jurisdiction\n19.1\tThese terms and conditions shall be governed by and construed in accordance with [English law].\n19.2\tAny disputes relating to these terms and conditions shall be subject to the [exclusive] OR [non-exclusive] jurisdiction of the courts of [England].\n20.\tStatutory and regulatory disclosures\n20.1\tWe are registered in [trade register]; you can find the online version of the register at [URL], and our registration number is [number].\n20.2\tWe are subject to [authorisation scheme], which is supervised by [supervisory authority].\n20.3\tWe are registered as [title] with [professional body] in [the United Kingdom] and are subject to [rules], which can be found at [URL].\n20.4\tWe subscribe to [code(s) of conduct], which can be consulted electronically at [URL(s)].\n20.5\tOur VAT number is [number].\n21.\tOur details\n21.1\tThis website is owned and operated by [name].\n21.2\tWe are registered in [England and Wales] under registration number [number], and our registered office is at [address].\n21.3\tOur principal place of business is at [address].\n21.4\tYou can contact us:\n(a)\t[by post, using the postal address [given above]];\n(b)\t[using our website contact form];\n(c)\t[by telephone, on [the contact number published on our website from time to time]]; or\n(d)\t[by email, using [the email address published on our website from time to time]].\n[additional list items]\nFree website terms and conditions: drafting notes\nThis is a free version of our standard website terms and conditions document. It is identical to that document, save that this version includes an SEQ legal credit.  In addition to the provisions that would typically be included in any set of website terms and conditions, this document includes provisions covering user accounts and user-generated content (although the latter are not as detailed as in some of our more sophisticated website terms and conditions documents).  If your website does not feature user accounts or interactive features, you may wish to consider our website disclaimer document instead of these terms and conditions.\nSection 1: Introduction\nSection 1.2\nOptional element.\nThe completed document should be easily accessible on the website, with a link from every page.\nSection 1.3\nOptional element. Will all or any website users give their express consent to the terms of this document?\nIdeally, from a legal perspective, all users would be asked to expressly agree to the terms of the document. However, in practice, express consent is rarely sought from casual website visitors. On the other hand, it is easy to obtain the express consent of users who register with the website or submit any material to the website, e.g. by clicking "I accept" on an electronic version of the document. You should retain evidence of the acceptance of the document terms by each such user.\nUnder what circumstances will users be asked to give their express consent to the terms of this document?\nSection 1.4\nOptional element. Are there any age restrictions on the use of the website?\nThe use of websites by minors can be legally problematic. There are a number of different legal issues. For example, under English law, contracts may be unenforceable against minors. Another issue concerns data protection. The law of data protection imposes additional burdens in relation to the processing of any personal data of a minor and personal data provided by a minor. The effects of the law of indecency may also depend upon whether a website is accessible by minors. Obviously, the inclusion of a requirement in your terms and conditions that minors refrain from using a website is no guarantee that they will do so. Where your website is directed at, or likely to be used by, minors, we recommend that you seek specialist legal advice.\nWhat is the minimum age for website users?\nSection 1.5\nOptional element. Does the website use cookies (including session cookies and third party cookies)?\nThe inclusion of this statement in your website legal documents will not in itself satisfy the requirements of the Privacy and Electronic Communications (EC Directive) Regulations 2003 (as amended) concerning consent to the use of cookies. Guidance concerning methods of obtaining such consent is included on the Information Commissioner's website (http://www.ico.gov.uk).\nWhat is the title of the document on the website that contains cookie information?\nSection 2: Credit\nSection: Free documents licensing warning\nOptional element. Although you need to retain the credit, you should remove the inline copyright warning from this document before use.\nSection 3: Copyright notice\nSection 3.1\nWhat was the year of first publication of the relevant copyright material (or the range of years)?\nWho is the principal owner of copyright in the website?\nSection 4: Licence to use website\nThe scope of the licence to use will vary with each site. Consider carefully exactly what your users should be allowed to do with your website and material on your website.\nSection 4.1\nWill audio and/or video files be published on the website?\nWill the website make available any dynamic services to users?\nDescribe the website services in question.\nSection 4.2\nOptional element.\nSection 4.3\nOptional element.\nFor what purposes may the website be used?\nSection 4.4\nOptional element.\nSection 4.6\nOptional element. Are users permitted to redistribute any specific content from the website (e.g. newsletters)?\nWhat types of content are redistributable?\nIn what formats may redistributable content be redistributed?\nTo whom may redistributable content be redistributed?\nSection 5: Acceptable use\nSection 5.1\nShould automated interactions with the website be prohibited?\nWill the website incorporate a robots.txt file?\nShould users be prohibited from using the website for direct marketing activity?\nSection 5.2\nOptional element. Should the use of data collected from the website to contact people and businesses be prohibited?\nSection 5.3\nOptional element.\nWhat standard of veracity etc should user-submitted content meet?\nSection 6: Registration and accounts\nSection 6.1\nOptional element. Do any eligibility criteria apply to account registration?\nWhat eligibility criteria apply?\nSection 6.2\nHow do users register with the website?\nSection 6.3\nOptional element. Will users be permitted to share their accounts?\nSection 6.4\nOptional element.\nSection 6.5\nOptional element.\nAre users permitted to use another person's account on the website with the permission of that other person?\nSection 7: User login details\nSection 7.1\nHow will users' login details be generated?\nWhat account credentials will users have upon account creation?\nSection 7.2\nOptional element.\nSection 7.3\nOptional element.\nSection 7.4\nOptional element.\nSection 7.5\nOptional element.\nSection 8: Cancellation and suspension of account\nSection 8.1\nWhich of these general rights over user accounts does the website operator have?\nSection 8.2\nHow can a user cancel his or her account on the website?\nSection 9: Your content: licence\nSection 9.1\nDefine "your content".\nSection 9.2\nWhat type of licence do users grant to the website operator?\nWhat does the licence allow the website operator to do with user content?\nSection 9.4\nOptional element. Should the website operator be granted a right to bring proceedings in respect of third party infringements?\nSection 9.5\nOptional element. Should users be asked to waive their moral rights (such as the right of paternity and the right to object to derogatory treatment) in the content they submit to the website?\nSection 9.6\nOptional element. Can users edit their own content after it has been posted to the website?\nSection 10: Your content: rules\nSection 10.2\nThis very general prohibition against unlawful user content may be supplemented by rules relating to specific kinds of illegality, as well as prohibitions upon lawful but undesirable content.\nSection 10.3\nOptional element.\nDo you want to expressly prohibit the publication by users of information about how to commit crimes and the promotion of criminal activities?\nShould the depiction of violence be prohibited?\nShould the prohibition on depicting violence be limited to explicit etc violence?\nShould pornographic material be prohibited?\nShould the prohibition on pornographic material be supplemented with a prohibition on lewd, suggestive or sexually explicit material?\nShould untrue, false, inaccurate or misleading content be prohibited?\nShould potentially dangerous advice be prohibited?\nShould spam be prohibited?\nShould offensive etc material be prohibited?\nShould annoying etc material be prohibited?\nSection 11: Limited warranties\nSection 11.1\nOptional element.\nSection 11.2\nOptional element.\nSection 12: Limitations and exclusions of liability\nContractual limitations and exclusions of liability are regulated and controlled by law, and the courts may rule that particular limitations and exclusions of liability in contracts are unenforceable. The courts are particularly likely to intervene where a party is seeking to rely on a limitation or exclusion of liability in its standard terms and conditions, but will also sometimes intervene where a term has been individually negotiated. The courts may be more likely to rule that provisions excluding liability, as opposed to those merely limiting liability, are unenforceable. If there is a risk that any particular limitation or exclusion of liability will be found to be unenforceable by the courts, that provision should be drafted as an independent term, and be numbered separately from the other provisions. It may improve the chances of a limitation or exclusion of liability being found to be enforceable if the party seeking to rely upon it specifically drew it to the attention of the other party before the contract was entered into. Exclusions and limitations of liability in UK contracts are primarily regulated by the Unfair Contract Terms Act 1977 ("UCTA"). Contracts regulated by UCTA cannot exclude or restrict a party's liability for death or personal injury resulting from negligence (Section 2(1), UCTA). Except insofar as the relevant term satisfies the requirements of reasonableness, such contracts cannot exclude or restrict liability: (i) for negligence (which includes a breach of an express or implied contractual obligation to take reasonable care or exercise reasonable skill) (Section 2(2), UCTA); or (ii) for misrepresentation (Section 3, Misrepresentation Act 1967). In addition, if a contract is regulated by UCTA, and one of the parties is dealing on the other's written standard terms of business, then except insofar as the relevant contractual term satisfies the requirements of reasonableness the other party cannot: (i) exclude or restrict his liability in respect of a breach of contract; or (ii) claim to be entitled to render a contractual performance substantially different from that which was reasonably expected of him; or (iii) claim to be entitled, in respect of the whole or any part of his contractual obligation, to render no contractual performance at all (see Section 3, UCTA). UCTA includes various other restrictions, particularly in the case of contracts for the sale of goods and contracts under which possession or ownership of goods passes. If you wish to try to limit/exclude for liability in respect of reckless, deliberate, personal and/or repudiatory breaches of contract, you should specify this in relation to the relevant provision (for example, using the following wording: "The limitations and exclusions of liability in this Clause [number] will apply whether or not the liability in question arises out of any reckless, deliberate, personal and/or repudiatory conduct or breach of contract"). In many circumstances, however, the courts will find these types of limitations and exclusions to be unenforceable. Somewhat different rules apply to limitations of liability in contracts with consumers, and these provisions should not be used in relation to such contracts. These guidance notes provide a very incomplete and basic overview of a complex subject. Accordingly, you should take legal advice if you may wish to rely upon a limitation or exclusion of liability.\nSection 12.1\nDo not delete this provision (except upon legal advice). Without this provision, the specific limitations and exclusions of liability in the document are more likely to be unenforceable.\nSection 12.3\nOptional element. Do you want to attempt to exclude all liability for free services and information?\nThis sort of exclusion is quite common, but unlikely to be enforceable in court.\nSection 12.5\nOptional element.\nSection 12.6\nOptional element.\nSection 12.7\nOptional element.\n"Consequential loss" has a special meaning in English law: it means any loss that, whilst not arising naturally from the breach, was specifically in the contemplation of the parties when the contract was made.\nSection 12.8\nOptional element. If the website operator is a limited liability entity (e.g. a limited company), do you want to expressly exclude liability on the part of officers and employees?\nSection 13: Breaches of these terms and conditions\nSection 13.1\nWill account suspension or deletion be a possibility here?\nSection 13.2\nOptional element.\nDo you wish to specify types of action that are prohibited here?\nDetail the types of action which are prohibited by this provision.\nSection 14: Variation\nChanges to legal documents published on a website will not generally be retrospectively effective, and variations without notice to and/or consent from relevant users may be ineffective.\nSection 14.2\nWill website users be notified of changes to the document?\nSection 14.3\nOptional element. Will registered users be required to consent to variations?\nSection 17: Third party rights\nOptional element.\nThis provision is designed to exclude any rights a third party may have under the Contracts (Rights of Third Parties) Act 1999.\nSection 18: Entire agreement\nSection 18.1\nWhat other documents govern the use of the website?\nSection 19: Law and jurisdiction\nThe questions of which law governs a document and where disputes relating to the document may be litigated are two distinct questions.\nSection 19.1\nThis document has been drafted to comply with English law, and the governing law provision should not be changed without obtaining expert advice from a lawyer qualified in the appropriate jurisdiction. In some circumstances the courts will apply provisions of their local law, such as local competition law or consumer protection law, irrespective of a choice of law clause.\nWhich law should govern the document?\nSection 19.2\nIn some circumstances your jurisdiction clause may be overridden by the courts.\nShould the jurisdiction granted be exclusive or non-exclusive? Choose "non-exclusive" jurisdiction if you may want to enforce the terms and conditions against users outside England and Wales. Otherwise, choose "exclusive jurisdiction".\nThe courts of which country or jurisdiction should adjudicate disputes under the document?\nSection 20: Statutory and regulatory disclosures\nDo the Electronic Commerce (EC Directive) Regulations 2002 apply to the website or is the website operator registered for VAT?\nThis section can be deleted where website operator is not registered for VAT and the Electronic Commerce (EC Directive) Regulations 2002 do not apply. Generally, those Regulations will apply unless a website is entirely non-commercial, i.e. where a website does not offer any goods or services and does not involve any remuneration (which includes remuneration for carrying AdSense or other advertising).\nSection 20.1\nOptional element. Is the website operator registered in a trade or similar register that is available to the public?\nThe Electronic Commerce (EC Directive) Regulations 2002 provide that if you are "registered in a trade or similar register available to the public", you must provide "details of the register in which the service provider is entered and his registration number, or equivalent means of identification in that register".\nWhat is the name of the trade register?\nAt what URL can the trade register be found?\nWhat is the website operator's registration number?\nSection 20.2\nOptional element. Is the website operator subject to an authorisation scheme (e.g. under financial services legislation)?\nThe Electronic Commerce (EC Directive) Regulations 2002 provide that "where the provision of the service is subject to an authorisation scheme" you must provide "the particulars of the relevant supervisory authority".\nWhat is the name of the authorisation scheme to which the website operator is subject?\nWhat authority supervises the authorisation scheme?\nSection 20.3\nOptional element. Is the service provider a member of a regulated profession (e.g. solicitors)?\nThe Electronic Commerce (EC Directive) Regulations 2002 provide that if "the service provider exercises a regulated profession", it must provide "(i) the details of any professional body or similar institution with which the service provider is registered; (ii) his professional title and the member State where that title has been granted; (iii) a reference to the professional rules applicable to the service provider in the member State of establishment and the means to access them".\nWhat is the website operator's professional title?\nWhich professional body regulates the website operator?\nIn which jurisdiction was the professional title granted?\nWhat is the name of the document containing the rules governing the profession?\nAt what URL can the rules be found?\nSection 20.4\nOptional element. Does the website operator subscribe to any codes of conduct?\nThe Electronic Commerce (EC Directive) Regulations 2002 provide that "a service provider shall indicate which relevant codes of conduct he subscribes to and give information on how those codes can be consulted electronically".\nIdentify the codes of conduct in question.\nWhere can the codes be viewed?\nSection 20.5\nOptional element. Is the website operator registered for VAT?\nWhat is the website operator's VAT number?\nSection 21: Our details\nOptional element.\nUK companies must provide their corporate names, their registration numbers, their place of registration and their registered office address on their websites (although not necessarily in this document). Sole traders and partnerships that carry on a business in the UK under a "business name" (i.e. a name which is not the name of the trader/names of the partners or certain other specified classes of name) must also make certain website disclosures: (i) in the case of a sole trader, the individual's name; (ii) in the case of a partnership, the name of each member of the partnership; and (iii) in either case, in relation to each person named, an address in the UK at which service of any document relating in any way to the business will be effective. All websites covered by the Electronic Commerce (EC Directive) Regulations 2002 must provide a geographic address (not a PO Box number) and an email address. All website operators covered by the Provision of Services Regulations 2009 must also provide a telephone number.\nSection 21.1\nWhat is the name of the company, partnership, individual or other legal person or entity that owns and operates the website?\nSection 21.2\nOptional element. Is the relevant person a company?\nIn what jurisdiction is the company registered?\nWhat is the company's registration number or equivalent?\nWhere is the company's registered address?\nSection 21.3\nOptional element.\nWhere is the relevant person's head office or principal place of business?`
      },
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
        },
        {
          name: 'Nothing You Expect, Everything You Deserve®'
        }
      ]
    }
  },
  components: {
    // myVideo
  },
  methods: {
    videoEnded () {
      this.showVideo = false
      this.showQuestionnaire = true
    },
    checkAnswer (value) {
      if (value === 'option' || value === 'image' || value === 'dropdown' || value === 'dropdown-year') {
        console.log('picked an ', value)
        this.nextQuestion()
      }
      if (value === 'textbox') {
        if (this.textbox.length <= 2) {
          this.warning = 'Please elaborate'
        } else {
          this.warning = ''
          this.textbox = ''
          this.nextQuestion()
        }
      }
      if (value === 'toggle') {
        if (this.picked !== '') {
          this.warning = ''
          this.nextQuestion()
        } else {
          this.warning = 'Come on, please pick one'
        }
      }
      if (value === 'list' || value === 'checkbox') {
        if (this.checked.length < 1) {
          this.warning = 'Select at least one answer'
        } else {
          this.warning = ''
          this.textbox = ''
          this.checkbox = ''
          this.nextQuestion()
        }
      }
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
      this.showCaptcha = true
    },
    captchaEnded () {
      console.log('chceking')
      if (this.captchaCheck === true) {
        console.log('next')
        this.showCaptcha = false
        this.showCheckout = true
      } else {
        console.log('stay')
        this.warning = 'Try again'
      }
    },
    checkoutEnded () {
      this.showCheckout = false
      this.showConditions = true
    },
    conditionsEnded () {
      if (this.allowEnd === true) {
        this.showConditions = false
        this.showVideo = true
      } else {
        this.warning = 'Please read the terms before you continue'
      }
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
    randomNeg () {
      return -1 * (Math.ceil(Math.random() * 2))
    },
    setCheck () {
      return this.captchas[this.cC].value.slice(0, this.randomNeg())
    },
    startAdd () {
      this.patienceAdd = setInterval(function () {
        console.log('patience', this.patienceCount)
        this.changes = this.patienceCount + 1
        // console.log(this.changes)
      }.bind(this), 10000)
    },
    outOf (index) {
      let amount = 5 - this.products[this.productCount].reviews[index].stars.length
      return Array(amount + 1).join('☆')
    },
    userScroll: _.throttle(function () {
      let area = this.$refs.textArea
      let current = area.scrollTop + area.offsetHeight
      let full = area.scrollTop + area.offsetHeight
      let qua = area.scrollHeight / 4
      let hal = qua * 2
      let thr = qua * 3
      if (current <= qua) {
        this.fontSize += 0.1
      }
      if (current >= qua && current <= hal) {
        this.fontFamily = 'Museo300-Regular'
        this.fontSize += 1
        this.lineHeight -= 0.1
      }
      if (current >= hal) {
        this.fontFamily = 'Museo500-Regular'
        this.fontSize += 2
        this.lineHeight -= 1
      }
      if (current >= thr) {
        this.fontFamily = 'Museo700-Regular'
        this.fontSize += 3
        this.lineHeight -= 3
      }
      if (area.scrollHeight <= full) {
        this.allowEnd = true
      }
    }, 100),
    mouseMove: _.throttle(function () {
      // this.comeBack = false
      // setTimeout(this.showAlert, 10000)
    }, 50)
  },
  computed: {
    totalAmount () {
      return this.products[this.productCount].price + this.products[this.productCount + 1].price
    },
    changes: {
      get: function () {
        return this.patienceCount
      },
      set: function (v) {
        this.patienceCount = v
      }
    }
  },
  watch: {
    captcha: function (value) {
      if (this.cC === this.captchas.length) {
        console.log('they are the same', this.cC, this.captchas.length)
        this.captchaCheck = true
      } else {
        if (value.length <= 1) {
          this.checkString = this.setCheck()
        }
        if (value === this.checkString) {
          this.cC++
          this.captcha = ''
          this.warning = ''
          console.log(this.cC, this.captchas.length)
        }
      }
    }
  },
  created () {
    // window.addEventListener('mousemove', this.mouseMove)
  },
  mounted () {
    this.startAdd()
  },
  beforeDestroy () {
    clearInterval(this.patienceAdd)
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
// @import '../style/parts/_footer.scss';
// @import '../style/parts/_header.scss';
@import '../assets/fonts/Museo100-Regular.css';
@import '../assets/fonts/Museo300-Regular.css';
@import '../assets/fonts/Museo500-Regular.css';
@import '../assets/fonts/Museo700-Regular.css';
@import '../assets/fonts/Museo900-Regular.css';
</style>
