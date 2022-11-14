import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../../context/authContext';
import {
  ChatContentContainer,
  ChatMessagesContainer,
  ChatReplyArea,
  MessagesPageContainer,
  MessagesPageHeader,
} from '../../styles/MessagesPage/MessagesPage.styled';
import { ProfilePageResponsiveContainer } from '../../styles/ProfilePageStyles/ProfilePage.styled';
import WithFooter from '../HOC/WithFooter';
import getProfileFollowing from '../ProfilePage/getProfileFollowing';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import { FollowersProfileContainer } from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { useNavigate } from 'react-router-dom';
import getUserMessages from './getUserMessages';
import {
  DisplayFlex,
  TweetButton,
} from '../../styles/utilsStyles/Tweet.styled';
import { BackArrow } from '../../styles/SingleTweetPageStlyes/SingleTweetPage.styled';

function MessagesPage() {
  const [profiles, setProfiles] = useState(null);
  const [openChat, setOpenChat] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [reply, setReply] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleOpenChat = async (profile) => {
    console.log(profile);
    const promiseMessages = await getUserMessages(profile.id, user.uid);
    if (promiseMessages) {
      setChatMessages(promiseMessages);
    }
    setOpenChat(profile);
  };

  const handleReply = (e) => {
    setReply(e.target.value);
  };

  const navigateToProfile = () => {
    navigate(`/${user.displayName}`);
  };

  useEffect(() => {
    const getUserFollowing = async () => {
      const promiseFollowing = await getProfileFollowing(user.uid);
      if (promiseFollowing) {
        setProfiles(promiseFollowing);
      }
    };
    getUserFollowing();
  }, [user]);

  return (
    <ProfilePageResponsiveContainer style={{ zIndex: 9999 }}>
      <MessagesPageContainer>
        <MessagesPageHeader>
          <HomepageTestPP onClick={navigateToProfile} />
          <p>Messages</p>
        </MessagesPageHeader>
        {openChat ? (
          <ChatMessagesContainer>
            <ChatContentContainer>
              <MessagesPageHeader>
                <BackArrow />
                <HomepageTestPP />
                {openChat.userName}
              </MessagesPageHeader>
            </ChatContentContainer>

            <DisplayFlex>
              <ChatReplyArea onChange={handleReply} />
              <TweetButton>Reply</TweetButton>
            </DisplayFlex>
          </ChatMessagesContainer>
        ) : (
          profiles &&
          profiles.map((profile) => {
            return (
              <FollowersProfileContainer
                key={profile.id}
                onClick={() => handleOpenChat(profile)}
              >
                <HomepageTestPP />
                {profile.userName}
              </FollowersProfileContainer>
            );
          })
        )}
      </MessagesPageContainer>
    </ProfilePageResponsiveContainer>
  );
}

export default WithFooter(MessagesPage);
