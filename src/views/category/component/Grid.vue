<template lang="">
  <div>
    <b-button v-b-modal.modal-category variant="success">Agregar</b-button>

    <b-modal id="modal-category" title="Formulario" hide-footer ref="ref-category">
        <b-form-group
          id="input-group-1"
          label="Name:"
          label-for="input-name"
        >
          <b-form-input
            id="input-name"
            type="text"
            placeholder="category"
            required
            v-model="nameData"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Description"
          label-for="input-description"
        >
          <b-form-input
            id="input-description"
            type="text"
            placeholder="Description"
            required
             v-model="descriptionData"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success" @click="insertCategory">Guardar</b-button>
    </b-modal>
    <b-table> </b-table>
  </div>
</template>
<script>
import {
  BTable,
  BModal,
  BButton,
  BFormGroup,
  BFormSelect,
  BForm,
  BFormInput,
} from "bootstrap-vue";
import categoryService from "@/views/category/service/index";
export default {
  components: {
    BTable,
    BModal,
    BButton,
    BFormGroup,
    BFormSelect,
    BForm,
    BFormInput,
  },
  data() {
    return {
        nameData:'',
        descriptionData:'',
    }
  },
  methods: {
    async insertCategory() {
      let params = {
        name: this.nameData,
        description: this.descriptionData,
      };
      await categoryService.insertCategory(params);
     this.$refs['ref-category'].hide();
    },
  },
};
</script>
<style lang=""></style>
