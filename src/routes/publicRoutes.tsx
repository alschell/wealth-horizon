
import { type RouteObject } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from '@/pages/LandingPage';
import { BlogList, BlogPost } from '@/components/blog';
import { ApiReferenceContent, GettingStartedContent } from '@/components/api-documentation';
import ApiDocumentation from '@/pages/ApiDocumentation';

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
        element: <ApiDocumentation />,
      },
      {
        path: ':id',
        element: <ApiDocumentation />,
      },
    ],
  },
  {
    path: '/docs',
    children: [
      {
        path: 'getting-started',
        element: <ApiDocumentation />,
      },
      {
        path: 'api-reference',
        element: <ApiDocumentation />,
      },
    ],
  },
];
