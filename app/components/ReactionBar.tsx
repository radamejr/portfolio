import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { seededInt } from "~/lib/helpers";

function ReactionBar({ seed }: { seed: string }) {
  return (
    <>
      <div className="flex items-center gap-1.5 px-4 pt-3 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2] text-white">
          <ThumbsUp className="h-2.5 w-2.5" fill="currentColor" />
        </span>
        {seededInt(`like-${seed}`, 8, 340)}
        <span className="ml-auto">
          {seededInt(`comment-${seed}`, 0, 40)} comments
        </span>
      </div>
      <div className="mx-4 mt-2 grid grid-cols-3 gap-1 border-t border-gray-100 pt-1 text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <button className="flex items-center justify-center gap-1.5 rounded py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
          <ThumbsUp className="h-4 w-4" /> Like
        </button>
        <button className="flex items-center justify-center gap-1.5 rounded py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
          <MessageCircle className="h-4 w-4" /> Comment
        </button>
        <button className="flex items-center justify-center gap-1.5 rounded py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>
    </>
  );
}

export default ReactionBar;
