<template>
  <div class="container-fluid">
    <div v-if="account.id" class="row my-3">
      <div class="col-12">
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning">Add House</button>
      </div>
    </div>
    <section class="row">
      <div v-for="houseFromVFor in houses" :key="houseFromVFor.id" class="col-12 col-md-4 g-3">
        <HouseCard :house="houseFromVFor"/>
      </div>
    </section>
  </div>
  <ModalComponent>
    <HouseForm/>
  </ModalComponent>
</template>

<script>
import { onMounted, computed } from "vue";
import Pop from "../utils/Pop.js";
import { logger } from '../utils/Logger.js';
import { housesService } from "../services/HousesService.js";
import { AppState } from "../AppState.js";
import HouseCard from "../components/HouseCard.vue";
import ModalComponent from "../components/ModalComponent.vue";
import HouseForm from "../components/HouseForm.vue";

export default {
    setup() {
        async function getHouses() {
            try {
                await housesService.getHouses();
            }
            catch (error) {
              logger.log(error)
              Pop.error(error);
            }
        }
        onMounted(() => {
            getHouses();
        });
        return {
          houses: computed(() => AppState.houses),
          account: computed(() => AppState.account)
        };
    },
    components: { HouseCard, ModalComponent, HouseForm }
};
</script>

<style lang="scss" scoped></style>
