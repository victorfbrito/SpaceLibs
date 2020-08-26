import RestService from "~/service/rest";
import AuthService from "~/service/auth";
import { store } from "~/index";
import { addLoading, removeLoading } from "~/store/actions/loading";

import { saveSession } from "~/store/actions/auth";

export default class HomeServer {
  static get = async (pagenmr, reverse) => {
    try {
      store.dispatch(addLoading());
      const list = [];
      var reverseresult = "";
      if (reverse === true) {
        reverseresult = "asc";
      } else {
        reverseresult = "desc";
      }
      const res = await RestService.getAuthenticated(
        `/cards?reverse=${reverseresult}&page=${pagenmr}`
      );
      const page = res["page"];
      const lastPage = res["lastPage"];
      const obj = res["data"];

      Object.keys(obj).forEach((key, index) => {
        list.push({
          title: obj[key]["title"],
          type: obj[key]["type"],
          key: obj[key]["id"],
        });
      });
      if (reverse) {
        list.reverse();
      }
      return [list, page, lastPage];
    } catch (err) {
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };
  static del = async (id) => {
    try {
      store.dispatch(addLoading());
      console.log("deleted id " + id);
      await RestService.deleteAuthenticated(`/cards/${id}`);
    } catch (err) {
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };
  static post = async (name, type, descr, fd) => {
    try {
      store.dispatch(addLoading());

      const img = await RestService.postRest(`/files`, fd);
      const card = {
        title: name,
        text: descr,
        type: type,
        image: img.id,
      };
      const data = await RestService.postAuthenticated(`/cards`, card);
      return data;
    } catch (err) {
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };
  static authenticate = async () => {
    try {
      store.dispatch(addLoading());

      const data = await AuthService.get();
      const actualsession = await store.dispatch(saveSession(data));
      console.log("data JSON: " + JSON.stringify(data));
      console.log("actualsession: " + JSON.stringify(actualsession));
      return true;
    } catch (err) {
      return false;
    } finally {
      store.dispatch(removeLoading());
    }
  };
}
