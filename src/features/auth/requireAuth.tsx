import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../../stateManager/hooks/redux"
import { getItemWebStorage } from "../webStorageSaver/inWebStorage"

export function RequireAuth() {
    let token = useAppSelector(state => state.auth.token)
    if (token == null) {
        token = getItemWebStorage("token")
    }
    const location = useLocation()

    return (
        token != null
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    )
}