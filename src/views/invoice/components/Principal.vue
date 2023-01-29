<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <b-card-group deck>
          <b-card no-body>
            <template #header>
              <h4 class="mb-0">LIST PRODUCTS</h4>

              <div>
                <span class="feather-icon position-relative">
                  <feather-icon icon="ShoppingBagIcon" size="20" />
                  <span class="badge badge-up badge-pill badge-important"
                    >dsa</span
                  >
                </span>
                <feather-icon
                  icon="Trash2Icon"
                  size="20"
                  class="ml-2 cursor-pointer text-danger"
                  @click="removeAllProducts()"
                />
              </div>
              <div>
                <b-card style="margin: 2px">
                  <b-card-title>
                    ds
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
                          <!-- <tabler-icon
                            icon="MinusIcon"
                            size="28"
                            class="cursor-pointer"
                            @click="decreaseNumber(list, index)"
                          /> -->
                        </b-input-group-prepend>

                        <b-form-input size="sm" type="number"></b-form-input>

                        <b-input-group-append>
                          <!-- <tabler-icon
                            icon="PlusIcon"
                            size="28"
                            class="cursor-pointer"
                            @click="increaseNumber(list)"
                          /> -->
                        </b-input-group-append>
                      </b-input-group>
                      <div>
                        <span>dsa222</span>
                      </div>
                      <div>
                        <span>dsa</span>
                      </div>
                    </div>
                  </b-card-text>
                </b-card>
              </div>
              <div class="text-center pt-1">
                <b-button variant="success" @click="sendList()"
                  >SEND LIST 3232
                </b-button>
              </div>
            </template>
          </b-card>
        </b-card-group>
      </div>
      <div class="col-7">
        <div class="col-10">
          <b-input-group class="d-flex align-items-center">
            <template #append>
              <b-input-group-text
                ><strong class=""> <feather-icon icon="SearchIcon" /> </strong
              ></b-input-group-text> </template
            >searchProduct
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
    selectProducts(product) {
      this.arrayListProducts.push(product);
    },
  },
  computed: {
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
  },
};
</script>
<style lang=""></style>
