import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createNotificationsSlice, NotificationsSliceType } from "./notificationsSlice"

export type FavoritesSliceType = {
    favorites : Recipe[]
    handlClickFavorite: (recipe: Recipe) => void ,
    favoriteExists: (id: Recipe["idDrink"]) => boolean,
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & NotificationsSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handlClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)){
            set((state) => ({
                favorites: state.favorites.filter((favorite) => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationsSlice(set,get, api).showNotification({text: "Se elimino de favoritos", error: false})
        }else{
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationsSlice(set,get, api).showNotification({text: "Se Agrego a favoritos", error: false})
        }
        localStorage.setItem("favorites", JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some((favorite) => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem("favorites")
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})