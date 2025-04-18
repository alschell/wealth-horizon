
import { type RouteObject } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import { BlogPost, BlogList } from '@/components/blog';
import { ApiReferenceContent, GettingStartedContent } from '@/components/api-documentation';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/blog',
    children: [
      {
        index: true,
        element: <BlogList />,
      },
      {
        path: ':id',
        element: <BlogPost />,
      },
    ],
  },
  {
    path: '/docs',
    children: [
      {
        path: 'getting-started',
        element: <GettingStartedContent />,
      },
      {
        path: 'api-reference',
        element: <ApiReferenceContent />,
      },
    ],
  },
];
