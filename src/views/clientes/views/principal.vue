<template lang="">
  <b-container class="container-fluid">
    <b-row class="row">
      <Table />
      <FormCreate />
    </b-row>
  </b-container>
</template>
<script>
import Table from "../component/Table.vue";
import FormCreate from "../component/FormCreate.vue";
import { BRow, BContainer } from "bootstrap-vue";
export default {
  components: { Table, FormCreate, BRow, BContainer },
};
</script>
<style lang=""></style>
