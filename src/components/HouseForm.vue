<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create House</h1>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>

  <form @submit.prevent="handleSubmit()">
    <div class="modal-body">
      <div class="mb-2">
        <label for="year" class="form-label">Year</label>
        <input
          v-model="editable.year"
          type="number"
          required
          id="year"
          class="form-control"
        />
      </div>
      <div class="mb-2">
        <label for="bedrooms">Bedrooms</label>
        <input
          type="number"
          required
          id="bedrooms"
          class="form-control"
          v-model="editable.bedrooms"
        />
      </div>
      <div class="mb-2">
        <label for="bathrooms">Bathrooms</label>
        <input
          type="number"
          required
          id="bathrooms"
          class="form-control"
          v-model="editable.bathrooms"
        />
      </div>
      <div class="mb-2">
        <label for="levels">Levels</label>
        <input
          type="number"
          required
          id="levels"
          class="form-control"
          v-model="editable.levels"
        />
      </div>
      <div class="mb-2">
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          required
          class="form-control"
          v-model="editable.description"
        />
      </div>
      <div class="mb-2">
        <label for="imgUrl">Image URL</label>
        <input
          type="url"
          id="imgUrl"
          required
          class="form-control"
          v-model="editable.imgUrl"
        />
      </div>
      <div class="mb-2">
        <label for="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          class="form-control"
          min="1"
          v-model="editable.price"
        />
      </div>
    </div>
    <div class="modal-footer">
      <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
        {{ house.id ? "Edit House" : "Create House" }}
      </button>
    </div>
  </form>
</template>

<script>
import { House } from "../models/House.js";
import { ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";
import { useRouter } from "vue-router";

export default {
  props: {
    house: {
      type: House,
      default: {},
    },
  },
  setup(props) {
    const editable = ref({ ...props.house });
    const router = useRouter();
    return {
      editable,

      async createHouse() {
        try {
          const houseData = editable.value;
          const house = await housesService.createHouse(houseData);
          router.push({ name: "HouseDetails", params: { houseId: house.id } });
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },
      async editHouse() {
        try {
          const houseData = editable.value;
          await housesService.editHouse(houseData);
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },
      handleSubmit() {
        if (props.house.id) {
          this.editHouse();
        } else {
          this.createHouse();
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
