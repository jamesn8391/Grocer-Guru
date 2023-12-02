<template>
    <div class="viewModal viewModalBackground">
        <div class="mt-3">
            <h1>Choose Groceries to Calibrate Algorithm</h1>
            <div class="container mt-3">
                <div id="groceryCarousel" class="carousel slide">
                    <div class="carousel-inner">
                        <div v-for="(result, resultIndex) in calibrationResults" :key="resultIndex" class="carousel-item"
                            :class="{ active: resultIndex === 0 }">
                            <div class="row justify-content-center">
                                <div v-for="n in 3" class="col">
                                    <div class="item-container" v-if="result[n - 1]">
                                        <img :src="result[n - 1].thumbnail" width="100%" class="d-block w-100">
                                        <h5>{{ result[n - 1].title }}</h5>
                                        <h5>{{ result[n - 1].price }}</h5>
                                        <h5>{{ result[n - 1].source }}</h5>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-5">
                                        <!-- <div>Selected: {{ selectedItems[resultIndex] }}</div> -->
                                        <select class="form-select form-select-md" v-model="selectedItems[resultIndex]">
                                            <option disabled value="">Please select one</option>
                                            <option>{{ result[0].title }}</option>
                                            <option>{{ result[1].title }}</option>
                                            <option>{{ result[2].title }}</option>
                                        </select>
                                    </div>
                                    <div v-if="computeAllSelect" class="col-2">
                                        <button @click="finalChatQuery" class="btn btn-success">
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#groceryCarousel"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#groceryCarousel"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="false"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arrayMaxLength: 3, // Set the maximum length for your array
        };
    },
    props: {
        calibrationResults: {
            type: Array,
            required: true,
        },
        selectedItems: {
            type: Array,
            required: true,
        },
        finalChatQuery: {
            type: Function,
            required: true,
        }
    },
    mounted() {
        console.log(this.calibrationResults)
        window.onload = () => {
            const carousel = new bootstrap.Carousel(document.getElementById('groceryCarousel'));
            carousel.interval = false;
        };

    },
    computed: {
        computeAllSelect() {
            return this.selectedItems.length === this.arrayMaxLength;
        },
    },
}
</script>

<style scoped>
.viewModalBackground {
    background-color: rgba(248,249,250,255);
    border: 2px solid black;
    border-radius: 17px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    z-index: 1;
    position: fixed;
    text-align: center;
    margin: auto;
    width: 75vw;
    min-height: 70vh;
}

h5 {
    font-weight: normal;
}

img {
    border: 2px solid black;
    border-radius: 12px;
}

.item-container {
    width: 15vw;
    min-height: 47vh;
    margin: auto;
}

.rowWidth {
    width: 5vw;
    margin: auto;
}

.carousel-inner {
    text-align: center;
}

.carousel-item {
    padding: 15px;
}

.carousel-control-prev,
.carousel-control-next {
    z-index: 2;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 5%;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    filter: brightness(0);
}
</style>
  