import { ReactElement, useContext } from 'react'
import SecurityContext from '../context/SecurityContext.ts'
import {Alert} from "flowbite-react";

export interface RouteGuardProps {
    component: ReactElement
}

const RouteGuard = ({ component }: RouteGuardProps) => {
    const { isAuthenticated } = useContext(SecurityContext)

    if (isAuthenticated()) {
        return component
    } else {
         return(
             <Alert color="warning" rounded>
                 <span className="font-medium">Info alert!</span>
                 You are redirected to the login page
             </Alert>
         )
    }
}

export default RouteGuard
