<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <b-card-group deck>
          <b-card no-body>
            <template #header>
              <h4 class="mb-0">LIST PRODUCTS</h4>

              <div class="row d-flex justify-content-around mt-1">
                <div class="col-3">
                  <span class="feather-icon position-relative">
                    <feather-icon icon="ShoppingBagIcon" size="20" />
                    <span class="badge badge-up badge-pill badge-important">{{
                      arrayListProducts.length
                    }}</span>
                  </span>
                </div>
                <div class="col-6">
                  <b-input-group prepend="Cambio">
                    <b-form-input v-model="dolar"></b-form-input>
                  </b-input-group>
                </div>
                <div class="col-3">
                  <feather-icon
                    icon="Trash2Icon"
                    size="20"
                    class="ml-2 cursor-pointer text-danger"
                    @click="removeAllProducts()"
                  />
                </div>
              </div>
            </template>
          </b-card>
        </b-card-group>
        <div>
          <b-card
            v-for="(list, index) in arrayListProducts"
            :key="index"
            style="margin: 2px"
          >
            <b-card-title>
              {{ list.name }}
              <feather-icon
                icon="XIcon"
                size="20"
                class="float-right text-danger cursor-pointer"
                @click="removeProduct(list, index)"
              />
            </b-card-title>
            <b-card-text>
              <div class="d-flex justify-content-between">
                <b-input-group style="width: 100px">
                  <b-input-group-prepend>
                    <feather-icon
                      icon="MinusIcon"
                      size="28"
                      class="cursor-pointer"
                      @click="decreaseNumber(list, index)"
                    />
                  </b-input-group-prepend>

                  <b-form-input
                    size="sm"
                    type="number"
                    v-model="list.quantity"
                  ></b-form-input>

                  <b-input-group-append>
                    <feather-icon
                      icon="PlusIcon"
                      size="28"
                      class="cursor-pointer"
                      @click="increaseNumber(list)"
                    />
                  </b-input-group-append>
                </b-input-group>
                <div>
                  <span>{{ list.price }}</span>
                </div>
                <div>
                  <span>S/. {{ (list.quantity * list.price).toFixed(2) }}</span>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </div>
        <div class="text-center pt-1">
          <b-button variant="success" @click="sendList()"
            >SEND LIST ( S/ {{ totalSumPen }} ) | ( $ {{ totalSumDollar }})
          </b-button>
        </div>
      </div>
      <div class="col-7">
        <div class="col-10">
          <b-input-group class="d-flex align-items-center">
            <template #append>
              <b-input-group-text
                ><strong class=""> <feather-icon icon="SearchIcon" /> </strong
              ></b-input-group-text>
            </template>
            <b-form-input
              v-model="searchProduct"
              placeholder="Search by Product Name"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="row mt-2">
          <div
            class="col-3"
            v-for="(item, index) in filteredProducts"
            :key="index"
            @click="selectProduct(item, index)"
          >
            <b-card-group deck>
              <b-card
                :title="item.name"
                :img-src="imageUrl + item.image"
                img-alt="Image"
                img-top
                col="4"
                class="overflow-hidden"
                style="max-width: 540px"
                img-height="100px"
              >
                <b-card-text>
                  {{ item.description }}
                </b-card-text>
                <template #footer>
                  <strong>${{ item.price }}</strong> <br />
                  <small class="text-muted">{{ item.updated_at }}</small>
                </template>
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import invoiceService from "@/views/invoice/service/index";
import {
  BCard,
  BCardText,
  BCardGroup,
  BInputGroup,
  BButton,
  BInputGroupAppend,
  BFormInput,
  BInputGroupText,
  BCardTitle,
  BInputGroupPrepend,
} from "bootstrap-vue";
export default {
  components: {
    BCard,
    BButton,
    BInputGroupAppend,
    BCardTitle,
    BFormInput,
    BInputGroupText,
    BCardText,
    BInputGroupPrepend,
    BCardGroup,
    BButton,
    BInputGroup,
  },
  data() {
    return {
      products: [],
      imageUrl: `http://localhost/client/public`,
      arrayListProducts: [],
      searchProduct: "",
      dolar: 3,
    };
  },
  methods: {
    async getProduct() {
      try {
        const data = await invoiceService.getProduct();
        this.products = data;
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },
    selectProduct(product, index) {

     
      this.$set(product, "quantitSy", 1);
      this.arrayListProducts.push(product);
      
    },
    async removeAllProducts() {
      /*  const confirm = await this.showGenericConfirmSwal({}); */

      /* if (confirm.value) { */
      this.arrayListProducts = [];
      /*  this.products.forEach((element) => {
        element.quantity = 0;
      }); */
      /*  } */
    },
    removeProduct(item, index) {
      this.arrayListProducts.splice(index, 1);
      this.products.forEach((element) => {
        if (item.id == element.id) {
          element.quantity = 0;
        }
      });
    },
    decreaseNumber(item, index) {
      this.$set(item, "quantity", Number(item.quantity) - 1);
    },
    increaseNumber(item) {
      this.$set(item, "quantity", Number(item.quantity) + 1);
    },
  },

  computed: {
    totalSumPen() {
      let sum = this.arrayListProducts.reduce((accumulator, object) => {
        return (
          accumulator +
          (object.currency == "S/" ? Number(object.quantity * object.price) : 0)
        );
      }, 0);
      return sum.toFixed(2);
    },
    totalSumDollar() {
      let sum = this.arrayListProducts.reduce((accumulator, object) => {
        return Number(accumulator + (object.quantity * Number(object.price*this.dolar)));
      }, 0);
      return sum.toFixed(2);
    },
    filteredProducts: function () {
      var product_array = this.products,
        searchProduct = this.searchProduct;
      if (!searchProduct) {
        return product_array;
      }
      searchProduct = searchProduct.trim().toLowerCase();
      product_array = product_array.filter(function (item) {
        if (item.name.toLowerCase().indexOf(searchProduct) !== -1) {
          return item;
        }
      });
      return product_array;
    },
  },

  async created() {
    await this.getProduct();
    let miPromesa = new Promise((resolver, rechazar) => {
      let expresion = true;
      if (expresion) resolver("Resolvió correcto");
      else rechazar("Se produjo un error");
    });
  },
};
</script>
<style lang=""></style>
