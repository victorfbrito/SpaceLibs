import RestService from "~/service/rest";

import { store } from "~/index";
import { addLoading, removeLoading } from "~/store/actions/loading";

export default class LoginServer {
  static send = async (email) => {
    try {
      store.dispatch(addLoading());
      // Verifique a config/baseurl  e tambem service/rest para entender melhor
      // toda lógica deve ser feita aqui, retornar apenas o valor para a classe.

      await RestService.postRest(`/passwords`, email);
    } catch (err) {
      return err;
    } finally {
      store.dispatch(removeLoading());
    }
  };
  static post = async (data) => {
    try {
      store.dispatch(addLoading());
      // Verifique a config/baseurl  e tambem service/rest para entender melhor
      // toda lógica deve ser feita aqui, retornar apenas o valor para a classe.

      await RestService.putRest(`/passwords`, data);
    } catch (err) {
      return err;
    } finally {
      store.dispatch(removeLoading());
    }
  };
}
