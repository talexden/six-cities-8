export type ReviewType = {
  review: string,
    date: string,
    id: number,
    rating: number,
    user: {
        avatarUrl: string,
        id: number,
        isPro: boolean,
        name: string,
    },
}

export type reviewsType = {
  reviews: ReviewType[],
}