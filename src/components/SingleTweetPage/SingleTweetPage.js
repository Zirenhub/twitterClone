import React from 'react';
import { useParams } from 'react-router-dom';

const SingleTweetPage = () => {
  const { tweet } = useParams();

  return <div>SingleTweetPage</div>;
};

export default SingleTweetPage;
