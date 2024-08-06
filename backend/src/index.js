const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();

const axios = require("axios");
const FormData = require("form-data");
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const allowedIps = ["http://localhost:3000", "http://65.2.121.186"]; // Add your allowed IPs here

app.use(
  cors({
    // origin: true,
    origin: function (origin, callback) {
      if (allowedIps.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "FETCH"],

    credentials: true,
  })
);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/audio");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({storage: storage,});

// app.post(
//   "/endpoint",
//   upload.fields([{ name: "musicFile" }, { name: "coverImage" }]),
//   async (req, res) => {
//     console.log("Req Body:", req.body);
//     console.log("Req Files:", req.files);

//     const {
//       songName,
//       songDescription,
//       basePrice,
//       royaltyPrice,
//       royaltyPercentage,
//       isRentingAllowed,
//       coverImage,
//     } = req.body;

//     const musicFile = req.files["musicFile"] ? req.files["musicFile"][0] : null;
//     // const coverImage = req.files["coverImage"]? req.files["coverImage"][0]: null;
//     console.log("Cover Image File:", req.files["coverImage"]);

//     console.log("Text Data:", {
//       songName,
//       songDescription,
//       basePrice,
//       royaltyPrice,
//       royaltyPercentage,
//       isRentingAllowed,
//       coverImage,
//     });

//     // Function to upload a file to Pinata
//     const uploadToPinata = async (file, name) => {
//       const formData = new FormData();
//       const fileStream = fs.createReadStream(file.path);
//       formData.append("file", fileStream);

//       const pinataMetadata = JSON.stringify({ name });
//       formData.append("pinataMetadata", pinataMetadata);

//       const pinataOptions = JSON.stringify({ cidVersion: 1 });
//       formData.append("pinataOptions", pinataOptions);

//       try {
//         const response = await axios.post(
//           "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${JWT}`,
//               ...formData.getHeaders(),
//             },
//           }
//         );
//         return response.data;
//       } catch (error) {
//         console.error(`Error uploading ${name} to Pinata:`, error);
//         throw error;
//       }
//     };

//     try {
//       const musicUploadResponse = musicFile
//         ? await uploadToPinata(musicFile, "Music File")
//         : null;
//       const coverUploadResponse = coverImage
//         ? await uploadToPinata(coverImage, "Cover Image")
//         : null;

//       res.status(200).send({
//         message: "Data received and uploaded successfully",
//         musicUploadResponse,
//         coverUploadResponse,
//       });
//     } catch (error) {
//       res.status(500).send({
//         message: "Failed to upload to Pinata",
//         error: error.message,
//       });
//     }
//   }
// );

app.post("/endpoint",
  upload.fields([{ name: "musicFile", },{  name: "coverImage", },]),
  async (req, res) => {
    // console.log("Req Body:", req.body);
    var  JWT = process.env.JWT;
    const {
      songName,
      songDescription,
      basePrice,
      royaltyPrice,
      royaltyPercentage,
      isRentingAllowed,
    } = req.body;

    const musicFile = req.files["musicFile"] ? req.files["musicFile"][0] : null;
    const coverImage = req.files["coverImage"] ? req.files["coverImage"][0] : null;

    console.log("Text Data:", {
      songName,
      songDescription,
      basePrice,
      royaltyPrice,
      royaltyPercentage,
      isRentingAllowed,
    });
    if (musicFile) {
      const formData = new FormData();
      const fileStream = fs.createReadStream(musicFile.path);
      formData.append("file", fileStream);

      const pinataMetadata = JSON.stringify({
        name: musicFile.originalname,
      });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 1,
      });
      formData.append("pinataOptions", pinataOptions);

      try {
        const pinataResponse = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
              ...formData.getHeaders(),
            },
          }
        );
        console.log("Pinata Response:", pinataResponse.data);
        res.status(200).send({
          message: "Data received and uploaded successfully",
          pinataResponse: pinataResponse.data,
        });
      } catch (error) {
        console.error("Error uploading to Pinata:", error);
        res.status(500).send({
          message: "Failed to upload to Pinata",
          error: error.message,
        });
      }
    } else {
      res.status(400).send("No music file provided");
    }
  }
);

async function getHash(ipfs_url) {
  try {
    const res = await fetch(
      "https://harlequin-secure-tortoise-165.mypinata.cloud/ipfs/${ipfs_url}"
    );
    const resData = await res.text();
    console.log(resData);
  } catch (error) {
    console.log(error);
  }
}
app.get("/", (req, res) => {
  res.send("Hello World!");
  getHash(ipfs_url);
});
 const port = process.env.PORT;
//  const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }).on("error", (err) => {
    console.error("Error starting server:", err);
  });
