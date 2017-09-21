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

      <!-- Stage 1: Video (Original) -->
      <!-- <template v-if="showVideo">
        <div class="video main">
          <div class="container">
            <my-video :sources="video.sources" :options="video.options" @ended="videoEnded"></my-video>
          </div>
        </div>
      </template> -->

      <!-- Stage 1: Video (Alt) -->
      <template v-if="showVideo">
        <div class="video main">
          <div class="container">
            <video controls muted autoplay v-on:ended="videoEnded" playsinline>
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
            Q:
            <p class="q">
              {{questions[qC].q}}
            </p>
          </div>

          <div class="answer">
            A:

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
              <img v-for="(image, index) in questions[qC].a.length" v-bind:src="questions[qC].a[index]" @click.stop="checkAnswer(questions[qC].type)"/>
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
            <!-- DROPDOWN -->
            <template v-else-if="questions[qC].type == 'dropdown'">
              <select>
                <option :value="n" v-for="n in 2018">
                  {{2018-n}}
                </option>
              </select>
              <input type="submit" @click.stop="checkAnswer(questions[qC].type)"/>
            </template>
            <!-- TOGGLE -->
            <template v-else-if="questions[qC].type == 'toggle'">
              <form v-for="(toggle, index) in questions[qC].a.length">
                <input type="radio" :id="'radio'+index" :value="questions[qC].a[index]" v-model="picked">
                <label :for="questions[qC].a[index]">{{questions[qC].a[index]}}</label>
                <br>
              </form>
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
            <span class="inline-helper"></span>Recommended 4 U!
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
        <div class="main payment">
          <img class="captcha" :src="this.captchas[cC].src"/>
          <input type="text" v-model="captcha"/><label>{{captcha}}</label>
          <input type="submit" @click.stop="captchaEnded"/>
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
            <input type="submit" value="Buy" @click="checkoutEnded"/>
          </div>
        </div>
      </template>

      <!-- Stage 6: Terms and conditions -->

      <template v-if="showConditions">
        <div class="main conditions">
          <h1>Terms and Conditions</h1>
          <p>
            before you continue, you need to accept our terms and conditions
          </p>
          <textarea v-model="conditions">

          </textarea>
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
      showQuestionnaire: true,
      textbox: '',
      checked: [],
      picked: '',
      qC: 0,
      showProduct: false,
      productCount: 10,
      showCaptcha: false,
      checkString: '',
      showCheckout: false,
      showConditions: false,
      popUp: false,
      videoPop: true,
      isMinimized: false,
      comeBack: false,
      userInteract: false,
      patienceCount: 88,
      parentMsg: '',
      captcha: '',
      cC: 0,
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
          q: 'Pick an aesthetic',
          a: [ 'Fun', 'grungy', 'minimal', 'bombastic', 'quirky', 'normcore', 'cozy', 'cute', 'dark', 'no preference' ],
          type: 'toggle'
        },
        {
          q: 'In what year did you abandon your dreams?',
          a: [ '' ],
          type: 'dropdown'
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
          a: [require('../assets/captcha2.png'), 'http://assets.inhabitat.com/wp-content/blogs.dir/1/files/2016/02/ice-cubes.jpg'],
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
          a: [ require('../assets/captcha2.png') ],
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
          src: require('../assets/bread-gloves.jpg'),
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
          src: require('../assets/bread-gloves.jpg'),
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
          src: require('../assets/captcha.jpg')
        },
        {
          value: 'pervert we',
          src: require('../assets/captcha2.png')
        },
        {
          value: 'contend because',
          src: require('../assets/captcha3.png')
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
    // myVideo
  },
  methods: {
    videoEnded () {
      this.showVideo = false
      this.showQuestionnaire = true
    },
    checkAnswer (value) {
      if (value === 'option' || value === 'image' || value === 'dropdown') {
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
      this.showCaptcha = false
      this.showCheckout = true
    },
    checkoutEnded () {
      this.showCheckout = false
      this.showConditions = true
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
    outOf (index) {
      let amount = 5 - this.products[this.productCount].reviews[index].stars.length
      return Array(amount + 1).join('☆')
    },
    mouseMove: _.debounce(function () {
      // this.comeBack = false
      // setTimeout(this.showAlert, 10000)
    }, 300)
  },
  computed: {
    totalAmount () {
      return this.products[this.productCount].price + this.products[this.productCount + 1].price
    }
  },
  watch: {
    captcha: function (value) {
      if (value.length <= 1) {
        this.checkString = this.setCheck()
      }
      if (value === this.checkString) {
        this.cC++
        this.captcha = ''
        console.log(this.cC, this.captchas.length)
        if (this.cC === this.captchas.length) {
          console.log('they are the same', this.cC, this.captchas.length)
          this.captchaEnded()
        }
      }
    }
  },
  created () {
    window.addEventListener('mousemove', this.mouseMove)
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
