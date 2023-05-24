import { create } from 'zustand'

interface IFetchStatusStore {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const useFetchStatusStore = create<IFetchStatusStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading })
}))

export default useFetchStatusStore
