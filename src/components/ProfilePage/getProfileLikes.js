import {
  collectionGroup,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../Firebase';

const getProfileLikes = async (profileID) => {
  if (profileID) {
    const returnData = [];

    const repliesQuery = query(
      collectionGroup(db, 'likes'),
      where('userID', '==', profileID)
    );
    const repliesSnap = await getDocs(repliesQuery);

    const parentsPromises = [];

    repliesSnap.forEach((doc) => {
      const docRef = doc.ref;
      const parentCollectionRef = docRef.parent;
      const immediateParentDocumentRef = parentCollectionRef.parent;

      parentsPromises.push(getDoc(immediateParentDocumentRef));
    });

    const arrOfParentsDocumentSnaps = await Promise.all(parentsPromises);
    arrOfParentsDocumentSnaps.forEach((doc) => {
      const rawData = doc.data();
      if (rawData) {
        // rawData will be undefined if a retweeted tweet is deleted
        rawData.date = rawData.firestoreDate.toDate();
        returnData.push(rawData);
      }
    });

    return returnData;
  }
};

export default getProfileLikes;
