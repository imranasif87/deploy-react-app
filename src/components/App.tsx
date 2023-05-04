/* eslint-disable @typescript-eslint/promise-function-async */
import React, {
    FunctionComponent,
    lazy,
    Suspense,
    useContext,
    Fragment,
} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CardBtn from "./CardBtn";
import DefaultContainer from "../layout/DefaultContainer";

import ChangePassword from "../pages/auth/ChangePassword";
import AuthProvider, { AuthContext } from "../pages/auth/AuthContext";

// Code splitting, speed up application by not having every page be imported upon startup.
const Home = lazy(() => import("../pages/Home"));
const User = lazy(() => import("../pages/auth/User"));
const Incident = lazy(() => import("../pages/Incident"));
const PressRelease = lazy(() => import("../pages/PressRelease"));
const Passengers = lazy(() => import("../pages/Passengers"));
const RegisterAffected = lazy(() => import("../pages/RegisterAffected"));
const HRK_controlpanel = lazy(() => import("../pages/HRK_controlpanel"));
const InitialContact_controlpanel = lazy(
    () => import("../pages/InitialContact_controlpanel")
);
const HistoricalIncidents = lazy(() => import("../pages/HistoricalIncidents"));
const ActiveIncidents = lazy(() => import("../pages/ActiveIncidents"));
const Test = lazy(() => import("../pages/Test"));
const HRKtest = lazy(() => import("../pages/Test"));
const AddIncident = lazy(() => import("../pages/AddIncident"));
const AddFlight = lazy(() => import("../pages/AddFlight"));

const Login = lazy(() => import("../pages/auth/Login"));
const Admin = lazy(() => import("../pages/admin/Admin"));
const Users = lazy(() => import("../pages/admin/Users"));
const NewUser = lazy(() => import("../pages/admin/NewUser"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));

const Test_HRK_controlpanel = lazy(
    () => import("../pages/Test_HRK_controlpanel")
);
const Affected = lazy(() => import("../pages/Affected"));
const SoulInformation = lazy(() => import("../pages/SoulInformation"));
const Liason = lazy(() => import("../pages/Liason"));
const ManagementSupport = lazy(() => import("../pages/ManagementSupport"));
const Crew = lazy(() => import("../pages/Crew"));
const InformationToAffected = lazy(
    () => import("../pages/InformationToAffected")
);
const Statistics = lazy(() => import("../pages/Statistics"));
const Evaluation = lazy(() => import("../pages/Evaluation"));
const NoMatch = lazy(() => import("../pages/NoMatch"));
const AffectedInformation = lazy(() => import("../pages/AffectedInformation"));

export function CircularIndeterminate() {
    return (
        <Box
            sx={{
                display: "flex",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <CircularProgress />
        </Box>
    );
}

function PrivateRoute(props: any) {
    const { isAuthenticated } = useContext(AuthContext);
    console.log("isAuthenticated:", isAuthenticated);
    return isAuthenticated ? (
        <Fragment>{props.children}</Fragment>
    ) : (
        <Navigate to={{ pathname: "/login" }} />
    );
}

const App: FunctionComponent = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Home navHeader="Hjemmesiden">
                                <CardBtn
                                    path="/InitialContact_controlpanel"
                                    headline="Informasjon"
                                    description="Informasjon angående hendelsen."
                                />
                                <CardBtn
                                    path="/registerAffected"
                                    headline="Registrering"
                                    description="Pårørendeskjema"
                                />
                            </Home>
                        </Suspense>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <User navHeader="Brukersiden" />
                        </Suspense>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Admin navHeader="Adminsiden" />
                        </Suspense>
                    }
                />
                <Route
                    path="/userAdministration"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Users navHeader="Brukeradministrering" />
                        </Suspense>
                    }
                />
                <Route
                    path="/newUser"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <NewUser navHeader="Opprett ny bruker" />
                        </Suspense>
                    }
                />
                <Route
                    path="/registerAffected"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <RegisterAffected navHeader="Skjema for registrering av pårørende" />
                        </Suspense>
                    }
                />
                <Route
                    path="/Test_HRK_controlpanel"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Test_HRK_controlpanel navHeader="Hjemmesiden">
                                <CardBtn path="/AddIncident" headline="Registrer ny hendelse" />
                                <CardBtn
                                    path="/HistoricalIncidents"
                                    headline="Historiske hendelser"
                                />
                                <CardBtn path="/Test" headline="Hendelse lagt inn av HRK" />
                            </Test_HRK_controlpanel>
                        </Suspense>
                    }
                />
                <Route
                    path="/InitialContact_controlpanel"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <InitialContact_controlpanel navHeader="Kontrollpanel" />
                        </Suspense>
                    }
                />
                <Route
                    path="/HRK_controlpanel"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <HRK_controlpanel navHeader="Kontrollpanel" />
                        </Suspense>
                    }
                />
                <Route
                    path="/AddIncident"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <AddIncident navHeader="Legg til hendelse" />
                        </Suspense>
                    }
                />
                <Route
                    path="/AddFlight"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <AddFlight navHeader="Legg til Flight" />
                        </Suspense>
                    }
                />
                <Route
                    path="/PressRelease/:id"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <PressRelease navHeader="Pressemeldinger" />
                        </Suspense>
                    }
                />
                <Route
                    path="/Passengers"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Passengers navHeader="Passengers" />
                        </Suspense>
                    }
                />
                <Route
                    path="/AffectedInformation/:id"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <AffectedInformation navHeader="AffectedInformation" />
                        </Suspense>
                    }
                />
                <Route
                    path="/SoulInformation/:id"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <SoulInformation />
                        </Suspense>
                    }
                />
                <Route
                    path="/HistoricalIncidents"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <HistoricalIncidents navHeader="Historiske hendelser" />
                        </Suspense>
                    }
                />
                <Route
                    path="/ActiveIncidents"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <ActiveIncidents />
                        </Suspense>
                    }
                />

                <Route
                    path="/test/:id"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <HRKtest navHeader="Informasjon og behandlingsside" />
                        </Suspense>
                    }
                />
                <Route
                    path="/Affected"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Affected />
                        </Suspense>
                    }
                />
                <Route
                    path="/Liason"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Liason navHeader="Liason" />
                        </Suspense>
                    }
                />
                <Route
                    path="/ManagementSupport"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <ManagementSupport navHeader="Lederstøtte" />
                        </Suspense>
                    }
                />
                <Route
                    path="/Crew"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Crew navHeader="WF-ansatte" />
                        </Suspense>
                    }
                />
                <Route
                    path="/InformationToAffected"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <InformationToAffected navHeader="Informasjon til pårørende" />
                        </Suspense>
                    }
                />
                <Route
                    path="/Statistics"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Statistics navHeader="Statistikk" />
                        </Suspense>
                    }
                />
                <Route
                    path="/NoMatch//*"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <NoMatch navHeader="Ingen treff" />
                        </Suspense>
                    }
                />
                <Route
                    path="/Evaluation/*"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <PrivateRoute>
                                <Evaluation navHeader="Evaluation" />
                            </PrivateRoute>
                        </Suspense>
                    }
                />

                <Route
                    path="/Incident/:id"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Incident navHeader="Hendelse" />
                        </Suspense>
                    }
                />
                <Route
                    path="/Login"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <Login navHeader="Hendelse">HRKtest</Login>
                        </Suspense>
                    }
                />
                <Route
                    path="/ForgotPassword"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <ForgotPassword navHeader="Hendelse">HRKtest</ForgotPassword>
                        </Suspense>
                    }
                />
                <Route
                    path="/ResetPassword"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <ResetPassword navHeader="Hendelse">HRKtest</ResetPassword>
                        </Suspense>
                    }
                />
                <Route
                    path="/ChangePassword"
                    element={
                        <Suspense fallback={<CircularIndeterminate />}>
                            <ChangePassword navHeader="Endre passord">
                                ChangePassword
                            </ChangePassword>
                        </Suspense>
                    }
                />
                <Route
                    path="/cardTest"
                    element={
                        <CardBtn
                            path="/"
                            headline="Informasjon"
                            description="Informasjon angående hendelsen. sdaaaaaaaaaaaaa aaaaaaaaaaaaa dasdssssssssssss ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s dasdssssssssssss ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s dasdssssssssssss ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s dasdssssssssssss ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd sdasdssssssssssss ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s ssssssss sdad sdadasdd dasdsad asdsadsad sas saad sdsadasd s"
                        />
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
