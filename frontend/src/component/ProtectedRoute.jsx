import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const ProtectedRoute = () => {
    const {userInfo} = useSelector((state) => state.auth);
    const location = useLocation();

    return userInfo ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" state={{from: location}} replace/>
    );
};

export default ProtectedRoute;
