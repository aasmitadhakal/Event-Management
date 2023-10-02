import {Route,Routes, useLocation} from 'react-router-dom'
import {Header, Home,Login,Register,Artistform,Managerform,UserForm,EventSlider} from './Components';
import ResetPassword from './Components/ResetPassword';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout'; 
import Protected from './utlis/Protected';
import List from './Components/List';
import Nav2 from './Components/Nav2';
import { AuthProvider } from './contexs/auth';
import {Profile,User,UserCreate, ArtistCreate,ArtistList ,ContentCreate,ChangePassword,ArtistUpdate,ContentList,ContentUpadate,SponserCreate,SponserList,SponserUpdate, UserList, UserUpdate, AlluserList,Card2, EventCreate,EventList,} from './pages';
import Put from './Components/Put';
import About from './Components/About';
import ContentDraft from './pages/ContentDraft';
import ContentPublish from './pages/ContentPublish';
import Profiles from './pages/Profiles';
import PasswordReset2 from './Components/PasswordReset2';
import ArtistLayout from './layout/ArtistLayout';
import UserLayout from './layout/UserLayout';
import UsersForm from './Components/UsersForm';
import AlluserUpdate from './pages/AlluserUpdate';
import EventPage from './Components/EventPage';


import { AnimatePresence } from 'framer-motion';
import EventListPage from './Components/EventListPage';
import EventDetailPage from './Components/EventDetailPage';

function App() {
  const location = useLocation();
  return (
    <>
    <AuthProvider>
      <AnimatePresence wait>
    <Routes location={location} key={location.pathname}>
      <Route element ={<PublicLayout />}>
      <Route path='/' element={<Home/>}/>
      <Route path='/users' element={<UsersForm />} />
      <Route path='/header' element={<Header />} />
      <Route path='/about' element={<About />} />
      <Route path='/event' element={<EventListPage />} />
      <Route path='/events/:id' element={<EventDetailPage />} />
      <Route path='/reset' element={<ResetPassword />} />
      <Route path='/user/reset/:uid/:token' element={<PasswordReset2 />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/artistform' element={<Artistform/>} />
      <Route path='/mform' element={<Managerform/>} />
      <Route path='/userform' element={<UserForm/>} />
      </Route>
      <Route element={<Protected />}>
      <Route element={<PrivateLayout/>}>
      <Route path='/profile' element={<Profiles />} />

      <Route path='/list' element={<List />} />
      <Route path='/nav' element={<Nav2 />} />
      <Route path='/listuser' element={<UserList/>} />
      <Route path='/adduser' element={<UserCreate/>} />
      <Route path='/updateuser' element={<UserUpdate/>} />
      <Route path='/alist' element={<ArtistList />} />
      <Route path='/aadd' element={<ArtistCreate/>} />
      <Route path='/aupdate' element={<ArtistUpdate/>} />
      <Route path='/change' element={<ChangePassword />} />
      <Route path='/cdraft' element={<ContentDraft />} />
      <Route path='/clist' element={<ContentPublish />} />
      <Route path='/Ccreate' element={<ContentCreate />} />
      <Route path='/eventadd' element={<EventCreate />} />
      <Route path='/eventlist' element={<EventList />} />
      <Route path='/contentlist' element={<ContentList />} />
      <Route path='/put' element={<ContentUpadate />} />
      <Route path='/puts' element={<Put />} />
      <Route path='/sponseradd' element={<SponserCreate/>} />
      <Route path='/sponserlist' element={<SponserList />} />
      <Route path='/sponserupdate' element={<SponserUpdate />} />
      <Route path='/alluserlist' element={<AlluserList />} />
      <Route path='/alluserupdate' element={<AlluserUpdate />} />
      
      </Route>
      </Route>
      {/* for userlayout */}
      <Route element={<ArtistLayout />}>
     
      <Route path='/profiles' element={<Profiles />} />
      <Route path='/profilesss' element={<Profile />} />
      </Route>
      {/* for usersLayout */}
      <Route element={<UserLayout />}>
     
      <Route path='/user' element={<User />} />
      </Route>
    </Routes>
    </AnimatePresence>
    </AuthProvider>
    </>
  );
}
export default App;
