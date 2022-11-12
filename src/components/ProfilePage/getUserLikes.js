import {
  collectionGroup,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../Firebase';

const getUserLikes = async (userID) => {
  if (userID) {
    const returnData = [];

    const repliesQuery = query(
      collectionGroup(db, 'likes'),
      where('userID', '==', userID)
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
      rawData.date = rawData.firestoreDate.toDate();
      returnData.push(rawData);
    });

    return returnData;
  }
};

export default getUserLikes;
