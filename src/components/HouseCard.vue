<template>
  <router-link :to="{ name: 'HouseDetails', params: { houseId: house.id } }">
    <div class="elevation-3 rounded bg-light border border-1 border-dark">
      <img :src="house.imgUrl" alt="house" class="img-fluid rounded-top" />
      <div class="text-center p-3">
        <h4>
          {{
            "Bedrooms: " +
            house.bedrooms +
            " | " +
            "Bathrooms: " +
            house.bathrooms
          }}
        </h4>
        <div
          v-if="route.name == 'HouseDetails'"
          class="d-flex flex-column justify-content-center"
        >
          <h5>
            {{
              "Levels: " +
              house.levels +
              " | " +
              "Year: " +
              house.year +
              " | " +
              "Price: $" +
              house.price
            }}
          </h5>
          <h6>{{ house.description }}</h6>
        </div>
        <div
          v-if="house.creatorId == account.id"
          class="d-flex justify-content-around"
        >
          <button class="btn btn-danger" @click.stop="deleteHouse()">
            Delete House!
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            class="btn btn-info"
          >
            🖊️ Edit House
          </button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    house: {
      type: House,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return {
      route,
      account: computed(() => AppState.account),
      async deleteHouse() {
        try {
          if (await Pop.confirm()) {
            const houseId = props.house.id;
            await housesService.deleteHouse(houseId);
            router.push({ name: "Houses" });
          }
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>
