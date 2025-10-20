interface List {
  items: ListItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface ListItem {
  title: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type { List, ListItem };
