import {UserService} from "@services";
import create from "zustand";
import {devtools} from "zustand/middleware";
import {ListParams, LoadingState, SliceLoadingState, User} from "@types";
import {unionBy} from 'lodash'

export type UsersSliceState = {
  list: User[]
  fetchAllUsers: (paginationParams?: Omit<ListParams, 'total'>) => Promise<void>
  createUser: (user: Omit<User, 'id' | 'is_admin' | 'b2b_discount_group_id'>) => Promise<void>,
  updateUser: (userId: User['id'], user: Partial<User>) => Promise<void>,
  deleteUser: (userId: User['id']) => Promise<void>
} & ListParams & SliceLoadingState

const userService = new UserService()

const useUsersStore = create<UsersSliceState>(devtools((set, get) => ({
  // move
  list: [],
  limit: userService.baseLimit,
  page: 1,
  total: 0,
  loadingState: LoadingState.PENDING,
  // end
  fetchAllUsers: async (params) => {
    try {
      if (get().loadingState === LoadingState.LOADING) {
        return
      }
      const {rows, count} = await userService.fetchList({...params});
      set(() => ({list: rows || [], total: count}))
    } catch (e) {
      set((prev) => ({...prev, loadingState: LoadingState.FAILED}))
    } finally {
      set((prev) => ({...prev, loadingState: LoadingState.LOADED}))
    }
  },
  createUser: async (user) => {
    try {
      const item = await userService.createItem(user);
      set((prev) => ({...prev, list: [...prev.list, item]}))
    } catch (e) {
      console.error('createUser', e)
    }
  },
  updateUser: async (userId, user) => {
    try {
      await userService.updateItem(userId, user);
      set((state) => {
        const oldUser = state.list.find(o => o.id === userId)
        const newUser = {
          ...oldUser,
          ...user
        }
        state.list = unionBy([newUser as User], state.list, 'id')
      })
    } catch (e) {
      console.error('updateUser', e)
    }
  },
  deleteUser: async (userId) => {
    try {
      await userService.deleteItem(userId);
      set((state) => {
        state.list = state.list.filter(o => o.id !== userId)
      })
    } catch (e) {
      console.error('deleteUser', e)
    }
  }
})))

export {
  useUsersStore
}
