export type Scalars = {
  ID: number
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Upload: any
}

export interface IUser {

}

export interface IPhoto {
  id: Scalars['ID']
  user: IUser
  caption: Scalars['String']
  file: Scalars['String']
  hashtags: [IHashtag]
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
  isMine: Scalars['Boolean']
  likes: Scalars['Int']
  isLiked: Scalars['Boolean']
  commnets: [IComment]
  commentNumber: Scalars['Int']
}

export interface IComment {

}

export interface IHashtag {

}