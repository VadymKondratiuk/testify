import {Navigate, Routes, Route} from 'react-router-dom';
import { publicRoutes, authRoutes } from '../routes';
import { HOME_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { useContext } from 'react';

const AppRouter = () => {
    const {user} = useContext(Context)
    
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component} exact/>
            )}

            <Route path="*" element={<Navigate to={HOME_ROUTE} />}/>   
        </Routes>
    );
};

export default AppRouter;