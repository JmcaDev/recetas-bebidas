import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice"
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice"
import { createNotificationsSlice, NotificationsSliceType } from "./notificationsSlice"

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationsSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationsSlice(...a)
})))