// import Cookies from 'universal-cookie';

class LocalStorageService {
  ls = window.localStorage;

  removeItem = (key: any) => {
    this.ls.removeItem(key);
  }

  setItem(key: any, value: any) {
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }

  getItem(key: any) {
    let value: any = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  getLoggedInUser() {
    return this.getItem("auth_user");
  }
}

export default new LocalStorageService();