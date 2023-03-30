<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div v-if="house" class="col-10 mt-5">
        <HouseCard :house="house" />
      </div>
    </section>
  </div>
  <ModalComponent v-if="house">
  <HouseForm :house="house"/>
  </ModalComponent>
</template>

<script>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import HouseCard from "../components/HouseCard.vue";
import HouseForm from "../components/HouseForm.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { housesService } from "../services/HousesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute();
    async function getHouseById() {
      try {
        await housesService.getHouseById(route.params.houseId);
      } catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getHouseById();
    });
    return {
      house: computed(() => AppState.house),
    };
  },
  components: { HouseCard, ModalComponent, HouseForm },
};
</script>

<style lang="scss" scoped></style>
