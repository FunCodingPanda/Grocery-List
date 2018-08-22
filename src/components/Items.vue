<template>
  <div class="hello">
    <div class="holder">

      <form @submit.prevent='addItem'>
        <input type="text" placeholder="List out your grocery items..." v-model="item" v-validate="'min:3'" name="Item"> <!--the item has to be at least 5 characters -->
        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX"> <!-- css component making it animated  -->
         <p class="alert" v-if="errors.has('item')">{{ errors.first('item') }}</p> <!--show the errors, but here it is not showing -->
        </transition>
      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown"> <!-- making the items bounce when added to the list-->
        <li v-for="(data, index) in items" :key='index'>{{ data.item }}
          <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
        </li>
        </transition-group>      
      </ul>
      <p> Your Grocery Items </p>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Items',
  data() {
    return {
      item: '',
      items: [
        { "item": "Lettuce"},
        { "item": "Pork"}
      ]
    }
  },
  mounted () {
    const items = JSON.parse(this.$localStorage.get('items'))
    if (items) {
      this.items = items
    }
  },
  methods:{
    addItem() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.items.push({item: this.item})
          this.item = '';
          this.$localStorage.set('items', JSON.stringify(this.items))
        } else {
          console.log('Not valid');
        }
      })
    },
    remove(id) {
          this.items.splice(id,1);   
          this.$localStorage.set('items', JSON.stringify(this.items))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 

  .holder {
    background: #fff;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }
  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }
  .container {
    box-shadow: 0px 0px 40px lightgray;
  }
  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: navy;
    color: white;
  }

   .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }

  .alert-in-enter-active {
      animation: bounce-in .5s;
    }
    .alert-in-leave-active {
      animation: bounce-in .5s reverse;
    }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  i {
    float: right;
    cursor: pointer;
  }
</style>
