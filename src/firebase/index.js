import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDFBQ-Ehscx6ISnRigLP353VzApd1wNr58',
  authDomain: 'yum-yum-app.firebaseapp.com',
  databaseURL: 'https://yum-yum-app.firebaseio.com',
  projectId: 'yum-yum-app'
};

firebase.initializeApp(config);

export default firebase;
