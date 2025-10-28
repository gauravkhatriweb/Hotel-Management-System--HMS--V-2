import User from "../models/User.model.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with Clerk Webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verifying Headers
    await whook.verify(JSON.stringify(req.body), headers);

    // Getting Data from request body 
    const {data , type} = req.body;
    const userData = {
        _id:data.id,
        email:data.email_addresses[0].email_address,
        username:data.first_name + " " + data.last_name,
        image: data.image_url,
    }

    // Switch case for different event 
  switch (type){
    case "user.created":{
        await User.create(userData);
        res.status(200).send("User Created Successfully");
        break;
    }
    case "user.updated":{
        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).send("User Updated Successfully");
        break;
    }
    case "user.deleted":{
        await User.findByIdAndDelete(data.id);
        res.status(200).send("User Deleted Successfully");
        break;
    }
    default:{
        res.status(400).send("Event Type not Supported");
    }
  }

  } catch (error) {
    console.error(error);
  }
};
export default clerkWebhooks;
