<template lang="">
  <b-col sm="10">
    <h1>{{referencia}}</h1>
    <b-table :fields="field" :items="list" striped hover ref="refTableClient">
      <template #cell(transacciones)="data">
        <div v-if="data">{{ sumT(data.item.transacciones) }}</div>
      </template>
      <template #cell(cantidad)="data">
        <div v-if="data">{{ cant(data.item.transacciones) }}</div>
      </template>
      <template #cell(boton)="data">
        <b-button
          v-b-modal.modal-1
          v-on:click="
            frmEditar(
              data.item.id,
              data.item.name,
              data.item.year,
              data.item.telefono,
              data.item.fecha_nac,
              data.item.transacciones
            )
          "
          class="btn btn-success"
          type="submit"
          v-if="data"
        >
          <b-icon-pencil></b-icon-pencil>
        </b-button>
        <b-button
          class="btn btn-danger"
          type="submit"
          v-on:click="deleteC(data.item.id)"
          v-if="data"
        >
          <b-icon-trash></b-icon-trash>
          
        </b-button>
       
          
      </template>
    </b-table>
  </b-col>
</template>
<script>
import { BTable, BCol, BIconTrash, BIconPencil, BButton } from "bootstrap-vue";
import ClientService from "../service/client.service";
import {mapState} from "vuex"

export default {
  components: {
    BTable,
    BCol,
    BIconTrash,
    BIconPencil,
    BButton,
  },

  data() {
    return {
      field: [
        "id",
        "name",
        "year",
        "transacciones",
        "cantidad",
        "telefono",
        "fecha_nac",
        "boton",
      ],
      client: {
        id: null,
        name: "",
        year: "",
        telefono: "",
        fecha_nac: "",
      },

      clients: [],
    };
  },
  methods: {
    refrescar() {
      this.$store.commit('client/M_UPDATE_TABLE',false)
    },
    async list() {
      this.clients = await ClientService.getClient();
      return this.clients;
      
    },
    async deleteC(id) {
      console.log(id);
      await ClientService.deleteClient(id);
      this.clients.splice(1, 1);
      this.$refs.refTableClient.refresh();
    },
    sumT(transacciones) {
      let json = JSON.parse(transacciones);
      let to = json
        .map((item) => item.monto)
        .reduce((prev, curr) => prev + curr, 0);
      return to;
    },
    cant(transacciones) {
      let json = JSON.parse(transacciones);
      let to = json.map((item) => {
        return item;
      });
      return to.length;
    },
    frmEditar: function (id, name, year, telefono, fecha_nac, pagos) {
      console.log(id);
      this.client.id = id;
      this.client.name = name;
      this.client.year = year;
      this.client.telefono = telefono;
      this.client.fecha_nac = fecha_nac;
      this.pagos = JSON.parse(pagos);
      this.operacion = "Editar";
    },
  },
  computed: {
   ...mapState({
      // mapea la propiedad foo del estado de Vuex a la propiedad local foo
      referencia: state => state.client.S_UPDATE_TABLE
    })
  },
  watch: {
    referencia(){
      console.log(this.referencia);
      if(this.referencia==true){
        this.$refs.refTableClient.refresh();
      }
    }
  },
  created() {
    this.list();
    /* this.delete(); */
   
  },
  updated(){
    this.refrescar();
  }
};
</script>
<style lang=""></style>
