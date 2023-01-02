b
<template lang="">
  <div>
    <b-button v-b-modal.modal-category variant="success">Agregar</b-button>

    <b-modal
      id="modal-category"
      title="Formulario"
      hide-footer
      ref="ref-category"
    >
      <input id="input-id" type="hidden" v-model="idData" value="idData" />

      <b-form-group id="input-group-1" label="Name:" label-for="input-name">
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
      <b-button type="submit" variant="success" @click="save">Guardar</b-button>
      <b-button type="submit" variant="danger" class="ml-2" @click="closeModal"
        >Cancelar</b-button
      >
    </b-modal>
    <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="paginate.perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          :total-rows="totalRows"
          :per-page="paginate.perPage"
          align="fill"
          size="sm"
          class="my-0"
          v-model="paginate.currentPage"
        ></b-pagination>
      </b-col>
    </b-row>

    <b-table
      small
      slot="table"
      no-provider-filtering
      ref="tableCategory"
      :items="myProvider"
      :fields="fields"
      class="mt-2"
      :current-page="paginate.currentPage"
      :per-page="paginate.perPage"
    >
      <template v-slot:cell(action)="data">
        <b-row>
          <b-col sm="4">
            <button
              class="btn btn-warning"
              @click="
                editar(data.item.id, data.item.name, data.item.description)
              "
            >
              Editar
            </button>
          </b-col>
          <b-col sm="4">
            <button
              class="btn btn-danger"
              @click="deleteCategory(data.item.id)"
            >
              Eliminar
            </button>
          </b-col>
        </b-row>
      </template>
    </b-table>
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
  BCol,
  BPagination,
  BRow,
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
    BCol,
    BPagination,
    BRow,
  },
  data() {
    return {
      frm: "",
      nameData: "",
      idData: "",
      descriptionData: "",
      openModalChargeEdit: false,
      paginate: {
        currentPage: 1,
        perPage: 100,
      },
      startPage: null,
      totalRows: 0,
      toPage: null,
      statusActive: false,
      type: "charge",
      fields: [
        {
          key: "name",
          label: "Nombre",
        },
        {
          key: "description",
          label: "Descripcion",
        },
        {
          key: "created_at",
          label: "Fecha de creación",
        },
        {
          key: "action",
          label: "Acciones",
        },
      ],
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
    };
  },
  methods: {
    async insertCategory() {
      let params = {
        name: this.nameData,
        description: this.descriptionData,
      };
      await categoryService.insertCategory(params);
      this.$refs["ref-category"].hide();
      this.$refs.tableCategory.refresh();
    },
    async myProvider(ctx) {
      try {
        const params = {
          page: this.paginate.currentPage,
          perPage: this.paginate.perPage,
        };
        const data = await categoryService.getCategory(params);
        this.totalRows = data.total;
        this.startPage = data.from;
        this.toPage = data.to;
        this.paginate.currentPage = data.current_page;
        this.paginate.perPage = data.per_page;
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCategory(params) {
      try {
        const data = await categoryService.deleteCategory({ id: params });
        this.$refs.tableCategory.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    async updateCategory(idP, nameP, categoryP) {
      try {
        const data = await categoryService.updateCategory({
          id: idP,
          name: nameP,
          category: categoryP,
        });
        this.$refs["ref-category"].hide();
        this.nameData = "";
        this.descriptionData = "";
        this.$refs.tableCategory.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    editar(id, name, description) {
      this.$refs["ref-category"].show();
      this.idData = id;
      this.nameData = name;
      this.descriptionData = description;
      this.frm = "editar";
    },
    closeModal() {
      this.$refs["ref-category"].hide();
      this.nameData = "";
      this.descriptionData = "";
    },
    save() {
      if (this.frm == "editar") {
        this.updateCategory(this.idData, this.nameData, this.descriptionData);
      } else {
        this.insertCategory();
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang=""></style>
