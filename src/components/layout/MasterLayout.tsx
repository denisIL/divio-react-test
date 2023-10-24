import { Stack } from "@mui/material";
import { Navbar } from "./Navbar";
import { Route, Routes } from "react-router-dom";
import { NAVIGATION } from "../../constants/routes";
import { AuthPage } from "../../pages/AuthPage";
import { HomePage } from "../../pages/HomePage";
import { useCookies } from "react-cookie";
import { PrivateRoute } from "../common/PrivateRoute";
import { clear, setAuthToken, setEmail } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { parseJwt } from "../../utils/jwt";

interface MasterLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const MasterLayout = ({ children }: MasterLayoutProps) => {
  const [cookies] = useCookies(["authToken"]);
  const dispatch = useDispatch();
  if (cookies.authToken) {
    dispatch(setAuthToken(cookies.authToken));
    dispatch(setEmail(parseJwt(cookies.authToken).email));
  } else {
    dispatch(clear());
  }

  return (
    <div>
      <Navbar />
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ width: "100%", maxWidth: "1200px", py: 1, px: 2 }}>
          <Routes>
            <Route
              path={NAVIGATION.home}
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path={NAVIGATION.auth} element={<AuthPage />} />
          </Routes>
          {children}
        </Stack>
      </Stack>
    </div>
  );
};
