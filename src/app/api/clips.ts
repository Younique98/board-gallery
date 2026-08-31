export interface Clip {
  id: string;
  accountId: string;
  workspaceId: string;
  workspaceImage: string;
  workspaceName: string;
  displayName: string;
  source: string;
  ext: string;
  type: "video" | "photo" | "livePhoto" | "animated" | "audio" | "nonMedia";
  size: number;
  status:
  | "created"
  | "uploaded"
  | "transcoding"
  | "transcoded"
  | "failed"
  | "nonTranscodable";
  bookmarked: boolean;
  createdAt: string;
  recordedAt: string;
  updatedAt: string;
  title?: string;
  description?: string;
  importedName?: string;
  duration?: number;
  height: number;
  width: number;
  rotation: number;
  visible?: boolean;
  ownerName: string;
  owner: {
    ownerName: string;
    ownerAvatar: string;
  };
  avatar: string | null;
  assets: {
    image: string;
    video?: string;
    previewVideo?: string;
    seekVideo?: string;
    pdf?: string;
    original?: string;
  };
  mime?: string;
  altResolutions: {
    ext: string;
    height: number;
    width: number;
    id: string;
  }[];
  hasOpenDiscussions?: boolean;
  openDiscussionCount?: number;
  openCommentCount?: number;
  assetId: string;
  version: number;
  assetVersionCount?: number;
  isDefault: boolean;
  resolution?: number;
  boardCount?: number;
  tagCount?: number;
}

export interface ClipsListResponse {
  data: {
    total: number;
    clips: Clip[];
  };
  pagination: {
    hasMore: boolean;
    cursor: null | string;
  };
}

const PAGE_SIZE = 24;
const TOTAL_MOCK_CLIPS = 72;

const ASPECTS = [
  { width: 1600, height: 1067 },
  { width: 1200, height: 1600 },
  { width: 1600, height: 900 },
  { width: 1200, height: 1200 },
];

const now = new Date().toISOString();

const MOCK_CLIPS: Clip[] = Array.from({ length: TOTAL_MOCK_CLIPS }, (_, i) => {
  const { width, height } = ASPECTS[i % ASPECTS.length];
  const seed = `asset-${i + 1}`;
  return {
    id: seed,
    accountId: "account-1",
    workspaceId: "workspace-1",
    workspaceImage: `https://picsum.photos/seed/${seed}-workspace/64/64`,
    workspaceName: "Demo Workspace",
    displayName: `Asset ${i + 1}`,
    source: "upload",
    ext: "jpg",
    type: "photo",
    size: 1_200_000,
    status: "transcoded",
    bookmarked: false,
    createdAt: now,
    recordedAt: now,
    updatedAt: now,
    title: `Asset ${i + 1}`,
    height,
    width,
    rotation: 0,
    visible: true,
    ownerName: "Demo User",
    owner: {
      ownerName: "Demo User",
      ownerAvatar: `https://picsum.photos/seed/${seed}-avatar/64/64`,
    },
    avatar: null,
    assets: {
      image: `https://picsum.photos/seed/${seed}/${width}/${height}`,
    },
    altResolutions: [],
    assetId: seed,
    version: 1,
    isDefault: true,
  };
});

// Local mock data, paginated the same way the real API was - no network
// dependency. See README for why.
export const fetchAssets = ({
  cursor,
}: {
  cursor: string | null;
}): Promise<ClipsListResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const start = cursor ? parseInt(cursor, 10) : 0;
      const end = start + PAGE_SIZE;
      const page = MOCK_CLIPS.slice(start, end);
      const hasMore = end < MOCK_CLIPS.length;

      resolve({
        data: { total: MOCK_CLIPS.length, clips: page },
        pagination: { hasMore, cursor: hasMore ? String(end) : null },
      });
    }, 300);
  });
