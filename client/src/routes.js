import User from './pages/user'
import Home from './pages/home'
import Auth from './pages/auth'
import Test from './pages/test'
import TestActive from './pages/testActive'
import TestResult from './pages/testResult'
import TestEdit from './pages/testEdit'
import TestStats from './pages/testStats'

import {
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    LOGIN_ROUTE,
    TEST_ROUTE,
    USER_ROUTE,
    RESULT_ROUTE
} from './utils/consts'

export const authRoutes = [
    {
        path: TEST_ROUTE + "/:testId/active", 
        Component: <TestActive/>
    },
    {
        path: TEST_ROUTE + "/:testId/edit", 
        Component: <TestEdit/>
    },
    {
        path: TEST_ROUTE + "/:testId/stats", 
        Component: <TestStats/>
    },
    {
        path: RESULT_ROUTE + "/:testAttemptId", 
        Component: <TestResult/>
    },
    {
        path: USER_ROUTE, 
        Component: <User/>
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <Home/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
    {
        path: TEST_ROUTE + "/:testId", 
        Component: <Test/>
    },
]