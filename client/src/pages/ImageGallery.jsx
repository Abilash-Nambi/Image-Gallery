import {
  Box,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import axios from "axios";
import CustomModal from "../components/CustomModal";
const API_URL = "http://localhost:5000";

const Wrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(6),
  "& .image-gallery-paper": {
    marginTop: theme.spacing(8),
  },
  "& .image-gallery-image": {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    padding: "10px",
  },
}));

const ImageGallery = () => {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    setProgress(0);
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_file", image);

    const config = {
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setProgress(percentCompleted);
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/imagegallery/upload",
        formData,
        config,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.log("🚀 + handleFileChange + error:", error);
    }
  };

  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/api/imagegallery`);
    setData(response.data);
  };

  const handleImageClick = (imagePath) => {
    setOpen(true);
    setImageUrl(imagePath);
  };

  return (
    <Wrapper>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h4">Photo Gallery</Typography>
          <Typography variant="body1">
            A picture worth thousand words
          </Typography>
        </Box>
        <Box pt={5}>
          <Tooltip title="Add Image">
            <IconButton
              aria-label="ControlPointIcon"
              color="success"
              size="large"
              onClick={handleClick}
            >
              <ControlPointIcon />
            </IconButton>
          </Tooltip>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 10 }}
              color="success"
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`${progress}%`}</Typography>
          </Box>
        </Box>
        <Paper elevation={3} className="image-gallery-paper">
          <Grid container>
            {data.map((data, i) => (
              <Grid item md={4} key={i}>
                <img
                  src={`${API_URL}/images/${data.filename}`}
                  className="image-gallery-image"
                  onClick={() =>
                    handleImageClick(`${API_URL}/images/${data.filename}`)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
      <CustomModal open={open} setOpen={setOpen} imageUrl={imageUrl} />
    </Wrapper>
  );
};

export default ImageGallery;
