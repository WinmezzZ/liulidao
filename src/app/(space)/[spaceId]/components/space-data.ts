import { type TreeDataItem } from '@/components/tree-view';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Team {
  name: string;
  plan: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
  url: string;
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  user: User;
  teams: Team[];
  navGroups: NavGroup[];
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          // icon: IconLayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          // icon: IconChecklist,
        },
        {
          title: 'Apps',
          url: '/apps',
          // icon: IconPackages,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          //  icon: IconMessages,
        },
        {
          title: 'Users',
          url: '/users',
          // icon: IconUsers,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          // icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          // icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              // icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              // icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              // icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              // icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              // icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          // icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              // icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              // icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              // icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              // icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              // icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          // icon: IconHelp,
        },
      ],
    },
  ],
};

export const treeData: TreeDataItem[] = [
  {
    id: '1',
    name: 'Item 1',
    children: [
      {
        id: '2',
        name: 'Item 1.1',
        children: [
          {
            id: '3',
            name: 'Item 1.1.1',
          },
          {
            id: '4',
            name: 'Item 1.1.2',
          },
        ],
      },
      {
        id: '5',
        name: 'Item 1.2',
      },
    ],
  },
  {
    id: '6',
    name: 'Item 2',
    draggable: true,
    droppable: true,
  },
];
