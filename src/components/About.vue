<template>
  <div class="about">
    <h1>Hello {{ name }}, are you always forgeting what you are planning to purchase at the grocery store?</h1>
    <p>Add the items whenever necessary, by the time you reach the grocery store, the list could easily be vue (viewed) on this website. Enjoy :) </p>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      name: this.$route.params.name
    }
  }
}
</script>