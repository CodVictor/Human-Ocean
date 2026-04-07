import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MapPage } from './pages/MapPage';
import { FeedPage } from './pages/FeedPage';
import { StreakPage } from './pages/StreakPage';
import { GamesPage } from './pages/GamesPage';
import { ProfilePage } from './pages/ProfilePage';
import { Configuracion } from './pages/Configuracion';
import { DonatePage } from './pages/DonatePage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NotFound } from './pages/NotFound';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignUpPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'map', Component: MapPage },
      { path: 'feed', Component: FeedPage },
      { path: 'streak', Component: StreakPage },
      { path: 'games', Component: GamesPage },
      { path: 'profile', Component: ProfilePage },
      { path: 'perfil', Component: ProfilePage },
      { path: 'configuracion', Component: Configuracion },
      { path: 'donate', Component: DonatePage },
      { path: 'donar', Component: DonatePage },
      { path: 'thank-you', Component: ThankYouPage },
      { path: 'gracias', Component: ThankYouPage },
      { path: 'login', Component: LoginPage },
      { path: 'signup', Component: SignupPage },
      { path: '*', Component: NotFound },
    ],
  },
]);