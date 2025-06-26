import { Inngest } from "inngest";
import User from "../models/Users.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest Function to save user to the DB.

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  // The events can be found on the Clerk Dashboard // Webhooks > Endpoint > Testing in the dropdown Send Event list
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const {id, first_name, last_name, email_addresses, image_url} = event.data;
    const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: first_name + " " + last_name,
        image: image_url
    }

    await User.create(userData)
  },
);

// Delete User from DB

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  // The events can be found on the Clerk Dashboard // Webhooks > Endpoint > Testing in the dropdown Send Event list
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    const {id} = event.data;
    await User.findByIdAndDelete(id)
  },
);

// Update User from DB

const syncUserUpdate = inngest.createFunction(
  { id: "update-user-with-clerk" },
  // The events can be found on the Clerk Dashboard // Webhooks > Endpoint > Testing in the dropdown Send Event list
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    
    const {id, first_name, last_name, email_addresses, image_url} = event.data;
    const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: first_name + " " + last_name,
        image: image_url
    }
    await User.findByIdAndUpdate(id, userData)
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdate
];