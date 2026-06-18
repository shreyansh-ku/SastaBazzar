import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
    try{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject,
        text: message,
    });
}
catch(err){
    console.error("Error in sending email:",err);
}
};


export default sendEmail;