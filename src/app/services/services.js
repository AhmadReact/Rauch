const url = process.env.NEXT_PUBLIC_ENV_VARIABLE;
const auth = process.env.NEXT_PUBLIC_API_KEY;

export function getUsages(id, type, date2 = "202206", act_date) {
  return new Promise((resolve, reject) => {
    var formdata = new FormData();
    var date =
      new Date().getFullYear() + ("0" + (new Date().getMonth() + 1)).slice(-2);
    formdata.append("sim", id);
    formdata.append("type", type);
    formdata.append("date", date);

    if (act_date != null) {
      formdata.append("activation_date", act_date);
    }
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(url + "/get-usage", requestOptions)
      .then((response) => {
        try {
          response.json();
        } catch (error) {
          console.log(error);
          return true;
        }
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log("error");
      });
  });
}

export function getBillinghistory() {
  return new Promise((resolve, reject) => {
    var user = JSON.parse(secureLocalStorage.getItem("user_token"));

    var myHeaders = new Headers();
    myHeaders.append("AccessToken", "key");
    myHeaders.append("Authorization", auth);
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("Expires", "0");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url + "customer-orders?hash=" + user.hash, requestOptions)
      .then((response) => resolve(response.json()))

      .catch((error) => {
        reject(error);
        console.log("error");
      });
  });
}

export function addonNumberchange() {
  return new Promise((resolve, reject) => {
    var user = JSON.parse(secureLocalStorage.getItem("user_token"));

    var myHeaders = new Headers();
    myHeaders.append("AccessToken", "key");
    myHeaders.append("Authorization", auth);
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("Expires", "0");
    var formdata = new FormData();
    formdata.append("customer_id", user.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: formdata,
    };

    fetch(url + "bulk-order/addons/number-change", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log("error");
      });
  });
}

export function getCustomerTaxFromId(id) {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("AccessToken", "key");
    myHeaders.append("Authorization", auth);
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("Expires", "0");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url + "/customer?tax_id=" + id, requestOptions)
      .then((response) => resolve(response.json()))

      .catch((error) => {
        reject(error);
        console.log("error");
      });
  });
}

export function forgotPassword(identifier) {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("AccessToken", "key");
    myHeaders.append("Authorization", auth);
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("Expires", "0");

    var formdata = new FormData();
    formdata.append("identifier", identifier);
    formdata.append("from_bulk_order", false);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: formdata,
    };

    fetch(url + "/forgot-password", requestOptions)
      .then((response) => resolve(response.json()))

      .catch((error) => {
        reject(error);
        console.log("error");
      });
  });
}

export function resetPassword(token, password) {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("AccessToken", "key");
    myHeaders.append("Authorization", auth);

    var formdata = new FormData();
    formdata.append("token", token);
    formdata.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(url + "/reset-password", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error);
      });
  });
}

export function supportMessage(obj) {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("AccessToken", "key");
    myHeaders.append("Authorization", auth);
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("Expires", "0");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(obj),
    };

    fetch(url + "/support/email", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log("error");
      });
  });
}

export function createSubscriptionAddon(obj) {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("AccessToken", "key");
    myHeaders.append("Authorization", auth);
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("Expires", "0");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(obj),
    };

    fetch(url + "/create-subscription-addon", requestOptions)
      .then((response) => resolve(response.json()))

      .catch((error) => {
        reject(error);
        console.log("error");
      });
  });
}

export function autoLogin(hash) {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("AccessToken", "key");
    myHeaders.append("Authorization", auth);

    const formdata = new FormData();
    formdata.append("identifier", hash);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(url + "/user-login", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error);
        console.log("error");
      });
  });
}
