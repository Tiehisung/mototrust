import { Button } from "@/components/buttons/Button";
import QuillEditor from "@/components/editor/Quill";
import { fireEscape } from "@/hooks/Esc";
import { markupToPlainText } from "@/lib/dom";
import { useUpdateNewsCommentsMutation } from "@/services/news.endpoints";
import { useAuth } from "@/store/hooks/useAuth";
import { SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  newsId: string;
}

const CommentForm = ({ newsId }: Props) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [updateComments, { isLoading: isCommenting }] =
    useUpdateNewsCommentsMutation();

  const maxLength = 3500;

  const handleComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (comment.length < 1) {
      setError("Write some comments");
      return;
    }
    setError("");
    const result = await updateComments({
      newsId: newsId as string,
      comment,
      userId: user?._id,
    }).unwrap();

    if (result.success) {
      fireEscape();
      setComment("");
    }
  };

  useEffect(() => {
    if (comment) setError("");
  }, [comment]);
  return (
    <div className="border-t-2 pt-6 mt-6">
      <header className="flex justify-between items-center gap-3 mb-6">
       <span>Comment</span>  
        <span className="text-xs text-muted-foreground">
        
          {`${markupToPlainText(comment)?.length}/${maxLength}`}
        </span>
      </header>
      <form onSubmit={handleComment} className="relative">
        <QuillEditor
          value={comment}
          onChange={(val) => {
            if (val.length <= maxLength) setComment(val);
          }}
          className="w-full grow"
          placeholder="Type comment ..."
          error={error}
        />
        <Button
          type="submit"
          className="backdrop-blur-2xl w-fit mt-2 justify-center"
          waiting={isCommenting}
          waitingText=""
          primaryText=""
          size="sm"
        >
          Send <SendHorizontal size={20} />
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
