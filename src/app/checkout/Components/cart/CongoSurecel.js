import { Button, Divider, List } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CongoSurecel = () => {
  const { order_num, invoice_hash, previous_cart } = useSelector((state) => {
    return state.cart;
  });

  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!userInfo.id) {
    return <div></div>;
  }
  return (
    <div className="p-2 px-1 md:px-10 md:m-5 flex flex-col items-center text-center">
      <div className="w-[90%] md:w-[50%]">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "0 25px",
          }}
        >
          <h1 className="thanks mb-2 text-[2.5rem] font-bold">Thank You</h1>
          <p className="process">We are now processing your purchase!</p>
          <h4 className="clickhere mt-4">
            Click{" "}
            <a
              href={
                process.env.NEXT_PUBLIC_ENV_VARIABLE +
                "/invoice/download/" +
                userInfo.company.id +
                "?order_hash=" +
                invoice_hash
              }
              className="text-dfblue font-bold"
            >
              here
            </a>{" "}
            to download your invoice for order number {order_num}
          </h4>
          <p className="email">
            An email is also sent with attached invoice.pdf to your mail
          </p>
        </div>
        <div className="cartitems">
          {previous_cart.order_groups.map((obj) => {
            return (
              <div
                style={{
                  maxWidth: "436px",
                  width: "100%",
                  borderBottom: "1px solid rgba(0,0,0,.12)",
                }}
              >
                {obj.plan && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "20px 30px",
                    }}
                  >
                    <div>Plan : {obj.plan?.name}</div>
                    <div>
                      $
                      {obj.plan_prorated_amt
                        ? obj.plan_prorated_amt
                        : obj.plan?.amount_recurring.toFixed(2)}
                    </div>
                  </div>
                )}
                {obj.sim && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "20px 30px",
                    }}
                  >
                    <div>Sims : {obj.sim.name}</div>
                    <div>${obj.sim?.amount_w_plan.toFixed(2)}</div>
                  </div>
                )}
                {obj.device && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "20px 30px",
                    }}
                  >
                    <div>Device : {obj.device.name}</div>
                    <div>
                      $
                      {obj.plan
                        ? obj.device.amount_w_plan.toFixed(2)
                        : obj.device.amount}
                    </div>
                  </div>
                )}
                {obj.plan != null && obj.plan.amount_onetime != 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "20px 30px",
                    }}
                  >
                    <div>Activation fee:</div>
                    <div>${obj.plan?.amount_onetime.toFixed(2)}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <div style={{flexBasis:"70%"}}>

</div> */}

          <div className="finalinvoice">
            <List>
              <div className="myflex">
                <div>Subtotal:</div>
                <div>${previous_cart?.subtotalPrice.toFixed(2)}</div>
              </div>
              <div className="myflex">
                <div>Shipping:</div>
                <div>+ ${previous_cart?.shippingFee.toFixed(2)}</div>
              </div>
              <div className="myflex">
                <div>
                  Coupons:
                  {previous_cart.couponDetails.map((obj) => (
                    <small>{obj.code}</small>
                  ))}
                </div>
                <div>- ${Math.abs(previous_cart.coupons)}</div>
              </div>
              <div className="myflex">
                <div>State Tax:</div>
                <div>+ ${previous_cart.taxes.toFixed(2)}</div>
              </div>
              <div className="myflex">
                <div>Plan Payment:</div>
                <div>+ ${previous_cart?.regulatory.toFixed(2)}</div>
              </div>
            </List>

            <Divider />
            <div>
              <div className="myflex">
                <div>
                  <h3>Total:</h3>
                </div>
                <h3>${previous_cart?.totalPrice.toFixed(2)}</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Button
                  className="btn btn--primary btn--medium primary"
                  style={{ width: 131 }}
                  variant="contained"
                  color="success"
                  onClick={() => router.push("/")}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongoSurecel;
