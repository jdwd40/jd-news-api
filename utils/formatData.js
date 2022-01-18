exports.formatTopicData = (topicData) => {
  if (topicData === undefined) return [];
  return topicData.map((topic) => {
    return [topic.description, topic.slug];
  });
};

exports.formatUserData = (userData) => {
  if (userData === undefined) return [];
  return userData.map((user) => {
    return [user.username, user.name, user.avatar_url];
  });
};

exports.formatArticleData = (articleData) => {
  if (articleData === undefined) return [];
  return articleData.map((article) => {
    return [
      article.title,
      article.topic,
      article.author,
      article.body,
      article.created_at,
      article.votes,
    ];
  });
};

exports.formatCommentData = (commentData) => {
  if (commentData === undefined) return [];
  return commentData.map((comment) => {
    return [
      comment.body,
      comment.votes,
      comment.author,
      comment.article_id,
      comment.created_at,
    ];
  });
};
