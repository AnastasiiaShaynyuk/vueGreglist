import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class HousesService {
  async getHouses() {
    const res = await api.get('auth/api/houses')
    logger.log('getting houses', res.data)
    AppState.houses = res.data.map(h => new House(h))
  }

  async getHouseById(houseId) {
    AppState.house = null
    const res = await api.get('auth/api/houses/' + houseId)
    logger.log('getting house', res.data)
    AppState.house = new House(res.data)
  }

  async createHouse(houseData) {
    const res = await api.post('auth/api/houses', houseData)
    const newHouse = new House(res.data)
    AppState.houses.push(newHouse)
    return newHouse
  }

  async editHouse(houseData) {
    const res = await api.put("auth/api/houses/" + houseData.id, houseData);
    AppState.house = new House(res.data);
  }

  async deleteHouse(houseId) {
    const res = await api.delete("auth/api/houses/" + houseId);
  }
}

export const housesService = new HousesService()