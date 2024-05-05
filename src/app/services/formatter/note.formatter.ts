interface Item {
  id: number;
  user: {
    full_name?: string;
  };
  message?: string;
  created_at?: string;
}
export interface noteInterface {
  id: number;
  name?: string;
  description?: string;
  createdAt?: string;
}

const noteFormatter = (item: Item) => {
  return {
    id: item.id,
    name: item.user.full_name,
    description: item.message,
    createdAt: item.created_at,
  };
};

export {noteFormatter};
