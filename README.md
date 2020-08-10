# ConnectSync

## We bring remote workers closer together

Enjoy one of the best open source social media platforms for business owners to reunite their workers from anywhere.

## Website

[ConnectSync](https://connectsync.com)

## Github Repo

[https://github.com/dhanmoni/ConnectSync-Repo](https://github.com/dhanmoni/ConnectSync-Repo)

## Installation

Clone the repo and run :

```bash
npm install
```

It will install the required dependencies.
To spin up the server, run:

```bash
> nodemon server

> npm run server
```

Create a folder named 'config' and a json file inside it as 'default.json'.
put the mongoURI inside the file.

To run the frontend on localhost, go to the directory '/connectsync' and run:

```bash
> npm start
```

To run frontend and server together

```bash
> npm run dev
```

## About the project

ConnectSync is a social networking site made for co-workers to connect with each other more personally. With the help of this amazing application, users can create or join workplaces, post content to a specific or more than one workplace, chat with other members of the workplaces, like & comment on contents, all the things that will help users connect together. We have added a ton of features to make users' life easier while keeping simplicity in mind. Our one of the main motive was to create a simple and user-friendly social media app that users will be able to use in seconds without having to go through some unnecessary process.

The project was created using MERN stack. We used **MongoDB**(MongoDB Atlas) as our database, **Auth0**(JWT & OAuth) for the authentication, and deployed the application to **AWS**.

### Here is a list of features that we are providing:

1. User can register either by their email address or with their google account.
2. Once registered, user will be redirected to home page where user can either create a workplace and invite other users to that workplace or join a public workplace by typing an available public workplace name.
3. Once the user becomes a member of a workplace, he/she will be able to post contents to that workplace.
4. User can be a member of multiple workplaces. So if user wants, then at the time of posting any content, user will be given the option to choose where he/she wants to post the content to.
5. User can view contents that are posted by the members of the workplaces that user is in.
6. User can view all the users that member of a specific workplace in the **Members** tab.
7. User can chat with other members in the **Chat** tab.
8. User can add/update the profile details such as bio, residence, profile image, social links etc in the **Profile** tab.

## Future plans

We could not implement all the features that we're planning to, but we'll add them after this event. Some of the features that we are going to be implementing are:

- Video calling feature
- Notification
- User can create a private group and invite other members by sending on referral code
- Saving, Sharing posts
- Adding the support for sharing other media files such as video, documents, links etc
- Making a member of the workplace admin by an another admin
- Adding other users in a workplace by admin.

## Appreciation

Our team like to thank Auth0 for organizing this amazing hackathon. We leant a lot by participating in this. Hope to participate in the next Auth0 hackathon :)

## License

[MIT](https://choosealicense.com/licenses/mit/)
