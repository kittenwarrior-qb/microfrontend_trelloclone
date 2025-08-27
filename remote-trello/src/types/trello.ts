export interface CardType {
  id: string;
  title: string;
  list_id: string
}

export interface ListType {
  id: string;
  name: string;
  board_id: string;
}

export interface BoardType {
  id: string;
  name: string;
  color?: string;
}


export interface RootState {
  boards: {
    items: BoardType[];
    loading: boolean;
    error: string | null;
  };
  lists: {
    items: ListType[];
    loading: boolean;
    error: string | null;
  };
  cards: {
    items: CardType[];
    loading: boolean;
    error: string | null;
  };
}
