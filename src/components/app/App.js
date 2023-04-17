import {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Route, Routes, Switch }   from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
// import { MainPage, ComicsPage, SingleComicPage } from '../pages/'
import Spinner from '../spinner/Spinner';
// import Page404 from '../pages/Page404';
// import SingleComicPage from '../pages/singleComicPage';
// import MainPage from "../pages/MainPage";
// import ComicsPage from "../pages/ComicsPage";
const Page404=lazy(()=>import('../pages/Page404'));
const MainPage=lazy(()=>import('../pages/MainPage'));
const ComicsPage=lazy(()=>import('../pages/ComicsPage'));
const SingleComicPage=lazy(()=>import('../pages/SingleComicPage'));
const SingleCharacterPage=lazy(()=>import('../pages/SingleCharacterPage'));


const App = ()=>{
    
        return (
        <Router>
            {/* //     <div className="app">
            //         <AppHeader/>
            //         <main>
            // <Routes>              

            //     <Route  path="/comics" element={<ComicsPage/>}/>   
            //     <Route  path="/" element={ <MainPage/>}/>                    
                   
            //  </Routes> 
            //         </main>
            //     </div>
            //  */}
                <div className="app">
                    <AppHeader/>
                    <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>                                                    
                             <Route  exact  path="/">
                                <MainPage/>
                            </Route>
                            <Route  exact path="/comics">
                                <ComicsPage/>
                            </Route>
                            <Route  exact  path="/comics/:comicId">
                                <SingleComicPage/>
                            </Route>
                            <Route  exact  path="/characters/:id">
                            <SingleCharacterPage/>
                            </Route>
                            <Route  path="*">
                                <Page404/>
                            </Route>
                            </Switch> 
                    </Suspense>
                    </main>
                </div>

        </Router>
        )   
}

export default App;