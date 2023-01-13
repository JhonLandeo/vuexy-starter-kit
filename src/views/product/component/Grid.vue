<template lang="">
  <div>
    <b-button variant="success" v-b-modal.modal-product> Crear </b-button>
    <b-modal
      id="modal-product"
      title="Formulario"
      hide-footer
      ref="ref-product"
    >
      <form>
        <b-row>
          <b-col sm="6">
            <b-form-group label="Nombre" label-for="name">
              <b-form-input
                placeholder="papa"
                v-model="name"
                id="name"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="6">
            <b-form-group label="Descripcion" label-for="description">
              <b-form-input
                placeholder="Descripcion"
                v-model="description"
                id="description"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="6">
            <b-form-group label="Precio" label-for="price">
              <b-form-input
                placeholder="2.00"
                v-model="price"
                type="number"
                id="price"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="6">
            <b-form-file
              accept="image/*"
              @change="fillFileData"
              v-model="image"
              type="file"
            />
          </b-col>

          <b-col sm="6">
            <b-form-group label="Categoria" label-for="">
              <b-form-select
                v-model="selected"
                :options="options"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col sm="12">
            <b-button variant="success" @click="insertProduct()"
              >Guardar</b-button
            >
          </b-col>
        </b-row>
      </form>
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
      ref="tableProduct"
      :fields="fields"
      :items="myProvider"
      :per-page="paginate.perPage"
      :current-page="paginate.currentPage"
    >
    <template #cell(image) = "data">
      <img src="data.item.image"/>
    </template>

    </b-table>
  </div>
</template>
<script>
import {
  BTable, BPagination,
  BFormFile,
  BModal,
  BButton,
  BFormInput,
  BCol,
  BRow,
  BFormGroup,
  BFormSelect,
} from "bootstrap-vue";
import productService from "@/views/product/service/index";

export default {
  components: {
    BTable,
    BFormSelect,
    BModal,
    BFormFile,
    BButton,
    BFormInput,
    BCol,
    BRow,
    BFormGroup,
    BPagination,
  },
  data() {
    return {
      image: null,
      images: null,
      name: "",
      price: null,
      description: "",
      options: [],
      selected: "",
      paginate: {
        currentPage: 1,
        perPage: 100,
      },
      startPage: null,
      totalRows: 0,
      toPage: null,
      statusActive: false,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      fields: [
        /*  {
          key: "image",
          label: "Image",
          sortable: true,
        }, */
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "image",
          label: "Imagen",
          sortable: true,
        },
        {
          key: "price",
          label: "Price",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
        },
        {
          key: "category_id",
          label: "Categoría",
        },
        {
          key: "created_at",
          label: "Fecha de creación",
          sortable: true,
        },
        {
          key: "actions",
          label: "Acciones",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    async myProvider(ctx) {
      try {
        const params = {
          page: this.paginate.currentPage,
          perPage: this.paginate.perPage,
        };
        const data = await productService.getProduct(params);
        this.totalRows = data.total;
        this.startPage = data.from;
        this.toPage = data.to;
        this.paginate.currentPage = data.current_page;
        this.paginate.perPage = data.per_page;
        return data.data;
      } catch (error) {}
    },
    fillFileData(event) {
      let image = event.srcElement.files[0];
      this.image = image.name;
      console.log(this.image);
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => (this.file1 = reader.result);
    },

    async getCategory() {
      try {
        const data = await productService.getCategory();
        this.options = data;
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    async insertProduct() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("category", this.selected);
      formData.append("price", this.price);
      console.log(this.images);
      try {
        let params = {
          name: this.name,
          description: this.description,
          price: this.price,
          image: this.images,
          category: this.selected,
        };

        await productService.insertProduct(formData);
        this.$refs["ref-product"].hide();
      } catch (error) {
        console.error(error);
      }
    },

    async uploadImage() {},
  },
  async mounted() {
    await this.getCategory();
  },
};
</script>
<style lang=""></style>
