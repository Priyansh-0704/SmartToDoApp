import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false,  // bypass any SSL cert errors
      },
      secure:true,  
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,  
      to,                           
      subject,                      
      text,                        
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
