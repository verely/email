import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { EmailCompose } from './pages/EmailCompose'
import { EmailDetails } from './pages/EmailDetails'

import { AppHeader } from './cmps/AppHeader'

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/about" element={<AboutUs/>}></Route>
                        <Route path="/:folder" element={<EmailIndex/>}>
                            <Route path="/:folder/:emailId" element={<EmailDetails />} />
                            {/* <Route path="/:folder/compose" element={<EmailCompose/>}></Route> */}
                        </Route>
                    </Routes>
                </main>

                <footer>
                    <section className="container">
                        robotRights 2023 &copy;
                    </section>
                </footer>
            </section>
        </Router>
    )
}

