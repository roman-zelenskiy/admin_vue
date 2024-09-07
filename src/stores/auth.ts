import { defineStore } from "pinia";
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { ref, onMounted } from "vue";
import { getCurrentUser } from "vuefire";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth()!;
  const user = ref<User | null>(null);

  onMounted(async () => {
    user.value = await getCurrentUser();
  });

  const logout = () => {
    return signOut(auth);
  };
  return { logout, user };
});
