import {Route,Routes} from 'react-router-dom'
import {Header, Home,Login,Register,Artistform,Managerform,UserForm} from './Components';
import ResetPassword from './Components/ResetPassword';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout'; 
import Protected from './utlis/Protected';
import List from './Components/List';
import Nav2 from './Components/Nav2';
import { AuthProvider } from './contexs/auth';
import {Profile, ArtistCreate,ArtistList ,ContentCreate,ChangePassword,ArtistUpdate,ContentList,ContentUpadate} from './pages';
import Put from './Components/Put';
import About from './Components/About';
import ContentDraft from './pages/ContentDraft';
import ContentPublish from './pages/ContentPublish';
import Profiles from './pages/Profiles';

function App() {
  return (
    <>
    <AuthProvider>
    <Routes>
      <Route element ={<PublicLayout />}>
      <Route path='/' element={<Home/>}/>
      <Route path='/header' element={<Header />} />
      <Route path='/about' element={<About />} />
      <Route path='/reset' element={<ResetPassword />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/aform' element={<Artistform/>} />
      <Route path='/mform' element={<Managerform/>} />
      <Route path='/uform' element={<UserForm/>} />
      </Route>
      <Route element={<Protected />}>
      <Route element={<PrivateLayout/>}>
      <Route path='/profile' element={<Profiles />} />
      <Route path='/profiles' element={<Profile />} />
      <Route path='/list' element={<List />} />
      <Route path='/nav' element={<Nav2 />} />
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
      </Route>
      </Route>
    </Routes>
    </AuthProvider>
    </>
  );
}
export default App;
