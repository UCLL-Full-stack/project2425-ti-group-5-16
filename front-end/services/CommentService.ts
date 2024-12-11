interface Comment {
    setup_id: number;
    user_id: number;
    content: string;
}

const AddComment = async (comment: Comment) => {
    try {
      if (!comment) {
        throw new Error("No comment data provided");
      }
  
      if (
        typeof comment.setup_id !== 'number' ||
        typeof comment.user_id !== 'number' ||
        typeof comment.content !== 'string' ||
        comment.content.trim() === ''
      ) {
        throw new Error("Invalid comment format");
      }
  
      console.log("Sending comment to backend:", comment);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error response from backend:', errorDetails);
        throw new Error(`Failed to add comment: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Comment successfully added:", data);
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
};

export default {
    AddComment,
};
  