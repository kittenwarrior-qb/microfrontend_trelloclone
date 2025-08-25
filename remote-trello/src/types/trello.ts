export interface CardType { id: string; title: string; }
export interface ListType { id: string; name: string; cards: CardType[]; }
export interface BoardType {
  id: string;
  name: string;
  color?: string;
  lists: ListType[];
}

export interface RootState {
  boards: {
    boards: BoardType[];
    loading: boolean;
    error: string | null;
  };
}