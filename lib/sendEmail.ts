import { ref } from "vue";
import nodemailer from "nodemailer";

export const sendEmail = async (senderEmail: string, message: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "nanjaya-store.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@nanjaya-store.com",
        pass: "info@nanjaya-store.com",
      },
    });

    const mailOptions = {
      from: "Contact Form <nanjaya-store.com>",
      to: "nanjaya-store.com",
      subject: "Message from contact form",
      replyTo: senderEmail,
      html: `<p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error(error);
    console.error("Failed to send email.");
    return false;
  }
};
