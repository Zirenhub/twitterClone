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
import {
  DisplayFlex,
  TweetButton,
} from '../../styles/utilsStyles/Tweet.styled';
import { BackArrow } from '../../styles/SingleTweetPageStlyes/SingleTweetPage.styled';
import writeMessage from './writeMessage';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../Firebase';

function MessagesPage() {
  const [profiles, setProfiles] = useState(null);
  const [openChat, setOpenChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [profileMessages, setProfileMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unsubProfile, setUnsubProfile] = useState(null);
  const [unsubUser, setUnsubUser] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (openChat) {
      const initialize = async () => {
        const userChatRef = query(
          collection(db, 'users', user.uid, 'messages'),
          where('sendTo', '==', openChat.id),
          orderBy('date', 'desc')
        );

        const profileChatRef = query(
          collection(db, 'users', openChat.id, 'messages'),
          where('sendTo', '==', user.uid),
          orderBy('date', 'desc')
        );

        const userChatListener = onSnapshot(userChatRef, (querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push(doc.data());
          });
          setUserMessages(messages);
        });

        const profileChatListener = onSnapshot(
          profileChatRef,
          (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
              messages.push(doc.data());
            });
            setProfileMessages(messages);
          }
        );

        setUnsubProfile(() => profileChatListener);
        setUnsubUser(() => userChatListener);
      };

      initialize();
    } else {
      if (unsubProfile && unsubUser) {
        unsubProfile();
        unsubUser();
      }
      setChatMessages([]);
    }
  }, [openChat, user.uid]);

  useEffect(() => {
    setChatMessages(
      [...profileMessages, ...userMessages].sort(
        (a, b) => a.date.toDate() - b.date.toDate()
      )
    );
  }, [profileMessages, userMessages]);

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
      setChatMessages([]);
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
                    onClick={() => setOpenChat(profile)}
                  >
                    <HomepageTestPP
                      onClick={() => navigateToProfile(profile.userName)}
                    />
                    {profile.userName}
                  </FollowersProfileContainer>
                );
              })}
            {!profiles && (
              <p style={{ textAlign: 'center', color: '#eff3f4' }}>
                You can message those who follow you, or those who you follow.
              </p>
            )}
          </div>
        )}
      </MessagesPageContainer>
    </ProfilePageResponsiveContainer>
  );
}

export default WithFooter(MessagesPage);
