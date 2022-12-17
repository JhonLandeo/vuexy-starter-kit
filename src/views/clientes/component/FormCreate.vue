<template lang="">
  <b-col sm="2">
    <b-button v-b-modal.modalForm class="btn btn-success" v-on:click="frmCrear"
    
      >Agregar</b-button
    >
    <b-modal id="modalForm" title="Formulario" hide-footer ref="modalForm">
      <b-col sm="12">
        <b-form-group id="input-group-1" :label="operacion">
          <b-form-input
            id="name"
            type="text"
            placeholder="Nombre"
            required
            class="mt-2"
            v-model="client.name"
          ></b-form-input>
          <b-form-input
            id="input-1"
            type="number"
            placeholder="Edad"
            required
            class="mt-2"
            v-model="client.year"
          ></b-form-input>

          <b-form-input
            id="fecha_nac"
            type="date"
            placeholder="Fecha de nacimiento"
            required
            class="mt-2"
            v-model="client.fecha_nac"
          ></b-form-input>

          <b-form-input
            id="input-1"
            type="text"
            placeholder="Telefono"
            required
            class="mt-2"
            v-model="client.telefono"
          ></b-form-input>
        </b-form-group>
        <b-row class="mt-3">
          <b-col sm="2">
            <b-form-input
              v-model="pago.id"
              placeholder="ID"
              type="number"
              required
            >
            </b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input
              v-model.number="pago.monto"
              placeholder="Monto"
              type="number"
              required
            >
            </b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input
              v-model="pago.fecha"
              placeholder="ID"
              type="date"
              required
            >
            </b-form-input>
          </b-col>
          <b-col sm="2">
            <b-button
              v-on:click="agregar"
              type="submit"
              variant="primary"
              class="btn btn-success btn-sm"
              >+</b-button
            >
          </b-col>
          <b-list-group
            class="mt-3"
            v-for="(numero, index) in pagos"
            :key="numero.id"
          >
            <b-row>
              <b-col sm="3">
                <b-form-input
                  :value="numero.id"
                  @change="editId($event, index)"
                ></b-form-input>
              </b-col>
              <b-col sm="3">
                <b-form-input
                  :value="numero.monto"
                  @change="editMonto($event, index)"
                  type="number"
                ></b-form-input>
              </b-col>

              <b-col sm="4">
                <b-form-input
                  :value="numero.fecha"
                  @change="editFecha($event, index)"
                  type="date"
                ></b-form-input>
              </b-col>
              <b-col sm="2">
                <b-button class="btn btn-danger btn-sm" v-on:click="quitar"
                  >x</b-button
                >
              </b-col>
            </b-row>
          </b-list-group>
        </b-row>
        <b-col class="mt-3">
          <b-button
            v-on:click="crear"
            type="submit"
            class="btn btn-success"
            variant="primary"
            >Guardar</b-button
          >
          <h1>{{referencia}}</h1>
        </b-col>
      </b-col>
    </b-modal>
  </b-col>
  
</template>
<script>
import {
  BCol,
  BFormGroup,
  BFormInput,
  BButton,
  BListGroup,
  BRow,
} from "bootstrap-vue";
import ClientService from "../service/client.service";
import {mapState} from "vuex"
export default {
  
  components: {
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BListGroup,
    BRow,
  },
  data() {
    return {
      clients: [],
      client: {
        id: null,
        name: "",
        year: "",
        telefono: "",
        fecha_nac: "",
      },
      operacion: "",
      pagos: [],
      pago: {
        id: null,
        monto: "",
        fecha: "",
      },
    };
  },
  methods: {
    agregar() {
      let limite = this.pagos.length;
      if (limite < 5) {
        this.pagos.push(this.pago);
      }


      this.pago = {
        id: null,
        monto: "",
        fecha: "",
      };
    },
    agr() {
      this.operacion = "Crear";
    },
    guardar: function () {
      if (this.operacion == "crear") {
        this.crear();
      } else {
        this.editar();
      }
    },
    quitar() {
      this.pagos.pop(this.pagos);
      this.client.total = [];
    },
    guardar: function () {
      if (this.operacion == "crear") {
        this.crear();
      } else {
        this.editar();
      }
    },
    async list() {
      this.clients = await ClientService.getClient();
    },

    frmCrear: function () {
      this.client.id = null;
      this.client.name = "";
      this.client.year = "";
      this.client.fecha_nac = "";
      this.client.telefono = "";
      this.transacciones = [];
      this.pagos = [];
      this.operacion = "crear";
    },

    refrescar() {
      this.$store.commit('client/M_UPDATE_TABLE',true)
    },

    async crear() {
      let parametros = {
        name: this.client.name,
        year: this.client.year,
        payment: JSON.stringify(this.pagos),
        dob: this.client.fecha_nac,
        phone: this.client.telefono,
      };
      await ClientService.postClient(parametros);
      this.$refs.modalForm.hide();
     this.refrescar();
     
    },
    async editar() {
      let parametros = {
        name: this.client.name,
        year: this.client.year,
        telefono: this.client.telefono,
        fecha_nac: this.client.fecha_nac,
        transacciones: this.pagos,
      };
      await ClientService.putClient(this.client.id, parametros);
    },
    
  },
  computed: {
    ...mapState({
      // mapea la propiedad foo del estado de Vuex a la propiedad local foo
      referencia: state => state.client.S_UPDATE_TABLE
    })
  },
  
  created() {
    this.list();
   
  },
};
</script>
<style lang=""></style>
