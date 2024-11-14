import Post, { PostType } from "@/types/post-type";
import React, { ReactNode } from "react";
import { PostCardSkeleton } from "./skeletons/post-card-skeleton";
import PostCard from "./post-card";
import NoDataComponent from "./no-data";
import { FeaturedPostCardSkeleton } from "./skeletons/featured-post-card-skeleton";
import FeaturedPostCard from "./featured-post-card";
import { LatestPostCardSkeleton } from "./skeletons/latest-post-card-skeleton";
import LatestPostCard from "./latest-post-card";



interface PostsProps extends React.PropsWithChildren {
    posts: Post[];
    loading: boolean;
    skeletonCount: number;
    noPostValidation: ReactNode;
    type: PostType
}

const PostsComponent: React.FC<PostsProps> = ({loading, posts, skeletonCount, noPostValidation, type}) => {
    const configfurePostView: {[key: string]: {skeleton: (index: number) => ReactNode, view: (index: number, post: Post) => ReactNode}} = {
        [PostType.FEATURE]: {
            skeleton: (index: number) => {
                return <FeaturedPostCardSkeleton key={index} />
            },
            view: (index: number, post: Post) => {
                return <FeaturedPostCard key={index} post={post} />
            }
        }, 
        [PostType.POST]: {
            skeleton: (index: number) => {
                return <PostCardSkeleton key={index} />
            },
            view: (_index: number, post: Post) => {
                return <PostCard key={post._id} post={post} />
            }
        },
        [PostType.LATEST]: {
            skeleton: (index: number) => {
                return <LatestPostCardSkeleton key={index} />
            },
            view: (_index: number, post: Post) => {
                return <LatestPostCard key={_index} post={post} />
            }
        }
    }
    
    return (
        <>
            { loading ? 
                Array(skeletonCount)
                    .fill(0)
                    .map((_, index) => configfurePostView[type].skeleton(index))
                : posts.length > 0 ? 
                    posts.map((post, idx) => configfurePostView[type].view(idx, post)) 
                    : <NoDataComponent>
                        {noPostValidation}
                    </NoDataComponent>}
        </>
    );
}

export default PostsComponent;