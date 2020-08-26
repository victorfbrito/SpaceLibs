import RestService from "~/service/rest";

import { store } from "~/index";
import { addLoading, removeLoading } from "~/store/actions/loading";

export default class RegisterServer {
  static post = async (user) => {
    try {
      store.dispatch(addLoading());
      // Verifique a config/baseurl  e tambem service/rest para entender melhor
      // toda lógica deve ser feita aqui, retornar apenas o valor para a classe.

      await RestService.postRest(`/users`, user);
    } catch (err) {
      return err;
    } finally {
      store.dispatch(removeLoading());
    }
  };
}
