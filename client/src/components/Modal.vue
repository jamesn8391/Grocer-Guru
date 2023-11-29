<template>
    <div class="viewModal viewModalBackground">
        <div class="mt-3">
            <h1>Choose Groceries to Calibrate Algorithm</h1>
            <div class="container mt-3">
                <div id="groceryCarousel" class="carousel slide">
                    <div class="carousel-inner">
                        <div v-for="(result, resultIndex) in shoppingResults" :key="resultIndex" class="carousel-item"
                            :class="{ active: resultIndex === 0 }">
                            <div class="row rowWidth justify-content-center">
                                <div v-for="n in 3" class="col">
                                    <div class="item-container" v-if="result[n]">
                                        <img :src="result[n].thumbnail" width="100%" class="d-block w-100">
                                        <h5>{{ result[n].title }}</h5>
                                        <h5>{{ result[n].price }}</h5>
                                        <h5>{{ result[n].source }}</h5>
                                    </div>
                                    <button type="button" class="btn btn-success">Select</button>
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
    props: {
        shoppingResults: {
            type: Array,
            required: true,
        },
    },
    mounted() {
        console.log(this.shoppingResults)
        window.onload = () => {
            const carousel = new bootstrap.Carousel(document.getElementById('groceryCarousel'));
            carousel.interval = false;
        };

    }
}
</script>

<style scoped>
.viewModalBackground {
    background-color: #ebeff0;
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
    width: 75%;
    height: 575px;
}

h5 {
    font-weight: normal;
}

img {
    border: 2px solid black;
    border-radius: 12px;
}

.item-container {
    width: 84%;
    margin: auto;
}

.rowWidth {
    width: 85%;
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
    top: 50%;
    transform: translateY(-50%);
    width: 5%;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    background-color: black;
}
</style>
  