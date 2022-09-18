import { useCallback } from "react";
import { Navbar } from "./component/Navbar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Home } from "./page/Home";
import { Login } from "./component/Login";
import { useStytch, useStytchSession } from "@stytch/stytch-react";
import { Authenticate } from "./page/Authenticate";
import { AccountPaymentMethod } from "./page/AccountPaymentMethod";
import { QRCodeConfirmation } from "./page/QRCodeConfirmationPage";
import { Account } from "./page/Account";
import { PrivateRoute } from "./layout/PrivateRoute";

import "./App.css";


export default function App() {
  const navigate = useNavigate();
  const client = useStytch();
  const session = useStytchSession();

  const handleLongin = async (email) => {
    await client.magicLinks.email.loginOrCreate(email);
    alert(` Email has been sent to ${email}`);
  };

  const handleLogout = useCallback(async () => {
    await client.session.revoke();
    alert("Your session is finished");
    navigate("/login");
  }, [client]);

  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} />
      <Routes>
        {session ? (
          <>
            <Route
              index
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
            <Route path="/qrcode_confirmation" element={<QRCodeConfirmation />} />
          </>
        ) : (
          <>
            <Route index path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login handleLongin={handleLongin} />}
            />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route
              path="/checkoutPaymentMethod"
              element={<AccountPaymentMethod />}
            />
          </>
        )}
        <Route path="/*" element={<Navigate to="/account" replace />} />
      </Routes>
    </div>
  );
}
