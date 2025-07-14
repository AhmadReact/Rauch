"use client";
import { useRef, useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

import Swal from "sweetalert2";
import { supportMessage } from "@/app/services/services";
import ReCAPTCHA from "react-google-recaptcha";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    subject: "",
    email: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const handleRecaptchaVerify = (response) => {
    setIsVerified(true);
  };

  const recaptchaRef = useRef();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaExpire = () => {
    setIsVerified(false);
    // You can perform additional actions here when reCAPTCHA token expires
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    supportMessage(formData)
      .then((result) => {
        if (result.status == "success") {
          Swal.fire({
            icon: "success",
            title: "Received your information",
          });

          setFormData({
            name: "",
            message: "",
            subject: "",
            email: "",
          });
        } else if (result.status == "error") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message[Object.keys(result.message)[0]],
          });
        }
      })

      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", backgroundColor: "#f8f9fa" }}
        className="my-[60px]"
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#00205B" }}>
          Join Us
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ marginBottom: 3 }}>
          If you're interested in becoming an independent rep, we'd love to hear
          from you! Please fill out the contact form below, and a member of our
          team will get in touch with you shortly to discuss the next steps.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
          />

          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            required
          />
          <div className=" flex justify-center mt-[16px] max-md:pl-8 max-md:pr-8 ">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lcl1iErAAAAAIbhlwWlKF6N9uWo2aZZ_re1xeNq"
              onChange={handleRecaptchaVerify}
              onExpired={handleRecaptchaExpire}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#00205B", color: "#fff" }}
            disabled={!isVerified}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default JoinUs;
