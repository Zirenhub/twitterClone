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
import writeMessage from './writeMessage';

function MessagesPage() {
  const [profiles, setProfiles] = useState(null);
  const [openChat, setOpenChat] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [message, setMessage] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleOpenChat = async (profile) => {
    // const promiseMessages = await getUserMessages(profile.id, user.uid);
    // setChatMessages(promiseMessages);
    setOpenChat(profile);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message) {
      const promiseMessage = await writeMessage(
        user.uid,
        openChat.id,
        message,
        user.displayName
      );
    }
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
              <ChatReplyArea onChange={handleMessage} />
              <TweetButton onClick={handleSendMessage}>Reply</TweetButton>
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
