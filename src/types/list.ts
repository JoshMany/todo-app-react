interface List {
  items: ListItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface ListItem {
  uuid: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  pinned: boolean;
}

export type { List, ListItem };
