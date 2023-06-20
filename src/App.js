import {Route,Routes} from 'react-router-dom'
import {Header, Home,Login,Register,Artistform,Managerform,UserForm} from './Components';
import ResetPassword from './Components/ResetPassword';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout'; 
import Protected from './utlis/Protected';
import List from './Components/List';
import Nav2 from './Components/Nav2';
import { AuthProvider } from './contexs/auth';
import {Profile,User,UserCreate, ArtistCreate,ArtistList ,ContentCreate,ChangePassword,ArtistUpdate,ContentList,ContentUpadate,SponserCreate,SponserList,SponserUpdate, UserList, UserUpdate, AlluserList} from './pages';
import Put from './Components/Put';
import About from './Components/About';
import ContentDraft from './pages/ContentDraft';
import ContentPublish from './pages/ContentPublish';
import Profiles from './pages/Profiles';
import PasswordReset2 from './Components/PasswordReset2';
import ArtistLayout from './layout/ArtistLayout';
import UserLayout from './layout/UserLayout';
import UsersForm from './Components/UsersForm';

function App() {
  return (
    <>
    <AuthProvider>
    <Routes>
      <Route element ={<PublicLayout />}>
      <Route path='/' element={<Home/>}/>
      <Route path='/users' element={<UsersForm />} />
      <Route path='/header' element={<Header />} />
      <Route path='/about' element={<About />} />
      <Route path='/reset' element={<ResetPassword />} />
      <Route path='/user/reset/:uid/:token' element={<PasswordReset2 />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/aform' element={<Artistform/>} />
      <Route path='/mform' element={<Managerform/>} />
      <Route path='/uform' element={<UserForm/>} />
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
      <Route path='/contentlist' element={<ContentList />} />
      <Route path='/put' element={<ContentUpadate />} />
      <Route path='/puts' element={<Put />} />
      <Route path='/sponseradd' element={<SponserCreate/>} />
      <Route path='/sponserlist' element={<SponserList />} />
      <Route path='/sponserupdate' element={<SponserUpdate />} />
      <Route path='/alluserlist' element={<AlluserList />} />
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
    </AuthProvider>
    </>
  );
}
export default App;
