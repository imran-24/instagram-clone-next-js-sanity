import axios from 'axios';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set: any, get: any) => ({
        userProfile: null,
        allUsers: [],
        addUser: (user: any)=> set({userProfile: user}),
        removeUser: ()=> set({userProfile: null}),
        fetchAllUsers: async () => {
            const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/users`);
        
            set({ allUsers: response.data });
        },
    }),
    {
      name: 'localStorage', // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)


export default  useAuthStore