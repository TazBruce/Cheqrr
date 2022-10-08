import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

/**
 * A function that is triggered when a user is deleted.
 */
export const authOnDelete =
    functions.auth.user().onDelete(async (user) => {
        console.log(`Deleting document for user ${user.uid}`);
        await firestore.collection('users').doc(user.uid).delete();
    });

/**
 * A function that is triggered when an organisation is created.
 * Adds the organisation and admin role to the user who created it.
 * Generates a random 6 digit invite code for the organisation.
 */
export const orgOnCreate =
    functions.firestore
        .document('organisations/{orgID}')
        .onCreate(async (snap, context) => {
            const orgID = context.params.orgID;
            const data = snap.data();
            if (data === undefined) {
                throw new Error('Data is undefined');
            }
            const userID = data.owner;
            console.log(`Adding admin role for user ${userID} in organisation ${orgID}`);
            await firestore.collection('roles').doc(userID).set({
                orgID,
                role: 'Owner',
            });
            console.log(`Generating invite code for organisation ${orgID}`);
            const inviteCode = Math.floor(100000 + Math.random() * 900000).toString();
            await firestore.collection('invite-codes').doc(inviteCode).set({
                orgID,
            });
            await firestore.collection('organisations').doc(orgID).update({
                inviteCode,
            });
        });
