<script setup>
import Modal from '../components/Modal.vue';

</script>

<template>
  <div class="container mb-5">
    <div class="row bg-color">
      <div class="col">
        <img alt="Background" src="@/assets/background.jpg" style="width: 100%;">
      </div>
      <div class="col">
        <div class="container mt-5 pt-5 text-center">
          <h1 class="h1">
            Welcome to Grocer Guru!<br>Get started by adding items.
          </h1>
          <button @click="toggleGroceryList" class="btn btn-secondary mt-3">
            <i class="fas fa-plus"></i> Add Grocery List
          </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-if="showGroceryList && !isLoading" class="col-5 mt-3 pt-5 text-center">
        <h2 class="h2"> Your Grocery List:</h2>
        <div v-for="(searchBar, index) in searchBars" :key="index" class="form-outline my-4">
          <input ref="inputFields" v-model="groceryItems[index]" type="search" :id="'form' + index" class="form-control"
            :placeholder="'Enter Grocery Item ' + (index + 1)" aria-label="Search"
            @keydown.enter.prevent="addSearchBar(index)" />
        </div>
        <button @click="search" class="btn btn-success mx-5"> Find Best Price</button>
      </div>
      <div v-if="isLoading" class="spinner-border mt-5" role="status">
      </div>
    </div>
    <button @click="askMrGPT('how far is the sun from earth')" class="btn btn-success mx-5"> Test Mr.GPT</button>
    <button @click="askMrGPT()" class="btn btn-success mx-5"> Test Mr.GPT 2</button>

    <div v-if="!isLoading && showModal">
      <Modal />
    </div>

  </div>
</template>

<script>
import { fetchShoppingResults } from '../services/ShoppingService';
import { queryChatGPT } from '../services/ChatGPTService';

export default {
  data() {
    return {
      isLoading: false,
      showGroceryList: false,
      showModal: false,
      searchBars: [],
      groceryItems: [],
      shoppingResults: [],
    };
  },
  methods: {
    toggleGroceryList() {
      this.showGroceryList = !this.showGroceryList;
      if (this.showGroceryList) {
        this.addSearchBar();
      }
    },
    addSearchBar(index) {
      const newIndex = this.searchBars.length;
      this.searchBars.push({ id: newIndex });
      this.groceryItems.push('');
      this.$nextTick(() => {
        const nextIndex = index + 1;
        if (nextIndex < this.$refs.inputFields.length) {
          this.$refs.inputFields[nextIndex].focus();
        }
      });
    },
    search() {
      this.shoppingResults = [];
      this.isLoading = true;

      Promise.all(
        this.groceryItems.map(item => fetchShoppingResults(item))
      )
        .then(results => {
          this.shoppingResults = results;
          this.isLoading = false;
          this.showModal = false;
          console.log(this.shoppingResults);
        })
        .catch(error => {
          this.isLoading = false;
          console.error('Error:', error);
        });
    },
    async askMrGPT(query) {
      try {
        if (!query) {
          var json = [
            {
              "title": "Fresh Bagged Mini Bananas - 12 oz Bag",
              "source": "H-E-B",
              "thumbnail": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTAmk_qA7yD6AWchqmDLQgrXOMvgJl1MNGQLvf2abg-rjw-Ms_43FJsC0hOfxGeJul5gkIEIwObS8XfDYZbKqtfWL3mnr-xu_DF7T4M-mAxT_XJG98ctONX&usqp=CAE",
              "price": "$1.02"
            },
            {
              "title": "Congo Red Bananas (Plantain) from Ecuador Shipping",
              "source": "Walmart - Congo Tropicals",
              "thumbnail": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvqBMU57MHlUCkkgzr8tauXGPGNDRDSuJpAonAnJtoaMhkVYTdIyZnSfn6DAMFAiRRfSYaNmvow20hMt51gFjclRc_KZm3Puz7ofMwpnh3BuKKtSQ1YZRysA&usqp=CAE",
              "price": "$41.00"
            },
            {
              "title": "Silly Bananas",
              "source": "Walmart - wholesale2go",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQXp2AV_tF-7-R7uhA55JoHwc-wejQEd1HH1ChT5j4X3G3G2NwCaKuu-U_y5M7efjFXovDJmAFR9ladIsfV3JmMgH9GWeGivQ&usqp=CAE",
              "price": "$55.69"
            },
            {
              "title": "Select Ingredients Frozen Banana Slices - 24 oz",
              "source": "H-E-B",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRHSQJUi6IprWSZgXpyHNq_00kmPJDoVj9pWfwTVDPPBX5yzwB0OF0F7ayh5bImx0rbymUKCMeiEuztBJHE_ixZ6FTEUgCTUCCt6NIF0StVIe6xb_MOY6XvXw&usqp=CAE",
              "price": "$3.41"
            },
            {
              "title": "Food to Live Organic Dried Banana Slices, 6 Ounces – Non-GMO, Naturally Dried ...",
              "source": "Walmart - Food To Live",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR0nZJ2wBFBtg-_0ETFK2b5w8eXPMFjKjkpz9KHpvJW3ULxt5q-ruq9gdMeU5f-dAH_dlmoTjZwMbgAtyZ4baxM6I-8EvAdDJ-Y5vH9TI7kJsDPfUCl9qSX7g&usqp=CAE",
              "price": "$8.99"
            },
            {
              "title": "Premier Protein Shake Bananas & Cream 30g Protein 11.5 fl oz 12 ct",
              "source": "Walmart",
              "thumbnail": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTjbvV5sVCGlZXY9A8j_SkF1DXLjCFIxVgFPBjWPzrFeyrYIA9n-zKrvu1x1sbUhqIZW4XK3jVLkuBbwjaD28nctJ7siEk7qerR3Da-uUz8kD6vz103A_1Y&usqp=CAE",
              "price": "$29.98"
            },
            {
              "title": "Dwarf Cavendish Banana Plant - Musa - 2.5\" Pot",
              "source": "Walmart - Hirts Gardens",
              "thumbnail": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrmstX2pfn09j4aU_N84kxnSxsJ6XEdCIfeqjEAJ9KpkbmKbMOTZio_b6G67Ldvc_X143tPH2kfFJzaY9a42KOMZwb-oeRN4Wl5M6gSWU&usqp=CAE",
              "price": "$7.99"
            },
            {
              "title": "Natierra Organic Freeze-Dried Bananas - Case of 12/2.5 oz",
              "source": "Target",
              "thumbnail": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTAwgMg9uNogk5fWJ84EwBnRqzB9nGsT5XEnLEPci7V-0ymZKWazvDfT02OpSFKcbBbbDyvU6-t3JPf00c1c_aZDaTIFABXmUKmRbp6YB9ZLMAaowa3HMw3&usqp=CAE",
              "price": "$86.49"
            },
            {
              "title": "(12 Pack)MadeWith Organic Non-GMO Frozen Bananas, 10 oz.",
              "source": "Walmart - shopGourmet.com",
              "thumbnail": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSAgEM4dSYQV6KO7ZpybhQnVpXyeocr-9c1Oxal_clATwAxIeV3ZBjZpj0VPXf4QaIM3Mvqo5DqSoaQ7bJ7fTPkrD0VgkJ3&usqp=CAE",
              "price": "$98.40"
            },
            {
              "title": "Dwarf Namwa Banana (Pisang Awak) Live Plant - Musa - Wellspring Gardens Starter ...",
              "source": "Walmart - Wellspring Gardens",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRylkpp_dL9Sm7M63l2CNjl78Frgp0DhSFxQnQhF0YJtt0wpaOShkTqKXZ6XuejAJCqHYNYz97NVwyDnAMQ0SgcDxcLB7CV&usqp=CAE",
              "price": "$22.99"
            },
            {
              "title": "Made In Nature Organic Banana Slices, Soft & Chewy - 14 oz",
              "source": "Kroger",
              "thumbnail": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcStE1iqm15DXzYOJi7EfzEZnFTrqK-mXTJDcjQsmuP2CjXj-DWQrhcO80yrq46NUE22oCHAD9sEwRBvnervu7awy7mk2pNKPVw-w9ozNug&usqp=CAE",
              "price": "$9.99"
            },
            {
              "title": "Counting to Bananas: A Mostly Rhyming Fruit Book [Book]",
              "source": "Target",
              "thumbnail": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRtIH9L5i4XSR77i48kiU-b7P885a2SI5-TU2pWRGoAVRb9oMCJp2jTDFgUgIyxgsAJMeBe4CGY2MSIchh5vOAT54HEXlobJ2n5z86rqrs&usqp=CAE",
              "price": "$14.29"
            },
            {
              "title": "Dwarf Cavendish Banana Tree Live Plant - Musa - Wellspring Gardens Starter Plant ...",
              "source": "Walmart - Wellspring Gardens",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR84yhcBCH9uUVJEjwi8DTgwceJkFvi4xKlCBxr6-bYcsUhzvSR64eG22GS-zMTpuaL4z7M_gyiMTkq3RfEwW5k8-UuKemvFg&usqp=CAE",
              "price": "$22.99"
            },
            {
              "title": "H-E-B Texas Roots Fresh Oranges 4 lb Bag",
              "source": "H-E-B",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcReh6cs4jmuBbuDhUFzIR8hNGG3JIsdrbLobzjxXOYx0X0BbNZAaPeycpGP1-ffxoq9glH-PjzLbCTRJyXUJp7gZd02HqfcQwtLUCTzRyiRoPPNNqBK-4emfQ&usqp=CAE",
              "price": "$5.18"
            },
            {
              "title": "Musa Banana Plant in a 4 inch Container",
              "source": "Walmart",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcScwAI8iwQ4D5X3PHwGrf1RiKXqLFc-4sF6g-Fl6MxYFeF_FgyQBzPkKnz0wn97RX-v1J3tFmAMiLwryjIyF87eyIo9gH-hu3oEmXs-HA9m&usqp=CAE",
              "price": "$14.00"
            },
            {
              "title": "Marie Callender's Pie, Banana Cream - 34.9 oz",
              "source": "H-E-B",
              "thumbnail": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQneh0u-1xS_uD8Kxx_dDXO6wSiB_vDHcwqzaaGTbkJwTjJbc-3zsQ7_TtNZnnetf21vG4Vg8Dz49XXoLB8F4yxTx_DzPTLcTSt09yZzq4RpJMFUx8S5Kg5XY0&usqp=CAE",
              "price": "$6.21"
            },
            {
              "title": "Mavuno Harvest Dried Organic Banana - Case of 6/2 oz",
              "source": "Target",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSzG1qJv8RBVc7XrI3IbA4u_m-gcEv7CkXU-MTGy9xsL1gueA_L_bopb7AZMTK8ss2M8KJ-IcBpdowMTNVZhJ43_cIsyJGcNOS2S7eoW5yJkw16WqBjkXuv&usqp=CAE",
              "price": "$34.99"
            },
            {
              "title": "Barnana Banana Bites, Organic Chewy, Original - 3.5 oz",
              "source": "H-E-B",
              "thumbnail": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQQKL2ACxoO-Y3BymsyKMqqfRUeuRBNZfEGX6eB789ibK_nc-Hlc6iAjbW9nFno1-LZ4uD150j1x0cWgGcnVyWGaZ09lAjc3XvE2xKM7_ORHidiWdX511pj&usqp=CAE",
              "price": "$4.45"
            },
            {
              "title": "Dwarf Banana - Live Plant - Dwarf Brazillian Banana - Dwarf Hawaiian Banana",
              "source": "Walmart - KonGrocery",
              "thumbnail": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTmbg6DXS-kYgtdNe2KlCX35RS65bbvOULb7PXgc3XHLZIlOHlB4tMs16j3CIHZcl4IqyLBRIaimwig3qjdz6RWMooXVEtl&usqp=CAE",
              "price": "$34.44"
            },
            {
              "title": "Ducan Hines Cake Mix, Banana, Dolly Parton's, Southern Style - 15.25 oz",
              "source": "Kroger",
              "thumbnail": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSKgDl2sFpzJsybsztdvXkZFqX6ot9G3Bt-TdcCGynlXLQfye8wQr53wcfw0FGA7EuOjK2S2u6JcaBhzxpw5WpObAW3VEYknBhv3_5xaDbs6SAYKEJLCaUO3g&usqp=CAE",
              "price": "$1.99"
            },
            {
              "title": "Brothers All Natural Fruit Crisps, Banana, Freeze Dried - 0.59 oz",
              "source": "H-E-B",
              "thumbnail": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQOJp7qS3JU7thC90rMQGUOTjljL_BzZL6nuUO34TRjZ7lnpuwozv8r08ohEgUj7embiByZPYpa8FEusKiVVfgMmvR17FrWhVUU83aaT9TIyk9uW_jIiDurRg&usqp=CAE",
              "price": "$1.44"
            },
            {
              "title": "Pisang Raja Banana Plant - King of Bananas - Live Plant",
              "source": "Walmart - Bountiful Garden Nursery",
              "thumbnail": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT0b9yIxB8vXWg4Ct31DQpv7-bBJ2CWS9dYHuBd4ZxAhqJ3lNUmiyXbZRhCgx5zk6-Tiovad0bYB6-rneoAZ___3_DL01wT&usqp=CAE",
              "price": "$24.97"
            },
            {
              "title": "Goliath Games Banana Blast Game",
              "source": "Target",
              "thumbnail": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTrNH6hubhF_mueyUSCPMO2E_MDLS_prcvlalkjtNXEkFBzSMNgAjr5CvKby51-PcAdlYTpeuj6z26hAndilwJr733Ebt7KKzqo6hdcLDsIQs2iKSuJ_nob&usqp=CAE",
              "price": "$34.99"
            },
            {
              "title": "Dwarf Orinoco Banana Live Plant - Musa - Wellspring Gardens Starter Plant, Size ...",
              "source": "Walmart - Wellspring Gardens",
              "thumbnail": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT-Wdil8MRAJb9VVJtKdoPdwUA9VOkQpJmBgJJAvBC1FbRI7PZCRKtoVJ_xRkw1FDm3cqdGKYhwIVdqfQ6GIyrKJe51RSgX&usqp=CAE",
              "price": "$24.99"
            },
            {
              "title": "Limes - 16 oz Bag",
              "source": "H-E-B",
              "thumbnail": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTjMiOsQbo1iRkWjN6xUaQlZPYvr7dxZxQDMdJUFO7HoDSaJG-dz2pG0puFLAJNeDUUTi-h94r4Xqv321rIHNwrWUwOAR5pT3O-12ivHiYV&usqp=CAE",
              "price": "$3.10"
            }];
          var curItem = "bananas"
          query = "You are a price conscious buyer and are trying to hunt for the best grocery store deals given a set of data. Given the following JSON, determine the best 3 deals when a customer is requesting " + curItem + " on their grocery list. Output the result as the JSON with only the top 3 results included. \n"
          query += JSON.stringify(json);
        }
        console.log(query);
        const result = await queryChatGPT(query);
        console.log(result["message"]);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.font-size-lg {
  font-size: 2rem;
  font-family: sans-serif;
}

.bg-color {
  background-color: #cedcdd;
}

.container {
  margin-top: 180px;
}

.btn {
  margin-right: 10px;
}
</style>
