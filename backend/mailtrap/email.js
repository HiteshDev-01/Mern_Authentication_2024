import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendVarificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email verification",
    });

    console.log("Email verification successfull:", response);
  } catch (error) {
    console.error("Email verifiaction failed:", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "2b38a842-0823-4232-aff7-1177a6051d0f",
      template_variables: {
        name: name,
        company_info_name: "Clothes shop",
      },
    });
  } catch (error) {
    console.error("Failed to send welcome email !:", error.message);
    res
      .status(400)
      .json({ success: false, message: "Sending welcome email failed !" });
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  const emailTemplate = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

  try {
      const response = await mailTrapClient.send({
          from: sender,
          to: recipient,
          subject: "Reset your password",
          html: emailTemplate,  // Using the template after replacement
          category: "Password Reset",
      });
  } catch (error) {
      console.error(`Error sending password reset email`, error);

      throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendPasswordResetEmailSuccessfull = async (email) => {
  try {
    const recipient = [
      {
        email,
      },
    ];

    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reseted successfully.",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Password",
    });

    console.log(
      "Password reseted successfully email sent to the user:",
      response
    );
  } catch (error) {
    console.error("Email not send to the user:", error.message);
  }
};
