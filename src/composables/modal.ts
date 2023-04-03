import { ref, shallowRef } from "vue";
import SignUpForm from "../components/UserForm.vue";
import HelloWorld from "../components/HelloWorld.vue";

const show = ref(false);
const component = shallowRef();

export function useModal() {
  return {
    show,
    component,
    showModal: (type: "signUp" | "signIn") => {
      show.value = true;
      switch (type) {
        case "signIn":
          return (component.value = HelloWorld);
        case "signUp":
          return (component.value = SignUpForm);
      }
    },
    hideModal: () => (show.value = false),
  };
}
