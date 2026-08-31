export interface Board {
  id: string;
  parentId: string | null;
  creatorId: string;
  workspaceId: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  hasCurrentUser: boolean;
  thumbnails?: string[];
  ancestors?: Pick<Board, "id" | "title">[];
  pos: number;
}

export interface BoardsListResponse {
  data: Board[];
  pagination: {
    hasMore: boolean;
    cursor: string | null;
  };
  total: number;
}

const BOARD_TITLES = [
  "Brand Refresh 2026",
  "Product Launch Assets",
  "Social Campaign Q3",
  "Photo Shoot: Spring Line",
  "Motion Graphics",
  "Website Hero Concepts",
  "Packaging Explorations",
  "Event Recap Reel",
  "Icon & Illustration Set",
  "Customer Stories",
  "Style Guide Reference",
  "Archived Concepts",
];

const now = new Date().toISOString();

const MOCK_BOARDS: Board[] = BOARD_TITLES.map((title, i) => ({
  id: `board-${i + 1}`,
  parentId: null,
  creatorId: "user-1",
  workspaceId: "workspace-1",
  title,
  description: null,
  createdAt: now,
  updatedAt: now,
  hasCurrentUser: true,
  thumbnails: [`https://picsum.photos/seed/board-${i + 1}/480/320`],
  pos: i,
}));

// Local mock data - no network dependency. See README for why.
export const fetchBoards = (): Promise<BoardsListResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: MOCK_BOARDS,
        pagination: { hasMore: false, cursor: null },
        total: MOCK_BOARDS.length,
      });
    }, 300);
  });
