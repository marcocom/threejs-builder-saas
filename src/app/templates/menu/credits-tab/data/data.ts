export enum Icons {
  Portfolio = 'sphere',
  Github = 'github',
  LinkedIn = 'linkedin',
  Email = 'mail2',
}

export interface ICollaboratorLink {
  url: string;
  icon: string;
}

export interface ICollaboratorProps {
  fullname: string;
  description?: string;
  links?: ICollaboratorLink[];
}

export const collaborators: ICollaboratorProps[] = [
  {
    fullname: 'Marco Comparato',
    description: 'UI.credits-tab.description_marco',
    links: [
      { url: 'mailto:marco@marcocomparato.com', icon: Icons.Email },
      { url: 'https://github.com/marcocom', icon: Icons.Github },
      { url: 'https://marcocom.github.io', icon: Icons.Portfolio },
      { url: 'https://www.linkedin.com/in/marcocom', icon: Icons.LinkedIn },
    ]
  },
  {
    fullname: 'Nick Lulofs',
    description: 'UI.credits-tab.description_nick',
    links: [
      { url: 'mailto:nick@mappalabs.com', icon: Icons.Email },
      { url: 'https://github.com/MappaLabs', icon: Icons.Github },
    ]
  },
];
