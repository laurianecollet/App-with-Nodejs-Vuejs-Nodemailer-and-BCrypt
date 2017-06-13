<template>
  <div class="hello">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Logo</a>
      </div>
    </nav>
    <formquestion></formquestion>
    <liste></liste>
  </div>
</template>

<script>
  import Liste from '@/components/Liste'
  import Formquestion from '@/components/Formquestion'
  export default {
    name: 'hello',
    components: { liste: Liste, formquestion: Formquestion }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #a1887f;
  }
  
  .nav-wrapper {
    background-color: #f6ebe9
  }
  
  nav {
    box-shadow: none;
  }
</style>