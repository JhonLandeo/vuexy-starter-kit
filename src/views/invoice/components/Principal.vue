<template lang="">
  <div>
    <autocomplete
      url="http://localhost/proyek/goodmovie/api/api/v1/search"
      anchor="title"
      label="writer"
      :onSelect="getData"
      :customParams="{ token: 'dev' }"
      :customHeaders="{ Authorization: 'bearer abc123' }"
    >
    </autocomplete>
  </div>
</template>
<script>
import Autocomplete from "vue2-autocomplete-js";
export default {
  components: { Autocomplete },
};
</script>
<style lang=""></style>
