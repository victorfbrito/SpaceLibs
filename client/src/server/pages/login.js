import RestService from "~/service/rest";
import AuthService from "~/service/auth";

import { store } from "~/index";
import { addLoading, removeLoading } from "~/store/actions/loading";
import { saveSession } from "~/store/actions/auth";

export default class LoginServer {
  static post = async (session) => {
    try {
      store.dispatch(addLoading());
      // Verifique a config/baseurl  e tambem service/rest para entender melhor
      // toda lógica deve ser feita aqui, retornar apenas o valor para a classe.

      const data = await RestService.postRest(`/sessions`, session);
      console.log("login data JSON:" + JSON.stringify(data));
      AuthService.create(data);
      store.dispatch(saveSession(data));
      // const newsession = store.dispatch(saveSession(data));
      //console.log("newsession: " + JSON.stringify(newsession));
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      store.dispatch(removeLoading());
    }
  };
}
