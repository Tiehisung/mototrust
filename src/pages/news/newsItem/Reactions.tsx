import { Button } from "@/components/buttons/Button";
import { IComment, INewsProps } from "@/types/news.interface";
import { ThumbsUp, ThumbsDown, Trash } from "lucide-react";
import { POPOVER } from "@/components/ui/popover";
import SocialShare from "@/components/SocialShare";
import { useEffect, useState } from "react";
import { staticImages } from "@/assets/images";
import { LiaCommentSolid } from "react-icons/lia";
import { IoShareSocial } from "react-icons/io5";
import { AVATAR } from "@/components/ui/avatar";
import { getTimeLeftOrAgo } from "@/lib/timeAndDate";
import { shortText } from "@/lib";
import { BsDot } from "react-icons/bs";
import { DIALOG } from "@/components/Dialog";
import { getDeviceId } from "@/lib/device";
import { icons } from "@/assets/icons/icons";
import LoginController from "@/components/auth/LoginModal";
import {
  useDeleteNewsCommentMutation,
  useGetNewsStatsQuery,
  useUpdateNewsSharesMutation,
  useUpdateNewsViewsMutation,
  useUpdateNewsLikesMutation,
} from "@/services/news.endpoints";
import { toggleClick,   } from "@/lib/dom";
import { useAuth } from "@/store/hooks/useAuth";
import CommentForm from "./Comment";

export function NewsReactions({ newsItem }: { newsItem?: INewsProps }) {
 
  const { user } = useAuth();

  const [updateViews] = useUpdateNewsViewsMutation();

  const [updateLikes, { isLoading: isLiking }] = useUpdateNewsLikesMutation();

  

  const [updateShares] = useUpdateNewsSharesMutation();

  const { data: stats, refetch: refetchStats } = useGetNewsStatsQuery(
    newsItem?._id as string,
  );
  console.log(stats);

  // Record view on mount
  useEffect(() => {
    updateViews({
      newsId: newsItem?._id as string,
      deviceId: getDeviceId(),
      userId: user?._id as string,
    });
  }, []);
  const [localLiked, setLocalLiked] = useState(false);

  const handleLike = async () => {
    const result = await updateLikes({
      newsId: newsItem?._id as string,
      deviceId: getDeviceId(),
      userId: user?._id,
      isLike: !localLiked,
    }).unwrap();

    if (result.success) {
      setLocalLiked(result?.data?.liked as boolean);
     
    }
  };

  const handleShare = async () => {
    const result = await updateShares({
      newsId: newsItem?._id as string,
      deviceId: getDeviceId(),
      userId: user?._id as string,
    }).unwrap();

    if (result.success) {
      refetchStats();
    }
  };

  return (
    <div>
      <ul className="flex items-baseline-last flex-wrap gap-4">
        <li>
          <Button
            onClick={handleLike}
            className={`p-1.5 _shrink rounded-full mb-0 ${
              localLiked ? "text-Blue " : ""
            }`}
            variant="ghost"
            waiting={isLiking}
          >
            {localLiked ? <ThumbsDown size={24} /> : <ThumbsUp size={24} />}
          </Button>
          <span
            className="font-light text-xs"
            onClick={() => toggleClick("likes-trigger")}
          >
            {newsItem?.likes?.length ?? ""} Likes
          </span>
        </li>
        <li>
          <POPOVER
            trigger={<IoShareSocial size={32} />}
            variant="ghost"
            triggerClassNames="rounded-full"
            id="shares-trigger"
          >
            <SocialShare onShare={handleShare} />
          </POPOVER>
          <div
            className="font-light text-xs"
            onClick={() => toggleClick("shares-trigger")}
          >
            {newsItem?.shares?.length ?? ""} Shares
          </div>
        </li>
        <li className="flex flex-col items-center justify-center">
          {!user ? (
            <LoginController
              trigger={
                <LiaCommentSolid
                  size={24}
                  onClick={() => document.getElementById("comment")?.focus()}
                />
              }
              description={
                <p className="italic font-light text-center">
                  Login to comment on our news article. Thank you!
                </p>
              }
            />
          ) : (
            <DIALOG
              trigger={
                <LiaCommentSolid
                  size={24}
                  onClick={() => document.getElementById("comment")?.focus()}
                />
              }
              triggerStyles="rounded-full"
              variant="ghost"
              title="Comment on this news article"
              id="comments-trigger"
            >
              <CommentForm newsId={newsItem?._id as string} />
            </DIALOG>
          )}

          <div
            className="font-light text-xs"
            onClick={() =>
              toggleClick(user ? "comments-trigger" : "login-controller")
            }
          >
            {newsItem?.comments?.length ?? ""} Comment
            {newsItem?.comments?.length === 1 ? "" : "s"}
          </div>
        </li>

        <li className="flex flex-col items-center justify-center gap-1">
          {<icons.view />}
          <div className="text-xs">{newsItem?.views?.length} Views</div>
        </li>
      </ul>

      <br />
      <hr />
      <br />

      {/* Comments */}
      <ul className="grid gap-6 divide-y divide-border/45">
        {newsItem?.comments?.map((com, i) => (
          <CommentRow comment={com} newsItem={newsItem} key={i} />
        ))}
      </ul>

      <CommentForm newsId={newsItem?._id as string} />
    </div>
  );
}

const CommentRow = ({
  comment: com,
  newsItem,
}: {
  comment: IComment;
  newsItem?: INewsProps;
}) => {
  const { user } = useAuth();
  const [deleteComment, { isLoading: isDeleting }] =
    useDeleteNewsCommentMutation();

  const handleDeleteComment = async (commentId: string) => {
    const result = await deleteComment({
      newsId: newsItem?._id as string,
      commentId,
      userId: user?._id,
      isAdmin: user?.role?.includes("admin"),
    }).unwrap();

    if (result.success) {
    }
  };
  return (
    <li className="flex items-start gap-5 pb-6  ">
      <AVATAR src={com?.user?.image ?? staticImages.avatar} />
      <section>
        <header className="flex items-start gap-6 ">
          <div className="flex items-baseline gap-0.5">
            <h1 className="_subtitle">{com?.user?.name ?? "Anonymous"}</h1>
            <span>
              <BsDot size={15} className="text-muted-foreground" />
            </span>
            <span className="text-sm mt-2.5 font-light">
              {getTimeLeftOrAgo(com?.date).formatted}
            </span>
          </div>
        </header>

        <div className="relative">
          <div
            dangerouslySetInnerHTML={{
              __html: shortText(com?.comment, 3500) || "",
            }}
            className="border border-border rounded-2xl p-3 -ml-6 mt-4 _p text-wrap wrap-break-word max-sm:max-w-60 max-w-3/4 overflow-x-auto"
          />

          {(user?._id == com.user || user?.role?.includes("admin")) && (
            <Button
              onClick={() => handleDeleteComment(com._id as string)}
              className="absolute right-2 top-1 p-0.5 _hover _shrink"
              variant="ghost"
              waiting={isDeleting}
            >
              <Trash size={24} />
            </Button>
          )}
        </div>
      </section>
    </li>
  );
};
