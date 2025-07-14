import { useSelector } from "react-redux";
import { updateCart } from "../store/slices/CartSlice";
import { updateTaxState } from "../store/slices/StateTaxSlice";
import { useEffect } from "react";

const useInterCom = () => {
  const { cart, user } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.intercomSettings = {
        app_id: "j4tst9gw",
        name: user?.userInfo?.fname,
        email: user?.userInfo?.email,
        account_num: user?.userInfo?.id,
      };

      (function () {
        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
          ic("reattach_activator");
          ic("update", window.intercomSettings);
        } else {
          var d = document;
          var i = function () {
            i.c(arguments);
          };
          i.q = [];
          i.c = function (args) {
            i.q.push(args);
          };
          w.Intercom = i;
          function l() {
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.intercom.io/widget/j4tst9gw";
            var x = d.getElementsByTagName("script")[0];
            x.parentNode.insertBefore(s, x);
          }
          if (w.attachEvent) {
            w.attachEvent("onload", l);
          } else {
            w.addEventListener("load", l, false);
          }
        }
      })();
    }
  }, [user]);
};

export default useInterCom;
