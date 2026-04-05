import { createBrowserRouter } from 'react-router';
import ProfileSetup from './pages/ProfileSetup';
import SwipeView from './pages/SwipeView';
import MatchesView from './pages/MatchesView';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: ProfileSetup,
  },
  {
    path: '/swipe',
    Component: SwipeView,
  },
  {
    path: '/matches',
    Component: MatchesView,
  },
]);
