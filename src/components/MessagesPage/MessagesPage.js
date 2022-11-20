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
import getProfileFollowers from '../ProfilePage/getProfileFollowers';
import { HomepageTestPP } from '../../styles/HomePageStyles/HomePage.styled';
import { FollowersProfileContainer } from '../../styles/ProfilePageStyles/ProfilePage.styled';
import { useNavigate } from 'react-router-dom';
import getMessages from './getMessages';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import {
  DisplayFlex,
  TweetButton,
} from '../../styles/utilsStyles/Tweet.styled';
import { BackArrow } from '../../styles/SingleTweetPageStlyes/SingleTweetPage.styled';
import writeMessage from './writeMessage';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';

function MessagesPage() {
  const [profiles, setProfiles] = useState(null);
  const [openChat, setOpenChat] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleOpenChat = (profile) => {
    setOpenChat(profile);
  };

  useEffect(() => {
    const listenToChat = async () => {
      const userChatRef = query(
        collection(db, 'users', user.uid, 'messages'),
        where('sendTo', '==', openChat.id)
      );
      const profileChatRef = query(
        collection(db, 'users', user.uid, 'messages'),
        where('sendTo', '==', openChat.id)
      );

      const unsubscribeUserChat = onSnapshot(userChatRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
      const unsubscribeProfileChat = onSnapshot(
        profileChatRef,
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
          });
        }
      );
    };

    if (openChat) listenToChat();
  }, [openChat, user.uid]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message) {
      const promiseMessage = await writeMessage(
        user.uid,
        openChat,
        message,
        user.displayName
      );
      if (promiseMessage) {
        promiseMessage.date = promiseMessage.date.toDate();
      }
    }
  };

  const handleGoBack = () => {
    setOpenChat(null);
    setChatMessages(null);
  };

  const navigateToProfile = (link) => {
    navigate(`/${link}`);
  };

  useEffect(() => {
    const initialize = async () => {
      const promiseFollowing = await getProfileFollowing(user.uid);
      if (promiseFollowing.length) {
        setProfiles(promiseFollowing);
      }

      const promiseFollowers = await getProfileFollowers(user.uid);
      if (promiseFollowers.length && promiseFollowing.length) {
        // remove duplicate users that might exits on both followers and followings list
        const combined = promiseFollowers.concat(promiseFollowing);
        const uniqueUserNames = [];
        const uniqueCombined = combined.filter((user) => {
          const isDuplicate = uniqueUserNames.includes(user.userName);

          if (!isDuplicate) {
            uniqueUserNames.push(user.userName);
            return true;
          }

          return false;
        });
        setProfiles(uniqueCombined);
      } else if (promiseFollowers.length) {
        setProfiles(promiseFollowers);
      }
      setLoading(false);
    };

    if (user.uid) initialize();

    return () => {
      setProfiles(null);
      setOpenChat(null);
      setChatMessages(null);
      setMessage(null);
    };
  }, [user.uid]);

  if (loading) {
    return <LoadingStyled>Loading</LoadingStyled>;
  }

  return (
    <ProfilePageResponsiveContainer style={{ zIndex: 9999 }}>
      <MessagesPageContainer>
        <MessagesPageHeader>
          <HomepageTestPP onClick={() => navigateToProfile(user.displayName)} />
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
                  if (message.userName === user.displayName) {
                    return (
                      <MessageContainer
                        key={message.key}
                        style={{ alignItems: 'flex-end' }}
                      >
                        <MessageContent style={{ backgroundColor: 'gray' }}>
                          <p>{message.message}</p>
                        </MessageContent>
                      </MessageContainer>
                    );
                  } else {
                    return (
                      <MessageContainer
                        key={message.key}
                        style={{ alignItems: 'flex-start' }}
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
                    <HomepageTestPP
                      onClick={() => navigateToProfile(profile.userName)}
                    />
                    {profile.userName}
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
