<template lang="">
  <div>
    <b-button variant="success" v-b-modal.modal-product> Crear </b-button>
    <b-modal
      id="modal-product"
      title="Formulario"
      hide-footer
      ref="ref-product"
    >
      <b-row>
       
        <b-col sm="6">
          <b-form-group label="Nombre" label-for="name">
            <b-form-input
              placeholder="Nombre"
              v-model="name"
              id="name"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="Descripcion" label-for="description">
            <b-form-input placeholder="Descripcion" v-model="description" id="description"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="Precio" label-for="price">
            <b-form-input
              placeholder="Name"
              v-model="name"
              type="number"
              id="price"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="Imagen" label-for="image">
            <b-form-input
              placeholder="Imagen"
              v-model="image"
              type="file"
              id="image"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="Categoria" label-for="">
            <v-select :options="options" v-model="selected"></v-select>
          </b-form-group>
        </b-col>

      </b-row>

    </b-modal>
  </div>
</template>
<script>
import {
  BTable,
  BModal,
  BButton,
  BFormInput,
  BCol,
  BRow,
  BFormGroup,
} from "bootstrap-vue";
import VSelect from 'v-select'
export default {
  components: {
    BTable,
    BModal,
    BButton,
    BFormInput,
    VSelect,
    BCol,
    BRow,
    BFormGroup,
  },
  data() {
      return {
        image: null,
        name: null,
        price: null,
        description: null,
        options:[{
            value: "A",
            text: "A",
        }],
        selected: '',
       

      }
  },    
};
</script>
<style lang=""></style>
