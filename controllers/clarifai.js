import axios from "axios";

const USER_ID = "vali"; // Add your user id here

const PAT = "9abd3c552ddb46ac900b648bcdd992d7"; // Add your personal access token here

const APP_ID = "my-first-application"; // Add your app id here

const MODEL_ID = "face-detection";

const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";

const clarifaiUrl =
  "https://api.clarifai.com/v2/models/" +
  MODEL_ID +
  "/versions/" +
  MODEL_VERSION_ID +
  "/outputs";

const handleApiCall = async (req, res) => {
  try {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: req.body.input,
            },
          },
        },
      ],
    });
    const { data } = await axios.post(clarifaiUrl, raw, {
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
    });

    res.send(data);
  } catch (error) {
    console.log(error.response);

    return error.response;
  }
};

export default {
  handleApiCall,
};
