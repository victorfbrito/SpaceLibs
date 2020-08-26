import RestService from "~/service/rest";

import { store } from "~/index";
import { addLoading, removeLoading } from "~/store/actions/loading";
import { history } from "~/router";

export default class HomeServer {
  static get = async (cardId) => {
    try {
      store.dispatch(addLoading());
      // Verifique a config/baseurl  e tambem service/rest para entender melhor
      // toda lógica deve ser feita aqui, retornar apenas o valor para a classe.
      const res = await RestService.getAuthenticated(`/cards/${cardId}`);
      return res;
    } catch (err) {
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };

  static del = async (id) => {
    try {
      store.dispatch(addLoading());
      console.log(id);
      await RestService.deleteAuthenticated(`/cards/${id}`);
      history.push("/");
    } catch (err) {
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };

  static putDesc = async (descr, key) => {
    try {
      store.dispatch(addLoading());
      const card = {
        text: descr,
      };
      const data = await RestService.putAuthenticated(`/cards/${key}`, card);
      return data;
    } catch (err) {
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };
  static putName = async (name, key) => {
    try {
      store.dispatch(addLoading());
      const card = {
        title: name,
      };
      const data = await RestService.putAuthenticated(`/cards/${key}`, card);
      return data;
    } catch (err) {
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };
  static putFile = async (fd, key) => {
    try {
      store.dispatch(addLoading());
      const img = await RestService.postRest(`/files`, fd);
      const card = {
        image: img.id,
      };
      const data = await RestService.putAuthenticated(`/cards/${key}`, card);
      console.log("new data:");
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };
}
