import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../../context/authContext';
import {
  ChatContentContainer,
  ChatMessagesContainer,
  ChatReplyArea,
  MessageContainer,
  MessagesPageContainer,
  MessagesPageHeader,
  MessageContent,
} from '../../styles/MessagesPage/MessagesPage.styled';
import { ProfilePageResponsiveContainer } from '../../styles/ProfilePageStyles/ProfilePage.styled';
import WithFooter from '../HOC/WithFooter';
import getProfileFollowing from '../ProfilePage/getProfileFollowing';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import { FollowersProfileContainer } from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { useNavigate } from 'react-router-dom';
import getMessages from './getMessages';
import {
  DisplayFlex,
  TweetButton,
} from '../../styles/utilsStyles/Tweet.styled';
import { BackArrow } from '../../styles/SingleTweetPageStlyes/SingleTweetPage.styled';
import writeMessage from './writeMessage';
import sendChatRequest from './sendChatRequest';
import getChatRequests from './getChatRequests';

function MessagesPage() {
  const [profiles, setProfiles] = useState(null);
  const [requests, setRequests] = useState(null);
  const [openChat, setOpenChat] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [message, setMessage] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleOpenChat = async (profile) => {
    // make state for request and check state before requesting ??
    await sendChatRequest(profile.id, user.uid, user.displayName);
    // was here
    const promiseMessages = await getMessages(profile.id, user.uid);
    if (promiseMessages) {
      setChatMessages(promiseMessages);
    }
    setOpenChat(profile);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleOpenRequest = async (profile) => {
    // changed position on userID and profileID
    const promiseMessages = await getMessages(user.uid, profile.id);
    if (promiseMessages) {
      setChatMessages(promiseMessages);
    }
    setOpenChat(profile);
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

  const handleGoBack = () => {
    setOpenChat(false);
  };

  const navigateToProfile = () => {
    navigate(`/${user.displayName}`);
  };

  useEffect(() => {
    const initialize = async () => {
      const promiseFollowing = await getProfileFollowing(user.uid);
      if (promiseFollowing) {
        setProfiles(promiseFollowing);
      }
      const promiseRequests = await getChatRequests(user.uid);
      if (promiseRequests) {
        setRequests(promiseRequests);
      }
    };

    initialize();

    return () => {
      setProfiles(null);
      setRequests(null);
      setOpenChat(null);
      setChatMessages(null);
      setMessage(null);
    };
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
                <BackArrow onClick={handleGoBack} />
                <HomepageTestPP />
                {openChat.userName}
              </MessagesPageHeader>
              {chatMessages &&
                chatMessages.map((message) => {
                  if (message.sender === user.displayName) {
                    return (
                      <MessageContainer
                        key={message.key}
                        style={{ alignItems: 'flex-end' }}
                      >
                        <MessageContent>
                          <p>{message.message}</p>
                        </MessageContent>
                      </MessageContainer>
                    );
                  }
                })}
            </ChatContentContainer>

            <DisplayFlex>
              <ChatReplyArea onChange={handleMessage} />
              <TweetButton onClick={handleSendMessage}>Reply</TweetButton>
            </DisplayFlex>
          </ChatMessagesContainer>
        ) : (
          <div>
            {profiles &&
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
              })}
            {requests &&
              requests.map((request) => {
                return (
                  <FollowersProfileContainer
                    key={request.id}
                    onClick={() => handleOpenRequest(request)}
                  >
                    <HomepageTestPP />
                    {request.userName}
                  </FollowersProfileContainer>
                );
              })}
          </div>
        )}
      </MessagesPageContainer>
    </ProfilePageResponsiveContainer>
  );
}

export default WithFooter(MessagesPage);
